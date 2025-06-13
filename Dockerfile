FROM node:22.16-slim
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY  . .
CMD [ "node", "src/main.ts" ]
EXPOSE 3000