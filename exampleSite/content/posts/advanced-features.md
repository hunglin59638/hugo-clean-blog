---
title: "Advanced Features"
date: 2024-01-05
draft: false
description: "Explore the advanced features of Clean Blog theme including search, dark mode, and customization options."
tags: ["features", "customization", "advanced"]
categories: ["tutorials", "features"]
author: "John Doe"
---

# 進階功能探索

Clean Blog 主題不僅提供基本的部落格功能，還包含許多進階特性來提升使用者體驗。

## 搜尋功能

### 客戶端搜尋

主題內建了基於 Fuse.js 的客戶端搜尋功能：

- 即時搜尋結果
- 模糊搜尋支援
- 搜尋標題、內容、標籤和分類
- 鍵盤快捷鍵支援

### 使用方法

1. 點擊導航欄的搜尋圖示
2. 輸入關鍵字
3. 即時查看搜尋結果
4. 按 ESC 鍵關閉搜尋視窗

## 主題切換

### 三種模式

主題支援三種顏色模式：

1. **亮色模式**：適合白天閱讀
2. **暗色模式**：適合夜間閱讀，保護眼睛
3. **自動模式**：根據系統設定自動切換

### 使用 localStorage

使用者的主題偏好會自動儲存在瀏覽器中，下次訪問時會自動載入。

## 目錄功能

### 自動生成

對於長篇文章，主題會自動生成目錄：

```yaml
# 在 hugo.toml 中配置
[params]
  enableTOC = true

[markup.tableOfContents]
  startLevel = 2
  endLevel = 4
```

### 智能高亮

當使用者滾動頁面時，目錄會自動高亮當前閱讀的章節。

## 社群分享

### 內建分享按鈕

每篇文章都包含社群分享按鈕：

- Twitter
- Facebook  
- LinkedIn

### 自訂分享內容

分享時會自動包含文章標題和描述，以及正確的 URL。

## SEO 優化

### Meta 標籤

主題自動生成完整的 Meta 標籤：

```html
<!-- 自動生成 -->
<meta name="description" content="文章描述">
<meta property="og:title" content="文章標題">
<meta property="og:description" content="文章描述">
<meta name="twitter:card" content="summary">
```

### 結構化數據

支援 JSON-LD 結構化數據，提升搜尋引擎理解。

## 效能最佳化

### 資源壓縮

- CSS 和 JavaScript 自動壓縮
- 圖片響應式載入
- 字體優化載入

### 快取策略

- 靜態資源版本控制
- CDN 友好的資源路徑
- 瀏覽器快取最佳化

## 自訂選項

### 配置參數

```toml
[params]
  # 作者資訊
  author = "Your Name"
  description = "Your blog description"
  
  # 功能開關
  enableReadingTime = true
  enableWordCount = true
  enableTOC = true
  
  # 社群媒體
  [params.social]
    github = "username"
    twitter = "username" 
    linkedin = "username"
    email = "email@example.com"
```

### 自訂 CSS

你可以通過覆蓋 CSS 變數來自訂主題外觀：

```css
:root {
  --accent-color: #your-color;
  --bg-color: #your-bg-color;
  --text-color: #your-text-color;
}
```

## 響應式設計

### 斷點設計

主題使用移動優先的響應式設計：

- 手機：< 768px
- 平板：768px - 1024px  
- 桌面：> 1024px

### 觸控優化

所有互動元素都針對觸控設備進行了優化，確保在手機和平板上有良好的使用體驗。

## 無障礙支援

### ARIA 標籤

所有互動元素都包含適當的 ARIA 標籤：

```html
<button aria-label="搜尋" class="search-button">
<nav aria-label="主導航" class="main-nav">
```

### 鍵盤導航

支援完整的鍵盤導航，確保使用輔助技術的使用者也能正常使用。

## 結語

這些進階功能讓 Clean Blog 不僅僅是一個簡單的主題，而是一個功能完整的部落格解決方案。每個功能都經過精心設計，確保在提供強大功能的同時保持簡潔和高效能。
