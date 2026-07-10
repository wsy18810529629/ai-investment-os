"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/data/home";

/**
 * MobileNav preserves the core daily workflow on small screens.
 * Only primary destinations are shown horizontally, while secondary pages can later move into a More menu.
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-lg border border-border bg-card/95 p-1 shadow-dark-calm backdrop-blur-xl lg:hidden"
      aria-label="移动端主导航"
    >
      {navigationItems.slice(0, 5).map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={
              isActive
                ? "grid min-h-12 place-items-center rounded-md bg-secondary text-xs font-semibold text-foreground"
                : "grid min-h-12 place-items-center rounded-md text-xs font-medium text-muted-foreground"
            }
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="mb-1 size-4" />
            {item.label}
          </Link>
        );
      })}
    </motion.nav>
  );
}
