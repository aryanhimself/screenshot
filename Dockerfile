FROM node:20
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./

USER root

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub |  apt-key add - \
    && apt-get update \
    && apt-get -f install \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 dbus dbus-x11 \
      --no-install-recommends \
    && service dbus start \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r pptruser && useradd -rm -g pptruser -G audio,video pptruser
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