import moment from 'moment'
import pkg from '../../package.json'

const { dependencies, devDependencies, name, version } = pkg
export const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss')
}
export const OUTPUT_DIR = 'dist'

export const GLOB_CONFIG_FILE_NAME = '_app.config.js'
