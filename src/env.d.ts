/// <reference types="vite/client" />

/**
 * 环境变量类型声明
 */

interface ImportMetaEnv {
  /** API 基础 URL */
  readonly VITE_API_BASE_URL: string
  /** SSO 登录地址 */
  readonly VITE_SSO_URL: string
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

