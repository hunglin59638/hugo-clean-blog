// Theme toggle functionality
export class ThemeToggle {
  constructor() {
    this.init();
  }
  
  init() {
    this.themeToggle = document.querySelector('.theme-toggle');
    if (!this.themeToggle) return;
    
    // Set initial theme
    this.setInitialTheme();
    
    // Add event listener
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Update icon
    this.updateIcon();
  }
  
  setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme = 'auto';
    
    if (savedTheme) {
      theme = savedTheme;
    }
    
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme;
    
    switch (currentTheme) {
      case 'light':
        newTheme = 'dark';
        break;
      case 'dark':
        newTheme = 'auto';
        break;
      default:
        newTheme = 'light';
        break;
    }
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.updateIcon();
  }
  
  updateIcon() {
    const theme = document.documentElement.getAttribute('data-theme');
    const icon = this.themeToggle.querySelector('svg');
    
    if (!icon) return;
    
    // Remove existing classes
    icon.classList.remove('icon-sun', 'icon-moon', 'icon-auto');
    
    // Add appropriate class
    switch (theme) {
      case 'light':
        icon.classList.add('icon-sun');
        break;
      case 'dark':
        icon.classList.add('icon-moon');
        break;
      default:
        icon.classList.add('icon-auto');
        break;
    }
  }
}
