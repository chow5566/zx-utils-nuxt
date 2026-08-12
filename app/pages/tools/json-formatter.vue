<script setup lang="ts">
/**
 * JSON 格式化 / 校验 / 压缩工具页面
 */
import { useClipboard } from '@vueuse/core'
import { formatJson, minifyJson } from '~/composables/useJsonFormatter'

useSeoMeta({
  title: 'JSON 格式化 - 在线 JSON 校验与美化',
  description: '在线 JSON 格式化校验工具，支持 JSON 美化缩进、压缩、语法校验，开发者常用工具。',
  ogTitle: 'JSON 格式化 - 在线 JSON 校验与美化',
  ogDescription: '在线 JSON 格式化校验工具，支持 JSON 美化缩进、压缩、语法校验。',
  ogType: 'website',
})

const input = ref('')
const output = ref('')
const indentSize = ref(2)
const isValid = ref(false)
const errorMsg = ref('')

const toast = useToast()
const { copy: copyToClipboard } = useClipboard({ legacy: true })

function handleFormat() {
  if (!input.value.trim()) {
    output.value = ''
    isValid.value = false
    errorMsg.value = ''
    return
  }
  const result = formatJson(input.value, indentSize.value)
  output.value = result.output
  isValid.value = result.valid
  errorMsg.value = result.error
}

function handleMinify() {
  if (!input.value.trim()) {
    output.value = ''
    isValid.value = false
    errorMsg.value = ''
    return
  }
  const result = minifyJson(input.value)
  output.value = result.output
  isValid.value = result.valid
  errorMsg.value = result.error
}

function handleClear() {
  input.value = ''
  output.value = ''
  isValid.value = false
  errorMsg.value = ''
}

async function handleCopy(text: string) {
  await copyToClipboard(text)
  toast.add({ title: '复制成功', color: 'success', icon: 'i-lucide-copy-check', duration: 2000 })
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-6 sm:py-10">
    <!-- Breadcrumb -->
    <nav class="text-xs sm:text-sm text-(--ui-text-muted) mb-4 sm:mb-6" aria-label="面包屑导航">
      <NuxtLink to="/" class="hover:text-(--ui-primary) transition-colors">首页</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-(--ui-text-highlighted)">JSON 格式化</span>
    </nav>

    <!-- Page Header -->
    <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
      <div class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-emerald-50 dark:bg-emerald-950/40 shrink-0">
        <UIcon name="i-lucide-braces" class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted)">JSON 格式化 / 校验</h1>
        <p class="text-xs sm:text-sm text-(--ui-text-muted) mt-1">在线 JSON 格式化工具，支持美化缩进、压缩、语法校验，开发者常用工具。</p>
      </div>
    </div>

    <!-- Main Panel -->
    <div class="rounded-md border border-(--ui-border) bg-(--ui-bg) overflow-hidden mb-5">
      <!-- Header -->
      <div class="flex items-center justify-between gap-3 px-5 py-3 border-b border-(--ui-border) bg-(--ui-bg-elevated)/50">
        <h2 class="text-sm sm:text-base font-semibold text-(--ui-text-highlighted)">JSON 编辑</h2>
        <div class="flex items-center gap-2 flex-wrap">
          <USelect
            v-model="indentSize"
            :items="[
              { label: '2 空格', value: 2 },
              { label: '4 空格', value: 4 },
            ]"
            size="xs"
            class="w-24"
          />
          <span
            v-if="isValid"
            class="inline-flex items-center gap-1 text-xs font-medium text-(--ui-success)"
          >
            <span class="i-lucide-circle-check text-sm" />
            正确
          </span>
          <span
            v-else-if="errorMsg"
            class="inline-flex items-center gap-1 text-xs font-medium text-(--ui-error)"
          >
            <span class="i-lucide-circle-alert text-sm" />
            错误
          </span>
          <UButton @click="handleFormat" color="primary" size="xs" class="cursor-pointer">格式化</UButton>
          <UButton @click="handleMinify" variant="outline" size="xs" class="cursor-pointer">压缩</UButton>
          <UButton
            v-show="input"
            @click="handleClear"
            variant="ghost"
            size="xs"
            color="neutral"
            icon="i-lucide-x"
            class="cursor-pointer"
          />
        </div>
      </div>

      <!-- Desktop: side-by-side -->
      <div class="hidden sm:grid sm:grid-cols-2 sm:divide-x sm:divide-(--ui-border)">
        <div class="p-4 sm:p-5">
          <label class="block text-xs font-medium text-(--ui-text-muted) mb-2">输入 JSON</label>
          <UTextarea
            v-model="input"
            placeholder='粘贴 JSON 字符串，例如：{"name":"hello","list":[1,2,3]}'
            class="w-full font-mono text-xs"
            :rows="20"
            :ui="{ base: 'max-h-[70vh] resize-none' }"
          />
        </div>
        <div class="p-4 sm:p-5">
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-medium text-(--ui-text-muted)">
              {{ output ? '格式化结果' : '输出预览' }}
            </label>
            <UButton
              v-show="output"
              @click="handleCopy(output)"
              variant="ghost"
              size="xs"
              color="primary"
              icon="i-lucide-copy"
              class="cursor-pointer"
            />
          </div>
          <UTextarea
            :value="output"
            readonly
            :placeholder="errorMsg || '格式化/压缩后的结果将显示在这里'"
            class="w-full font-mono text-xs"
            :rows="20"
            :ui="{ base: 'max-h-[70vh] resize-none' }"
          />
        </div>
      </div>

      <!-- Mobile: stacked -->
      <div class="sm:hidden p-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-(--ui-text-highlighted) mb-2">输入 JSON</label>
          <UTextarea
            v-model="input"
            placeholder='粘贴 JSON 字符串，例如：{"name":"hello","list":[1,2,3]}'
            class="w-full font-mono text-sm"
            :rows="10"
            autoresize
          />
        </div>
        <div v-if="output" class="pt-4 border-t border-(--ui-border)">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium text-(--ui-text-highlighted)">格式化结果</label>
            <UButton
              @click="handleCopy(output)"
              variant="ghost"
              size="xs"
              color="primary"
              icon="i-lucide-copy"
              class="cursor-pointer"
            />
          </div>
          <UTextarea
            :value="output"
            readonly
            class="w-full font-mono text-sm"
            :rows="10"
            autoresize
          />
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <section class="text-sm text-(--ui-text-muted)">
      <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted) mb-3">关于 JSON</h2>
      <ul class="space-y-2 list-disc list-inside">
        <li><strong class="text-(--ui-text-highlighted)">格式化</strong> — 将压缩 JSON 按缩进美化，便于阅读和调试</li>
        <li><strong class="text-(--ui-text-highlighted)">压缩</strong> — 去除所有空格和换行，减小数据传输体积</li>
        <li><strong class="text-(--ui-text-highlighted)">校验</strong> — 实时检测 JSON 语法错误，定位错误位置</li>
        <li><strong class="text-(--ui-text-highlighted)">安全</strong> — 所有处理在浏览器本地完成，数据不会上传服务器</li>
      </ul>
    </section>
  </div>
</template>
