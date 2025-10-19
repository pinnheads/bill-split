FROM node:20-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
RUN git clone https://github.com/pinnheads/bill-split .
RUN npm install
RUN npm i -g serve
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "dist"]
