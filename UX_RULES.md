# Investment OS User Experience Rules

Version: 2.0

This document defines the mandatory experience rules for every Investment OS
screen, workflow, interaction, and AI-generated explanation.

## Core Philosophy

Reduce thinking.

Increase understanding.

The interface should reduce the effort required to understand the market. It
must not remove the critical thinking required to make responsible investment
decisions.

## Golden Rule

Do not optimize for showing more information.

Optimize for helping users make better decisions.

Whenever two valid designs are possible, choose the one that reduces thinking
without concealing material evidence, risk, or uncertainty.

## One Page, One Question

| Page | Primary question |
| --- | --- |
| Dashboard | What happened today? |
| Market | What deserves attention? |
| Industry | Where is money flowing? |
| AI Research | How should I think? |
| Learning | What should I learn next? |
| Portfolio | Am I improving? |
| Journal | What have I learned? |

Every section on a page must help answer its primary question. Move, defer, or
remove anything that does not.

Never overload users. If information is not useful, remove it.

## Attention

Users notice:

- Large numbers
- Titles
- Movement
- Color

Use these intentionally.

- Large numbers must represent an important decision signal.
- Titles must state the idea, not merely name the module.
- Motion must explain change, priority, or system feedback.
- Color must communicate hierarchy, state, risk, or financial meaning.
- Never use multiple strong attention devices in competition.

## Reading Flow

Every page follows:

1. Overview
2. Important
3. Details
4. Action

Never reverse this sequence.

Users should understand the page before being asked to act. Supporting detail
must not appear before the user knows why it matters.

## Cognitive Load

If users need to think about where to click, the design has failed.

- Make the primary action visually clear.
- Use familiar controls and predictable placement.
- Keep labels specific and concise.
- Reveal advanced options only when needed.
- Preserve context when users open details or move between related screens.
- Avoid duplicate actions with different names.
- Do not make users remember information that can remain visible.

## Trust

Financial products require trust.

Trust comes from:

- Consistency
- Transparency
- Explanation

Trust does not come from visual effects.

Always make state, source, freshness, assumptions, uncertainty, and risk clear.
Do not use polished presentation to imply unsupported confidence.

## AI Experience

AI should explain. It must never sound certain about uncertain outcomes.

Do not say:

> Buy NVIDIA.

Prefer:

> NVIDIA has benefited from AI demand. However, valuation remains elevated.
> Investors should evaluate growth durability, concentration risk, and the
> assumptions already reflected in the current price.

AI responses should:

- Separate facts from interpretations.
- State assumptions.
- Explain why evidence matters.
- Present counterarguments.
- Identify missing information.
- Use calibrated confidence.
- Avoid promises, commands, and guaranteed predictions.
- Show risk, confidence, source, and update time where relevant.
- Display: "内容仅供研究和学习，不构成投资建议".

## Decision Support

Decision-oriented analysis must provide:

- Evidence
- Pros
- Cons
- Risk
- Unknowns
- Possible scenarios

The interface must help users compare these elements without presenting one
scenario as inevitable.

When useful, conclude with questions to investigate or conditions to monitor,
not an unsupported buy or sell instruction.

## Education

Every analysis should teach.

Users should leave smarter, not merely informed.

- Explain important financial concepts in context.
- Connect evidence to a reusable reasoning framework.
- Avoid unexplained jargon.
- Provide optional depth without interrupting the primary reading flow.
- Help users recognize how the same reasoning applies to future decisions.

## Feedback

Every click responds.

Every action confirms.

Every error explains.

Never surprise users.

All interactive workflows must account for:

- Hover and focus
- Pressed or active state
- Loading or pending state
- Success confirmation
- Recoverable error guidance
- Disabled-state explanation when necessary
- Undo or reversal for consequential, reversible actions

Feedback should be immediate, specific, and proportional to the action.

## UX Review Checklist

Before shipping, verify:

1. What single question does this page answer?
2. Does the page follow Overview, Important, Details, Action?
3. Is the next interaction obvious?
4. Is every strong title, number, color, and motion intentional?
5. Can any information be removed or deferred?
6. Are uncertainty, risk, source, and freshness transparent?
7. Does AI explain rather than command?
8. Are evidence, pros, cons, risk, unknowns, and scenarios represented?
9. Does the experience teach a reusable idea?
10. Does every interaction provide clear feedback?

If any answer is unclear, the experience is not ready.
