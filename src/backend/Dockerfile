FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package.json & package-lock.json and run a clean install
COPY package*.json .
RUN npm ci --omit=dev

COPY . .

EXPOSE 4000

CMD ["npm", "start"]