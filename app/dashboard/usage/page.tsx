"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { usageData, usageHistory, currentUser, plans } from "@/lib/mock-data";
import { Activity, HardDrive, Wifi, Users, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function UsageMeter({
  label,
  used,
  limit,
  unit,
  icon: Icon,
  color,
}: {
  label: string;
  used: number;
  limit: number;
  unit: string;
  icon: React.ElementType;
  color: string;
}) {
  const percentage = Math.round((used / limit) * 100);
  const isHigh = percentage > 80;

  return (
    <Card className="hover-lift">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${color}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">
                {used.toLocaleString()} / {limit.toLocaleString()} {unit}
              </p>
            </div>
          </div>
          <Badge variant={isHigh ? "warning" : "success"}>
            {percentage}%
          </Badge>
        </div>
        <Progress
          value={percentage}
          className="h-2"
          indicatorClassName={isHigh ? "from-amber-500 to-red-500" : undefined}
        />
        {isHigh && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
            ⚠️ Approaching limit — consider upgrading your plan
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function UsagePage() {
  const plan = plans.find((p) => p.id === currentUser.subscription.plan)!;

  return (
    <>
      <Header title="Usage" subtitle="Monitor your resource consumption" />
      <div className="p-6 space-y-6">
        {/* Usage Meters */}
        <div className="grid gap-4 md:grid-cols-2">
          <UsageMeter
            label="API Calls"
            used={usageData.apiCalls.used}
            limit={usageData.apiCalls.limit}
            unit="calls"
            icon={Activity}
            color="bg-indigo-500"
          />
          <UsageMeter
            label="Storage"
            used={usageData.storage.used}
            limit={usageData.storage.limit}
            unit="GB"
            icon={HardDrive}
            color="bg-purple-500"
          />
          <UsageMeter
            label="Bandwidth"
            used={usageData.bandwidth.used}
            limit={usageData.bandwidth.limit}
            unit="GB"
            icon={Wifi}
            color="bg-emerald-500"
          />
          <UsageMeter
            label="Team Members"
            used={usageData.teamMembers.used}
            limit={usageData.teamMembers.limit}
            unit="members"
            icon={Users}
            color="bg-amber-500"
          />
        </div>

        {/* Usage Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
                API Calls (Weekly)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageHistory}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem",
                      }}
                    />
                    <Bar dataKey="apiCalls" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-purple-500" />
                Storage Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageHistory}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} unit=" GB" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem",
                      }}
                    />
                    <Line type="monotone" dataKey="storage" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
