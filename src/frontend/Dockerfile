## Use node image to build files
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copy package.json & package-lock.json and run a clean install
COPY package*.json .
RUN npm install --ci

# Copy remaining files and build static resources
COPY . .
RUN npm run build

## Build actual image using a nginx base
FROM nginx:1.23.3-alpine

# Copy static files from build container
WORKDIR /www/data/frontend
COPY --from=build ./usr/src/app/dist ./

# Copy nginx config
COPY ./.docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=1m --timeout=15s --retries=3 CMD curl -f http://localhost/ || exit 1