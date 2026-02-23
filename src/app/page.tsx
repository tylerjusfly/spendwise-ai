"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Progress } from "@/components/ui/progress";

const mockSpendingData = [
  { name: 'Housing', value: 1200, color: '#337A2F' },
  { name: 'Food', value: 450, color: '#2F7A72' },
  { name: 'Ent.', value: 200, color: '#FFB800' },
  { name: 'Util.', value: 150, color: '#1A5A1A' },
  { name: 'Transp.', value: 300, color: '#4A90E2' },
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalIncome = 5000;
  const totalExpenses = 2300;
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-primary">Financial Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your money today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <div className="p-2 bg-green-50 rounded-full">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-600 flex items-center font-medium"><ArrowUpRight className="h-3 w-3" /> 4.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <div className="p-2 bg-red-50 rounded-full">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-red-600 flex items-center font-medium"><ArrowDownRight className="h-3 w-3" /> 2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <div className="p-2 bg-teal-50 rounded-full">
              <PieChartIcon className="h-4 w-4 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savingsRate}%</div>
            <Progress value={parseFloat(savingsRate)} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Position</CardTitle>
            <div className="p-2 bg-white/20 rounded-full text-white">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalIncome - totalExpenses).toLocaleString()}</div>
            <p className="text-xs text-primary-foreground/80 mt-1">Left to save or invest</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-md">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Visual breakdown of your monthly expenditure</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSpendingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666', fontSize: 12 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666', fontSize: 12 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                    {mockSpendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Active Savings Goals
            </CardTitle>
            <CardDescription>Track your progress towards big purchases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">New Car</span>
                <span className="text-muted-foreground">$12,400 / $25,000</span>
              </div>
              <Progress value={49.6} className="h-2 bg-secondary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Emergency Fund</span>
                <span className="text-muted-foreground">$8,500 / $10,000</span>
              </div>
              <Progress value={85} className="h-2 bg-secondary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Europe Trip</span>
                <span className="text-muted-foreground">$1,200 / $4,500</span>
              </div>
              <Progress value={26.6} className="h-2 bg-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}