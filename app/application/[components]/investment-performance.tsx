"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const investmentData = [
  { name: "Jan", stocks: 10000, bonds: 5000, realEstate: 2000 },
  { name: "Feb", stocks: 11000, bonds: 5200, realEstate: 2100 },
  { name: "Mar", stocks: 10500, bonds: 5400, realEstate: 2300 },
  { name: "Apr", stocks: 12000, bonds: 5600, realEstate: 2400 },
  { name: "May", stocks: 12500, bonds: 5800, realEstate: 2600 },
  { name: "Jun", stocks: 13000, bonds: 6000, realEstate: 2800 },
]

export default function InvestmentPerformance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Investment Performance</CardTitle>
          <CardDescription>Your portfolio growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={investmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="stocks" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="bonds" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="realEstate" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

