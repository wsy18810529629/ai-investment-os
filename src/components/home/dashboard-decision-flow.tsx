"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Clock3, Database, LineChart, Radar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hotSectors, researchPicks, todayBrief } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";
import { RiskDisclaimer } from "./risk-disclaimer";
import { SectionHeading } from "./section-heading";

const dailySignals = [
  {
    label: "市场环境",
    title: "风险偏好回升，但不足以支持追涨",
    summary: "流动性保持稳定，市场情绪较早盘改善；当前更重要的是观察上涨是否得到盈利预期支持。",
    takeaway: "查看市场变化与宏观背景",
    href: "/market",
    icon: LineChart,
  },
  {
    label: "资金方向",
    title: `${hotSectors[0].name} 仍是主线，拥挤度成为新变量`,
    summary: hotSectors[0].driver,
    takeaway: "查看资金流向与行业风险",
    href: "/industry",
    icon: Radar,
  },
  {
    label: "研究判断",
    title: "今天更适合验证假设，而不是扩大仓位",
    summary: researchPicks[0].reason,
    takeaway: "查看完整证据与反方观点",
    href: "/ai-research",
    icon: BrainCircuit,
  },
] as const;

/**
 * The Dashboard exposes only the conclusion of each research domain.
 * Each signal has one explicit destination so deeper evidence stays on its owning page.
 */
export function DashboardDecisionFlow() {
  const primaryResearch = researchPicks[0];

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div variants={fadeUp} transition={calmTransition}>
        <SectionHeading
          eyebrow="今日信号"
          title="三件值得你继续理解的事"
          description="这里给结论和方向。完整行情、行业证据与 AI 推理分别留在对应研究页面。"
        />
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-3">
        {dailySignals.map((signal, index) => {
          const Icon = signal.icon;

          return (
            <motion.div key={signal.label} variants={fadeUp} transition={{ ...calmTransition, delay: index * 0.04 }}>
              <Link className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" href={signal.href}>
                <Card className="h-full transition-[border-color,transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/25 group-hover:shadow-[0_10px_30px_rgba(30,42,36,0.06)]">
                  <CardContent className="flex h-full min-h-[260px] flex-col p-5 lg:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Icon className="size-4 text-primary" />
                        {signal.label}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                    </div>

                    <h3 className="mt-8 text-xl font-semibold leading-7">{signal.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{signal.summary}</p>

                    <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      {signal.takeaway}
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        variants={fadeUp}
        transition={calmTransition}
        className="mt-4 flex flex-col gap-4 rounded-2xl border border-border/75 bg-secondary/35 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral">AI 研究摘要</Badge>
            <span className="text-xs text-muted-foreground">置信度 {primaryResearch.confidence}%</span>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6">
            反方风险：{primaryResearch.counterRisk}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Database className="size-3.5" />市场行情、行业资讯</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" />更新 {todayBrief.updatedAt}</span>
          </div>
        </div>
        <Button asChild className="shrink-0" variant="secondary">
          <Link href="/ai-research">进入 AI 投研<ArrowRight className="size-4" /></Link>
        </Button>
      </motion.div>

      <div className="mt-3 max-w-xl">
        <RiskDisclaimer compact />
      </div>
    </motion.section>
  );
}
