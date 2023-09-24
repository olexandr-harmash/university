# syntax=docker/dockerfile:1

# Указываем базовый образ Node.js с Alpine Linux
FROM node:18-alpine as base

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Копируем все файлы из текущей директории (включая исходный код приложения) внутрь контейнера
COPY . .

FROM base as test
RUN npm test

FROM base as development
# Устанавливаем зависимости, указанные в package.json
RUN npm install

# Устанавливаем глобально pm2 для управления процессами Node.js
RUN npm install -g pm2

# Открываем порты, которые должны быть доступны извне контейнера
EXPOSE 3000
EXPOSE 9200
# Запускаем приложение при старте контейнера с помощью команды npm run nodemon
CMD npm run nodemon
