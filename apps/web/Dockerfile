FROM node:20-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml turbo.json pnpm-workspace.yaml ./
COPY ./apps/web/package.json ./apps/web/
COPY ./packages ./packages

FROM base AS development

# Instala dependências do workspace incluindo dev deps do web
RUN pnpm install --frozen-lockfile --filter ./apps/web...
COPY ./apps/web ./apps/web
EXPOSE 3000
CMD ["pnpm", "--filter", "web", "run", "start:dev"]

FROM base AS builder

RUN pnpm install --frozen-lockfile --filter ./apps/web...
COPY ./apps/web ./apps/web
RUN pnpm --filter web build

FROM node:20-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/web/package.json ./apps/web/
COPY ./packages ./packages
COPY --from=builder /app/apps/web/dist ./apps/web/dist

# Instala apenas prod deps necessárias
RUN pnpm install --prod --frozen-lockfile --filter ./apps/web...

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "--filter", "web", "run", "preview"]