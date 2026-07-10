# Investment OS Design System

Version: 2.0

This document is the default reference for every UI decision in Investment OS.
Read it before creating or substantially modifying any interface.

Use `COMPONENT_LIBRARY.md` for component-level anatomy, variants, states,
spacing, radius, and reuse rules.

## Design Goal

Investment OS should carry the quality and restraint of:

- Apple Journal
- Notion
- Linear
- Raycast
- Bloomberg, at minimal density
- Kinfolk Magazine
- Monocle
- Financial Times

References establish a quality bar, not a template. The final interface must
feel original to Investment OS.

The product should feel warm, intelligent, and premium.

Never cold. Never template-like. Never overly decorative.

## Design Language

Every interface should be:

- Calm
- Focused
- Readable
- Editorial
- Professional
- Soft
- Premium
- Human
- Timeless

When visual choices conflict, prioritize clarity and trust before novelty.

## Layout

Whitespace is a feature. Never fill space merely because it is available.

- Use breathing room to establish priority.
- Give each section one purpose.
- Avoid long, undifferentiated dashboards.
- Create visual rhythm by alternating density, scale, and composition.
- Keep related information close and unrelated information clearly separated.
- Prefer progressive disclosure over showing everything at once.
- Do not put cards inside cards.
- Do not turn every section into a floating container.

Each screen must answer the primary question defined in
`PRODUCT.md`.

## Typography

Typography creates hierarchy.

- Use large titles only for important ideas.
- Use comfortable spacing and readable paragraphs.
- Keep labels short.
- Never use tiny text to force information into a layout.
- Use weight, scale, and spacing before adding color.
- Keep line length controlled for long-form explanations.
- Use tabular numbers for comparable financial data.
- Maintain clear contrast between titles, body text, labels, and metadata.
- Do not scale font size directly with viewport width.
- Keep letter spacing neutral.

## Cards

Every card communicates one idea.

Good:

> Market Sentiment

Bad:

> Market + News + Chart + Learning + Portfolio

Cards are appropriate for repeated objects, contained tools, or content that
benefits from a clear boundary. They are not the default solution for every
section.

- Keep card radius restrained.
- Avoid excessive shadows.
- Use internal hierarchy instead of decorative surfaces.
- Remove a card boundary when spacing and typography already provide enough
  structure.

## Buttons

### Primary

Use one primary action per view or decision context.

### Secondary

Use secondary actions for supporting commands.

### Danger

Use danger actions rarely and only for destructive outcomes.

Avoid colorful button collections. Color must communicate priority or meaning,
not decoration.

- Use icons for familiar tool actions.
- Use icon and text when the command could be ambiguous.
- Provide visible hover, focus, active, loading, and disabled states.
- Do not use pill-shaped text controls when a standard control is clearer.

## Icons and Illustration

- Use minimal icons with consistent stroke width.
- Use the project's established icon library.
- Do not use emoji in navigation.
- Prefer illustrations or clear diagrams when explaining a concept that icons
  cannot communicate.
- Do not use icons as decoration without semantic value.

## Charts

Charts answer questions; they do not merely display numbers.

Every chart must include:

- Title
- Context
- Time range
- Explanation
- Trend

When relevant, also include source, freshness, units, benchmarks, and event
annotations.

- Avoid unnecessary gridlines.
- Keep axes and labels legible.
- Use professional financial color semantics.
- Never rely on color alone to distinguish important series.
- Tooltips should clarify the insight, not repeat raw coordinates.
- Empty, loading, and error states must preserve the chart's intended context.

## Colors

### Core Roles

| Role | Direction |
| --- | --- |
| Background | Warm white |
| Secondary surface | Light neutral |
| Primary text | Charcoal |
| Positive | Deep green |
| Negative | Muted red |
| Warning | Amber |
| Accent | Slate blue |

Avoid neon, high saturation, and large areas of alarm color.

- Positive and negative colors represent financial meaning only.
- Accent color guides focus and interaction.
- Use neutral tones for structure and hierarchy.
- Ensure accessible contrast in all states.
- Do not introduce a new color without assigning it a semantic role.

The implementation should express these roles through shared design tokens,
never repeated arbitrary values.

## Motion

Motion explains; it does not entertain.

- Standard duration: 150-250ms.
- Use restrained easing.
- No bouncing.
- No dramatic zoom.
- Prefer small fades, position changes, and shared-state transitions.
- Use animation to communicate priority, change, continuity, or system status.
- Respect reduced-motion preferences.
- Do not delay repeated workflows for visual effect.

## Empty States

Never leave a required state blank. Every empty state should teach or guide.

Good:

> No watchlist yet. Add companies you want to understand.

Bad:

> No Data.

An empty state should explain:

1. What is missing
2. Why it is useful
3. What the user can do next

## Loading

- Use skeletons that reflect the final layout.
- Never show an indefinite spinner as the only feedback.
- Keep stable dimensions to prevent layout shifts.
- Preserve context while refreshing data.
- Loading should feel active but calm.

## Dark Mode

Dark mode is not an inverted light mode.

- Redesign contrast carefully.
- Keep surfaces distinguishable without excessive borders.
- Reduce glare from bright text and saturated accents.
- Recheck chart series, semantic colors, shadows, focus states, and disabled
  controls independently.
- Dark mode must preserve the same hierarchy and warmth as light mode.

## Responsive Behavior

Do not simply shrink the desktop layout.

- Re-evaluate priority and disclosure at every breakpoint.
- Keep primary actions reachable.
- Convert dense comparisons into appropriate mobile patterns.
- Ensure text, charts, controls, and navigation never overlap.
- Avoid horizontal page overflow.
- Keep touch targets usable.
- Prevent fixed navigation from hiding required content.

## UI Review Checklist

Before presenting a UI, verify:

1. Does this screen answer one clear question?
2. Is the first visual priority obvious within three seconds?
3. Can any information be removed or deferred?
4. Does every card communicate one idea?
5. Does every chart explain a useful insight?
6. Is there only one primary action in each decision context?
7. Are type hierarchy and spacing doing more work than color?
8. Does motion explain rather than decorate?
9. Are empty, loading, error, and dark-mode states considered?
10. Does the result feel original, warm, calm, and premium rather than
    template-generated?

If any answer is unclear, improve the interface before delivery.
