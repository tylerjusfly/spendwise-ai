export interface Expense {
  id: string;
  item: string;
  amount: number;
  category: string;
  date: string;
}

export const initialExpenses: Expense[] = [
  { id: '1', item: 'Monthly Rent', amount: 1200, category: 'housing', date: '2024-05-01' },
  { id: '2', item: 'Grocery Haul', amount: 150, category: 'food', date: '2024-05-03' },
  { id: '3', item: 'Movie Tickets', amount: 45, category: 'entertainment', date: '2024-05-05' },
  { id: '4', item: 'Gas Refill', amount: 60, category: 'transport', date: '2024-05-07' },
];
