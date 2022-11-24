FROM node:18.12.1

WORKDIR /app

COPY ./packages/server ./packages/server
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -w server

EXPOSE 8080
CMD ["npm", "run", "start:dev", "-w", "server"]