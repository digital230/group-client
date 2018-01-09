FROM node:latest

# set working directory
RUN mkdir /usr/src/groupie
WORKDIR /usr/src/groupie

# add `/usr/src/groupie/node_modules/.bin` to $PATH
ENV PATH /usr/src/groupie/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/groupie/package.json
RUN npm install
RUN npm install react-scripts@latest -g

EXPOSE 3000

# start app
CMD ["npm", "start"]

