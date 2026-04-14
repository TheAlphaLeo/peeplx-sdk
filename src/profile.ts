import { ApiClient } from "./client";
import type { ProfilePaymentRequest, ProfilePaymentResponse, PublicProfile } from "./types";

export class ProfileApi {
  constructor(private readonly client: ApiClient, private readonly webBaseUrl = "https://peeplx.me") {}

  getPublicProfile(username: string): Promise<PublicProfile> {
    return this.client.get<PublicProfile>(`/profiles/public/${username}`);
  }

  processProfilePayment(
    username: string,
    paymentData: ProfilePaymentRequest,
  ): Promise<ProfilePaymentResponse> {
    return this.client.post<ProfilePaymentResponse>(`/profiles/public/${username}/pay`, paymentData);
  }

  getMyProfile(): Promise<PublicProfile> {
    return this.client.get<PublicProfile>("/profiles/me");
  }

  updateProfile(data: Partial<PublicProfile>): Promise<PublicProfile> {
    return this.client.patch<PublicProfile>("/profiles/me", data);
  }

  getProfileUrl(username: string): string {
    return `${this.webBaseUrl.replace(/\/$/, "")}/${username}`;
  }

  getProfilePaymentLink(username: string): string {
    return `${this.getProfileUrl(username)}/pay`;
  }
}

