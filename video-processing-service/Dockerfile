# Base Image, set node as parent image
FROM node:18

# Set working directory in the container 
WORKDIR /app

# Copy package json 
COPY package*.json ./

# Install ffmpeg into the container 
RUN apt-get update && apt-get install -y ffmpeg

# Install any packages specified in package.json
RUN npm install 

# Copy app source inside the docker image 
COPY . . 

# Make port 3000 available outside this container 
EXPOSE 3000

# Define the command to run your app using CMD (only one CMD allowed)
CMD [ "npm", "start" ]