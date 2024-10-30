FROM node:20-slim

WORKDIR /grafiles

COPY package*.json /

RUN npm install

COPY . .

EXPOSE 4200

CMD npm run noded
