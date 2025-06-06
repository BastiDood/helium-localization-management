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

## Running the server

```bash
uv run uvicorn src.localization_management_api.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

### Example Usage

To get localizations for a project, you can access:
`http://127.0.0.1:8000/localizations/your_project_id/en_US`
