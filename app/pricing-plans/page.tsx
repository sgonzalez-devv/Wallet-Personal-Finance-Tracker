"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CallToBook from "@/components/call-to-action-1"

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
    highlighted?: boolean
}

const plans: Plan[] = [
    {
        name: "Free",
        price: { monthly: 0, annually: 0 },
        description: "Basic tracking for personal finances",
        features: [
            { name: "Track up to 2 accounts", included: true },
            { name: "Basic expense categorization", included: true },
            { name: "Monthly spending reports", included: true },
            { name: "AI-powered insights", included: false },
            { name: "Investment tracking", included: false },
            { name: "Bill reminders", included: false },
            { name: "Data export", included: false },
            { name: "Priority support", included: false },
        ],
    },
    {
        name: "Starter",
        price: { monthly: 9.99, annually: 99 },
        description: "Ideal for individuals starting their financial journey",
        features: [
            { name: "Track unlimited accounts", included: true },
            { name: "Advanced expense categorization", included: true },
            { name: "Weekly spending reports", included: true },
            { name: "Basic AI-powered insights", included: true },
            { name: "Basic investment tracking", included: true },
            { name: "Bill reminders", included: true },
            { name: "Data export", included: false },
            { name: "Priority support", included: false },
        ],
    },
    {
        name: "Pro",
        price: { monthly: 19.99, annually: 199 },
        description: "Perfect for serious budgeters and investors",
        features: [
            { name: "Track unlimited accounts", included: true },
            { name: "Advanced expense categorization", included: true },
            { name: "Daily spending reports", included: true },
            { name: "Advanced AI-powered insights", included: true },
            { name: "Comprehensive investment tracking", included: true },
            { name: "Bill reminders and automatic payments", included: true },
            { name: "Data export", included: true },
            { name: "Priority support", included: true },
        ],
        highlighted: true,
    },
    {
        name: "Professional",
        price: { monthly: 39.99, annually: 399 },
        description: "For financial professionals and power users",
        features: [
            { name: "Track unlimited accounts", included: true },
            { name: "Custom expense categorization", included: true },
            { name: "Real-time spending reports", included: true },
            { name: "AI-powered financial advisor", included: true },
            { name: "Advanced investment analytics", included: true },
            { name: "Automated bill management", included: true },
            { name: "API access and data integration", included: true },
            { name: "24/7 premium support", included: true },
        ],
    },
]

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(false)

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
                        {plans.map((plan) => (
                            <Card key={plan.name} className={`flex flex-col ${plan.highlighted ? "border-green-500 border-2" : ""}`}>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-green-600">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="text-4xl font-bold mb-4">
                                        ${isAnnual ? (plan.price.annually / 12).toFixed(2) : plan.price.monthly}
                                        <span className="text-sm font-normal text-gray-500">/month</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, index) => (
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
                                    <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                                        {plan.name === "Free" ? "Sign Up" : "Get Started"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
            <CallToBook />
            <Footer />
        </div>
    )
}

