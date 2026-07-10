"use client";

import { motion } from "framer-motion";
import { quickQuestions } from "@/data/home";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";

/**
 * AiCommandBar offers the smallest useful set of follow-up questions for today's brief.
 * It reduces prompt-writing friction without turning the Dashboard into a general chat surface.
 */
export function AiCommandBar() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-3 border-y border-border/80 py-4 lg:grid-cols-[220px_1fr] lg:items-center"
    >
      <motion.div variants={fadeUp} transition={calmTransition}>
        <div>
          <p className="text-[12px] font-medium text-primary">Ask Investment OS</p>
          <h2 className="mt-1 text-sm font-medium leading-5">基于今日工作台继续追问</h2>
        </div>
      </motion.div>
      <motion.div variants={fadeUp} transition={calmTransition} className="flex gap-2 overflow-x-auto pb-1 lg:justify-end">
        {quickQuestions.map((question) => {
          const Icon = question.icon;
          return (
            <button
              key={question.label}
              className="inline-flex h-8 shrink-0 items-center gap-2 rounded-md border border-border/80 bg-card/65 px-2.5 text-sm font-medium text-foreground/82 transition-colors duration-150 hover:border-primary/30 hover:bg-secondary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              type="button"
            >
              <Icon className="size-4" />
              {question.label}
            </button>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
