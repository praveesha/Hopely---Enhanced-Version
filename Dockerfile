# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Provide dummy env so Next.js build doesn't fail
ARG MONGODB_URI="mongodb://dummy"
ENV MONGODB_URI=${MONGODB_URI}


# Install dependencies first (cached if package.json doesn't change)
COPY package*.json ./

# Install deps inside Docker
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app ./

# Expose port
EXPOSE 3000

# CMD will use env vars injected at runtime
CMD ["npm", "start"]
