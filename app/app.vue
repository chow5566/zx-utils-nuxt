<script setup lang="ts">
/**
 * 导航菜单项（新增工具页后只需在此数组追加即可）
 */
const toolItems = [
  { label: '身份证号生成', to: '/tools/id-card' },
  { label: 'Base64 加密解密', to: '/tools/base64' },
  { label: 'JSON 格式化', to: '/tools/json-formatter' },
  { label: '字数统计', to: '/tools/char-counter' },
  { label: '文本差异对比', to: '/tools/text-diff' },
  { label: '人名生成器', to: '/tools/name-generator' },
]
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="sticky top-0 z-10 border-b border-(--ui-border)/60 bg-(--ui-bg)/80 backdrop-blur-md">
        <div class="max-w-5xl mx-auto px-4 h-12 sm:h-14 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 text-base sm:text-lg font-bold text-(--ui-text-highlighted) hover:text-(--ui-primary) transition-colors shrink-0"
          >
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-(--ui-primary)/10">
              <UIcon name="i-lucide-zap" class="w-4 h-4 text-(--ui-primary)" />
            </span>
            ZX Utils
          </NuxtLink>

          <nav class="flex items-center gap-0.5 sm:gap-1">
            <UButton
              to="/"
              variant="ghost"
              size="md"
              color="neutral"
              :label="'首页'"
            />

            <!-- 桌面端：完整工具列表 -->
            <template v-for="item in toolItems" :key="item.to">
              <UButton
                :to="item.to"
                variant="ghost"
                size="md"
                color="neutral"
                class="hidden sm:inline-flex"
              >
                {{ item.label }}
              </UButton>
            </template>

            <!-- 移动端：工具下拉菜单 -->
            <UDropdownMenu
              :items="toolItems"
              class="sm:hidden"
            >
              <UButton
                variant="ghost"
                size="md"
                color="neutral"
                trailing-icon="i-lucide-chevron-down"
              >
                工具
              </UButton>
            </UDropdownMenu>

          </nav>
        </div>
      </header>

      <!-- Main -->
      <main class="flex-1">
        <NuxtPage />
      </main>

      <!-- Footer -->
      <footer class="border-t border-(--ui-border)/60 py-5 sm:py-6 mt-12 sm:mt-16">
        <div class="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-(--ui-text-muted)">
          <p>ZX Utils - 免费在线工具集 &copy; {{ new Date().getFullYear() }}</p>
          <div class="flex items-center gap-4">
            <p>所有数据处理均在浏览器本地完成</p>
            <a
              href="https://github.com/chow5566/zx-utils-nuxt"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 hover:text-(--ui-primary) transition-colors"
              aria-label="GitHub"
            >
              <UIcon name="i-lucide-github" class="w-4 h-4" />
              <span class="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  </UApp>
</template>