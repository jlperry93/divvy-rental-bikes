FROM node:10

WORKDIR /divvy-rental-program

# Install NPM deps
COPY package.json package.json
COPY package-lock.json package-lock.json	
RUN npm install
COPY . .

# Bundle app source
RUN npm run-script build

# Start server
EXPOSE 80
CMD ["node", "dist/server.js"]
