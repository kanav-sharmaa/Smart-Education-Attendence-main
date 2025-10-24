"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  Settings,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  X,
  FileText,
  Award,
  TrendingUp,
  Edit,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function TeacherDashboard() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("Dashboard")
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: activeSection === "Dashboard" },
    { icon: Users, label: "My Classes", active: activeSection === "My Classes" },
    { icon: BookOpen, label: "Assignments", active: activeSection === "Assignments" },
    { icon: Calendar, label: "Schedule", active: activeSection === "Schedule" },
    { icon: BarChart3, label: "Analytics", active: activeSection === "Analytics" },
    { icon: Settings, label: "Settings", active: activeSection === "Settings" },
  ]

  const notifications = [
    {
      id: 1,
      title: "Assignment Submissions",
      message: "15 new submissions for Python ML Project",
      time: "30 minutes ago",
      type: "info",
      read: false,
    },
    {
      id: 2,
      title: "Class Reminder",
      message: "Machine Learning class starts in 1 hour",
      time: "1 hour ago",
      type: "urgent",
      read: false,
    },
    {
      id: 3,
      title: "Student Alert",
      message: "John Smith has low attendance (65%)",
      time: "2 hours ago",
      type: "urgent",
      read: true,
    },
    {
      id: 4,
      title: "System Update",
      message: "Grading system has been updated",
      time: "1 day ago",
      type: "success",
      read: true,
    },
  ]

  const searchableData = [
    { type: "class", name: "Machine Learning - CS401", room: "Lab 204", students: 45 },
    { type: "class", name: "Database Systems - CS301", room: "Room 301", students: 38 },
    { type: "class", name: "Software Engineering - CS501", room: "Room 205", students: 52 },
    { type: "assignment", name: "Python ML Project", class: "Machine Learning", submitted: 38, total: 45 },
    { type: "assignment", name: "Database Design", class: "Database Systems", submitted: 32, total: 38 },
    { type: "student", name: "John Smith", class: "Machine Learning", attendance: "65%" },
    { type: "student", name: "Emma Wilson", class: "Database Systems", attendance: "92%" },
  ]

  const todaysClasses = [
    { subject: "Machine Learning - CS401", students: 45, time: "10:00 AM", room: "Lab 204", attendance: 42 },
    { subject: "Database Systems - CS301", students: 38, time: "2:00 PM", room: "Room 301", attendance: 35 },
    { subject: "Software Engineering - CS501", students: 52, time: "4:00 PM", room: "Room 205", attendance: null },
  ]

  const recentAssignments = [
    { title: "Python ML Project", class: "Machine Learning", submitted: 38, total: 45, dueDate: "Today" },
    { title: "Database Design", class: "Database Systems", submitted: 32, total: 38, dueDate: "Tomorrow" },
    { title: "System Architecture", class: "Software Engineering", submitted: 45, total: 52, dueDate: "In 3 days" },
  ]

  const studentAlerts = [
    { name: "John Smith", issue: "Low attendance (65%)", class: "Machine Learning", severity: "high" },
    { name: "Emma Wilson", issue: "Missing assignment", class: "Database Systems", severity: "medium" },
    { name: "Mike Johnson", issue: "Excellent progress", class: "Software Engineering", severity: "positive" },
  ]

  const userInfo = {
    name: "Michael Teacher",
    role: "Professor • Computer Science",
    avatar: "M",
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
        (item.type === "class" && item.room?.toLowerCase().includes(query.toLowerCase())) ||
        (item.type === "student" && item.class?.toLowerCase().includes(query.toLowerCase())),
    )
    setSearchResults(results)
  }

  const renderMyClasses = () => (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Machine Learning - CS401",
            students: 45,
            room: "Lab 204",
            time: "Mon, Wed, Fri 10:00 AM",
            attendance: 94.2,
          },
          {
            name: "Database Systems - CS301",
            students: 38,
            room: "Room 301",
            time: "Tue, Thu 2:00 PM",
            attendance: 89.5,
          },
          {
            name: "Software Engineering - CS501",
            students: 52,
            room: "Room 205",
            time: "Mon, Wed 4:00 PM",
            attendance: 91.8,
          },
        ].map((classItem, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{classItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Students</span>
                  <span className="font-medium">{classItem.students}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Room</span>
                  <span className="font-medium">{classItem.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Schedule</span>
                  <span className="font-medium text-xs">{classItem.time}</span>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Avg Attendance</span>
                    <span className="font-medium">{classItem.attendance}%</span>
                  </div>
                  <Progress value={classItem.attendance} />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Take Attendance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )

  const renderAssignments = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Assignment
        </Button>
      </div>

      <div className="space-y-4">
        {[
          {
            title: "Python ML Project",
            class: "Machine Learning",
            submitted: 38,
            total: 45,
            dueDate: "Today",
            status: "active",
          },
          {
            title: "Database Design",
            class: "Database Systems",
            submitted: 32,
            total: 38,
            dueDate: "Tomorrow",
            status: "active",
          },
          {
            title: "System Architecture",
            class: "Software Engineering",
            submitted: 45,
            total: 52,
            dueDate: "In 3 days",
            status: "active",
          },
          {
            title: "Data Structures Quiz",
            class: "Machine Learning",
            submitted: 45,
            total: 45,
            dueDate: "Completed",
            status: "completed",
          },
        ].map((assignment, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{assignment.title}</h3>
                    <Badge variant={assignment.status === "completed" ? "secondary" : "default"}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{assignment.class}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>
                      Submissions: {assignment.submitted}/{assignment.total}
                    </span>
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <Progress value={(assignment.submitted / assignment.total) * 100} className="mt-3" />
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    View Submissions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
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
                {todaysClasses
                  .filter((_, index) => (dayIndex + index) % 2 === 0)
                  .map((classItem, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <div>
                        <p className="font-medium">{classItem.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {classItem.room} • {classItem.students} students
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{classItem.time}</p>
                        <Badge variant="outline" className="mt-1">
                          Teaching
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderAnalytics = () => (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Performance</p>
                <p className="text-2xl font-bold text-chart-4">87.5%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assignment Completion</p>
                <p className="text-2xl font-bold text-primary">92.3%</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Student Satisfaction</p>
                <p className="text-2xl font-bold text-accent">4.8/5</p>
              </div>
              <Award className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-chart-3">128</p>
              </div>
              <Users className="w-8 h-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { class: "Machine Learning", avgGrade: 87.5, attendance: 94.2, assignments: 12 },
              { class: "Database Systems", avgGrade: 82.3, attendance: 89.5, assignments: 8 },
              { class: "Software Engineering", avgGrade: 91.2, attendance: 91.8, assignments: 10 },
            ].map((classData, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3">{classData.class}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Grade</p>
                    <div className="flex items-center gap-2">
                      <Progress value={classData.avgGrade} className="flex-1" />
                      <span className="text-sm font-medium">{classData.avgGrade}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                    <div className="flex items-center gap-2">
                      <Progress value={classData.attendance} className="flex-1" />
                      <span className="text-sm font-medium">{classData.attendance}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assignments Given</p>
                    <p className="text-xl font-bold">{classData.assignments}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )

  const renderSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Teacher Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Class Notifications</p>
              <p className="text-sm text-muted-foreground">Receive alerts for student submissions and attendance</p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Grading Preferences</p>
              <p className="text-sm text-muted-foreground">Set default grading scales and rubrics</p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Class Management</p>
              <p className="text-sm text-muted-foreground">Configure class settings and student permissions</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Assignment Templates</p>
              <p className="text-sm text-muted-foreground">Create and manage reusable assignment templates</p>
            </div>
            <Button variant="outline" size="sm">
              Create
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "My Classes":
        return renderMyClasses()
      case "Assignments":
        return renderAssignments()
      case "Schedule":
        return renderSchedule()
      case "Analytics":
        return renderAnalytics()
      case "Settings":
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <>
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-primary to-chart-2 text-primary-foreground">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Good morning, Professor! 👨‍🏫</h2>
          <p className="text-primary-foreground/90 text-sm md:text-base">
            You have 3 classes today with 135 total students. 2 assignments need review.
          </p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-lg md:text-2xl font-bold text-primary">135</p>
              </div>
              <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Active Classes</p>
                <p className="text-lg md:text-2xl font-bold text-accent">3</p>
              </div>
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Avg Attendance</p>
                <p className="text-lg md:text-2xl font-bold text-chart-4">92.3%</p>
              </div>
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-lg md:text-2xl font-bold text-chart-3">12</p>
              </div>
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                Today's Classes
              </CardTitle>
              <Button variant="ghost" size="sm">
                View Schedule
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysClasses.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm md:text-base">{classItem.subject}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {classItem.room} • {classItem.students} students
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">{classItem.time}</p>
                  {classItem.attendance !== null ? (
                    <Badge variant="secondary" className="mt-1">
                      {classItem.attendance}/{classItem.students} present
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="mt-1">
                      Upcoming
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                Assignment Status
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm md:text-base">{assignment.title}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{assignment.class}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">
                    {assignment.submitted}/{assignment.total} submitted
                  </p>
                  <p className="text-xs text-muted-foreground">Due {assignment.dueDate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Student Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
            Student Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {studentAlerts.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    alert.severity === "high"
                      ? "bg-destructive"
                      : alert.severity === "medium"
                        ? "bg-chart-3"
                        : "bg-chart-4"
                  }`}
                ></div>
                <div>
                  <p className="font-medium text-sm md:text-base">{alert.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {alert.issue} • {alert.class}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen md:w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground">Smart Education</h1>
              <p className="text-xs text-sidebar-foreground/70">Education Platform</p>
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
                  onClick={() => handleNavigation(item.label)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>

        {/* User Profile */}
        <div className="flex-shrink-0 p-6 border-t border-sidebar-border bg-sidebar">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Michael Teacher</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">Professor • Computer Science</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <MobileSidebar sidebarItems={sidebarItems} userInfo={userInfo} onNavigate={handleNavigation} />
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students, classes, or assignments..."
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
                            {result.room} • {result.students} students
                          </p>
                        )}
                        {result.class && result.submitted && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {result.class} • {result.submitted}/{result.total} submitted
                          </p>
                        )}
                        {result.attendance && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {result.class} • Attendance: {result.attendance}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-primary hover:bg-primary/90 hidden sm:flex">
                <Plus className="w-4 h-4 mr-2" />
                New Assignment
              </Button>
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
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Michael Teacher</p>
                <p className="text-xs text-muted-foreground">Professor</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">{renderContent()}</main>
      </div>
    </div>
  )
}
