FROM node:lts-alpine3.15
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
WORKDIR /root/ez-parse-server-master
RUN apk --no-cache add curl
RUN wget -qO- https://gobinaries.com/tj/node-prune | ash -s
COPY . .
RUN /usr/local/bin/node-prune
ENV NODE_ENV=production
EXPOSE 3000
RUN npm install
CMD ["node", "-r", "esm", "./node_modules/moleculer/bin/moleculer-runner.js", "services"]
