"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { format, startOfMonth, endOfMonth } from "date-fns"
import { AlertTriangle, ArrowRight, DollarSign, Edit2, PieChart, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart as RechartsePieChart,
    Pie,
    Cell,
} from "recharts"
import { redirect } from "next/navigation"

// Types
type BudgetPeriod = "weekly" | "monthly"
type BudgetCategory =
    | "food"
    | "housing"
    | "transportation"
    | "utilities"
    | "entertainment"
    | "healthcare"
    | "personal"
    | "other"

interface Budget {
    id: string
    period: BudgetPeriod
    startDate: Date
    endDate: Date
    categories: BudgetCategoryItem[]
    totalBudget: number
}

interface BudgetCategoryItem {
    category: BudgetCategory
    limit: number
    spent: number
}

interface Transaction {
    id: string
    date: Date
    amount: number
    category: BudgetCategory
    description: string
}

// Mock data
const mockBudgets: Budget[] = [
    {
        id: "budget-1",
        period: "monthly",
        startDate: startOfMonth(new Date()),
        endDate: endOfMonth(new Date()),
        categories: [
            { category: "food", limit: 500, spent: 350 },
            { category: "housing", limit: 1000, spent: 1000 },
            { category: "transportation", limit: 200, spent: 150 },
            { category: "utilities", limit: 300, spent: 280 },
            { category: "entertainment", limit: 200, spent: 180 },
            { category: "healthcare", limit: 100, spent: 50 },
            { category: "personal", limit: 150, spent: 120 },
            { category: "other", limit: 100, spent: 80 },
        ],
        totalBudget: 2550,
    },
    // Add more mock budgets as needed
]

const mockTransactions: Transaction[] = [
    { id: "trans-1", date: new Date(), amount: 50, category: "food", description: "Grocery shopping" },
    { id: "trans-2", date: new Date(), amount: 30, category: "transportation", description: "Gas" },
    // Add more mock transactions as needed
]

// Helper functions
const getCategoryColor = (category: BudgetCategory): string => {
    const colors: Record<BudgetCategory, string> = {
        food: "#FF6384",
        housing: "#36A2EB",
        transportation: "#FFCE56",
        utilities: "#4BC0C0",
        entertainment: "#9966FF",
        healthcare: "#FF9F40",
        personal: "#C9CBCF",
        other: "#7CFC00",
    }
    return colors[category]
}

const getCategoryIcon = (category: BudgetCategory): React.ReactNode => {
    // You can replace these with actual icons if desired
    return <span className="text-lg">{category.charAt(0).toUpperCase()}</span>
}

const BudgetPlanningPage: React.FC = () => {
    const [budgets, setBudgets] = useState<Budget[]>(mockBudgets)
    const [transactions] = useState<Transaction[]>(mockTransactions)
    const [activeBudgetId, setActiveBudgetId] = useState<string>(budgets[0]?.id || "")
    const [newBudgetPeriod, setNewBudgetPeriod] = useState<BudgetPeriod>("monthly")

    const activeBudget = useMemo(() => budgets.find((b) => b.id === activeBudgetId), [budgets, activeBudgetId])

    const totalSpent = useMemo(() => {
        return activeBudget?.categories.reduce((total, cat) => total + cat.spent, 0) || 0
    }, [activeBudget])

    const budgetProgress = useMemo(() => {
        if (!activeBudget) return 0
        return (totalSpent / activeBudget.totalBudget) * 100
    }, [activeBudget, totalSpent])

    const pieChartData = useMemo(() => {
        return (
            activeBudget?.categories.map((cat) => ({
                name: cat.category,
                value: cat.limit,
            })) || []
        )
    }, [activeBudget])

    const barChartData = useMemo(() => {
        return (
            activeBudget?.categories.map((cat) => ({
                name: cat.category,
                limit: cat.limit,
                spent: cat.spent,
            })) || []
        )
    }, [activeBudget])


    const handleUpdateCategory = (category: BudgetCategory, newLimit: number) => {
        if (!activeBudget) return
        const updatedBudgets = budgets.map((budget) => {
            if (budget.id === activeBudget.id) {
                const updatedCategories = budget.categories.map((cat) =>
                    cat.category === category ? { ...cat, limit: newLimit } : cat,
                )
                const newTotalBudget = updatedCategories.reduce((total, cat) => total + cat.limit, 0)
                return { ...budget, categories: updatedCategories, totalBudget: newTotalBudget }
            }
            return budget
        })
        setBudgets(updatedBudgets)
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Budget Planning</h1>
                        <p className="text-muted-foreground">Manage your budgets and track spending</p>
                    </div>
                    <Button onClick={() => redirect("/application/budgets/create-budget")}>
                        <Plus className="mr-2 h-4 w-4" /> Create New Budget
                    </Button>
                </div>

                <Tabs defaultValue={activeBudgetId} onValueChange={setActiveBudgetId}>
                    <TabsList>
                        {budgets.map((budget) => (
                            <TabsTrigger key={budget.id} value={budget.id}>
                                {budget.period === "weekly" ? "Weekly" : "Monthly"} Budget
                                <Badge variant="outline" className="ml-2">
                                    {format(budget.startDate, "MMM d")} - {format(budget.endDate, "MMM d")}
                                </Badge>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {budgets.map((budget) => (
                        <TabsContent key={budget.id} value={budget.id}>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">${budget.totalBudget.toFixed(2)}</div>
                                        <p className="text-xs text-muted-foreground">
                                            for {format(budget.startDate, "MMM d")} - {format(budget.endDate, "MMM d")}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                                        <p className="text-xs text-muted-foreground">{budgetProgress.toFixed(1)}% of total budget</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">${(budget.totalBudget - totalSpent).toFixed(2)}</div>
                                        <p className="text-xs text-muted-foreground">{(100 - budgetProgress).toFixed(1)}% remaining</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Budget Progress</CardTitle>
                                        <PieChart className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center space-x-2">
                                            <Progress value={budgetProgress} className="w-full" />
                                            <span className="text-sm font-medium">{budgetProgress.toFixed(1)}%</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Budget Allocation</CardTitle>
                                        <CardDescription>Breakdown of your budget by category</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[300px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RechartsePieChart>
                                                    <Pie
                                                        data={pieChartData}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {pieChartData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name as BudgetCategory)} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend />
                                                </RechartsePieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Spending vs Budget</CardTitle>
                                        <CardDescription>Compare your spending to your budget limits</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[300px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={barChartData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="limit" fill="#8884d8" name="Budget Limit" />
                                                    <Bar dataKey="spent" fill="#82ca9d" name="Amount Spent" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mt-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Category Breakdown</CardTitle>
                                        <CardDescription>Manage your spending limits and track progress</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {budget.categories.map((cat) => {
                                                const progress = (cat.spent / cat.limit) * 100
                                                const isOverBudget = progress > 100
                                                return (
                                                    <div key={cat.category} className="flex items-center space-x-4">
                                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                                            {getCategoryIcon(cat.category)}
                                                        </div>
                                                        <div className="flex-1 space-y-1">
                                                            <div className="flex items-center">
                                                                <p className="font-medium">{cat.category}</p>
                                                                {isOverBudget && (
                                                                    <Badge variant="destructive" className="ml-2">
                                                                        Over Budget
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center text-sm">
                                                                <span className="text-muted-foreground">${cat.spent.toFixed(2)} spent</span>
                                                                <span className="mx-2 text-muted-foreground">/</span>
                                                                <span>${cat.limit.toFixed(2)} limit</span>
                                                            </div>
                                                            <Progress
                                                                value={progress}
                                                                className={`h-2 ${isOverBudget ? "bg-red-500" : "bg-green-500"}`}
                                                            />
                                                        </div>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button variant="outline" size="icon">
                                                                    <Edit2 className="h-4 w-4" />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-80">
                                                                <div className="grid gap-4">
                                                                    <div className="space-y-2">
                                                                        <h4 className="font-medium leading-none">Edit Budget</h4>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Adjust the spending limit for {cat.category}
                                                                        </p>
                                                                    </div>
                                                                    <div className="grid gap-2">
                                                                        <Label htmlFor="limit">Spending Limit</Label>
                                                                        <Input
                                                                            id="limit"
                                                                            type="number"
                                                                            defaultValue={cat.limit}
                                                                            onChange={(e) =>
                                                                                handleUpdateCategory(cat.category, Number.parseFloat(e.target.value))
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mt-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Transactions</CardTitle>
                                        <CardDescription>Your latest spending activities</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {transactions.slice(0, 5).map((transaction) => (
                                                <div key={transaction.id} className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                                            {getCategoryIcon(transaction.category)}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{transaction.description}</p>
                                                            <p className="text-sm text-muted-foreground">{format(transaction.date, "MMM d, yyyy")}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                                                        <Badge variant="outline">{transaction.category}</Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full" onClick={() => redirect("/application/transactions")}>
                                            View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>

                            {budgetProgress > 80 && (
                                <Alert className="mt-8" variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Budget Alert</AlertTitle>
                                    <AlertDescription>
                                        You've used {budgetProgress.toFixed(1)}% of your total budget. Consider reviewing your spending.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </motion.div>
        </div>
    )
}

export default BudgetPlanningPage

