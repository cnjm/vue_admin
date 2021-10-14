/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { Plugin } from 'vite'
import html from 'vite-plugin-html'
import pkg from '../../../package.json'
import { GLOB_CONFIG_FILE_NAME } from '../../config'

export function configHtmlPlugin(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_APP_TITLE, VITE_APP_PUBLIC_PATH } = viteEnv

  const path = VITE_APP_PUBLIC_PATH.endsWith('/') ? VITE_APP_PUBLIC_PATH : `${VITE_APP_PUBLIC_PATH}/`

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`
  }

  const htmlPlugin: Plugin[] = html({
    minify: isBuild,
    inject: {
      // 注入ejs模板
      data: {
        title: VITE_APP_TITLE
      },
      // 嵌入生成的app.config.js文件
      tags: isBuild
        ? [
            {
              tag: 'script',
              attrs: {
                src: getAppConfigSrc()
              }
            }
          ]
        : []
    }
  })
  return htmlPlugin
}
