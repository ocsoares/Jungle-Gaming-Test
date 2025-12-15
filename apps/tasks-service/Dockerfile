FROM node:20-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml turbo.json ./
COPY ./apps/tasks-service/package.json ./apps/tasks-service/
COPY ./packages ./packages

FROM base AS development

RUN pnpm install --frozen-lockfile
COPY ./apps/tasks-service ./apps/tasks-service
EXPOSE 3003
CMD ["pnpm", "--filter", "tasks-service", "run", "start:dev"]

FROM base AS builder

RUN pnpm install --frozen-lockfile
COPY ./apps/tasks-service ./apps/tasks-service
RUN pnpm --filter tasks-service build

FROM node:20-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/tasks-service/dist ./apps/tasks-service/dist
COPY ./apps/tasks-service/package.json ./apps/tasks-service/
COPY ./packages ./packages
ENV NODE_ENV=production
ENV PORT=3003
EXPOSE 3003

CMD ["node", "apps/tasks-service/dist/main.js"]