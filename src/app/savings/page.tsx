"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Plus, Sparkles, Trophy, Calendar, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { personalizedSavingSuggestions, PersonalizedSavingSuggestionsOutput } from "@/ai/flows/personalized-saving-suggestions-flow";
import { initialSavingsGoals, type Goal, totalIncome, totalExpenses } from "@/data";
import { useCurrency } from "@/context/currency-context";

export default function SavingsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialSavingsGoals);
  const { symbol } = useCurrency();

  const [aiSuggestions, setAiSuggestions] = useState<PersonalizedSavingSuggestionsOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const getAISuggestions = async (goal: Goal) => {
    setLoading(true);
    try {
      const suggestions = await personalizedSavingSuggestions({
        savingsGoal: goal.title,
        currentIncome: totalIncome,
        currentExpenses: totalExpenses,
        spendingPatternsSummary: "Moderate spending on dining and entertainment.",
        existingSavings: goal.current,
        targetDate: goal.deadline
      });
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            Savings Goals
          </h1>
          <p className="text-muted-foreground">Plan for the future and track your progress.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white shadow-md">
          <Plus className="mr-2 h-5 w-5" />
          Create New Goal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const progress = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
          return (
            <Card key={goal.id} className="border-none shadow-md overflow-hidden flex flex-col">
              <div className="h-1 w-full bg-secondary">
                <div 
                  className="h-full bg-primary transition-all duration-1000" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{goal.title}</CardTitle>
                    {goal.deadline && (
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Target: {goal.deadline}
                      </div>
                    )}
                  </div>
                  <Trophy className={`h-6 w-6 ${progress > 80 ? 'text-yellow-500' : 'text-muted-foreground/30'}`} />
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">{symbol}{goal.current.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm">of {symbol}{goal.target.toLocaleString()}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{progress.toFixed(1)}% Complete</span>
                    <span>{symbol}{(goal.target - goal.current).toLocaleString()} remaining</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  onClick={() => getAISuggestions(goal)} 
                  variant="outline" 
                  className="w-full border-accent text-accent hover:bg-accent hover:text-white"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get AI Strategy
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {loading && (
        <Card className="border-none shadow-lg animate-pulse">
          <CardContent className="p-12 flex flex-col items-center">
            <Zap className="h-12 w-12 text-accent animate-bounce mb-4" />
            <p className="font-semibold text-lg">SpendWise AI is crafting your strategy...</p>
          </CardContent>
        </Card>
      )}

      {aiSuggestions && !loading && (
        <Card className="border-none shadow-xl bg-gradient-to-br from-white to-green-50 overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="h-2 w-full bg-accent" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-accent" />
                Your Savings Strategy
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setAiSuggestions(null)}>Close</Button>
            </div>
            <CardDescription>Tailored plan to help you reach your target faster.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-primary border-b pb-2">Actionable Strategies</h3>
                <ul className="space-y-3">
                  {aiSuggestions.strategies.map((strategy, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80">
                      <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-accent border-b pb-2">Personalized Tips</h3>
                <ul className="space-y-3">
                  {aiSuggestions.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80">
                      <Zap className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 grid gap-6 md:grid-cols-2 items-center">
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase text-primary/70 tracking-wider">Potential Monthly Savings</p>
                <p className="text-4xl font-bold text-primary">{symbol}{aiSuggestions.potentialSavingsAmount.toLocaleString()}</p>
              </div>
              <div className="space-y-1 md:text-right">
                <p className="text-sm font-semibold uppercase text-primary/70 tracking-wider">Estimated Timeframe</p>
                <p className="text-2xl font-bold text-primary">{aiSuggestions.estimatedTimeframe}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
