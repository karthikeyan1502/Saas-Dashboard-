"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { invoices } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FileText, Download, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const statusConfig = {
  paid: { label: "Paid", variant: "success" as const, icon: CheckCircle2 },
  pending: { label: "Pending", variant: "warning" as const, icon: Clock },
  overdue: { label: "Overdue", variant: "destructive" as const, icon: AlertCircle },
  draft: { label: "Draft", variant: "secondary" as const, icon: FileText },
};

export default function InvoicesPage() {
  return (
    <>
      <Header title="Invoices" subtitle="View and download your invoices" />
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice History
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </CardHeader>
          <CardContent>
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-3 bg-muted/50 rounded-lg text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              <span>Invoice</span>
              <span>Description</span>
              <span>Date</span>
              <span>Amount</span>
              <span className="text-right">Status</span>
            </div>

            {/* Invoice Rows */}
            <div className="space-y-2">
              {invoices.map((invoice, i) => {
                const status = statusConfig[invoice.status];
                return (
                  <div
                    key={invoice.id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 items-center p-4 rounded-xl hover:bg-muted/30 transition-colors group animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                        <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className="font-medium text-sm">{invoice.number}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {invoice.description}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(invoice.date)}
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(invoice.amount)}
                    </span>
                    <div className="flex items-center justify-between md:justify-end gap-2">
                      <Badge variant={status.variant}>
                        <status.icon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
