import {
  Home,
  Utensils,
  ShoppingBag,
  Coffee,
  Car,
} from "lucide-react";

export const expenseCategories = [
  { id: 'housing', label: 'Housing', icon: Home, color: 'text-blue-500 bg-blue-50' },
  { id: 'food', label: 'Food & Groceries', icon: Utensils, color: 'text-orange-500 bg-orange-50' },
  { id: 'entertainment', label: 'Entertainment', icon: ShoppingBag, color: 'text-purple-500 bg-purple-50' },
  { id: 'dining', label: 'Dining Out', icon: Coffee, color: 'text-amber-500 bg-amber-50' },
  { id: 'transport', label: 'Transportation', icon: Car, color: 'text-cyan-500 bg-cyan-50' },
];
