# Reimilia617 的个人博客

基于 **Hugo** 与 **Material Design 3（MD3）** 的静态个人博客，开箱即用，推送到 GitHub 后由 Actions 自动构建并发布到 GitHub Pages。

## ✨ 功能一览

- 全屏首屏图 + 中央**唯一一行**「与背景取反色」的字幕（`mix-blend-mode: difference`，换背景图无需重新调色）
- 向下滚动进入纵向博客列表；右下角浮现 **搜索 / 深色模式 / 回到顶端** 浮动按钮
- 搜索按钮悬停（触屏为点按）**向左展开**成搜索栏，支持标题/标签/摘要即时检索
- 文章页 **左 30% / 右 70%** 分栏：左侧固定显示 封面 → 标题 → 头像 → 昵称 → GitHub 主页按钮 → 交互按钮（与首页同款搜索/主题/置顶）
- MD3 明暗双主题（跟随系统，可手动切换并记忆），动态圆角、柔和阴影、标准缓动曲线
- 文章标签归档页、上一篇/下一篇导航、404 页、SEO/Open Graph 标签

## 📁 项目结构

```text
.
├── hugo.toml                  # 站点配置 ★ 个性化信息都在这里
├── content/posts/             # 文章（Markdown），日常写作只碰这个目录
├── layouts/                   # 页面模板
│   ├── index.html             # 首页：Hero + 文章列表
│   ├── _default/single.html   # 文章页：三七开布局
│   ├── _default/list.html     # 归档 / 标签页
│   ├── 404.html
│   └── partials/              # 公共部件（搜索、浮动按钮、图标等）
├── static/
│   ├── css/style.css          # MD3 设计系统（色板/形状/阴影全部是变量）
│   ├── js/main.js             # 主题 / 滚动按钮 / 搜索逻辑
│   └── img/                   # hero、头像、文章封面等图片
└── .github/workflows/hugo.yaml  # GitHub Pages 自动部署
```

## 🚀 快速开始

### 1. 本地预览（需要 [Hugo extended](https://gohugo.io/installation/)）

```bash
hugo server -D --disableFastRender
# 打开 http://localhost:1313
```

> 提示：仓库中的 Hugo 版本为 `v0.165.0`，本地安装与之相近的版本即可。

### 2. 写一篇新文章

在 `content/posts/` 下新建 `.md` 文件（也可以复制现有文章再改）。文件头部是 front matter：

```yaml
---
title: '文章标题'
date: 2026-09-05
tags: [随笔, 技术]
description: '一句话摘要，显示在首页卡片'
cover: '/img/covers/cover-hello.svg'   # 封面图，可换自己的图片
---
```

正文用 Markdown 写即可，支持代码块、表格、引用、图片等。

### 3. 部署到 GitHub Pages

1. 把本目录推送到你的仓库（例如 `reimilia617.github.io`）；
2. 进入仓库 **Settings → Pages**，把 **Source** 选为 **GitHub Actions**；
3. 以后每次 `git push`，Actions 都会自动构建并发布，无需手动操作。

```bash
git init
git add .
git commit -m "init blog"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
git push -u origin main
```

## 🎨 个性化修改

打开 `hugo.toml`，改 `[params]` 里的几行即可全局生效：

| 参数 | 作用 |
| --- | --- |
| `author` | 昵称（页脚、文章左侧栏） |
| `github` | 「GitHub 主页」按钮跳转地址 |
| `avatar` | 头像图片路径（替换 `static/img/avatar.svg` 或改路径） |
| `hero` | 首页全屏背景图（替换 `static/img/hero.svg` 或改路径） |
| `heroSubtitle` | 首屏中央唯一一行字幕 |

配色 / 圆角 / 阴影令牌集中在 `static/css/style.css` 顶部两段 `:root` 与 `html[data-theme="dark"]` 变量中，可整体换肤。

## ❓ 常见问题

- **换了自定义域名？** 把 `hugo.toml` 的 `baseURL` 改成你的域名，并在仓库 Pages 设置里绑定即可。
- **图片放哪？** 建议放在 `static/img/` 下，front matter 里写 `/img/你的图片.svg`。
- **更新 Hugo 版本？** 同步修改 `.github/workflows/hugo.yaml` 顶部的 `HUGO_VERSION`。
- **不希望默认的示例文章出现？** 直接删除 `content/posts/` 下除 `_index.md` 外的文件即可。
