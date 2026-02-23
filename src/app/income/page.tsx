"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Plus, Trash2, ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { initialIncomeSources, type IncomeSource } from "@/data";
import { useCurrency } from "@/context/currency-context";

export default function IncomePage() {
  const [sources, setSources] = useState<IncomeSource[]>(initialIncomeSources);
  const { symbol } = useCurrency();

  const [newSource, setNewSource] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const addSource = () => {
    if (!newSource || !newAmount) return;
    const item: IncomeSource = {
      id: Math.random().toString(36).substr(2, 9),
      source: newSource,
      amount: parseFloat(newAmount),
      frequency: 'Monthly'
    };
    setSources([...sources, item]);
    setNewSource('');
    setNewAmount('');
  };

  const removeSource = (id: string) => {
    setSources(sources.filter(s => s.id !== id));
  };

  const totalMonthly = sources.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Income Tracking</h1>
          <p className="text-muted-foreground">Manage your monthly earnings and alternative income streams.</p>
        </div>
        <Card className="bg-primary text-primary-foreground border-none shadow-lg p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/20 rounded-full">
              <ArrowUpRight className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase opacity-80 font-bold">Total Monthly</p>
              <p className="text-2xl font-bold">{symbol}{totalMonthly.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border-none shadow-md h-fit sticky top-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add Income
            </CardTitle>
            <CardDescription>Add a new revenue source to your profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="source">Income Source</Label>
              <Input 
                id="source" 
                placeholder="e.g. Salary, Side Project" 
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Monthly Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground font-medium">{symbol}</span>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00" 
                  className="pl-9"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={addSource} className="w-full bg-primary hover:bg-primary/90">
              Add Source
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Earnings Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30">
                  <TableHead>Source</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sources.map((item) => (
                  <TableRow key={item.id} className="hover:bg-secondary/10 transition-colors">
                    <TableCell className="font-medium">{item.source}</TableCell>
                    <TableCell className="text-muted-foreground">{item.frequency}</TableCell>
                    <TableCell className="text-right font-bold text-primary">{symbol}{item.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-red-500"
                        onClick={() => removeSource(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
