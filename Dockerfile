FROM node:lts

WORKDIR /var/www/html

COPY package.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]