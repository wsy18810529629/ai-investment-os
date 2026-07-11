import { BookOpen, Building2, Layers3, Landmark, PieChart, ShieldCheck, type LucideIcon } from "lucide-react";

export type LearningLesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: LucideIcon;
};

export type ReviewConcept = {
  id: string;
  term: string;
  prompt: string;
  answer: string;
};

export const beginnerLessons: LearningLesson[] = [
  {
    id: "why-invest",
    title: "为什么普通人需要理解投资？",
    description: "先分清储蓄、投资和投机，不急着选择产品。",
    duration: "6 分钟",
    icon: BookOpen,
  },
  {
    id: "asset-types",
    title: "股票、基金、ETF 和债券有什么不同？",
    description: "理解你买到的究竟是一家公司、一篮子资产，还是一份债权。",
    duration: "8 分钟",
    icon: Layers3,
  },
  {
    id: "stocks",
    title: "买股票，实际上买的是什么？",
    description: "从股东身份、公司盈利和价格波动理解股票。",
    duration: "9 分钟",
    icon: Building2,
  },
  {
    id: "funds",
    title: "基金经理在替你做什么？",
    description: "理解主动基金、费用、策略和基金经理的作用。",
    duration: "10 分钟",
    icon: PieChart,
  },
  {
    id: "etf",
    title: "ETF 为什么像一篮子股票？",
    description: "理解指数跟踪、分散风险、费率和交易方式。",
    duration: "8 分钟",
    icon: Layers3,
  },
  {
    id: "bonds",
    title: "债券为什么通常比股票稳？",
    description: "理解借钱、利息、到期偿还和信用风险。",
    duration: "8 分钟",
    icon: Landmark,
  },
  {
    id: "risk-return",
    title: "收益从哪里来，风险又是什么？",
    description: "不只看涨跌，开始理解波动、亏损和不确定性。",
    duration: "10 分钟",
    icon: ShieldCheck,
  },
  {
    id: "allocation",
    title: "为什么不能把钱都放在一个地方？",
    description: "用最简单的方式理解分散配置与仓位纪律。",
    duration: "10 分钟",
    icon: PieChart,
  },
];

export const assetTypePrimer = [
  { name: "股票", ownership: "一家公司的部分所有权", returnSource: "公司成长与分红", risk: "波动通常较高" },
  { name: "基金", ownership: "交给基金经理管理的一篮子资产", returnSource: "组合整体表现", risk: "取决于策略与持仓" },
  { name: "ETF", ownership: "通常跟踪指数的一篮子资产", returnSource: "指数或主题表现", risk: "分散但仍会波动" },
  { name: "债券", ownership: "借给政府或公司的钱", returnSource: "利息与到期偿还", risk: "利率与信用风险" },
] as const;

export const reviewConcepts: ReviewConcept[] = [
  {
    id: "ownership",
    term: "股票",
    prompt: "买入一只股票，最核心的含义是什么？",
    answer: "你拥有了这家公司的一小部分权益，收益和风险都与公司的经营及市场定价相关。",
  },
  {
    id: "diversification",
    term: "分散",
    prompt: "持有一篮子资产，为什么不等于没有风险？",
    answer: "分散可以降低单一资产风险，但无法消除整个市场、行业或策略共同下跌的风险。",
  },
];

export const quizQuestion = {
  prompt: "如果你想低成本持有沪深300的一篮子公司，哪类工具通常更直接？",
  options: ["单只股票", "沪深300 ETF", "公司债券"],
  correct: "沪深300 ETF",
  explanation: "ETF 可以按照既定规则跟踪指数，让你通过一个产品持有指数中的一篮子公司。它能分散单一公司风险，但不代表不会亏损。",
};

export type SimulationAsset = {
  id: string;
  name: string;
  type: string;
  risk: "较低" | "中等" | "较高";
  prices: number[];
};

export const simulationDates = ["7/1", "7/2", "7/3", "7/4", "7/5", "7/6", "7/7", "7/8", "7/9", "7/10"];

export const simulationAssets: SimulationAsset[] = [
  {
    id: "growth-stock",
    name: "新能源龙头 A",
    type: "股票 · Mock",
    risk: "较高",
    prices: [186, 181, 188, 179, 174, 182, 193, 189, 187, 190],
  },
  {
    id: "broad-etf",
    name: "沪深300 ETF",
    type: "宽基 ETF",
    risk: "中等",
    prices: [3.82, 3.79, 3.84, 3.81, 3.76, 3.8, 3.87, 3.85, 3.91, 3.94],
  },
  {
    id: "active-fund",
    name: "稳健成长混合基金",
    type: "主动基金 · Mock",
    risk: "中等",
    prices: [1.42, 1.4, 1.43, 1.41, 1.38, 1.4, 1.45, 1.44, 1.47, 1.49],
  },
  {
    id: "dividend-etf",
    name: "中证红利 ETF",
    type: "策略 ETF",
    risk: "中等",
    prices: [1.34, 1.35, 1.34, 1.36, 1.37, 1.36, 1.38, 1.39, 1.38, 1.4],
  },
  {
    id: "bond-index",
    name: "中债综合指数基金",
    type: "债券基金",
    risk: "较低",
    prices: [1.081, 1.082, 1.083, 1.082, 1.084, 1.085, 1.086, 1.085, 1.087, 1.088],
  },
];
