import {
  LayoutDashboard,
  Wallet,
  Receipt,
  PieChart,
  Target,
  Sparkles,
} from "lucide-react";

export const sidebarNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Income", url: "/income", icon: Wallet },
  { title: "Expenses", url: "/expenses", icon: Receipt },
  { title: "Budgets", url: "/budgets", icon: PieChart },
  { title: "Savings Goals", url: "/savings", icon: Target },
  { title: "AI Analysis", url: "/analysis", icon: Sparkles },
];
