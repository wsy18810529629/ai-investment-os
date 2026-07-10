"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
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
      <Card className="border-primary/20 bg-card/95">
        <CardContent className="grid gap-5 p-5 lg:grid-cols-[0.72fr_1.28fr] lg:p-6">
          <div className="flex gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-md border border-primary/25 bg-ai-soft text-primary">
              <BookOpen className="size-4" />
            </div>
            <div>
              <p className="text-[12px] font-medium tracking-normal text-muted-foreground">今日学习</p>
              <h2 className="mt-2 text-[22px] font-semibold leading-8">{learningMoment.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{learningMoment.context}</p>
            </div>
          </div>

          <div className="grid gap-3">
            {learningMoment.points.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/72 p-4">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-sm leading-6">{point}</p>
              </div>
            ))}
            <Button className="justify-self-start" variant="secondary">
              继续学习这个概念
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
