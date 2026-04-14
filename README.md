# peeplx-sdk

Public MIT SDK for PeeplX API clients.

## Packages

- `src/` TypeScript client
- `python/` Python client

## Boundary

This repository contains API wrappers and typed models only.
It must not contain escrow business rules, dispute handling logic, trust scoring, fraud detection, or internal service configuration.

## TypeScript Quick Start

```ts
import { LocalStorageTokenStore, PeeplxClient } from "peeplx-sdk";

const client = new PeeplxClient({
  baseUrl: "https://api.peeplx.com/api/v1",
  tokenStore: new LocalStorageTokenStore(),
});

const profile = await client.profile.getPublicProfile("jane");
```

## Python Quick Start

```python
from peeplx import PeeplxClient

client = PeeplxClient(base_url="https://api.peeplx.com/api/v1")
profile = client.profile.get_public_profile("jane")
```

## Included APIs

- `auth`
- `escrow`
- `payments`
- `profile`

These clients wrap public endpoints only. They do not include business-rule evaluation or private workflow logic.
