FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 3550
ENV PORT=3550
CMD ["node", "server.js"]
