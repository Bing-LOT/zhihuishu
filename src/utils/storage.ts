/**
 * 本地存储工具函数
 */

/**
 * 存储类型
 */
type StorageType = 'localStorage' | 'sessionStorage'

/**
 * 获取存储对象
 * @param type 存储类型
 */
function getStorage(type: StorageType): Storage {
  return type === 'localStorage' ? localStorage : sessionStorage
}

/**
 * 设置存储项
 * @param key 键
 * @param value 值
 * @param type 存储类型
 */
export function setStorageItem<T>(key: string, value: T, type: StorageType = 'localStorage'): void {
  // TODO: 实现设置存储项逻辑
  const storage = getStorage(type)
  storage.setItem(key, JSON.stringify(value))
}

/**
 * 获取存储项
 * @param key 键
 * @param type 存储类型
 */
export function getStorageItem<T>(key: string, type: StorageType = 'localStorage'): T | null {
  // TODO: 实现获取存储项逻辑
  const storage = getStorage(type)
  const value = storage.getItem(key)
  
  if (!value) return null
  
  try {
    return JSON.parse(value) as T
  } catch {
    return value as T
  }
}

/**
 * 移除存储项
 * @param key 键
 * @param type 存储类型
 */
export function removeStorageItem(key: string, type: StorageType = 'localStorage'): void {
  // TODO: 实现移除存储项逻辑
  const storage = getStorage(type)
  storage.removeItem(key)
}

/**
 * 清空存储
 * @param type 存储类型
 */
export function clearStorage(type: StorageType = 'localStorage'): void {
  // TODO: 实现清空存储逻辑
  const storage = getStorage(type)
  storage.clear()
}

/**
 * 检查存储项是否存在
 * @param key 键
 * @param type 存储类型
 */
export function hasStorageItem(key: string, type: StorageType = 'localStorage'): boolean {
  // TODO: 实现检查存储项逻辑
  const storage = getStorage(type)
  return storage.getItem(key) !== null
}

