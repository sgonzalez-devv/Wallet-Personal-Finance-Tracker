"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const goals = [
  { name: "Emergency Fund", current: 5000, target: 10000, color: "bg-green-500" },
  { name: "New Car", current: 15000, target: 30000, color: "bg-blue-500" },
  { name: "Home Down Payment", current: 50000, target: 100000, color: "bg-pink-500" },
]

export default function FinancialGoals() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Financial Goals</CardTitle>
          <CardDescription>Track your progress towards your financial objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goals.map((goal, index) => {
              const progress = (goal.current / goal.target) * 100
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span
                          className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${goal.color} text-white`}
                        >
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

