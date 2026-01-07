export interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number; // APR
  minPayment: number;
}

export enum Strategy {
  SNOWBALL = 'SNOWBALL', // Lowest balance first
  AVALANCHE = 'AVALANCHE', // Highest interest rate first
}

export interface MonthlyData {
  month: number;
  date: string; // ISO string or formatted date
  totalBalance: number;
  totalInterestPaid: number;
  debts: { [debtId: string]: number }; // Balance of each debt at this month
}

export interface PayoffResult {
  strategy: Strategy;
  totalInterest: number;
  monthsToPayoff: number;
  payoffDate: Date;
  monthlyData: MonthlyData[];
  error?: string; // e.g., if min payments don't cover interest
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string; // Visual summary for blog list
  metaDescription: string; // SEO description for meta tag
  content: string; // HTML string for simplicity in this demo
  category: string;
  date: string;
  keywords: string[];
}