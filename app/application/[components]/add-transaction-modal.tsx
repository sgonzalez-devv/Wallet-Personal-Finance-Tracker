"use client"

import type React from "react"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Transaction {
    id: string;
    date: Date;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
    description: string;
    merchant: string;
}
//TO DO: Move this to another component and make it global accessible
type TransactionType = "income" | "expense"

type TransactionCategory =
    | "food"
    | "shopping"
    | "utilities"
    | "transport"
    | "housing"
    | "entertainment"
    | "salary"
    | "investment"
    | "other"

interface AddTransactionModalProps {
    isOpen: boolean
    onClose: () => void
    onAddTransaction: (transaction: Omit<Transaction, "id">) => void
};

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onAddTransaction }) => {
    const [transactionType, setTransactionType] = useState<TransactionType>('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<TransactionCategory>('other');
    const [description, setDescription] = useState("");
    const [merchant, setMerchant] = useState("");
    const [date, setDate] = useState<Date>(new Date());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTransaction: Omit<Transaction, "id"> = {
            date,
            amount: Number.parseFloat(amount),
            type: transactionType,
            category,
            description,
            merchant
        }
        onAddTransaction(newTransaction);
        onClose()
        resetForm();
    }

    //TO DO: Fix this form formatting use a form handler tool like zod
    const resetForm = () => {
        setTransactionType("expense");
        setAmount("")
        setCategory("other")
        setDescription("")
        setMerchant("")
        setDate(new Date())
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Transaction</DialogTitle>
                            <DialogDescription>Enter the details of your new transaction here.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="transaction-type">Transaction Type</Label>
                                    <RadioGroup
                                        id="transaction-type"
                                        value={transactionType}
                                        onValueChange={(value) => setTransactionType(value as TransactionType)}
                                        className="flex space-x-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="expense" id="expense" />
                                            <Label htmlFor="expense">Expense</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="income" id="income" />
                                            <Label htmlFor="income">Income</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={category} onValueChange={(value) => setCategory(value as TransactionCategory)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="food">Food</SelectItem>
                                            <SelectItem value="shopping">Shopping</SelectItem>
                                            <SelectItem value="utilities">Utilities</SelectItem>
                                            <SelectItem value="transport">Transport</SelectItem>
                                            <SelectItem value="housing">Housing</SelectItem>
                                            <SelectItem value="entertainment">Entertainment</SelectItem>
                                            <SelectItem value="salary">Salary</SelectItem>
                                            <SelectItem value="investment">Investment</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="merchant">Merchant</Label>
                                    <Input
                                        id="merchant"
                                        placeholder="Enter merchant name"
                                        value={merchant}
                                        onChange={(e) => setMerchant(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                                            >
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={(newDate) => newDate && setDate(newDate)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add Transaction</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    )
}