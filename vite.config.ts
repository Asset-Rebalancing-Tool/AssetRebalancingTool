import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'


enum BackendHost {
  LOCALHOST_DOCKER = 'http://localhost:8081',
  LOCALHOST_JVM = 'http://localhost:8080',
  NETWORK_DB = 'http://192.168.1.52:8081',
  NETWORK_FETCH = 'http://192.168.1.52:8080'
}

const selectedHost = BackendHost.NETWORK_DB

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/locales/**'
      ),
      runtimeOnly: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    proxy: {
      '/asset_api': {
        target: selectedHost,
        changeOrigin: true,
        secure: false,
      },
      '/auth_api': {
        target: selectedHost,
        changeOrigin: true,
        secure: false,
      },
      '/holding_api': {
        target: selectedHost,
        changeOrigin: true,
        secure: false,
      },
    },
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
          @import "@/assets/scss/theme.scss";
          @import "@/assets/scss/layout.scss";
          @import "@/assets/scss/icon.scss";
        `,
      },
    },
  },
})
