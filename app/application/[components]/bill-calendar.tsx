"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function BillCalendar() {
  const today = new Date()
  const billDates = [
    { date: new Date(today.getFullYear(), today.getMonth(), 5), amount: 150, description: "Electricity Bill" },
    { date: new Date(today.getFullYear(), today.getMonth(), 15), amount: 80, description: "Water Bill" },
    { date: new Date(today.getFullYear(), today.getMonth(), 25), amount: 200, description: "Internet Bill" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Bill Calendar</CardTitle>
          <CardDescription>Upcoming bill due dates</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <Calendar
              mode="single"
              selected={today}
              className="rounded-md border w-full overflow-hidden"
              modifiers={{
                billDue: billDates.map(bill => bill.date),
              }}
              modifiersStyles={{
                billDue: { backgroundColor: "#FFCCCB", color: "#FF0000", fontWeight: "bold" },
              }}
              components={{
                DayContent: ({ date }) => {
                  const billDate = billDates.find(bill => bill.date.getDate() === date.getDate())
                  if (billDate) {
                    return (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-full h-full flex items-center justify-center">
                            {date.getDate()}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{billDate.description}</p>
                          <p>${billDate.amount}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  }
                  return date.getDate()
                }
              }}
            />
          </TooltipProvider>
        </CardContent>
      </Card>
    </motion.div>
  )
}
