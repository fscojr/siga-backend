#!/bin/ash

cp env.example .env

if [ ! -z "$ENV" ]; then
    sed -i "s#NODE_ENVIROMMENT=.*#NODE_ENVIROMMENT=$ENV#g" .env
fi

if [ ! -z "$PORT" ]; then
    sed -i "s#PORT=.*#PORT=$PORT#g" .env
fi

sed -i "s#URL_PONTOS=.*#URL_PONTOS=$URL_PONTOS#g" .env\

exec node server.js