"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginManagementImage from "@/public/imgs/login-management-image.jpg"
import { Wallet } from "lucide-react"
import Link from "next/link"
import GoogleIcon from "@/public/googleIcon"
import { useAuth } from "@/context/AuthContext"
import WelcomePage from "@/components/welcomePage"

export default function AuthPage() {
  const { user, userData, loginWithGoogle, loginWithEmail, signUpWithEmail } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    if (user && userData) {
      setShowWelcome(true)
    }
  }, [user, userData])

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password, name)
      setShowWelcome(true)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password)
      setShowWelcome(true)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      setShowWelcome(true)
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (showWelcome) {
    return <WelcomePage />
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex flex-col items-center gap-8 lg:gap-12 w-full lg:w-1/2 p-4 lg:p-8">
        <Link href={"/"} className="w-full flex items-center gap-2 lg:gap-4">
          <Wallet className="text-green-700" />
          <h1 className="font-bold text-lg lg:text-xl">Wallet Finance Tracker</h1>
        </Link>
        <div className="flex items-center justify-center w-full max-w-[500px]">
          <div className="flex flex-col gap-3 mt-8 lg:mt-20 w-full">
            <h1 className="text-xl lg:text-2xl font-bold italic">Join Wallet</h1>
            <p className="text-gray-500 text-sm">
              Create an account to track your personal finance, manage your investment portfolio, build your future with
              good finance.
            </p>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Tabs defaultValue="logIn" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="logIn">Log In</TabsTrigger>
                <TabsTrigger value="signIn">Sign In</TabsTrigger>
              </TabsList>
              <TabsContent value="logIn">
                <Card className="border-0 shadow-none">
                  <CardContent className="space-y-5 mt-5 ps-0">
                    <div className="space-y-1">
                      <Label htmlFor="email" className="font-medium">
                        Email address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="password" className="font-medium">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-green-600">
                        <span className="text-gray-500">At least</span> 8 characters{" "}
                        <span className="text-gray-500">total with</span> 1 letter, 1 number, 1 special character
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="ps-0 flex-col items-start gap-6">
                    <Button onClick={handleLogin} className="bg-green-700 px-7 py-5 w-full">
                      Log In
                    </Button>
                    <Button
                      className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center"
                      variant="outline"
                      onClick={handleGoogleLogin}
                      type="button"
                    >
                      <GoogleIcon />
                      <span className="ml-3">Log in with Google</span>
                    </Button>
                    <p className="text-xs text-gray-500">
                      By proceeding, you confirm that you've read, understood, and agree to Wallet's{" "}
                      <span className="text-blue-600">Terms & Conditions</span>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="signIn">
                <Card className="border-0 shadow-none">
                  <CardContent className="space-y-5 mt-5 ps-0">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="font-medium">
                        Full Name
                      </Label>
                      <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email" className="font-medium">
                        Email address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="password" className="font-medium">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-green-600">
                        <span className="text-gray-500">At least</span> 8 characters{" "}
                        <span className="text-gray-500">total with</span> 1 letter, 1 number, 1 special character
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="ps-0 flex-col items-start gap-6">
                    <Button onClick={handleSignUp} className="bg-green-700 px-7 py-5 w-full">
                      Sign In
                    </Button>
                    <Button
                      className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center"
                      variant="outline"
                      onClick={handleGoogleLogin}
                      type="button"
                    >
                      <GoogleIcon />
                      <span className="ml-3">Sign in with Google</span>
                    </Button>
                    <p className="text-xs text-gray-500">
                      By proceeding, you confirm that you've read, understood, and agree to Wallet's{" "}
                      <span className="text-blue-600">Terms & Conditions</span>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 p-4">
        <Image
          className="rounded-3xl object-cover"
          src={LoginManagementImage || "/placeholder.svg"}
          alt={"Illustration defining management"}
          layout="responsive"
          width={900}
          height={900}
        />
      </div>
    </div>
  )
}

