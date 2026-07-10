"use client";

import { motion } from "framer-motion";
import { Clock3, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { marketDigest } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";
import { SectionHeading } from "./section-heading";

/**
 * MarketDigest sits below the action-oriented modules because news should supplement judgment, not dominate it.
 * Each news item explains investment impact instead of acting as a raw headline feed.
 */
export function MarketDigest() {
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
      <SectionHeading
        eyebrow="市场摘要"
        title="补充资讯"
        description="只保留与今日研究假设相关的资讯，并明确它可能影响哪些判断。"
      />
      <div className="overflow-hidden rounded-lg border border-border/90 bg-card shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
        {marketDigest.map((item) => (
          <motion.article key={item.title} variants={fadeUp} transition={calmTransition}>
            <Card className="rounded-none border-x-0 border-b-0 border-t first:border-t-0 shadow-none transition-colors duration-150 hover:bg-secondary/30">
              <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_auto] md:items-center md:p-5">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{item.tag}</Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="size-3.5" />
                      {item.time}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <ExternalLink className="size-3.5" />
                      {item.source}
                    </span>
                  </div>
                  <h3 className="font-semibold leading-6">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.impact}</p>
                </div>
                <Badge variant="ai">AI 解释影响</Badge>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
