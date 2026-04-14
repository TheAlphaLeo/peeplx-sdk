from .resources import AuthApi, EscrowApi, PaymentsApi, ProfileApi


class HttpClient:
    def __init__(self, base_url: str, access_token: str | None = None):
        self.base_url = base_url.rstrip("/")
        self.access_token = access_token

    def _headers(self) -> dict[str, str]:
        headers = {"Content-Type": "application/json"}
        if self.access_token:
            headers["Authorization"] = f"Bearer {self.access_token}"
        return headers

    def get(self, session, endpoint: str, params: dict | None = None):
        response = session.get(f"{self.base_url}{endpoint}", params=params, headers=self._headers())
        response.raise_for_status()
        return response.json()

    def post(self, session, endpoint: str, payload: dict | None = None):
        response = session.post(f"{self.base_url}{endpoint}", json=payload, headers=self._headers())
        response.raise_for_status()
        return response.json()


class PeeplxClient:
    def __init__(self, base_url: str, access_token: str | None = None):
        import requests

        self.session = requests.Session()
        self.http = HttpClient(base_url=base_url, access_token=access_token)
        self.auth = AuthApi(self.http, self.session)
        self.escrow = EscrowApi(self.http, self.session)
        self.payments = PaymentsApi(self.http, self.session)
        self.profile = ProfileApi(self.http, self.session)

