import type { ApiErrorPayload, PeeplxClientOptions, RequestConfig, TokenStore } from "./types";

export class ApiClient {
  private readonly baseUrl: string;
  private readonly getAccessToken?: () => string | null;
  private readonly fetchFn: typeof fetch;
  readonly tokenStore?: TokenStore;

  constructor(options: PeeplxClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.tokenStore = options.tokenStore;
    this.getAccessToken = options.getAccessToken ?? options.tokenStore?.getAccessToken.bind(options.tokenStore);
    this.fetchFn = options.fetchFn ?? fetch;
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: data === undefined ? undefined : JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: data === undefined ? undefined : JSON.stringify(data),
    });
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, headers, ...restConfig } = config;
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const mergedHeaders = new Headers(headers);
    if (!mergedHeaders.has("Content-Type") && restConfig.body) {
      mergedHeaders.set("Content-Type", "application/json");
    }

    const token = this.getAccessToken?.();
    if (token) {
      mergedHeaders.set("Authorization", `Bearer ${token}`);
    }

    const response = await this.fetchFn(url.toString(), {
      ...restConfig,
      headers: mergedHeaders,
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    if (!response.ok) {
      let message = `HTTP ${response.status}: ${response.statusText}`;
      if (isJson) {
        const payload = (await response.json()) as ApiErrorPayload;
        message = payload.message ?? payload.error ?? message;
      }
      throw new Error(message);
    }

    if (!isJson) {
      return null as T;
    }

    return (await response.json()) as T;
  }
}
