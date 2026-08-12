/**
 * 字数统计工具
 */

export interface CharCountResult {
  /** 总字符数（含空格） */
  chars: number
  /** 字符数（不含空格） */
  charsNoSpace: number
  /** 单词数（英文按空格分词，中文逐字计算后转换为等效词数） */
  words: number
  /** 中文汉字数 */
  chineseChars: number
  /** 英文单词数 */
  englishWords: number
  /** 行数 */
  lines: number
  /** 段落数（按连续两个以上换行分隔） */
  paragraphs: number
  /** UTF-8 字节数 */
  bytes: number
}

/**
 * 统计文本的各项指标
 * @param text - 输入文本
 */
export function countStats(text: string): CharCountResult {
  const trimmed = text ?? ''

  // 总字符数
  const chars = trimmed.length

  // 字符数（不含空格、制表符、换行等空白字符）
  const charsNoSpace = trimmed.replace(/\s/g, '').length

  // 中文汉字数
  const chineseChars = (trimmed.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length

  // 英文单词数（按连续字母序列分词）
  const englishWords = (trimmed.match(/[a-zA-Z]+/g) || []).length

  // 总单词数 = 中文字（每个汉字视为一个词）+ 英文单词
  const words = chineseChars + englishWords

  // 行数（按换行符 \n 计数）
  const lines = trimmed ? trimmed.split('\n').length : 0

  // 段落数（按连续两个及以上换行分隔）
  const paragraphs = trimmed ? trimmed.split(/\n{2,}/).filter(Boolean).length : 0

  // UTF-8 字节数（使用 TextEncoder）
  const bytes = trimmed ? new TextEncoder().encode(trimmed).length : 0

  return {
    chars,
    charsNoSpace,
    words,
    chineseChars,
    englishWords,
    lines,
    paragraphs,
    bytes,
  }
}

/**
 * 保留小数位数
 * @param value - 数值
 * @param digits - 小数位数
 */
export function toFixed(value: number, digits: number): string {
  return value.toFixed(digits)
}
