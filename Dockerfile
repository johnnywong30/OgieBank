# Server Dockerfile

FROM node:16
WORKDIR /server
COPY package*.json ./
RUN npm run install-all
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]