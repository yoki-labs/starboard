FROM node:16-alpine
WORKDIR /usr/app

COPY package*.json nodemon.json tsconfig.json ./
RUN npm i
COPY src src/
RUN npm run build
RUN npm prune --production

CMD [ "npm", "start" ]