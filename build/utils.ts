import fs from 'fs'
import { resolve } from 'path'
import dotenv from 'dotenv'
import { ENV_ROOT } from './config'

export function isDevFn(mode: string): boolean {
  return mode === 'development'
}

export function isProdFn(mode: string): boolean {
  return mode === 'production'
}

/**
 * Whether to generate package preview
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true'
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_APP_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_APP_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (error) {
        realName = ''
      }
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script
  console.log('script', script)
  const reg = new RegExp('--mode ([a-z_\\d]+)')
  const result = reg.exec(script as string) as any
  if (result) {
    const mode = result[1] as string
    return ['.env', `.env.${mode}`]
  }
  return ['.env', '.env.production']
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {}
  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(resolve(ENV_ROOT, item)))
      envConfig = { ...envConfig, ...env }
    } catch (e) {
      console.error(`Error in parsing ${item}`, e)
    }
  })
  const reg = new RegExp(`^(${match})`)
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return resolve(process.cwd(), ...dir)
}

export const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir)
}

/**
 * Get the configuration file variable name
 * @param env
 */
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '')
}
