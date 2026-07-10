"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { hotSectors } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";
import { SectionHeading } from "./section-heading";

/**
 * HotSectors presents market heat as research context rather than a chase-the-rally leaderboard.
 * The heat bar is deliberately low-saturation and every sector includes a visible risk statement.
 */
export function HotSectors() {
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
      <SectionHeading
        eyebrow="行业热点"
        title="今天被市场讨论的行业"
        description="排序依据综合热度、资讯数量、观察列表关联度和 AI 关注度；不是买入排序。"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {hotSectors.map((sector) => {
          const Icon = sector.icon;
          const isPositive = sector.change >= 0;
          return (
            <motion.article key={sector.name} variants={fadeUp} transition={calmTransition}>
              <Card className="h-full transition-colors duration-150 hover:border-primary/30">
                <CardContent className="grid gap-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="grid size-9 place-items-center rounded-md border border-border/80 bg-secondary/72 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{sector.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{sector.relatedAssets}</p>
                      </div>
                    </div>
                    <span className={isPositive ? "inline-flex items-center gap-1 text-sm font-semibold text-positive" : "inline-flex items-center gap-1 text-sm font-semibold text-negative"}>
                      {isPositive ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
                      {isPositive ? "+" : ""}
                      {sector.change}%
                    </span>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">行业热度</span>
                      <span className="font-semibold">{sector.heat}/100</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${sector.heat}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="quiet-panel rounded-lg p-3">
                      <p className="text-xs font-semibold text-muted-foreground">核心驱动</p>
                      <p className="mt-1 text-sm leading-6">{sector.driver}</p>
                    </div>
                    <div className="quiet-panel rounded-lg p-3">
                      <p className="text-xs font-semibold text-negative">反方风险</p>
                      <p className="mt-1 text-sm leading-6 text-negative">{sector.risk}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">查看行业详情</Badge>
                    <Badge variant="ai">Ask AI 解读</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
