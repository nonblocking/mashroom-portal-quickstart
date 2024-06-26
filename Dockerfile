# Builder
FROM node:20.12.1-slim as builder
WORKDIR /opt/app
COPY ./config ./config
COPY ./plugin-packages ./plugin-packages
COPY *.json ./
RUN npm ci
RUN npm run build

# Actual image
FROM node:20.12.1-slim
WORKDIR /opt/app
COPY *.json mashroom-starter.js ./
COPY ./config ./config
RUN mkdir data
COPY --from=builder /opt/app/plugin-packages ./plugin-packages
RUN npm ci --production

EXPOSE 5050
CMD ["npm", "run", "start"]
