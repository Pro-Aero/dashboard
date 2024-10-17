FROM node:18-buster

WORKDIR /usr/src/api

COPY . .

RUN yarn install --quiet --no-optional --no-fund --loglevel=error

RUN chown -R node:node ./

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
