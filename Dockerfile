# ---- Базовый pwa-crtdiu  ----
FROM node:carbon AS base
# Создать директорию app
WORKDIR /app

# ---- Зависимости ----
FROM base AS dependencies
COPY package*.json ./
RUN npm install
COPY . /app

# ---- Билд ----
FROM dependencies AS build
RUN npm run build

# ---- Выпуск ----
FROM node:10.15.3-alpine AS release
WORKDIR /app
RUN npm -g install serve
COPY --from=dependencies /app/package.json ./
RUN npm install --only=production
COPY --from=build /app/dist /app/dist
EXPOSE 5000
CMD ["serve", "-s", "dist", "-p", "5000"]