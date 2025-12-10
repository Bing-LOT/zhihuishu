/**
 * 验证工具函数
 */

/**
 * 验证邮箱
 * @param email 邮箱地址
 */
export function isValidEmail(email: string): boolean {
  // TODO: 实现邮箱验证逻辑
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证手机号
 * @param phone 手机号
 */
export function isValidPhone(phone: string): boolean {
  // TODO: 实现手机号验证逻辑
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证身份证号
 * @param idCard 身份证号
 */
export function isValidIdCard(idCard: string): boolean {
  // TODO: 实现身份证号验证逻辑
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegex.test(idCard)
}

/**
 * 验证 URL
 * @param url URL 地址
 */
export function isValidUrl(url: string): boolean {
  // TODO: 实现 URL 验证逻辑
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证密码强度
 * @param password 密码
 * @returns 强度等级（0-3）
 */
export function checkPasswordStrength(password: string): number {
  // TODO: 实现密码强度验证逻辑
  let strength = 0
  
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++
  
  return Math.min(strength, 3)
}

/**
 * 验证文件类型
 * @param file 文件对象
 * @param allowedTypes 允许的文件类型
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  // TODO: 实现文件类型验证逻辑
  const fileType = file.type
  const fileName = file.name
  const fileExt = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
  
  return allowedTypes.some(type => {
    if (type.startsWith('.')) {
      return fileExt === type.substring(1)
    }
    return fileType.includes(type)
  })
}

/**
 * 验证文件大小
 * @param file 文件对象
 * @param maxSize 最大大小（MB）
 */
export function isValidFileSize(file: File, maxSize: number): boolean {
  // TODO: 实现文件大小验证逻辑
  const fileSizeMB = file.size / 1024 / 1024
  return fileSizeMB <= maxSize
}

