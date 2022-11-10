FROM node

WORKDIR /var/nodeapp

COPY ./package.json ./

RUN npm install

COPY ./ ./

EXPOSE 5001

CMD ["npm","start"]