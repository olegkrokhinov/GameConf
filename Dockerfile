FROM node:16-alpine
WORKDIR /app
RUN mkdir -p -v /app/images/items
COPY package.json ./
RUN npm install --only=prod
COPY . .
EXPOSE 8080 
USER root
CMD ["node", "app.js"]
