# base image
FROM node:10

# set working directory
WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn
RUN yarn global add react-scripts@3.0.1

COPY . .

EXPOSE 3000

# start app
CMD ["npm", "start"]