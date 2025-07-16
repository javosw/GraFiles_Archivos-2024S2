FROM node:20.18.0-alpine3.19 AS frontend-builder
WORKDIR /app-frontend
COPY app-frontend/package*.json .
RUN npm install
COPY app-frontend/ .
RUN npm run build

FROM node:20.18.0-alpine3.19
WORKDIR /app
COPY app-backend/package*.json .
RUN npm install
COPY app-backend/ .
RUN npm run build
COPY --from=frontend-builder /app-frontend/dist/app-frontend/browser/ dist/public
CMD npm run start
EXPOSE 3000
