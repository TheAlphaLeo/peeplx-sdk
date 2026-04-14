import type { AuthTokens, TokenStore } from "./types";

export class LocalStorageTokenStore implements TokenStore {
  constructor(
    private readonly accessTokenKey = "accessToken",
    private readonly refreshTokenKey = "refreshToken",
  ) {}

  getAccessToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }
    return window.localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }
    return window.localStorage.getItem(this.refreshTokenKey);
  }

  setTokens(tokens: AuthTokens): void {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(this.accessTokenKey, tokens.accessToken);
    window.localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
  }

  clearTokens(): void {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.removeItem(this.accessTokenKey);
    window.localStorage.removeItem(this.refreshTokenKey);
  }
}

