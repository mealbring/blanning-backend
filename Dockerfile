FROM kuzzleio/kuzzle-runner:16 as builder

ADD . /var/app

WORKDIR /var/app

RUN npm install
RUN npm run build

FROM kuzzleio/kuzzle-runner:16 as prepare

WORKDIR /var/app
ENV NODE_ENV=production

COPY --from=builder ["var/app/package.json", "var/app/package-lock.json*", "./"]
COPY --from=builder /var/app/dist .

RUN npm install --production

FROM node:16-stretch-slim

WORKDIR /var/app

COPY --from=builder var/app/config/local/.kuzzlerc .
COPY --from=prepare /var/app/ .

CMD [ "node", "app.js" ]
