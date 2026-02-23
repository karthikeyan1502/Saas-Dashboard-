// =============================================
// SaaSFlow - Comprehensive Mock Data
// =============================================

export type UserRole = "USER" | "ADMIN";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing";
export type InvoiceStatus = "paid" | "pending" | "overdue" | "draft";
export type PlanTier = "starter" | "pro" | "enterprise";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  lastLogin: string;
  subscription: Subscription;
}

export interface Subscription {
  id: string;
  plan: PlanTier;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  amount: number;
  interval: "monthly" | "yearly";
}

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
  paidAt?: string;
  description: string;
}

export interface UsageData {
  apiCalls: { used: number; limit: number };
  storage: { used: number; limit: number };
  bandwidth: { used: number; limit: number };
  teamMembers: { used: number; limit: number };
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  users: number;
  mrr: number;
}

export interface ActivityItem {
  id: string;
  type: "subscription" | "payment" | "user" | "system";
  message: string;
  timestamp: string;
  icon: string;
}

// =============================================
// Plans
// =============================================

export const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small projects",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "5,000 API calls/month",
      "10 GB storage",
      "2 team members",
      "Email support",
      "Basic analytics",
      "API access",
    ],
    limits: {
      apiCalls: 5000,
      storage: 10,
      bandwidth: 50,
      teamMembers: 2,
    },
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Best for growing teams and businesses",
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      "50,000 API calls/month",
      "100 GB storage",
      "10 team members",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Custom integrations",
      "Webhooks",
    ],
    limits: {
      apiCalls: 50000,
      storage: 100,
      bandwidth: 500,
      teamMembers: 10,
    },
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large-scale organizations",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      "Unlimited API calls",
      "1 TB storage",
      "Unlimited team members",
      "24/7 dedicated support",
      "Advanced analytics",
      "API access",
      "Custom integrations",
      "Webhooks",
      "SLA guarantee",
      "Custom contracts",
    ],
    limits: {
      apiCalls: 999999,
      storage: 1000,
      bandwidth: 5000,
      teamMembers: 999,
    },
    popular: false,
  },
];

// =============================================
// Current User
// =============================================

export const currentUser: User = {
  id: "usr_1",
  name: "Alex Johnson",
  email: "alex@saasflow.io",
  avatar: undefined,
  role: "ADMIN",
  createdAt: "2025-06-15T10:30:00Z",
  lastLogin: "2026-02-22T09:15:00Z",
  subscription: {
    id: "sub_1",
    plan: "pro",
    status: "active",
    currentPeriodStart: "2026-02-01T00:00:00Z",
    currentPeriodEnd: "2026-03-01T00:00:00Z",
    cancelAtPeriodEnd: false,
    amount: 79,
    interval: "monthly",
  },
};

// =============================================
// Usage Data
// =============================================

export const usageData: UsageData = {
  apiCalls: { used: 32450, limit: 50000 },
  storage: { used: 67.3, limit: 100 },
  bandwidth: { used: 234, limit: 500 },
  teamMembers: { used: 7, limit: 10 },
};

// =============================================
// Invoices
// =============================================

export const invoices: Invoice[] = [
  {
    id: "inv_001",
    number: "INV-2026-001",
    amount: 79.0,
    status: "paid",
    date: "2026-02-01T00:00:00Z",
    dueDate: "2026-02-15T00:00:00Z",
    paidAt: "2026-02-01T10:30:00Z",
    description: "Pro Plan - February 2026",
  },
  {
    id: "inv_002",
    number: "INV-2026-002",
    amount: 79.0,
    status: "paid",
    date: "2026-01-01T00:00:00Z",
    dueDate: "2026-01-15T00:00:00Z",
    paidAt: "2026-01-01T09:15:00Z",
    description: "Pro Plan - January 2026",
  },
  {
    id: "inv_003",
    number: "INV-2025-012",
    amount: 79.0,
    status: "paid",
    date: "2025-12-01T00:00:00Z",
    dueDate: "2025-12-15T00:00:00Z",
    paidAt: "2025-12-01T08:45:00Z",
    description: "Pro Plan - December 2025",
  },
  {
    id: "inv_004",
    number: "INV-2025-011",
    amount: 79.0,
    status: "paid",
    date: "2025-11-01T00:00:00Z",
    dueDate: "2025-11-15T00:00:00Z",
    paidAt: "2025-11-02T14:20:00Z",
    description: "Pro Plan - November 2025",
  },
  {
    id: "inv_005",
    number: "INV-2025-010",
    amount: 29.0,
    status: "paid",
    date: "2025-10-01T00:00:00Z",
    dueDate: "2025-10-15T00:00:00Z",
    paidAt: "2025-10-01T11:00:00Z",
    description: "Starter Plan - October 2025",
  },
  {
    id: "inv_006",
    number: "INV-2025-009",
    amount: 29.0,
    status: "paid",
    date: "2025-09-01T00:00:00Z",
    dueDate: "2025-09-15T00:00:00Z",
    paidAt: "2025-09-01T10:30:00Z",
    description: "Starter Plan - September 2025",
  },
];

// =============================================
// Revenue Data (for charts)
// =============================================

export const revenueData: RevenueDataPoint[] = [
  { month: "Mar", revenue: 12400, users: 145, mrr: 12400 },
  { month: "Apr", revenue: 15800, users: 189, mrr: 15800 },
  { month: "May", revenue: 19200, users: 234, mrr: 19200 },
  { month: "Jun", revenue: 23100, users: 287, mrr: 23100 },
  { month: "Jul", revenue: 27500, users: 342, mrr: 27500 },
  { month: "Aug", revenue: 31200, users: 398, mrr: 31200 },
  { month: "Sep", revenue: 35800, users: 456, mrr: 35800 },
  { month: "Oct", revenue: 38900, users: 512, mrr: 38900 },
  { month: "Nov", revenue: 42300, users: 578, mrr: 42300 },
  { month: "Dec", revenue: 45600, users: 634, mrr: 45600 },
  { month: "Jan", revenue: 48200, users: 689, mrr: 48200 },
  { month: "Feb", revenue: 52400, users: 742, mrr: 52400 },
];

// =============================================
// Activity Feed
// =============================================

export const recentActivity: ActivityItem[] = [
  {
    id: "act_1",
    type: "payment",
    message: "Invoice INV-2026-001 was paid successfully",
    timestamp: "2026-02-22T09:30:00Z",
    icon: "CreditCard",
  },
  {
    id: "act_2",
    type: "user",
    message: "New team member Sarah Chen joined",
    timestamp: "2026-02-21T16:45:00Z",
    icon: "UserPlus",
  },
  {
    id: "act_3",
    type: "system",
    message: "API usage reached 65% of monthly limit",
    timestamp: "2026-02-21T14:20:00Z",
    icon: "AlertTriangle",
  },
  {
    id: "act_4",
    type: "subscription",
    message: "Subscription renewed for Pro Plan",
    timestamp: "2026-02-01T00:00:00Z",
    icon: "RefreshCw",
  },
  {
    id: "act_5",
    type: "user",
    message: "Profile settings updated",
    timestamp: "2026-01-28T11:15:00Z",
    icon: "Settings",
  },
  {
    id: "act_6",
    type: "payment",
    message: "Payment method updated to Visa ending 4242",
    timestamp: "2026-01-25T09:00:00Z",
    icon: "CreditCard",
  },
];

// =============================================
// Admin - All Users
// =============================================

export const allUsers: User[] = [
  currentUser,
  {
    id: "usr_2",
    name: "Sarah Chen",
    email: "sarah@techstart.io",
    role: "USER",
    createdAt: "2025-08-20T14:30:00Z",
    lastLogin: "2026-02-22T08:45:00Z",
    subscription: {
      id: "sub_2",
      plan: "pro",
      status: "active",
      currentPeriodStart: "2026-02-01T00:00:00Z",
      currentPeriodEnd: "2026-03-01T00:00:00Z",
      cancelAtPeriodEnd: false,
      amount: 79,
      interval: "monthly",
    },
  },
  {
    id: "usr_3",
    name: "Marcus Williams",
    email: "marcus@designco.com",
    role: "USER",
    createdAt: "2025-09-10T09:00:00Z",
    lastLogin: "2026-02-21T17:30:00Z",
    subscription: {
      id: "sub_3",
      plan: "enterprise",
      status: "active",
      currentPeriodStart: "2026-02-01T00:00:00Z",
      currentPeriodEnd: "2026-03-01T00:00:00Z",
      cancelAtPeriodEnd: false,
      amount: 199,
      interval: "monthly",
    },
  },
  {
    id: "usr_4",
    name: "Emily Rodriguez",
    email: "emily@webagency.io",
    role: "USER",
    createdAt: "2025-10-05T11:20:00Z",
    lastLogin: "2026-02-20T14:10:00Z",
    subscription: {
      id: "sub_4",
      plan: "starter",
      status: "active",
      currentPeriodStart: "2026-02-01T00:00:00Z",
      currentPeriodEnd: "2026-03-01T00:00:00Z",
      cancelAtPeriodEnd: false,
      amount: 29,
      interval: "monthly",
    },
  },
  {
    id: "usr_5",
    name: "James Park",
    email: "james@cloudops.dev",
    role: "USER",
    createdAt: "2025-11-12T08:45:00Z",
    lastLogin: "2026-02-19T10:00:00Z",
    subscription: {
      id: "sub_5",
      plan: "pro",
      status: "past_due",
      currentPeriodStart: "2026-01-15T00:00:00Z",
      currentPeriodEnd: "2026-02-15T00:00:00Z",
      cancelAtPeriodEnd: false,
      amount: 79,
      interval: "monthly",
    },
  },
  {
    id: "usr_6",
    name: "Aisha Patel",
    email: "aisha@startuplab.com",
    role: "USER",
    createdAt: "2025-12-01T13:00:00Z",
    lastLogin: "2026-02-22T07:30:00Z",
    subscription: {
      id: "sub_6",
      plan: "enterprise",
      status: "active",
      currentPeriodStart: "2026-02-01T00:00:00Z",
      currentPeriodEnd: "2026-03-01T00:00:00Z",
      cancelAtPeriodEnd: false,
      amount: 199,
      interval: "yearly",
    },
  },
  {
    id: "usr_7",
    name: "David Kim",
    email: "david@freelance.dev",
    role: "USER",
    createdAt: "2025-12-20T10:15:00Z",
    lastLogin: "2026-02-18T16:45:00Z",
    subscription: {
      id: "sub_7",
      plan: "starter",
      status: "canceled",
      currentPeriodStart: "2026-01-20T00:00:00Z",
      currentPeriodEnd: "2026-02-20T00:00:00Z",
      cancelAtPeriodEnd: true,
      amount: 29,
      interval: "monthly",
    },
  },
  {
    id: "usr_8",
    name: "Olivia Martinez",
    email: "olivia@bigcorp.com",
    role: "USER",
    createdAt: "2026-01-05T09:30:00Z",
    lastLogin: "2026-02-22T11:00:00Z",
    subscription: {
      id: "sub_8",
      plan: "enterprise",
      status: "active",
      currentPeriodStart: "2026-02-05T00:00:00Z",
      currentPeriodEnd: "2026-03-05T00:00:00Z",
      cancelAtPeriodEnd: false,
      amount: 199,
      interval: "monthly",
    },
  },
  {
    id: "usr_9",
    name: "Liam O'Brien",
    email: "liam@indie.app",
    role: "USER",
    createdAt: "2026-01-15T14:00:00Z",
    lastLogin: "2026-02-21T09:20:00Z",
    subscription: {
      id: "sub_9",
      plan: "pro",
      status: "trialing",
      currentPeriodStart: "2026-02-15T00:00:00Z",
      currentPeriodEnd: "2026-03-15T00:00:00Z",
      cancelAtPeriodEnd: false,
      amount: 79,
      interval: "monthly",
    },
  },
  {
    id: "usr_10",
    name: "Nina Yamamoto",
    email: "nina@creative.studio",
    role: "USER",
    createdAt: "2026-02-01T08:00:00Z",
    lastLogin: "2026-02-22T12:30:00Z",
    subscription: {
      id: "sub_10",
      plan: "starter",
      status: "active",
      currentPeriodStart: "2026-02-01T00:00:00Z",
      currentPeriodEnd: "2026-03-01T00:00:00Z",
      cancelAtPeriodEnd: false,
      amount: 29,
      interval: "monthly",
    },
  },
];

// =============================================
// Admin Metrics
// =============================================

export const adminMetrics = {
  totalUsers: 742,
  activeSubscriptions: 698,
  mrr: 52400,
  arr: 628800,
  churnRate: 2.4,
  ltv: 1840,
  avgRevenuePerUser: 70.6,
  newUsersThisMonth: 53,
  conversionRate: 68.5,
  trialConversions: 42,
};

export const subscriptionDistribution = [
  { name: "Starter", value: 312, color: "#6366f1" },
  { name: "Pro", value: 289, color: "#8b5cf6" },
  { name: "Enterprise", value: 97, color: "#a855f7" },
  { name: "Trial", value: 44, color: "#c084fc" },
];

export const dailySignups = [
  { date: "Feb 1", signups: 8 },
  { date: "Feb 3", signups: 12 },
  { date: "Feb 5", signups: 6 },
  { date: "Feb 7", signups: 15 },
  { date: "Feb 9", signups: 9 },
  { date: "Feb 11", signups: 11 },
  { date: "Feb 13", signups: 7 },
  { date: "Feb 15", signups: 14 },
  { date: "Feb 17", signups: 10 },
  { date: "Feb 19", signups: 18 },
  { date: "Feb 21", signups: 13 },
  { date: "Feb 22", signups: 5 },
];

// =============================================
// Usage History (for charts)
// =============================================

export const usageHistory = [
  { date: "Week 1", apiCalls: 6200, storage: 58.1, bandwidth: 45 },
  { date: "Week 2", apiCalls: 8100, storage: 60.5, bandwidth: 62 },
  { date: "Week 3", apiCalls: 9450, storage: 63.8, bandwidth: 71 },
  { date: "Week 4", apiCalls: 8700, storage: 67.3, bandwidth: 56 },
];
