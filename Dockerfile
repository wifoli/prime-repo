FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.14.4 --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY turbo.json ./

# Copy all workspace packages
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN pnpm install

# Build packages (ui and panel) before starting dev mode
RUN pnpm --filter @prime-repo/ui build
RUN pnpm --filter @prime-repo/panel build

# Expose ports for apps (adjust as needed)
# App1 will run on 5001, App2 on 5002
EXPOSE 5001 5002

# For Vite HMR to work in Docker
ENV VITE_HOST=0.0.0.0
ENV CHOKIDAR_USEPOLLING=true

# Start development server
CMD ["pnpm", "dev"]