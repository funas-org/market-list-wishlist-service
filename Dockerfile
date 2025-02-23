FROM node:18.0.0 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.0.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:prod"]