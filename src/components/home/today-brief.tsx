"use client";

import { motion } from "framer-motion";
import { Clock3, Database, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { todayBrief } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";
import { RiskDisclaimer } from "./risk-disclaimer";
import { MarketPulseChart } from "./market-pulse-chart";

/**
 * The opening canvas turns the daily brief into a narrative instead of another dashboard card.
 * One market thesis leads the eye, the live pulse supports it, and evidence follows in reading order.
 */
export function TodayBrief() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden border-b border-border/80 pb-5 pt-3 lg:pb-7 lg:pt-8"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:items-end">
        <motion.div variants={fadeUp} transition={calmTransition} className="pb-1 lg:pb-5">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              MARKET INTELLIGENCE
            </span>
            <span className="h-3 w-px bg-border" />
            <span>{todayBrief.greeting}</span>
            <Badge variant="warning">{todayBrief.mood}</Badge>
          </div>

          <h2 className="mt-5 max-w-[820px] text-[32px] font-semibold leading-[1.1] tracking-normal text-balance sm:text-[42px] lg:text-[46px]">
            {todayBrief.headline}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            今日的关键不是追逐最强方向，而是识别预期、估值与真实增长之间正在扩大的距离。
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Database className="size-3.5" />
              {todayBrief.source}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-3.5" />
              更新 {todayBrief.updatedAt}
            </span>
          </div>
        </motion.div>

        <motion.aside
          variants={fadeUp}
          transition={calmTransition}
          className="relative border-l-0 border-border/80 pl-0 lg:border-l lg:pl-7"
        >
          <div className="mb-1 flex items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Radio className="size-3.5 text-primary" />
                实时市场脉搏
              </p>
              <h3 className="mt-1 text-lg font-semibold">情绪正在回升，流动性保持稳定</h3>
            </div>
            <span className="font-mono text-xs text-muted-foreground">09:30—15:00</span>
          </div>

          <div className="hidden lg:block">
            <MarketPulseChart />
          </div>

          <div className="mt-4 grid grid-cols-3 divide-x divide-border/80 border-y border-border/80 lg:mt-0">
            {[
              { label: "风险偏好", value: "57", delta: "+9" },
              { label: "流动性", value: "62", delta: "+7" },
              { label: "综合信号", value: "B", delta: "观察" },
            ].map((metric) => (
              <div key={metric.label} className="px-3 py-3 first:pl-0 last:pr-0">
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tabular-nums">{metric.value}</span>
                  <span className="text-xs text-primary">{metric.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>

      <div className="mt-4 max-w-xl lg:mt-6">
        <RiskDisclaimer compact />
      </div>
    </motion.section>
  );
}
