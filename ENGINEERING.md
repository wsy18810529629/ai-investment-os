# Investment OS Engineering Standards

Version: 1.0

This document defines the mandatory engineering standards for Investment OS.
Build it as a long-term product, not a disposable prototype.

## 1. Engineering Philosophy

Code should be:

- Readable
- Maintainable
- Scalable
- Testable

Prefer durable product foundations over demo shortcuts. Keep implementation
proportional to current needs and avoid speculative architecture.

## 2. Technology Stack

### Frontend

- Next.js with App Router
- React
- TypeScript

### Styling

- Tailwind CSS
- shadcn/ui patterns and primitives

### Animation

- Framer Motion

### Icons

- Lucide React

### Data Visualization

- Recharts

Use one chart library consistently unless a documented requirement cannot be
met with the existing library.

Do not add or replace dependencies without a concrete product or engineering
benefit.

## 3. Project Structure

Preferred responsibilities:

```text
src/
  app/
  components/
  features/
  hooks/
  lib/
  services/
  types/
  utils/
```

Organize by feature when a domain becomes large enough to own its components,
data contracts, hooks, and business logic:

```text
features/
  dashboard/
  market/
  industry/
  ai-research/
  learning/
```

Do not reorganize the repository merely to match this example. Evolve the
existing structure when a real ownership boundary or complexity threshold
justifies it.

## 4. Component Rules

Components should be:

- Small
- Reusable where reuse is real
- Focused on one responsibility
- Explicit about inputs and states

Avoid:

- Huge page components
- Files approaching 1000 lines
- Duplicated UI
- Components that mix fetching, business logic, and presentation
- Abstractions created for a single trivial use

Before creating a component, follow the review rules in
`COMPONENT_LIBRARY.md`.

## 5. TypeScript Rules

TypeScript strict mode is required.

- Do not use `any` without a documented boundary that cannot be typed safely.
- Prefer precise interfaces, types, discriminated unions, and generics when
  they improve clarity.
- Type all component props, service results, API responses, and error shapes.
- Validate untrusted runtime data at system boundaries.
- Do not silence type errors with unsafe assertions.

Types should communicate domain meaning, not merely satisfy the compiler.

## 6. Data and Logic Boundaries

Separate:

- UI presentation
- Business and domain logic
- Data fetching
- Data transformation

Never place service or API implementation directly inside presentation
components.

Use structured mock data during the MVP. Keep mock contracts compatible with
future service boundaries so real data can replace mocks without rewriting the
UI.

## 7. State Management

Use local state first.

Introduce shared or global state only when multiple distant consumers need the
same state, persistence is required, or synchronization cannot remain local.

Avoid unnecessary state libraries and complex event systems. Derive values
instead of storing duplicate state.

## 8. Design Implementation

Never create arbitrary styles.

Follow:

- `DESIGN_SYSTEM.md`
- `COMPONENT_LIBRARY.md`
- `PAGE_PATTERNS.md`
- `UX_RULES.md`

Use existing components and shared tokens first. Extend established patterns
when necessary instead of introducing local variants.

Visual implementation must preserve semantics, accessibility, responsive
behavior, and investment-product trust.

## 9. Responsive Development

Every component must consider:

- Desktop
- Tablet
- Mobile

Do not postpone mobile work. Do not simply shrink desktop layouts.

Define stable dimensions and responsive constraints for charts, navigation,
toolbars, grids, and other structured UI. Prevent overflow, overlap, clipped
text, layout shift, and fixed controls hiding required content.

## 10. Performance

Consider:

- Next.js image optimization
- Lazy loading
- Code splitting
- Bundle size
- Rendering cost
- Chart performance
- Avoiding unnecessary re-renders
- Stable loading dimensions

Measure before adding complex optimizations. Do not trade readability for
unproven micro-optimizations.

## 11. Async and Error Handling

Every asynchronous operation requires:

- Loading or pending state
- Success confirmation when an action changes state
- Error state with recovery guidance
- Empty state where no result is valid

Never fail silently.

Errors shown to users must explain what happened and how to recover without
exposing irrelevant technical details.

## 12. Security

Never expose:

- API keys
- Secrets
- Private configuration
- Sensitive user or financial data

Required practices:

- Keep secrets in approved environment configuration.
- Validate and sanitize user input.
- Treat external data and AI output as untrusted.
- Enforce authorization at service boundaries.
- Avoid logging sensitive information.
- Use least-privilege permissions for future integrations.

Never implement automatic order execution during the current product phase.

## 13. AI Features

AI calls must:

- Use clear, versionable prompts
- Use structured input and output contracts where practical
- Handle timeout, failure, partial output, and unavailable data
- Communicate uncertainty
- Preserve data source and freshness
- Avoid misleading or unsupported output

Never render AI output without considering user trust and the rules in
`AI_BEHAVIOR.md`.

AI output must not bypass product safety requirements merely because it was
generated by a model.

## 14. Accessibility

Accessibility is mandatory.

- Use semantic HTML.
- Support keyboard navigation.
- Provide visible focus states.
- Provide accessible names for icon controls.
- Maintain sufficient contrast.
- Respect reduced-motion preferences.
- Associate errors and descriptions with their controls.
- Use ARIA only when native semantics are insufficient.

## 15. Code Style

Prefer:

- Readable code
- Clear naming
- Small, direct solutions
- Existing repository conventions
- Comments only where intent is not self-evident

Avoid:

- Over-engineering
- Premature abstraction
- Complex patterns without demonstrated need
- Clever code that obscures behavior
- Formatting or refactoring unrelated files

## 16. Testing and Verification

Test coverage should scale with risk.

For every meaningful UI or product change, verify:

- ESLint
- TypeScript
- Production build
- Desktop rendering
- Mobile rendering
- Overflow and overlap
- Loading, empty, success, and error states where applicable
- Chart and asset rendering
- Browser console errors
- Keyboard and focus behavior for changed interactions

Add focused automated tests when changing shared logic, data transformations,
critical interactions, or cross-module contracts.

Do not claim verification that was not performed.

## 17. Before Coding

Before implementation:

1. Understand the user goal.
2. Confirm the work is inside the current MVP scope.
3. Read the relevant product, UX, design, component, and page-pattern rules.
4. Inspect the existing code and reusable components.
5. Plan ownership boundaries and data flow.
6. Consider edge cases, accessibility, responsiveness, and failure states.
7. Explain major decisions briefly.

Then implement the complete change.

## 18. Before Delivery

Review:

- Does it work?
- Is it maintainable?
- Is it consistent?
- Is it accessible?
- Is it visually intentional?
- Is it inside scope?
- Does it reduce cognitive load?
- Does it improve user understanding or decisions?

If not, improve it before delivery.

## 19. Final Engineering Rule

The best code is not the shortest code.

The best code is code another engineer can understand six months later.
