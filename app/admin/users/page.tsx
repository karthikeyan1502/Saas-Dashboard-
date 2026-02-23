"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { allUsers } from "@/lib/mock-data";
import { formatDate, getInitials } from "@/lib/utils";
import { Search, MoreHorizontal, UserPlus, Filter } from "lucide-react";

const statusVariant = {
  active: "success" as const,
  past_due: "warning" as const,
  canceled: "destructive" as const,
  trialing: "info" as const,
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const filtered = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header title="User Management" subtitle="View and manage all users" />
      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button variant="gradient" size="sm">
              <UserPlus className="h-4 w-4 mr-2" /> Add User
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 bg-muted/50 border-b text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="col-span-2">User</span>
              <span>Plan</span>
              <span>Status</span>
              <span>Joined</span>
              <span className="text-right">Actions</span>
            </div>

            {/* User Rows */}
            <div className="divide-y">
              {filtered.map((user, i) => (
                <div
                  key={user.id}
                  className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 items-center px-6 py-4 hover:bg-muted/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="col-span-2 flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <Badge variant="secondary" className="capitalize">
                      {user.subscription.plan}
                    </Badge>
                  </div>
                  <div>
                    <Badge variant={statusVariant[user.subscription.status]} className="capitalize">
                      {user.subscription.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="px-6 py-12 text-center text-muted-foreground">
                No users found matching &ldquo;{search}&rdquo;
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
