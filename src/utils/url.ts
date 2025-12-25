/**
 * URL 相关工具函数
 */

/**
 * 从 URL 中获取查询参数
 * @param name 参数名
 * @param url 可选，默认为当前页面URL
 * @returns 参数值，不存在则返回 null
 */
export function getUrlParam(name: string, url?: string): string | null {
  const targetUrl = url || window.location.href
  const urlObj = new URL(targetUrl)
  return urlObj.searchParams.get(name)
}

/**
 * 从 URL 中获取所有查询参数
 * @param url 可选，默认为当前页面URL
 * @returns 参数对象
 */
export function getAllUrlParams(url?: string): Record<string, string> {
  const targetUrl = url || window.location.href
  const urlObj = new URL(targetUrl)
  const params: Record<string, string> = {}
  
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value
  })
  
  return params
}

/**
 * 设置 URL 参数（不刷新页面）
 * @param name 参数名
 * @param value 参数值
 */
export function setUrlParam(name: string, value: string): void {
  const url = new URL(window.location.href)
  url.searchParams.set(name, value)
  window.history.replaceState({}, '', url.toString())
}

/**
 * 移除 URL 参数（不刷新页面）
 * @param name 参数名
 */
export function removeUrlParam(name: string): void {
  const url = new URL(window.location.href)
  url.searchParams.delete(name)
  window.history.replaceState({}, '', url.toString())
}

