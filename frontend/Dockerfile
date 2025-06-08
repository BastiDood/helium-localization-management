FROM node:24.1.0-alpine3.22 AS build

WORKDIR /app
COPY . .

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm install

ENV NEXT_PUBLIC_API_ORIGIN=https://helium-localization-management-api.fly.dev
RUN pnpm build

FROM gcr.io/distroless/nodejs24-debian12:nonroot-amd64 as deploy
WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

ENV PORT=3000
EXPOSE 3000
CMD ["server.js"]
