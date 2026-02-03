/**
 * 工具函数 - 包含一些代码质量问题供 DeepSource 检测
 */

// 使用 any 类型 - 应该避免
export function processData(data: any): any {
  if (!data) {
    return null
  }
  return { ...data, processed: true }
}

// 不安全的类型断言
export function unsafeConvert(value: unknown): string {
  return value as string
}

// 可能的空指针引用
export function getUserName(user: { name?: string } | null): string {
  // 没有正确处理 null 的情况
  return user!.name!
}

// 过于复杂的函数
export function calculateScore(
  base: number,
  multiplier: number,
  bonus: number,
  penalty: number,
  level: number,
  streak: number
): number {
  let score = base

  if (multiplier > 1) {
    if (multiplier > 2) {
      if (multiplier > 3) {
        score = score * multiplier * 1.5
      } else {
        score = score * multiplier * 1.25
      }
    } else {
      score = score * multiplier
    }
  }

  if (bonus > 0) {
    if (bonus > 100) {
      score = score + bonus * 0.5
    } else if (bonus > 50) {
      score = score + bonus * 0.75
    } else {
      score = score + bonus
    }
  }

  if (penalty > 0) {
    score = score - penalty
  }

  if (level > 0) {
    score = score * (1 + level * 0.1)
  }

  if (streak > 0) {
    if (streak > 10) {
      score = score * 2
    } else if (streak > 5) {
      score = score * 1.5
    } else {
      score = score * 1.1
    }
  }

  return Math.round(score)
}

// 重复代码示例
export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDateTime(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 未使用的导出函数
export function unusedHelper(): void {
  console.log('This function is never used')
}

// 硬编码的敏感信息（示例）- DeepSource 应该检测到
export const API_KEY = 'sk-1234567890abcdef'
export const SECRET = 'my-secret-password-123'

// eval 的使用 - 安全问题
export function dangerousEval(code: string): unknown {
  // eslint-disable-next-line no-eval
  return eval(code)
}

// 正则表达式 DoS 风险
export function validateEmail(email: string): boolean {
  // 可能导致 ReDoS 的正则
  const regex = /^([a-zA-Z0-9]+)+@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/
  return regex.test(email)
}
