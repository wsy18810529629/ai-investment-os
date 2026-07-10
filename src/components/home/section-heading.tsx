import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

/**
 * SectionHeading standardizes the information hierarchy for every homepage module.
 * Eyebrows orient the user, titles explain the module, and descriptions reduce finance jargon.
 */
export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[12px] font-medium tracking-normal text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-semibold leading-7 tracking-normal text-foreground">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
