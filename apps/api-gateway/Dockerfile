FROM node:20-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml turbo.json ./
COPY ./apps/api-gateway/package.json ./apps/api-gateway/
COPY ./packages ./packages


FROM base AS development

RUN pnpm install --frozen-lockfile

COPY ./apps/api-gateway ./apps/api-gateway

EXPOSE 3001

CMD ["pnpm", "--filter", "api-gateway", "run", "start:dev"]

FROM base AS builder

RUN pnpm install --frozen-lockfile

COPY ./apps/api-gateway ./apps/api-gateway

RUN pnpm --filter api-gateway build

FROM node:20-alpine AS production

RUN npm install -g pnpm
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api-gateway/dist ./apps/api-gateway/dist
COPY ./apps/api-gateway/package.json ./apps/api-gateway/
COPY ./packages ./packages

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "apps/api-gateway/dist/main.js"]