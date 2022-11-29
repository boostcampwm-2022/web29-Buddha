FROM node:18.12.1

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 8080
CMD ["npm", "run", "start:dev"]