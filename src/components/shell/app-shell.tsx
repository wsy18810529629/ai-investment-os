"use client";

import { type ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/home/app-sidebar";
import { MobileNav } from "@/components/home/mobile-nav";
import { TopBar } from "@/components/home/top-bar";

type AppShellProps = {
  children: ReactNode;
  pageTitle?: string;
  searchPrompt?: string;
};

/**
 * AppShell owns the persistent product chrome for every Phase 1 page.
 * Shared navigation and theme behavior live here so each page can focus on answering one product question.
 */
export function AppShell({ children, pageTitle, searchPrompt }: AppShellProps) {
  const [isDark, setIsDark] = useState(true);

  /**
   * Theme state remains local for the MVP. When settings become a real product surface,
   * this can move to persisted user preferences without changing page layouts.
   */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AppSidebar />
        <main className="min-w-0 flex-1 px-4 pb-28 sm:px-6 lg:px-7 lg:pb-10">
          <TopBar
            isDark={isDark}
            onToggleTheme={() => setIsDark((current) => !current)}
            pageTitle={pageTitle}
            searchPrompt={searchPrompt}
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto grid max-w-[1340px] gap-5 py-5"
          >
            {children}
          </motion.div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
