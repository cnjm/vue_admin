/**
 *  由于 vite 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可。
 * https://github.com/anncwb/vite-plugin-style-import/blob/main/README.zh_CN.md
 */
import styleImport from 'vite-plugin-style-import'

export function configStyleImportPlugin(isBuild: boolean) {
  if (!isBuild) {
    return []
  }
  const styleImportPlugin = styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`
        }
      }
    ]
  })
  return styleImportPlugin
}
