"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PieChart, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { initialBudgets, type Budget } from "@/data";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <PieChart className="h-8 w-8 text-primary" />
            Budget Creation
          </h1>
          <p className="text-muted-foreground">Set spending limits and monitor your discipline.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-5 w-5" />
          Create New Budget
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {budgets.map((budget, i) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isOver = percentage > 100;
          
          return (
            <Card key={i} className={`border-none shadow-md ${isOver ? 'ring-2 ring-red-500/20' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{budget.category}</CardTitle>
                  {isOver ? (
                    <div className="flex items-center text-red-600 text-xs font-bold uppercase gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Over Budget
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600 text-xs font-bold uppercase gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      On Track
                    </div>
                  )}
                </div>
                <CardDescription>Monthly target limit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className={`text-2xl font-bold ${isOver ? 'text-red-600' : 'text-foreground'}`}>
                    ${budget.spent.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">
                    of ${budget.limit.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>{percentage.toFixed(0)}% utilized</span>
                    <span>${Math.abs(budget.limit - budget.spent).toLocaleString()} {isOver ? 'over' : 'left'}</span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={`h-2.5 ${isOver ? '[&>div]:bg-red-500' : ''}`}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-none shadow-md bg-secondary/20">
        <CardHeader>
          <CardTitle>Budgeting Principles</CardTitle>
          <CardDescription>A refresher on financial health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-border">
              <p className="font-bold text-primary mb-1">50% Needs</p>
              <p className="text-sm text-muted-foreground">Essential expenses like rent, utilities, and groceries.</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-border">
              <p className="font-bold text-accent mb-1">30% Wants</p>
              <p className="text-sm text-muted-foreground">Flexible spending for lifestyle, hobbies, and dining.</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-border">
              <p className="font-bold text-yellow-600 mb-1">20% Savings/Debt</p>
              <p className="text-sm text-muted-foreground">Building your future and clearing financial obligations.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}