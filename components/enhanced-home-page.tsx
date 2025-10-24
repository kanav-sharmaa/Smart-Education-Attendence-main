"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, Users, Shield, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

const ParticleBackground = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    const particleCount = 50
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }))
    setParticles(newParticles)

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
          y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
        })),
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null)
  const router = useRouter()

  const portals = [
    {
      id: "student",
      title: "Student Portal",
      description: "Access your courses, assignments, grades, and study materials",
      icon: BookOpen,
      color: "bg-accent hover:bg-accent/90",
      href: "/student",
    },
    {
      id: "teacher",
      title: "Teacher Portal",
      description: "Manage your classes, students, assignments, and academic content",
      icon: Users,
      color: "bg-primary hover:bg-primary/90",
      href: "/teacher",
    },
    {
      id: "admin",
      title: "Admin Portal",
      description: "Oversee institution management, users, and system configuration",
      icon: Shield,
      color: "bg-chart-4 hover:bg-chart-4/90",
      href: "/admin",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />

      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Smart Education</h1>
              <p className="text-sm text-muted-foreground">Advanced Education Management Platform</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">Education Portal</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your portal to get started with Smart Education - your comprehensive education management solution
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portals.map((portal) => {
            const Icon = portal.icon
            return (
              <Card
                key={portal.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 bg-card/95 backdrop-blur"
                onClick={() => setSelectedPortal(portal.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{portal.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{portal.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    className={`w-full ${portal.color} text-white font-medium cursor-pointer hover:cursor-pointer transition-all duration-200`}
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/login?portal=${portal.id}`)
                    }}
                  >
                    Enter {portal.title}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">Platform Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Smart Attendance</h4>
              <p className="text-sm text-muted-foreground">
                Automated attendance tracking with face recognition and QR codes
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Task Management</h4>
              <p className="text-sm text-muted-foreground">Personalized tasks and assignments based on student goals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-chart-4/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-chart-4" />
              </div>
              <h4 className="font-semibold mb-2">Progress Tracking</h4>
              <p className="text-sm text-muted-foreground">Real-time analytics and progress monitoring for all users</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-chart-3/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-chart-3" />
              </div>
              <h4 className="font-semibold mb-2">Smart Scheduling</h4>
              <p className="text-sm text-muted-foreground">
                Intelligent timetable management and free period optimization
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
