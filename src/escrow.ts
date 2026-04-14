import { ApiClient } from "./client";
import type {
  CreateEscrowRequest,
  DisputeRequest,
  EscrowTransaction,
  FundEscrowRequest,
} from "./types";

export class EscrowApi {
  constructor(private readonly client: ApiClient) {}

  createTransaction(data: CreateEscrowRequest): Promise<EscrowTransaction> {
    return this.client.post<EscrowTransaction>("/escrow", data);
  }

  getTransaction(id: string): Promise<EscrowTransaction> {
    return this.client.get<EscrowTransaction>(`/escrow/${id}`);
  }

  getMyTransactions(params?: {
    page?: number;
    limit?: number;
    status?: string;
    role?: "buyer" | "seller";
  }): Promise<{
    transactions: EscrowTransaction[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    return this.client.get("/escrow/my-transactions", { params });
  }

  fundTransaction(
    id: string,
    data: FundEscrowRequest,
  ): Promise<{ status: string; checkoutUrl?: string; walletAddress?: string; network?: string }> {
    return this.client.post(`/escrow/${id}/fund`, data);
  }

  releaseTransaction(id: string): Promise<EscrowTransaction> {
    return this.client.post<EscrowTransaction>(`/escrow/${id}/release`, {});
  }

  cancelTransaction(id: string, reason?: string): Promise<EscrowTransaction> {
    return this.client.post<EscrowTransaction>(`/escrow/${id}/cancel`, { reason });
  }

  raiseDispute(
    id: string,
    data: DisputeRequest,
  ): Promise<{ disputeId: string; status: string; message: string }> {
    return this.client.post(`/escrow/${id}/dispute`, data);
  }
}

