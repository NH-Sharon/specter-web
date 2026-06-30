# ─────────────────────────────────────────────
# Stage 1: Build Angular application
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (layer caching)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build -- --configuration production

# ─────────────────────────────────────────────
# Stage 2: Serve with NGINX
# ─────────────────────────────────────────────
FROM nginx:alpine AS production

# Copy custom NGINX config
COPY ../nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built Angular app
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Ensure nginx owns the files
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget -q --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
