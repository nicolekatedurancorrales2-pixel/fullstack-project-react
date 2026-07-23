import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    globals: true,
    environment: 'jsdom',//node
    setupFiles: './src/test/setup.js',
    // 1. Limita a Vitest a buscar SOLO dentro de la carpeta src
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    // 2. Excluye explícitamente backend, node_modules y e2e
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      'backend/**',
      'e2e/**',
    ],
    coverage: { 
      provider: 'v8',
      reporter: ['text', 'html'],
      all: true,                     // 👈 Incluye TODOS los archivos, aunque no tengan tests
      include: ['src/**/*.{js,jsx,ts,tsx}'], // 👈 Analiza toda la carpeta src
      exclude: ['src/main.tsx', 'src/vite-env.d.ts', 'src/test/**'], // Excluye archivos de configuración/entrada
      thresholds: { 
        lines: 60, 
        functions: 60, 
        branches: 50, 
        statements: 60, 
      }, 
    },
  },
})
