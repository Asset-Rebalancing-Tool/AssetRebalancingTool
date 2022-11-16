import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

const isLocalHost = false

enum Host {
  LOCALHOST = 'http://localhost:',
  NETWORK = 'http://192.168.1.52:'
}

// check what proxy to target
function getProxyTarget(port: number): string {
  return (isLocalHost)
    ? Host.LOCALHOST + port
    : Host.NETWORK + port
}

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
        target: getProxyTarget(8081),
        changeOrigin: true,
        secure: false,
      },
      '/auth_api': {
        target: getProxyTarget(8081),
        changeOrigin: true,
        secure: false,
      },
      '/holding_api': {
        target: getProxyTarget(8081),
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
