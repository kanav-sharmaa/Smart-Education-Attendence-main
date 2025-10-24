"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { useRouter } from "next/navigation"
import { useEffect,useState } from "react"
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
  Shield,
  Database,
  Activity,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  LogOut,
  X,
  Badge,
} from "lucide-react"
import { useTheme } from "next-themes"
export default function HomePage() {
  const [message, setMessage] = useState("");

useEffect(() => {
    fetch("http://127.0.0.1:5000/api/data") // Flask API endpoint
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

export default function AdminDashboard() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("Dashboard")
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: activeSection === "Dashboard" },
    { icon: Users, label: "User Management", active: activeSection === "User Management" },
    { icon: BookOpen, label: "Course Management", active: activeSection === "Course Management" },
    { icon: Calendar, label: "System Schedule", active: activeSection === "System Schedule" },
    { icon: BarChart3, label: "Analytics", active: activeSection === "Analytics" },
    { icon: Database, label: "Data Management", active: activeSection === "Data Management" },
    { icon: Settings, label: "System Settings", active: activeSection === "System Settings" },
  ]

  const notifications = [
    {
      id: 1,
      title: "System Alert",
      message: "High server load detected - 85% CPU usage",
      time: "10 minutes ago",
      type: "urgent",
      read: false,
    },
    {
      id: 2,
      title: "New User Registration",
      message: "Dr. Sarah Wilson registered as teacher",
      time: "2 hours ago",
      type: "info",
      read: false,
    },
    {
      id: 3,
      title: "Backup Completed",
      message: "Daily system backup completed successfully",
      time: "1 day ago",
      type: "success",
      read: true,
    },
    {
      id: 4,
      title: "Maintenance Reminder",
      message: "Scheduled maintenance in 2 days",
      time: "2 days ago",
      type: "info",
      read: true,
    },
  ]

  const searchableData = [
    { type: "user", name: "Dr. Sarah Wilson", role: "Teacher", department: "Computer Science" },
    { type: "user", name: "John Smith", role: "Student", department: "Information Technology" },
    { type: "course", name: "Machine Learning - CS401", instructor: "Dr. Sarah Wilson", students: 45 },
    { type: "course", name: "Database Systems - CS301", instructor: "Prof. Mike Johnson", students: 38 },
    { type: "system", name: "Attendance System", status: "Active", uptime: "99.9%" },
    { type: "system", name: "Grading System", status: "Active", uptime: "98.7%" },
  ]

  const systemStats = [
    { label: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "text-primary" },
    { label: "Active Classes", value: "156", change: "+5%", icon: BookOpen, color: "text-accent" },
    { label: "System Uptime", value: "99.9%", change: "+0.1%", icon: Activity, color: "text-chart-4" },
    { label: "Data Storage", value: "847GB", change: "+8%", icon: Database, color: "text-chart-3" },
  ]

  const recentActivities = [
    { action: "New teacher registered", user: "Dr. Sarah Wilson", time: "2 minutes ago", type: "user" },
    { action: "System backup completed", user: "System", time: "1 hour ago", type: "system" },
    { action: 'Course "AI Ethics" created', user: "Prof. John Doe", time: "3 hours ago", type: "course" },
    { action: "Attendance system updated", user: "Admin", time: "5 hours ago", type: "system" },
  ]

  const systemAlerts = [
    { title: "High server load detected", severity: "high", time: "10 minutes ago" },
    { title: "Scheduled maintenance reminder", severity: "medium", time: "2 hours ago" },
    { title: "Backup completed successfully", severity: "low", time: "1 day ago" },
  ]

  const userBreakdown = [
    { role: "Students", count: 2456, percentage: 86.3, color: "bg-accent" },
    { role: "Teachers", count: 342, percentage: 12.0, color: "bg-primary" },
    { role: "Admins", count: 49, percentage: 1.7, color: "bg-chart-4" },
  ]

  const userInfo = {
    name: "Admin User",
    role: "System Administrator",
    avatar: "A",
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
        (item.type === "user" &&
          (item.role?.toLowerCase().includes(query.toLowerCase()) ||
            item.department?.toLowerCase().includes(query.toLowerCase()))) ||
        (item.type === "course" && item.instructor?.toLowerCase().includes(query.toLowerCase())) ||
        (item.type === "system" && item.status?.toLowerCase().includes(query.toLowerCase())),
    )
    setSearchResults(results)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen md:w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground">Smart Education</h1>
              <p className="text-xs text-sidebar-foreground/70">Education Platform</p>
            </div>
          </div>

          <nav className="space-y-2 overflow-y-auto flex-1">
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
        <div className="mt-auto p-6 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-chart-4 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-chart-4-foreground">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">System Administrator</p>
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
                    placeholder="Search users, courses, or system logs..."
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
                        {result.role && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {result.role} • {result.department}
                          </p>
                        )}
                        {result.instructor && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {result.instructor} • {result.students} students
                          </p>
                        )}
                        {result.status && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            Status: {result.status} • Uptime: {result.uptime}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
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
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {activeSection === "Dashboard" && (
            <>
              {/* Welcome Banner */}
              <Card className="bg-gradient-to-r from-chart-4 to-primary text-primary-foreground">
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">System Overview 🛡️</h2>
                  <p className="text-primary-foreground/90 text-sm md:text-base">
                    Managing 2,847 users across 156 active classes. System running smoothly with 99.9% uptime.
                  </p>
                </CardContent>
              </Card>

              {/* System Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {systemStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <Card key={index}>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs md:text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <p className={`text-lg md:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="text-xs text-chart-4">{stat.change} from last month</p>
                          </div>
                          <Icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* User Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <UserCheck className="w-4 h-4 md:w-5 md:h-5" />
                      User Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userBreakdown.map((user, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{user.role}</span>
                          <span className="text-sm text-muted-foreground">{user.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${user.color}`}
                            style={{ width: `${user.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* System Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemAlerts.map((alert, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            alert.severity === "high"
                              ? "bg-destructive"
                              : alert.severity === "medium"
                                ? "bg-chart-3"
                                : "bg-chart-4"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.title}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <Activity className="w-4 h-4 md:w-5 md:h-5" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === "user"
                              ? "bg-accent/20"
                              : activity.type === "course"
                                ? "bg-primary/20"
                                : "bg-chart-4/20"
                          }`}
                        >
                          {activity.type === "user" ? (
                            <Users className="w-4 h-4 text-accent" />
                          ) : activity.type === "course" ? (
                            <BookOpen className="w-4 h-4 text-primary" />
                          ) : (
                            <Shield className="w-4 h-4 text-chart-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>System performance and usage statistics for the current month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-xl md:text-2xl font-bold text-accent">98.7%</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Average Attendance Rate</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-xl md:text-2xl font-bold text-primary">1.2s</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Average Response Time</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-xl md:text-2xl font-bold text-chart-4">847</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Daily Active Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "User Management" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">User Management</h2>
                  <p className="text-muted-foreground">Manage students, teachers, and administrators</p>
                </div>
                <Button className="w-full sm:w-auto">Add New User</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Dr. Sarah Wilson",
                    role: "Teacher",
                    department: "Computer Science",
                    status: "Active",
                    courses: 3,
                  },
                  {
                    name: "John Smith",
                    role: "Student",
                    department: "Information Technology",
                    status: "Active",
                    gpa: "3.8",
                  },
                  {
                    name: "Prof. Mike Johnson",
                    role: "Teacher",
                    department: "Mathematics",
                    status: "Active",
                    courses: 2,
                  },
                  {
                    name: "Emily Davis",
                    role: "Student",
                    department: "Computer Science",
                    status: "Inactive",
                    gpa: "3.6",
                  },
                  {
                    name: "Admin User",
                    role: "Administrator",
                    department: "System",
                    status: "Active",
                    permissions: "Full",
                  },
                  { name: "Lisa Brown", role: "Student", department: "Physics", status: "Active", gpa: "3.9" },
                ].map((user, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{user.name}</h3>
                            <p className="text-xs text-muted-foreground">{user.role}</p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "Active" ? "bg-chart-4/20 text-chart-4" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <p>
                          <span className="text-muted-foreground">Department:</span> {user.department}
                        </p>
                        {user.courses && (
                          <p>
                            <span className="text-muted-foreground">Courses:</span> {user.courses}
                          </p>
                        )}
                        {user.gpa && (
                          <p>
                            <span className="text-muted-foreground">GPA:</span> {user.gpa}
                          </p>
                        )}
                        {user.permissions && (
                          <p>
                            <span className="text-muted-foreground">Access:</span> {user.permissions}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeSection === "Course Management" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Course Management</h2>
                  <p className="text-muted-foreground">Oversee all courses and academic programs</p>
                </div>
                <Button className="w-full sm:w-auto">Create New Course</Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                  {
                    name: "Machine Learning - CS401",
                    instructor: "Dr. Sarah Wilson",
                    students: 45,
                    room: "Lab 204",
                    schedule: "Mon, Wed, Fri 10:00 AM",
                    attendance: 94.2,
                  },
                  {
                    name: "Database Systems - CS301",
                    instructor: "Prof. Mike Johnson",
                    students: 38,
                    room: "Room 301",
                    schedule: "Tue, Thu 2:00 PM",
                    attendance: 89.5,
                  },
                  {
                    name: "Software Engineering - CS501",
                    instructor: "Dr. Sarah Wilson",
                    students: 52,
                    room: "Room 205",
                    schedule: "Mon, Wed 4:00 PM",
                    attendance: 91.8,
                  },
                  {
                    name: "Data Structures - CS201",
                    instructor: "Prof. John Doe",
                    students: 67,
                    room: "Room 102",
                    schedule: "Tue, Thu 10:00 AM",
                    attendance: 87.3,
                  },
                  {
                    name: "Web Development - CS401",
                    instructor: "Dr. Lisa Chen",
                    students: 41,
                    room: "Lab 301",
                    schedule: "Mon, Wed 2:00 PM",
                    attendance: 93.1,
                  },
                  {
                    name: "Computer Networks - CS402",
                    instructor: "Prof. Mike Johnson",
                    students: 35,
                    room: "Room 204",
                    schedule: "Tue, Thu 4:00 PM",
                    attendance: 88.7,
                  },
                ].map((course, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-sm mb-1">{course.name}</h3>
                          <p className="text-xs text-muted-foreground">{course.instructor}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="text-muted-foreground">Students</p>
                            <p className="font-medium text-lg">{course.students}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Room</p>
                            <p className="font-medium">{course.room}</p>
                          </div>
                        </div>

                        <div className="text-xs">
                          <p className="text-muted-foreground">Schedule</p>
                          <p className="font-medium">{course.schedule}</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted-foreground">Avg Attendance</span>
                            <span className="text-xs font-medium">{course.attendance}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 bg-primary rounded-full transition-all`}
                              style={{ width: `${course.attendance}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                          <Button size="sm" className="flex-1 text-xs whitespace-nowrap">
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs bg-transparent whitespace-nowrap"
                          >
                            <span className="hidden sm:inline">Take Attendance</span>
                            <span className="sm:hidden">Attendance</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeSection === "System Schedule" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">System Schedule</h2>
                  <p className="text-muted-foreground">Manage institution-wide scheduling and events</p>
                </div>
                <Button className="w-full sm:w-auto">Add Event</Button>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                        (day, index) => (
                          <div key={day} className="space-y-2">
                            <h4 className="font-medium text-sm text-center p-2 bg-muted rounded">{day}</h4>
                            <div className="space-y-1">
                              {index < 5 ? (
                                <>
                                  <div className="p-2 bg-primary/10 rounded text-xs">
                                    <p className="font-medium">CS401 - 10:00 AM</p>
                                    <p className="text-muted-foreground">Lab 204</p>
                                  </div>
                                  <div className="p-2 bg-accent/10 rounded text-xs">
                                    <p className="font-medium">CS301 - 2:00 PM</p>
                                    <p className="text-muted-foreground">Room 301</p>
                                  </div>
                                </>
                              ) : (
                                <div className="p-2 text-center text-xs text-muted-foreground">No classes</div>
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { event: "Faculty Meeting", date: "Tomorrow", time: "2:00 PM", location: "Conference Room A" },
                        { event: "Student Orientation", date: "Dec 15", time: "10:00 AM", location: "Main Auditorium" },
                        { event: "System Maintenance", date: "Dec 20", time: "12:00 AM", location: "Server Room" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                          <Calendar className="w-4 h-4 text-primary" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.event}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.date} at {item.time} • {item.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Resource Utilization</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { resource: "Classrooms", used: 24, total: 30, percentage: 80 },
                        { resource: "Labs", used: 8, total: 10, percentage: 80 },
                        { resource: "Auditoriums", used: 1, total: 3, percentage: 33 },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.resource}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.used}/{item.total}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 bg-primary rounded-full`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {activeSection === "Analytics" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                  <p className="text-muted-foreground">Comprehensive system analytics and insights</p>
                </div>
                <Button className="w-full sm:w-auto">Export Report</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Total Enrollment", value: "2,847", change: "+12%", trend: "up" },
                  { title: "Course Completion", value: "94.2%", change: "+2.1%", trend: "up" },
                  { title: "System Uptime", value: "99.9%", change: "+0.1%", trend: "up" },
                  { title: "User Satisfaction", value: "4.8/5", change: "+0.2", trend: "up" },
                ].map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{metric.title}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <p className="text-xs text-chart-4 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {metric.change} from last month
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Department Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { dept: "Computer Science", students: 1245, performance: 92, color: "bg-primary" },
                      { dept: "Mathematics", students: 867, performance: 89, color: "bg-accent" },
                      { dept: "Physics", students: 543, performance: 91, color: "bg-chart-4" },
                      { dept: "Information Technology", students: 192, performance: 87, color: "bg-chart-3" },
                    ].map((dept, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{dept.dept}</span>
                          <span className="text-sm text-muted-foreground">{dept.students} students</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${dept.color}`}
                              style={{ width: `${dept.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{dept.performance}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">System Usage Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-muted/50 rounded">
                        <p className="text-lg font-bold text-primary">847</p>
                        <p className="text-xs text-muted-foreground">Daily Active Users</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded">
                        <p className="text-lg font-bold text-accent">156</p>
                        <p className="text-xs text-muted-foreground">Active Sessions</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded">
                        <p className="text-lg font-bold text-chart-4">1.2s</p>
                        <p className="text-xs text-muted-foreground">Avg Response</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeSection === "Data Management" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Data Management</h2>
                  <p className="text-muted-foreground">Manage system data, backups, and storage</p>
                </div>
                <Button className="w-full sm:w-auto">Run Backup</Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Storage Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">847 GB</p>
                      <p className="text-sm text-muted-foreground">Total Used</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { type: "User Data", size: "423 GB", percentage: 50, color: "bg-primary" },
                        { type: "Course Content", size: "254 GB", percentage: 30, color: "bg-accent" },
                        { type: "System Files", size: "170 GB", percentage: 20, color: "bg-chart-4" },
                      ].map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.type}</span>
                            <span className="text-muted-foreground">{item.size}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Backup Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Daily Backup", status: "Completed", time: "2 hours ago", size: "12.4 GB" },
                      { name: "Weekly Backup", status: "Completed", time: "2 days ago", size: "89.2 GB" },
                      { name: "Monthly Backup", status: "Scheduled", time: "In 5 days", size: "~350 GB" },
                    ].map((backup, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            backup.status === "Completed" ? "bg-chart-4" : "bg-chart-3"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{backup.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {backup.status} • {backup.time}
                          </p>
                          <p className="text-xs text-muted-foreground">{backup.size}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Data Operations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                      <Database className="w-4 h-4 mr-2" />
                      Export User Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Export Course Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Generate Analytics Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Audit Log
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeSection === "System Settings" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">System Settings</h2>
                  <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
                </div>
                <Button className="w-full sm:w-auto">Save Changes</Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Institution Name</label>
                      <Input defaultValue="Smart Education Platform" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Academic Year</label>
                      <Input defaultValue="2024-2025" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time Zone</label>
                      <Input defaultValue="UTC-5 (Eastern Time)" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Language</label>
                      <Input defaultValue="English (US)" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Require 2FA for all admin accounts</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Session Timeout</p>
                        <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                      </div>
                      <Input className="w-20" defaultValue="30" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Password Policy</p>
                        <p className="text-xs text-muted-foreground">Minimum password requirements</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Email Notifications</p>
                        <p className="text-xs text-muted-foreground">System alerts via email</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">SMS Alerts</p>
                        <p className="text-xs text-muted-foreground">Critical system alerts</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Maintenance Notifications</p>
                        <p className="text-xs text-muted-foreground">Scheduled maintenance alerts</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">System Maintenance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                      <Activity className="w-4 h-4 mr-2" />
                      System Health Check
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                      <Database className="w-4 h-4 mr-2" />
                      Database Optimization
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Scan
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Performance Analysis
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
