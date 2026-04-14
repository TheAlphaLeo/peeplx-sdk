import { AuthApi } from "./auth";
import { ApiClient } from "./client";
import { EscrowApi } from "./escrow";
import { PaymentsApi } from "./payments";
import { ProfileApi } from "./profile";
import type { PeeplxClientOptions } from "./types";

export class PeeplxClient {
  readonly http: ApiClient;
  readonly auth: AuthApi;
  readonly escrow: EscrowApi;
  readonly payments: PaymentsApi;
  readonly profile: ProfileApi;

  constructor(options: PeeplxClientOptions) {
    this.http = new ApiClient(options);
    this.auth = new AuthApi(this.http);
    this.escrow = new EscrowApi(this.http);
    this.payments = new PaymentsApi(this.http);
    this.profile = new ProfileApi(this.http);
  }
}

export * from "./auth";
export * from "./client";
export * from "./escrow";
export * from "./payments";
export * from "./profile";
export * from "./types";

