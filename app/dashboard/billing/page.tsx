"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { currentUser, plans, invoices } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const plan = plans.find((p) => p.id === currentUser.subscription.plan)!;
  const recentInvoices = invoices.slice(0, 3);

  return (
    <>
      <Header title="Billing" subtitle="Manage your subscription and payments" />
      <div className="p-6 space-y-6">
        {/* Current Plan */}
        <Card className="gradient-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{plan.name} Plan</h2>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {formatCurrency(plan.monthlyPrice)}/month • Renews on Mar 1, 2026
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/pricing">
                  <Button variant="gradient">
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </Link>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Plan Features */}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {plan.features.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-sm">
                  VISA
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2027</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Update Payment Method
              </Button>
            </CardContent>
          </Card>

          {/* Billing Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Billing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{currentUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Billing Cycle</p>
                  <p className="font-medium capitalize">{currentUser.subscription.interval}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Payment</p>
                  <p className="font-medium">Mar 1, 2026</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Edit Billing Info
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Invoices</CardTitle>
            <Link href="/dashboard/invoices">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{invoice.number}</p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(invoice.amount)}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(invoice.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
