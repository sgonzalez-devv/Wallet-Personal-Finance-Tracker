"use client";

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import LoginManagementImage from '@/public/imgs/login-management-image.jpg'
import { Wallet } from 'lucide-react'
import Link from 'next/link'
import GoogleIcon from '@/public/googleIcon';
import WelcomePage from '@/components/welcomePage';
import { useAuth } from '@/context/AuthContext';

export default function AuthPage() {
    const { user, login } = useAuth();

    return (
        <div>
            {user ? (
                <>
                    <WelcomePage />
                </>
            ) : (
                <div className="grid grid-cols-2">
                    <div className="flex flex-col items-center gap-12 h-screen pt-8 ps-8">
                        <Link href={"/"} className="w-full flex sm:gap-4">
                            <Wallet className="text-green-700 max-sm:hidden" />
                            <h1 className="font-bold">Wallet Finance Tracker</h1>
                        </Link>
                        <div className="flex items-center justify-center w-[500px]">
                            <div className="flex flex-col gap-3 mt-20">
                                <h1 className="text-xl font-bold italic">Join Wallet</h1>
                                <p className="text-gray-500 text-sm">Create an account to track your personal finance, manage your investment portfolio, build your future with good finance.</p>
                                <Tabs defaultValue="signIn" className="w-[500px]">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="logIn">Log In</TabsTrigger>
                                        <TabsTrigger value="signIn">Sign In</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="logIn">
                                        <Card className="border-0 shadow-none">
                                            <CardContent className="space-y-5 mt-5 ps-0">
                                                <div className="space-y-1">
                                                    <Label htmlFor="name" className="font-medium">Email address</Label>
                                                    <Input id="name" />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="password" className="font-medium">Password</Label>
                                                    <Input id="password" type="password" />
                                                    <p className="text-xs text-green-600"><span className="text-gray-500">At least</span> 8 characters <span className="text-gray-500">total with</span> 1 letter, 1 number, 1 special character</p>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="ps-0 flex-col items-start gap-6">
                                                <Button className="bg-green-700 px-7 py-5">Sign In</Button>
                                                <Button
                                                    className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center"
                                                    variant="outline"
                                                    onClick={login}
                                                >
                                                    <GoogleIcon />
                                                    <span className="ml-3">Log in with Google</span>
                                                </Button>
                                                <p className="text-xs text-gray-500">By proceeding, you confirm that you&apos;ve read, understood, and agree to Wallet&apos;s <span className="text-blue-600">Terms & Conditions</span></p>
                                            </CardFooter>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="signIn">
                                        <Card className="border-0 shadow-none">
                                            <CardContent className="space-y-5 mt-5 ps-0">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <Label htmlFor="name" className="font-medium">First Name</Label>
                                                        <Input id="name" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label htmlFor="lastname" className="font-medium">Last Name</Label>
                                                        <Input id="lastname" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="name" className="font-medium">Email address</Label>
                                                    <Input id="name" />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="password" className="font-medium">Password</Label>
                                                    <Input id="password" type="password" />
                                                    <p className="text-xs text-green-600"><span className="text-gray-500">At least</span> 8 characters <span className="text-gray-500">total with</span> 1 letter, 1 number, 1 special character</p>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="ps-0 flex-col items-start gap-6">
                                                <Button className="bg-green-700 px-7 py-5">Sign In</Button>
                                                <Button
                                                    className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center"
                                                    variant="outline"
                                                    onClick={login}
                                                >
                                                    <GoogleIcon />
                                                    <span className="ml-3">Log in with Google</span>
                                                </Button>
                                                <p className="text-xs text-gray-500">By proceeding, you confirm that you&apos;ve read, understood, and agree to Wallet&apos;s <span className="text-blue-600">Terms & Conditions</span></p>
                                            </CardFooter>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div >

                    <div className="h-screen flex items-center justify-center">
                        <Image className="rounded-3xl" src={LoginManagementImage} alt={"Illustration defining management"} height={900} />
                    </div>
                </div >
            )
            }
        </div >
    )
}
