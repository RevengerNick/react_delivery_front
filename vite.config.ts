import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({

  plugins: [ 
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: [{find: "@", replacement: path.resolve(__dirname, "src")}]
  },
  
  server: {
    host: true, // Allows access from local network
    port: 5173,
    allowedHosts: ['e1bd-84-54-83-236.ngrok-free.app'], // Default Vite port
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000", // Бэкенд на 3000
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
  }
})
