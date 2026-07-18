# WealthOS Phase 1 技术设计

## 产品目标

WealthOS 不是行情后台，而是每天给用户一个明确答案的私人财富管家：

1. 我的财富状态是否健康；
2. 今天哪些变化与我有关；
3. 我今天需要做什么，以及更重要的“不做什么”。

Phase 1 只实现 Dashboard、AI Morning Brief 和 Asset Overview。所有投资结论均为研究辅助，不自动交易。

## v1.1 陪伴体验

- AI CFO 使用固定角色名 `Atlas`，对话中必须区分已知事实、规则判断与缺失数据；
- 首次使用通过 60 秒引导采集财富目标、风险承受、投资周期与关注方向，完成后再引导录入资产；
- 首页只保留财富状态、个性化财富日报、Atlas 对话入口、财富天气和今日行动；
- 资产结构与投资复盘下沉为按需工作区，避免首页再次变成工具集合；
- 原市场评分不直接裸露为“行情结论”，而是转换为晴朗、多云、阴天及“关注、等待、谨慎”等消费级表达；
- 用户可在投资画像中重新运行首次引导。

## 局域网账号与同步

- 标准库 HTTP 服务提供静态页面和 `/api/register`、`/api/login`、`/api/logout`、`/api/me`、`/api/state`；
- SQLite 保存用户、会话与版本化状态；
- 密码使用 PBKDF2-SHA256、随机 salt 和 600,000 次迭代，不保存明文；
- 会话使用 256-bit 随机 token，数据库仅保存 token SHA-256，Cookie 为 HttpOnly、SameSite=Strict；
- 写接口执行同源校验，请求体限制为 1 MB；
- 前端本地优先，登录后自动迁移本地状态并在修改后防抖同步；
- macOS LaunchAgent 从 `~/Library/Application Support/WealthOS` 启动，避免后台服务被 Documents 隐私权限拦截；
- 每日研究脚本在生成数据后同步最新 JSON 到运行目录。

## 当前实现

```text
investment_platform/
├── index.html       # Dashboard 信息结构与可访问语义
├── styles.css       # 响应式视觉系统、明暗主题
├── app.js           # 数据适配、简报生成与本地交互
└── WEALTHOS_TECHNICAL_DESIGN.md

investment_system/
├── data/latest_scores.json
├── data/latest_news.json
└── reports/latest.md
```

页面通过同源相对路径读取现有研究系统产出的 JSON；读取失败时使用明确标记为“预览数据”的内置数据，不伪装成实时行情。

V1 用户数据保存在当前浏览器：

- 资产：名称、类型、市值、成本、买入日期、持有理由；
- 投资画像：风险偏好、目标、周期、关注方向；
- 投资日志：日期、动作、标的、当时理由；
- 今日行动完成状态与主题偏好。

资产变化会实时重算总资产、累计盈亏、现金比例、分散度、流动性、抗波动和健康度。日报会用资产名称及持有理由匹配观察池与新闻，无法匹配时明确说明，不生成虚假的个性化结论。

## 数据流

```text
每日研究脚本
  ├─ latest_scores.json ─┐
  └─ latest_news.json ───┼─> Dashboard Adapter
                         ├─> Morning Brief
                         └─> Market Radar
```

当前 Morning Brief 是可解释的确定性聚合：按照评分、行动标签和新闻优先级生成三条摘要。后续接入 LLM 时仍保留这层结构化输入和规则校验，避免模型直接生成无来源的投资结论。

## 交互与状态

- 金额默认隐藏，用户主动点击后显示；
- 每日行动与主题偏好仅保存在浏览器 `localStorage`；
- AI 顾问入口目前提供问题框架，不会执行交易；
- 投资日志会聚合高频动作并检查追涨、恐慌、害怕错过等表达；否定式表达会先做规则消歧；
- 桌面、平板和手机三档响应式布局；
- 页面支持亮色与暗色主题。

## Phase 2 数据模型

建议使用 FastAPI + PostgreSQL，先保持模块化单体：

```text
backend/
├── api/             # portfolio, brief, market, journal
├── domain/          # Asset, Position, Brief, Advice, Journal
├── services/        # portfolio analytics, risk, brief composer
├── agents/          # research agents; only structured outputs
├── repositories/    # PostgreSQL adapters
└── scheduler/       # 08:00 brief, 21:00 review
```

核心表：`users`、`accounts`、`positions`、`transactions`、`market_snapshots`、`briefs`、`advice_records`、`journals`。建议必须记录输入快照、依据、风险提示和用户是否采纳，以支持复盘与审计。

## Agent 边界

```text
Market Agent ─┐
News Agent ───┼─> Evidence Pack ─> Portfolio Agent ─> Advisor Agent
Research Agent┘                                      │
                                                     └─> 用户确认
```

- Agent 只能输出结构化研究材料与建议；
- 任何交易动作必须在动作发生时单独征得用户确认；
- 新闻、行情与财报必须保留来源、抓取时间和有效期；
- 建议不可使用“必涨、稳赚、必买”等确定性措辞。

## 验收标准

- 首屏 3 秒内可读懂财富状态、AI 结论与今日行动；
- 数据文件可用时显示“今日数据已同步”，失败时显示“预览数据”；
- 页面无 JavaScript error/warning；
- AI 顾问弹窗、隐私金额、行动清单和主题切换可交互；
- 视觉不是后台管理模板，移动端不产生横向溢出。
