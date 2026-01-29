export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  companyName?: string;
  role?: string;
  createdAt?: string;
}

export interface Deal {
  _id: string;
  title: string;
  description: string;
  partnerName: string;
  partnerLogo: string;
  category: string;
  discountValue: string;
  originalPrice?: string;
  isLocked: boolean;
  eligibilityCriteria: string;
  requiredVerification: boolean;
  termsAndConditions?: string;
  validUntil?: string;
  claimLimit?: number;
  currentClaims: number;
  isActive: boolean;
  createdAt: string;
}

export interface Claim {
  _id: string;
  user: string;
  deal: Deal | string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  claimCode?: string;
  notes?: string;
  approvedAt?: string;
  expiresAt?: string;
  createdAt: string;
}
