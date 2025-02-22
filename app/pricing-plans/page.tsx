"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CallToBook from "@/components/call-to-action-1"
import { useAuth } from "@/context/AuthContext"

type PlanFeature = {
  name: string
  included: boolean
}

type Plan = {
  name: string
  price: {
    monthly: number
    annually: number
  }
  description: string
  features: PlanFeature[]
}

const plans: Plan[] = [
  {
    name: "Free",
    price: { monthly: 0, annually: 0 },
    description: "Basic tracking for personal finances",
    features: [
      { name: "Basic dashboard", included: true },
      { name: "Up to 20 transactions per week", included: true },
      { name: "Basic transaction list", included: true },
      { name: "Simple monthly reports", included: true },
      { name: "Basic AI insights", included: true },
      { name: "Basic budget creation", included: true },
      { name: "Email support", included: true },
      { name: "Advanced features", included: false },
    ],
  },
  {
    name: "Starter",
    price: { monthly: 9.99, annually: 99 },
    description: "Ideal for individuals starting their financial journey",
    features: [
      { name: "Everything in Free", included: true },
      { name: "Unlimited weekly entries", included: true },
      { name: "Advanced categorization", included: true },
      { name: "Weekly and monthly reports", included: true },
      { name: "Detailed AI insights", included: true },
      { name: "Goal setting and tracking", included: true },
      { name: "Data export", included: false },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: { monthly: 19.99, annually: 199 },
    description: "Perfect for serious budgeters and financial planners",
    features: [
      { name: "Everything in Starter", included: true },
      { name: "Custom transaction categories", included: true },
      { name: "Advanced budget tools with alerts", included: true },
      { name: "Comprehensive AI advisor features", included: true },
      { name: "Goal recommendations", included: true },
      { name: "Advanced reports with visualizations", included: true },
      { name: "Data export", included: true },
      { name: "Priority support", included: true },
    ],
  },
  {
    name: "Professional",
    price: { monthly: 39.99, annually: 399 },
    description: "For financial professionals and power users",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Most advanced AI financial planning", included: true },
      { name: "Custom report generation", included: true },
      { name: "Data integration with spreadsheets", included: true },
      { name: "Unlimited goals and tracking", included: true },
      { name: "Financial modeling tools", included: true },
      { name: "API access", included: true },
      { name: "24/7 premium support", included: true },
    ],
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const { plan } = useAuth()

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-green-600">Pricing Plans</h1>
          <p className="text-xl text-center mb-12 text-gray-600">Choose the plan that fits your financial goals</p>

          <div className="flex justify-center items-center mb-12">
            <span className={`mr-3 ${isAnnual ? "text-gray-500" : "text-green-600 font-semibold"}`}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`ml-3 ${isAnnual ? "text-green-600 font-semibold" : "text-gray-500"}`}>
              Annual (Save 20%)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((planItem) => {
              const isCurrentPlan = plan !== null && plan.toLowerCase() === planItem.name.toLowerCase()
              const isHigherPlan =
                plan !== null &&
                plans.findIndex((p) => p.name.toLowerCase() === plan.toLowerCase()) <
                  plans.findIndex((p) => p.name === planItem.name)

              return (
                <Card
                  key={planItem.name}
                  className={`flex flex-col ${isCurrentPlan ? "border-green-500 border-2 shadow-lg" : ""}`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-green-600">{planItem.name}</CardTitle>
                    <CardDescription>{planItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-4xl font-bold mb-4">
                      ${isAnnual ? (planItem.price.annually / 12).toFixed(2) : planItem.price.monthly}
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </div>
                    <ul className="space-y-2">
                      {planItem.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          <span className={feature.included ? "text-gray-700" : "text-gray-400"}>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={isCurrentPlan ? "default" : "outline"} disabled={isCurrentPlan}>
                      {isCurrentPlan
                        ? "Current Plan"
                        : plan === null
                          ? planItem.name === "Free"
                            ? "Sign Up"
                            : "Get Started"
                          : isHigherPlan
                            ? "Upgrade"
                            : "Downgrade"}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
      <CallToBook />
      <Footer />
    </div>
  )
}

