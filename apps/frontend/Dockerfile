FROM node:24-alpine AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM nginx:alpine

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY --from=build /app/public/images /usr/share/nginx/html/images
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80