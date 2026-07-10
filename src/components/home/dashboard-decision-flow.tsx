"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Database, ShieldAlert, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { hotSectors, marketDigest, researchPicks, todayBrief } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";
import { RiskDisclaimer } from "./risk-disclaimer";
import { SectionHeading } from "./section-heading";

/**
 * DashboardDecisionFlow compresses Market, Industry, and AI投研 into one guided decision context.
 * The Dashboard should not reproduce those pages; it should show just enough evidence for the user to know what deserves attention today.
 */
export function DashboardDecisionFlow() {
  const primaryResearch = researchPicks[0];
  const leadingSector = hotSectors[0];
  const defensiveSector = hotSectors[1];

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]"
    >
      <motion.div variants={fadeUp} transition={calmTransition}>
        <SectionHeading
          eyebrow="今日重点"
          title="先判断环境，再判断资产"
          description="首页只保留会改变研究方向的信息；更深的行业、市场和 AI 分析留给对应页面。"
        />

        <Card className="soft-panel">
          <CardContent className="grid gap-6 p-5 lg:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Badge variant="neutral">
                  <Sparkles className="mr-1 size-3.5 text-ai-foreground" />
                  AI 摘要
                </Badge>
                <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-8">
                  今天更适合做“验证假设”，不是扩大情绪化仓位。
                </h3>
              </div>
              <div className="rounded-lg border border-border/70 bg-secondary/45 px-3 py-2 text-right">
                <p className="text-xs text-muted-foreground">置信度</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{primaryResearch.confidence}%</p>
              </div>
            </div>

            <div className="hidden gap-3 md:grid md:grid-cols-3">
              {todayBrief.summary.map((item, index) => (
                <div key={item.title} className="rounded-lg border border-border/70 bg-card/55 p-4">
                  <p className="font-mono text-xs text-primary">0{index + 1}</p>
                  <h4 className="mt-3 text-sm font-semibold leading-5">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.explanation}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border/70 bg-card/55 p-4 md:hidden">
              <p className="text-xs font-semibold text-muted-foreground">今天最重要的一句话</p>
              <p className="mt-2 text-sm leading-6">
                科技成长和高股息同时被关注，但真正需要判断的是预期、估值和拥挤度是否已经透支。
              </p>
            </div>

            <div className="grid gap-3 border-t border-border/75 pt-5 md:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">支持证据</p>
                <p className="mt-2 text-sm leading-6">{primaryResearch.reason}</p>
              </div>
              <div>
                <p className="inline-flex items-center gap-1 text-xs font-semibold text-negative">
                  <ShieldAlert className="size-3.5" />
                  反方风险
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{primaryResearch.counterRisk}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Database className="size-3.5" />
                数据源：市场行情、行业资讯、观察信号
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-3.5" />
                更新：{todayBrief.updatedAt}
              </span>
            </div>

            <RiskDisclaimer compact />
          </CardContent>
        </Card>
      </motion.div>

      <motion.aside variants={fadeUp} transition={calmTransition} className="grid gap-4 self-start">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">资金流向</p>
                <h3 className="mt-1 text-xl font-semibold">{leadingSector.name} 仍是主线</h3>
              </div>
              <Badge variant="positive">热度 {leadingSector.heat}</Badge>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{leadingSector.driver}</p>
            <div className="mt-4 rounded-lg border border-border/70 bg-secondary/45 p-3">
              <p className="text-xs font-semibold text-negative">需要警惕</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{leadingSector.risk}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-muted-foreground">防守线索</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold">{defensiveSector.name}</h3>
              <Badge variant="warning">拥挤度观察</Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{defensiveSector.driver}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">这类资产适合降低组合波动预期，但不适合被当作短期追涨理由。</p>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-lg border border-border/80 bg-card/75">
          {marketDigest.slice(0, 2).map((item) => (
            <article key={item.title} className="border-t border-border/70 p-4 first:border-t-0">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{item.tag}</Badge>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
              <h4 className="mt-3 text-sm font-semibold leading-5">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.impact}</p>
            </article>
          ))}
        </div>

        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border/80 bg-card text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          type="button"
        >
          打开今日完整研究脉络
          <ArrowUpRight className="size-4" />
        </button>
      </motion.aside>
    </motion.section>
  );
}
