/**
 * JSON 格式化 / 压缩 / 校验工具
 */

export interface JsonResult {
  /** 格式化或压缩后的字符串 */
  output: string
  /** 是否有效 JSON */
  valid: boolean
  /** 解析后的对象（校验成功时） */
  data: unknown | null
  /** 错误信息（校验失败时） */
  error: string
}

/**
 * 格式化 JSON 字符串（美化缩进）
 * @param input - 原始 JSON 字符串
 * @param indentSize - 缩进空格数，默认 2
 */
export function formatJson(input: string, indentSize: number = 2): JsonResult {
  if (!input.trim()) {
    return { output: '', valid: false, data: null, error: '输入为空' }
  }
  try {
    const data = JSON.parse(input)
    return {
      output: JSON.stringify(data, null, indentSize),
      valid: true,
      data,
      error: '',
    }
  } catch (e) {
    return {
      output: input,
      valid: false,
      data: null,
      error: (e as Error).message,
    }
  }
}

/**
 * 压缩 JSON 字符串（去除空格和换行）
 * @param input - 原始 JSON 字符串
 */
export function minifyJson(input: string): JsonResult {
  if (!input.trim()) {
    return { output: '', valid: false, data: null, error: '输入为空' }
  }
  try {
    const data = JSON.parse(input)
    return {
      output: JSON.stringify(data),
      valid: true,
      data,
      error: '',
    }
  } catch (e) {
    return {
      output: input,
      valid: false,
      data: null,
      error: (e as Error).message,
    }
  }
}
