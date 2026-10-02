/**
 * A2Z COMPUTERS — Laptop Details Page Controller
 * Reads product ID from URL query parameters, populates dynamic specs & gallery,
 * and handles Buy Now placeholder interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. GET PRODUCT ID FROM URL
  // -------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Find laptop or fallback to first entry
  let laptop = getLaptopById(productId);
  if (!laptop) {
    laptop = LAPTOP_DATA[0];
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

  const detailCategoryTag = document.getElementById('detailCategoryTag');
  const detailTitle = document.getElementById('detailTitle');
  const detailTagline = document.getElementById('detailTagline');
  const detailPriceDisplay = document.getElementById('detailPriceDisplay');
  const detailAvailabilityPill = document.getElementById('detailAvailabilityPill');

  const refurbCertificateCard = document.getElementById('refurbCertificateCard');
  const refurbGradeValue = document.getElementById('refurbGradeValue');
  const refurbBatteryValue = document.getElementById('refurbBatteryValue');
  const refurbTestingValue = document.getElementById('refurbTestingValue');
  const refurbAccessoriesValue = document.getElementById('refurbAccessoriesValue');

  const detailDescription = document.getElementById('detailDescription');
  const detailSpecsGrid = document.getElementById('detailSpecsGrid');

  const btnBuyNow = document.getElementById('btnBuyNow');
  const buyNowToast = document.getElementById('buyNowToast');
  const btnCloseToast = document.getElementById('btnCloseToast');

  // -------------------------------------------------------------------------
  // 3. POPULATE PAGE CONTENT
  // -------------------------------------------------------------------------
  document.title = `${laptop.brand} ${laptop.model} — A2Z Computers`;
  if (breadcrumbBrand) breadcrumbBrand.textContent = laptop.brand;
  if (breadcrumbModel) breadcrumbModel.textContent = laptop.model;

  if (detailBrandBadge) detailBrandBadge.textContent = laptop.brand;
  if (detailStatusBadge) {
    detailStatusBadge.textContent = laptop.badge || laptop.availability;
    if (laptop.type === 'refurbished') {
      detailStatusBadge.classList.add('refurb-badge');
    }
  }

  // Primary image
  if (detailMainImg) {
    detailMainImg.src = laptop.image;
    detailMainImg.alt = `${laptop.brand} ${laptop.model}`;
    detailMainImg.onerror = function() {
      this.src = 'assets/products/laptop.jpg';
    };
  }

  // Thumbnail Gallery
  if (thumbnailsStrip) {
    const galleryImages = laptop.gallery && laptop.gallery.length > 0 
      ? laptop.gallery 
      : [laptop.image, 'assets/products/laptop.jpg'];

    thumbnailsStrip.innerHTML = galleryImages.map((imgSrc, idx) => `
      <button type="button" class="thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${imgSrc}" aria-label="View thumbnail ${idx + 1}">
        <img src="${imgSrc}" alt="${laptop.model} view ${idx + 1}" onerror="this.src='assets/products/laptop.jpg';" />
      </button>
    `).join('');

    thumbnailsStrip.querySelectorAll('.thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        thumbnailsStrip.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const newSrc = btn.getAttribute('data-src');
        detailMainImg.style.opacity = '0.4';
        setTimeout(() => {
          detailMainImg.src = newSrc;
          detailMainImg.style.opacity = '1';
        }, 120);
      });
    });
  }

  // Header info
  if (detailCategoryTag) {
    detailCategoryTag.textContent = laptop.type === 'refurbished' 
      ? `A2Z Certified Refurbished • ${laptop.brand}`
      : `Brand New Hardware • ${laptop.brand}`;
  }
  if (detailTitle) detailTitle.textContent = `${laptop.brand} ${laptop.model}`;
  if (detailTagline) detailTagline.textContent = laptop.tagline;
  if (detailPriceDisplay) detailPriceDisplay.textContent = laptop.priceDisplay;
  if (detailAvailabilityPill) detailAvailabilityPill.textContent = laptop.availability;

  // Refurbished Certificate Card
  if (laptop.type === 'refurbished' && refurbCertificateCard) {
    refurbCertificateCard.classList.remove('hidden');
    if (refurbGradeValue) refurbGradeValue.textContent = laptop.conditionGrade || 'Grade A+';
    if (refurbBatteryValue) refurbBatteryValue.textContent = laptop.batteryHealth || 'Health Tested';
    if (refurbTestingValue) refurbTestingValue.textContent = laptop.testingStatus || '40-Point Inspection Passed';
    if (refurbAccessoriesValue) refurbAccessoriesValue.textContent = laptop.includedAccessories || 'Original Charger Included';
  }

  // Description
  if (detailDescription) {
    detailDescription.textContent = laptop.description;
  }

  // Comprehensive Specifications Grid
  if (detailSpecsGrid && laptop.fullSpecs) {
    const specsMap = [
      { label: 'Processor (CPU)', value: laptop.fullSpecs.processor },
      { label: 'Installed RAM', value: laptop.fullSpecs.ram },
      { label: 'Storage Drive', value: laptop.fullSpecs.storage },
      { label: 'Display Panel', value: laptop.fullSpecs.display },
      { label: 'Graphics (GPU)', value: laptop.fullSpecs.graphics },
      { label: 'Operating System', value: laptop.fullSpecs.os },
      { label: 'Battery & Power', value: laptop.fullSpecs.battery },
      { label: 'I/O Ports & Slots', value: laptop.fullSpecs.ports },
      { label: 'Chassis & Weight', value: laptop.fullSpecs.weight },
      { label: 'Hardware Warranty', value: laptop.fullSpecs.warranty }
    ];

    detailSpecsGrid.innerHTML = specsMap
      .filter(item => Boolean(item.value))
      .map(item => `
        <div class="spec-row">
          <span class="spec-key">${item.label}</span>
          <span class="spec-val">${item.value}</span>
        </div>
      `).join('');
  }

  // -------------------------------------------------------------------------
  // 4. BUY NOW PLACEHOLDER INTERACTION
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
});
