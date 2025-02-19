"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"


export default function CallToBook() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-700" >
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
        </section >
    )
}
