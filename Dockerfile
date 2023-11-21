FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . /app/

RUN npm run build

# Estágio de produção
FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]