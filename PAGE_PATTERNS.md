# Investment OS Page Patterns

Version: 1.0

This document defines the default information sequence for recurring Investment
OS page types.

Page patterns establish reading order, not a requirement to show every module
at full depth. Apply progressive disclosure, remove irrelevant sections, and
preserve the one-page-one-question rule.

The Golden Rule still applies:

> Do not optimize for showing more information. Optimize for helping users make
> better decisions.

## Dashboard

Primary question:

> What matters today?

Default sequence:

1. Hero
2. Today's Focus
3. AI Summary
4. Market
5. Watchlist
6. Learning
7. Journal

### Pattern Intent

- **Hero** establishes today's single most important market context.
- **Today's Focus** identifies the few items that deserve attention.
- **AI Summary** explains why those items matter, including uncertainty.
- **Market** provides only the evidence required to support the summary.
- **Watchlist** connects the market context to the user's interests.
- **Learning** teaches one concept relevant to today's context.
- **Journal** turns information consumption into reflection.

Dashboard must not become an endless feed or a wall of cards. Secondary detail
belongs behind drill-down actions or on the relevant Market, Industry, AI
Research, or Learning page.

## Learning

Primary question:

> What should I learn next?

Default sequence:

1. Hero
2. Learning Path
3. Continue Learning
4. Today's Lesson
5. Knowledge Map
6. Quiz
7. Notes

### Pattern Intent

- **Hero** shows the user's current learning objective and progress.
- **Learning Path** explains where the user is going.
- **Continue Learning** provides the primary action.
- **Today's Lesson** offers one achievable unit.
- **Knowledge Map** shows how concepts connect.
- **Quiz** checks understanding through useful retrieval.
- **Notes** helps users preserve and apply what they learned.

Continue Learning should normally be the single primary action. Do not force the
user to choose among several equally prominent lessons.

## Stock Detail

Primary question:

> How should I understand this company as an investment?

Default sequence:

1. Overview
2. AI Summary
3. Price
4. Financials
5. Industry
6. News
7. Bull Case
8. Bear Case
9. Risk
10. Related Stocks

### Pattern Intent

- **Overview** establishes the company, business, and current context.
- **AI Summary** frames the research question without issuing a recommendation.
- **Price** explains price behavior with time range and context.
- **Financials** shows the few metrics that drive the investment thesis.
- **Industry** explains market structure and competitive position.
- **News** includes only events that change the research assumptions.
- **Bull Case** presents the constructive scenario and required assumptions.
- **Bear Case** presents the opposing scenario fairly.
- **Risk** makes downside, uncertainty, and invalidation conditions explicit.
- **Related Stocks** supports comparison, not speculative discovery.

Stock Detail is a future page pattern. It does not authorize implementation
during the current MVP phase, which is limited to Dashboard, Market, Industry,
AI Research, and Learning.

## Pattern Application Rules

1. Start with the page's primary question.
2. Preserve the defined Overview to Important to Details to Action reading flow.
3. Remove sections that do not help answer the current question.
4. Collapse or defer secondary evidence.
5. Keep one primary action per decision context.
6. Never repeat the same information in multiple sections.
7. Show risk, uncertainty, source, and freshness near investment analysis.
8. Recompose the pattern for mobile instead of stacking every desktop module.

## Page Pattern Review

Before shipping, verify:

1. Is the primary question answered before supporting detail appears?
2. Is the most important section visible without excessive scrolling?
3. Does every section have a distinct purpose?
4. Can any section be removed, merged, collapsed, or moved to another page?
5. Is the final action a natural result of what the user learned?

If the page reads like a list of modules rather than a guided thought process,
the pattern has been applied incorrectly.
