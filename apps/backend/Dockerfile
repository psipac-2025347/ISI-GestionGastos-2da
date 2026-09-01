FROM node:24-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm run prisma:generate

EXPOSE 3000

CMD ["pnpm", "start"]