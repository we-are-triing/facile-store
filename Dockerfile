FROM node:12-alpine

RUN mkdir -p /home/node/store/node_modules && chown -R node:node /home/node/store
WORKDIR /home/node/store
COPY package*.json ./
COPY nodemon.json ./
COPY Makefile ./

USER node
RUN npm install
# COPY --chown=node:node . .

EXPOSE 24041

CMD [ "npm", "start" ]