"use client";

import { motion } from "framer-motion";
import { CheckCircle2, NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calmTransition, fadeUp } from "./motion-presets";

const prompts = [
  "我为什么关注这个行业或资产？",
  "什么情况会证明我的判断错了？",
  "如果它明天上涨或下跌，我是否会改变计划？",
];

/**
 * JournalPrompt is a lightweight reflection prompt inside the Dashboard.
 * It does not introduce a full Journal product surface during Phase 1; it simply turns reading into thinking.
 */
export function JournalPrompt() {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} transition={calmTransition}>
      <Card className="soft-panel overflow-hidden rounded-lg">
        <CardContent className="grid h-full gap-5 p-5 lg:p-6">
          <div>
            <p className="text-[12px] font-medium tracking-normal text-muted-foreground">今日复盘</p>
            <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-normal">今天有一个判断值得记录吗？</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              你今天查看了 AI 算力、沪深300 ETF 和红利风格。把判断写下来，未来复盘时才知道自己是在研究，还是在被情绪推动。
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button variant="secondary">
                <NotebookPen className="size-4" />
                整理今日想法
              </Button>
              <Button variant="ghost">稍后再看</Button>
            </div>
          </div>

          <div className="grid gap-3">
            {prompts.map((prompt) => (
              <div key={prompt} className="flex items-start gap-3 rounded-lg border border-border/60 bg-secondary/50 p-4">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-sm leading-6">{prompt}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
