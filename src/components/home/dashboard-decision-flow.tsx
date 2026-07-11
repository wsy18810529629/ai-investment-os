"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, BrainCircuit, FlaskConical, LineChart, Radar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { hotSectors } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";
import { SectionHeading } from "./section-heading";

const supportingSignals = [
  {
    label: "市场背景",
    title: "风险偏好回升，但不足以支持追涨",
    summary: "流动性保持稳定，接下来观察上涨是否得到盈利预期支持。",
    href: "/market",
    action: "理解市场变化",
    icon: LineChart,
  },
  {
    label: "行业背景",
    title: `${hotSectors[0].name} 仍是主线，拥挤度成为新变量`,
    summary: "产业景气仍在，但高估值让业绩验证变得更重要。",
    href: "/industry",
    action: "查看行业证据",
    icon: Radar,
  },
] as const;

const researchPath = [
  { label: "市场", description: "判断环境", href: "/market", icon: LineChart },
  { label: "行业", description: "找到资金方向", href: "/industry", icon: Radar },
  { label: "AI 投研", description: "检查正反证据", href: "/ai-research", icon: BrainCircuit },
  { label: "学习", description: "补足关键概念", href: "/learning", icon: BookOpen },
  { label: "纸上验证", description: "观察收益与回撤", href: "/learning?practice=growth-stock&source=ai-research#paper-investing", icon: FlaskConical },
] as const;

/**
 * Supporting evidence remains brief while the path explains how every MVP
 * module contributes to one complete daily research loop.
 */
export function DashboardDecisionFlow() {
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
      <motion.div variants={fadeUp} transition={calmTransition}>
        <SectionHeading eyebrow="研究路径" title="从背景到验证，一步一步完成" description="今日页负责安排顺序；市场、行业、AI 投研、学习和纸上实验各自完成一件事。" />
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.86fr)_minmax(420px,1.14fr)]">
        <div className="grid gap-4">
          {supportingSignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div key={signal.label} variants={fadeUp} transition={{ ...calmTransition, delay: index * 0.04 }}>
                <Link className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" href={signal.href}>
                  <Card className="transition-[border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/25">
                    <CardContent className="p-5">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"><Icon className="size-4 text-primary" />{signal.label}</span>
                      <h3 className="mt-3 text-lg font-semibold leading-6">{signal.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{signal.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium group-hover:text-primary">{signal.action}<ArrowRight className="size-4" /></span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={fadeUp} transition={calmTransition}>
          <Card className="h-full bg-card/85">
            <CardContent className="p-5 lg:p-6">
              <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-medium text-primary">今天怎么走</p><h3 className="mt-2 text-xl font-semibold">完成一次研究闭环</h3></div><span className="text-xs text-muted-foreground">约 20 分钟</span></div>
              <div className="mt-5 overflow-hidden rounded-lg border border-border/75">
                {researchPath.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Link key={step.label} href={step.href} className="group flex min-h-14 items-center gap-3 border-t border-border/70 px-4 py-3 first:border-t-0 hover:bg-secondary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                      <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                      <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border/75 bg-secondary/45 text-primary"><Icon className="size-4" /></span>
                      <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{step.label}</span><span className="mt-0.5 block text-xs text-muted-foreground">{step.description}</span></span>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
