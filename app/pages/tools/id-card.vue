<script setup lang="ts">
import { h } from 'vue'
import { useClipboard } from '@vueuse/core'
import { generateIdCards, validateIdCard, getProvinces, getCitiesByProvince, getCountiesByCity, type IdCardInfo } from '~/composables/useIdCard'

// 初始生成仅在客户端执行，避免 SSR 水合不匹配导致样式丢失
onMounted(() => {
  handleGenerate()
})

useSeoMeta({
  title: '身份证号生成器 - 在线生成合法身份证号',
  description: '在线生成符合国标 GB 11643-1999 的合法身份证号码，支持按省/市/区、性别、出生日期筛选，可用于测试数据生成。',
  ogTitle: '身份证号生成器 - 在线生成合法身份证号',
  ogDescription: '在线生成符合国标 GB 11643-1999 的合法身份证号码，支持按省/市/区、性别、出生日期筛选。',
  ogType: 'website',
})

// 省市区级联数据
const provinces = getProvinces().map(p => ({ label: p.name, value: p.code }))
const cities = ref<{ label: string; value: number }[]>([])
const counties = ref<{ label: string; value: number }[]>([])

// 筛选条件
const selectedProvince = ref<number>()
const selectedCity = ref<number>()
const selectedCounty = ref<number>()
const gender = ref('random')
const startYear = ref(1960)
const endYear = ref(2005)
const count = ref(5)

// 生成结果
const results = ref<IdCardInfo[]>([])

// 按钮反馈状态
const generating = ref(false)
const validating = ref(false)
const toast = useToast()

// 校验
const validateInput = ref('')
const validateResult = ref<{ valid: boolean; message: string } | null>(null)

const genderOptions = [
  { label: '随机', value: 'random' },
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
]

/** 渲染带省略号 + title 提示的单元格 */
function renderCell(getValue: () => unknown) {
  const value = String(getValue() ?? '')
  return h('span', { class: 'truncate block', title: value }, value)
}

// 表格列（固定宽度 + 溢出省略 + hover 显示完整内容）
const columns = [
  { id: 'id', accessorKey: 'id', header: '身份证号', size: 210, meta: { class: { td: 'max-w-0' } }, cell: ({ getValue }: any) => renderCell(getValue) },
  { id: 'province', accessorKey: 'province', header: '省份', size: 80, meta: { class: { td: 'max-w-0' } }, cell: ({ getValue }: any) => renderCell(getValue) },
  { id: 'district', accessorKey: 'district', header: '区县', size: 100, meta: { class: { td: 'max-w-0' } }, cell: ({ getValue }: any) => renderCell(getValue) },
  { id: 'birthDate', accessorKey: 'birthDate', header: '出生日期', size: 110, meta: { class: { td: 'max-w-0' } }, cell: ({ getValue }: any) => renderCell(getValue) },
  { id: 'gender', accessorKey: 'gender', header: '性别', size: 60, meta: { class: { td: 'max-w-0' } }, cell: ({ getValue }: any) => renderCell(getValue) },
  { id: 'actions', accessorKey: 'actions', header: '操作', size: 70, meta: { class: { td: 'max-w-0' } } },
]

// 省份变更 → 更新城市列表，清空城市和区县选择
watch(selectedProvince, (code) => {
  selectedCity.value = undefined
  selectedCounty.value = undefined
  if (code != null) {
    cities.value = getCitiesByProvince(code).map(c => ({ label: c.name, value: c.code }))
  } else {
    cities.value = []
  }
  counties.value = []
})

// 城市变更 → 更新区县列表，清空区县选择
watch(selectedCity, (code) => {
  selectedCounty.value = undefined
  if (code != null) {
    counties.value = getCountiesByCity(code).map(c => ({ label: c.name, value: c.code }))
  } else {
    counties.value = []
  }
})

async function handleGenerate() {
  generating.value = true
  await new Promise(r => setTimeout(r, 200))
  results.value = generateIdCards({
    provinceCode: selectedProvince.value,
    cityCode: selectedCity.value,
    countyCode: selectedCounty.value,
    gender: gender.value as 'male' | 'female' | 'random',
    startYear: startYear.value,
    endYear: endYear.value,
    count: count.value,
  })
  generating.value = false
}

async function handleValidate() {
  if (!validateInput.value.trim()) {
    validateResult.value = { valid: false, message: '请输入身份证号' }
    return
  }
  validating.value = true
  await new Promise(r => setTimeout(r, 150))
  validateResult.value = validateIdCard(validateInput.value.trim())
  validating.value = false
}

// 剪贴板（VueUse，含 HTTP/HTTPS 兼容回退）
const { copy: copyToClipboard } = useClipboard({ legacy: true })

async function handleCopy(text: string) {
  await copyToClipboard(text)
  toast.add({ title: '复制成功', color: 'success', icon: 'i-lucide-copy-check', duration: 2000 })
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-6 sm:py-10">
    <!-- 面包屑 -->
    <nav class="text-xs sm:text-sm text-(--ui-text-muted) mb-4 sm:mb-6" aria-label="面包屑导航">
      <NuxtLink to="/" class="hover:text-(--ui-primary) transition-colors">首页</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-(--ui-text-highlighted)">身份证号生成器</span>
    </nav>

    <!-- 页面头部 -->
    <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-indigo-50 dark:bg-indigo-950/40 shrink-0">
        <UIcon name="i-lucide-id-card" class="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted)">身份证号生成器</h1>
        <p class="text-xs sm:text-sm text-(--ui-text-muted) mt-1">在线生成符合中国国标 GB 11643-1999 的合法身份证号码，支持按省/市/区精确筛选。</p>
      </div>
    </div>

    <!-- 生成设置 -->
    <div class="rounded-md border border-(--ui-border) bg-(--ui-bg) overflow-hidden mb-5">
      <div class="flex items-center justify-between gap-3 px-5 py-3 border-b border-(--ui-border) bg-(--ui-bg-elevated)/50">
        <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted)">生成设置</h2>
        <div class="flex items-center gap-2">
          <span class="hidden sm:inline text-xs text-(--ui-text-muted)">生成数量</span>
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
              :max="100"
              class="w-10 text-center text-sm font-mono border-0 bg-transparent text-(--ui-text-highlighted) outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <UButton
              @click="count < 100 && count++"
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
            :loading="generating"
            class="cursor-pointer"
          >
            生成
          </UButton>
        </div>
      </div>
      <div class="p-4 sm:p-5">
        <div class="space-y-5">
          <!-- 地区 -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-sm font-medium text-(--ui-text-highlighted) mb-1.5">省份</label>
              <USelectMenu
                v-model="selectedProvince"
                :items="provinces"
                value-key="value"
                placeholder="不限"
                clear
                :search-input="{ placeholder: '输入省份名筛选...', icon: 'i-lucide-search' }"
                size="md"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-(--ui-text-highlighted) mb-1.5">城市</label>
              <USelectMenu
                v-model="selectedCity"
                :items="cities"
                value-key="value"
                placeholder="不限"
                clear
                :search-input="{ placeholder: '输入城市名筛选...', icon: 'i-lucide-search' }"
                size="md"
                class="w-full"
                :disabled="!selectedProvince"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-(--ui-text-highlighted) mb-1.5">区县</label>
              <USelectMenu
                v-model="selectedCounty"
                :items="counties"
                value-key="value"
                placeholder="不限"
                clear
                :search-input="{ placeholder: '输入区县名筛选...', icon: 'i-lucide-search' }"
                size="md"
                class="w-full"
                :disabled="!selectedCity"
              />
            </div>
          </div>

          <!-- 人员 -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-sm font-medium text-(--ui-text-highlighted) mb-1.5">性别</label>
              <USelect
                v-model="gender"
                :items="genderOptions"
                size="md"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-(--ui-text-highlighted) mb-1.5">出生年份起</label>
              <UInput
                v-model.number="startYear"
                type="number"
                :min="1900"
                :max="2025"
                size="md"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-(--ui-text-highlighted) mb-1.5">出生年份止</label>
              <UInput
                v-model.number="endYear"
                type="number"
                :min="1900"
                :max="2025"
                size="md"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 生成结果 -->
    <div v-if="results.length" class="rounded-md border border-(--ui-border) bg-(--ui-bg) overflow-hidden mb-5">
      <div class="flex items-center justify-between gap-3 px-5 py-3 border-b border-(--ui-border) bg-(--ui-bg-elevated)/50">
        <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted)">
          生成结果（{{ results.length }} 条）
        </h2>
      </div>
      <div class="p-4 sm:p-5">
        <!-- 桌面端：表格 -->
        <div class="hidden sm:block">
          <UTable :columns="columns" :data="results" :ui="{ td: 'text-highlighted', base: 'table-fixed' }">
            <template #actions-cell="{ row }">
              <UButton
                @click="handleCopy(row.original.id)"
                variant="link"
                size="xs"
                color="primary"
                icon="i-lucide-copy"
                class="cursor-pointer"
              />
            </template>
          </UTable>
        </div>

        <!-- 移动端：卡片列表 -->
        <div class="sm:hidden space-y-3">
          <div
            v-for="(item, idx) in results"
            :key="idx"
            class="border border-(--ui-border) rounded-lg p-3"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-mono text-sm text-(--ui-text-highlighted) break-all">{{ item.id }}</span>
              <UButton
                @click="handleCopy(item.id)"
                variant="ghost"
                size="xs"
                color="primary"
                icon="i-lucide-copy"
                class="shrink-0 cursor-pointer"
              />
            </div>
            <div class="flex items-center gap-2 text-xs text-(--ui-text-muted) flex-wrap">
              <span>{{ item.province }}</span>
              <span class="text-(--ui-border)">·</span>
              <span>{{ item.district }}</span>
              <span class="text-(--ui-border)">·</span>
              <span>{{ item.birthDate }}</span>
              <span class="text-(--ui-border)">·</span>
              <span :class="item.gender === '男' ? 'text-(--ui-info)' : 'text-(--ui-error)'">
                {{ item.gender }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 校验器 -->
    <div class="rounded-md border border-(--ui-border) bg-(--ui-bg) overflow-hidden mb-5">
      <div class="flex items-center justify-between gap-3 px-5 py-3 border-b border-(--ui-border) bg-(--ui-bg-elevated)/50">
        <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted)">身份证号校验</h2>
      </div>
      <div class="p-4 sm:p-5">
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <UInput
            v-model="validateInput"
            placeholder="输入18位身份证号"
            size="md"
            class="flex-1"
            :input-class="'font-mono'"
            @keyup.enter="handleValidate"
          />
          <UButton
            @click="handleValidate"
            color="neutral"
            size="md"
            :loading="validating"
            class="cursor-pointer"
          >
            校验
          </UButton>
        </div>

        <div v-if="validateResult" class="mt-3">
          <span
            :class="validateResult.valid ? 'text-(--ui-success)' : 'text-(--ui-error)'"
            class="text-sm font-medium"
          >
            {{ validateResult.valid ? '✓' : '✗' }} {{ validateResult.message }}
          </span>
        </div>
      </div>
    </div>

    <!-- 说明 -->
    <section class="mt-6 sm:mt-8 text-sm text-(--ui-text-muted)">
      <h2 class="text-base sm:text-lg font-semibold text-(--ui-text-highlighted) mb-3">关于身份证号</h2>
      <p class="mb-3 leading-relaxed">
        中国公民身份证号码共18位，由17位数字本体码和1位校验码组成，排列顺序从左至右依次为：
      </p>
      <ul class="space-y-2 list-disc list-inside">
        <li><strong class="text-(--ui-text-highlighted)">前6位</strong> — 行政区划代码（省、市、区/县），数据来源于民政部</li>
        <li><strong class="text-(--ui-text-highlighted)">第7-14位</strong> — 出生日期码（YYYYMMDD）</li>
        <li><strong class="text-(--ui-text-highlighted)">第15-17位</strong> — 顺序码（奇数分配给男性，偶数分配给女性）</li>
        <li><strong class="text-(--ui-text-highlighted)">第18位</strong> — 校验码，按 ISO 7064:1983 MOD 11-2 算法计算</li>
      </ul>
      <p class="text-xs text-(--ui-text-dimmed) mt-4 leading-relaxed">
        本工具仅用于生成符合格式规范的测试数据，请勿用于任何非法用途。
      </p>
    </section>
  </div>
</template>
