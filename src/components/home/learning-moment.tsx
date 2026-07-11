"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { learningMoment } from "@/data/home";
import { calmTransition, fadeUp } from "./motion-presets";

/**
 * LearningMoment makes education contextual instead of feeling like a separate course library.
 * The topic is tied to today's market so the user learns exactly when the concept is useful.
 */
export function LearningMoment() {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} transition={calmTransition}>
      <Card className="border-primary/15 bg-card/95">
        <CardContent className="grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end lg:p-7">
          <div className="flex gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-md border border-primary/25 bg-ai-soft text-primary">
              <BookOpen className="size-4" />
            </div>
            <div>
              <p className="text-[12px] font-medium tracking-normal text-muted-foreground">今日学习</p>
              <h2 className="mt-2 text-[22px] font-semibold leading-8">{learningMoment.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{learningMoment.context}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock3 className="size-3.5" />
                预计 6 分钟 · 基础
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 max-w-sm text-sm leading-6 text-muted-foreground">
              学习页会继续解释概念、给出案例，并帮助你把它用在今天的市场判断中。
            </p>
            <Button asChild variant="secondary">
              <Link href="/learning">开始今日学习<ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
