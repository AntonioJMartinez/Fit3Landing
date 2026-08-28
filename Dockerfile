# syntax=docker/dockerfile:1
FROM node:22.18.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG FIT3_SITE_URL
ARG FIT3_HIDE_LEGAL_LINKS
ARG FIT3_SUPPORT_EMAIL
ARG FIT3_PRIVACY_URL
ARG FIT3_TERMS_URL
ARG FIT3_APP_STORE_ID
ARG FIT3_APP_STORE_URL
ARG FIT3_APP_ARGUMENT

RUN npm run build

FROM nginx:1.28.0-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
