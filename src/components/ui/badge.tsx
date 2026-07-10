import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Compact status labels for asset type, risk, confidence, and state.
 * Colors intentionally stay low-saturation to avoid trading-terminal anxiety.
 */
const badgeVariants = cva(
  "inline-flex min-h-6 items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        neutral: "border-transparent bg-secondary text-muted-foreground",
        positive: "border-transparent bg-positive-soft text-positive",
        negative: "border-transparent bg-negative-soft text-negative",
        warning: "border-transparent bg-warning-soft text-warning",
        ai: "border-ai/15 bg-ai-soft/70 text-ai-foreground",
        outline: "border-border/70 bg-card/40 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
