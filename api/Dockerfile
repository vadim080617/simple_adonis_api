FROM node:latest

WORKDIR /var/www

ENV HOST=0.0.0.0
ENV PORT=80

RUN npm i -g @adonisjs/cli

EXPOSE ${PORT}

CMD ["npm", "i"]

CMD ["npm",  "run", "dev"]