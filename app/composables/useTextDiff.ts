/**
 * 文本差异对比工具
 * 基于 diff 库实现逐行差异比较
 */

import { diffLines, type Change } from 'diff'

export interface DiffLine {
  /** 行文本内容 */
  value: string
  /** 差异类型：added | removed | unchanged */
  type: 'added' | 'removed' | 'unchanged'
  /** 在原文本中的行号（removed / unchanged 时有效） */
  oldLineNumber?: number
  /** 在新文本中的行号（added / unchanged 时有效） */
  newLineNumber?: number
}

export interface DiffResult {
  /** 左侧（旧文本）行数组 */
  leftLines: DiffLine[]
  /** 右侧（新文本）行数组 */
  rightLines: DiffLine[]
  /** 统计信息 */
  stats: {
    additions: number
    deletions: number
    unchanged: number
  }
}

/**
 * 比较两段文本的差异（逐行对比）
 * @param oldText - 旧文本（原始版本）
 * @param newText - 新文本（修改后的版本）
 * @returns 格式化的左右对比行数组及统计
 */
export function computeDiff(oldText: string, newText: string): DiffResult {
  const changes: Change[] = diffLines(oldText, newText)

  const leftLines: DiffLine[] = []
  const rightLines: DiffLine[] = []

  let oldLineNum = 0
  let newLineNum = 0
  let additions = 0
  let deletions = 0
  let unchanged = 0

  for (const change of changes) {
    // 将每个 change 按行拆分（diffLines 返回的 value 末尾可能带 \n）
    const lines = change.value.replace(/\n$/, '').split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const isLast = i === lines.length - 1

      if (change.added) {
        // 新增行：只在右侧显示
        newLineNum++
        rightLines.push({ value: line, type: 'added', newLineNumber: newLineNum })
        leftLines.push({ value: '', type: 'added' })
        additions++
      } else if (change.removed) {
        // 删除行：只在左侧显示
        oldLineNum++
        leftLines.push({ value: line, type: 'removed', oldLineNumber: oldLineNum })
        rightLines.push({ value: '', type: 'removed' })
        deletions++
      } else {
        // 未变更行：两侧同时显示
        oldLineNum++
        newLineNum++
        leftLines.push({ value: line, type: 'unchanged', oldLineNumber: oldLineNum, newLineNumber: newLineNum })
        rightLines.push({ value: line, type: 'unchanged', oldLineNumber: oldLineNum, newLineNumber: newLineNum })
        unchanged++
      }
    }
  }

  return {
    leftLines,
    rightLines,
    stats: { additions, deletions, unchanged },
  }
}
