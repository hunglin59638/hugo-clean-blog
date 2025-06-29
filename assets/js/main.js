// Main JavaScript file
import { ThemeToggle } from './theme-toggle.js';
import { Search } from './search.js';
import { MobileMenu } from './mobile-menu.js';
import TOCManager from './toc.js';
import { CodeBlocks } from './code-blocks.js';
import './codeblock-copy.js';

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme toggle
  const themeToggle = new ThemeToggle();
  
  // Initialize search functionality
  const search = new Search();
  
  // Initialize mobile menu
  const mobileMenu = new MobileMenu();
  
  // Initialize TOC and back to top
  const tocManager = new TOCManager();
  
  // Initialize code blocks functionality
  const codeBlocks = new CodeBlocks();
  
  // Smooth scrolling for anchor links
  initSmoothScrolling();
});

function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]:not(.toc-sidebar a)'); // 排除 TOC 連結，因為 TOCManager 會處理
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
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
