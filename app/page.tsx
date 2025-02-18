"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import heroImage from "@/public/imgs/hero-image.png"
import { ArrowDown, ArrowUp, Wallet, X } from "lucide-react"
import { NFCSidewardChart } from "@/components/non-func-sidewards-chart"
import { NFCBarChart } from "@/components/non-func-barchart"
import { NFCRadialChart } from "@/components/non-func-radialchart"
import { Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from "lucide-react"
import { NFCLinearBarChart } from "@/components/non-func-linear-barchart"
import { useState } from "react"

const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Contact", href: "#" },
  ],
  social: [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ],
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div className="flex flex-col gap-10 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center py-3 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-4">
            <Wallet className="text-green-700 h-6 w-6" />
            <h1 className="font-bold text-lg sm:text-xl">Wallet Finance Tracker</h1>
          </div>
          <nav className="hidden sm:flex gap-4 items-center">
            {navigation.main.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Button variant="ghost" className="font-semibold">
              Log In
            </Button>
            <Button className="rounded-full px-5 py-2">Get Started</Button>
          </nav>
          <Button variant="ghost" className="sm:hidden" onClick={() => setMobileMenuOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full bg-white transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out sm:hidden`}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Wallet className="text-green-700 h-6 w-6" />
            <h1 className="font-bold text-lg">Wallet Finance Tracker</h1>
          </div>
          <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-8 px-4">
          {navigation.main.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <Button variant="ghost" className="w-full justify-start text-base font-medium text-gray-900 hover:bg-gray-50 py-2">
            Log In
          </Button>
          <Button className="w-full mt-4 rounded-full py-2">Get Started</Button>
        </nav>
      </div>

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
                <Button className="text-md rounded-full px-6 py-3 mt-4">Get Started</Button>
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

      {/* CTA Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="absolute inset-0">
          {/* Small glowing dots */}
          <div className="absolute right-40 top-28 h-3 w-3 rounded-full bg-emerald-200 shadow-lg shadow-emerald-200/50" />
          <div className="absolute right-96 top-24 h-2 w-2 rounded-full bg-emerald-200 shadow-lg shadow-emerald-200/50" />
          <div className="absolute right-32 bottom-32 h-4 w-4 rounded-full bg-emerald-200 shadow-lg shadow-emerald-200/50" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Not sure of the right plan for you?
              </h2>
              <div className="mt-8">
                <Button
                  className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                  variant="ghost"
                >
                  Let&apos;s Chat
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </div>
            </div>
            <div className="flex items-start lg:pt-8">
              <p className="text-xl text-emerald-50">
                We have a dedicated team of financial experts ready to help you choose the perfect plan for your
                business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

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
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center mb-8" aria-label="Footer">
            {navigation.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <a href={item.href} className="text-base text-gray-600 hover:text-emerald-600 transition-colors">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className="flex justify-center space-x-6 mb-8">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-emerald-600 transition-colors">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="text-center">
            <Button
              className="group inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-lg font-semibold text-white hover:bg-emerald-700 transition-colors"
              variant="ghost"
            >
              Get Started
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </div>
          <p className="mt-8 text-center text-base text-gray-500">
            &copy; 2025 Wallet Finance Tracker, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

