'use server';
/**
 * @fileOverview A Genkit flow for providing AI-powered spending suggestions.
 *
 * - aiSpendingSuggestions - A function that analyzes user spending data and provides personalized recommendations.
 * - AISpendingSuggestionsInput - The input type for the aiSpendingSuggestions function.
 * - AISpendingSuggestionsOutput - The return type for the aiSpendingSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AISpendingSuggestionsInputSchema = z.object({
  income: z.number().describe('The user\'s total monthly income.'),
  expenses: z.array(z.object({
    category: z.string().describe('The name of the expense category (e.g., Housing, Food, Entertainment, Utilities, Transportation, Savings, Debt).'),
    amount: z.number().describe('The amount spent in this category per month.'),
  })).describe('An array of categorized monthly expenses.'),
  averageBudgets: z.array(z.object({
    category: z.string().describe('The name of the expense category.'),
    percentage: z.number().min(0).max(100).describe('The average percentage of income spent in this category.'),
  })).optional().describe('Optional: Benchmark data for average spending percentages per category.'),
});
export type AISpendingSuggestionsInput = z.infer<typeof AISpendingSuggestionsInputSchema>;

const AISpendingSuggestionsOutputSchema = z.object({
  summary: z.string().describe('A general summary of the spending analysis, highlighting overall financial health and key areas for improvement.'),
  overspendingCategories: z.array(z.object({
    category: z.string().describe('The name of the category where the user is overspending.'),
    percentageOfIncome: z.number().describe('The percentage of income currently allocated to this category.'),
    advice: z.string().describe('Specific advice on how to reduce spending in this category.'),
  })).describe('A list of categories where the user is identified as overspending.'),
  reallocationSuggestions: z.array(z.object({
    fromCategory: z.string().describe('The category from which to reallocate funds.'),
    toCategory: z.string().describe('The category to which funds should be reallocated (e.g., "Savings", "Debt", or another expense category).'),
    amount: z.number().describe('The suggested amount to reallocate.'),
    reason: z.string().describe('The reason for this reallocation suggestion.'),
  })).describe('Specific suggestions for reallocating funds between categories to optimize spending.'),
  fiftyThirtyTwentyAnalysis: z.object({
    needs: z.object({
      allocated: z.number().describe('The total amount currently allocated to "Needs" (50% target).'),
      target: z.number().describe('The target amount for "Needs" based on the 50/30/20 rule.'),
      status: z.string().describe('A brief status of spending in "Needs" (e.g., "On track", "Over budget", "Under budget").'),
    }),
    wants: z.object({
      allocated: z.number().describe('The total amount currently allocated to "Wants" (30% target).'),
      target: z.number().describe('The target amount for "Wants" based on the 50/30/20 rule.'),
      status: z.string().describe('A brief status of spending in "Wants" (e.g., "On track", "Over budget", "Under budget").'),
    }),
    savingsDebt: z.object({
      allocated: z.number().describe('The total amount currently allocated to "Savings/Debt" (20% target).'),
      target: z.number().describe('The target amount for "Savings/Debt" based on the 50/30/20 rule.'),
      status: z.string().describe('A brief status of spending in "Savings/Debt" (e.g., "On track", "Over budget", "Under budget").'),
    }),
  }).describe('An analysis of the user\'s spending against the 50/30/20 budgeting rule (50% Needs, 30% Wants, 20% Savings/Debt).'),
});
export type AISpendingSuggestionsOutput = z.infer<typeof AISpendingSuggestionsOutputSchema>;

export async function aiSpendingSuggestions(input: AISpendingSuggestionsInput): Promise<AISpendingSuggestionsOutput> {
  return aiSpendingSuggestionsFlow(input);
}

const aiSpendingSuggestionsPrompt = ai.definePrompt({
  name: 'aiSpendingSuggestionsPrompt',
  input: { schema: AISpendingSuggestionsInputSchema },
  output: { schema: AISpendingSuggestionsOutputSchema },
  prompt: `You are an expert financial advisor named SpendWise AI. Your goal is to help users manage their salary, identify areas of overspending, and provide actionable advice to reduce spending and save more, specifically adhering to the principle of "living on less than you make".

Analyze the provided monthly income and expenses.
1.  **Calculate Spending Percentages**: For each expense category, calculate its percentage of the total income.
2.  **Apply 50/30/20 Rule**: Evaluate the user's spending against the 50/30/20 rule, where 50% of income goes to Needs, 30% to Wants, and 20% to Savings & Debt Repayment. You will need to infer which of the user's expense categories fall into 'Needs', 'Wants', and 'Savings/Debt', then calculate the total allocated amount for each of these three buckets and compare it to their respective income-based targets.
    Common categorizations:
    *   **Needs (50%)**: Housing, Utilities, Transportation (essential), Groceries, Insurance, Minimum Debt Payments.
    *   **Wants (30%)**: Dining Out, Entertainment, Hobbies, Shopping (non-essential), Vacations, Subscriptions.
    *   **Savings & Debt (20%)**: Savings contributions, Extra Debt Payments, Investments.
3.  **Compare with Average Budgets (if provided)**: If 'averageBudgets' are supplied, compare the user's spending percentages with these benchmarks.
4.  **Identify Overspending**: Pinpoint specific categories where the user is spending disproportionately high amounts compared to the 50/30/20 rule and/or average budgets.
5.  **Suggest Reallocation**: Propose concrete, actionable suggestions for reallocating funds. This should include:
    *   Which category to take money from.
    *   How much money to reallocate.
    *   Which category to move money to (e.g., "Savings", "Debt", or reduce overspending in another area).
    *   A clear reason for the reallocation.

Use the following data:

Monthly Income: {{{income}}}

Current Monthly Expenses:
{{#each expenses}}
- Category: {{{category}}}, Amount: {{{amount}}}
{{/each}}

{{#if averageBudgets}}
Average Spending Benchmarks (Percentages of Income):
{{#each averageBudgets}}
- Category: {{{category}}}, Percentage: {{{percentage}}}%
{{/each}}
{{/if}}

Provide your analysis in the specified JSON format. Ensure all fields are populated thoroughly and provide clear, actionable advice.
`,
});

const aiSpendingSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiSpendingSuggestionsFlow',
    inputSchema: AISpendingSuggestionsInputSchema,
    outputSchema: AISpendingSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await aiSpendingSuggestionsPrompt(input);
    return output!;
  }
);
