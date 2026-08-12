<script setup lang="ts">
useSeoMeta({
  title: 'ZX Utils - 在线工具集',
  description: '免费在线工具集，提供身份证号生成、校验等实用工具，简单易用，无需下载。',
  ogTitle: 'ZX Utils - 在线工具集',
  ogDescription: '免费在线工具集，提供身份证号生成、校验等实用工具。',
  ogType: 'website',
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-6 sm:py-12">
    <!-- Hero -->
    <section class="text-center mb-8 sm:mb-16">
      <h1 class="text-2xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-3 sm:mb-4">
        ZX Utils
      </h1>
      <p class="text-sm sm:text-lg text-(--ui-text-muted) max-w-2xl mx-auto px-2">
        简洁、高效的在线工具集，帮你快速完成日常开发中的各种小任务。
      </p>
    </section>

    <!-- 工具列表 -->
    <section>
      <h2 class="text-lg sm:text-xl font-semibold text-(--ui-text-highlighted) mb-4 sm:mb-6">
        全部工具
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <NuxtLink to="/tools/id-card" class="block group">
          <UCard
            variant="outline"
            class="hover:border-(--ui-primary) transition-colors cursor-pointer active:scale-[0.98] h-full"
            :ui="{ root: 'group-hover:shadow-sm transition-shadow' }"
          >
            <template #header>
              <div class="text-2xl sm:text-3xl">🆔</div>
            </template>

            <h3 class="font-semibold text-(--ui-text-highlighted) group-hover:text-(--ui-primary) transition-colors mb-1 text-sm sm:text-base">
              身份证号生成器
            </h3>
            <p class="text-xs sm:text-sm text-(--ui-text-muted)">
              生成符合国标 GB 11643 的合法身份证号，支持省份、性别、出生日期筛选。
            </p>
          </UCard>
        </NuxtLink>

        <NuxtLink to="/tools/base64" class="block group">
          <UCard
            variant="outline"
            class="hover:border-(--ui-primary) transition-colors cursor-pointer active:scale-[0.98] h-full"
            :ui="{ root: 'group-hover:shadow-sm transition-shadow' }"
          >
            <template #header>
              <div class="text-2xl sm:text-3xl">🔐</div>
            </template>

            <h3 class="font-semibold text-(--ui-text-highlighted) group-hover:text-(--ui-primary) transition-colors mb-1 text-sm sm:text-base">
              Base64 加密解密
            </h3>
            <p class="text-xs sm:text-sm text-(--ui-text-muted)">
              在线 Base64 编码解码工具，支持 Unicode 字符，快速完成文本与 Base64 格式的互相转换。
            </p>
          </UCard>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>