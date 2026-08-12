<script setup lang="ts">
/**
 * 文本差异对比工具页面
 * 基于 diff 库实现逐行差异比较，以左右分栏展示 diff 结果
 */
import { useClipboard } from '@vueuse/core'
import { computeDiff, type DiffResult } from '~/composables/useTextDiff'

useSeoMeta({
  title: '文本差异对比 - 在线 Diff 比较工具',
  description: '在线文本差异对比工具，逐行比较两段文本差异，开发者代码审查与文档版本对比利器。',
  ogTitle: '文本差异对比 - 在线 Diff 比较工具',
  ogDescription: '在线文本差异对比工具，逐行比较两段文本差异，代码审查与文档版本对比利器。',
  ogType: 'website',
})

const oldText = ref('')
const newText = ref('')
const diffResult = ref<DiffResult | null>(null)

const toast = useToast()
const { copy: copyToClipboard } = useClipboard({ legacy: true })

/** 执行差异对比 */
function handleCompare() {
  if (!oldText.value.trim() && !newText.value.trim()) {
    diffResult.value = null
    return
  }
  diffResult.value = computeDiff(oldText.value, newText.value)
}

/** 交换两段文本并重新比对 */
function handleSwap() {
  const temp = oldText.value
  oldText.value = newText.value
  newText.value = temp
  handleCompare()
}

/** 清空全部输入输出 */
function handleClear() {
  oldText.value = ''
  newText.value = ''
  diffResult.value = null
}

async function handleCopy(text: string) {
  await copyToClipboard(text)
  toast.add({ title: '复制成功', color: 'success', icon: 'i-lucide-copy-check', duration: 2000 })
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-4 sm:py-8">
    <!-- 面包屑 -->
    <nav class="text-xs sm:text-sm text-(--ui-text-muted) mb-4 sm:mb-6" aria-label="面包屑导航">
      <NuxtLink to="/" class="hover:text-(--ui-primary)">首页</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-(--ui-text-highlighted)">文本差异对比</span>
    </nav>

    <h1 class="text-xl sm:text-3xl font-bold text-(--ui-text-highlighted) mb-1 sm:mb-2">
      文本差异对比
    </h1>
    <p class="text-sm sm:text-base text-(--ui-text-muted) mb-6 sm:mb-8">
      在线逐行比较两段文本差异，适用于代码审查、文档版本对比等场景。
    </p>

    <!-- 输入面板 -->
    <UCard class="mb-4 sm:mb-6">
      <template #header>
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted)">输入文本</h2>
          <div class="flex items-center gap-2">
            <UButton
              @click="handleCompare"
              color="primary"
              size="xs"
              class="cursor-pointer"
            >
              比对
            </UButton>
            <UButton
              @click="handleSwap"
              variant="outline"
              size="xs"
              icon="i-lucide-arrow-left-right"
              :disabled="!oldText && !newText"
              class="cursor-pointer"
            >
              交换
            </UButton>
            <UButton
              v-show="oldText || newText"
              @click="handleClear"
              variant="ghost"
              size="xs"
              color="neutral"
              icon="i-lucide-x"
              class="cursor-pointer"
            />
          </div>
        </div>
      </template>

      <!-- 双列输入：桌面端固定最大高度防撑高，移动端 autoresize -->
      <div class="hidden sm:grid sm:grid-cols-2 sm:gap-4">
        <div>
          <label class="block text-xs font-medium text-(--ui-text-muted) mb-1.5">原始文本（旧版本）</label>
          <UTextarea
            v-model="oldText"
            placeholder="粘贴原始文本..."
            class="w-full font-mono text-xs"
            :rows="16"
            :ui="{ base: 'max-h-[45vh] resize-none' }"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-(--ui-text-muted) mb-1.5">修改后文本（新版本）</label>
          <UTextarea
            v-model="newText"
            placeholder="粘贴修改后的文本..."
            class="w-full font-mono text-xs"
            :rows="16"
            :ui="{ base: 'max-h-[45vh] resize-none' }"
          />
        </div>
      </div>
      <div class="sm:hidden space-y-3">
        <div>
          <label class="block text-sm font-medium text-(--ui-text-highlighted) mb-1.5">原始文本（旧版本）</label>
          <UTextarea
            v-model="oldText"
            placeholder="粘贴原始文本..."
            class="w-full font-mono text-sm"
            :rows="8"
            autoresize
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-(--ui-text-highlighted) mb-1.5">修改后文本（新版本）</label>
          <UTextarea
            v-model="newText"
            placeholder="粘贴修改后的文本..."
            class="w-full font-mono text-sm"
            :rows="8"
            autoresize
          />
        </div>
      </div>
    </UCard>

    <!-- Diff 结果面板 -->
    <UCard v-if="diffResult" class="mb-4 sm:mb-6">
      <template #header>
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted)">对比结果</h2>
          <!-- 统计徽章 -->
          <div class="flex items-center gap-3 text-xs">
            <span class="inline-flex items-center gap-1">
              <span class="inline-block w-2.5 h-2.5 rounded-sm bg-(--ui-success)" />
              +{{ diffResult.stats.additions }}
            </span>
            <span class="inline-flex items-center gap-1">
              <span class="inline-block w-2.5 h-2.5 rounded-sm bg-(--ui-error)" />
              -{{ diffResult.stats.deletions }}
            </span>
          </div>
        </div>
      </template>

      <!-- 桌面端：左右分栏表格 -->
      <div class="hidden sm:block border border-(--ui-border) rounded-lg overflow-hidden">
        <div class="grid grid-cols-2 divide-x divide-(--ui-border)">
          <!-- 左侧（旧版本） -->
          <div>
            <div class="px-3 py-1.5 bg-(--ui-bg-elevated) border-b border-(--ui-border) text-xs font-medium text-(--ui-text-dimmed)">
              旧版本
            </div>
            <div class="font-mono text-xs leading-6 overflow-x-auto">
              <div
                v-for="(line, idx) in diffResult.leftLines"
                :key="'l' + idx"
                :class="[
                  'px-3 py-0.5 whitespace-pre',
                  line.type === 'removed' ? 'bg-red-50 dark:bg-red-950/30 text-(--ui-error)' : '',
                  line.type === 'added' ? 'bg-(--ui-bg)' : '',
                  line.type === 'unchanged' ? 'text-(--ui-text-highlighted)' : '',
                ]"
              >
                <span class="inline-block w-8 text-(--ui-text-dimmed) select-none text-right mr-2">
                  {{ line.oldLineNumber ?? '' }}
                </span>
                {{ line.value || ' ' }}
              </div>
            </div>
          </div>

          <!-- 右侧（新版本） -->
          <div>
            <div class="px-3 py-1.5 bg-(--ui-bg-elevated) border-b border-(--ui-border) text-xs font-medium text-(--ui-text-dimmed)">
              新版本
            </div>
            <div class="font-mono text-xs leading-6 overflow-x-auto">
              <div
                v-for="(line, idx) in diffResult.rightLines"
                :key="'r' + idx"
                :class="[
                  'px-3 py-0.5 whitespace-pre',
                  line.type === 'added' ? 'bg-green-50 dark:bg-green-950/30 text-(--ui-success)' : '',
                  line.type === 'removed' ? 'bg-(--ui-bg)' : '',
                  line.type === 'unchanged' ? 'text-(--ui-text-highlighted)' : '',
                ]"
              >
                <span class="inline-block w-8 text-(--ui-text-dimmed) select-none text-right mr-2">
                  {{ line.newLineNumber ?? '' }}
                </span>
                {{ line.value || ' ' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 移动端：合并视图（用 +、- 图标区分） -->
      <div class="sm:hidden font-mono text-xs leading-6 border border-(--ui-border) rounded-lg overflow-x-auto">
        <div
          v-for="(line, idx) in diffResult.leftLines"
          :key="'m' + idx"
          :class="[
            'px-2 py-0.5 whitespace-pre flex items-start gap-2',
            line.type === 'added' ? 'bg-green-50 dark:bg-green-950/30' : '',
            line.type === 'removed' ? 'bg-red-50 dark:bg-red-950/30' : '',
          ]"
        >
          <!-- 行号 -->
          <span class="inline-block w-6 shrink-0 text-(--ui-text-dimmed) select-none text-right">
            {{ line.oldLineNumber || line.type === 'added' ? diffResult.rightLines[idx]?.newLineNumber ?? '' : '' }}
          </span>
          <!-- 标记 -->
          <span
            :class="[
              'inline-block w-4 shrink-0 text-center font-bold',
              line.type === 'added' ? 'text-(--ui-success)' : '',
              line.type === 'removed' ? 'text-(--ui-error)' : '',
              line.type === 'unchanged' ? 'text-(--ui-text-dimmed)' : '',
            ]"
          >
            {{ line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' ' }}
          </span>
          <span
            :class="[
              'flex-1 break-all',
              line.type === 'removed' ? 'text-(--ui-error)' : '',
              line.type === 'added' ? 'text-(--ui-success)' : '',
              line.type === 'unchanged' ? 'text-(--ui-text-highlighted)' : '',
            ]"
          >
            {{ line.value || line.type === 'added' ? diffResult.rightLines[idx]?.value || '' : '' }}
          </span>
        </div>
      </div>
    </UCard>

    <!-- 说明 -->
    <section class="mt-6 sm:mt-8 text-sm text-(--ui-text-muted)">
      <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted) mb-3">使用说明</h2>
      <ul class="space-y-1.5 list-disc list-inside">
        <li>分别在左侧"原始文本"和右侧"修改后文本"输入框中粘贴两段文本</li>
        <li>点击<strong class="text-(--ui-text-highlighted)">比对</strong>按钮查看逐行差异</li>
        <li><span class="inline-block w-2.5 h-2.5 rounded-sm bg-(--ui-success) align-middle mr-1" /> 绿色背景 = 新增行，<span class="inline-block w-2.5 h-2.5 rounded-sm bg-(--ui-error) align-middle ml-1 mr-1" /> 红色背景 = 删除行</li>
        <li>所有对比计算在浏览器本地完成，数据不会上传服务器</li>
      </ul>
    </section>
  </div>
</template>
