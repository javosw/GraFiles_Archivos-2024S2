
FROM node:20.18.0-alpine3.19

WORKDIR /grafiles

COPY package*.json /

RUN npm install

COPY . .

EXPOSE 4200

CMD npm run noded
