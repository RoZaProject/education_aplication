FROM node:18-alpine as builder

WORKDIR /app/auth-app
COPY education-mf-root/auth-app/package.json .
COPY education-mf-root/auth-app/package-lock.json .
RUN npm install
COPY education-mf-root/auth-app .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/auth-app/dist /usr/share/nginx/html
COPY education-mf-root/nginx.conf /etc/nginx/conf.d/default.conf