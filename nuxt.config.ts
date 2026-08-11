// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/sitemap'],

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  // 禁用 Google Fonts 相关服务（大陆无法访问）
  fonts: {
    providers: {
      google: false,
      googleicons: false,
    },
  },

  // GitHub Pages 静态部署
  ssr: true,
  app: {
    // 如果是项目页面 (username.github.io/repo-name)，使用 '/repo-name/'
    // 如果是用户页面 (username.github.io)，改为 '/'
    baseURL: process.env.NUXT_APP_BASE_URL || '/zx-utils-nuxt/',
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      concurrency: 1, // Windows 文件锁避免并发写入冲突
    },
  },

  // SEO 全局配置
  site: {
    url: 'https://chow5566.github.io',
    name: 'ZX Utils - 在线工具集',
    description: '免费在线工具集，提供身份证号生成、校验等实用工具',
    defaultLocale: 'zh-CN',
  },

  // robots.txt 配置
  robots: {
    disallow: [],
  },

  // 全局 head 标签
  appHead: {
    htmlAttrs: { lang: 'zh-CN' },
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'baidu-site-verification', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
})
