import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@boot': resolve(__dirname, 'src/boot'),
      '@core': resolve(__dirname, 'src/core'),
      '@domain': resolve(__dirname, 'src/domain'),
      '@lib': resolve(__dirname, 'src/lib'),
      '@modules': resolve(__dirname, 'src/modules'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
})
