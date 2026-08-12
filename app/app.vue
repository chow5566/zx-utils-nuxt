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
            <UButton
              to="/tools/id-card"
              variant="ghost"
              size="md"
              color="neutral"
            >
              <span class="hidden sm:inline">身份证号生成</span>
              <span class="sm:hidden">身份证</span>
            </UButton>
            <UButton
              to="/tools/base64"
              variant="ghost"
              size="md"
              color="neutral"
            >
              <span class="hidden sm:inline">Base64</span>
              <span class="sm:hidden">Base64</span>
            </UButton>
            <UButton
              to="/tools/json-formatter"
              variant="ghost"
              size="md"
              color="neutral"
            >
              <span class="hidden sm:inline">JSON 格式化</span>
              <span class="sm:hidden">JSON</span>
            </UButton>
            <UButton
              to="/tools/char-counter"
              variant="ghost"
              size="md"
              color="neutral"
            >
              <span class="hidden sm:inline">字数统计</span>
              <span class="sm:hidden">字数</span>
            </UButton>
            <UButton
              to="/tools/text-diff"
              variant="ghost"
              size="md"
              color="neutral"
            >
              <span class="hidden sm:inline">文本对比</span>
              <span class="sm:hidden">Diff</span>
            </UButton>
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