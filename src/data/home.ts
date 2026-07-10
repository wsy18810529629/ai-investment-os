import {
  Activity,
  BookOpen,
  BrainCircuit,
  Building2,
  Cpu,
  Landmark,
  LineChart,
  Radar,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type MarketMood = "谨慎中性" | "风险偏好回升" | "防守占优";
export type RiskLevel = "低" | "中" | "高";
export type SignalState = "New" | "Watching" | "Logged";
export type AssetType = "股票" | "基金" | "ETF" | "行业" | "宏观";

export type MarketPoint = {
  label: string;
  sentiment: number;
  liquidity: number;
};

export type TodaySummaryItem = {
  title: string;
  explanation: string;
  affectedAreas: string[];
};

export type WatchSignal = {
  name: string;
  code: string;
  type: AssetType;
  trigger: string;
  aiSummary: string;
  change: number;
  risk: RiskLevel;
  state: SignalState;
};

export type HotSector = {
  name: string;
  heat: number;
  change: number;
  driver: string;
  risk: string;
  relatedAssets: string;
  icon: LucideIcon;
};

export type ResearchPick = {
  title: string;
  asset: string;
  type: AssetType;
  stance: string;
  confidence: number;
  reason: string;
  counterRisk: string;
  updatedAt: string;
};

export type LearningMoment = {
  title: string;
  context: string;
  points: string[];
};

export type DigestItem = {
  title: string;
  source: string;
  time: string;
  impact: string;
  tag: string;
};

export const todayBrief = {
  dateLabel: "7月10日 · 周五",
  greeting: "每日投资工作台",
  mood: "谨慎中性" satisfies MarketMood,
  source: "市场行情、行业资讯、观察信号与学习上下文",
  updatedAt: "2026-07-10 09:30",
  headline: "市场热度集中在 AI 算力与高股息风格，但更值得关注的是估值与拥挤度的分化。",
  summary: [
    {
      title: "科技成长继续强势，但高预期正在抬高验证门槛",
      explanation: "AI 算力链仍有产业景气支撑，短期需要关注订单兑现、毛利率变化和主题交易拥挤度。",
      affectedAreas: ["AI 算力", "半导体", "纳斯达克100 ETF"],
    },
    {
      title: "高股息资产防守价值仍在，但短期拥挤度上升",
      explanation: "红利策略适合作为波动缓冲，但估值分位抬升后，单一风格暴露不应继续扩大。",
      affectedAreas: ["中证红利", "银行", "公用事业"],
    },
    {
      title: "宽基指数处在可观察区间，适合用纪律替代情绪",
      explanation: "核心宽基的长期配置逻辑没有改变，短期盈利预期仍是影响风险收益比的关键变量。",
      affectedAreas: ["沪深300 ETF", "中证A500", "核心仓"],
    },
  ] satisfies TodaySummaryItem[],
};

export const marketPulse: MarketPoint[] = [
  { label: "09:30", sentiment: 48, liquidity: 55 },
  { label: "10:30", sentiment: 54, liquidity: 58 },
  { label: "11:30", sentiment: 52, liquidity: 61 },
  { label: "13:30", sentiment: 58, liquidity: 63 },
  { label: "14:30", sentiment: 55, liquidity: 60 },
  { label: "15:00", sentiment: 57, liquidity: 62 },
];

export const watchSignals: WatchSignal[] = [
  {
    name: "沪深300 ETF",
    code: "510300",
    type: "ETF",
    trigger: "估值进入近 5 年 35% 分位",
    aiSummary: "更适合作为长期观察对象；短期仍受权重行业盈利预期影响，适合分批研究而不是追涨。",
    change: 0.74,
    risk: "中",
    state: "New",
  },
  {
    name: "纳斯达克100 ETF",
    code: "513100",
    type: "ETF",
    trigger: "科技权重股带动指数创新高",
    aiSummary: "趋势仍强，但估值隐含乐观预期；如果已有海外科技暴露，应优先检查仓位集中度。",
    change: 1.18,
    risk: "高",
    state: "Watching",
  },
  {
    name: "中证红利基金",
    code: "007119",
    type: "基金",
    trigger: "红利风格热度连续 4 日上升",
    aiSummary: "防守逻辑成立，但拥挤度上升后需要降低短期收益预期，关注股息稳定性。",
    change: -0.21,
    risk: "中",
    state: "Logged",
  },
];

export const hotSectors: HotSector[] = [
  {
    name: "AI 算力",
    heat: 92,
    change: 2.4,
    driver: "云厂商资本开支预期继续上修，产业链订单可见度较高。",
    risk: "高估值对业绩兑现敏感。",
    relatedAssets: "8 个相关 ETF / 14 只股票",
    icon: Cpu,
  },
  {
    name: "高股息",
    heat: 78,
    change: -0.3,
    driver: "市场风险偏好摇摆时，稳定现金流资产继续被配置。",
    risk: "短期拥挤度与利率变化会影响估值。",
    relatedAssets: "5 只基金 / 6 个指数",
    icon: Landmark,
  },
  {
    name: "创新药",
    heat: 66,
    change: 1.1,
    driver: "海外授权与临床进展带来情绪修复，板块分化明显。",
    risk: "研发失败和医保谈判仍是主要不确定性。",
    relatedAssets: "4 个 ETF / 12 只股票",
    icon: Activity,
  },
  {
    name: "消费复苏",
    heat: 59,
    change: 0.2,
    driver: "中报验证期临近，市场更关注费用效率和渠道库存。",
    risk: "弱复苏环境下盈利弹性可能低于预期。",
    relatedAssets: "7 只基金 / 9 只股票",
    icon: Building2,
  },
];

export const researchPicks: ResearchPick[] = [
  {
    title: "适合继续研究",
    asset: "沪深300 ETF",
    type: "ETF",
    stance: "核心仓候选",
    confidence: 72,
    reason: "估值处于偏低区域，产品流动性好，适合作为长期配置框架中的基准资产。",
    counterRisk: "如果盈利预期继续下修，低估值可能维持更久，短期不应按反弹交易处理。",
    updatedAt: "09:30",
  },
  {
    title: "需要等待验证",
    asset: "AI 算力 ETF",
    type: "ETF",
    stance: "卫星仓观察",
    confidence: 61,
    reason: "产业趋势仍强，但价格已反映较高预期，更适合用观察仓跟踪订单与毛利率。",
    counterRisk: "主题拥挤度高，任何资本开支放缓信号都可能放大回撤。",
    updatedAt: "09:30",
  },
  {
    title: "适合降低预期",
    asset: "中证红利基金",
    type: "基金",
    stance: "防守配置",
    confidence: 68,
    reason: "现金流稳定性仍具价值，但短期热度上升后，收益更多来自分红与低波动。",
    counterRisk: "若利率或风险偏好快速变化，高股息风格可能阶段性跑输成长资产。",
    updatedAt: "09:30",
  },
];

export const learningMoment: LearningMoment = {
  title: "什么是估值分位？",
  context: "今天宽基指数和红利资产都被频繁讨论。理解估值分位，能帮你避免只看涨跌做判断。",
  points: [
    "估值分位表示当前估值在历史区间里的相对位置。",
    "低分位不等于马上上涨，它只说明赔率可能更值得研究。",
    "需要结合盈利周期、行业结构和流动性一起看。",
  ],
};

export const marketDigest: DigestItem[] = [
  {
    title: "AI 服务器产业链订单能见度提升，市场关注毛利率持续性",
    source: "行业研究",
    time: "08:45",
    impact: "影响 AI 算力、半导体和海外科技 ETF 的研究假设。",
    tag: "科技",
  },
  {
    title: "红利风格成交占比上升，机构提示降低短期收益预期",
    source: "市场观察",
    time: "09:05",
    impact: "影响高股息基金、银行、公用事业与防守配置。",
    tag: "红利",
  },
  {
    title: "消费中报验证期临近，渠道库存和费用率成为关键变量",
    source: "财经资讯",
    time: "09:18",
    impact: "影响消费基金与品牌龙头的短期研究重点。",
    tag: "消费",
  },
];

export const navigationItems = [
  { label: "今日", href: "/", icon: Radar },
  { label: "市场", href: "/market", icon: LineChart },
  { label: "行业", href: "/industry", icon: Activity },
  { label: "AI投研", href: "/ai-research", icon: BrainCircuit },
  { label: "学习", href: "/learning", icon: BookOpen },
];

export const sidebarNavigationGroups = [
  {
    label: "每日",
    items: [navigationItems[0]],
  },
  {
    label: "研究",
    items: [navigationItems[1], navigationItems[2], navigationItems[3]],
  },
  {
    label: "成长",
    items: [navigationItems[4]],
  },
];

export const quickQuestions = [
  { label: "今天发生了什么？", icon: Sparkles },
  { label: "哪些变化值得关注？", icon: TrendingUp },
  { label: "资金正在流向哪里？", icon: Activity },
  { label: "这个判断有哪些反方风险？", icon: ShieldAlert },
  { label: "今天该学哪个概念？", icon: BookOpen },
];
