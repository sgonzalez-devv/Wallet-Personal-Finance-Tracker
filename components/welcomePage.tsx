"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LogOut, LayoutDashboard } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

const WelcomePage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const { logout, userData } = useAuth();
    const router = useRouter()

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div className="min-h-screen overflow-hidden relative bg-black">
            <motion.div
                className="absolute inset-0 bg-green-500"
                initial={{ clipPath: "circle(0% at bottom left)" }}
                animate={{ clipPath: isLoaded ? "circle(150% at bottom left)" : "circle(0% at bottom left)" }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <motion.h1
                    className="text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Wallet Finance Tracker
                </motion.h1>
                <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl">
                    <CardContent className="p-8 space-y-6">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-2">Welcome, {userData?.name}!</h2>
                        </motion.div>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <Button className="w-full sm:w-auto text-lg py-6" onClick={() => router.push("/dashboard")}>
                                <LayoutDashboard className="mr-2 h-5 w-5" /> Go to Dashboard
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto text-lg py-6"
                                onClick={() => logout()}
                            >
                                <LogOut className="mr-2 h-5 w-5" /> Log Out
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default WelcomePage