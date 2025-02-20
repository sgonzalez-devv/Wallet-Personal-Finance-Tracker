"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Rocket, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RestrictedAccessPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden relative bg-black">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 space-y-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Lock className="w-16 h-16 mx-auto text-green-600 mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">Feature Locked</h2>
              <p className="text-xl text-gray-600 mb-6">
                Your current plan doesn't include access to this premium feature. Upgrade your plan to unlock a world of
                advanced financial tools and insights!
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto text-lg py-6"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Go Back
              </Button>
              <Button
                className="w-full sm:w-auto text-lg py-6 bg-green-600 hover:bg-green-700"
                onClick={() => router.replace("/pricing-plans")}
              >
                <Rocket className="mr-2 h-5 w-5" /> Upgrade Plan
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

