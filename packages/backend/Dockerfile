FROM node:16-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
COPY package.json tsconfig.json /app/
COPY ./packages/shared/package.json /app/packages/shared/
COPY ./packages/backend/package.json /app/packages/backend/
RUN npm --registry https://registry.npmmirror.com install \
  --workspace=fanartweb-shared --workspace=fanartweb-backend
COPY ./packages/shared/ /app/packages/shared/
COPY ./packages/backend/ /app/packages/backend/
RUN npm run build:backend
EXPOSE 2162
CMD ["npm","run","start:backend"]