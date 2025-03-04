"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const savingsGoals = [
  { name: "Vacation Fund", current: 2500, target: 5000, color: "bg-blue-500" },
  { name: "New Laptop", current: 800, target: 1500, color: "bg-purple-500" },
  { name: "Wedding", current: 10000, target: 20000, color: "bg-pink-500" },
]

export default function SavingsGoals() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Savings Goals</CardTitle>
          <CardDescription>Track your progress towards specific savings targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {savingsGoals.map((goal, index) => {
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

