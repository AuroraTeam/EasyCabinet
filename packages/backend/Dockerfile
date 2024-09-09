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
ENV DEV=true
ENV HOST="0.0.0.0"
ENV PORT=4000
ENV FRONTEND_URL="http://localhost:8080"

ENV JWT_SECRET="secret"
ENV JWT_EXPIRES_IN="30m"
 
ENV COOKIE_SECURE=false
ENV COOKIE_SECRET="secret"
ENV COOKIE_DOMAIN="localhost"
ENV COOKIE_EXPIRES_IN=2592000
 
ENV DB_HOST="mysql"
ENV DB_PORT=3306
ENV DB_NAME="mine"
ENV DB_USER="mine"
ENV DB_PASS="mine"
 
ENV REDIS_URL="redis://keydb:6379"
 
ENV S3_ACCESS_KEY_ID="minio"
ENV S3_SECRET_ACCESS_KEY="miniosecret"
ENV S3_ENDPOINT="http://minio:9000"
ENV S3_REGION="test"
ENV S3_BUCKET="mine"
ENV S3_PUBLIC_URL="http://localhost:8080/object/mine/[hash]"
CMD ["node", "./dist/main.js"]