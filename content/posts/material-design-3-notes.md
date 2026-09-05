---
title: 'Material Design 3：设计令牌速查笔记'
date: 2026-09-02
tags:
  - 设计
  - Material Design
  - 前端
description: '关于 MD3 的 color、shape、type 与 elevation 系统，以及如何用 CSS 变量在明暗主题间切换。'
cover: '/img/covers/cover-md3.svg'
---

Material Design 3（简称 MD3）是 Google 在 2021 年推出的设计语言。和之前几代最大的不同在于：**它不再是一本「照着画」的规范，而是一套可以参数化的系统**。这篇文章是我的学习笔记，记录了最常用的几个设计令牌。

## 色彩系统：一切从「种子色」开始

MD3 的色彩由一个个「角色」（role）组成。你不必记住所有颜色，只需要掌握这组对应关系：

| 角色 | 用途 |
| --- | --- |
| `primary` | 主要操作、选中态 |
| `surface` | 页面与卡片背景 |
| `surface-container-*` | 不同层级的容器背景 |
| `outline` | 描边、分隔 |
| `error` | 错误提示 |
| `inverse-surface` | 代码块这类「反色」区域 |

在 CSS 里，我会把它们声明成变量，再为明暗两套主题各定义一份值：

```css
:root {
  --md-primary: #0061a4;
  --md-surface: #fdfcff;
  --md-on-surface: #1a1c1e;
}

html[data-theme="dark"] {
  --md-primary: #9acaff;
  --md-surface: #121318;
  --md-on-surface: #e2e2e6;
}
```

组件永远只引用变量、不写死颜色，主题切换就变成了一行 JavaScript 的事——给 `<html>` 换一个 `data-theme` 属性。

## 形状：圆角也是有梯度的

MD3 定义了从 `xs`（4px）到 `full`（圆形）一整套圆角刻度。原则是：**越重要的元素圆角越大，越小的元素圆角越小**。

本站的实际取值：

- 卡片：12px（`shape-md`）
- 侧栏信息面板：28px（`shape-xl`）
- 按钮 / 标签：全圆角（胶囊形）

> 圆角统一之后，页面会立刻获得一种「成套」的秩序感。这也是初学者最容易见效的一步。

## 排版与高度

字体方面，MD3 用「Display / Headline / Title / Body / Label」五层字号体系。个人博客不需要全部铺开，我只取用了其中三层：

- Headline：首页大标题、文章标题；
- Body：正文，行高 1.8 左右最舒服；
- Label：标签、日期等次要信息。

阴影（elevation）在 MD3 中分三档，且刻意做得「柔和」——因为它模拟的是环境光，而不是生硬的投影：

```css
--elevation-1: 0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15);
--elevation-2: 0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15);
--elevation-3: 0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15);
```

## 几个实用建议

- 颜色令牌尽量命名成「角色」而非颜色名（比如叫 `surface-container`，而不是 `lightgray`），否则换主题时会改到怀疑人生；
- 动效统一用 `cubic-bezier(0.2, 0, 0, 1)` 这条 MD3 标准缓动曲线，并在 `prefers-reduced-motion` 下关闭动画；
- 拿不准配色时，直接用官方 Material Theme Builder 生成整套令牌，再微调即可。

设计系统不是一次性的「皮肤」，它是让你在日后无数次小改动里都能保持一致的那根定海神针。本站的完整令牌就写在 `static/css/style.css` 开头，欢迎对照阅读。
