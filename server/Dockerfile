FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn --silent
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]