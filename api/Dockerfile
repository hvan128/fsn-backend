FROM node:14-alpine
#chuẩn bị môi trường node.js, version node14/alpine

WORKDIR /fns/backend

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "build" ]

#docker build --tag node-docker .
# docker run -p 8080:8080 -d node-docker