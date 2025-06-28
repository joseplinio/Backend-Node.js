FROM node:22.17-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY  . .
CMD [ "node", "src/main.ts" ]
EXPOSE 3000