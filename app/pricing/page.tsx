"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { plans } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Check, Zap, ArrowLeft } from "lucide-react";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">SaaSFlow</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5">
            <Zap className="h-3.5 w-3.5 mr-1" /> Simple, transparent pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose your perfect plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free. Scale as you grow. No hidden fees, no surprises.
            Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch checked={annual} onCheckedChange={setAnnual} />
            <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual
            </span>
            {annual && (
              <Badge variant="success" className="ml-1 animate-scale-in">
                Save 17%
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const price = annual ? plan.yearlyPrice : plan.monthlyPrice;
            const isPopular = plan.popular;

            return (
              <Card
                key={plan.id}
                className={`relative animate-fade-in-up hover-lift ${
                  isPopular
                    ? "gradient-border shadow-xl shadow-indigo-500/10 scale-105 z-10"
                    : ""
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-primary text-white px-4 py-1 shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pt-8 pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        {formatCurrency(price)}
                      </span>
                      <span className="text-muted-foreground">
                        /{annual ? "year" : "month"}
                      </span>
                    </div>
                    {annual && (
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                        {formatCurrency(plan.monthlyPrice * 12 - plan.yearlyPrice)} saved annually
                      </p>
                    )}
                  </div>

                  <Button
                    variant={isPopular ? "gradient" : "outline"}
                    className="w-full h-12 text-base"
                    onClick={() => window.location.href = "/dashboard"}
                  >
                    {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>

                  <div className="space-y-3 pt-4 border-t">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 shrink-0">
                          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
