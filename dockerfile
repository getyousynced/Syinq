# Stage 1: Base
FROM node:22.14.0-alpine3.21 as base

# Stage 2: Builder
FROM base as builder
WORKDIR /home/build

RUN apk add --no-cache curl

COPY package*.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY prisma/ prisma/
COPY .env .

COPY src/ src/

RUN corepack enable
RUN yarn install 
RUN yarn run build
RUN npx prisma generate

# Stage 3: Runner
FROM base as runner
WORKDIR /home/app

COPY --from=builder /home/build/dist dist/
COPY --from=builder /home/build/package*.json .
COPY --from=builder /home/build/yarn.lock .
COPY --from=builder /home/build/.env .env
COPY --from=builder /home/build/node_modules/.prisma node_modules/.prisma
COPY --from=builder /home/build/node_modules/@prisma node_modules/@prisma


RUN yarn install --production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

USER nodejs

EXPOSE 8080
ENV PORT=8080

CMD ["yarn", "start"]
