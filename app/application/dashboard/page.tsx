"use client"

import type React from "react"
import { useAuth } from "@/context/AuthContext"
import AccountsOverview from "../[components]/accounts-overview"
import BillCalendar from "../[components]/bill-calendar"
import TransactionHistory from "../[components]/transaction-history"
import FinancialGoals from "../[components]/financial-goals"
import InvestmentPerformance from "../[components]/investment-performance"
import SavingsGoals from "../[components]/savings.goals"

export default function DashboardPage() {
  const user = useAuth()

  return (
    <div className="container mx-auto p-4 space-y-6">
      <AccountsOverview />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BillCalendar />
        <FinancialGoals />
        <SavingsGoals />
      </div>
      <TransactionHistory />
      <InvestmentPerformance />
    </div>
  )
}
