import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/preload/preload.ts'),
      formats: ['cjs'],
      fileName: 'preload'
    },
    rollupOptions: {
      external: ['electron']
    }
  },
  resolve: {
    alias: {
      '@shared': resolve(__dirname, 'src/shared')
    }
  }
})
