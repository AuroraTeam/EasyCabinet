FROM node:20-alpine AS base

FROM base AS build
WORKDIR /build
COPY . .
ENV VITE_API_URL="/api/"
RUN npm i &&\
    npm run build

FROM nginx:alpine AS runner
COPY --from=build /build/dist /usr/share/nginx/html
COPY ./nginx.conf.template /etc/nginx/templates/default.conf.template
CMD ["nginx", "-g", "daemon off;"]