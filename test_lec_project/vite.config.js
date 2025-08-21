import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Відносний шлях до src
    },
  },
  // Проксі для локальної розробки: всі запити на /api/ йдуть на Render
  server: {
    proxy: {
      '/api': {
        target: 'https://beckend-auth.onrender.com',
        changeOrigin: true,
        // У деяких середовищах dev-проксі може отримувати 502 через TLS-перевірку
        // Вимикаємо строгий чек сертифіката тільки для локальної розробки
        secure: false,
        timeout: 10000,
        proxyTimeout: 10000,
      },
    },
  },
})
