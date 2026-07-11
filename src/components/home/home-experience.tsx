"use client";

import { AppShell } from "@/components/shell/app-shell";
import { DashboardDecisionFlow } from "./dashboard-decision-flow";
import { TodayBrief } from "./today-brief";
import { LearningMoment } from "./learning-moment";

/**
 * HomeExperience assembles the Dashboard as one guided thought process.
 * The page answers "what matters today" before exposing supporting evidence or actions.
 */
export function HomeExperience() {
  return (
    <AppShell pageTitle="每日投资工作台" searchPrompt="问 AI：今天投资者应该关注什么？">
      <TodayBrief />

      <div className="grid gap-10 pt-8 lg:pt-10">
        <DashboardDecisionFlow />
        <LearningMoment />
      </div>
    </AppShell>
  );
}
