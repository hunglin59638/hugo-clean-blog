---
applyTo: "**"
---

### **1. 總覽 (Overview)**

- **主題定位：** 一個以內容為核心、輕量、快速且響應式的部落格主題。
- **設計哲學：**
  - **簡潔主義 (Minimalism)：** 避免不必要的視覺元素與動畫，讓讀者專注於內容。
  - **內容優先 (Content-First)：** 確保文章內文、標題和程式碼區塊具有絕佳的可讀性。
  - **高效能 (High Performance)：** 最小化 CSS 與 JS 大小，達成極速載入。
  - **響應式設計 (Responsive)：** 在桌面、平板和行動裝置上皆有完美的瀏覽體驗。
- 主題資料夾位置: themes/blog

---

### **2. 設計與風格指南 (Design & Style Guide)**

#### **2.1 色彩配置 (Color Palette)**

主題必須支援亮色 (Light) 與暗色 (Dark) 兩種模式，並使用 CSS 變數實現，以便輕鬆切換與自訂。

- **亮色模式 (Light Mode):**
  - `--bg-color`: `#FFFFFF`
  - `--text-color`: `#212529`
  - `--heading-color`: `#111111`
  - `--link-color`: `#E85D04` (橘色)
  - `--accent-color`: `#E85D04` (橘色)
  - `--code-bg-color`: `#F1F1F1`
- **暗色模式 (Dark Mode):**
  - `--bg-color`: `#1A1A1A`
  - `--text-color`: `#E0E0E0`
  - `--heading-color`: `#FFFFFF`
  - `--link-color`: `#FF9E44` (亮橘色)
  - `--accent-color`: `#FF9E44` (亮橘色)
  - `--code-bg-color`: `#282C34`

#### **2.2 字體 (Typography)**

- **主要字體 (Body & Paragraphs):** 使用系統預設的無襯線字體 (System UI Font Stack) 以達到最佳效能與原生感。
  ```css
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  ```
- **標題字體 (Headings):** 與主要字體相同，但使用較粗的字重 (e.g., `font-weight: 700`)。
- **程式碼字體 (Code):** 使用等寬字體。
  ```css
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
    monospace;
  ```

#### **2.3 佈局 (Layout)**

- **主要佈局：** 單欄式佈局，內容置中。
- **最大寬度：** 內容區域最大寬度應設定為 `800px` 左右，以確保長篇文章的可讀性。
- **間距：** 使用一致的垂直間距和留白，創造呼吸感。

---

### **3. 功能規格 (Functional Specifications)**

#### **3.1 全域元件 (Global Components)**

**3.1.1 導覽列 (Navigation Bar)**

- **位置：** 網頁頂部，可選擇性地設定為「黏性導覽列 (Sticky Nav)」。
- **結構 (左至右):**
  1.  **網站標題 (Site Title):** 點擊後返回首頁 (`/`)。
  2.  **導覽連結 (Nav Links):**
      - `Home`: 連結至首頁 (`/`)。
      - `Categories`: 連結至分類列表頁 (`/categories/`)。
      - `Tags`: 連結至標籤列表頁 (`/tags/`)。
      - `Archives`: 連結至封存頁面，按年份/月份組織文章。
  3.  **功能按鈕 (Action Buttons):**
      - **搜尋按鈕 (Search Icon):** 一個放大鏡圖示。點擊後應彈出一個覆蓋全螢幕的搜尋框 (Modal)。
      - **亮暗模式切換 (Theme Toggle):** 一個太陽/月亮圖示。點擊後立即切換主題顏色，並**必須**使用 `localStorage` 記錄使用者偏好，以便下次訪問時保持設定。
- **響應式行為：** 在螢幕寬度小於 `768px` 時，導覽連結應收合至一個「漢堡選單 (Hamburger Menu)」圖示中。

**3.1.2 頁尾 (Footer)**

- **內容：**
  - Copyright 資訊 (e.g., `© 2023 [網站作者]`)。年份應自動更新。
  - 社群媒體連結圖示 (可透過 `hugo.toml` 設定)。
  - "Powered by Hugo" & "Theme by [主題名稱]"。

#### **3.2 頁面樣板 (Page Templates)**

**3.2.1 首頁 (`layouts/index.html`)**

- 顯示文章列表，按日期降序排列。
- 每篇文章應顯示：
  - 文章標題 (可點擊)
  - 發布日期與最後修改日期
  - 文章摘要 (Summary)
  - 關聯的分類 (Categories) 與標籤 (Tags)
- 應包含分頁功能 (Pagination)。

**3.2.2 單一文章頁 (`layouts/_default/single.html`)**

- **頁首 (Header):**
  - 文章大標題 (`<h1>`)
  - 文章元數據 (Meta Data): 發布日期、作者 (可選)、閱讀時間估計、字數統計。
- **內容 (Content):**
  - 文章內文 (`.Content`)。
  - **程式碼區塊 (Code Blocks):** 必須支援語法高亮。預設使用一個清晰的暗色主題（如 Dracula 或 Monokai）。
  - **圖片 (Images):** 應為響應式 (`max-width: 100%`) 並置中顯示。
- **文章結尾:**
  - 顯示該文章的分類與標籤連結。
  - 社群分享按鈕 (可選，如 Twitter, Facebook, LinkedIn)。
- **目錄 (Table of Contents):** 對於長篇文章，應在側邊或文章開頭自動生成目錄 (ToC)。

**3.2.3 列表頁 (`layouts/_default/list.html`)**

- 用於 `Categories` 和 `Tags` 的總覽頁面。
- 頁面應顯示一個所有詞彙 (Terms) 的列表，並標示每個詞彙下的文章數量。
- 點擊任一詞彙後，進入該詞彙的文章列表頁，格式同首頁。

**3.2.4 封存頁 (`layouts/archives/list.html` 或類似結構)**

- 以時間軸方式展示所有文章。
- 按年份分組，年份下再按月份分組。

#### **3.3 特殊功能 (Special Features)**

**3.3.1 搜尋功能**

- **實作方式：** 採用客戶端搜尋 (Client-side Search)。
- **建議技術：** 使用 [Fuse.js](https://fusejs.io/) 或 [Pagefind](https://pagefind.app/)。Hugo 應在建置時生成一個 `index.json` 檔案供搜尋腳本使用。
- **使用者介面 (UI):**
  - 點擊導覽列的搜尋圖示，彈出一個置中的 Modal 視窗。
  - Modal 內包含一個輸入框。
  - 即時顯示搜尋結果列表（標題與摘要）。
  - 點擊結果可跳轉至該文章。
  - 按 `ESC` 鍵或點擊 Modal 外區域可關閉搜尋視窗。

---

### **4. 技術規格 (Technical Specifications)**

- **Hugo 版本：** 要求使用 Hugo **Extended** 版本 (支援 SCSS)。
- **資產管理 (Asset Management):**
  - **CSS:** 使用 SCSS (`assets/scss/`) 撰寫，並透過 Hugo Pipes 進行編譯、壓縮與加上指紋 (fingerprinting)。
  - **JavaScript:** 放置於 `assets/js/`，同樣使用 Hugo Pipes 進行打包與壓縮。應避免使用 jQuery，優先使用原生 JS。
- **SEO 與元數據：**
  - 自動生成 `<title>` 和 `<meta name="description">`。
  - 支援 Open Graph 和 Twitter Cards 元標籤。
  - 自動生成 `sitemap.xml` 和 `robots.txt`。
- **可配置性 (Configurability):**
  - 主題應能讓使用者透過網站的 `hugo.toml` 進行高度自訂。
  - **可設定項目應包含：**
    - 主選單項目。
    - 社群媒體連結 (如 GitHub, Twitter, LinkedIn)。
    - 亮暗模式的預設選項（`light`, `dark`, `auto`）。
    - 是否啟用閱讀時間估計。
    - 網站作者名稱。
- **內容原型 (`archetypes/default.md`):**

  - 提供一個標準的文章 Markdown 樣板，包含必要的 Front Matter 欄位。

  ```markdown
  ---
  title: "Your Title"
  date: { { .Date } }
  draft: true
  description: "A brief description of your post."
  tags: ["tag1", "tag2"]
  categories: ["category1"]
  ---

  Your content here.
  ```

---

### **5. 預期交付成果 (Expected Deliverables)**

1.  **主題原始碼：** 一個完整的、結構清晰的 Hugo 主題資料夾。
2.  **範例網站 (`exampleSite`):** 一個包含在主題內的 `exampleSite` 資料夾，用於展示所有功能並指導使用者如何設定。
3.  **說明文件 (`README.md`):** 詳細的安裝、設定與使用說明文件。

### **6. 結果測試**

不需要自行測試，開發人員會常駐開啟服務器並測試功能。

```
hugo server --port 1313 --bind 0.0.0.0 -D --disableFastRender --noHTTPCache --ignoreCache
```

### **7. 附註 (Notes)**

若是需要進一步的技術細節或有任何疑問，請參考 Hugo 官方文檔以獲取更多資訊：
https://gohugo.io/documentation/
