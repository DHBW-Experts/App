### BUILD COMMAND ###
# docker build --build-arg -t dhbw-experts-app .
# docker build --build-arg BUILD_ENV=XXXX -t dhbw-experts-app .

### RUN COMMAND ###
# docker run -p 4200:80 dhbw-experts-app

### STAGE 1:BUILD ###
# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies 
# This is needed to build and compile our code 
# while generating the docker image
FROM node:16.15.0-alpine AS build
ARG BUILD_ENV=azure

# Create a Virtual directory inside the docker image
WORKDIR /dist/src/app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install -g @ionic/cli
RUN npm install

RUN if [ "$BUILD_ENV" = "azure" ] ; then ionic build --configuration=azure ; fi
RUN if [ "$BUILD_ENV" = "docker" ] ; then ionic build --configuration=docker; fi


### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder 
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /dist/src/app/www /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container 
# the app will be using Port 80 while running
EXPOSE 80