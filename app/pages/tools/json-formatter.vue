<script setup lang="ts">
/**
 * JSON 格式化 / 校验 / 压缩工具页面
 * 提供 JSON 美化缩进、压缩、语法校验功能
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

/** 格式化 JSON */
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

/** 压缩 JSON */
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

/** 清空输入和输出 */
function handleClear() {
  input.value = ''
  output.value = ''
  isValid.value = false
  errorMsg.value = ''
}

/** 复制到剪贴板 */
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
      <span class="text-(--ui-text-highlighted)">JSON 格式化</span>
    </nav>

    <h1 class="text-xl sm:text-3xl font-bold text-(--ui-text-highlighted) mb-1 sm:mb-2">
      JSON 格式化 / 校验
    </h1>
    <p class="text-sm sm:text-base text-(--ui-text-muted) mb-6 sm:mb-8">
      在线 JSON 格式化工具，支持美化缩进、压缩、语法校验，开发者常用工具。
    </p>

    <!-- 格式化面板 -->
    <UCard class="mb-4 sm:mb-6">
      <template #header>
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted)">JSON 编辑</h2>
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
            <!-- 校验状态徽章 -->
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
            <UButton @click="handleFormat" color="primary" size="xs" class="cursor-pointer">
              格式化
            </UButton>
            <UButton @click="handleMinify" variant="outline" size="xs" class="cursor-pointer">
              压缩
            </UButton>
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
      </template>

      <!-- 桌面端：左右分栏 -->
      <div class="hidden sm:grid sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-(--ui-border)">
        <!-- 左：输入 -->
        <div class="pr-3">
          <label class="block text-xs font-medium text-(--ui-text-muted) mb-1.5">输入 JSON</label>
          <UTextarea
            v-model="input"
            placeholder='粘贴 JSON 字符串，例如：{"name":"hello","list":[1,2,3]}'
            class="w-full font-mono text-xs"
            :rows="20"
            :ui="{ base: 'max-h-[70vh] resize-none' }"
          />
        </div>

        <!-- 右：输出 -->
        <div class="pl-3">
          <div class="flex items-center justify-between mb-1.5">
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

      <!-- 移动端：上下布局 -->
      <div class="sm:hidden space-y-3">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-sm font-medium text-(--ui-text-highlighted)">输入 JSON</label>
          </div>
          <UTextarea
            v-model="input"
            placeholder='粘贴 JSON 字符串，例如：{"name":"hello","list":[1,2,3]}'
            class="w-full font-mono text-sm"
            :rows="10"
            autoresize
          />
        </div>

        <div v-if="output" class="pt-3 border-t border-(--ui-border)">
          <div class="flex items-center justify-between mb-1.5">
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
    </UCard>

    <!-- 说明 -->
    <section class="mt-6 sm:mt-8 text-sm text-(--ui-text-muted)">
      <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted) mb-3">关于 JSON</h2>
      <ul class="space-y-1.5 list-disc list-inside">
        <li><strong class="text-(--ui-text-highlighted)">格式化</strong> — 将压缩 JSON 按缩进美化，便于阅读和调试</li>
        <li><strong class="text-(--ui-text-highlighted)">压缩</strong> — 去除所有空格和换行，减小数据传输体积</li>
        <li><strong class="text-(--ui-text-highlighted)">校验</strong> — 实时检测 JSON 语法错误，定位错误位置</li>
        <li><strong class="text-(--ui-text-highlighted)">安全</strong> — 所有处理在浏览器本地完成，数据不会上传服务器</li>
      </ul>
    </section>
  </div>
</template>
