FROM node:latest
MAINTAINER zhaorujun@gmail.com
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm config set registry http://registry.npm.taobao.org && npm install
COPY . .
EXPOSE 3080
