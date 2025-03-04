"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { format, addWeeks, addMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"
import { ArrowLeft, Calendar, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

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

interface BudgetCategoryItem {
  category: BudgetCategory
  limit: number
}

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

const defaultCategories: BudgetCategoryItem[] = [
  { category: "food", limit: 500 },
  { category: "housing", limit: 1000 },
  { category: "transportation", limit: 200 },
  { category: "utilities", limit: 300 },
  { category: "entertainment", limit: 200 },
  { category: "healthcare", limit: 100 },
  { category: "personal", limit: 150 },
  { category: "other", limit: 100 },
]

const CreateBudgetPage: React.FC = () => {
  const router = useRouter()
  const [budgetPeriod, setBudgetPeriod] = useState<BudgetPeriod>("monthly")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [categories, setCategories] = useState<BudgetCategoryItem[]>(defaultCategories)
  const [newCategoryName, setNewCategoryName] = useState<string>("")
  const [isAutoAdjust, setIsAutoAdjust] = useState<boolean>(true)

  const endDate = budgetPeriod === "weekly" ? endOfWeek(addWeeks(startDate, 1)) : endOfMonth(addMonths(startDate, 1))

  const totalBudget = categories.reduce((sum, cat) => sum + cat.limit, 0)

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    setStartDate(budgetPeriod === "weekly" ? startOfWeek(newDate) : startOfMonth(newDate))
  }

  const handleCategoryLimitChange = (category: BudgetCategory, newLimit: number) => {
    const updatedCategories = categories.map((cat) => (cat.category === category ? { ...cat, limit: newLimit } : cat))

    if (isAutoAdjust) {
      const oldTotal = categories.reduce((sum, cat) => sum + cat.limit, 0)
      const newTotal = updatedCategories.reduce((sum, cat) => sum + cat.limit, 0)
      const diff = newTotal - oldTotal

      if (diff !== 0) {
        const categoriesToAdjust = updatedCategories.filter((cat) => cat.category !== category)
        const totalToAdjust = categoriesToAdjust.reduce((sum, cat) => sum + cat.limit, 0)

        updatedCategories.forEach((cat) => {
          if (cat.category !== category) {
            const adjustmentRatio = cat.limit / totalToAdjust
            cat.limit = Math.max(0, cat.limit - diff * adjustmentRatio)
          }
        })
      }
    }

    setCategories(updatedCategories)
  }

  const handleAddCategory = () => {
    if (newCategoryName && !categories.some((cat) => cat.category === newCategoryName)) {
      setCategories([...categories, { category: newCategoryName as BudgetCategory, limit: 0 }])
      setNewCategoryName("")
    }
  }

  const handleRemoveCategory = (categoryToRemove: BudgetCategory) => {
    setCategories(categories.filter((cat) => cat.category !== categoryToRemove))
  }

  const handleCreateBudget = () => {
    // Here you would typically save the budget to your backend or state management
    console.log("Creating budget:", {
      period: budgetPeriod,
      startDate,
      endDate,
      categories,
      totalBudget,
    })
    // Navigate back to the main budget page
    router.push("/budget")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={() => router.push("/application/budgets")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Budgets
            </Button>
          </div>
          <h1 className="text-3xl font-bold">Create New Budget</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budget Details</CardTitle>
            <CardDescription>Set up your budget period and start date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="budget-period">Budget Period</Label>
              <Select value={budgetPeriod} onValueChange={(value: BudgetPeriod) => setBudgetPeriod(value)}>
                <SelectTrigger id="budget-period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="start-date">Start Date</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="start-date"
                  type="date"
                  value={format(startDate, "yyyy-MM-dd")}
                  onChange={handleStartDateChange}
                />
                <Badge variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Allocate your budget across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.category} className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`category-${cat.category}`} className="font-medium">
                        {cat.category}
                      </Label>
                      <span className="text-sm font-medium">
                        ${cat.limit.toFixed(2)} ({((cat.limit / totalBudget) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Slider
                      id={`category-${cat.category}`}
                      min={0}
                      max={Math.max(totalBudget * 2, cat.limit * 2)}
                      step={10}
                      value={[cat.limit]}
                      onValueChange={(value) => handleCategoryLimitChange(cat.category, value[0])}
                    />
                  </div>
                  <Button variant="outline" size="icon" onClick={() => handleRemoveCategory(cat.category)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center space-x-2">
              <Input
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <Button onClick={handleAddCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="auto-adjust" checked={isAutoAdjust} onCheckedChange={setIsAutoAdjust} />
              <Label htmlFor="auto-adjust">Auto-adjust other categories</Label>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">Total Budget: ${totalBudget.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                {budgetPeriod === "weekly" ? "Weekly" : "Monthly"} allocation
              </p>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Visual representation of your budget allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="limit"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.push("/budget")}>
            Cancel
          </Button>
          <Button onClick={handleCreateBudget}>Create Budget</Button>
        </div>
      </motion.div>
    </div>
  )
}

export default CreateBudgetPage

