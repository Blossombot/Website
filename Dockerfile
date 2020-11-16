# Install nodejs+npm
FROM alpine:3.12.1 as base
WORKDIR /app
RUN apk add --update npm

# Install dependencies
FROM base as build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

# Build source
COPY src ./src
COPY public ./public
RUN npm run build

# Build final image
FROM base as final
COPY --from=build /app/build ./build
EXPOSE 80
ENTRYPOINT ["npx", "serve", "-n", "-s", "build", "-l", "80"]