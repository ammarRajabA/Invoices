# base image
FROM node:10-alpine

# set working directory
WORKDIR /backend

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 2500

# start app
CMD ["npm", "start"]