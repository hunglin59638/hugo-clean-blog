---
title: "Getting Started with Clean Blog Theme"
date: 2024-01-15
draft: false
description: "Learn how to set up and customize the Clean Blog theme for Hugo."
tags: ["hugo", "theme", "getting-started"]
categories: ["tutorials"]
author: "John Doe"
---

# 開始使用 Clean Blog 主題

Clean Blog 是一個專為 Hugo 設計的現代化部落格主題，專注於內容的呈現和閱讀體驗。

## 安裝步驟

### 1. 安裝主題

```bash
git submodule add https://github.com/username/clean-blog-theme.git themes/blog
```

### 2. 配置 hugo.toml

```toml
theme = 'blog'

[params]
  author = 'Your Name'
  description = 'Your blog description'
  enableReadingTime = true
  enableWordCount = true
  enableTOC = true
```

### 3. 創建第一篇文章

```bash
hugo new posts/my-first-post.md
```

## 主要功能

### 響應式設計

這個主題在桌面、平板和手機上都有完美的顯示效果。所有元素都經過精心設計，確保在不同螢幕尺寸下都能提供最佳的閱讀體驗。

### 語法高亮

支援多種程式語言的語法高亮：

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("World");
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

### 搜尋功能

點擊導航欄的搜尋圖示，即可開啟全站搜尋功能。支援標題、內容、標籤和分類的搜尋。

## 自訂選項

主題提供了豐富的自訂選項，你可以在 `hugo.toml` 中進行配置：

- 社群媒體連結
- 主題顏色模式
- 閱讀時間顯示
- 字數統計
- 目錄生成

## 結語

Clean Blog 主題讓你能夠專注於寫作，而不需要擔心技術細節。開始創建你的第一篇文章吧！
