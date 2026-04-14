import { ApiClient } from "./client";
import type {
  ConversionRate,
  ConversionRequest,
  ConversionResponse,
  CryptoDepositRequest,
  CryptoDepositResponse,
  InitializePaymentRequest,
  InitializePaymentResponse,
  PaymentVerificationResponse,
} from "./types";

export class PaymentsApi {
  constructor(private readonly client: ApiClient) {}

  initializePayment(data: InitializePaymentRequest): Promise<InitializePaymentResponse> {
    return this.client.post<InitializePaymentResponse>("/payments/initialize", data);
  }

  verifyPayment(reference: string): Promise<PaymentVerificationResponse> {
    return this.client.get<PaymentVerificationResponse>(`/payments/verify/${reference}`);
  }

  getCryptoRates(): Promise<ConversionRate> {
    return this.client.get<ConversionRate>("/crypto/rates");
  }

  convertToNaira(data: ConversionRequest): Promise<ConversionResponse> {
    return this.client.post<ConversionResponse>("/crypto/convert", data);
  }

  generateDepositAddress(data: CryptoDepositRequest): Promise<CryptoDepositResponse> {
    return this.client.post<CryptoDepositResponse>("/crypto/deposit", data);
  }
}

