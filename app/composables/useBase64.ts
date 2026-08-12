/**
 * Base64 编码/解码工具
 */

/** 字符串转 Base64（支持 Unicode） */
export function encodeBase64(input: string): string {
  if (!input) return ''
  try {
    const bytes = new TextEncoder().encode(input)
    let binary = ''
    bytes.forEach((b) => {
      binary += String.fromCharCode(b)
    })
    return window.btoa(binary)
  } catch {
    return '编码失败：输入内容包含无法处理的字符'
  }
}

/** Base64 转字符串（支持 Unicode） */
export function decodeBase64(input: string): string {
  if (!input) return ''
  try {
    const binary = window.atob(input.trim())
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return new TextDecoder().decode(bytes)
  } catch {
    return '解码失败：请输入有效的 Base64 字符串'
  }
}
