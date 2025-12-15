FROM node:20-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml turbo.json ./
COPY ./apps/notifications-service/package.json ./apps/notifications-service/
COPY ./packages ./packages

FROM base AS development

RUN pnpm install --frozen-lockfile

COPY ./apps/notifications-service ./apps/notifications-service
EXPOSE 3004
CMD ["pnpm", "--filter", "notifications-service", "run", "start:dev"]

FROM base AS builder

RUN pnpm install --frozen-lockfile
COPY ./apps/notifications-service ./apps/notifications-service
RUN pnpm --filter notifications-service build

FROM node:20-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/notifications-service/dist ./apps/notifications-service/dist
COPY ./apps/notifications-service/package.json ./apps/notifications-service/
COPY ./packages ./packages
ENV NODE_ENV=production
ENV PORT=3004
EXPOSE 3004

CMD ["node", "apps/notifications-service/dist/main.js"]