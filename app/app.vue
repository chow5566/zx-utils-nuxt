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
      <header class="sticky top-0 z-10 border-b border-(--ui-border) bg-(--ui-bg)">
        <div class="max-w-5xl mx-auto px-4 h-12 sm:h-14 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="text-base sm:text-lg font-bold text-(--ui-text-highlighted) hover:text-(--ui-primary) transition-colors shrink-0"
          >
            ZX Utils
          </NuxtLink>

          <nav class="flex items-center gap-1 sm:gap-2">
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
      <footer class="border-t border-(--ui-border) py-4 sm:py-6 mt-8 sm:mt-12">
        <div class="max-w-5xl mx-auto px-4 text-center text-xs sm:text-sm text-(--ui-text-muted)">
          <p>ZX Utils - 免费在线工具集 &copy; {{ new Date().getFullYear() }}</p>
        </div>
      </footer>
    </div>
  </UApp>
</template>