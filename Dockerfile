FROM node:17-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm i -g @ionic/cli
RUN npm i --force

COPY ./ /app/
RUN npm run-script build
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/