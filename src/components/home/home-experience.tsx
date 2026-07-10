"use client";

import { AppShell } from "@/components/shell/app-shell";
import { AiCommandBar } from "./ai-command-bar";
import { DashboardDecisionFlow } from "./dashboard-decision-flow";
import { TodayBrief } from "./today-brief";
import { WatchlistSignals } from "./watchlist-signals";
import { JournalPrompt } from "./journal-prompt";
import { LearningMoment } from "./learning-moment";

/**
 * HomeExperience assembles the Dashboard as one guided thought process.
 * The page answers "what matters today" before exposing supporting evidence or actions.
 */
export function HomeExperience() {
  return (
    <AppShell pageTitle="每日投资工作台" searchPrompt="问 AI：今天投资者应该关注什么？">
      <TodayBrief />
      <AiCommandBar />

      <div className="grid gap-7">
        <DashboardDecisionFlow />
        <WatchlistSignals />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
          <LearningMoment />
          <JournalPrompt />
        </div>
      </div>
    </AppShell>
  );
}
