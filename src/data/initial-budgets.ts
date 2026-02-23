export interface Budget {
  category: string;
  limit: number;
  spent: number;
}

export const initialBudgets: Budget[] = [
  { category: 'Housing', limit: 1500, spent: 1200 },
  { category: 'Food', limit: 500, spent: 450 },
  { category: 'Entertainment', limit: 200, spent: 240 },
  { category: 'Transport', limit: 300, spent: 180 },
];
