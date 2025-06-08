# Localization Management API

This is a FastAPI application to manage localizations.

## Setup

This project uses the [`uv`] package manager to manage Python versions, package versions, and dependency isolation.

[`uv`]: https://docs.astral.sh/uv/

```bash
# Install Python via the `uv` package manager.
uv python install

# Install project dependencies.
uv sync
```

## Running the Server

Before starting the project, make sure that you have the following environment variables set via a `.env` file in the FastAPI project root.

| **Environment Variable** | **Notes** |
| ------------------------ | --------- |
| `SUPABASE_URL` | The project-specific URL endpoint for the Supabase instance. |
| `SUPABASE_KEY` | The project-specific secret key for Supabase API interactions. |

```bash
# Host the dev server at http://localhost:8000.
uv run uvicorn src.localization_management_api.main:app --reload
```

## Running the Unit Tests

Note that the unit tests assume a clean database instance.

```bash
# Run all unit tests with duration times.
uv run pytest --durations=0
```

## API Endpoints

| **Endpoint** | **Description** |
| ------------ | --------------- |
| `POST /api/projects` | Create a new project. |
| `GET /api/projects` | List all projects. |
| `POST /api/projects/{id}/locales` | Create a locale for a specific project. |
| `GET /api/projects/{id}/locales` | List all locales for a specific project. |
| `POST /api/projects/{id}/keys` | Create a key for a specific project. |
| `GET /api/projects/{id}/keys` | List all keys for a specific project. |
| `POST /api/projects/{id}/locales/{locale}/translations` | Bulk upsert translations for a specific project and locale. |
| `GET /api/projects/{id}/locales/{locale}/translations` | List all translations for a specific project and locale. |
