"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  GraduationCap,
  Search,
  Bell,
  Sun,
  Moon,
  Home,
  Calendar,
  CheckCircle,
  Target,
  TrendingUp,
  Settings,
  BookOpen,
  Clock,
  LogOut,
  Camera,
  QrCode,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function StudentDashboard() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("Dashboard")
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: activeSection === "Dashboard" },
    { icon: CheckCircle, label: "Attendance", active: activeSection === "Attendance" },
    { icon: Calendar, label: "Schedule", active: activeSection === "Schedule" },
    { icon: BookOpen, label: "Personal Tasks", active: activeSection === "Personal Tasks" },
    { icon: Target, label: "Goals", active: activeSection === "Goals" },
    { icon: TrendingUp, label: "Progress", active: activeSection === "Progress" },
    { icon: Settings, label: "Settings", active: activeSection === "Settings" },
  ]

  const notifications = [
    {
      id: 1,
      title: "Assignment Due Soon",
      message: "Python Assignment due in 2 hours",
      time: "2 hours ago",
      type: "urgent",
      read: false,
    },
    {
      id: 2,
      title: "Class Reminder",
      message: "Machine Learning class starts in 30 minutes",
      time: "30 minutes ago",
      type: "info",
      read: false,
    },
    {
      id: 3,
      title: "Grade Updated",
      message: "Database Systems quiz grade: 92%",
      time: "1 day ago",
      type: "success",
      read: true,
    },
    {
      id: 4,
      title: "New Material Available",
      message: "Software Engineering lecture notes uploaded",
      time: "2 days ago",
      type: "info",
      read: true,
    },
  ]

  const searchableData = [
    { type: "class", name: "Machine Learning", room: "Lab 204", time: "10:00 AM" },
    { type: "class", name: "Database Systems", room: "Room 301", time: "2:00 PM" },
    { type: "class", name: "Software Engineering", room: "Room 205", time: "4:00 PM" },
    { type: "task", name: "Complete Python Assignment", due: "Due in 2 hours" },
    { type: "task", name: "Review Machine Learning Notes", due: "Due in 1 day" },
    { type: "task", name: "Career Development Workshop", due: "Due in 3 days" },
    { type: "student", name: "Sarah Johnson", course: "Computer Science" },
    { type: "student", name: "John Smith", course: "Information Technology" },
    { type: "student", name: "Emily Davis", course: "Computer Science" },
  ]

  const todaysClasses = [
    { subject: "Machine Learning", room: "Lab 204", time: "10:00 AM", status: "upcoming" },
    { subject: "Database Systems", room: "Room 301", time: "2:00 PM", status: "upcoming" },
    { subject: "Software Engineering", room: "Room 205", time: "4:00 PM", status: "upcoming" },
  ]

  const suggestedTasks = [
    { title: "Complete Python Assignment", due: "Due in 2 hours", priority: "high" },
    { title: "Review Machine Learning Notes", due: "Due in 1 day", priority: "medium" },
    { title: "Career Development Workshop", due: "Due in 3 days", priority: "low" },
  ]

  const userInfo = {
    name: "Sarah Johnson",
    role: "Student • Computer Science",
    avatar: "S",
  }

  const handleLogout = () => {
    router.push("/")
  }

  const handleNavigation = (section: string) => {
    setActiveSection(section)
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  const markNotificationAsRead = (id: number) => {
    // In a real app, this would update the backend
    console.log(`Marking notification ${id} as read`)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
      return
    }

    const results = searchableData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item.type === "class" &&
          (item.room?.toLowerCase().includes(query.toLowerCase()) ||
            item.time?.toLowerCase().includes(query.toLowerCase()))) ||
        (item.type === "student" && item.course?.toLowerCase().includes(query.toLowerCase())),
    )
    setSearchResults(results)
  }

  const attendanceData = {
    totalClasses: 45,
    attended: 42,
    percentage: 93.3,
    thisWeek: [
      { day: "Mon", status: "present", subject: "Machine Learning" },
      { day: "Tue", status: "present", subject: "Database Systems" },
      { day: "Wed", status: "absent", subject: "Software Engineering" },
      { day: "Thu", status: "present", subject: "Web Development" },
      { day: "Fri", status: "present", subject: "Data Structures" },
    ],
  }

  const [isScanning, setIsScanning] = useState(false)
  const [scanType, setScanType] = useState<"face" | "qr" | null>(null)

  const handleFaceDetection = () => {
    setIsScanning(true)
    setScanType("face")
    setTimeout(() => {
      setIsScanning(false)
      setScanType(null)
      alert("Attendance marked successfully via Face Recognition!")
    }, 3000)
  }

  const handleQRScan = () => {
    setIsScanning(true)
    setScanType("qr")
    setTimeout(() => {
      setIsScanning(false)
      setScanType(null)
      alert("Attendance marked successfully via QR Code!")
    }, 2000)
  }

  const renderDashboard = () => (
    <>
      <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-balance">Good morning, Sarah! ☀️</h2>
          <p className="text-primary-foreground/90 text-sm md:text-base text-pretty">
            You have 3 classes today and 2 pending tasks. Let's make it productive!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground truncate">Attendance Rate</p>
                <p className="text-2xl font-bold text-chart-4">94.2%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-chart-4 flex-shrink-0" />
            </div>
            <Progress value={94.2} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground truncate">Tasks Completed</p>
                <p className="text-2xl font-bold text-accent">12</p>
                <p className="text-xs text-muted-foreground truncate">+3 from yesterday</p>
              </div>
              <BookOpen className="w-8 h-8 text-accent flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground truncate">Goal Progress</p>
                <p className="text-2xl font-bold text-primary">67%</p>
              </div>
              <Target className="w-8 h-8 text-primary flex-shrink-0" />
            </div>
            <Progress value={67} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground truncate">Study Hours (Week)</p>
                <p className="text-2xl font-bold text-chart-3">24.5h</p>
                <p className="text-xs text-muted-foreground truncate">Target: 30h</p>
              </div>
              <Clock className="w-8 h-8 text-chart-3 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Classes
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysClasses.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{classItem.subject}</p>
                  <p className="text-sm text-muted-foreground">{classItem.room}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{classItem.time}</p>
                  <div className="w-2 h-2 bg-chart-4 rounded-full ml-auto mt-1"></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Suggested Tasks
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-destructive"
                        : task.priority === "medium"
                          ? "bg-chart-3"
                          : "bg-chart-4"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.due}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Start
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>This Week's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendanceData.thisWeek.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${day.status === "present" ? "bg-chart-4" : "bg-destructive"}`}
                  ></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{day.day}</p>
                    <p className="text-sm text-muted-foreground truncate">{day.subject}</p>
                  </div>
                </div>
                <Badge variant={day.status === "present" ? "default" : "destructive"} className="flex-shrink-0">
                  {day.status === "present" ? "Present" : "Absent"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )

  const renderAttendance = () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Attendance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-chart-4">{attendanceData.percentage}%</p>
              <p className="text-sm text-muted-foreground">Overall Attendance</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{attendanceData.attended}</p>
              <p className="text-sm text-muted-foreground">Classes Attended</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{attendanceData.totalClasses}</p>
              <p className="text-sm text-muted-foreground">Total Classes</p>
            </div>
          </div>
          <Progress value={attendanceData.percentage} className="mt-4" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Mark Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              onClick={handleFaceDetection}
              disabled={isScanning}
              className="h-24 flex flex-col gap-2 bg-transparent"
              variant="outline"
            >
              <Camera className="w-8 h-8" />
              <span>{isScanning && scanType === "face" ? "Scanning Face..." : "Face Recognition"}</span>
            </Button>
            <Button
              onClick={handleQRScan}
              disabled={isScanning}
              className="h-24 flex flex-col gap-2 bg-transparent"
              variant="outline"
            >
              <QrCode className="w-8 h-8" />
              <span>{isScanning && scanType === "qr" ? "Scanning QR..." : "QR Code Scan"}</span>
            </Button>
          </div>
          {isScanning && (
            <div className="mt-4 p-4 bg-muted rounded-lg text-center">
              <div className="animate-pulse">
                {scanType === "face"
                  ? "📷 Position your face in front of the camera..."
                  : "📱 Point camera at QR code..."}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>This Week's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendanceData.thisWeek.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${day.status === "present" ? "bg-chart-4" : "bg-destructive"}`}
                  ></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{day.day}</p>
                    <p className="text-sm text-muted-foreground truncate">{day.subject}</p>
                  </div>
                </div>
                <Badge variant={day.status === "present" ? "default" : "destructive"} className="flex-shrink-0">
                  {day.status === "present" ? "Present" : "Absent"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )

  const renderSchedule = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Weekly Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, dayIndex) => (
            <div key={day} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">{day}</h3>
              <div className="space-y-2">
                {todaysClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div>
                      <p className="font-medium">{classItem.subject}</p>
                      <p className="text-sm text-muted-foreground">{classItem.room}</p>
                    </div>
                    <p className="text-sm font-medium">{classItem.time}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderPersonalTasks = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Personal Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestedTasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    task.priority === "high"
                      ? "bg-destructive"
                      : task.priority === "medium"
                        ? "bg-chart-3"
                        : "bg-chart-4"
                  }`}
                ></div>
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.due}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm">Complete</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderGoals = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Academic Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Maintain 95% Attendance</h3>
              <Badge>In Progress</Badge>
            </div>
            <Progress value={94.2} className="mb-2" />
            <p className="text-sm text-muted-foreground">Current: 94.2% | Target: 95%</p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Complete Python Certification</h3>
              <Badge variant="secondary">67%</Badge>
            </div>
            <Progress value={67} className="mb-2" />
            <p className="text-sm text-muted-foreground">8 of 12 modules completed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderProgress = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Academic Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Subject Performance</h3>
            <div className="space-y-3">
              {["Machine Learning", "Database Systems", "Software Engineering"].map((subject, index) => (
                <div key={subject} className="flex items-center justify-between">
                  <span className="text-sm">{subject}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={85 + index * 5} className="w-24" />
                    <span className="text-sm font-medium">{85 + index * 5}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-muted-foreground">Receive assignment reminders</p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Privacy</p>
              <p className="text-sm text-muted-foreground">Manage your data preferences</p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Account</p>
              <p className="text-sm text-muted-foreground">Update profile information</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "Attendance":
        return renderAttendance()
      case "Schedule":
        return renderSchedule()
      case "Personal Tasks":
        return renderPersonalTasks()
      case "Goals":
        return renderGoals()
      case "Progress":
        return renderProgress()
      case "Settings":
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:flex w-64 bg-sidebar border-r border-sidebar-border flex-col h-screen fixed left-0 top-0 z-40">
        <div className="p-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-bold text-sidebar-foreground truncate">Smart Education</h1>
              <p className="text-xs text-sidebar-foreground/70 truncate">Education Platform</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.label}
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start transition-colors cursor-pointer hover:cursor-pointer ${
                    item.active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  title={item.label}
                  onClick={() => handleNavigation(item.label)}
                >
                  <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              )
            })}
          </nav>
        </div>

        <div className="flex-shrink-0 p-6 border-t border-sidebar-border bg-sidebar">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-accent-foreground">S</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Sarah Johnson</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">Student • Computer Science</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer hover:cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-3 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <MobileSidebar sidebarItems={sidebarItems} userInfo={userInfo} onNavigate={handleNavigation} />
              <div className="flex-1 max-w-md relative">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students, classes, or tasks..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {result.type}
                          </Badge>
                          <span className="font-medium truncate">{result.name}</span>
                        </div>
                        {result.room && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {result.room} • {result.time}
                          </p>
                        )}
                        {result.due && <p className="text-xs text-muted-foreground mt-1 truncate">{result.due}</p>}
                        {result.course && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">{result.course}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <Button variant="outline" size="icon" onClick={handleNotificationClick}>
                  <Bell className="h-4 w-4" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </Button>

                {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border last:border-b-0 cursor-pointer hover:bg-muted ${!notification.read ? "bg-muted/50" : ""}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                notification.type === "urgent"
                                  ? "bg-destructive"
                                  : notification.type === "success"
                                    ? "bg-chart-4"
                                    : "bg-accent"
                              }`}
                            ></div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{notification.title}</p>
                              <p className="text-sm text-muted-foreground mt-1 text-pretty">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <div className="text-right hidden sm:block min-w-0">
                <p className="text-sm font-medium truncate">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground truncate">Student</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 space-y-6 min-w-0">{renderContent()}</main>
      </div>
    </div>
  )
}
