"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import heroImage from "@/public/imgs/hero-image.png"
import { ArrowDown, ArrowUp, Wallet, X } from "lucide-react"
import { NFCSidewardChart } from "@/components/non-func-sidewards-chart"
import { NFCBarChart } from "@/components/non-func-barchart"
import { NFCRadialChart } from "@/components/non-func-radialchart"
import { ArrowUpRight } from "lucide-react"
import { NFCLinearBarChart } from "@/components/non-func-linear-barchart"
import { useState } from "react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import CallToBook from "@/components/call-to-action-1"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();

  const handleAuthRedirect = () => {
    router.push("/auth")
  }

  return (
    <div className="flex flex-col gap-10 overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col gap-4 text-center lg:text-left lg:max-w-[50%]">
              <div>
                <span className="inline-block bg-green-200 font-semibold text-green-900 rounded-full px-3 py-1 text-sm sm:text-base">
                  Finance Solutions for You
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Maximize <br />
                Your <span className="text-green-400">Financial</span> Potential
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                Welcome to Wallet Finance Tracker, where financial management meets simplicity and efficiency.
              </p>
              <div>
                <Button className="text-md rounded-full px-6 py-3 mt-4" onClick={handleAuthRedirect}>Get Started</Button>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:ml-10 relative">
              <Image
                src={heroImage || "/placeholder.svg"}
                alt="Illustration of a finance chart"
                width={600}
                height={600}
                className="max-w-full h-auto"
              />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 right-0 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center w-full text-center gap-5 mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-green-400">Empower</span> Your Financial Future with us
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Gain real-time visibility into your financial performance with intuitive dashboards.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4 transition-transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2">Expense Tracking</h3>
              <NFCSidewardChart />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 transition-transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2">Budget Allocation</h3>
              <NFCRadialChart />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 transition-transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2">Savings Growth</h3>
              <NFCBarChart />
            </div>
          </div>
        </div>
      </section>

      <CallToBook />

      {/* Investment Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
            Track Your <span className="text-green-400">Investment Portfolio</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Monitor your portfolio performance with real-time data and updated amounts.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Total Assets", value: "US 122,493.00", change: 7, up: true },
                { title: "Stocks Value", value: "US 75,280.00", change: 11, up: true },
                { title: "Crypto Holdings", value: "US 32,213.00", change: 5, up: false },
                { title: "Cash Balance", value: "US 15,000.00", change: 2, up: true },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md hover:border-green-200"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{item.title}</h3>
                  <p className="text-2xl font-bold mb-4">{item.value}</p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`py-1 px-2 rounded-lg text-sm flex items-center gap-1 ${item.up ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                    >
                      {item.up ? <ArrowUp className="w-4" /> : <ArrowDown className="w-4" />}
                      {item.change}%
                    </span>
                    <p className="text-sm text-gray-500">vs last month</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Portfolio Performance</h3>
              <NFCLinearBarChart />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

