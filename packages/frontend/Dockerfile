FROM node:16-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@next-7 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline ; \
    pnpm run build:frontend

FROM node:16-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@next-7 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod
COPY . ./
COPY --from=build /app/packages/shared/build/ ./packages/shared/build/
COPY --from=build /app/packages/frontend/dist/ ./packages/frontend/dist/
COPY --from=build /app/packages/frontend/.nuxt/ ./packages/frontend/.nuxt/
RUN pnpm install --offline --prod ; exit 0
EXPOSE 3000
CMD ["pnpm","run","start:frontend"]