const fallbackScores = [
  { name: "红利低波", asset_type: "基金/ETF", industry: "红利", score: 48.9, action: "观察", risks: ["拥挤交易", "利率上行扰动"] },
  { name: "沪深300", asset_type: "指数基金/ETF", industry: "宽基", score: 47.5, action: "观察", risks: ["盈利周期下行", "估值修复慢"] },
  { name: "中证500", asset_type: "指数基金/ETF", industry: "宽基", score: 41.5, action: "放低优先级", risks: ["波动大", "盈利分化"] },
  { name: "AI 应用", asset_type: "行业主题", industry: "TMT/AI", score: 24.7, action: "暂不新增", risks: ["估值高", "主题轮动快"] }
];
const fallbackNews = [{ title: "研究数据暂不可用", source: "WealthOS", tags: ["预览"], score: 0 }];
const typeMeta = { equity: ["股票", "#536e5e"], fund: ["基金", "#93a497"], cash: ["现金", "#d0b981"], other: ["其他", "#c8c9c3"] };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const money = (value) => `¥ ${Math.round(Number(value || 0)).toLocaleString("zh-CN")}`;
const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
let scores = fallbackScores;
let news = fallbackNews;
let assets = JSON.parse(localStorage.getItem("wealthos_assets_v1") || "[]");
let profile = JSON.parse(localStorage.getItem("wealthos_profile_v1") || '{"risk":"balanced","goal":"长期增值","horizon":"5-10 年","interests":""}');
let journals = JSON.parse(localStorage.getItem("wealthos_journals_v1") || "[]");
let privateMode = true;
let currentUser = null;
let syncTimer = null;
let authMode = "login";
const apiEnabled = location.protocol === "http:" || location.protocol === "https:";

function collectState() {
  return { assets, profile, journals, actions: $$(".action-list input").map((item) => item.checked), startedAt: localStorage.getItem("wealthos_started_at"), onboardingDone: localStorage.getItem("wealthos_onboarding_done") === "true" };
}

function applyRemoteState(state) {
  if (!state || typeof state !== "object") return;
  assets = Array.isArray(state.assets) ? state.assets : assets;
  profile = state.profile && typeof state.profile === "object" ? state.profile : profile;
  journals = Array.isArray(state.journals) ? state.journals : journals;
  localStorage.setItem("wealthos_assets_v1", JSON.stringify(assets));
  localStorage.setItem("wealthos_profile_v1", JSON.stringify(profile));
  localStorage.setItem("wealthos_journals_v1", JSON.stringify(journals));
  if (state.startedAt) localStorage.setItem("wealthos_started_at", state.startedAt);
  if (state.onboardingDone) localStorage.setItem("wealthos_onboarding_done", "true");
  if (Array.isArray(state.actions)) {
    $$(".action-list input").forEach((input, index) => input.checked = Boolean(state.actions[index]));
    localStorage.setItem("wealthos_actions", JSON.stringify(state.actions));
    $(".progress").textContent = `${state.actions.filter(Boolean).length} / 3`;
  }
  renderPortfolio(); renderJournal(); buildBrief();
}

async function api(path, options = {}) {
  const response = await fetch(path, { credentials: "same-origin", headers: { "Content-Type": "application/json", ...(options.headers || {}) }, ...options });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `请求失败 ${response.status}`);
  return payload;
}

function queueSync() {
  if (!currentUser || !apiEnabled) return;
  clearTimeout(syncTimer);
  $("#accountButton").textContent = "正在同步…";
  syncTimer = setTimeout(async () => {
    try { await api("/api/state", { method: "POST", body: JSON.stringify({ state: collectState() }) }); $("#accountButton").textContent = `${currentUser} · 已同步`; }
    catch { $("#accountButton").textContent = `${currentUser} · 待同步`; }
  }, 350);
}

async function loadRemoteState() {
  const remote = await api("/api/state");
  const hasRemote = remote.state && Object.keys(remote.state).length > 0;
  const hasLocal = assets.length || journals.length || localStorage.getItem("wealthos_onboarding_done");
  if (hasRemote) applyRemoteState(remote.state);
  else if (hasLocal) queueSync();
}

async function bootstrapAccount() {
  const authDialog = $("#authDialog");
  if (!apiEnabled) { $("#accountButton").textContent = "仅本机"; return false; }
  try {
    const me = await api("/api/me");
    if (me.authenticated) { currentUser = me.username; $("#accountButton").textContent = `${currentUser} · 已同步`; await loadRemoteState(); return true; }
    authDialog.showModal();
  } catch { $("#accountButton").textContent = "离线模式"; }
  return false;
}

function setClock() {
  const now = new Date(), hour = now.getHours();
  const greeting = hour < 11 ? "早上好" : hour < 18 ? "下午好" : "晚上好";
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  $("#greeting").textContent = `${greeting}，Weisy`;
  $("#dateLabel").textContent = `${now.getMonth() + 1} 月 ${now.getDate()} 日 · ${weekdays[now.getDay()]}`;
  $("#briefTime").textContent = now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
  const startedAt = localStorage.getItem("wealthos_started_at") || now.toISOString();
  localStorage.setItem("wealthos_started_at", startedAt);
  const days = Math.max(1, Math.floor((now - new Date(startedAt)) / 86400000) + 1);
  $("#companionLine").textContent = `这是 Atlas 陪你管理财富的第 ${days} 天`;
}

async function loadJson(path, fallback) {
  try { const response = await fetch(path, { cache: "no-store" }); if (!response.ok) throw new Error(); return { value: await response.json(), live: true }; }
  catch { return { value: fallback, live: false }; }
}

function renderPortfolio() {
  const total = assets.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const totalCost = assets.reduce((sum, item) => sum + Number(item.cost || item.value || 0), 0);
  const pnl = total - totalCost;
  const cash = assets.filter((item) => item.type === "cash").reduce((sum, item) => sum + Number(item.value || 0), 0);
  $("#wealthValue").dataset.money = money(total);
  $("#wealthValue").textContent = privateMode ? "¥ " + "•".repeat(Math.max(1, money(total).length - 2)) : money(total);
  $("#positionCount").textContent = assets.length ? `${assets.length} 项资产` : "尚未录入资产";
  $("#marketValueHint").textContent = assets.length ? `累计盈亏 ${pnl >= 0 ? "+" : ""}${money(pnl)}` : "点击“管理资产”开始";
  $("#marketValueHint").className = pnl < 0 ? "loss" : "";
  $("#cashRatio").textContent = total ? `现金 ${(cash / total * 100).toFixed(0)}%` : "—";
  const grouped = Object.keys(typeMeta).map((type) => ({ type, value: assets.filter((item) => item.type === type).reduce((sum, item) => sum + Number(item.value || 0), 0) }));
  let degree = 0;
  const segments = grouped.filter((item) => item.value > 0).map((item) => { const start = degree; degree += total ? item.value / total * 100 : 0; return `${typeMeta[item.type][1]} ${start}% ${degree}%`; });
  $("#allocationDonut").style.background = segments.length ? `conic-gradient(${segments.join(",")})` : "#dedbd2";
  $("#allocationLegend").innerHTML = grouped.map((item) => `<span><i style="background:${typeMeta[item.type][1]}"></i>${typeMeta[item.type][0]}<strong>${total ? (item.value / total * 100).toFixed(0) : 0}%</strong></span>`).join("");
  const equityRatio = total ? grouped.filter((item) => item.type === "equity" || item.type === "fund").reduce((sum, item) => sum + item.value, 0) / total : 0;
  const cashRatio = total ? cash / total : 0;
  const weights = total ? assets.map((item) => Number(item.value || 0) / total) : [];
  const maxWeight = weights.length ? Math.max(...weights) : 1;
  const diversity = assets.length ? Math.round(Math.min(100, assets.length * 18 + (1 - maxWeight) * 55)) : 0;
  const liquidity = assets.length ? Math.round(Math.min(100, cashRatio / .15 * 85 + 15)) : 0;
  const stability = assets.length ? Math.round(Math.max(0, 100 - Math.max(0, equityRatio - .5) * 120)) : 0;
  const health = assets.length ? Math.round(diversity * .35 + liquidity * .3 + stability * .35) : 0;
  $("#healthRing").style.setProperty("--score", health);
  $("#healthScore").textContent = assets.length ? health : "—";
  $("#diversityScore").textContent = assets.length ? diversity : "—";
  $("#liquidityScore").textContent = assets.length ? liquidity : "—";
  $("#stabilityScore").textContent = assets.length ? stability : "—";
  $("#healthStatus").textContent = !assets.length ? "待计算" : health >= 75 ? "良好" : health >= 55 ? "需留意" : "风险偏高";
  $("#healthTitle").textContent = !assets.length ? "录入资产后计算" : health >= 75 ? "组合状态稳定" : health >= 55 ? "组合仍可优化" : "组合风险需要处理";
  $("#healthCopy").textContent = !assets.length ? "健康度由分散度、流动性和权益仓位共同计算。" : `最大单项占比 ${(maxWeight * 100).toFixed(0)}%，权益类占 ${(equityRatio * 100).toFixed(0)}%。`;
  $("#allocationTitle").textContent = !assets.length ? "等待录入资产" : equityRatio > .75 ? "权益仓位偏高" : cashRatio < .15 ? "现金缓冲偏低" : "配置处于稳健区间";
  $("#allocationAdvice").textContent = !assets.length ? "录入现金、基金、股票等资产后，这里会计算真实配置与风险提示。" : equityRatio > .75 ? `权益类占 ${(equityRatio * 100).toFixed(0)}%，波动风险较高；先检查是否符合你的计划。` : cashRatio < .15 ? `现金占 ${(cashRatio * 100).toFixed(0)}%，低于现有策略的 15% 流动性底线。` : `权益类占 ${(equityRatio * 100).toFixed(0)}%，现金占 ${(cashRatio * 100).toFixed(0)}%，尚未触发再平衡条件。`;
  $("#assetTable").innerHTML = assets.length ? assets.map((item) => `<div class="asset-row"><span><strong>${escapeHtml(item.name)}</strong><small>${typeMeta[item.type]?.[0] || "其他"}${item.boughtAt ? ` · ${escapeHtml(item.boughtAt)}` : ""}${item.thesis ? ` · ${escapeHtml(item.thesis)}` : ""}</small></span><span>${money(item.value)}<small>成本 ${money(item.cost || item.value)}</small></span><button data-delete-asset="${item.id}" aria-label="删除 ${escapeHtml(item.name)}">删除</button></div>`).join("") : `<div class="empty-state">还没有资产。先在上方添加一项。</div>`;
  $$('[data-delete-asset]').forEach((button) => button.addEventListener("click", () => { assets = assets.filter((item) => item.id !== button.dataset.deleteAsset); saveAssets(); }));
}

function saveAssets() { localStorage.setItem("wealthos_assets_v1", JSON.stringify(assets)); renderPortfolio(); buildBrief(); queueSync(); }

function buildBrief() {
  const ranked = [...scores].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
  const best = ranked[0], avoid = ranked.find((item) => /暂不|放低|不建议/.test(item.action || "")), headline = news[0];
  const holdingsText = assets.map((item) => `${item.name} ${item.thesis || ""}`).join(" ").toLowerCase();
  const relevantScores = ranked.filter((item) => holdingsText && `${item.name} ${item.industry} ${item.asset_type}`.toLowerCase().split(/\s+/).some((term) => term.length > 1 && holdingsText.includes(term)));
  const relevantNews = news.find((item) => assets.some((asset) => `${item.title} ${(item.tags || []).join(" ")}`.toLowerCase().includes(asset.name.toLowerCase()) || (asset.thesis && `${item.title} ${(item.tags || []).join(" ")}`.includes(asset.thesis))));
  const holdingSignal = relevantScores[0];
  const cards = [
    { tone: "", title: assets.length ? "你的资产今天发生什么" : "我还不够了解你的钱", text: assets.length ? `Weisy，我已经核对 ${assets.length} 项资产；今天没有看到必须立刻操作的理由。` : "先花 30 秒录入资产，我才能告诉你市场变化会怎样影响你。" },
    { tone: "amber", title: holdingSignal ? `${holdingSignal.name} 与你有关` : avoid ? `${avoid.name} 暂不追高` : "风险项需要留意", text: holdingSignal ? `你的持仓与该研究方向匹配，当前评分 ${Number(holdingSignal.score || 0).toFixed(1)}，结论是“${holdingSignal.action}”。` : avoid ? `研究评分 ${Number(avoid.score || 0).toFixed(1)}，等待更好的价格或更强确认。` : "今天没有新增高风险信号。" },
    { tone: "blue", title: relevantNews ? "一条与你有关的新闻" : best ? `${best.name} 值得继续研究` : "今日研究方向", text: relevantNews ? relevantNews.title : headline ? `关注：${headline.title}` : "暂无有效新闻。" }
  ];
  $("#briefGrid").innerHTML = cards.map((item, index) => `<article><span class="brief-index ${item.tone}">0${index + 1}</span><div><strong>${item.title}</strong><p>${item.text}</p></div></article>`).join("");
  $("#advisorSummary").textContent = assets.length ? (holdingSignal ? `Weisy，${holdingSignal.name} 与你有关。我的建议是先“${holdingSignal.action}”，并核对最初的持有理由。` : "Weisy，今天没有与你的持仓直接相关的强信号。耐心也是一种行动。") : "我还没看到你的资产，因此不会假装给你个性化调仓建议。";
  $("#atlasMessage").textContent = assets.length ? `我已经了解你的 ${assets.length} 项资产和“${profile.goal}”目标。今天可以聊风险、持仓或一条新闻。` : "我已整理好今日研究信息；录入资产后，我还可以解释它们与你有什么关系。";
  $("#briefDetail").innerHTML = `<section class="detail-section"><h3>观察池评分</h3>${ranked.map((item) => `<div class="research-row"><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.industry || item.asset_type)}</small></span><b>${Number(item.score || 0).toFixed(1)}</b><em>${escapeHtml(item.action || "观察")}</em></div>`).join("")}</section><section class="detail-section"><h3>今日来源</h3>${news.slice(0, 8).map((item) => `<a class="news-link" href="${escapeHtml(item.link || "#")}" target="_blank" rel="noopener"><span>${escapeHtml(item.title)}</span><small>${escapeHtml(item.source || "未知来源")} · 影响分 ${Number(item.score || 0)}</small></a>`).join("")}</section>`;
}

function renderJournal() {
  $("#journalCount").textContent = `${journals.length} 条记录`;
  $("#journalList").innerHTML = journals.length ? journals.slice(0, 6).map((item) => `<article class="journal-item"><span>${escapeHtml(item.date)}</span><strong>${escapeHtml(item.action)} · ${escapeHtml(item.target)}</strong><p>${escapeHtml(item.reason)}</p><button data-delete-journal="${item.id}" aria-label="删除复盘 ${escapeHtml(item.target)}">删除</button></article>`).join("") : `<div class="empty-state">暂无判断记录。</div>`;
  const actionCounts = journals.reduce((map, item) => ((map[item.action] = (map[item.action] || 0) + 1), map), {});
  const topAction = Object.entries(actionCounts).sort((a, b) => b[1] - a[1])[0];
  const impulsive = journals.filter((item) => {
    const normalized = item.reason.replace(/不(?:会|再|要|因为)?[^，。；]{0,10}(?:追涨|追买|追高|恐慌)/g, "克制");
    return /追涨|追买|追高|害怕|焦虑|错过|涨停|恐慌|暴跌/.test(normalized);
  }).length;
  $("#reviewSummary").innerHTML = !journals.length ? "记录第一条判断后，这里会逐步形成你的投资行为画像。" : `<strong>${journals.length} 次判断中，最常见的是“${escapeHtml(topAction[0])}”</strong><p>${impulsive ? `有 ${impulsive} 条记录带有情绪化词语，复盘时值得重点检查。` : "目前没有发现明显的追涨、恐慌或害怕错过表述。"}</p>`;
  $$('[data-delete-journal]').forEach((button) => button.addEventListener("click", () => { journals = journals.filter((item) => item.id !== button.dataset.deleteJournal); saveJournals(); }));
}

function saveJournals() { localStorage.setItem("wealthos_journals_v1", JSON.stringify(journals)); renderJournal(); queueSync(); }

function buildMarkets() {
  const groups = [{ name: "A 股", desc: "宽基与红利", match: /宽基|红利|A股/, tone: "", fallback: 50 }, { name: "成长主题", desc: "科技与 AI", match: /AI|TMT|科技/, tone: "warm", fallback: 50 }, { name: "防御资产", desc: "现金与低波", match: /低波|债|现金/, tone: "cool", fallback: 50 }, { name: "整体研究", desc: "基于观察池", match: /.*/, tone: "", fallback: 50 }];
  const values = groups.map((group) => { const matched = scores.filter((item) => group.match.test(`${item.name} ${item.industry} ${item.asset_type}`)); const value = matched.length ? matched.reduce((sum, item) => sum + Number(item.score || 0), 0) / matched.length : group.fallback; return { ...group, value, state: value >= 58 ? "可以关注" : value >= 42 ? "耐心等待" : "保持谨慎" }; });
  const overall = values[3].value;
  $("#weatherIcon").textContent = overall >= 58 ? "☀" : overall >= 42 ? "◐" : "☁";
  $("#weatherTitle").textContent = overall >= 58 ? "晴朗，可以研究" : overall >= 42 ? "多云，适合观察" : "阴天，先保护本金";
  $("#weatherReason").textContent = overall >= 58 ? "机会信号有所增加，但仍要先与你的持仓匹配。" : overall >= 42 ? "市场没有给出明确方向，今天不需要为了行动而行动。" : "多数观察方向评分偏低，避免追涨和扩大风险暴露。";
  $("#marketList").innerHTML = values.slice(0, 3).map((item) => `<div class="weather-zone"><span><i class="${item.tone}"></i>${item.name}</span><strong>${item.state}</strong></div>`).join("");
}

function answerQuestion(kind, freeText = "") {
  const total = assets.reduce((sum, item) => sum + Number(item.value || 0), 0), equity = assets.filter((item) => ["equity", "fund"].includes(item.type)).reduce((sum, item) => sum + Number(item.value || 0), 0), ratio = total ? equity / total : 0;
  const avoid = scores.find((item) => /暂不|放低/.test(item.action || ""));
  if (!assets.length && kind !== "news") return "我还不知道你的真实持仓。请先点“管理资产”录入资产，之后才能分析组合风险。";
  if (kind === "risk") return `你的权益类资产占 ${(ratio * 100).toFixed(0)}%。${ratio > .75 ? "集中度偏高，先检查最大回撤承受能力。" : "总体未超过高风险阈值。"}${avoid ? ` 观察池中 ${avoid.name} 当前为“${avoid.action}”。` : ""}`;
  if (kind === "news") return news[0]?.title ? `今日优先关注“${news[0].title}”。来源：${news[0].source || "未知"}；系统影响分 ${Number(news[0].score || 0)}。这只是研究线索，不等于买卖信号。` : "今天没有读取到有效新闻。";
  if (kind === "hold") return `现有观察池最高评分为 ${Math.max(...scores.map((item) => Number(item.score || 0))).toFixed(1)}，没有达到强行动阈值；同时你的资产配置没有提供实时价格变化，所以不能凭空建议调仓。`;
  const text = freeText.trim();
  if (/新闻|消息/.test(text)) return answerQuestion("news");
  if (/风险|回撤|集中/.test(text)) return answerQuestion("risk");
  if (/调仓|买|卖|操作/.test(text)) return answerQuestion("hold");
  return "当前本地顾问可回答组合风险、调仓依据和今日新闻。更开放的自然语言分析需要下一阶段接入模型 API。";
}

function bindInteractions() {
  const advisorDialog = $("#advisorDialog"), assetDialog = $("#assetDialog"), briefDialog = $("#briefDialog"), profileDialog = $("#profileDialog"), onboardingDialog = $("#onboardingDialog");
  $("#askButton").addEventListener("click", () => advisorDialog.showModal());
  $("#startConversation").addEventListener("click", () => advisorDialog.showModal());
  $("#whyButton").addEventListener("click", () => { advisorDialog.showModal(); $("#advisorAnswer").textContent = answerQuestion("hold"); });
  $("#manageAssets").addEventListener("click", () => assetDialog.showModal());
  $("#manageProfile").addEventListener("click", () => { Object.entries(profile).forEach(([key, value]) => { if ($(`#profileForm [name="${key}"]`)) $(`#profileForm [name="${key}"]`).value = value; }); profileDialog.showModal(); });
  $("#viewAssets").addEventListener("click", () => assetDialog.showModal());
  $("#openJournal").addEventListener("click", () => { document.body.classList.toggle("show-journal"); if (document.body.classList.contains("show-journal")) $("#journal").scrollIntoView({ behavior: "smooth", block: "start" }); });
  $("#readBrief").addEventListener("click", () => briefDialog.showModal());
  $("#advisorDialog .dialog-close").addEventListener("click", () => advisorDialog.close());
  $$('[data-close]').forEach((button) => button.addEventListener("click", () => $(`#${button.dataset.close}`).close()));
  $$("[data-question]").forEach((button) => button.addEventListener("click", () => $("#advisorAnswer").textContent = answerQuestion(button.dataset.question)));
  $("#advisorForm").addEventListener("submit", (event) => { event.preventDefault(); $("#advisorAnswer").textContent = answerQuestion("free", $("#advisorInput").value); });
  $("#assetForm").addEventListener("submit", (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); assets.push({ id: crypto.randomUUID(), name: data.name.trim(), type: data.type, value: Number(data.value), cost: Number(data.cost || data.value), boughtAt: data.boughtAt, thesis: data.thesis.trim() }); event.currentTarget.reset(); saveAssets(); });
  $("#profileForm").addEventListener("submit", (event) => { event.preventDefault(); profile = Object.fromEntries(new FormData(event.currentTarget)); localStorage.setItem("wealthos_profile_v1", JSON.stringify(profile)); profileDialog.close(); buildBrief(); queueSync(); });
  $("#onboardingForm").addEventListener("submit", (event) => { event.preventDefault(); profile = Object.fromEntries(new FormData(event.currentTarget)); localStorage.setItem("wealthos_profile_v1", JSON.stringify(profile)); localStorage.setItem("wealthos_onboarding_done", "true"); onboardingDialog.close(); buildBrief(); queueSync(); assetDialog.showModal(); });
  $("#skipOnboarding").addEventListener("click", () => { localStorage.setItem("wealthos_onboarding_done", "true"); onboardingDialog.close(); queueSync(); });
  $("#restartOnboarding").addEventListener("click", () => { localStorage.removeItem("wealthos_onboarding_done"); profileDialog.close(); onboardingDialog.showModal(); });
  $("#journalForm").addEventListener("submit", (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); journals.unshift({ id: crypto.randomUUID(), ...data, date: new Date().toLocaleDateString("zh-CN") }); event.currentTarget.reset(); saveJournals(); });
  $("#clearJournal").addEventListener("click", () => { if (journals.length && confirm("确定清空所有投资判断记录吗？")) { journals = []; saveJournals(); } });
  $("#themeToggle").addEventListener("click", () => { document.body.classList.toggle("dark"); localStorage.setItem("wealthos_theme", document.body.classList.contains("dark") ? "dark" : "light"); });
  $("#privacyToggle").addEventListener("click", (event) => { privateMode = !privateMode; renderPortfolio(); event.currentTarget.textContent = privateMode ? "显示金额" : "隐藏金额"; });
  $$(".action-list input").forEach((input) => input.addEventListener("change", () => { const done = $$(".action-list input:checked").length; $(".progress").textContent = `${done} / 3`; localStorage.setItem("wealthos_actions", JSON.stringify($$(".action-list input").map((item) => item.checked))); queueSync(); }));
  const saved = JSON.parse(localStorage.getItem("wealthos_actions") || "[]"); $$(".action-list input").forEach((input, index) => input.checked = Boolean(saved[index])); $(".progress").textContent = `${$$(".action-list input:checked").length} / 3`;
  if (localStorage.getItem("wealthos_theme") === "dark") document.body.classList.add("dark");
  $("#authSwitch").addEventListener("click", () => { authMode = authMode === "login" ? "register" : "login"; $("#authSubmit").textContent = authMode === "login" ? "登录" : "创建账号"; $("#authSwitch").textContent = authMode === "login" ? "第一次使用？创建账号" : "已有账号？返回登录"; $("#authError").textContent = ""; });
  $("#authLater").addEventListener("click", () => $("#authDialog").close());
  $("#authForm").addEventListener("submit", async (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); $("#authError").textContent = ""; try { const result = await api(`/api/${authMode}`, { method: "POST", body: JSON.stringify(data) }); currentUser = result.username; $("#authDialog").close(); $("#accountButton").textContent = `${currentUser} · 已同步`; await loadRemoteState(); if (!localStorage.getItem("wealthos_onboarding_done")) onboardingDialog.showModal(); } catch (error) { $("#authError").textContent = error.message; } });
  $("#accountButton").addEventListener("click", async () => { if (!currentUser) { if (!$("#authDialog").open) $("#authDialog").showModal(); return; } if (confirm(`退出账号 ${currentUser}？`)) { await api("/api/logout", { method: "POST", body: "{}" }); currentUser = null; location.reload(); } });
}

async function init() {
  setClock(); bindInteractions(); renderPortfolio(); renderJournal();
  const [scoresResult, newsResult] = await Promise.all([loadJson("../investment_system/data/latest_scores.json", fallbackScores), loadJson("../investment_system/data/latest_news.json", fallbackNews)]);
  scores = scoresResult.value; news = newsResult.value;
  $("#dataStatus").textContent = scoresResult.live && newsResult.live ? "研究数据已同步" : "部分数据为预览";
  buildBrief(); buildMarkets();
  const authenticated = await bootstrapAccount();
  if (!authenticated && !$("#authDialog").open && !localStorage.getItem("wealthos_onboarding_done")) $("#onboardingDialog").showModal();
}
init();
