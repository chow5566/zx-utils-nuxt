<script setup lang="ts">
/**
 * 字数统计工具页面
 * 实时统计文本的字符数、单词数、行数、字节数等指标
 */
import { countStats, type CharCountResult } from '~/composables/useCharCounter'

useSeoMeta({
  title: '字数统计 - 在线字符/单词/行数统计工具',
  description: '在线字数统计工具，实时统计中文字数、英文单词数、字符数、行数、段落数、字节数。',
  ogTitle: '字数统计 - 在线字符/单词/行数统计工具',
  ogDescription: '在线字数统计工具，实时统计中文字数、英文单词数、字符数、行数、段落数、字节数。',
  ogType: 'website',
})

const input = ref('')
const stats = ref<CharCountResult>({
  chars: 0,
  charsNoSpace: 0,
  words: 0,
  chineseChars: 0,
  englishWords: 0,
  lines: 0,
  paragraphs: 0,
  bytes: 0,
})

watchEffect(() => {
  stats.value = countStats(input.value)
})

function handleClear() {
  input.value = ''
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-6 sm:py-10">
    <!-- Breadcrumb -->
    <nav class="text-xs sm:text-sm text-(--ui-text-muted) mb-4 sm:mb-6" aria-label="面包屑导航">
      <NuxtLink to="/" class="hover:text-(--ui-primary) transition-colors">首页</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-(--ui-text-highlighted)">字数统计</span>
    </nav>

    <!-- Page Header -->
    <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
      <div class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-violet-50 dark:bg-violet-950/40 shrink-0">
        <UIcon name="i-lucide-text-cursor-input" class="w-5 h-5 sm:w-6 sm:h-6 text-violet-600 dark:text-violet-400" />
      </div>
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted)">字数统计</h1>
        <p class="text-xs sm:text-sm text-(--ui-text-muted) mt-1">在线字数统计工具，实时统计文本的字符数、单词数、行数、段落数、字节数等指标。</p>
      </div>
    </div>

    <!-- Input Panel -->
    <div class="rounded-md border border-(--ui-border) bg-(--ui-bg) overflow-hidden mb-5">
      <div class="flex items-center justify-between gap-3 px-5 py-3 border-b border-(--ui-border) bg-(--ui-bg-elevated)/50">
        <h2 class="text-sm sm:text-base font-semibold text-(--ui-text-highlighted)">文本输入</h2>
        <UButton
          v-show="input"
          @click="handleClear"
          variant="ghost"
          size="xs"
          color="neutral"
          icon="i-lucide-x"
          class="cursor-pointer"
        >
          清空
        </UButton>
      </div>
      <div class="p-4 sm:p-5">
        <UTextarea
          v-model="input"
          placeholder="输入或粘贴文本，实时查看统计结果..."
          class="w-full text-sm"
          :rows="8"
          autoresize
        />
      </div>
    </div>

    <!-- Stats Panel -->
    <div class="rounded-md border border-(--ui-border) bg-(--ui-bg) overflow-hidden mb-5">
      <div class="flex items-center gap-3 px-5 py-3 border-b border-(--ui-border) bg-(--ui-bg-elevated)/50">
        <h2 class="text-sm sm:text-base font-semibold text-(--ui-text-highlighted)">统计结果</h2>
      </div>
      <div class="p-4 sm:p-5">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div class="rounded-lg border border-(--ui-border) p-3 sm:p-4 text-center">
            <div class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted) font-mono tabular-nums">
              {{ stats.chars.toLocaleString() }}
            </div>
            <div class="text-xs text-(--ui-text-muted) mt-1">总字符数</div>
          </div>
          <div class="rounded-lg border border-(--ui-border) p-3 sm:p-4 text-center">
            <div class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted) font-mono tabular-nums">
              {{ stats.charsNoSpace.toLocaleString() }}
            </div>
            <div class="text-xs text-(--ui-text-muted) mt-1">字符数（无空格）</div>
          </div>
          <div class="rounded-lg border border-(--ui-border) p-3 sm:p-4 text-center">
            <div class="text-xl sm:text-2xl font-bold text-(--ui-primary) font-mono tabular-nums">
              {{ stats.words.toLocaleString() }}
            </div>
            <div class="text-xs text-(--ui-text-muted) mt-1">总词数</div>
          </div>
          <div class="rounded-lg border border-(--ui-border) p-3 sm:p-4 text-center">
            <div class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted) font-mono tabular-nums">
              {{ stats.lines.toLocaleString() }}
            </div>
            <div class="text-xs text-(--ui-text-muted) mt-1">行数</div>
          </div>
          <div class="rounded-lg border border-(--ui-border) p-3 sm:p-4 text-center">
            <div class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted) font-mono tabular-nums">
              {{ stats.chineseChars.toLocaleString() }}
            </div>
            <div class="text-xs text-(--ui-text-muted) mt-1">中文字数</div>
          </div>
          <div class="rounded-lg border border-(--ui-border) p-3 sm:p-4 text-center">
            <div class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted) font-mono tabular-nums">
              {{ stats.englishWords.toLocaleString() }}
            </div>
            <div class="text-xs text-(--ui-text-muted) mt-1">英文单词数</div>
          </div>
          <div class="rounded-lg border border-(--ui-border) p-3 sm:p-4 text-center">
            <div class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted) font-mono tabular-nums">
              {{ stats.paragraphs.toLocaleString() }}
            </div>
            <div class="text-xs text-(--ui-text-muted) mt-1">段落数</div>
          </div>
          <div class="rounded-lg border border-(--ui-border) p-3 sm:p-4 text-center">
            <div class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted) font-mono tabular-nums">
              {{ stats.bytes.toLocaleString() }}
            </div>
            <div class="text-xs text-(--ui-text-muted) mt-1">字节数 (UTF-8)</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <section class="text-sm text-(--ui-text-muted)">
      <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted) mb-3">统计说明</h2>
      <ul class="space-y-2 list-disc list-inside">
        <li><strong class="text-(--ui-text-highlighted)">总字符数</strong> — 所有字符的数量，包括空格和换行</li>
        <li><strong class="text-(--ui-text-highlighted)">字符数（无空格）</strong> — 去除空格、制表符、换行后的字符数</li>
        <li><strong class="text-(--ui-text-highlighted)">总词数</strong> — 中文每个汉字计为 1 词，英文按连续字母串分词</li>
        <li><strong class="text-(--ui-text-highlighted)">字节数</strong> — 文本的 UTF-8 编码字节大小</li>
        <li><strong class="text-(--ui-text-highlighted)">段落数</strong> — 按连续两个及以上空行分隔的段落数量</li>
      </ul>
    </section>
  </div>
</template>
