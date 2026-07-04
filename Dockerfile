FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:24-alpine AS runner
ARG PG_VERSION=17
RUN apk add --no-cache postgresql${PG_VERSION}-client || apk add --no-cache postgresql-client
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
CMD ["node", "src/index.js"]
