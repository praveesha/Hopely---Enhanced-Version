FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.build .env

# PAYHERE_MERCHANT_SECRET should be provided securely at runtime, not in the Dockerfile
ENV MONGODB_URI="mongodb://localhost:27017/hopely_db_dummy"
RUN npm run build

ENV MONGODB_URI=""
EXPOSE 3000
CMD ["npm", "start"]