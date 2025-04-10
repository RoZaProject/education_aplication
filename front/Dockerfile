# Базовый образ с Node.js
FROM node:20-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всех файлов проекта
COPY . .

# Открытие порта, который использует ваше приложение (обычно 3000 для React)
EXPOSE 5173

# Запуск приложения в development-режиме
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
