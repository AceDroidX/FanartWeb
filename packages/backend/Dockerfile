FROM node:16-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
COPY package.json tsconfig.json /app/
COPY ./packages/shared/ /app/packages/shared/
COPY ./packages/backend/ /app/packages/backend/
RUN ls -al\
  && npm --registry https://registry.npmmirror.com install
RUN npm run build:backend
CMD ["npm","run","start:backend"]