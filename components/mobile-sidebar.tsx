"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, GraduationCap, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface MobileSidebarProps {
  sidebarItems: Array<{
    icon: any
    label: string
    active: boolean
    href?: string
  }>
  userInfo: {
    name: string
    role: string
    avatar: string
  }
  onNavigate?: (section: string) => void
}

export function MobileSidebar({ sidebarItems, userInfo, onNavigate }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    setOpen(false)
    router.push("/")
  }

  const handleNavigation = (section: string) => {
    setOpen(false)
    if (onNavigate) {
      onNavigate(section)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden bg-transparent">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold">Smart Education</h1>
              <p className="text-xs text-muted-foreground">Education Platform</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.label}
                  variant={item.active ? "default" : "ghost"}
                  className="w-full justify-start cursor-pointer hover:cursor-pointer"
                  onClick={() => handleNavigation(item.label)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">{userInfo.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userInfo.name}</p>
              <p className="text-xs text-muted-foreground truncate">{userInfo.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start cursor-pointer hover:cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
