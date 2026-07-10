"use client";

import { motion } from "framer-motion";
import { Clock3, Database, ShieldAlert, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { researchPicks } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";
import { RiskDisclaimer } from "./risk-disclaimer";
import { SectionHeading } from "./section-heading";

/**
 * AiResearchPicks converts AI output into transparent research prompts.
 * It avoids direct recommendation language and always pairs the investment logic with counter-risk and confidence.
 */
export function AiResearchPicks() {
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
      <SectionHeading
        eyebrow="AI投研"
        title="今天值得继续研究的对象"
        description="AI 只提供研究辅助：原因、风险、置信度、来源和更新时间必须同时出现。"
      />
      <div className="grid gap-4 xl:grid-cols-3">
        {researchPicks.map((pick) => (
          <motion.article key={pick.asset} variants={fadeUp} transition={calmTransition}>
            <Card className="h-full border-ai/20 bg-card/95 transition-colors duration-150 hover:border-ai/40">
              <CardContent className="grid h-full gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge variant="ai">
                      <Sparkles className="mr-1 size-3.5" />
                      {pick.title}
                    </Badge>
                    <h3 className="mt-3 text-xl font-semibold">{pick.asset}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {pick.type} · {pick.stance}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">置信度</p>
                    <p className="text-xl font-semibold tabular-nums">{pick.confidence}%</p>
                  </div>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-ai"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pick.confidence}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                <div className="grid gap-3">
                  <div className="rounded-lg border border-border/55 bg-secondary/32 p-3">
                    <p className="text-xs font-semibold text-muted-foreground">研究逻辑</p>
                    <p className="mt-1 text-sm leading-6">{pick.reason}</p>
                  </div>
                  <div className="rounded-lg border border-border/55 bg-secondary/32 p-3">
                    <p className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                      <ShieldAlert className="size-3.5" />
                      反方风险
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{pick.counterRisk}</p>
                  </div>
                </div>

                <div className="mt-auto grid gap-3">
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Database className="size-3.5" />
                      市场数据源
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3.5" />
                      {pick.updatedAt}
                    </span>
                  </div>
                  <RiskDisclaimer compact />
                  <Button className="h-10" variant="secondary">打开结构化分析</Button>
                </div>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
