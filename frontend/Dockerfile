FROM docker.io/library/node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
RUN npm install -g vite
COPY . .
RUN npm run build

FROM docker.io/library/nginx:alpine
RUN rm -rf /etc/nginx/conf.d/* /etc/nginx/nginx.conf
RUN mkdir -p /etc/nginx/ssl
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

