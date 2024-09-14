FROM node:20-alpine AS base

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
    DB_PASS="mine" \
    REDIS_URL="redis://keydb:6379" \
    S3_ACCESS_KEY_ID="minio" \
    S3_SECRET_ACCESS_KEY="miniosecret" \
    S3_ENDPOINT="http://minio:9000" \
    S3_REGION="not-used" \
    S3_BUCKET="mine" \
    S3_PUBLIC_URL="/object/mine/[hash]"
CMD ["node", "./dist/main.js"]