"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation";

const navigation = {
    main: [
      { name: "About", href: "/about" },
      { name: "Pricing", href: "/pricing-plans" },
      { name: "Contact", href: "/contact" },
    ],
    social: [
      { name: "Facebook", icon: Facebook, href: "#" },
      { name: "Twitter", icon: Twitter, href: "#" },
      { name: "Instagram", icon: Instagram, href: "#" },
      { name: "LinkedIn", icon: Linkedin, href: "#" },
    ],
  }

export default function Footer() {
    
      const router = useRouter();
    
      const handleAuthRedirect = () => {
        router.push("/auth")
      }
    return (
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
                        onClick={handleAuthRedirect}
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
    )
}
