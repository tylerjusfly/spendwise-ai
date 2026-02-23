export interface IncomeSource {
  id: string;
  source: string;
  amount: number;
  frequency: string;
}

export const initialIncomeSources: IncomeSource[] = [
  { id: '1', source: 'Primary Salary', amount: 700000, frequency: 'Monthly' },
  { id: '2', source: 'Freelance Design', amount: 0, frequency: 'One-time' },
];
