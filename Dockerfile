# Stage 1: Build the Vue app
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .
RUN npm ci --ignore-scripts

COPY public public
COPY src src
COPY index.html .
COPY tsconfig*.json .
COPY vite.config.ts .

RUN npm run build

# Stage 2: Serve with Nginx
# This image exposes port 8080 by default
# ports below 1024 require elevated privileges (e.g 80 is for root-enabled users)
FROM nginxinc/nginx-unprivileged:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]