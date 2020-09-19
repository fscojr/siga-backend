FROM node:lts-alpine

RUN apk update

RUN addgroup -S app && adduser -S app -G app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN chown -R app:app /usr/src/app
RUN chmod 755 start.sh

USER app

VOLUME /dados

EXPOSE 3000

CMD ["/bin/ash", "start.sh"]
