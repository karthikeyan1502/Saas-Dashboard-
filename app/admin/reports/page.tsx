"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminMetrics, revenueData, dailySignups } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  Download,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";

export default function AdminReportsPage() {
  return (
    <>
      <Header title="Reports" subtitle="Business intelligence and analytics" />
      <div className="p-6 space-y-6">
        {/* Export Actions */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" /> Export PDF
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" /> Date Range
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                  <DollarSign className="h-5 w-5 text-indigo-500" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Annual Run Rate</span>
              </div>
              <p className="text-3xl font-bold">{formatCurrency(adminMetrics.arr)}</p>
              <p className="text-sm text-emerald-600 mt-1">+12.5% YoY</p>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Avg Revenue / User</span>
              </div>
              <p className="text-3xl font-bold">{formatCurrency(adminMetrics.avgRevenuePerUser)}</p>
              <p className="text-sm text-emerald-600 mt-1">+$4.20 vs last month</p>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Customer LTV</span>
              </div>
              <p className="text-3xl font-bold">{formatCurrency(adminMetrics.ltv)}</p>
              <p className="text-sm text-emerald-600 mt-1">+$120 vs last quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Report */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              Revenue Report
            </CardTitle>
            <Badge variant="secondary">Last 12 months</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="reportRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} formatter={(value: number) => [formatCurrency(value), "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#reportRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Growth + Signups */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
                    <Line type="monotone" dataKey="users" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Signups (Feb)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySignups}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
                    <Bar dataKey="signups" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
