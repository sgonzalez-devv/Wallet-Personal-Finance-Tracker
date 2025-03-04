"use client"

import type * as React from "react"
import { Wallet, PieChart, TrendingUp, Calendar, Settings, CreditCard, Target } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "@/components/ui/sidebar"
import { AccountSwitcher } from "./account-switcher"
import { NavAccounts } from "./nav-accounts"
import { useAuth } from "@/context/AuthContext"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar()
  const {user} = useAuth();

const data = {
  user: {
    name: user?.displayName || "Guest",
    email: user?.email || "john@example.com",
    avatar: user?.photoURL || "/avatars/john-doe.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
      isActive: true,
      items: [
        {
          title: "Show Everything",
          url: "/application/dashboard"
        }
      ]
    },
    {
      title: "Transactions",
      url: "/application/transactions",
      icon: Wallet,
      items: [
        {
          title: "All Transactions",
          url: "/application/transactions",
        },
        {
          title: "Income",
          url: "/application/transactions/income",
        },
        {
          title: "Expenses",
          url: "/application/transactions/expenses",
        },
      ],
    },
    {
      title: "Budgets",
      url: "/application/budgets",
      icon: Target,
      items: [
        {
          title: "Overview",
          url: "/application/budgets",
        },
        {
          title: "Create Budget",
          url: "/application/budgets/create",
        },
      ],
    },
    {
      title: "Investments",
      url: "/application/investments",
      icon: TrendingUp,
      items: [
        {
          title: "Portfolio",
          url: "/application/investments/portfolio",
        },
        {
          title: "Performance",
          url: "/application/investments/performance",
        },
      ],
    },
    {
      title: "Bills",
      url: "/application/bills",
      icon: Calendar,
      items: [
        {
          title: "Upcoming",
          url: "/application/bills/upcoming",
        },
        {
          title: "Paid",
          url: "/application/bills/paid",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Checking Account",
      balance: 5240.5,
      icon: CreditCard,
    },
    {
      name: "Savings Account",
      balance: 12750.75,
      icon: Wallet,
    },
    {
      name: "Investment Account",
      balance: 34500.0,
      icon: TrendingUp,
    },
  ],
}

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AccountSwitcher accounts={data.accounts} isMobile={isMobile} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAccounts accounts={data.accounts} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

