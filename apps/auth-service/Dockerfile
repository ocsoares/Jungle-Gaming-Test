FROM node:20-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml turbo.json ./
COPY ./apps/auth-service/package.json ./apps/auth-service/
COPY ./packages ./packages

FROM base AS development

RUN pnpm install --frozen-lockfile

COPY ./apps/auth-service ./apps/auth-service

EXPOSE 3002

CMD ["pnpm", "--filter", "auth-service", "run", "start:dev"]

FROM base AS builder

RUN pnpm install --frozen-lockfile
COPY ./apps/auth-service ./apps/auth-service
RUN pnpm --filter auth-service build

FROM node:20-alpine AS production

RUN npm install -g pnpm

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/auth-service/dist ./apps/auth-service/dist
COPY ./apps/auth-service/package.json ./apps/auth-service/
COPY ./packages ./packages
ENV NODE_ENV=production
ENV PORT=3002
EXPOSE 3002

CMD ["node", "apps/auth-service/dist/main.js"]