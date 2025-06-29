// Mobile menu functionality
export class MobileMenu {
  constructor() {
    this.init();
  }
  
  init() {
    this.menuToggle = document.querySelector('.nav__toggle');
    this.menu = document.querySelector('.nav__menu');
    
    if (!this.menuToggle || !this.menu) return;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.menuToggle.addEventListener('click', () => {
      this.toggleMenu();
    });
    
    // Close menu when clicking on a link
    const menuLinks = this.menu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.menuToggle.contains(e.target) && !this.menu.contains(e.target)) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    this.menu.classList.toggle('is-open');
    this.menuToggle.classList.toggle('is-active');
  }
  
  closeMenu() {
    this.menu.classList.remove('is-open');
    this.menuToggle.classList.remove('is-active');
  }
}
