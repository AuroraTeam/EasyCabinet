FROM node:22-alpine AS base

FROM base AS build
WORKDIR /build
COPY . .
RUN npm i &&\
  npm run build

FROM base AS runner
WORKDIR /app
COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules
ENV DEV=true \
  HOST="0.0.0.0" \
  PORT=4000 \
  FRONTEND_URL="${PROTOCOL}://${DOMEN}:${WEB_PORT}" \
  BACKEND_URL="${PROTOCOL}://${DOMEN}:${WEB_PORT}/api" \
  JWT_SECRET="secret" \
  JWT_EXPIRES_IN="30m" \
  COOKIE_SECURE=false \
  COOKIE_SECRET="secret" \
  COOKIE_DOMAIN="${DOMEN}" \
  COOKIE_EXPIRES_IN=2592000 \
  DB_HOST="mysql" \
  DB_PORT=3306 \
  DB_NAME="mine" \
  DB_USER="mine" \
  DB_PASS="mine"
CMD ["node", "./dist/main.js"]
