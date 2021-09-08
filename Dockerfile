FROM node:16-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=prod
COPY . .
EXPOSE 8080 
USER root
CMD ["node", "app.js"]
