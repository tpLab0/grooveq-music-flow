
FROM node:21-alpine as base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=./src/prisma/schema.prisma --skip-generate-libquery-engine
RUN npm install --save @prisma/client

# Build the app
FROM base as build
RUN npm run build

# Production image
FROM node:21-alpine as production
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src/prisma ./prisma

EXPOSE 8080

CMD ["npm", "run", "preview"]
