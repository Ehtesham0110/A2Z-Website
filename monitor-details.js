/**
 * A2Z COMPUTERS — Monitor Details Page Controller
 * Reads product ID from URL query parameters, populates dynamic specs & gallery,
 * and handles Buy Now placeholder interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. GET PRODUCT ID FROM URL
  // -------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Find monitor or fallback to first catalog entry
  let monitor = typeof getMonitorById === 'function' ? getMonitorById(productId) : null;
  if (!monitor && typeof MONITOR_DATA !== 'undefined' && MONITOR_DATA.length > 0) {
    monitor = MONITOR_DATA[0];
  }

  if (!monitor) {
    console.error('No monitor data found.');
    return;
  }

  // -------------------------------------------------------------------------
  // 2. DOM CACHE
  // -------------------------------------------------------------------------
  const pageTitle = document.getElementById('pageTitle');
  const breadcrumbBrand = document.getElementById('breadcrumbBrand');
  const breadcrumbModel = document.getElementById('breadcrumbModel');

  const detailBrandBadge = document.getElementById('detailBrandBadge');
  const detailStatusBadge = document.getElementById('detailStatusBadge');
  const detailMainImg = document.getElementById('detailMainImg');
  const thumbnailsStrip = document.getElementById('thumbnailsStrip');

  const detailPanelClass = document.getElementById('detailPanelClass');
  const detailColorCheck = document.getElementById('detailColorCheck');

  const detailCategoryTag = document.getElementById('detailCategoryTag');
  const detailTitle = document.getElementById('detailTitle');
  const detailTagline = document.getElementById('detailTagline');
  const detailPriceDisplay = document.getElementById('detailPriceDisplay');
  const detailAvailabilityPill = document.getElementById('detailAvailabilityPill');

  const detailDescription = document.getElementById('detailDescription');
  const detailSpecsGrid = document.getElementById('detailSpecsGrid');

  const btnBuyNow = document.getElementById('btnBuyNow');
  const buyNowToast = document.getElementById('buyNowToast');
  const btnCloseToast = document.getElementById('btnCloseToast');
  const btnEnquireSpec = document.getElementById('btnEnquireSpec');

  // -------------------------------------------------------------------------
  // 3. POPULATE PAGE CONTENT
  // -------------------------------------------------------------------------
  document.title = `${monitor.brand} ${monitor.model} — A2Z Computers`;
  if (breadcrumbBrand) breadcrumbBrand.textContent = monitor.brand;
  if (breadcrumbModel) breadcrumbModel.textContent = monitor.model;

  if (detailBrandBadge) detailBrandBadge.textContent = monitor.brand;
  if (detailStatusBadge) {
    detailStatusBadge.textContent = monitor.badge || monitor.availability;
    const isLimited = (monitor.availability || '').toLowerCase().includes('limited');
    if (isLimited) {
      detailStatusBadge.classList.add('limited');
    }
  }

  // Primary Image
  if (detailMainImg) {
    detailMainImg.src = monitor.image;
    detailMainImg.alt = `${monitor.brand} ${monitor.model}`;
    detailMainImg.onerror = function() {
      this.src = 'assets/products/monitor.jpg';
    };
  }

  // Thumbnail Gallery
  if (thumbnailsStrip) {
    const galleryImages = monitor.gallery && monitor.gallery.length > 0
      ? monitor.gallery
      : [monitor.image, 'assets/products/monitor.jpg'];

    thumbnailsStrip.innerHTML = galleryImages.map((imgSrc, idx) => `
      <button type="button" class="thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${imgSrc}" aria-label="View angle ${idx + 1}">
        <img src="${imgSrc}" alt="${monitor.model} view ${idx + 1}" onerror="this.src='assets/products/monitor.jpg';" />
      </button>
    `).join('');

    thumbnailsStrip.querySelectorAll('.thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        thumbnailsStrip.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const newSrc = btn.getAttribute('data-src');
        if (detailMainImg) {
          detailMainImg.style.opacity = '0.3';
          setTimeout(() => {
            detailMainImg.src = newSrc;
            detailMainImg.style.opacity = '1';
          }, 120);
        }
      });
    });
  }

  // Assurance Card Details
  if (detailPanelClass) {
    detailPanelClass.textContent = `${monitor.panelType} Pro Panel`;
  }
  if (detailColorCheck) {
    detailColorCheck.textContent = monitor.category.includes('Creator') ? 'Calman Verified ΔE<2' : 'Hardware Tested';
  }

  // Header Details
  if (detailCategoryTag) {
    detailCategoryTag.textContent = `${monitor.category} • ${monitor.brand}`;
  }
  if (detailTitle) detailTitle.textContent = monitor.model;
  if (detailTagline) detailTagline.textContent = monitor.tagline;
  if (detailPriceDisplay) detailPriceDisplay.textContent = monitor.priceDisplay;
  if (detailAvailabilityPill) {
    detailAvailabilityPill.textContent = monitor.availability;
    if ((monitor.availability || '').toLowerCase().includes('limited')) {
      detailAvailabilityPill.classList.add('limited');
    }
  }

  // Description
  if (detailDescription) {
    detailDescription.textContent = monitor.description;
  }

  // Comprehensive Specifications Grid
  if (detailSpecsGrid && monitor.fullSpecs) {
    const specsMap = [
      { label: 'Screen Size & Panel', value: `${monitor.fullSpecs.screenSize}` },
      { label: 'Display Resolution', value: monitor.fullSpecs.resolution },
      { label: 'Panel Technology & Coating', value: monitor.fullSpecs.panelType },
      { label: 'Refresh Rate', value: monitor.fullSpecs.refreshRate },
      { label: 'Response Time', value: monitor.fullSpecs.responseTime },
      { label: 'Brightness & Dynamic Range', value: monitor.fullSpecs.brightness },
      { label: 'Color Gamut & Precision', value: monitor.fullSpecs.colorGamut },
      { label: 'Adaptive Sync Technology', value: monitor.fullSpecs.adaptiveSync },
      { label: 'Stand & Ergonomic Adjustments', value: monitor.fullSpecs.standErgo },
      { label: 'Connectivity & I/O Ports', value: monitor.fullSpecs.ports, fullWidth: true },
      { label: 'A2Z & Manufacturer Warranty', value: monitor.fullSpecs.warranty, fullWidth: true }
    ];

    detailSpecsGrid.innerHTML = specsMap.map(spec => `
      <div class="spec-entry ${spec.fullWidth ? 'full-width' : ''}">
        <span class="spec-entry-label">${spec.label}</span>
        <span class="spec-entry-val">${spec.value}</span>
      </div>
    `).join('');
  }

  // -------------------------------------------------------------------------
  // 4. BUY NOW & ENQUIRY INTERACTIONS
  // -------------------------------------------------------------------------
  if (btnBuyNow && buyNowToast) {
    btnBuyNow.addEventListener('click', () => {
      buyNowToast.classList.remove('hidden');
      buyNowToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  if (btnCloseToast && buyNowToast) {
    btnCloseToast.addEventListener('click', () => {
      buyNowToast.classList.add('hidden');
    });
  }

  if (btnEnquireSpec) {
    btnEnquireSpec.href = `index.html#enquiry`;
  }
});
