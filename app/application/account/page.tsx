"use client"

import { ArrowRight, Edit, Eye, LogOut, Receipt, Settings, User } from "lucide-react"
import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"

interface MenuItemProps {
  icon: React.ReactNode
  title: string
  description?: string
  badge?: string
  onClick?: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, description, badge, onClick }) => {
  return (
    <motion.div className="group flex items-center gap-4 cursor-pointer" whileHover={{ x: 4 }} onClick={onClick}>
      <motion.div
        className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground"
        whileHover={{ scale: 1.05, backgroundColor: "var(--primary)" }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <div className="flex justify-between border-b border-b-muted w-full py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{title}</h3>
            {badge && (
              <Badge variant="outline" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <motion.div
          className="text-muted-foreground"
          whileHover={{ x: 4, color: "var(--primary)" }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function AccountPage() {
    const { user, plan, logout } = useAuth();

    const splitNameIntoInitials = (fullName: string) => {
        var parts = fullName.split(' ');
        var initials = ''
        for(let i = 0; i < parts.length; i++) {
            if(parts[i].length > 0 && parts[i] !== '') {
                initials += parts[i][0]
            }
        }    
        return initials
    }

  return (
    <div className="container mx-auto py-10 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Account Settings</CardTitle>
            </div>
            <CardDescription>Manage your account settings and preferences</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Profile Section */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-lg bg-muted/50"
              whileHover={{ backgroundColor: "var(--muted)" }}
            >
              <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                <AvatarFallback className="text-2xl">{splitNameIntoInitials(user?.displayName ? user?.displayName : "EU")}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left space-y-2">
                <h1 className="text-2xl font-bold">{user?.displayName}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge variant="secondary">{plan?.toUpperCase()} Plan</Badge>
                  <Badge variant="outline">Member since 2023</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="ml-auto hidden sm:flex">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </motion.div>

            {/* Account Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-muted-foreground tracking-wider">ACCOUNT</h2>
                <Separator className="flex-1 ml-4" />
              </div>

              <MenuItem
                icon={<User className="h-5 w-5" />}
                title="Profile Information"
                description="Update your personal details"
              />

              <MenuItem
                icon={<Receipt className="h-5 w-5" />}
                title="Billing & Payment"
                description="Manage your subscription and payment methods"
                badge={plan?.toUpperCase()}
              />
            </div>

            {/* Settings Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-muted-foreground tracking-wider">SETTINGS</h2>
                <Separator className="flex-1 ml-4" />
              </div>

              <MenuItem
                icon={<Settings className="h-5 w-5" />}
                title="Account Settings"
                description="Manage your account preferences"
              />

              <MenuItem
                icon={<Eye className="h-5 w-5" />}
                title="Privacy & Security"
                description="Change password and security settings"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
            <Button size="sm">Save Changes</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

