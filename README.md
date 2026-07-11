# AI Investment OS

AI Investment OS is an AI-powered investment learning and research workspace for young investors.

It is designed to help ordinary investors understand markets, learn investing, organize research, and build better decision-making habits over time.

It is not a brokerage, trading terminal, stock recommendation engine, or prediction tool.

## Product Positioning

AI Investment OS helps users answer one question at a time:

- **Today**: What should investors pay attention to today?
- **Market**: How is the overall market environment changing?
- **Industry**: Where is capital flowing?
- **AI Research**: How should I think about this investment question?
- **Learning**: What should I learn next?

The product goal is not to tell users what to buy.

The goal is to help users understand, research, learn, reflect, and improve.

## Current MVP

The current Phase 1 MVP includes:

- Daily investment workspace
- Market intelligence page
- Industry radar page
- AI investment research page
- Learning center page
- Dark mode
- Responsive desktop and mobile navigation
- Structured mock data layer

Real market data integration is intentionally separated from the UI layer and will be added through service adapters later.

## Investment Safety Boundary

All investment-related analysis follows this principle:

> 内容仅供研究和学习，不构成投资建议

AI outputs must show risk, uncertainty, evidence, confidence, data source, and update time when they may influence investment thinking.

The system must not:

- Promise returns
- Predict markets with certainty
- Give direct buy or sell commands
- Create urgency or FOMO
- Implement automatic trading or order execution

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Framer Motion
- Recharts
- Lucide React

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

Build for production:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

## Project Standards

This repository is governed by product, design, AI, UX, and engineering standards:

- `AGENTS.md`
- `PRODUCT.md`
- `DESIGN_SYSTEM.md`
- `COMPONENT_LIBRARY.md`
- `PAGE_PATTERNS.md`
- `UX_RULES.md`
- `AI_BEHAVIOR.md`
- `AI_PROMPT_LIBRARY.md`
- `ENGINEERING.md`

Every page should reduce cognitive load and help users make better investment decisions through clearer thinking, not more information.
