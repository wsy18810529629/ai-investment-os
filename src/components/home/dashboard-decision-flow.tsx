"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Clock3, Database, LineChart, Radar, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hotSectors, researchPicks, todayBrief } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";
import { RiskDisclaimer } from "./risk-disclaimer";
import { SectionHeading } from "./section-heading";

const supportingSignals = [
  {
    label: "市场环境",
    title: "风险偏好回升，但不足以支持追涨",
    summary: "流动性保持稳定，接下来要观察上涨是否得到盈利预期支持。",
    href: "/market",
    action: "查看市场变化",
    icon: LineChart,
  },
  {
    label: "资金方向",
    title: `${hotSectors[0].name} 仍是主线，拥挤度成为新变量`,
    summary: "产业景气仍在，但高估值让业绩验证变得更重要。",
    href: "/industry",
    action: "查看行业证据",
    icon: Radar,
  },
] as const;

/**
 * One primary signal establishes today's research priority. Supporting signals
 * stay compact so the Dashboard makes a decision about importance for the user.
 */
export function DashboardDecisionFlow() {
  const primaryResearch = researchPicks[0];

  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
      <motion.div variants={fadeUp} transition={calmTransition}>
        <SectionHeading
          eyebrow="今日重点"
          title="先研究这一件事"
          description="今天不需要追完所有变化。先判断上涨背后的预期，是否能被真实增长验证。"
        />
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <motion.div variants={fadeUp} transition={calmTransition}>
          <Card className="h-full border-primary/20 bg-card/95">
            <CardContent className="flex h-full flex-col p-5 lg:min-h-[390px] lg:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant="neutral"><BrainCircuit className="mr-1 size-3.5 text-ai-foreground" />首要研究</Badge>
                <span className="text-xs text-muted-foreground">AI 置信度 {primaryResearch.confidence}%</span>
              </div>

              <h3 className="mt-6 max-w-2xl text-2xl font-semibold leading-8 lg:text-[30px] lg:leading-10">
                AI 算力的高预期，能否继续被订单与利润验证？
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                产业趋势仍强，但市场已经计入较乐观的增长假设。今天更值得核对订单兑现、毛利率和主题拥挤度，而不是只看涨幅。
              </p>

              <div className="mt-6 rounded-lg border border-negative/15 bg-negative-soft/45 p-4">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-negative"><ShieldAlert className="size-3.5" />反方风险</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{primaryResearch.counterRisk}</p>
              </div>

              <div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Database className="size-3.5" />市场行情、行业资讯</span>
                  <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" />更新 {todayBrief.updatedAt}</span>
                </div>
                <Button asChild className="shrink-0" variant="primary">
                  <Link href="/ai-research">查看完整研究<ArrowRight className="size-4" /></Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-4">
          {supportingSignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div key={signal.label} variants={fadeUp} transition={{ ...calmTransition, delay: 0.04 + index * 0.04 }}>
                <Link className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" href={signal.href}>
                  <Card className="h-full transition-[border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/25">
                    <CardContent className="flex h-full min-h-[124px] flex-col p-4 sm:min-h-[150px] sm:p-5">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"><Icon className="size-4 text-primary" />{signal.label}</span>
                      <h3 className="mt-3 text-lg font-semibold leading-6 sm:mt-4">{signal.title}</h3>
                      <p className="mt-2 hidden text-sm leading-6 text-muted-foreground sm:block">{signal.summary}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-medium group-hover:text-primary sm:pt-4">{signal.action}<ArrowRight className="size-4" /></span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 max-w-xl"><RiskDisclaimer compact /></div>
    </motion.section>
  );
}
