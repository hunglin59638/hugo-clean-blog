// Search functionality
export class Search {
  constructor() {
    this.searchData = [];
    this.fuse = null;
    this.init();
  }
  
  async init() {
    this.searchButton = document.querySelector('.search-button');
    this.searchModal = document.querySelector('.search-modal');
    this.searchInput = document.querySelector('.search-modal__input');
    this.searchResults = document.querySelector('.search-modal__results');
    
    if (!this.searchButton || !this.searchModal) return;
    
    // Load search data
    await this.loadSearchData();
    
    // Setup event listeners
    this.setupEventListeners();
  }
  
  async loadSearchData() {
    try {
      const response = await fetch('/index.json');
      this.searchData = await response.json();
      
      // Initialize Fuse.js
      const options = {
        keys: ['title', 'content', 'summary', 'tags', 'categories'],
        threshold: 0.3,
        includeScore: true,
        includeMatches: true
      };
      
      // Use Fuse.js if available, otherwise fallback to simple search
      if (window.Fuse) {
        this.fuse = new window.Fuse(this.searchData, options);
      }
    } catch (error) {
      console.error('Failed to load search data:', error);
    }
  }
  
  setupEventListeners() {
    // Open search modal
    this.searchButton.addEventListener('click', () => {
      this.openModal();
    });
    
    // Close modal on escape or click outside
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.searchModal.classList.contains('is-open')) {
        this.closeModal();
      }
    });
    
    this.searchModal.addEventListener('click', (e) => {
      if (e.target === this.searchModal) {
        this.closeModal();
      }
    });
    
    // Search input
    this.searchInput.addEventListener('input', (e) => {
      this.performSearch(e.target.value);
    });
  }
  
  openModal() {
    this.searchModal.classList.add('is-open');
    this.searchInput.focus();
  }
  
  closeModal() {
    this.searchModal.classList.remove('is-open');
    this.searchInput.value = '';
    this.searchResults.innerHTML = '';
  }
  
  performSearch(query) {
    if (!query.trim()) {
      this.searchResults.innerHTML = '';
      return;
    }
    
    let results = [];
    
    if (this.fuse) {
      // Use Fuse.js for fuzzy search
      const fuseResults = this.fuse.search(query);
      results = fuseResults.map(result => result.item);
    } else {
      // Fallback to simple search
      results = this.searchData.filter(item => {
        const searchText = `${item.title} ${item.content} ${item.summary}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      });
    }
    
    this.displayResults(results.slice(0, 10)); // Show max 10 results
  }
  
  displayResults(results) {
    if (results.length === 0) {
      this.searchResults.innerHTML = '<p class="text-center text-muted">沒有找到相關結果</p>';
      return;
    }
    
    const resultsHTML = results.map(result => `
      <div class="search-modal__result">
        <h4><a href="${result.permalink}">${result.title}</a></h4>
        <p>${result.summary || result.content.substring(0, 150) + '...'}</p>
      </div>
    `).join('');
    
    this.searchResults.innerHTML = resultsHTML;
  }
}
