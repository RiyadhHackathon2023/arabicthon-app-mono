FROM node:18-alpine AS build-stage

# Set the working directory
Workdir /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]


# # Serve stage
# FROM nginx:alpine AS serve-stage
# # COPY --from=build-stage /app/build /usr/share/nginx/html
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# # COPY --from=build-stage /app/dist /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
