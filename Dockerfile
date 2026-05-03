# Production-only Dockerfile (using pre-built assets)
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY dist ./dist
COPY src ./src
COPY server.js ./
EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "server.js"]
