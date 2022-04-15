FROM node:16-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.0.0-rc.4 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline ; \
    pnpm run build:backend

FROM node:16-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.0.0-rc.4 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod
COPY . ./
COPY --from=build /app/packages/backend/build/ ./packages/backend/build/
COPY --from=build /app/packages/shared/build/ ./packages/shared/build/
RUN pnpm install --offline --prod ; exit 0
EXPOSE 2162
CMD ["npm","run","start:backend"]