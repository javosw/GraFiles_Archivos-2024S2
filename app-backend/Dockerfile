#node:20-slim

FROM node:20 

WORKDIR /grafiles

COPY package*.json /

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run noded
