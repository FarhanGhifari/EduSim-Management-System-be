# Stage: From node To Builder For All Environment
FROM node:18-alpine AS builder

# Builder stage which pulls in all dependencies
#==================================================================#
WORKDIR /app

# Install dependencies
RUN apk add --no-cache git curl

# Move to app directory
COPY package*.json ./

# Move to app directory
COPY . .

# Install all packages, builds application, and clean cache
RUN npm install
#==================================================================#

# Create the stage production
#==================================================================#
FROM node:18-alpine

# Source Directory
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/.sequelizerc ./
# COPY --from=builder /app/.prettierrc ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Expose PORT Run on 3000
EXPOSE 3000

# Execute for start application
CMD [ "npm", "start" ]
#==================================================================#