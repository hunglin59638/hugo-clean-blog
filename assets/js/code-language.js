// Handle code block language display

document.addEventListener('DOMContentLoaded', () => {
  // Get all code blocks
  const codeBlocks = document.querySelectorAll('.highlight');
  
  // Process each code block
  codeBlocks.forEach(block => {
    // Try to find language from the class of the code element
    let language = '';
    
    // Method 1: Check for direct language class on .highlight
    const classes = Array.from(block.classList);
    const langClass = classes.find(cls => cls.startsWith('language-'));
    
    if (langClass) {
      language = langClass.replace('language-', '');
    } else {
      // Method 2: Look for data attributes
      if (block.dataset.lang) {
        language = block.dataset.lang;
      } else {
        // Method 3: Check for chroma language class
        const chromaClass = classes.find(cls => 
          !cls.includes('highlight') && 
          !cls.includes('chroma') && 
          cls.length > 0
        );
        
        if (chromaClass) {
          language = chromaClass;
        } else {
          // Method 4: Look at child code element
          const codeEl = block.querySelector('code');
          if (codeEl && codeEl.className) {
            const codeClasses = Array.from(codeEl.classList);
            const codeLangClass = codeClasses.find(cls => cls.startsWith('language-'));
            if (codeLangClass) {
              language = codeLangClass.replace('language-', '');
            }
          }
        }
      }
    }
    
    // If language found, set the data attribute
    if (language) {
      // 語言名稱顯示優化：自動轉小寫，常見語言可自訂顯示
      const langMap = {
        js: 'JavaScript',
        javascript: 'JavaScript',
        py: 'Python',
        python: 'Python',
        html: 'HTML',
        css: 'CSS',
        sh: 'Shell',
        bash: 'Shell',
        json: 'JSON',
        go: 'Go',
        c: 'C',
        cpp: 'C++',
        csharp: 'C#',
        cs: 'C#',
        java: 'Java',
        php: 'PHP',
        ruby: 'Ruby',
        rust: 'Rust',
        toml: 'TOML',
        yaml: 'YAML',
        md: 'Markdown',
        markdown: 'Markdown',
        xml: 'XML',
        sql: 'SQL',
        ts: 'TypeScript',
        typescript: 'TypeScript',
        vue: 'Vue',
        scss: 'SCSS',
        sass: 'Sass',
        less: 'Less',
        dockerfile: 'Dockerfile',
        makefile: 'Makefile',
        ini: 'INI',
        txt: 'Text',
      };
      let displayLang = language.toLowerCase();
      if (langMap[displayLang]) {
        displayLang = langMap[displayLang];
      } else {
        displayLang = displayLang.charAt(0).toUpperCase() + displayLang.slice(1);
      }
      block.setAttribute('data-lang', displayLang);
      const chroma = block.querySelector('.chroma');
      if (chroma) chroma.setAttribute('data-lang', displayLang);
    }
  });
});
