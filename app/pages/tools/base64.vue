<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { encodeBase64, decodeBase64 } from '~/composables/useBase64'

useSeoMeta({
  title: 'Base64在线加密解密工具 - 在线Base64编解码',
  description: '在线Base64编码解码工具，支持Unicode字符，快速将文本与Base64格式互相转换，无需下载，即开即用。',
  ogTitle: 'Base64在线加密解密工具 - 在线Base64编解码',
  ogDescription: '在线Base64编码解码工具，支持Unicode字符，快速将文本与Base64格式互相转换。',
  ogType: 'website',
})

const input = ref('')
const output = ref('')
const mode = ref<'encode' | 'decode'>('encode')
const toast = useToast()

const { copy: copyToClipboard } = useClipboard({ legacy: true })

// 根据当前模式实时更新输出
watchEffect(() => {
  if (!input.value) {
    output.value = ''
    return
  }
  output.value = mode.value === 'encode' ? encodeBase64(input.value) : decodeBase64(input.value)
})

function handleSwap() {
  // 将输出作为新输入，切换模式
  if (output.value && !output.value.startsWith('编码失败') && !output.value.startsWith('解码失败')) {
    input.value = output.value
    mode.value = mode.value === 'encode' ? 'decode' : 'encode'
  }
}

function handleClear() {
  input.value = ''
  output.value = ''
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
      <span class="text-(--ui-text-highlighted)">Base64 加密解密</span>
    </nav>

    <h1 class="text-xl sm:text-3xl font-bold text-(--ui-text-highlighted) mb-1 sm:mb-2">
      Base64 在线加密解密工具
    </h1>
    <p class="text-sm sm:text-base text-(--ui-text-muted) mb-6 sm:mb-8">
      在线 Base64 编码解码工具，支持 Unicode 字符，快速将文本与 Base64 格式互相转换。
    </p>

    <!-- 编解码面板 -->
    <UCard class="mb-4 sm:mb-6">
      <template #header>
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted)">
            {{ mode === 'encode' ? 'Base64 编码' : 'Base64 解码' }}
          </h2>
          <div class="flex items-center gap-2">
            <UButton
              :color="mode === 'encode' ? 'primary' : 'neutral'"
              variant="outline"
              size="xs"
              @click="mode = 'encode'"
              class="cursor-pointer"
            >
              编码
            </UButton>
            <UButton
              :color="mode === 'decode' ? 'primary' : 'neutral'"
              variant="outline"
              size="xs"
              @click="mode = 'decode'"
              class="cursor-pointer"
            >
              解码
            </UButton>
          </div>
        </div>
      </template>

      <!-- 桌面端：左右分栏，固定最大高度防止长文本无限撑高 -->
      <div class="hidden sm:grid sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-(--ui-border)">
        <div class="pr-3">
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-xs font-medium text-(--ui-text-muted)">
              {{ mode === 'encode' ? '原始文本' : 'Base64 字符串' }}
            </label>
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
          <UTextarea
            v-model="input"
            :placeholder="mode === 'encode' ? '输入要编码的文本...' : '输入要解码的 Base64 字符串...'"
            class="w-full font-mono text-xs"
            :rows="20"
            :ui="{ base: 'max-h-[70vh] resize-none' }"
          />
        </div>

        <div class="pl-3">
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-xs font-medium text-(--ui-text-muted)">
              {{ mode === 'encode' ? 'Base64 结果' : '解码结果' }}
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
            :placeholder="mode === 'encode' ? '编码结果将显示在这里' : '解码结果将显示在这里'"
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
            <label class="text-sm font-medium text-(--ui-text-highlighted)">
              {{ mode === 'encode' ? '原始文本' : 'Base64 字符串' }}
            </label>
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
          <UTextarea
            v-model="input"
            :placeholder="mode === 'encode' ? '输入要编码的文本...' : '输入要解码的 Base64 字符串...'"
            class="w-full font-mono text-sm"
            :rows="8"
            autoresize
          />
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-sm font-medium text-(--ui-text-highlighted)">
              {{ mode === 'encode' ? 'Base64 结果' : '解码结果' }}
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
            :placeholder="mode === 'encode' ? '编码结果将显示在这里' : '解码结果将显示在这里'"
            class="w-full font-mono text-sm"
            :rows="8"
            autoresize
          />
        </div>
      </div>

      <!-- 快捷操作 -->
      <div class="flex items-center gap-2 mt-4 pt-4 border-t border-(--ui-border)">
        <UButton
          @click="handleSwap"
          variant="outline"
          size="sm"
          color="neutral"
          icon="i-lucide-arrow-left-right"
          :disabled="!output || output.startsWith('编码失败') || output.startsWith('解码失败')"
          class="cursor-pointer"
        >
          交换
        </UButton>
      </div>
    </UCard>

    <!-- 说明 -->
    <section class="mt-6 sm:mt-8 text-sm text-(--ui-text-muted)">
      <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted) mb-3">关于 Base64</h2>
      <p class="mb-3">
        Base64 是一种基于 64 个可打印字符来表示二进制数据的编码方式，常用于在文本协议（如 HTTP、JSON）中传输二进制数据。
      </p>
      <ul class="space-y-1.5 list-disc list-inside">
        <li><strong class="text-(--ui-text-highlighted)">编码</strong> — 将文本或二进制数据转换为 Base64 字符串，便于在网络传输中保持数据完整性</li>
        <li><strong class="text-(--ui-text-highlighted)">解码</strong> — 将 Base64 字符串还原为原始文本或二进制数据</li>
        <li><strong class="text-(--ui-text-highlighted)">Unicode 支持</strong> — 本工具使用 TextEncoder/TextDecoder 处理中文字符，确保编码解码不失真</li>
        <li><strong class="text-(--ui-text-highlighted)">字符集</strong> — Base64 使用 A-Z、a-z、0-9、+、/ 共 64 个字符，末尾用 = 填充</li>
      </ul>
    </section>
  </div>
</template>
