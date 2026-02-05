import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/renderer/index.ts'),
      formats: ['es'],
      fileName: 'renderer'
    },
    rollupOptions: {
      external: ['electron']
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/renderer'),
      '@core': resolve(__dirname, 'src/renderer/core'),
      '@components': resolve(__dirname, 'src/renderer/components'),
      '@systems': resolve(__dirname, 'src/renderer/systems'),
      '@assets': resolve(__dirname, 'src/renderer/assets'),
      '@shared': resolve(__dirname, 'src/shared')
    }
  },
  server: {
    port: 3000
  }
})
