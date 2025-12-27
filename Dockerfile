# -----------------------
# Stage 1: Builder
# -----------------------
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies first (for better caching)
COPY package*.json tsconfig*.json ./
RUN npm ci

# Copy source
COPY . .

# Build TypeScript
RUN npm run build


# -----------------------
# Stage 2: Production Runtime
# -----------------------
FROM node:20-alpine AS runtime

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY prisma ./prisma

# Generate Prisma Client (needed in runtime image)
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "dist/server.js"]
