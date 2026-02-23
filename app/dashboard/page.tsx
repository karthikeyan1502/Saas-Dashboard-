"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber, formatRelativeTime } from "@/lib/utils";
import { revenueData, recentActivity, usageData, currentUser } from "@/lib/mock-data";
import {
  DollarSign,
  Users,
  Activity,
  HardDrive,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  UserPlus,
  AlertTriangle,
  RefreshCw,
  Settings,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  CreditCard,
  UserPlus,
  AlertTriangle,
  RefreshCw,
  Settings,
};

const stats = [
  {
    title: "Monthly Revenue",
    value: "$52,400",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500/10",
  },
  {
    title: "Active Users",
    value: "742",
    change: "+8.2%",
    trend: "up" as const,
    icon: Users,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "API Calls",
    value: "32.5K",
    change: "+24.1%",
    trend: "up" as const,
    icon: Activity,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Storage Used",
    value: "67.3 GB",
    change: "+3.4%",
    trend: "up" as const,
    icon: HardDrive,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-500/10",
  },
];

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" subtitle="Welcome back, Alex 👋" />
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card
              key={stat.title}
              className="hover-lift cursor-default animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 animate-fade-in delay-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Revenue Overview</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Monthly recurring revenue trend
                </p>
              </div>
              <Badge variant="secondary" className="font-normal">
                <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="month"
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem",
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="animate-fade-in delay-400">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground">Latest events on your account</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item) => {
                  const Icon = iconMap[item.icon] || Activity;
                  return (
                    <div key={item.id} className="flex items-start gap-3 group">
                      <div className="mt-0.5 p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{item.message}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatRelativeTime(item.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-fade-in delay-500">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/pricing">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 hover-lift">
                  <Zap className="h-5 w-5 text-indigo-500" />
                  <span>Upgrade Plan</span>
                </Button>
              </Link>
              <Link href="/dashboard/billing">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 hover-lift">
                  <CreditCard className="h-5 w-5 text-purple-500" />
                  <span>Manage Billing</span>
                </Button>
              </Link>
              <Link href="/dashboard/usage">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 hover-lift">
                  <Activity className="h-5 w-5 text-emerald-500" />
                  <span>View Usage</span>
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 hover-lift">
                  <Settings className="h-5 w-5 text-amber-500" />
                  <span>Settings</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
