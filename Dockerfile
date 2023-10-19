FROM node:18-alpine3.17 as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:1.23-alpine

COPY nginx/nginx.conf /etc/nginx/

COPY nginx/default.conf \
     nginx/file-browser.conf \
     /etc/nginx/conf.d/

RUN chmod -R 777 /etc/nginx/ && \
    chown -R nginx:0 /var/cache/nginx && \
    chmod -R g+w /var/cache/nginx && \
    rm /usr/share/nginx/html/*

EXPOSE 8080
USER nginx

COPY --from=build /app/dist /usr/share/nginx/html/