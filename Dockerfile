FROM node:12-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
#RUN npm install --only=prod
COPY . ./
RUN ls ./api/auth/
EXPOSE 4000 
USER node
CMD ["node", "app.js"]
