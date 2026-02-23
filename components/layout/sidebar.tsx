"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { currentUser, plans } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Settings,
  FileText,
  Activity,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/usage", label: "Usage", icon: Activity },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const adminItems = [
  { href: "/admin", label: "Admin Dashboard", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: Shield },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: Zap },
  { href: "/admin/reports", label: "Reports", icon: FileText },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const currentPlan = plans.find((p) => p.id === currentUser.subscription.plan);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-full flex-col border-r bg-card/50 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">SaaSFlow</span>
          </Link>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary mx-auto">
            <Zap className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <div className={cn("mb-2", !collapsed && "px-2")}>
          {!collapsed && (
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Dashboard
            </p>
          )}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {currentUser.role === "ADMIN" && (
          <div className={cn("mt-4 pt-4 border-t", !collapsed && "px-2")}>
            {!collapsed && (
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Admin
              </p>
            )}
            {adminItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-purple-500/10 text-purple-500"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-purple-500")} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Plan Info */}
      {!collapsed && currentPlan && (
        <div className="border-t p-4">
          <div className="rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Current Plan</span>
              <Badge variant="secondary" className="text-xs capitalize">
                {currentPlan.name}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>API Calls</span>
                <span>64%</span>
              </div>
              <Progress value={64} className="h-1.5" />
            </div>
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="w-full mt-2 text-xs text-primary hover:text-primary">
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* User */}
      <div className="border-t p-3">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
            </div>
          )}
          {!collapsed && (
            <Link href="/login">
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md hover:bg-accent transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  );
}
