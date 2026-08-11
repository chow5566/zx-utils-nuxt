# ZX Utils - 在线工具集

简洁、高效的在线工具集，帮你快速完成日常开发中的各种小任务。

在线地址：[chow5566.github.io/zx-utils-nuxt](https://chow5566.github.io/zx-utils-nuxt)

## 技术栈

- [Nuxt 4](https://nuxt.com/) + [Nuxt UI v4](https://ui.nuxt.com/)
- [Vue 3](https://vuejs.org/) + [Tailwind CSS v4](https://tailwindcss.com/)
- pnpm 包管理

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器 (http://localhost:3000)
pnpm dev

# 构建生产版本
pnpm build

# 生成静态站点
pnpm generate

# 本地预览静态站点
pnpm preview
```

## 部署

项目通过 GitHub Actions 自动部署到 GitHub Pages。

推送代码到 `main` 分支后，Actions 会自动：

1. 安装依赖
2. 生成静态站点 (`pnpm generate`)
3. 部署到 GitHub Pages

如需手动触发部署，在 Actions 页面运行 `Deploy to GitHub Pages` workflow 即可。
