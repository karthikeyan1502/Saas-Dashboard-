"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  Zap,
  BarChart3,
  CreditCard,
  Shield,
  ArrowRight,
  Check,
  Users,
  Globe,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track MRR, churn, and growth metrics with beautiful, interactive dashboards.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: CreditCard,
    title: "Automated Billing",
    description: "Seamless Stripe integration for subscriptions, invoices, and payment processing.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security with role-based access, 2FA, and data encryption.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Complete user lifecycle from signup to subscription management and support.",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Globe,
    title: "White-label Ready",
    description: "Fully customizable branding, themes, and domain configuration out of the box.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Sparkles,
    title: "Developer Friendly",
    description: "Built with Next.js 14, TypeScript, and modern tooling for rapid development.",
    color: "from-cyan-500 to-cyan-600",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SaaSFlow</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="gradient" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-purple-500/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30 animate-float" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Now in Public Beta
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            The Complete
            <br />
            <span className="gradient-text">SaaS Platform</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-100">
            Everything you need to launch, manage, and scale your subscription business.
            From billing to analytics, we&apos;ve got you covered.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
            <Link href="/register">
              <Button variant="gradient" size="lg" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8">
                View Demo
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground animate-fade-in-up delay-300">
            {["No credit card required", "14-day free trial", "Cancel anytime"].map(
              (item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>{item}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "742+", label: "Active Users" },
              { value: "$52K", label: "Monthly Revenue" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "4.9/5", label: "Customer Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete toolkit for building and managing your subscription business,
              from day one to scale.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-primary opacity-90" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float" />
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float delay-300" />
            </div>
            <div className="relative px-8 py-16 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of teams building on SaaSFlow. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 text-lg px-8">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold gradient-text">SaaSFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 SaaSFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
