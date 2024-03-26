FROM node:alpine
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./

# RUN npm install -g yarn
RUN apk add --no-cache nss
RUN apk add chromium
# RUN apk update && apk add libnss3
RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# RUN yarn build

ENV NODE_ENV production
ENV PORT 80
EXPOSE 80

CMD [ "yarn", "start" ]