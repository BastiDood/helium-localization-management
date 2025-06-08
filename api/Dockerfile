FROM ghcr.io/astral-sh/uv:python3.12-alpine

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV UV_COMPILE_BYTECODE=1

WORKDIR /app
COPY . .

RUN uv sync --locked

EXPOSE 8000
ENV UVICORN_HOST="0.0.0.0"
ENV UVICORN_PORT="8000"
CMD ["uv", "run", "uvicorn", "src.localization_management_api.main:app"]
