# Server Dockerfile

FROM node:16
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]