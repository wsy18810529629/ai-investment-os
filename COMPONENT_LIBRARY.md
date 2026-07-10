# Investment OS Component Library

Version: 1.0

This document defines the shared component language for Investment OS. Every
new or modified component must follow these rules.

## Design Principle

Every component should feel like it belongs to the same product.

Consistency is more important than novelty. Every new component must extend the
design system. Never reinvent an established pattern without a demonstrated UX
or accessibility need.

## Design Keywords

- Calm
- Premium
- Minimal
- Readable
- Warm
- Professional
- Editorial
- Focused
- Confident

Never playful, flashy, noisy, or crowded.

## Spacing

Use the shared spacing scale:

`4, 8, 12, 16, 24, 32, 40, 48, 64`

Do not introduce arbitrary spacing values. Whitespace establishes grouping and
priority before borders or decoration.

## Border Radius

| Component type | Radius |
| --- | ---: |
| Small elements | 8px |
| Cards | 16px |
| Dialogs | 20px |
| Floating panels | 24px |

Use the semantic radius token for the component category. Do not mix arbitrary
radius values within the same category.

## Shadows

Use only two elevation levels:

- Surface: very subtle
- Floating: soft

Depth should come from spacing and surface contrast before shadows. Never use
strong, dramatic, or layered decorative shadows.

## Colors

| Role | Color direction | Meaning |
| --- | --- | --- |
| Primary | Deep green | Growth and primary action |
| Secondary | Slate blue | Information |
| Warning | Amber | Attention and uncertainty |
| Danger | Muted red | Risk and destructive action |
| Background | Warm white | Primary canvas |
| Surface | Light gray | Secondary grouping |
| Text | Charcoal | Primary content |

Never use pure black, overly saturated colors, or color without semantic
meaning.

## Typography

Use five semantic levels:

- Heading XL: page titles
- Heading L: section titles
- Heading M: card titles
- Body: primary content
- Caption: supporting information

Typography creates hierarchy. Color does not replace hierarchy.

## Icons

- Use Lucide icons.
- Keep stroke width consistent.
- Never mix icon systems.
- Icons support text and meaning.
- Icons must not replace necessary labels.

## Buttons

Use only four variants:

| Variant | Purpose |
| --- | --- |
| Primary | Main action |
| Secondary | Normal action |
| Ghost | Low-emphasis action |
| Danger | Destructive action |

One page or decision context should contain only one primary action. AI is not a
separate button style; express AI context through copy, iconography, provenance,
and structured insight components.

## Cards

Cards represent independent ideas. Every card must answer:

> Why does this exist?

If the answer is unclear, remove the card.

A card may contain:

- Title
- Supporting content
- Optional action

Cards must not become miniature dashboards. Do not nest cards.

## Charts

Charts explain; they never decorate.

Every chart includes, where relevant:

- Title
- Time range
- Legend
- Key takeaway
- Optional AI insight

Avoid excessive gridlines, rainbow palettes, unexplained series, and raw numbers
without interpretation.

## KPI Block

Purpose: quick understanding.

Contains:

- Title
- Value
- Change
- Explanation
- Optional trend

Never show a number without context.

## AI Insight Card

Purpose: help users think.

Structure:

- AI summary
- Evidence
- Opportunities
- Risks
- Different viewpoints
- Suggested next investigation or reflection

Never give direct buy or sell commands.

## News Card

Contains:

- Headline
- Summary
- Impact
- Related industries
- Related holdings
- AI interpretation

Do not display news without explaining why it matters.

## Industry Card

Contains:

- Industry name
- Heat
- Capital flow
- Representative companies
- Trend
- Risk

## Learning Card

Contains:

- Concept
- Difficulty
- Estimated reading time
- Learning progress
- Continue action

Learning should feel achievable.

## Watchlist Card

Contains:

- Company or asset
- Price
- Daily change
- Reason for watching
- Latest event
- AI observation

## Empty State

Every empty state teaches users.

Good:

> Start building your watchlist. We'll track important changes for you.

Never write:

> No Data.

## Loading

- Use skeleton loading.
- Match the final layout.
- Preserve stable dimensions.
- Avoid spinners whenever possible.

## Error

Explain:

1. What happened
2. Why, when known
3. How to recover

Avoid technical language.

## Search

Search should be:

- Always available
- Fast
- Keyboard accessible
- Able to highlight matching keywords in results

## Tables

Tables should provide:

- Easy scanning
- Sticky headers when useful
- Hover feedback
- Sortable columns when meaningful
- Readable spacing

Avoid dense tables and unnecessary columns.

## Tags

Use tags sparingly for classification, never decoration.

## Badges

Badges indicate status only.

Examples:

- New
- AI
- High Risk
- Updated

Avoid collections of decorative, multicolored badges.

## Navigation

- Use no more than seven primary navigation items.
- Users must always know where they are.
- Highlight the current page clearly.
- Keep labels stable across desktop and mobile.

## Micro-interactions

- Hover: slight lift or clear surface response
- Click: slight compression
- Loading: fade or skeleton transition
- Success: gentle confirmation

Never over-animate. Motion must remain within the timing and purpose rules in
`DESIGN_SYSTEM.md`.

## Accessibility

Accessibility is mandatory:

- Keyboard navigation
- Visible focus state
- Semantic HTML
- Proper contrast
- Screen-reader labels
- Sufficient touch targets
- Reduced-motion support

## Responsive Roles

- Desktop: workspace
- Tablet: reading
- Mobile: focused tasks

Never simply scale down. Redesign hierarchy and interaction when needed.

## Component Review

Before creating a component, ask:

1. Can an existing component solve this?
2. Can an existing component be extended without weakening its purpose?
3. Does the new component represent a reusable product concept?
4. Are all states and accessibility requirements defined?

Create a new component only when necessary.

## Final Rule

The user should never notice the design system. They should simply feel:

> This product feels incredibly consistent.
