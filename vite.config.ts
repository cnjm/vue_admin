import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { getProxy } from './build/vite/proxy'
import { __APP_INFO__, OUTPUT_DIR } from './build/config'
import { wrapperEnv, pathResolve } from './build/utils'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const root = process.cwd() + '\\env'
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_APP_PORT, VITE_APP_PUBLIC_PATH, VITE_APP_PROXY, VITE_APP_DROP_CONSOLE } = viteEnv
  const _IS_BUILD = command === 'build'

  return {
    base: VITE_APP_PUBLIC_PATH,
    root,
    envDir: 'env',
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/'
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    server: {
      host: '0.0.0.0',
      port: VITE_APP_PORT,
      proxy: getProxy(VITE_APP_PROXY)
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_APP_DROP_CONSOLE
        }
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    plugins: [vue()]
  }
})
