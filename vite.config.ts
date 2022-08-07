import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },


  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },

  /**
   * NOTE: All scss files that contains variables, need to be imported globally and separately!
   * Globally because otherwise vite can't resolve the variables
   * Separately because most of the theme scss files that actually contain variables, rely on another
   */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/theme/_appearance.scss";
          @import "@/assets/scss/theme/_color.scss";
          @import "@/assets/scss/theme/_dimension.scss";
          @import "@/assets/scss/theme/_font.scss";
          @import "@/assets/scss/theme/_icon.scss";
          @import "@/assets/scss/styles.scss";
        `,
      },
    },
  },
})
