"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { allUsers, subscriptionDistribution, adminMetrics } from "@/lib/mock-data";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Zap, Filter, Download } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const statusVariant = {
  active: "success" as const,
  past_due: "warning" as const,
  canceled: "destructive" as const,
  trialing: "info" as const,
};

export default function AdminSubscriptionsPage() {
  return (
    <>
      <Header title="Subscriptions" subtitle="Monitor and manage all subscriptions" />
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Active", value: adminMetrics.activeSubscriptions, color: "text-emerald-500" },
            { label: "Trials", value: 44, color: "text-blue-500" },
            { label: "Past Due", value: 12, color: "text-amber-500" },
            { label: "Canceled", value: 32, color: "text-red-500" },
          ].map((item) => (
            <Card key={item.label} className="hover-lift">
              <CardContent className="p-6 text-center">
                <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plan Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={subscriptionDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {subscriptionDistribution.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {subscriptionDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscriptions Table */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">All Subscriptions</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Filter</Button>
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {allUsers.map((user, i) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Badge variant="secondary" className="capitalize text-xs">{user.subscription.plan}</Badge>
                    <Badge variant={statusVariant[user.subscription.status]} className="capitalize text-xs">
                      {user.subscription.status.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground hidden md:block">
                      {formatCurrency(user.subscription.amount)}/mo
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
