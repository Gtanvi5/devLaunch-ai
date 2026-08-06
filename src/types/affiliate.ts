export interface Referral {
  user: string;
  plan: string;
  status: 'Active' | 'Pending' | 'Churned';
  date: string;
  amount: string;
}

export interface AffiliateProps {
  affiliateCode: string;
  payoutPending: number;
  referrals: Referral[];
  chartData: { date: string; clicks: number; signups: number }[];
}