"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  { id: 1, date: "2023-06-01", description: "Grocery Store", amount: -120.5 },
  { id: 2, date: "2023-06-02", description: "Salary Deposit", amount: 3000.0 },
  { id: 3, date: "2023-06-03", description: "Electric Bill", amount: -85.2 },
  { id: 4, date: "2023-06-04", description: "Online Shopping", amount: -65.99 },
  { id: 5, date: "2023-06-05", description: "Restaurant", amount: -45.0 },
]

export default function TransactionHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={`text-right ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}

