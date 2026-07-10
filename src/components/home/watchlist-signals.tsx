"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, NotebookPen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { watchSignals, type RiskLevel, type SignalState } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";
import { SectionHeading } from "./section-heading";

const riskVariant: Record<RiskLevel, "positive" | "warning" | "negative"> = {
  低: "positive",
  中: "warning",
  高: "negative",
};

const stateVariant: Record<SignalState, "neutral" | "positive" | "warning"> = {
  New: "warning",
  Watching: "neutral",
  Logged: "positive",
};

/**
 * WatchlistSignals connects the daily market context to assets the user already cares about.
 * The component stays compact because the Dashboard is not the full Watchlist product surface.
 */
export function WatchlistSignals() {
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
      <SectionHeading
        eyebrow="个人关注"
        title="哪些观察对象需要重新看一眼"
        description="只呈现有触发原因的变化；涨跌不是结论，触发原因才是研究入口。"
        action={<Button className="h-9" variant="ghost">管理观察规则</Button>}
      />
      <div className="overflow-hidden rounded-lg border border-border/80 bg-card/75">
        {watchSignals.map((signal) => {
          const isPositive = signal.change >= 0;
          return (
            <motion.div key={signal.code} variants={fadeUp} transition={calmTransition}>
              <Card className="rounded-none border-x-0 border-b-0 border-t first:border-t-0 shadow-none transition-colors duration-150 hover:bg-secondary/25">
                <CardContent className="grid gap-4 p-4 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.25fr)_auto] lg:items-center lg:p-5">
                  <div className="flex items-start justify-between gap-3 lg:block">
                    <div>
                      <h3 className="text-base font-semibold">{signal.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {signal.code} · {signal.type}
                      </p>
                    </div>
                    <span className={isPositive ? "inline-flex items-center gap-1 text-sm font-semibold text-positive" : "inline-flex items-center gap-1 text-sm font-semibold text-negative"}>
                      {isPositive ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
                      {isPositive ? "+" : ""}
                      {signal.change}%
                    </span>
                  </div>

                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge variant={stateVariant[signal.state]}>{signal.state}</Badge>
                      <Badge variant={riskVariant[signal.risk]}>风险 {signal.risk}</Badge>
                    </div>
                    <p className="text-sm leading-6">
                      <span className="font-medium">触发原因：</span>
                      {signal.trigger}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{signal.aiSummary}</p>
                  </div>

                  <div className="flex gap-2 lg:justify-end">
                    <Button variant="secondary" size="sm">
                      查看依据
                    </Button>
                    <Button variant="ghost" size="sm">
                      <NotebookPen className="size-4" />
                      记录想法
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
