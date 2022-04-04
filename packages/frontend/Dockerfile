FROM node:16-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
COPY package.json tsconfig.json /app/
COPY ./packages/frontend/package.json /app/packages/frontend/
RUN npm --registry https://registry.npmmirror.com install \
  --workspace=fanartweb-frontend
COPY ./packages/frontend/ /app/packages/frontend/
RUN npm run build:frontend
EXPOSE 3000
CMD ["npm","run","start:frontend"]