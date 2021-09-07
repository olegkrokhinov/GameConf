FROM node:12-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=prod
COPY . ./
EXPOSE 4000 
USER node
CMD ["node", "app.js"]
