"use client";

import { Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { todayBrief } from "@/data/home";

type TopBarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  pageTitle?: string;
  searchPrompt?: string;
};

/**
 * TopBar keeps the user's daily context and global AI access visible.
 * The central search-like control behaves as a product promise: AI can reason across market, watchlist, and journal context.
 */
export function TopBar({
  isDark,
  onToggleTheme,
  pageTitle = "每日投资工作台",
  searchPrompt = "问 AI：今天投资者应该关注什么？",
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 -mx-4 border-b border-border/80 bg-background/82 px-4 py-3.5 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-7 lg:px-7">
      <div className="mx-auto flex max-w-[1340px] flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-[12px] font-medium tracking-normal text-muted-foreground">{todayBrief.dateLabel}</p>
          <h1 className="mt-0.5 text-[17px] font-semibold leading-6 tracking-normal">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="flex h-10 min-w-0 flex-1 items-center gap-3 rounded-lg border border-border/80 bg-card/82 px-3.5 text-left text-sm text-muted-foreground shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out hover:bg-secondary/70 sm:w-[380px] sm:flex-none 2xl:w-[440px]"
            type="button"
          >
            <Search className="size-4 shrink-0 text-ai-foreground" />
            <span className="truncate">{searchPrompt}</span>
          </button>
          <Button
            className="h-10 shrink-0 px-3 sm:px-4"
            variant="secondary"
            onClick={onToggleTheme}
            aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            <span className="hidden sm:inline">{isDark ? "浅色" : "深色"}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
