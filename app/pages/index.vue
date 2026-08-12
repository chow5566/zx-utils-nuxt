<script setup lang="ts">
useSeoMeta({
  title: 'ZX Utils - 在线工具集',
  description: '免费在线工具集，提供身份证号生成、校验等实用工具，简单易用，无需下载。',
  ogTitle: 'ZX Utils - 在线工具集',
  ogDescription: '免费在线工具集，提供身份证号生成、校验等实用工具。',
  ogType: 'website',
})

/** 工具卡片数据：图标、颜色、名称与描述 */
const tools = [
  {
    to: '/tools/id-card',
    icon: 'i-lucide-id-card',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    label: '身份证号生成器',
    desc: '生成符合国标 GB 11643 的合法身份证号，支持省份、性别、出生日期筛选。',
  },
  {
    to: '/tools/base64',
    icon: 'i-lucide-lock',
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-50 dark:bg-amber-950/40',
    label: 'Base64 加密解密',
    desc: '在线 Base64 编码解码工具，支持 Unicode 字符，快速完成文本与 Base64 格式的互相转换。',
  },
  {
    to: '/tools/json-formatter',
    icon: 'i-lucide-braces',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    label: 'JSON 格式化',
    desc: '在线 JSON 校验、美化与压缩工具，支持 2/4 空格缩进，开发者常用工具。',
  },
  {
    to: '/tools/char-counter',
    icon: 'i-lucide-text-cursor-input',
    iconColor: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-50 dark:bg-violet-950/40',
    label: '字数统计',
    desc: '实时统计中文字数、英文单词数、字符数、行数、段落数及 UTF-8 字节数。',
  },
  {
    to: '/tools/name-generator',
    icon: 'i-lucide-user-round-pen',
    iconColor: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-50 dark:bg-rose-950/40',
    label: '人名生成器',
    desc: '在线随机人名生成，支持中文名、网名、英文名，可按性别筛选，适合小说角色取名。',
  },
  {
    to: '/tools/text-diff',
    icon: 'i-lucide-diff',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    label: '文本差异对比',
    desc: '逐行比较两段文本差异，红色/绿色高亮删除与新增行，代码审查利器。',
  },
]
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8 sm:py-16">
    <!-- Hero -->
    <section class="text-center mb-10 sm:mb-20">
      <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-(--ui-primary)/10 mb-6">
        <UIcon name="i-lucide-zap" class="w-8 h-8 sm:w-10 sm:h-10 text-(--ui-primary)" />
      </div>
      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted) mb-4">
        ZX Utils
      </h1>
      <p class="text-base sm:text-lg text-(--ui-text-muted) max-w-xl mx-auto leading-relaxed">
        简洁高效的在线工具集，覆盖日常开发高频场景，即开即用。
      </p>
    </section>

    <!-- 工具列表 -->
    <section>
      <h2 class="text-lg sm:text-xl font-semibold text-(--ui-text-highlighted) mb-5 sm:mb-8">
        全部工具
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <NuxtLink
          v-for="tool in tools"
          :key="tool.to"
          :to="tool.to"
          class="group block rounded-md border border-(--ui-border) bg-(--ui-bg) p-5 sm:p-6
                 hover:border-(--ui-primary)/30 hover:shadow-lg hover:shadow-(--ui-primary)/5
                 hover:-translate-y-0.5 transition-all duration-200"
        >
          <div
            :class="[tool.iconBg, 'inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-md mb-4 transition-transform duration-200 group-hover:scale-110']"
          >
            <UIcon :name="tool.icon" :class="[tool.iconColor, 'w-5 h-5 sm:w-6 sm:h-6']" />
          </div>

          <h3 class="font-semibold text-(--ui-text-highlighted) group-hover:text-(--ui-primary) transition-colors mb-1.5 text-sm sm:text-base">
            {{ tool.label }}
          </h3>
          <p class="text-xs sm:text-sm text-(--ui-text-muted) leading-relaxed">
            {{ tool.desc }}
          </p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>