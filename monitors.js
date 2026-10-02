/**
 * A2Z COMPUTERS — Monitors Listing Page Controller
 * Brand filters, Category quick-filters, Real-Time Search, Sorting, and Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. STATE MANAGEMENT
  // -------------------------------------------------------------------------
  let selectedBrand = 'all';
  let selectedCategory = 'all';
  let searchQuery = '';
  let sortOrder = 'featured';

  // Read URL params if deep-linking
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('brand')) {
    selectedBrand = urlParams.get('brand');
  }
  if (urlParams.has('cat')) {
    selectedCategory = urlParams.get('cat');
  }
  if (urlParams.has('q')) {
    searchQuery = urlParams.get('q').trim().toLowerCase();
  }

  // -------------------------------------------------------------------------
  // 2. DOM CACHE
  // -------------------------------------------------------------------------
  const monitorGrid = document.getElementById('monitorGrid');
  const emptyResultsBox = document.getElementById('emptyResultsBox');
  const monitorSearchInput = document.getElementById('monitorSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const monitorSortSelect = document.getElementById('monitorSortSelect');
  const brandFilterChips = document.getElementById('brandFilterChips');
  const categoryChips = document.getElementById('categoryChips');
  const visibleCountText = document.getElementById('visibleCountText');
  const currentCategoryText = document.getElementById('currentCategoryText');
  const activeFilterTags = document.getElementById('activeFilterTags');
  const btnResetFilters = document.getElementById('btnResetFilters');

  // Synchronize initial input if populated from URL
  if (searchQuery && monitorSearchInput) {
    monitorSearchInput.value = searchQuery;
    if (clearSearchBtn) clearSearchBtn.classList.remove('hidden');
  }

  // Synchronize initial brand chip
  if (selectedBrand !== 'all' && brandFilterChips) {
    brandFilterChips.querySelectorAll('.brand-chip').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-brand').toLowerCase() === selectedBrand.toLowerCase());
    });
  }

  // Synchronize initial category chip
  if (selectedCategory !== 'all' && categoryChips) {
    categoryChips.querySelectorAll('.cat-chip').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-category').toLowerCase() === selectedCategory.toLowerCase());
    });
  }

  // -------------------------------------------------------------------------
  // 3. EVENT LISTENERS
  // -------------------------------------------------------------------------

  // Brand Chips
  if (brandFilterChips) {
    brandFilterChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.brand-chip');
      if (!chip) return;

      selectedBrand = chip.getAttribute('data-brand');
      brandFilterChips.querySelectorAll('.brand-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      renderProducts();
    });
  }

  // Category Quick Filter Chips
  if (categoryChips) {
    categoryChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.cat-chip');
      if (!chip) return;

      selectedCategory = chip.getAttribute('data-category');
      categoryChips.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      renderProducts();
    });
  }

  // Search Input
  if (monitorSearchInput) {
    monitorSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
      }
      renderProducts();
    });
  }

  // Clear Search
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (monitorSearchInput) {
        monitorSearchInput.value = '';
        monitorSearchInput.focus();
      }
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      renderProducts();
    });
  }

  // Sorting
  if (monitorSortSelect) {
    monitorSortSelect.addEventListener('change', (e) => {
      sortOrder = e.target.value;
      renderProducts();
    });
  }

  // Reset Filters
  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', () => {
      searchQuery = '';
      selectedBrand = 'all';
      selectedCategory = 'all';
      sortOrder = 'featured';

      if (monitorSearchInput) monitorSearchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
      if (monitorSortSelect) monitorSortSelect.value = 'featured';

      if (brandFilterChips) {
        brandFilterChips.querySelectorAll('.brand-chip').forEach(c => {
          c.classList.toggle('active', c.getAttribute('data-brand') === 'all');
        });
      }

      if (categoryChips) {
        categoryChips.querySelectorAll('.cat-chip').forEach(c => {
          c.classList.toggle('active', c.getAttribute('data-category') === 'all');
        });
      }

      renderProducts();
    });
  }

  // -------------------------------------------------------------------------
  // 4. FILTERING & SORTING LOGIC
  // -------------------------------------------------------------------------
  function getFilteredMonitors() {
    return MONITOR_DATA.filter(item => {
      // Brand filter
      if (selectedBrand !== 'all' && item.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search query filter
      if (searchQuery) {
        const fullPorts = item.fullSpecs && item.fullSpecs.ports ? item.fullSpecs.ports : '';
        const fullPanel = item.fullSpecs && item.fullSpecs.panelType ? item.fullSpecs.panelType : '';
        const searchTarget = `${item.brand} ${item.model} ${item.tagline} ${item.category} ${item.screenSize} ${item.resolution} ${item.refreshRate} ${item.panelType} ${item.shortSpecs} ${fullPorts} ${fullPanel}`.toLowerCase();
        
        // Multi-word search: all tokens must match
        const tokens = searchQuery.split(/\s+/).filter(t => t.length > 0);
        const allMatch = tokens.every(token => searchTarget.includes(token));
        if (!allMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'price-low') {
        return a.price - b.price;
      }
      if (sortOrder === 'price-high') {
        return b.price - a.price;
      }
      if (sortOrder === 'newest') {
        // Sort gaming/fast refresh or higher prices first
        const rateA = parseInt(a.refreshRate) || 60;
        const rateB = parseInt(b.refreshRate) || 60;
        return rateB - rateA;
      }
      // 'featured' maintains natural catalog order
      return 0;
    });
  }

  // -------------------------------------------------------------------------
  // 5. RENDERING PRODUCT CARDS
  // -------------------------------------------------------------------------
  function renderProducts() {
    const monitors = getFilteredMonitors();

    // Update count display
    if (visibleCountText) {
      visibleCountText.textContent = monitors.length;
    }

    if (currentCategoryText) {
      if (selectedCategory !== 'all') {
        currentCategoryText.textContent = `${selectedCategory}s`;
      } else if (selectedBrand !== 'all') {
        currentCategoryText.textContent = `${selectedBrand} Displays`;
      } else {
        currentCategoryText.textContent = 'Monitors';
      }
    }

    // Toggle Empty State vs Grid
    if (monitors.length === 0) {
      if (monitorGrid) monitorGrid.innerHTML = '';
      if (emptyResultsBox) emptyResultsBox.classList.remove('hidden');
      return;
    }

    if (emptyResultsBox) {
      emptyResultsBox.classList.add('hidden');
    }

    if (!monitorGrid) return;

    // Render cards HTML
    monitorGrid.innerHTML = monitors.map(monitor => {
      const isLimited = monitor.availability.toLowerCase().includes('limited');
      const statusClass = isLimited ? 'limited' : '';

      return `
        <article class="monitor-card" data-id="${monitor.id}" tabindex="0" role="button" aria-label="View specifications for ${monitor.brand} ${monitor.model}">
          <!-- Card Header Bar -->
          <div class="card-header-bar">
            <span class="card-brand-badge">${monitor.brand}</span>
            <span class="card-status-pill ${statusClass}">${monitor.badge || monitor.availability}</span>
          </div>

          <!-- Card Image Box -->
          <div class="card-image-box">
            <img 
              class="card-product-img" 
              src="${monitor.image}" 
              alt="${monitor.brand} ${monitor.model}" 
              loading="lazy" 
              onerror="this.onerror=null; this.src='assets/products/monitor.jpg';"
            />
          </div>

          <!-- Card Content Area -->
          <div class="card-content-area">
            <div class="card-category-tag">${monitor.category}</div>
            <h2 class="card-model-title">${monitor.model}</h2>

            <!-- Key Spec Badges -->
            <div class="card-specs-badges-row">
              <span class="spec-badge highlight">${monitor.screenSize}</span>
              <span class="spec-badge">${monitor.resolution.split(' ')[0]}</span>
              <span class="spec-badge">${monitor.refreshRate}</span>
              <span class="spec-badge">${monitor.panelType}</span>
            </div>

            <!-- Short Specs Description -->
            <p class="card-short-specs">${monitor.shortSpecs}</p>

            <!-- Card Footer Row -->
            <div class="card-footer-row">
              <div class="card-price-wrap">
                <span class="price-label">A2Z Price</span>
                <span class="price-amount">${monitor.priceDisplay}</span>
              </div>
              <span class="btn-view-details">
                <span>View Details</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach card click handlers for seamless navigation
    monitorGrid.querySelectorAll('.monitor-card').forEach(card => {
      const monitorId = card.getAttribute('data-id');

      card.addEventListener('click', () => {
        navigateToDetails(monitorId);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigateToDetails(monitorId);
        }
      });
    });
  }

  function navigateToDetails(id) {
    window.location.href = `monitor-details.html?id=${encodeURIComponent(id)}`;
  }

  // Initial render
  renderProducts();
});
