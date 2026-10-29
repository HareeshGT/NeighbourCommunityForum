import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy API requests to the local Express server during development.
const apiPaths = ['/test', '/login', '/signup', '/getmessage', '/sendmessage', '/sendpost', '/getpost']

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: Object.fromEntries(apiPaths.map((path) => [path, 'http://localhost:3000'])),
  },
})
