# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Production stage
FROM nginx:alpine

# Copy Angular app - adjust path based on your actual build output
COPY --from=build /app/dist/k8s-demo-ui/browser /usr/share/nginx/html/

# Create and copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]