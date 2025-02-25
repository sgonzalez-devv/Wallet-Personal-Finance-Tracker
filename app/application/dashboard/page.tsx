"use client"

import { useAuth } from "@/context/AuthContext"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import useSeparateThousands from "@/hooks/use-separate-thousands"

const chartConfig = {
  balance: {
    label: "Balance",
    color: "#62fc03",
  },
} satisfies ChartConfig

const accounts = [
  {
    accountId: 1, accountName: "Personal Savings Account", bankName: "Qik", accountBalance: 32456, isMoreThanLastMonth: true, growthPercentageAmount: 18,
    accountHistory: [
      { month: "January", balance: 2000 },
      { month: "February", balance: 4000 },
      { month: "March", balance: 6000 },
      { month: "April", balance: 8000 },
      { month: "May", balance: 6000 },
      { month: "June", balance: 12000 },
    ]
  },
  {
    accountId: 2, accountName: "Checking Account", bankName: "Banco Popular", accountBalance: 101839, isMoreThanLastMonth: false, growthPercentageAmount: -12,
    accountHistory: [
      { month: "January", balance: 12000 },
      { month: "February", balance: 10000 },
      { month: "March", balance: 10500 },
      { month: "April", balance: 9500 },
      { month: "May", balance: 10000 },
      { month: "June", balance: 9000 },
    ]
  },
  {
    accountId: 3, accountName: "Investment Account", bankName: "Binance", accountBalance: 12000, isMoreThanLastMonth: true, growthPercentageAmount: 34,
    accountHistory: [
      { month: "January", balance: 1500 },
      { month: "February", balance: 2200 },
      { month: "March", balance: 2000 },
      { month: "April", balance: 2800 },
      { month: "May", balance: 2600 },
      { month: "June", balance: 3200 },
    ]
  },
  {
    accountId: 4, accountName: "Home Savings Account", bankName: "Qik", accountBalance: 1385672, isMoreThanLastMonth: true, growthPercentageAmount: 1,
    accountHistory: [
      { month: "January", balance: 900 },
      { month: "February", balance: 1300 },
      { month: "March", balance: 1100 },
      { month: "April", balance: 1800 },
      { month: "May", balance: 1600 },
      { month: "June", balance: 2200 },
    ]
  },
]

const Dashboard = () => {

  const user = useAuth();

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Accounts</h1>
      <div className="flex flex-wrap w-full items-center gap-4">
        {accounts.map((account) => (
          <div key={account.accountId} className="border border-gray-100 shadow-md p-3 rounded-md">
            <section className="flex justify-between items-center">
              <h1>{account.accountName}</h1>
              <span className="bg-green-100 p-2 text-xs rounded-full border shadow-sm">{account.bankName}</span>
            </section>
            <p className="text-xs text-muted-foreground">Account Balance:</p>
            <h1 className="text-2xl font-bold py-1">${useSeparateThousands(account.accountBalance)}</h1>
            {account.isMoreThanLastMonth ? (
              <p className="text-green-400 text-xs ">% {account.growthPercentageAmount} <span className="text-muted-foreground">than last month</span></p>
            ) : (
              <p className="text-red-400 text-xs ">% {account.growthPercentageAmount} <span className="text-muted-foreground">than last month</span></p>
            )}

            <ChartContainer config={chartConfig} className="w-full min-h-[150px]">
              <AreaChart
                accessibilityLayer
                data={account.accountHistory}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="balance"
                  type="natural"
                  fill={account.isMoreThanLastMonth ? "green" : "red"}
                  fillOpacity={0.4}
                  stroke={account.isMoreThanLastMonth ? "green" : "red"}
                />
              </AreaChart>
            </ChartContainer>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;