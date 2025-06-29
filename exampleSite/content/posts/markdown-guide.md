---
title: "Markdown Syntax Guide"
date: 2024-01-10
draft: false
description: "A comprehensive guide to Markdown syntax with examples."
tags: ["markdown", "writing", "documentation"]
categories: ["guides"]
author: "Jane Smith"
---

# Markdown 語法指南

這篇文章展示了 Markdown 的各種語法以及在 Clean Blog 主題中的呈現效果。

## 標題

# H1 標題
## H2 標題
### H3 標題
#### H4 標題
##### H5 標題
###### H6 標題

## 文字格式

**粗體文字** 和 *斜體文字* 以及 ***粗斜體文字***。

你也可以使用 ~~刪除線~~ 文字。

## 列表

### 無序列表

- 項目一
- 項目二
  - 子項目 A
  - 子項目 B
- 項目三

### 有序列表

1. 第一項
2. 第二項
   1. 子項目 A
   2. 子項目 B
3. 第三項

## 連結和圖片

這是一個 [連結到 Hugo 官網](https://gohugo.io/)。

![Hugo Logo](https://gohugo.io/img/hugo-logo.png)

## 引用

> 這是一個引用區塊。
> 
> 引用可以包含多段落。
> 
> — 作者名

## 程式碼

### 內嵌程式碼

使用 `console.log()` 來輸出內容。

### 程式碼區塊

```javascript
function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(`結果是: ${result}`);
```

```css
.highlight {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #007bff;
}
```

## 表格

| 功能       | 描述                   | 狀態 |
| ---------- | ---------------------- | ---- |
| 響應式設計 | 在所有設備上完美顯示   | ✅    |
| 暗色模式   | 支援亮色/暗色/自動模式 | ✅    |
| 搜尋功能   | 客戶端全文搜尋         | ✅    |
| SEO 優化   | Meta 標籤和結構化數據  | ✅    |

## 分隔線

---

## 數學公式

如果啟用了 MathJax 或 KaTeX，你可以使用數學公式：

$E = mc^2$

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## 任務列表

- [x] 完成主題基本功能
- [x] 添加搜尋功能
- [ ] 添加評論系統
- [ ] 添加多語言支援

## 結語

Markdown 是一個強大而簡潔的標記語言，非常適合用來寫作和文檔編寫。Clean Blog 主題完美支援所有 Markdown 語法，讓你的內容看起來既專業又美觀。
