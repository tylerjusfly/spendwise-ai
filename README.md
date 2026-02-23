# SpendWise AI

A Next.js personal finance app with an AI-powered spending and savings assistant. Track income, expenses, budgets, and savings goals; get personalized suggestions via Google Genkit and Gemini.

**Features:** Dashboard overview, income/expense tracking, budget limits, savings goals, and AI spending analysis + saving suggestions.

---

## Getting started

```bash
npm install
cp .env.example .env   # add your keys
npm run dev
```

Open [http://localhost:9002](http://localhost:9002). For AI flows, run `npm run genkit:dev` in another terminal.

---

## Environment variables

| Variable        | Description                          |
|----------------|--------------------------------------|
| `GEMINI_API_KEY` | Google AI (Gemini) API key for Genkit AI flows |

Copy `.env.example` to `.env` and fill in the value.

---

## Contributing

1. Fork the repo and create a branch from `main`.
2. Make changes; keep commits focused and messages clear.
3. Run `npm run lint` and `npm run typecheck` before pushing.
4. Open a PR with a short description of the change. Link any related issues.
