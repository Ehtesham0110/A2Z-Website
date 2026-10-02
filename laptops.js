/**
 * A2Z COMPUTERS — Laptop Listing Page Controller
 * Tab transitions, Brand Filters, Real-Time Search, and Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. STATE MANAGEMENT
  // -------------------------------------------------------------------------
  let currentTab = 'new'; // 'new' | 'refurbished'
  let selectedBrand = 'all'; // 'all' | 'ASUS' | 'Dell' | 'HP' | 'Apple' | 'Lenovo' | 'Acer'
  let searchQuery = '';
  let sortOrder = 'featured'; // 'featured' | 'price-low' | 'price-high'

  // -------------------------------------------------------------------------
  // 2. DOM CACHE
  // -------------------------------------------------------------------------
  const laptopGrid = document.getElementById('laptopGrid');
  const emptyResultsBox = document.getElementById('emptyResultsBox');
  const tabsSliderTrack = document.querySelector('.tabs-slider-track');
  const tabNew = document.getElementById('tabNew');
  const tabRefurbished = document.getElementById('tabRefurbished');
  const countNewBadge = document.getElementById('countNewBadge');
  const countRefurbBadge = document.getElementById('countRefurbBadge');
  const laptopSearchInput = document.getElementById('laptopSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const laptopSortSelect = document.getElementById('laptopSortSelect');
  const brandFilterChips = document.getElementById('brandFilterChips');
  const visibleCountText = document.getElementById('visibleCountText');
  const currentCategoryText = document.getElementById('currentCategoryText');
  const btnResetFilters = document.getElementById('btnResetFilters');

  // Update initial tab count badges
  const totalNew = LAPTOP_DATA.filter(item => item.type === 'new').length;
  const totalRefurb = LAPTOP_DATA.filter(item => item.type === 'refurbished').length;
  if (countNewBadge) countNewBadge.textContent = totalNew;
  if (countRefurbBadge) countRefurbBadge.textContent = totalRefurb;

  // -------------------------------------------------------------------------
  // 3. TAB SWITCHING (SMOOTH ANIMATED SLIDER)
  // -------------------------------------------------------------------------
  function switchTab(newTab) {
    if (currentTab === newTab) return;
    currentTab = newTab;

    if (currentTab === 'refurbished') {
      tabsSliderTrack.classList.add('active-refurbished');
      tabNew.classList.remove('active');
      tabNew.setAttribute('aria-selected', 'false');
      tabRefurbished.classList.add('active');
      tabRefurbished.setAttribute('aria-selected', 'true');
      currentCategoryText.textContent = 'Refurbished Laptops';
    } else {
      tabsSliderTrack.classList.remove('active-refurbished');
      tabRefurbished.classList.remove('active');
      tabRefurbished.setAttribute('aria-selected', 'false');
      tabNew.classList.add('active');
      tabNew.setAttribute('aria-selected', 'true');
      currentCategoryText.textContent = 'New Laptops';
    }

    // Smooth grid transition
    laptopGrid.classList.add('fading-out');
    setTimeout(() => {
      renderProducts();
      laptopGrid.classList.remove('fading-out');
    }, 180);
  }

  tabNew.addEventListener('click', () => switchTab('new'));
  tabRefurbished.addEventListener('click', () => switchTab('refurbished'));

  // -------------------------------------------------------------------------
  // 4. BRAND FILTER CHIPS
  // -------------------------------------------------------------------------
  brandFilterChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.brand-chip');
    if (!chip) return;

    const brand = chip.getAttribute('data-brand');
    selectedBrand = brand;

    // Update chip styling
    brandFilterChips.querySelectorAll('.brand-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    renderProducts();
  });

  // -------------------------------------------------------------------------
  // 5. SEARCH & SORT
  // -------------------------------------------------------------------------
  laptopSearchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
    renderProducts();
  });

  clearSearchBtn.addEventListener('click', () => {
    laptopSearchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.add('hidden');
    laptopSearchInput.focus();
    renderProducts();
  });

  laptopSortSelect.addEventListener('change', (e) => {
    sortOrder = e.target.value;
    renderProducts();
  });

  btnResetFilters.addEventListener('click', () => {
    searchQuery = '';
    laptopSearchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    selectedBrand = 'all';
    brandFilterChips.querySelectorAll('.brand-chip').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-brand') === 'all');
    });
    sortOrder = 'featured';
    laptopSortSelect.value = 'featured';
    renderProducts();
  });

  // -------------------------------------------------------------------------
  // 6. FILTER & SORT DATA
  // -------------------------------------------------------------------------
  function getFilteredLaptops() {
    return LAPTOP_DATA.filter(item => {
      // 1. Tab filter (New vs Refurbished)
      if (item.type !== currentTab) return false;

      // 2. Brand filter
      if (selectedBrand !== 'all' && item.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery) {
        const specsStr = item.fullSpecs ? `${item.fullSpecs.processor || ''} ${item.fullSpecs.display || ''}` : '';
        const targetString = `${item.brand} ${item.model} ${item.tagline} ${item.shortSpecs} ${specsStr}`.toLowerCase();
        if (!targetString.includes(searchQuery)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'price-low') {
        return a.price - b.price;
      }
      if (sortOrder === 'price-high') {
        return b.price - a.price;
      }
      return 0; // featured maintains default order
    });
  }

  // -------------------------------------------------------------------------
  // 7. RENDER PRODUCT CARDS
  // -------------------------------------------------------------------------
  function renderProducts() {
    const laptops = getFilteredLaptops();
    visibleCountText.textContent = laptops.length;

    if (laptops.length === 0) {
      laptopGrid.innerHTML = '';
      emptyResultsBox.classList.remove('hidden');
      return;
    }

    emptyResultsBox.classList.add('hidden');
    laptopGrid.innerHTML = laptops.map(laptop => {
      const isRefurb = laptop.type === 'refurbished';
      
      const refurbSnippet = isRefurb ? `
        <div class="card-refurb-metrics">
          <div class="metric-pill">
            <span>🛡️</span>
            <span>${laptop.badge}</span>
          </div>
          <div class="metric-pill">
            <span>🔋</span>
            <span>${laptop.batteryHealth ? laptop.batteryHealth.split('(')[0].trim() : 'Health Tested'}</span>
          </div>
        </div>
      ` : '';

      return `
        <article class="laptop-card" data-id="${laptop.id}" tabindex="0" role="link" aria-label="View specifications for ${laptop.brand} ${laptop.model}">
          <div>
            <div class="card-badges-row">
              <span class="card-brand-badge">${laptop.brand}</span>
              <span class="card-status-badge ${isRefurb ? 'refurb-badge' : ''}">${laptop.badge || laptop.availability}</span>
            </div>

            <div class="card-image-box">
              <img class="card-img" src="${laptop.image}" alt="${laptop.brand} ${laptop.model}" loading="lazy" onerror="this.onerror=null; this.src='assets/products/laptop.jpg';" />
            </div>

            <div class="card-body">
              <h2 class="card-model-title">${laptop.model}</h2>
              <p class="card-tagline">${laptop.tagline}</p>

              ${refurbSnippet}

              <div class="card-short-specs">
                ${laptop.shortSpecs}
              </div>
            </div>
          </div>

          <div class="card-bottom-footer">
            <div class="card-price-wrap">
              <span class="price-label">Price</span>
              <span class="price-amount">${laptop.priceDisplay}</span>
            </div>
            <button type="button" class="btn-view-details" aria-hidden="true" tabindex="-1">
              <span>View Details</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to navigate to details page
    laptopGrid.querySelectorAll('.laptop-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        window.location.href = `laptop-details.html?id=${encodeURIComponent(id)}`;
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          window.location.href = `laptop-details.html?id=${encodeURIComponent(id)}`;
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 8. DEEP LINKING URL PARAMETER SUPPORT
  // -------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const paramTab = urlParams.get('tab');
  const paramBrand = urlParams.get('brand');
  const paramQuery = urlParams.get('q');

  if (paramBrand) {
    const matchChip = Array.from(brandFilterChips.querySelectorAll('.brand-chip')).find(
      c => c.getAttribute('data-brand').toLowerCase() === paramBrand.toLowerCase()
    );
    if (matchChip) {
      selectedBrand = matchChip.getAttribute('data-brand');
      brandFilterChips.querySelectorAll('.brand-chip').forEach(c => c.classList.remove('active'));
      matchChip.classList.add('active');
    }
  }

  if (paramQuery) {
    searchQuery = paramQuery.trim().toLowerCase();
    laptopSearchInput.value = paramQuery;
    clearSearchBtn.classList.remove('hidden');
  }

  if (paramTab === 'refurbished') {
    switchTab('refurbished');
  } else {
    renderProducts();
  }
});
