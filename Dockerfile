FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

ENV HOST 0.0.0.0

EXPOSE 8081

CMD [ "npm", "run", "start" ]