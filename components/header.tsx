"use client"

import { Button } from "@/components/ui/button"
import { Wallet, X } from "lucide-react"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"

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

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = useRouter();
    const { user } = useAuth();

    return (
        <div>
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
                <div className="flex justify-between items-center py-3 px-4 sm:px-8 max-w-7xl mx-auto">
                    <Link href={"/"} className="flex items-center gap-2 sm:gap-4">
                        <Wallet className="text-green-700 h-6 w-6" />
                        <h1 className="font-bold text-lg sm:text-xl">Wallet Finance Tracker</h1>
                    </Link>
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
                        <div>
                            {user ? (
                                <Button variant={'ghost'} onClick={() => router.push("/application/dashboard")}>Go to Dashboard</Button>
                            ) : (
                                <>
                                    <Button variant="ghost" className="font-semibold" onClick={() => router.push('/auth')}>
                                        Log In
                                    </Button>
                                    <Button className="rounded-full px-5 py-2" onClick={() => router.push('/auth')}>Get Started</Button>
                                </>
                            )}
                        </div>
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
            </header >

            {/* Mobile menu */}
            <div className={`fixed inset-y-0 right-0 z-50 w-full bg-white transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out sm:hidden`
            }>
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
                    <Button variant="ghost" className="w-full justify-start text-base font-medium text-gray-900 hover:bg-gray-50 py-2" onClick={() => router.push('/auth')}>
                        Log In
                    </Button>
                    <Button className="w-full mt-4 rounded-full py-2" onClick={() => router.push('/auth')}>Get Started</Button>
                </nav>
            </div >
        </div >
    )
}
