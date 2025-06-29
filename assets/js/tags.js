// Tags page dynamic content switching

let postsData = {};

// Helper function to clean JSON strings by removing surrounding quotes and processing special characters
function cleanJsonString(str) {
  if (str === null || str === undefined) {
    return '';
  }
  
  if (typeof str === 'string') {
    // First remove surrounding quotes
    str = str.replace(/^"|"$/g, '');
    
    // Replace literal "\n" sequences with HTML breaks
    str = str.replace(/\\n/g, '<br>');
    
    // Also handle actual newline characters
    str = str.replace(/\n/g, '<br>');
    
    // Replace other common escaped characters if needed
    str = str.replace(/\\r/g, '');
    str = str.replace(/\r/g, '');
    str = str.replace(/\\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    str = str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    
    return str;
  }
  
  return String(str);
}

// Initialize tags page
document.addEventListener('DOMContentLoaded', function() {
  // Load posts data from script tag
  const postsDataElement = document.getElementById('posts-data');
  if (postsDataElement) {
    try {
      postsData = JSON.parse(postsDataElement.textContent);
    } catch (e) {
      console.error('Failed to parse posts data:', e);
    }
  }
  
  // Add click listener to document for deselecting tags
  document.addEventListener('click', function(event) {
    const tagsCloud = document.getElementById('tags-cloud');
    const postsList = document.getElementById('posts-list');
    
    // Check if click is outside tags cloud and posts list
    if (tagsCloud && postsList && 
        !tagsCloud.contains(event.target) && 
        !postsList.contains(event.target)) {
      showAllTags();
    }
  });
});

// Show posts for a specific tag
function showTagPosts(tagName, tagUrl, event) {
  console.log('showTagPosts called with:', tagName, tagUrl);
  
  // Prevent default click behavior
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // Convert tagUrl with proper formatting - replace spaces with hyphens
  if (tagUrl && tagUrl.includes('%20')) {
    tagUrl = tagUrl.replace(/%20/g, '-');
  }
  
  const tagsCloud = document.getElementById('tags-cloud');
  const postsList = document.getElementById('posts-list');
  
  console.log('DOM elements found:', {
    tagsCloud: !!tagsCloud,
    postsList: !!postsList
  });
  
  if (!tagsCloud || !postsList) {
    console.log('Some elements not found, falling back to navigation');
    // Fallback to normal link behavior if elements not found
    window.location.href = tagUrl;
    return;
  }
  
  console.log('All elements found, proceeding with dynamic content switching');
  
  // Remove active class from all tag items
  const allTagItems = tagsCloud.querySelectorAll('.tag-cloud-item');
  allTagItems.forEach(item => item.classList.remove('active'));
  
  // Add active class to clicked tag card
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
  
  // Get posts for this tag
  const posts = postsData[tagName] || [];
  console.log('Posts found for tag:', tagName, posts.length);
  
  // Generate posts HTML
  let postsHTML = '';
  if (posts.length > 0) {
    posts.forEach(post => {
      const postUrl = cleanJsonString(post.url);
      postsHTML += `
        <article class="post-card" onclick="window.location.href='${postUrl}';" style="cursor:pointer;">
          <header class="post-card__header">
            <h2 class="post-card__title">
              <a href="${postUrl}" onclick="event.stopPropagation();">${cleanJsonString(post.title)}</a>
            </h2>
            
            <div class="post-card__meta">
              <span class="meta-item">
                <time datetime="${cleanJsonString(post.date)}">
                  ${cleanJsonString(post.dateFormatted)}
                </time>
              </span>
              
              ${post.readingTime > 0 ? `<span class="meta-item">${post.readingTime} 分鐘閱讀</span>` : ''}
            </div>
          </header>
          
          ${post.summary ? `
            <div class="post-card__summary">
              ${cleanJsonString(post.summary)}
            </div>
          ` : ''}
          
          <footer class="post-card__footer">
            ${post.tags && post.tags.length > 0 ? `
              <div class="post-card__tags">
                ${post.tags.map(tag => {
                  // Handle tag properly, ensuring it's a string first
                  const cleanTag = cleanJsonString(typeof tag === 'string' ? tag : String(tag));
                  // Convert spaces to hyphens for URL paths
                  const urlSafeTag = cleanTag.toLowerCase().replace(/\s+/g, '-');
                  return `<a href="/tags/${urlSafeTag}/" class="tag" onclick="event.stopPropagation();">${cleanTag}</a>`;
                }).join('')}
              </div>
            ` : ''}
          </footer>
        </article>
      `;
    });
  } else {
    postsHTML = '<p class="no-posts">此標籤暫無文章。</p>';
  }
  
  // Add smooth transition
  postsList.style.transition = 'opacity 0.3s ease';
  
  console.log('Starting transition animation');
  
  // Show posts list below tags (don't hide tags)
  postsList.innerHTML = postsHTML;
  postsList.style.display = 'block';
  postsList.style.opacity = '1';
  
  // Add extra spacing between tags cloud and posts list
  tagsCloud.style.marginBottom = 'var(--spacing-xxl)';
  postsList.style.marginTop = 'var(--spacing-xxl)';
  
  // Scroll to position the clicked tag card at the top of the viewport
  if (event && event.currentTarget) {
    // Get the clicked tag card's position
    const clickedCard = event.currentTarget;
    const cardRect = clickedCard.getBoundingClientRect();
    const scrollTop = window.pageYOffset + cardRect.top - 20; // 20px padding above the card
    
    // Scroll to the position
    window.scrollTo({
      top: scrollTop,
      behavior: 'smooth'
    });
  }
}

// Show all tags (back to main view)
function showAllTags() {
  const postsList = document.getElementById('posts-list');
  const tagsCloud = document.getElementById('tags-cloud');
  
  if (!postsList || !tagsCloud) {
    return;
  }
  
  // Hide posts
  postsList.style.display = 'none';
  
  // Reset spacing
  tagsCloud.style.marginBottom = '';
  postsList.style.marginTop = '';
  
  // Remove active class from all tag items
  const allTagItems = tagsCloud.querySelectorAll('.tag-cloud-item');
  allTagItems.forEach(item => item.classList.remove('active'));
  
  // Scroll to top
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
  if (event.state && event.state.tag) {
    showTagPosts(event.state.tag, window.location.pathname);
  } else {
    showAllTags();
  }
});



// Export functions for global access
window.showTagPosts = showTagPosts;
window.showAllTags = showAllTags;
