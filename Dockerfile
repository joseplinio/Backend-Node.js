FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY  . .
CMD [ "node", "src/main.ts" ]
EXPOSE 3000