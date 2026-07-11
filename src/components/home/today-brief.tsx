"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Clock3, Database, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { researchPicks, todayBrief } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";
import { RiskDisclaimer } from "./risk-disclaimer";

/**
 * The Dashboard hero establishes one daily conclusion and one research
 * priority. Detailed market evidence stays on the Market page.
 */
export function TodayBrief() {
  const primaryResearch = researchPicks[0];

  return (
    <motion.section variants={staggerContainer} initial="hidden" animate="visible" className="border-b border-border/80 pb-6 pt-3 lg:pb-8 lg:pt-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] lg:items-stretch">
        <motion.div variants={fadeUp} transition={calmTransition} className="flex flex-col justify-center py-1 lg:py-5">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 text-primary"><span className="size-2 rounded-full bg-primary" />今日判断</span>
            <span className="h-3 w-px bg-border" />
            <span>{todayBrief.dateLabel}</span>
            <Badge variant="warning">{todayBrief.mood}</Badge>
          </div>

          <h2 className="mt-5 max-w-[820px] text-[32px] font-semibold leading-[1.1] text-balance sm:text-[42px] lg:text-[46px]">{todayBrief.headline}</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">今日的关键不是追逐最强方向，而是识别预期、估值与真实增长之间正在扩大的距离。</p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Database className="size-3.5" />市场行情与行业资讯</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" />更新 {todayBrief.updatedAt}</span>
          </div>

          <div className="mt-5 max-w-xl"><RiskDisclaimer compact /></div>
        </motion.div>

        <motion.div variants={fadeUp} transition={calmTransition}>
          <Card className="h-full border-primary/20 bg-card/95">
            <CardContent className="flex h-full flex-col p-5 lg:p-6">
              <div className="flex items-center justify-between gap-3">
                <Badge variant="neutral"><BrainCircuit className="mr-1 size-3.5 text-ai-foreground" />今日首要研究</Badge>
                <span className="text-xs text-muted-foreground">置信度 {primaryResearch.confidence}%</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold leading-8">AI 算力的高预期，能否继续被订单与利润验证？</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">产业趋势仍强，但价格已经计入较乐观的增长假设。今天先核对订单、毛利率和拥挤度。</p>
              <div className="mt-5 rounded-lg border border-negative/15 bg-negative-soft/45 p-3">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-negative"><ShieldAlert className="size-3.5" />需要同时验证</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{primaryResearch.counterRisk}</p>
              </div>
              <Button asChild className="mt-6 w-full lg:mt-auto" variant="primary">
                <Link href="/ai-research">开始今日研究<ArrowRight className="size-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
