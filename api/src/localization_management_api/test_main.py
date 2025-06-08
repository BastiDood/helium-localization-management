from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_invalid_paths():
    assert client.get("/").status_code == 404
    assert client.get("/dashboard").status_code == 404
    assert client.get("/api").status_code == 404


def test_end_to_end():
    # Project creation
    project_creation_response = client.post(
        "/api/projects", json={"name": "Cool Project"}
    )
    assert project_creation_response.status_code == 201

    project_creation_data = project_creation_response.json()
    assert isinstance(project_creation_data, dict)

    project_id = project_creation_data["id"]
    assert isinstance(project_id, str)

    # Locale creation with duplicate check
    locale_creation_response = client.post(
        f"/api/projects/{project_id}/locales",
        json={"locale": "en"},
    )
    assert locale_creation_response.status_code == 201
    assert (
        client.post(
            f"/api/projects/{project_id}/locales",
            json={"locale": "en"},
        ).status_code
        == 409
    )

    # Key creation with duplicate check
    key_creation_response = client.post(
        f"/api/projects/{project_id}/keys",
        json={"key": "test"},
    )
    assert key_creation_response.status_code == 201
    assert (
        client.post(
            f"/api/projects/{project_id}/keys", json={"key": "test"}
        ).status_code
        == 409
    )

    # Translation creation
    translation_creation_response = client.post(
        f"/api/projects/{project_id}/locales/en/translations",
        json={"test": "Hello world!"},
    )
    assert translation_creation_response.status_code == 200
