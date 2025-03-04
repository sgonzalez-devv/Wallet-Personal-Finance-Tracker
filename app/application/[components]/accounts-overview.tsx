"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import useSeparateThousands from "@/hooks/use-separate-thousands"
import { useMemo } from "react"

const chartConfig = {
  balance: {
    label: "Balance",
    color: "#62fc03",
  },
} satisfies ChartConfig

const accounts = [
  {
    accountId: 1,
    accountName: "Personal Savings Account",
    bankName: "Qik",
    accountBalance: 32456,
    isMoreThanLastMonth: true,
    growthPercentageAmount: 18,
    accountHistory: [
      { month: "January", balance: 2000 },
      { month: "February", balance: 4000 },
      { month: "March", balance: 6000 },
      { month: "April", balance: 8000 },
      { month: "May", balance: 6000 },
      { month: "June", balance: 12000 },
    ],
  },
  {
    accountId: 2,
    accountName: "Checking Account",
    bankName: "Banco Popular",
    accountBalance: 101839,
    isMoreThanLastMonth: false,
    growthPercentageAmount: -12,
    accountHistory: [
      { month: "January", balance: 12000 },
      { month: "February", balance: 10000 },
      { month: "March", balance: 10500 },
      { month: "April", balance: 9500 },
      { month: "May", balance: 10000 },
      { month: "June", balance: 9000 },
    ],
  },
  {
    accountId: 3,
    accountName: "Investment Account",
    bankName: "Binance",
    accountBalance: 12000,
    isMoreThanLastMonth: true,
    growthPercentageAmount: 34,
    accountHistory: [
      { month: "January", balance: 1500 },
      { month: "February", balance: 2200 },
      { month: "March", balance: 2000 },
      { month: "April", balance: 2800 },
      { month: "May", balance: 2600 },
      { month: "June", balance: 3200 },
    ],
  },
  {
    accountId: 4,
    accountName: "Home Savings Account",
    bankName: "Qik",
    accountBalance: 1385672,
    isMoreThanLastMonth: true,
    growthPercentageAmount: 1,
    accountHistory: [
      { month: "January", balance: 900 },
      { month: "February", balance: 1300 },
      { month: "March", balance: 1100 },
      { month: "April", balance: 1800 },
      { month: "May", balance: 1600 },
      { month: "June", balance: 2200 },
    ],
  },
]

export default function AccountsOverview() {
  const formattedBalances = accounts.map((account) => useSeparateThousands(account.accountBalance))

  const formattedAccounts = useMemo(() => {
    return accounts.map((account, index) => ({
      ...account,
      formattedBalance: formattedBalances[index],
    }))
  }, [formattedBalances])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>Accounts Overview</CardTitle>
          <CardDescription>Your financial accounts at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {formattedAccounts.map((account) => (
              <div key={account.accountId} className="border border-gray-100 shadow-md p-3 rounded-md">
                <section className="flex justify-between items-center">
                  <h2 className="font-semibold">{account.accountName}</h2>
                  <span className="bg-green-100 p-2 text-xs rounded-full border shadow-sm">{account.bankName}</span>
                </section>
                <p className="text-xs text-muted-foreground">Account Balance:</p>
                <h3 className="text-2xl font-bold py-1">${account.formattedBalance}</h3>
                <p className={`text-xs ${account.isMoreThanLastMonth ? "text-green-400" : "text-red-400"}`}>
                  % {account.growthPercentageAmount} <span className="text-muted-foreground">than last month</span>
                </p>
                <ChartContainer config={chartConfig} className="w-full min-h-[100px]">
                  <AreaChart data={account.accountHistory} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke={account.isMoreThanLastMonth ? "#4ade80" : "#f87171"}
                      fill={account.isMoreThanLastMonth ? "#4ade80" : "#f87171"}
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

