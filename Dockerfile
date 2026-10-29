# Build the React/Vite frontend.
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Run the Express API and serve the built frontend.
FROM node:22-alpine AS production
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci --omit=dev

COPY backend/index.js ./backend/index.js
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

USER node
EXPOSE 3000
CMD ["node", "backend/index.js"]
