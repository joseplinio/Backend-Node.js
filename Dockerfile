FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY  . .
CMD [ "node", "src/main.js" ]
EXPOSE 3000