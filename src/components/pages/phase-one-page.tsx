"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Database,
  LineChart,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hotSectors, marketDigest, researchPicks, todayBrief } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "@/components/home/motion-presets";
import { MarketPulseChart } from "@/components/home/market-pulse-chart";
import { RiskDisclaimer } from "@/components/home/risk-disclaimer";
import { LearningExperience } from "@/features/learning/learning-experience";

type PhasePageKind = "market" | "industry" | "ai-research" | "learning";

type PhasePageProps = {
  kind: PhasePageKind;
};

const pageMeta: Record<PhasePageKind, { title: string; prompt: string; eyebrow: string; headline: string; summary: string }> = {
  market: {
    title: "市场",
    prompt: "问 AI：今天市场真正变化了什么？",
    eyebrow: "Market Intelligence",
    headline: "什么值得关注？",
    summary: "今天的市场不是单边风险偏好，而是成长弹性、防守拥挤和宽基估值之间的再平衡。",
  },
  industry: {
    title: "行业",
    prompt: "问 AI：资金正在流向哪些行业？",
    eyebrow: "Industry Radar",
    headline: "资金正在流向哪里？",
    summary: "AI 算力仍是最强主线，高股息提供防守缓冲，创新药和消费复苏更依赖后续数据验证。",
  },
  "ai-research": {
    title: "AI投研",
    prompt: "问 AI：这个判断有哪些反方风险？",
    eyebrow: "AI Investment Research",
    headline: "今天应该如何思考？",
    summary: "AI 不给买卖指令，只把证据、反方风险和需要继续验证的问题摆清楚。",
  },
  learning: {
    title: "学习",
    prompt: "问 AI：今天我应该学哪个投资概念？",
    eyebrow: "Learning Center",
    headline: "先搞懂自己买的是什么",
    summary: "从股票、基金、ETF 和债券开始，建立一张清楚的投资地图，再逐步学习风险、估值与仓位。",
  },
};

/**
 * PhaseOnePage renders the four non-dashboard MVP pages with one shared language.
 * Each mode answers one question and keeps deeper product surfaces out of scope until Phase 1 quality is high enough.
 */
export function PhaseOnePage({ kind }: PhasePageProps) {
  const meta = pageMeta[kind];

  return (
    <AppShell pageTitle={meta.title} searchPrompt={meta.prompt}>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="border-b border-border/80 pb-6 pt-3 lg:pt-8"
      >
        <motion.div variants={fadeUp} transition={calmTransition} className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="text-primary">{meta.eyebrow}</span>
            <span className="h-3 w-px bg-border" />
            <span>{todayBrief.dateLabel}</span>
            <Badge variant="warning">Mock 数据</Badge>
          </div>
          <h2 className="mt-5 text-[34px] font-semibold leading-[1.08] text-balance sm:text-[48px]">{meta.headline}</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{meta.summary}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Database className="size-3.5" />
              当前为结构化 mock，等待真实数据源接入
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-3.5" />
              更新 {todayBrief.updatedAt}
            </span>
          </div>
        </motion.div>
      </motion.section>

      {kind === "market" ? <MarketPageContent /> : null}
      {kind === "industry" ? <IndustryPageContent /> : null}
      {kind === "ai-research" ? <AiResearchPageContent /> : null}
      {kind === "learning" ? <LearningPageContent /> : null}
    </AppShell>
  );
}

function MarketPageContent() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="soft-panel">
          <CardContent className="p-5 lg:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <LineChart className="size-3.5 text-primary" />
                  市场脉搏
                </p>
                <h3 className="mt-2 text-2xl font-semibold">风险偏好回升，但验证门槛也在提高</h3>
              </div>
              <Badge variant="warning">{todayBrief.mood}</Badge>
            </div>
            <MarketPulseChart />
            <div className="mt-4 flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-muted-foreground">实践问题：当前风险偏好下，一次买入宽基后会经历怎样的收益与回撤？</p>
              <Button asChild className="shrink-0" size="sm" variant="secondary">
                <Link href="/learning?practice=broad-etf&source=market#paper-investing">带入纸上实验</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-4 p-5">
            {[
              { label: "风险偏好", value: "57", change: "+9", tone: "positive" as const },
              { label: "流动性", value: "62", change: "+7", tone: "positive" as const },
              { label: "综合信号", value: "B", change: "观察", tone: "warning" as const },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center justify-between border-b border-border/70 pb-4 last:border-b-0 last:pb-0">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-1 text-3xl font-semibold tabular-nums">{metric.value}</p>
                </div>
                <Badge variant={metric.tone}>{metric.change}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {marketDigest.map((item) => (
          <Card key={item.title}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{item.tag}</Badge>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-6">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.impact}</p>
              <p className="mt-4 text-xs text-muted-foreground">来源：{item.source}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

function IndustryPageContent() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {hotSectors.map((sector) => {
        const Icon = sector.icon;
        const isPositive = sector.change >= 0;
        const practiceAsset = sector.name === "AI 算力" ? "growth-stock" : sector.name === "高股息" ? "dividend-etf" : "active-fund";

        return (
          <Card key={sector.name} className="transition-colors duration-150 hover:border-primary/30">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-md border border-border/80 bg-secondary/70 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{sector.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{sector.relatedAssets}</p>
                  </div>
                </div>
                <span className={isPositive ? "inline-flex items-center gap-1 text-sm font-semibold text-positive" : "inline-flex items-center gap-1 text-sm font-semibold text-negative"}>
                  {isPositive ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
                  {isPositive ? "+" : ""}
                  {sector.change}%
                </span>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">热度</span>
                  <span className="font-semibold">{sector.heat}/100</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${sector.heat}%` }} />
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="quiet-panel rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground">资金为什么关注</p>
                  <p className="mt-1 text-sm leading-6">{sector.driver}</p>
                </div>
                <div className="quiet-panel rounded-lg p-3">
                  <p className="text-xs font-semibold text-negative">必须一起看的风险</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{sector.risk}</p>
                </div>
              </div>
              <Button asChild className="mt-5 w-full" size="sm" variant="secondary">
                <Link href={`/learning?practice=${practiceAsset}&source=industry#paper-investing`}>用模拟验证行业判断</Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}

function AiResearchPageContent() {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      {researchPicks.map((pick, index) => (
        <Card key={pick.asset} className="border-ai/20">
          <CardContent className="grid h-full gap-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge variant="ai">
                  <Sparkles className="mr-1 size-3.5" />
                  {pick.title}
                </Badge>
                <h3 className="mt-4 text-xl font-semibold">{pick.asset}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pick.type} · {pick.stance}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">置信度</p>
                <p className="text-2xl font-semibold tabular-nums">{pick.confidence}%</p>
              </div>
            </div>

            <div className="rounded-lg border border-border/65 bg-secondary/35 p-3">
              <p className="text-xs font-semibold text-muted-foreground">分析框架</p>
              <p className="mt-1 text-sm leading-6">{pick.reason}</p>
            </div>
            <div className="rounded-lg border border-border/65 bg-secondary/35 p-3">
              <p className="inline-flex items-center gap-1 text-xs font-semibold text-negative">
                <ShieldAlert className="size-3.5" />
                Bear Case
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{pick.counterRisk}</p>
            </div>

            <div className="mt-auto grid gap-3">
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>数据源：Mock market feed</span>
                <span>更新：{pick.updatedAt}</span>
              </div>
              <RiskDisclaimer compact />
              <Button asChild variant="secondary">
                <Link href={`/learning?practice=${["broad-etf", "growth-stock", "dividend-etf"][index]}&source=ai-research#paper-investing`}>用纸上实验验证</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function LearningPageContent() {
  return <LearningExperience />;
}
