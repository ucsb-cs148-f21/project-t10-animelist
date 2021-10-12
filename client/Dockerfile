FROM node:14-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# Copy over package.json
# Copy over yarn.lock
COPY package.json ./
COPY yarn.lock ./

RUN yarn

# Bundle app source
COPY . .

# Build app and place base api holder
RUN NEXT_PUBLIC_BASE_API_URL=BASE_API_URL yarn build

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000
# entry point workaround to set BASE_API_URL env at runtime https://github.com/vercel/next.js/discussions/17641
# known caveat: to make change to BASE_API_URL one needs to rebuild the container
# I think it should not be necessary if the frontend will be deployed onto vercel
# or if a dedicated domain name will be used
# because the base api url will be constant and can be resolved at build time
RUN ["chown", "-R", "node", "/app/.next"]
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ["/app/entrypoint.sh"]
CMD [ "yarn", "start" ]
USER node