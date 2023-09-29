FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV REACT_APP_BASE_URL=http://localhost:8000/api

# Set the command to start the server
CMD ["npm", "start"]
