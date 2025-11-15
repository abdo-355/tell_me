# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Set build-time environment variables
ARG REACT_APP_BACKEND=http://localhost:8081
ENV REACT_APP_BACKEND=$REACT_APP_BACKEND
ARG REACT_APP_CLERK_PUBLISHABLE_KEY
ENV REACT_APP_CLERK_PUBLISHABLE_KEY=$REACT_APP_CLERK_PUBLISHABLE_KEY
ARG REACT_APP_SOCIAL_AUTH_ENABLED
ENV REACT_APP_SOCIAL_AUTH_ENABLED=$REACT_APP_SOCIAL_AUTH_ENABLED

# Build the application
RUN npm run build

# Production stage
FROM nginx:1.27-alpine

# Copy built app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]