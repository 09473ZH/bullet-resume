FROM ccr.ccs.tencentyun.com/corgi/node:18-slim AS build
LABEL authors = "09473ZH"
WORKDIR /app
COPY . /app

RUN  pnpm i && pnpm build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
