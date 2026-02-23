export const mockSpendingData = [
  { name: 'Housing', value: 40000, color: '#337A2F' },
  { name: 'Food', value: 50000, color: '#2F7A72' },
  { name: 'Ent.', value: 20000, color: '#FFB800' },
  { name: 'Util.', value: 35000, color: '#1A5A1A' },
  { name: 'Transp.', value: 300, color: '#4A90E2' },
];

export const totalIncome = 700000;
export const totalExpenses = 320000;

export interface DashboardSavingsGoal {
  title: string;
  current: number;
  target: number;
}

export const dashboardSavingsGoals: DashboardSavingsGoal[] = [
  { title: 'New Car', current: 0, target: 0 },
  { title: 'Emergency Fund', current: 400000, target: 1000000 },
  { title: 'Europe Trip', current: 0, target: 0 },
];
