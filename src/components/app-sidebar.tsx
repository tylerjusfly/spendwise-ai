"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  PieChart,
  Target,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Income",
    url: "/income",
    icon: Wallet,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: Receipt,
  },
  {
    title: "Budgets",
    url: "/budgets",
    icon: PieChart,
  },
  {
    title: "Savings Goals",
    url: "/savings",
    icon: Target,
  },
  {
    title: "AI Analysis",
    url: "/analysis",
    icon: Sparkles,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary group-data-[collapsible=icon]:hidden">
            SpendWise AI
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-data-[collapsible=icon]:hidden">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="h-11 px-4 transition-all hover:bg-secondary"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                      {pathname === item.url && (
                        <ChevronRight className="ml-auto h-4 w-4 text-primary group-data-[collapsible=icon]:hidden" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}