import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // PENTING: base './' membuat path asset menjadi relatif (bukan absolute /).
    // Ini memperbaiki error 404 (Not Found) pada index.js/css saat deploy ke GitHub Pages atau sub-folder.
    base: './',
    plugins: [react()],
    define: {
      // Ini menjembatani agar 'process.env.API_KEY' di geminiService.ts bisa membaca VITE_API_KEY
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY)
    }
  }
})
