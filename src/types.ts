export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export interface TokenStore {
  getAccessToken(): string | null;
  getRefreshToken?(): string | null;
  setTokens?(tokens: AuthTokens): void;
  clearTokens?(): void;
}

export interface ApiErrorPayload {
  message?: string;
  statusCode?: number;
  error?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  isKycVerified: boolean;
  trustScore: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface CreateEscrowRequest {
  sellerId?: string;
  sellerEmail?: string;
  amount: number;
  currency: string;
  description: string;
  deliveryDays?: number;
  milestones?: Array<{
    description: string;
    amount: number;
    dueDate?: string;
  }>;
}

export interface EscrowMilestone {
  id: string;
  description: string;
  amount: number;
  status: string;
  completedAt?: string;
}

export interface EscrowTransaction {
  id: string;
  transactionNumber: string;
  status: "PENDING" | "FUNDED" | "HELD" | "RELEASED" | "CANCELLED" | "DISPUTED";
  amount: number;
  currency: string;
  fee: number;
  netAmount: number;
  description: string;
  buyerId: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  fundedAt?: string;
  releasedAt?: string;
  milestones: EscrowMilestone[];
}

export interface FundEscrowRequest {
  paymentMethod: "paystack" | "stripe" | "crypto";
  paymentReference?: string;
}

export interface DisputeRequest {
  reason: string;
  description: string;
  evidence?: string[];
}

export interface InitializePaymentRequest {
  amount: number;
  currency: string;
  email: string;
  metadata?: Record<string, unknown>;
}

export interface InitializePaymentResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface PaymentVerificationResponse {
  status: string;
  message: string;
  data: {
    id: number;
    status: string;
    reference: string;
    amount: number;
    currency: string;
    paid_at: string;
    channel: string;
    metadata: Record<string, unknown>;
  };
}

export interface CryptoDepositRequest {
  currency: "USDT" | "USDC";
  network: "TRC20" | "ERC20" | "BEP20";
  amount: number;
}

export interface CryptoDepositResponse {
  depositId: string;
  walletAddress: string;
  network: string;
  currency: string;
  expectedAmount: number;
  expiresAt: string;
}

export interface ConversionRate {
  USDT: number;
  USDC: number;
  timestamp: string;
}

export interface ConversionRequest {
  amount: number;
  fromCurrency: "USDT" | "USDC";
}

export interface ConversionResponse {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  fee: number;
  netAmount: number;
  timestamp: string;
}

export interface TrustScore {
  overall: number;
  level: string;
  badge: string;
  identity: number;
  transactionHistory: number;
  verification: number;
  accountAge: number;
  disputeResolution: number;
}

export interface ProfileStats {
  asBuyer: number;
  asSeller: number;
  totalVolume: number;
}

export interface PublicProfile {
  username: string;
  displayName: string;
  trustScore: TrustScore;
  stats: ProfileStats;
  isVerified: boolean;
  isBusinessAccount: boolean;
  bio?: string;
  avatarUrl?: string;
  joinedAt: string;
}

export interface ProfilePaymentRequest {
  amount: number;
  currency: "NGN" | "USD" | "USDT" | "USDC";
  description?: string;
  payerEmail: string;
  payerName: string;
  paymentMethod: "card" | "crypto";
}

export interface ProfilePaymentResponse {
  transactionId: string;
  status: string;
  checkoutUrl?: string;
  walletAddress?: string;
  network?: string;
  amount: number;
  currency: string;
  recipient: string;
}

export interface PeeplxClientOptions {
  baseUrl: string;
  getAccessToken?: () => string | null;
  tokenStore?: TokenStore;
  fetchFn?: typeof fetch;
}
