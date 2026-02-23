'use server';
/**
 * @fileOverview A financial AI agent that provides personalized saving strategies and tips.
 *
 * - personalizedSavingSuggestions - A function that generates saving strategies and tips based on user's financial situation.
 * - PersonalizedSavingSuggestionsInput - The input type for the personalizedSavingSuggestions function.
 * - PersonalizedSavingSuggestionsOutput - The return type for the personalizedSavingSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedSavingSuggestionsInputSchema = z.object({
  savingsGoal: z.string().describe('A clear description of the user\'s savings goal.'),
  currentIncome: z.number().describe('The user\'s current monthly income.'),
  currentExpenses: z.number().describe('The user\'s current total monthly expenses.'),
  spendingPatternsSummary: z
    .string()
    .describe('A summary of the user\'s spending habits and categories of overspending.'),
  existingSavings: z.number().describe('The current amount the user has saved towards the goal.'),
  targetDate: z
    .string()
    .optional()
    .describe('An optional target date for achieving the savings goal (e.g., "December 2024").'),
});
export type PersonalizedSavingSuggestionsInput = z.infer<
  typeof PersonalizedSavingSuggestionsInputSchema
>;

const PersonalizedSavingSuggestionsOutputSchema = z.object({
  strategies: z.array(z.string()).describe('An array of actionable strategies to achieve the goal.'),
  tips: z.array(z.string()).describe('An array of personalized tips for saving more money.'),
  potentialSavingsAmount: z
    .number()
    .describe('An estimated amount the user could save monthly by following these suggestions.'),
  estimatedTimeframe: z
    .string()
    .describe('An estimated timeframe to reach the goal, considering current savings and potential monthly savings.'),
});
export type PersonalizedSavingSuggestionsOutput = z.infer<
  typeof PersonalizedSavingSuggestionsOutputSchema
>;

export async function personalizedSavingSuggestions(
  input: PersonalizedSavingSuggestionsInput
): Promise<PersonalizedSavingSuggestionsOutput> {
  return personalizedSavingSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedSavingSuggestionsPrompt',
  input: { schema: PersonalizedSavingSuggestionsInputSchema },
  output: { schema: PersonalizedSavingSuggestionsOutputSchema },
  prompt: `You are a financial advisor named SpendWise AI, specializing in helping users achieve their savings goals through personalized strategies and tips.
Your goal is to help the user achieve their savings goal efficiently by analyzing their financial situation and spending patterns.

Consider the following user data:
- Savings Goal: {{{savingsGoal}}}
- Current Monthly Income: $1:{{currentIncome}}
- Current Monthly Expenses: $1:{{currentExpenses}}
- Summary of Spending Patterns: {{{spendingPatternsSummary}}}
- Existing Savings for Goal: $1:{{existingSavings}}
{{#if targetDate}}- Target Date for Goal: {{{targetDate}}}{{/if}}

Based on this information, provide:
1.  **Actionable strategies** to reduce overspending and increase savings, keeping in mind financial principles like the 50/30/20 rule (50% for needs, 30% for wants, 20% for savings/debt).
2.  **Personalized tips** tailored to their specific spending patterns. For example, if they spend too much on dining out, suggest cooking more at home or using meal prep services.
3.  An **estimated potential monthly savings amount** the user could achieve.
4.  An **estimated timeframe** to reach the savings goal, taking into account their existing savings and the potential monthly savings.

Ensure your suggestions are realistic, practical, and encouraging.
`,
});

const personalizedSavingSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedSavingSuggestionsFlow',
    inputSchema: PersonalizedSavingSuggestionsInputSchema,
    outputSchema: PersonalizedSavingSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
