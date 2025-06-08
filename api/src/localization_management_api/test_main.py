from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_invalid_paths():
    assert client.get("/").status_code == 404
    assert client.get("/dashboard").status_code == 404
    assert client.get("/api").status_code == 404
