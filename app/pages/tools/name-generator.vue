<script setup lang="ts">
/**
 * 人名生成器页面
 * 支持中文名、网名、英文名三种类型批量生成
 */
import { useClipboard } from '@vueuse/core'
import { generateNames, type NameType, type NameResult } from '~/composables/useNameGenerator'

useSeoMeta({
  title: '人名生成器 - 在线随机姓名/网名生成工具',
  description: '在线随机人名生成器，支持中文名、英文名、网名生成，可按性别筛选，适合小说角色命名、游戏取名等场景。',
  ogTitle: '人名生成器 - 在线随机姓名/网名生成工具',
  ogDescription: '在线随机人名生成器，支持中文名、英文名、网名生成，可按性别筛选。',
  ogType: 'website',
})

// 名字类型 Tab
const nameTypes: { label: string; value: NameType }[] = [
  { label: '中文名', value: 'chinese' },
  { label: '网名', value: 'nickname' },
  { label: '英文名', value: 'english' },
]

const activeType = ref<NameType>('chinese')
const gender = ref<'male' | 'female' | 'random'>('random')
const count = ref(10)
const results = ref<NameResult[]>([])

const toast = useToast()
const { copy: copyToClipboard } = useClipboard({ legacy: true })

// 性别选项（网名不显示性别）
const genderOptions = [
  { label: '随机', value: 'random' },
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
]

const showGender = computed(() => activeType.value !== 'nickname')

// 初始生成仅在客户端执行，避免 SSR 水合不匹配（Math.random 在服务端/客户端结果不同）
onMounted(() => {
  handleGenerate()
})

// 类型/性别/数量变更时重新生成
watch([activeType, gender, count], () => {
  handleGenerate()
})

function handleGenerate() {
  results.value = generateNames(activeType.value, count.value, gender.value)
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
      <span class="text-(--ui-text-highlighted)">人名生成器</span>
    </nav>

    <h1 class="text-xl sm:text-3xl font-bold text-(--ui-text-highlighted) mb-1 sm:mb-2">
      人名生成器
    </h1>
    <p class="text-sm sm:text-base text-(--ui-text-muted) mb-6 sm:mb-8">
      在线随机人名生成工具，支持中文名、网名、英文名批量生成，适合小说角色、游戏取名等场景。
    </p>

    <!-- 生成面板 -->
    <UCard class="mb-4 sm:mb-6">
      <template #header>
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted)">名字生成</h2>
          <div class="flex items-center gap-2">
            <span class="hidden sm:inline text-xs text-(--ui-text-muted)">数量</span>
            <div class="inline-flex items-center rounded-md ring-1 ring-(--ui-border-accented)">
              <UButton
                @click="count > 1 && count--"
                variant="ghost"
                size="xs"
                icon="i-lucide-minus"
                color="neutral"
                class="rounded-r-none px-1.5"
              />
              <input
                v-model.number="count"
                type="number"
                :min="1"
                :max="50"
                class="w-10 text-center text-sm font-mono border-0 bg-transparent text-(--ui-text-highlighted) outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <UButton
                @click="count < 50 && count++"
                variant="ghost"
                size="xs"
                icon="i-lucide-plus"
                color="neutral"
                class="rounded-l-none px-1.5"
              />
            </div>
            <UButton
              @click="handleGenerate"
              color="primary"
              size="sm"
              class="cursor-pointer"
            >
              换一批
            </UButton>
          </div>
        </div>
      </template>

      <!-- 类型 Tab + 性别筛选 -->
      <div class="flex items-center gap-3 flex-wrap mb-4">
        <div class="inline-flex rounded-md ring-1 ring-(--ui-border-accented) p-0.5">
          <button
            v-for="nt in nameTypes"
            :key="nt.value"
            @click="activeType = nt.value"
            :class="[
              'px-3 py-1 text-xs font-medium rounded-sm transition-colors cursor-pointer',
              activeType === nt.value
                ? 'bg-(--ui-primary) text-white'
                : 'text-(--ui-text-muted) hover:text-(--ui-text-highlighted)',
            ]"
          >
            {{ nt.label }}
          </button>
        </div>

        <USelect
          v-if="showGender"
          v-model="gender"
          :items="genderOptions"
          size="xs"
          class="w-20"
        />
      </div>

      <!-- 生成结果网格 -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        <div
          v-for="(item, idx) in results"
          :key="idx"
          class="group relative flex items-center justify-between gap-1 rounded-lg border border-(--ui-border) px-3 py-2.5 hover:border-(--ui-primary) transition-colors cursor-pointer"
          @click="handleCopy(item.name)"
        >
          <span
            :class="[
              'font-medium truncate',
              item.type === 'chinese' ? 'text-sm' : '',
              item.type === 'nickname' ? 'text-sm text-(--ui-primary)' : '',
              item.type === 'english' ? 'text-xs' : '',
            ]"
          >
            {{ item.name }}
          </span>
          <span class="hidden sm:inline-flex shrink-0 text-(--ui-primary) opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="i-lucide-copy text-xs" />
          </span>
          <!-- 移动端始终显示复制图标 -->
          <span class="sm:hidden shrink-0 text-(--ui-text-dimmed)">
            <span class="i-lucide-copy text-xs" />
          </span>
        </div>
      </div>
    </UCard>

    <!-- 说明 -->
    <section class="mt-6 sm:mt-8 text-sm text-(--ui-text-muted)">
      <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted) mb-3">生成说明</h2>
      <ul class="space-y-1.5 list-disc list-inside">
        <li><strong class="text-(--ui-text-highlighted)">中文名</strong> — 基于 Top 100 常见姓氏 + 常用名用字组合，支持性别筛选，约 70% 概率生成双名</li>
        <li><strong class="text-(--ui-text-highlighted)">网名</strong> — 形容词 + 名词随机组合，偶尔附带表情符号后缀，适合社交平台用户名</li>
        <li><strong class="text-(--ui-text-highlighted)">英文名</strong> — 常见英文 First Name + Last Name 组合，支持性别筛选</li>
        <li><strong class="text-(--ui-text-highlighted)">操作</strong> — 点击任意名字卡片即可复制到剪贴板，点击「换一批」重新随机生成</li>
      </ul>
    </section>
  </div>
</template>
