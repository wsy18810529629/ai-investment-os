import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskDisclaimerProps = {
  compact?: boolean;
};

/**
 * RiskDisclaimer is intentionally repeated near AI and market modules.
 * Investment safety boundaries must stay visible instead of being hidden inside settings or legal pages.
 */
export function RiskDisclaimer({ compact = false }: RiskDisclaimerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/36 text-muted-foreground",
        compact ? "px-3 py-2 text-xs leading-5" : "px-4 py-3 text-sm leading-6",
      )}
    >
      <ShieldAlert className="size-4 shrink-0 text-warning" />
      <span>内容仅供研究和学习，不构成投资建议</span>
    </div>
  );
}
