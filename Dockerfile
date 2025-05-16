FROM node:22.14.0
WORKDIR /usr/src/app
COPY app/package*.json ./
RUN npm install
COPY app/ .
EXPOSE 3111
CMD ["node", "index.js"]