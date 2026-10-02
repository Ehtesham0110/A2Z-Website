/**
 * A2Z COMPUTERS — Desktop PCs Listing Page Controller
 * Tab transitions (New vs Refurbished), Brand Filters, Real-Time Search, and Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. STATE MANAGEMENT
  // -------------------------------------------------------------------------
  let currentTab = 'new'; // 'new' | 'refurbished'
  let selectedBrand = 'all';
  let searchQuery = '';
  let sortOrder = 'featured';

  // Read URL params if deep-linking
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('tab') === 'refurbished') {
    currentTab = 'refurbished';
  }
  if (urlParams.has('brand')) {
    selectedBrand = urlParams.get('brand');
  }
  if (urlParams.has('q')) {
    searchQuery = urlParams.get('q').trim().toLowerCase();
  }

  // -------------------------------------------------------------------------
  // 2. DOM CACHE
  // -------------------------------------------------------------------------
  const desktopGrid = document.getElementById('desktopGrid');
  const emptyResultsBox = document.getElementById('emptyResultsBox');
  const tabsSliderTrack = document.querySelector('.tabs-slider-track');
  const tabNew = document.getElementById('tabNew');
  const tabRefurbished = document.getElementById('tabRefurbished');
  const countNewBadge = document.getElementById('countNewBadge');
  const countRefurbBadge = document.getElementById('countRefurbBadge');
  const desktopSearchInput = document.getElementById('desktopSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const desktopSortSelect = document.getElementById('desktopSortSelect');
  const brandFilterChips = document.getElementById('brandFilterChips');
  const visibleCountText = document.getElementById('visibleCountText');
  const currentCategoryText = document.getElementById('currentCategoryText');
  const btnResetFilters = document.getElementById('btnResetFilters');

  // Update initial tab count badges
  const totalNew = DESKTOP_DATA.filter(item => item.type === 'new').length;
  const totalRefurb = DESKTOP_DATA.filter(item => item.type === 'refurbished').length;
  if (countNewBadge) countNewBadge.textContent = totalNew;
  if (countRefurbBadge) countRefurbBadge.textContent = totalRefurb;

  // Synchronize initial input if populated from URL
  if (searchQuery && desktopSearchInput) {
    desktopSearchInput.value = searchQuery;
    if (clearSearchBtn) clearSearchBtn.classList.remove('hidden');
  }

  // Synchronize initial brand chip
  if (selectedBrand !== 'all' && brandFilterChips) {
    brandFilterChips.querySelectorAll('.brand-chip').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-brand').toLowerCase() === selectedBrand.toLowerCase());
    });
  }

  // -------------------------------------------------------------------------
  // 3. TAB SWITCHING (SMOOTH ANIMATED SLIDER)
  // -------------------------------------------------------------------------
  function applyTabState(newTab) {
    currentTab = newTab;

    if (currentTab === 'refurbished') {
      if (tabsSliderTrack) tabsSliderTrack.classList.add('active-refurbished');
      if (tabNew) {
        tabNew.classList.remove('active');
        tabNew.setAttribute('aria-selected', 'false');
      }
      if (tabRefurbished) {
        tabRefurbished.classList.add('active');
        tabRefurbished.setAttribute('aria-selected', 'true');
      }
      if (currentCategoryText) currentCategoryText.textContent = 'Refurbished Desktop PCs';
    } else {
      if (tabsSliderTrack) tabsSliderTrack.classList.remove('active-refurbished');
      if (tabRefurbished) {
        tabRefurbished.classList.remove('active');
        tabRefurbished.setAttribute('aria-selected', 'false');
      }
      if (tabNew) {
        tabNew.classList.add('active');
        tabNew.setAttribute('aria-selected', 'true');
      }
      if (currentCategoryText) currentCategoryText.textContent = 'New Desktop PCs';
    }

    if (desktopGrid) {
      desktopGrid.classList.add('fading-out');
      setTimeout(() => {
        renderProducts();
        desktopGrid.classList.remove('fading-out');
      }, 180);
    } else {
      renderProducts();
    }
  }

  if (tabNew) {
    tabNew.addEventListener('click', () => {
      if (currentTab !== 'new') applyTabState('new');
    });
  }

  if (tabRefurbished) {
    tabRefurbished.addEventListener('click', () => {
      if (currentTab !== 'refurbished') applyTabState('refurbished');
    });
  }

  // Apply initial tab from URL param if needed
  if (currentTab === 'refurbished') {
    applyTabState('refurbished');
  }

  // -------------------------------------------------------------------------
  // 4. BRAND FILTER CHIPS
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // 5. SEARCH & SORT
  // -------------------------------------------------------------------------
  if (desktopSearchInput) {
    desktopSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
      }
      renderProducts();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (desktopSearchInput) {
        desktopSearchInput.value = '';
        desktopSearchInput.focus();
      }
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      renderProducts();
    });
  }

  if (desktopSortSelect) {
    desktopSortSelect.addEventListener('change', (e) => {
      sortOrder = e.target.value;
      renderProducts();
    });
  }

  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', () => {
      searchQuery = '';
      selectedBrand = 'all';
      sortOrder = 'featured';

      if (desktopSearchInput) desktopSearchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
      if (desktopSortSelect) desktopSortSelect.value = 'featured';

      if (brandFilterChips) {
        brandFilterChips.querySelectorAll('.brand-chip').forEach(c => {
          c.classList.toggle('active', c.getAttribute('data-brand') === 'all');
        });
      }

      renderProducts();
    });
  }

  // -------------------------------------------------------------------------
  // 6. FILTERING & SORTING LOGIC
  // -------------------------------------------------------------------------
  function getFilteredDesktops() {
    return DESKTOP_DATA.filter(item => {
      // 1. Tab filter (New vs Refurbished)
      if (item.type !== currentTab) return false;

      // 2. Brand filter
      if (selectedBrand !== 'all' && item.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery) {
        const fullSpecsStr = item.fullSpecs ? `${item.fullSpecs.processor} ${item.fullSpecs.graphics} ${item.fullSpecs.motherboard} ${item.fullSpecs.powerSupply}` : '';
        const searchTarget = `${item.brand} ${item.model} ${item.tagline} ${item.category} ${item.processor} ${item.ram} ${item.storage} ${item.graphics} ${item.shortSpecs} ${fullSpecsStr}`.toLowerCase();
        
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
      if (sortOrder === 'performance') {
        return b.price - a.price;
      }
      // 'featured' maintains natural catalog order
      return 0;
    });
  }

  // -------------------------------------------------------------------------
  // 7. RENDERING PRODUCT CARDS
  // -------------------------------------------------------------------------
  function renderProducts() {
    const desktops = getFilteredDesktops();

    // Update count display
    if (visibleCountText) {
      visibleCountText.textContent = desktops.length;
    }

    if (currentCategoryText) {
      const typeText = currentTab === 'refurbished' ? 'Refurbished Desktop PCs' : 'New Desktop PCs';
      if (selectedBrand !== 'all') {
        currentCategoryText.textContent = `${selectedBrand} ${typeText}`;
      } else {
        currentCategoryText.textContent = typeText;
      }
    }

    // Toggle Empty State vs Grid
    if (desktops.length === 0) {
      if (desktopGrid) desktopGrid.innerHTML = '';
      if (emptyResultsBox) emptyResultsBox.classList.remove('hidden');
      return;
    }

    if (emptyResultsBox) {
      emptyResultsBox.classList.add('hidden');
    }

    if (!desktopGrid) return;

    // Render cards HTML
    desktopGrid.innerHTML = desktops.map(desktop => {
      const isRefurb = desktop.type === 'refurbished';
      const badgeText = isRefurb ? (desktop.conditionGrade || desktop.badge) : (desktop.badge || desktop.availability);
      const isLimited = (desktop.availability || '').toLowerCase().includes('limited');
      let statusClass = isRefurb ? 'refurb-badge' : (isLimited ? 'limited' : '');

      return `
        <article class="desktop-card" data-id="${desktop.id}" tabindex="0" role="button" aria-label="View specifications for ${desktop.brand} ${desktop.model}">
          <!-- Card Header Bar -->
          <div class="card-header-bar">
            <span class="card-brand-badge">${desktop.brand}</span>
            <span class="card-status-pill ${statusClass}">${badgeText}</span>
          </div>

          <!-- Card Image Box -->
          <div class="card-image-box">
            <img 
              class="card-product-img" 
              src="${desktop.image}" 
              alt="${desktop.brand} ${desktop.model}" 
              loading="lazy" 
              onerror="this.onerror=null; this.src='assets/products/desktop-tower.jpg';"
            />
          </div>

          <!-- Card Content Area -->
          <div class="card-content-area">
            <div class="card-category-tag">${desktop.category}</div>
            <h2 class="card-model-title">${desktop.model}</h2>

            <!-- Key Spec Badges -->
            <div class="card-specs-badges-row">
              <span class="spec-badge highlight">${desktop.processor.split('(')[0].trim()}</span>
              <span class="spec-badge">${desktop.ram.split(' ')[0]} RAM</span>
              <span class="spec-badge">${desktop.storage.split('+')[0].trim()}</span>
              ${desktop.graphics ? `<span class="spec-badge">${desktop.graphics.split('(')[0].replace('NVIDIA GeForce ', '').replace('Dedicated Graphics', '').trim()}</span>` : ''}
            </div>

            <!-- Short Specs Description -->
            <p class="card-short-specs">${desktop.shortSpecs}</p>

            <!-- Card Footer Row -->
            <div class="card-footer-row">
              <div class="card-price-wrap">
                <span class="price-label">A2Z Price</span>
                <span class="price-amount">${desktop.priceDisplay}</span>
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

    // Attach card click handlers
    desktopGrid.querySelectorAll('.desktop-card').forEach(card => {
      const desktopId = card.getAttribute('data-id');

      card.addEventListener('click', () => {
        navigateToDetails(desktopId);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigateToDetails(desktopId);
        }
      });
    });
  }

  function navigateToDetails(id) {
    window.location.href = `desktop-details.html?id=${encodeURIComponent(id)}&fromTab=${currentTab}`;
  }

  // Initial render
  renderProducts();
});
