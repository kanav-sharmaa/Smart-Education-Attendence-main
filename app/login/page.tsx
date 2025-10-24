"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Mail, Lock, Eye, EyeOff, Sun, Moon, ArrowLeft, UserPlus } from "lucide-react"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const { theme, setTheme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCreateAccount, setIsCreateAccount] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const portal = searchParams.get("portal") || "student"

  const portalConfig = {
    student: {
      title: isCreateAccount ? "Create Student Account" : "Student Portal Login",
      description: isCreateAccount
        ? "Join Smart Education as a student"
        : "Access your courses, assignments, and academic progress",
      redirectPath: "/student",
    },
    teacher: {
      title: isCreateAccount ? "Create Teacher Account" : "Teacher Portal Login",
      description: isCreateAccount
        ? "Join Smart Education as a teacher"
        : "Manage your classes, students, and academic content",
      redirectPath: "/teacher",
    },
    admin: {
      title: isCreateAccount ? "Create Admin Account" : "Admin Portal Login",
      description: isCreateAccount
        ? "Join Smart Education as an administrator"
        : "Oversee institution management and system configuration",
      redirectPath: "/admin",
    },
  }

  const currentPortal = portalConfig[portal as keyof typeof portalConfig] || portalConfig.student

  const demoAccounts = [
    {
      role: "Student",
      email: "sarah.student@edu.com",
      color: "bg-accent hover:bg-accent/90",
      portal: "student",
    },
    {
      role: "Teacher",
      email: "michael.teacher@edu.com",
      color: "bg-primary hover:bg-primary/90",
      portal: "teacher",
    },
    {
      role: "Administrator",
      email: "admin@edu.com",
      color: "bg-chart-4 hover:bg-chart-4/90",
      portal: "admin",
    },
  ]

  const filteredDemoAccounts = demoAccounts.filter((account) => account.portal === portal)

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (isCreateAccount) {
      if (password !== confirmPassword) {
        alert("Passwords don't match!")
        setIsLoading(false)
        return
      }
      alert("Account created successfully! Please sign in.")
      setIsCreateAccount(false)
      setFullName("")
      setConfirmPassword("")
    } else {
      const validEmails = demoAccounts.map((acc) => acc.email)
      if (validEmails.includes(email) && password === "demo123") {
        const account = demoAccounts.find((acc) => acc.email === email)
        const targetPortal = account?.portal || portal
        router.push(`/${targetPortal}`)
      } else if (email && password) {
        router.push(currentPortal.redirectPath)
      }
    }

    setIsLoading(false)
  }

  const handleDemoLogin = async (demoEmail: string, accountPortal: string) => {
    setEmail(demoEmail)
    setPassword("demo123")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push(`/${accountPortal}`)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 bg-transparent"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 left-4 bg-transparent"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Back to portal selection</span>
      </Button>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Smart Education</h1>
          <p className="text-muted-foreground">Advanced Education Management Platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{currentPortal.title}</CardTitle>
            <CardDescription>{currentPortal.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {isCreateAccount && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {isCreateAccount && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading
                  ? isCreateAccount
                    ? "Creating Account..."
                    : "Signing In..."
                  : isCreateAccount
                    ? "Create Account"
                    : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="link"
                className="text-sm text-muted-foreground hover:text-primary"
                onClick={() => {
                  setIsCreateAccount(!isCreateAccount)
                  setFullName("")
                  setConfirmPassword("")
                }}
              >
                {isCreateAccount ? (
                  <>Already have an account? Sign in</>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Don't have an account? Create one
                  </>
                )}
              </Button>
            </div>

            {!isCreateAccount && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Try the demo with these accounts</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {filteredDemoAccounts.map((account) => (
                    <div
                      key={account.role}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => handleDemoLogin(account.email, account.portal)}
                    >
                      <div>
                        <p className="font-medium text-sm">{account.role}</p>
                        <p className="text-xs text-muted-foreground">{account.email}</p>
                      </div>
                      <Button size="sm" className={account.color} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Click to use"}
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
