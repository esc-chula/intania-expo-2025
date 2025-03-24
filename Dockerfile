FROM node:20-alpine AS base

##### DEPENDENCIES

FROM base AS deps
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY prisma ./
COPY package.json package-lock.json ./

RUN npm ci

##### BUILDER

FROM base AS builder
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate
RUN npm run build

##### RUNNER

FROM base AS runner
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs prisma ./prisma/

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]