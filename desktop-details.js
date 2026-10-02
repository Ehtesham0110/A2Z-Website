/**
 * A2Z COMPUTERS — Desktop PCs Details Page Controller
 * Reads product ID from URL query parameters, populates dynamic specs & gallery,
 * and handles Buy Now placeholder interaction and return tab persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. GET PRODUCT ID AND TAB STATE FROM URL
  // -------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const fromTab = urlParams.get('fromTab');

  // Find desktop or fallback to first catalog entry
  let desktop = typeof getDesktopById === 'function' ? getDesktopById(productId) : null;
  if (!desktop && typeof DESKTOP_DATA !== 'undefined' && DESKTOP_DATA.length > 0) {
    desktop = DESKTOP_DATA[0];
  }

  if (!desktop) {
    console.error('No desktop data found.');
    return;
  }

  // -------------------------------------------------------------------------
  // 2. DOM CACHE
  // -------------------------------------------------------------------------
  const pageTitle = document.getElementById('pageTitle');
  const breadcrumbBrand = document.getElementById('breadcrumbBrand');
  const breadcrumbModel = document.getElementById('breadcrumbModel');
  const breadcrumbCategoryLink = document.getElementById('breadcrumbCategoryLink');

  const detailBrandBadge = document.getElementById('detailBrandBadge');
  const detailStatusBadge = document.getElementById('detailStatusBadge');
  const detailMainImg = document.getElementById('detailMainImg');
  const thumbnailsStrip = document.getElementById('thumbnailsStrip');

  const refurbCertificateCard = document.getElementById('refurbCertificateCard');
  const newPcGuaranteeCard = document.getElementById('newPcGuaranteeCard');
  const refurbGradeValue = document.getElementById('refurbGradeValue');
  const refurbThermalValue = document.getElementById('refurbThermalValue');
  const refurbTestingValue = document.getElementById('refurbTestingValue');
  const refurbAccessoriesValue = document.getElementById('refurbAccessoriesValue');

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
  const btnHeaderBack = document.getElementById('btnHeaderBack');
  const btnBottomReturn = document.getElementById('btnBottomReturn');

  // -------------------------------------------------------------------------
  // 3. POPULATE PAGE CONTENT
  // -------------------------------------------------------------------------
  document.title = `${desktop.brand} ${desktop.model} — A2Z Computers`;
  if (breadcrumbBrand) breadcrumbBrand.textContent = desktop.brand;
  if (breadcrumbModel) breadcrumbModel.textContent = desktop.model;

  // Back link preservation
  const targetTab = fromTab || desktop.type;
  const backHref = targetTab === 'refurbished' ? 'desktops.html?tab=refurbished' : 'desktops.html';
  if (btnHeaderBack) btnHeaderBack.href = backHref;
  if (btnBottomReturn) btnBottomReturn.href = backHref;
  if (breadcrumbCategoryLink) breadcrumbCategoryLink.href = backHref;

  if (detailBrandBadge) detailBrandBadge.textContent = desktop.brand;
  if (detailStatusBadge) {
    const isRefurb = desktop.type === 'refurbished';
    detailStatusBadge.textContent = isRefurb ? (desktop.conditionGrade || desktop.badge) : (desktop.badge || desktop.availability);
    if (isRefurb) {
      detailStatusBadge.classList.add('refurb-badge');
    } else if ((desktop.availability || '').toLowerCase().includes('limited')) {
      detailStatusBadge.classList.add('limited');
    }
  }

  // Primary Image
  if (detailMainImg) {
    detailMainImg.src = desktop.image;
    detailMainImg.alt = `${desktop.brand} ${desktop.model}`;
    detailMainImg.onerror = function() {
      this.src = 'assets/products/desktop-tower.jpg';
    };
  }

  // Thumbnail Gallery
  if (thumbnailsStrip) {
    const galleryImages = desktop.gallery && desktop.gallery.length > 0
      ? desktop.gallery
      : [desktop.image, 'assets/products/desktop-tower.jpg'];

    thumbnailsStrip.innerHTML = galleryImages.map((imgSrc, idx) => `
      <button type="button" class="thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${imgSrc}" aria-label="View angle ${idx + 1}">
        <img src="${imgSrc}" alt="${desktop.model} view ${idx + 1}" onerror="this.src='assets/products/desktop-tower.jpg';" />
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

  // Assurance Cards (Refurbished vs New)
  if (desktop.type === 'refurbished') {
    if (refurbCertificateCard) {
      refurbCertificateCard.classList.remove('hidden');
      if (refurbGradeValue) refurbGradeValue.textContent = desktop.conditionGrade || 'Grade A+ Pristine';
      if (refurbThermalValue) refurbThermalValue.textContent = 'Cleaned & Thermal Re-pasted';
      if (refurbTestingValue) refurbTestingValue.textContent = desktop.testingStatus || '40-Point Hardware Diagnostic Passed';
      if (refurbAccessoriesValue) refurbAccessoriesValue.textContent = desktop.includedAccessories || 'Power Cord & Video Cable';
    }
    if (newPcGuaranteeCard) newPcGuaranteeCard.classList.add('hidden');
  } else {
    if (refurbCertificateCard) refurbCertificateCard.classList.add('hidden');
    if (newPcGuaranteeCard) newPcGuaranteeCard.classList.remove('hidden');
  }

  // Header Details
  if (detailCategoryTag) {
    detailCategoryTag.textContent = desktop.type === 'refurbished' 
      ? `A2Z Certified Refurbished • ${desktop.category}`
      : `High-Performance Hardware • ${desktop.category}`;
  }
  if (detailTitle) detailTitle.textContent = desktop.model;
  if (detailTagline) detailTagline.textContent = desktop.tagline;
  if (detailPriceDisplay) detailPriceDisplay.textContent = desktop.priceDisplay;
  if (detailAvailabilityPill) {
    detailAvailabilityPill.textContent = desktop.availability;
    if (desktop.type === 'refurbished') {
      detailAvailabilityPill.classList.add('refurb-badge');
    } else if ((desktop.availability || '').toLowerCase().includes('limited')) {
      detailAvailabilityPill.classList.add('limited');
    }
  }

  // Description
  if (detailDescription) {
    detailDescription.textContent = desktop.description;
  }

  // Comprehensive Specifications Grid
  if (detailSpecsGrid && desktop.fullSpecs) {
    const specsMap = [
      { label: 'Processor (CPU)', value: desktop.fullSpecs.processor },
      { label: 'Installed RAM', value: desktop.fullSpecs.ram },
      { label: 'Primary Storage', value: desktop.fullSpecs.storage },
      { label: 'Graphics Card (GPU)', value: desktop.fullSpecs.graphics },
      { label: 'Motherboard & Chipset', value: desktop.fullSpecs.motherboard },
      { label: 'Power Supply Unit (PSU)', value: desktop.fullSpecs.powerSupply },
      { label: 'Chassis & Thermal Cooling', value: desktop.fullSpecs.coolingChassis },
      { label: 'Operating System', value: desktop.fullSpecs.os },
      { label: 'I/O Ports & Networking', value: desktop.fullSpecs.ports, fullWidth: true },
      { label: 'Warranty & Tech Support', value: desktop.fullSpecs.warranty, fullWidth: true }
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
