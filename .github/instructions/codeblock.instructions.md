### Hugo 程式碼區塊樣式客製化規格書 (Specification for AI Assistant)

**文件版本：** 1.0
**目標：** 指導 AI 使用 Hugo 的原生功能 (Render Hooks) 來客製化 Markdown 程式碼區塊的 HTML 結構與樣式。

#### 1. 摘要 (Abstract)

本規格書定義了在 Hugo 專案中修改程式碼區塊外觀的標準作業程序。**核心原則是：所有結構性的 HTML 修改必須在伺服器端（Hugo 建置時）完成，嚴格禁止使用客戶端 JavaScript 在頁面載入後才動態修改 DOM 結構來添加元素（如語言標籤）。** 唯一的例外是功能性的互動，例如「複製到剪貼簿」按鈕的點擊事件。

#### 2. 背景知識：Hugo 如何處理程式碼

1.  **來源**：開發者在 Markdown 檔案中使用程式碼圍欄 (Code Fences) 編寫程式碼。
    ````markdown
    ```python
    print("Hello, Hugo!")
    ```
    ````
2.  **處理流程**：
    - Hugo 在建置網站時，其內建的 Markdown 處理器 **Goldmark** 會解析這段 Markdown。
    - Goldmark 辨識出這是一個程式碼區塊，並將其交給語法高亮引擎 **Chroma** 處理。
    - Chroma 根據指定的語言 (`python`)，產生帶有 `<span>` 標籤的、用於上色的 HTML。
    - 最終，Hugo 預設會輸出類似以下的 HTML 結構：
      ```html
      <div class="highlight">
        <pre
          tabindex="0"
          style="color:#f8f8f2;background-color:#272822;"
        ><code><span style="display:flex;"><span><span style="color:#66d9ef">print</span>(<span style="color:#e6db74">"Hello, Hugo!"</span>)
      </span></span></code></pre>
      </div>
      ```
3.  **問題點**：這個預設的 HTML 結構非常精簡，沒有包含語言名稱的獨立元素，因此無法單純用 CSS 來做出語言標籤。

#### 3. 正確的解決方案：Render Hooks

1.  **定義**：Render Hooks 是 Hugo 提供的一種強大機制，它允許我們用自訂的模板檔案來「覆蓋」Markdown 元素的預設渲染行為。
2.  **目標檔案**：針對程式碼區塊，我們需要建立並編輯 `layouts/_default/_markup/render-codeblock.html`。當這個檔案存在時，Hugo 會用它來渲染所有的程式碼區塊，而不再使用預設的行為。
3.  **可用變數 (Context)**：在這個模板檔案中，我們可以存取以下重要的變數：
    - `.Inner`：字串類型，包含程式碼區塊內的原始、未經處理的程式碼。
    - `.Options`：一個 Map 物件，包含所有在程式碼圍欄 ` ``` ` 後方定義的選項。例如 ` ```python {linenos=true,hl_lines=[1,"4-5"]} `，`.Options` 就會包含 `lang: "python"`, `linenos: true` 等資訊。我們最常用的是 `.Options.lang` 來獲取語言名稱。
    - `.Page`：當前頁面的所有變數。
    - `highlight` 函式：這是 Hugo 內建的函式，等同於呼叫 Chroma 引擎。我們必須手動呼叫它 `highlight .Inner .Options.lang .Options` 來產生高亮後的 HTML。

#### 4. 實作目標與需求 (Implementation Goals & Requirements)

1.  **HTML 結構**：最終生成的 HTML 必須是一個包裹性的父層 `<div>`，內部包含：

    - 一個用於顯示語言名稱的元素（例如 `<div class="lang">`），**此元素僅在語言被指定時才渲染**。
    - 一個可選的「複製」按鈕 (`<button>`)。
    - 由 `highlight` 函式生成的原始高亮程式碼區塊 (`<div class="highlight">...</div>`)。

2.  **目標 HTML 範例**：

    ```html
    <div class="code-block-wrapper">
      <div class="lang">python</div>
      <button class="copy-btn" aria-label="Copy code to clipboard">複製</button>
      <div class="highlight">
        <pre><code>...highlighted code here...</code></pre>
      </div>
    </div>
    ```

3.  **CSS/SCSS 需求**：

    - 父層 `.code-block-wrapper` 必須使用 `position: relative;`。
    - 語言標籤 `.lang` 和複製按鈕 `.copy-btn` 必須使用 `position: absolute;` 定位在父層的角落（例如左上角和右上角）。
    - 樣式必須美觀、清晰，且不影響程式碼的可讀性。

4.  **JavaScript 需求 (若有)**：
    - JavaScript 僅用於為 `.copy-btn` 按鈕添加點擊事件監聽。
    - 點擊後，應使用 `navigator.clipboard.writeText()` API 來複製程式碼。
    - 程式碼的來源應從其對應的程式碼區塊中獲取，而不是寫死的。
    - 提供使用者回饋，例如暫時改變按鈕文字（「已複製！」）。

#### 5. 禁用方法 (Forbidden Approaches)

**絕對禁止** 以下行為：

- 使用 `document.addEventListener('DOMContentLoaded', ...)` 搭配 `document.querySelectorAll('pre code')` 或類似方法，在頁面載入後遍歷 DOM 並手動插入語言標籤 `<div>`。此方法會造成頁面閃爍 (FOUC)，效能不佳，且是錯誤的 Hugo 開發模式。
