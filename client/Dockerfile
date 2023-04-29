FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn --silent
COPY . .
EXPOSE 5173
CMD ["yarn", "dev"]