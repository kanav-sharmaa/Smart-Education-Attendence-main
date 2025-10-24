"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, Users, Shield, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { width, height } = canvas

      if (theme === "dark") {
        time += 0.005

        // Create animated gradient mesh
        const gradient1 = ctx.createRadialGradient(
          width * 0.2 + Math.sin(time) * 100,
          height * 0.3 + Math.cos(time * 0.8) * 80,
          0,
          width * 0.2 + Math.sin(time) * 100,
          height * 0.3 + Math.cos(time * 0.8) * 80,
          width * 0.6,
        )

        const gradient2 = ctx.createRadialGradient(
          width * 0.8 + Math.cos(time * 1.2) * 120,
          height * 0.7 + Math.sin(time * 0.6) * 100,
          0,
          width * 0.8 + Math.cos(time * 1.2) * 120,
          height * 0.7 + Math.sin(time * 0.6) * 100,
          width * 0.5,
        )

        const gradient3 = ctx.createRadialGradient(
          width * 0.5 + Math.sin(time * 0.7) * 80,
          height * 0.1 + Math.cos(time * 1.1) * 60,
          0,
          width * 0.5 + Math.sin(time * 0.7) * 80,
          height * 0.1 + Math.cos(time * 1.1) * 60,
          width * 0.4,
        )

        gradient1.addColorStop(0, "rgba(59, 130, 246, 0.15)")
        gradient1.addColorStop(0.5, "rgba(147, 51, 234, 0.08)")
        gradient1.addColorStop(1, "rgba(59, 130, 246, 0)")

        gradient2.addColorStop(0, "rgba(236, 72, 153, 0.12)")
        gradient2.addColorStop(0.5, "rgba(59, 130, 246, 0.06)")
        gradient2.addColorStop(1, "rgba(236, 72, 153, 0)")

        gradient3.addColorStop(0, "rgba(34, 197, 94, 0.1)")
        gradient3.addColorStop(0.5, "rgba(59, 130, 246, 0.05)")
        gradient3.addColorStop(1, "rgba(34, 197, 94, 0)")

        // Draw animated blobs
        ctx.fillStyle = gradient1
        ctx.fillRect(0, 0, width, height)

        ctx.globalCompositeOperation = "screen"
        ctx.fillStyle = gradient2
        ctx.fillRect(0, 0, width, height)

        ctx.fillStyle = gradient3
        ctx.fillRect(0, 0, width, height)

        ctx.globalCompositeOperation = "source-over"

        // Add floating geometric shapes
        const shapes = 8
        for (let i = 0; i < shapes; i++) {
          const x = (width / shapes) * i + Math.sin(time + i) * 50
          const y = height * 0.5 + Math.cos(time * 0.8 + i) * 100
          const size = 20 + Math.sin(time + i * 2) * 10
          const rotation = time + i * 0.5

          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(rotation)

          ctx.fillStyle = `rgba(59, 130, 246, ${0.1 + Math.sin(time + i) * 0.05})`
          ctx.fillRect(-size / 2, -size / 2, size, size)
          ctx.restore()
        }
      } else {
        time += 0.002

        // Create subtle grid pattern
        const gridSize = 60
        const offsetX = (time * 20) % gridSize
        const offsetY = (time * 15) % gridSize

        ctx.strokeStyle = "rgba(59, 130, 246, 0.08)"
        ctx.lineWidth = 1

        // Draw animated grid
        for (let x = -gridSize + offsetX; x < width + gridSize; x += gridSize) {
          for (let y = -gridSize + offsetY; y < height + gridSize; y += gridSize) {
            const opacity = 0.05 + Math.sin(time + x * 0.01 + y * 0.01) * 0.03
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`

            ctx.beginPath()
            ctx.rect(x, y, gridSize, gridSize)
            ctx.stroke()
          }
        }

        // Add floating hexagons
        const hexagons = 12
        for (let i = 0; i < hexagons; i++) {
          const x = (width / 4) * (i % 4) + width * 0.125 + Math.sin(time * 0.5 + i) * 30
          const y = (height / 3) * Math.floor(i / 4) + height * 0.2 + Math.cos(time * 0.3 + i) * 20
          const size = 15 + Math.sin(time + i * 1.5) * 5
          const rotation = time * 0.5 + i * 0.8

          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(rotation)

          // Draw hexagon
          ctx.beginPath()
          for (let j = 0; j < 6; j++) {
            const angle = (j * Math.PI) / 3
            const hx = Math.cos(angle) * size
            const hy = Math.sin(angle) * size
            if (j === 0) ctx.moveTo(hx, hy)
            else ctx.lineTo(hx, hy)
          }
          ctx.closePath()

          const opacity = 0.1 + Math.sin(time + i) * 0.05
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
          ctx.fill()

          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 2})`
          ctx.lineWidth = 1
          ctx.stroke()

          ctx.restore()
        }

        // Add subtle wave pattern
        ctx.beginPath()
        ctx.moveTo(0, height * 0.7)

        for (let x = 0; x <= width; x += 10) {
          const y = height * 0.7 + Math.sin((x + time * 50) * 0.01) * 20 + Math.cos((x + time * 30) * 0.005) * 10
          ctx.lineTo(x, y)
        }

        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        const waveGradient = ctx.createLinearGradient(0, height * 0.7, 0, height)
        waveGradient.addColorStop(0, "rgba(59, 130, 246, 0.03)")
        waveGradient.addColorStop(1, "rgba(59, 130, 246, 0.01)")
        ctx.fillStyle = waveGradient
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg ring-1 ring-primary/20">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Smart Education</h1>
              <p className="text-sm text-muted-foreground">Advanced Education Management Platform</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 pt-24 relative z-10">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/25">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Education Portal</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose your portal to get started with Smart Education - your comprehensive education management solution
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portals.map((portal) => {
            const Icon = portal.icon
            return (
              <Card
                key={portal.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/30 bg-card/90 backdrop-blur-sm hover:bg-card/95"
                onClick={() => setSelectedPortal(portal.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-balance">{portal.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-pretty">
                    {portal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    className={`w-full ${portal.color} text-white font-medium cursor-pointer hover:cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl`}
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

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12 text-balance">Platform Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Smart Attendance</h4>
              <p className="text-sm text-muted-foreground text-pretty">
                Automated attendance tracking with face recognition and QR codes
              </p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Task Management</h4>
              <p className="text-sm text-muted-foreground text-pretty">
                Personalized tasks and assignments based on student goals
              </p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-chart-4/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-chart-4/20 transition-colors duration-300">
                <Shield className="w-6 h-6 text-chart-4" />
              </div>
              <h4 className="font-semibold mb-2">Progress Tracking</h4>
              <p className="text-sm text-muted-foreground text-pretty">
                Real-time analytics and progress monitoring for all users
              </p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-chart-3/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-chart-3/20 transition-colors duration-300">
                <GraduationCap className="w-6 h-6 text-chart-3" />
              </div>
              <h4 className="font-semibold mb-2">Smart Scheduling</h4>
              <p className="text-sm text-muted-foreground text-pretty">
                Intelligent timetable management and free period optimization
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
