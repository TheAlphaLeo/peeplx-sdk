import { ApiClient } from "./client";
import type {
  AuthResponse,
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
} from "./types";

export class AuthApi {
  constructor(private readonly client: ApiClient) {}

  register(data: RegisterRequest): Promise<AuthResponse> {
    return this.client.post<AuthResponse>("/auth/register", data).then((response) => {
      this.client.tokenStore?.setTokens?.(response.tokens);
      return response;
    });
  }

  login(data: LoginRequest): Promise<AuthResponse> {
    return this.client.post<AuthResponse>("/auth/login", data).then((response) => {
      this.client.tokenStore?.setTokens?.(response.tokens);
      return response;
    });
  }

  logout(): Promise<void> {
    return this.client.post<void>("/auth/logout", {}).finally(() => {
      this.client.tokenStore?.clearTokens?.();
    });
  }

  refreshToken(refreshToken?: string): Promise<AuthTokens> {
    const nextRefreshToken = refreshToken ?? this.client.tokenStore?.getRefreshToken?.();

    if (!nextRefreshToken) {
      return Promise.reject(new Error("No refresh token available"));
    }

    return this.client.post<AuthTokens>("/auth/refresh", { refreshToken: nextRefreshToken }).then((tokens) => {
      this.client.tokenStore?.setTokens?.(tokens);
      return tokens;
    });
  }

  verifyEmail(data: VerifyEmailRequest): Promise<{ message: string }> {
    return this.client.post<{ message: string }>("/auth/verify-email", data);
  }

  resendVerificationCode(email: string): Promise<{ message: string }> {
    return this.client.post<{ message: string }>("/auth/resend-code", { email });
  }

  forgotPassword(email: string): Promise<{ message: string }> {
    return this.client.post<{ message: string }>("/auth/forgot-password", { email });
  }

  resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    return this.client.post<{ message: string }>("/auth/reset-password", {
      token,
      newPassword,
    });
  }

  getCurrentUser(): Promise<AuthResponse["user"]> {
    return this.client.get<AuthResponse["user"]>("/auth/me");
  }
}
