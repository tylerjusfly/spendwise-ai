export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline?: string;
}

export const initialSavingsGoals: Goal[] = [
  { id: '1', title: 'New Car', target: 0, current: 0, deadline: 'Dec 2025' },
  { id: '2', title: 'Emergency Fund', target: 1000000, current: 400000 },
];
