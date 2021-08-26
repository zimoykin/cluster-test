FROM node:14-alpine3.13
WORKDIR /app
COPY src src
COPY .docker.env .env
COPY tsconfig.json tsconfig.json
COPY package*.json ./
RUN npm install
#RUN npm run build
EXPOSE 8001
ENTRYPOINT ["npm", "run", "start"]