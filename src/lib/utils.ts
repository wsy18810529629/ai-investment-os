import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names and resolves Tailwind conflicts.
 * This mirrors the shadcn/ui utility contract so product components can stay concise.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
