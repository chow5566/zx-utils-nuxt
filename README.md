# ZX Utils - 在线工具集

简洁、高效的在线工具集，涵盖日常开发高频场景，所有数据处理均在浏览器本地完成，无需下载，即开即用。

在线地址：[chow5566.github.io/zx-utils](https://chow5566.github.io/zx-utils)

## 工具列表

### 🆔 身份证号生成器

生成符合国标 GB 11643-1999 的合法身份证号码，适用于测试数据生成。

- 支持省/市/区三级行政区划级联筛选
- 支持按性别、出生年份范围筛选
- 可批量生成（1-100 条）
- 内置身份证号校验功能
- 数据来源：民政部行政区划代码

### 🔐 Base64 加密解密

在线 Base64 编码解码工具，支持 Unicode 字符。

- 编码/解码模式一键切换
- 实时转换，无需手动触发
- 支持 TextEncoder/TextDecoder，中文不乱码
- 支持输入输出交换

### 📋 JSON 格式化

在线 JSON 校验、美化与压缩工具。

- 格式化美化（支持 2/4 空格缩进）
- 压缩（去除空白字符）
- 实时语法校验，定位错误位置

### 📝 字数统计

实时统计文本的字符数、单词数、行数、段落数、字节数。

- 中文字数 / 英文单词数分别统计
- 含空格与不含空格字符数
- UTF-8 字节数
- 实时更新，无需点击按钮

### 🧑 人名生成器

在线随机人名批量生成，适合小说角色取名、游戏昵称等场景。

- 三种类型：中文名 / 网名 / 英文名
- 支持性别筛选（男/女/随机）
- 点击卡片一键复制
- 换一批重新随机生成

### 🔍 文本差异对比

基于 [diff](https://www.npmjs.com/package/diff) 库实现逐行差异比较。

- 左右分栏展示新旧版本差异
- 绿色高亮新增行，红色高亮删除行
- 统计增删行数
- 支持交换输入文本

## 技术栈

| 类别 | 技术 |
|---|---|
| 框架 | [Nuxt 4](https://nuxt.com/) |
| UI 组件 | [Nuxt UI v4](https://ui.nuxt.com/) |
| 前端 | [Vue 3](https://vuejs.org/) + TypeScript |
| 样式 | [Tailwind CSS v4](https://tailwindcss.com/) |
| 图标 | [Lucide Icons](https://lucide.dev/) |
| 工具库 | [VueUse](https://vueuse.org/) |
| 包管理 | pnpm |
| 部署 | GitHub Pages + GitHub Actions |

## 本地开发

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 开始开发

```bash
# 克隆项目
git clone https://github.com/chow5566/zx-utils-nuxt.git
cd zx-utils-nuxt

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

开发服务器默认运行在 `http://localhost:3000`，支持热更新。

### 构建命令

```bash
# 类型检查
pnpm typecheck

# 生产构建
pnpm build

# 生成静态站点
pnpm generate

# 本地预览静态站点
pnpm preview
```

## 项目结构

```
zx-utils-nuxt/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css          # 全局样式
│   ├── composables/              # 组合式函数（工具核心逻辑）
│   │   ├── useBase64.ts          # Base64 编解码
│   │   ├── useCharCounter.ts     # 字数统计算法
│   │   ├── useIdCard.ts          # 身份证号生成/校验
│   │   ├── useJsonFormatter.ts   # JSON 格式化/压缩
│   │   ├── useNameGenerator.ts   # 人名生成算法
│   │   └── useTextDiff.ts        # 文本差异对比
│   ├── pages/
│   │   ├── index.vue             # 首页
│   │   └── tools/
│   │       ├── base64.vue
│   │       ├── char-counter.vue
│   │       ├── id-card.vue
│   │       ├── json-formatter.vue
│   │       ├── name-generator.vue
│   │       └── text-diff.vue
│   └── app.vue                   # 根组件（导航/布局）
├── public/
│   └── favicon.ico
├── nuxt.config.ts                # Nuxt 配置
├── tsconfig.json
└── package.json
```

## 添加新工具

1. 在 `app/composables/` 下创建工具逻辑文件
2. 在 `app/pages/tools/` 下创建页面文件
3. 在 `app/app.vue` 的 `toolItems` 数组中添加导航项
4. 在 `app/pages/index.vue` 的 `tools` 数组中添加首页卡片

## 部署

项目通过 GitHub Actions 自动部署到 GitHub Pages。

推送代码到 `main` 分支后，Actions 会自动：

1. 安装依赖
2. 生成静态站点 (`pnpm generate`)
3. 部署到 GitHub Pages

如需手动触发，在 Actions 页面运行 `Deploy to GitHub Pages` workflow。

## License

MIT
