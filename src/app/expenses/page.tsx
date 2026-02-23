"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Receipt, Plus, Trash2, TrendingDown } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { expenseCategories, initialExpenses, type Expense } from "@/data";
import { useCurrency } from "@/context/currency-context";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const { symbol } = useCurrency();

  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('food');

  const addExpense = () => {
    if (!newItem || !newAmount) return;
    const expense: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      item: newItem,
      amount: parseFloat(newAmount),
      category: newCategory,
      date: new Date().toISOString().split('T')[0]
    };
    setExpenses([expense, ...expenses]);
    setNewItem('');
    setNewAmount('');
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Expense Tracking</h1>
          <p className="text-muted-foreground">Log your purchases and stay on top of your budget.</p>
        </div>
        <Card className="bg-accent text-accent-foreground border-none shadow-lg p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/20 rounded-full">
              <TrendingDown className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase opacity-80 font-bold">Total Spent</p>
              <p className="text-2xl font-bold">{symbol}{totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 border-none shadow-md h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add Expense
            </CardTitle>
            <CardDescription>Track a new purchase category.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="item">Expense Item</Label>
              <Input 
                id="item" 
                placeholder="e.g. Netflix Subscription" 
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                   <span className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground font-medium">{symbol}</span>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="0.00" 
                    className="pl-7"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Button onClick={addExpense} className="w-full bg-accent hover:bg-accent/90">
              Log Expense
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30">
                  <TableHead>Date</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((e) => {
                  const cat = expenseCategories.find(c => c.id === e.category) || expenseCategories[0];
                  return (
                    <TableRow key={e.id} className="hover:bg-secondary/10 transition-colors">
                      <TableCell className="text-muted-foreground text-xs">{e.date}</TableCell>
                      <TableCell className="font-medium">{e.item}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`${cat.color} border-none font-medium`}>
                          <cat.icon className="h-3 w-3 mr-1" />
                          {cat.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold text-foreground">{symbol}{e.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-red-500"
                          onClick={() => removeExpense(e.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
