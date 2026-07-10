"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNavigationGroups } from "@/data/home";
import { Button } from "@/components/ui/button";
import { RiskDisclaimer } from "./risk-disclaimer";
import { calmTransition, fadeUp, staggerContainer } from "./motion-presets";

/**
 * AppSidebar frames the product as an operating system instead of a single dashboard.
 * The navigation is intentionally limited to the Phase 1 MVP pages so the product quality stays focused.
 */
export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-[260px] shrink-0 border-r border-border/80 bg-card/50 px-4 py-5 backdrop-blur-xl lg:sticky lg:top-0 lg:flex lg:flex-col">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} transition={calmTransition}>
        <motion.div variants={fadeUp} transition={calmTransition} className="flex items-center gap-3 px-1">
          <div className="grid size-9 place-items-center rounded-md border border-border/80 bg-secondary/70 text-primary">
            <BriefcaseBusiness className="size-5" />
          </div>
          <div>
            <p className="text-[17px] font-semibold leading-6">AI Investment OS</p>
            <p className="text-xs leading-5 text-muted-foreground">每日投资研究与成长系统</p>
          </div>
        </motion.div>

        <motion.nav variants={fadeUp} transition={calmTransition} className="mt-8 grid gap-5" aria-label="主导航">
          {sidebarNavigationGroups.map((group) => (
            <div key={group.label} className="grid gap-1">
              <p className="px-3 text-[11px] font-medium text-muted-foreground">{group.label}</p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={
                      isActive
                        ? "flex h-9 items-center gap-3 rounded-md border border-border/80 bg-secondary/72 px-3 text-sm font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        : "flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary/70 hover:text-foreground"
                    }
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="size-[18px]" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </motion.nav>
      </motion.div>

      <div className="mt-auto grid gap-3">
        <RiskDisclaimer compact />
        <Button className="justify-start" variant="ghost">
          <Settings className="size-4" />
          Settings
        </Button>
      </div>
    </aside>
  );
}
