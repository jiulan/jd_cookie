FROM node:lts-alpine3.10

WORKDIR /app

COPY ["package.json","yarn.lock", "./"]

RUN yarn

COPY index.js ./
COPY public ./public

EXPOSE 6789

CMD [ "node", "index.js" ]