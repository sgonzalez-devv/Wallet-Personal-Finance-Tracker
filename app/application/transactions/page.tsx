"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CreditCard,
  DollarSign,
  Filter,
  Search,
  ShoppingBag,
  Utensils,
  Wifi,
  Home,
  Car,
  Zap,
  Plus,
} from "lucide-react"
import { format, subDays, isAfter, isBefore, startOfMonth, endOfMonth, subMonths } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { AddTransactionModal } from "../[components]/add-transaction-modal"

// Types
type TransactionType = "income" | "expense"
type TransactionCategory =
  | "food"
  | "shopping"
  | "utilities"
  | "transport"
  | "housing"
  | "entertainment"
  | "salary"
  | "investment"
  | "other"

interface Transaction {
  id: string
  date: Date
  amount: number
  type: TransactionType
  category: TransactionCategory
  description: string
  merchant: string
}

// Helper function to get icon based on category
const getCategoryIcon = (category: TransactionCategory) => {
  switch (category) {
    case "food":
      return <Utensils className="h-4 w-4" />
    case "shopping":
      return <ShoppingBag className="h-4 w-4" />
    case "utilities":
      return <Zap className="h-4 w-4" />
    case "transport":
      return <Car className="h-4 w-4" />
    case "housing":
      return <Home className="h-4 w-4" />
    case "entertainment":
      return <Wifi className="h-4 w-4" />
    case "salary":
      return <DollarSign className="h-4 w-4" />
    case "investment":
      return <CreditCard className="h-4 w-4" />
    default:
      return <CreditCard className="h-4 w-4" />
  }
}

// Helper function to get color based on category
const getCategoryColor = (category: TransactionCategory) => {
  switch (category) {
    case "food":
      return "#FF8A65"
    case "shopping":
      return "#64B5F6"
    case "utilities":
      return "#FFD54F"
    case "transport":
      return "#4DB6AC"
    case "housing":
      return "#9575CD"
    case "entertainment":
      return "#4FC3F7"
    case "salary":
      return "#81C784"
    case "investment":
      return "#7986CB"
    default:
      return "#A1887F"
  }
}

// Mock data
const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = []
  const now = new Date()

  // Generate transactions for the past 3 months
  for (let i = 0; i < 50; i++) {
    const date = subDays(now, Math.floor(Math.random() * 90))
    const type: TransactionType = Math.random() > 0.3 ? "expense" : "income"

    let category: TransactionCategory
    let merchant: string

    if (type === "income") {
      category = Math.random() > 0.5 ? "salary" : "investment"
      merchant = category === "salary" ? "Employer Inc." : "Investment Fund"
    } else {
      const categories: TransactionCategory[] = [
        "food",
        "shopping",
        "utilities",
        "transport",
        "housing",
        "entertainment",
        "other",
      ]
      category = categories[Math.floor(Math.random() * categories.length)]

      const merchants: Record<TransactionCategory, string[]> = {
        food: ["Restaurant", "Grocery Store", "Cafe"],
        shopping: ["Online Store", "Department Store", "Electronics Shop"],
        utilities: ["Electric Company", "Water Service", "Internet Provider"],
        transport: ["Gas Station", "Ride Share", "Public Transit"],
        housing: ["Rent", "Mortgage", "Home Improvement"],
        entertainment: ["Cinema", "Streaming Service", "Concert"],
        salary: ["Employer Inc."],
        investment: ["Investment Fund"],
        other: ["Miscellaneous", "Unknown", "Service"],
      };

      const merchantOptions = merchants[category] || merchants.other
      merchant = merchantOptions[Math.floor(Math.random() * merchantOptions.length)]
    }

    const amount = type === "income" ? Math.floor(Math.random() * 3000) + 1000 : Math.floor(Math.random() * 200) + 10

    transactions.push({
      id: `trans-${i}`,
      date,
      amount,
      type,
      category,
      description: `${type === "income" ? "Received from" : "Payment to"} ${merchant}`,
      merchant,
    })
  }

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime())
}

const mockTransactions = generateMockTransactions()

// Transaction Item Component
interface TransactionItemProps {
  transaction: Transaction
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <motion.div
      className="flex items-center justify-between py-3 border-b border-muted last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {getCategoryIcon(transaction.category)}
        </div>
        <div>
          <p className="font-medium">{transaction.merchant}</p>
          <p className="text-sm text-muted-foreground">{format(transaction.date, "MMM dd, yyyy")}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
        </p>
        <Badge variant="outline" className="text-xs">
          {transaction.category}
        </Badge>
      </div>
    </motion.div>
  )
}

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("recent")
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "amount">("date")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [transactions, setTransactions] = useState(mockTransactions)

  const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transactionWithId = {
      ...newTransaction,
      id: `trans-${transactions.length + 1}`,
    }
    setTransactions([transactionWithId, ...transactions])
  }

  // Filter transactions based on active tab and filters
  const filteredTransactions = useMemo(() => {
    const now = new Date()
    const startOfCurrentMonth = startOfMonth(now)
    const endOfCurrentMonth = endOfMonth(now)
    const startOfPreviousMonth = startOfMonth(subMonths(now, 1))
    const endOfPreviousMonth = endOfMonth(subMonths(now, 1))

    let filtered = [...transactions]

    // Filter by time period
    if (activeTab === "recent") {
      filtered = filtered.filter((t) => isAfter(t.date, subDays(now, 7)))
    } else if (activeTab === "thisMonth") {
      filtered = filtered.filter((t) => isAfter(t.date, startOfCurrentMonth) && isBefore(t.date, endOfCurrentMonth))
    } else if (activeTab === "lastMonth") {
      filtered = filtered.filter((t) => isAfter(t.date, startOfPreviousMonth) && isBefore(t.date, endOfPreviousMonth))
    }

    // Filter by transaction type
    if (filterType !== "all") {
      filtered = filtered.filter((t) => t.type === filterType)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.merchant.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query),
      )
    }

    // Sort transactions
    if (sortBy === "date") {
      filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
    } else {
      filtered.sort((a, b) => b.amount - a.amount)
    }

    return filtered
  }, [activeTab, filterType, searchQuery, sortBy, transactions])

  // Calculate summary data
  const summary = useMemo(() => {
    const income = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const expenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    return {
      income,
      expenses,
      balance: income - expenses,
    }
  }, [filteredTransactions])

  // Prepare chart data
  const categoryData = useMemo(() => {
    const categoryTotals: Record<string, number> = {}

    filteredTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        if (!categoryTotals[t.category]) {
          categoryTotals[t.category] = 0
        }
        categoryTotals[t.category] += t.amount
      })

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }))
  }, [filteredTransactions])

  // Daily spending data for line chart
  const dailyData = useMemo(() => {
    const dailyTotals: Record<string, { date: string; expenses: number; income: number }> = {}

    filteredTransactions.forEach((t) => {
      const dateStr = format(t.date, "MMM dd")

      if (!dailyTotals[dateStr]) {
        dailyTotals[dateStr] = {
          date: dateStr,
          expenses: 0,
          income: 0,
        }
      }

      if (t.type === "expense") {
        dailyTotals[dateStr].expenses += t.amount
      } else {
        dailyTotals[dateStr].income += t.amount
      }
    })

    return Object.values(dailyTotals).slice(0, 7)
  }, [filteredTransactions])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  return (
    <div className="container mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">Track your income and expenses</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Custom Range
            </Button>
            <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus className=" h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Income</p>
                  <h3 className="text-2xl font-bold text-green-600">${summary.income.toFixed(2)}</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <ArrowUpIcon className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expenses</p>
                  <h3 className="text-2xl font-bold text-red-600">${summary.expenses.toFixed(2)}</h3>
                </div>
                <div className="p-2 bg-red-100 rounded-full">
                  <ArrowDownIcon className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Balance</p>
                  <h3 className={`text-2xl font-bold ${summary.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${summary.balance.toFixed(2)}
                  </h3>
                </div>
                <div className={`p-2 rounded-full ${summary.balance >= 0 ? "bg-green-100" : "bg-red-100"}`}>
                  <DollarSign className={`h-5 w-5 ${summary.balance >= 0 ? "text-green-600" : "text-red-600"}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Breakdown of your expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name as TransactionCategory)} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Overview</CardTitle>
              <CardDescription>Income vs Expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#4ade80" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>{filteredTransactions.length} transactions found</CardDescription>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="income">Income Only</SelectItem>
                    <SelectItem value="expense">Expenses Only</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Most Recent</SelectItem>
                    <SelectItem value="amount">Amount (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="recent" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="thisMonth">This Month</TabsTrigger>
                <TabsTrigger value="lastMonth">Last Month</TabsTrigger>
                <TabsTrigger value="all">All Transactions</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-0">
                <AnimatePresence mode="popLayout">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TransactionItem key={transaction.id} transaction={transaction} />
                    ))
                  ) : (
                    <motion.div className="py-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <p className="text-muted-foreground">No transactions found</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </CardFooter>
        </Card>
        <AddTransactionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddTransaction={handleAddTransaction}
        />
      </motion.div>
    </div>
  )
}

