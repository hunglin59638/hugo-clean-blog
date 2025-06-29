// Table of Contents and Back to Top functionality

class TOCManager {
  constructor() {
    this.tocLinks = document.querySelectorAll('.toc-sidebar a[href^="#"]');
    this.headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    this.backToTopBtn = document.getElementById('backToTop');
    
    this.init();
  }
  
  init() {
    if (this.tocLinks.length > 0 && this.headings.length > 0) {
      this.setupTOCScrollSpy();
    }
    
    if (this.backToTopBtn) {
      this.setupBackToTop();
    }
  }
  
  setupTOCScrollSpy() {
    // 創建 Intersection Observer 來追蹤標題元素
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          if (!id) return;
          
          const tocLink = document.querySelector(`.toc-sidebar a[href="#${id}"]`);
          if (!tocLink) return;
          
          if (entry.isIntersecting) {
            // 移除所有活動狀態
            this.tocLinks.forEach(link => link.classList.remove('active'));
            // 添加當前標題的活動狀態
            tocLink.classList.add('active');
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%', // 調整觸發區域
        threshold: 0
      }
    );
    
    // 觀察所有有 ID 的標題
    this.headings.forEach(heading => {
      if (heading.getAttribute('id')) {
        observer.observe(heading);
      }
    });
    
    // 平滑滾動到錨點
    this.tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  setupBackToTop() {
    // 監聽滾動事件，控制按鈕顯示/隱藏
    let isVisible = false;
    
    const toggleVisibility = () => {
      const shouldShow = window.pageYOffset > 300;
      
      if (shouldShow !== isVisible) {
        isVisible = shouldShow;
        this.backToTopBtn.classList.toggle('visible', shouldShow);
      }
    };
    
    // 使用節流來優化性能
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // 點擊事件 - 滾動到頂部
    this.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // 初始檢查
    toggleVisibility();
  }
}

export default TOCManager;
