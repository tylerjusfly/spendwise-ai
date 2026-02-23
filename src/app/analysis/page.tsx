"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, BrainCircuit, Lightbulb, AlertCircle, CheckCircle2, RefreshCcw } from "lucide-react";
import { aiSpendingSuggestions, AISpendingSuggestionsOutput } from "@/ai/flows/ai-spending-suggestions-flow";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrency } from "@/context/currency-context";
import { mockAnalysisInput } from "@/data";

export default function AnalysisPage() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AISpendingSuggestionsOutput | null>(null);
  const { symbol } = useCurrency();

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const result = await aiSpendingSuggestions(mockAnalysisInput);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-accent" />
            AI Spending Analysis
          </h1>
          <p className="text-muted-foreground">Deep dive into your financial habits with SpendWise AI intelligence.</p>
        </div>
        <Button 
          onClick={runAnalysis} 
          disabled={loading}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20"
        >
          {loading ? (
            <>
              <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Data...
            </>
          ) : (
            <>
              <BrainCircuit className="mr-2 h-5 w-5" />
              Generate Insights
            </>
          )}
        </Button>
      </div>

      {!analysis && !loading && (
        <Card className="border-dashed border-2 flex flex-col items-center justify-center p-12 bg-white/50">
          <div className="p-4 bg-accent/10 rounded-full mb-4">
            <Lightbulb className="h-12 w-12 text-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center">Ready to optimize your spending?</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Our AI will analyze your income and expense categories against financial benchmarks and the 50/30/20 rule to provide actionable advice.
          </p>
          <Button onClick={runAnalysis} variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
            Run SpendWise Engine
          </Button>
        </Card>
      )}

      {loading && (
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl md:col-span-2" />
        </div>
      )}

      {analysis && (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Needs (50%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{symbol}{analysis.fiftyThirtyTwentyAnalysis.needs.allocated}</div>
                  <div className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    analysis.fiftyThirtyTwentyAnalysis.needs.status === 'On track' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {analysis.fiftyThirtyTwentyAnalysis.needs.status}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Target: {symbol}{analysis.fiftyThirtyTwentyAnalysis.needs.target}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Wants (30%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{symbol}{analysis.fiftyThirtyTwentyAnalysis.wants.allocated}</div>
                  <div className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    analysis.fiftyThirtyTwentyAnalysis.wants.status === 'On track' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {analysis.fiftyThirtyTwentyAnalysis.wants.status}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Target: {symbol}{analysis.fiftyThirtyTwentyAnalysis.wants.target}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Savings/Debt (20%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{symbol}{analysis.fiftyThirtyTwentyAnalysis.savingsDebt.allocated}</div>
                  <div className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    analysis.fiftyThirtyTwentyAnalysis.savingsDebt.status === 'On track' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {analysis.fiftyThirtyTwentyAnalysis.savingsDebt.status}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Target: {symbol}{analysis.fiftyThirtyTwentyAnalysis.savingsDebt.target}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <div className="h-2 w-full bg-accent" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-accent" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-foreground/80">{analysis.summary}</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  Overspending Identified
                </CardTitle>
                <CardDescription>Areas where you can tighten the belt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.overspendingCategories.map((cat, i) => (
                  <div key={i} className="p-4 rounded-lg bg-red-50 border border-red-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-red-900">{cat.category}</span>
                      <span className="text-sm font-semibold text-red-700">{cat.percentageOfIncome}% of income</span>
                    </div>
                    <p className="text-sm text-red-800/80">{cat.advice}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  Smart Reallocations
                </CardTitle>
                <CardDescription>How to optimize your cash flow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.reallocationSuggestions.map((sug, i) => (
                  <div key={i} className="p-4 rounded-lg bg-green-50 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-muted-foreground line-through">{sug.fromCategory}</span>
                      <span className="text-primary font-bold">→ {sug.toCategory}</span>
                      <span className="ml-auto font-bold text-primary">{symbol}{sug.amount}</span>
                    </div>
                    <p className="text-sm text-green-900/70 italic">"{sug.reason}"</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
