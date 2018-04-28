FROM node:8.9.4-alpine as builder

WORKDIR /app

RUN npm install -g node-static vue
COPY ./examples ./examples
COPY ./dist ./dist

CMD ["static", ".", "-p", "3000", "-a", "0.0.0.0"]
