import { ComponentPublicInstance, FunctionalComponent } from 'vue'

declare global {
  type Recordable<T = any> = Record<string, T>
  type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
  // interface ImportMetaEnv extends ViteEnv {
  //   __: string | boolean | undefined
  // }

  interface ViteEnv {
    VITE_APP_PORT: number
    VITE_APP_PUBLIC_PATH: string
    VITE_APP_TITLE: string
    VITE_APP_PROXY: [string, string][]
    VITE_APP_DROP_CONSOLE: boolean
    VITE_APP_SHORT_NAME: string
    VITE_USE_CDN: boolean
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    VITE_USE_PWA: boolean
    VITE_LEGACY: boolean
    VITE_USE_IMAGEMIN: boolean
    VITE_GENERATE_UI: string
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}
