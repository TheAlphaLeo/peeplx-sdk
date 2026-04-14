class AuthApi:
    def __init__(self, http, session):
        self.http = http
        self.session = session

    def login(self, email: str, password: str):
        return self.http.post(self.session, "/auth/login", {"email": email, "password": password})


class EscrowApi:
    def __init__(self, http, session):
        self.http = http
        self.session = session

    def get_transaction(self, transaction_id: str):
        return self.http.get(self.session, f"/escrow/{transaction_id}")


class PaymentsApi:
    def __init__(self, http, session):
        self.http = http
        self.session = session

    def verify_payment(self, reference: str):
        return self.http.get(self.session, f"/payments/verify/{reference}")


class ProfileApi:
    def __init__(self, http, session):
        self.http = http
        self.session = session

    def get_public_profile(self, username: str):
        return self.http.get(self.session, f"/profiles/public/{username}")

