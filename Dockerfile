# Builder
FROM node:18-slim as builder
WORKDIR /opt/app
COPY ./config ./config
COPY ./plugin-packages ./plugin-packages
COPY *.json ./
RUN npm ci && ./node_modules/.bin/lerna bootstrap --ci
RUN npm run build
# Remove all node_modules
RUN ./node_modules/.bin/lerna clean --yes

# Actual image
FROM node:18-slim
WORKDIR /opt/app
COPY *.json mashroom-starter.js ./
COPY ./config ./config
RUN mkdir data
COPY --from=builder /opt/app/plugin-packages ./plugin-packages
RUN npm ci --production && NODE_ENV=production ./node_modules/.bin/lerna bootstrap --ci

EXPOSE 5050
CMD ["npm", "run", "start"]
