FROM node:18-alpine3.16

WORKDIR /app

COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --omit=dev; \
    fi


COPY . .

CMD npm run start