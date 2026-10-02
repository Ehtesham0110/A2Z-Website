/**
 * A2Z COMPUTERS — 3D Orbital Hardware Showcase
 * Physics & Trajectory Engine | Drag Scrubbing | Accessible Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // 1. PRODUCT CATALOG DATA (8 Distinct Computer Hardware Products)
  // ---------------------------------------------------------------------------
  const PRODUCTS = [
    {
      id: 'laptop',
      name: 'Laptops',
      tagline: 'Work • Study • Create',
      category: 'Mobile Computing',
      badge: 'Hardware Solutions',
      image: 'assets/products/laptop.jpg',
      specs: [
        'Multi-Core CPU & GPU with Neural Acceleration',
        'High-Resolution IPS & OLED Display Configurations',
        'RAM Options from 16GB to 64GB',
        'High-Efficiency Battery & Vapor Chamber Cooling',
        'Thunderbolt & High-Speed USB-C Connectivity'
      ],
      description: 'Ideal for professionals, developers, students, and creative workflows requiring reliable mobile performance.'
    },
    {
      id: 'desktop-tower',
      name: 'Desktop PCs',
      tagline: 'Custom Builds',
      category: 'Workstations',
      badge: 'Custom Assembly',
      image: 'assets/products/desktop-tower.jpg',
      specs: [
        'Modular Tower Chassis with Optimized Airflow',
        'Dedicated Graphics Options for Work & Gaming',
        'Liquid Cooling & Quiet Thermal Architecture',
        'High-Speed PCIe NVMe Solid State Storage',
        'Modular High-Efficiency Power Supply'
      ],
      description: 'Custom-assembled desktop systems built to order for rendering, development, and high-demand workloads.'
    },
    {
      id: 'monitor',
      name: 'Monitors',
      tagline: '4K • Ultrawide • IPS',
      category: 'Displays',
      badge: 'Studio Displays',
      image: 'assets/products/monitor.jpg',
      specs: [
        'UHD 4K & Ultrawide Curved Panel Options',
        'High Refresh Rates with Low Response Time',
        'Wide Color Gamut for Professional Editing',
        'USB-C Display Delivery & Multi-Port Inputs',
        'Adjustable Height & Tilt Ergonomic Stand'
      ],
      description: 'Designed for multitasking, color-accurate design work, and comfortable all-day viewing.'
    },
    {
      id: 'printer',
      name: 'Printers',
      tagline: 'Home • Office • Business',
      category: 'Printing & Imaging',
      badge: 'Office Equipment',
      image: 'assets/products/printer.jpg',
      specs: [
        'High-Speed Monochrome & Color Printing',
        'Automatic Two-Sided Duplex Capabilities',
        'Wi-Fi, Mobile Printing & Network Ethernet Support',
        'High-Yield Toner Cartridges for Economical Cost Per Page',
        'Compact Footprint for Office Desktops'
      ],
      description: 'Reliable document printing, scanning, and copying hardware for modern office and home setups.'
    },
    {
      id: 'keyboard',
      name: 'Keyboards',
      tagline: 'Mechanical • Wireless',
      category: 'Input Devices',
      badge: 'Input Hardware',
      image: 'assets/products/keyboard.jpg',
      specs: [
        'Durable Chassis with Low-Profile Layout',
        'Tactile Mechanical Key Switches',
        'Wireless Bluetooth & USB Cable Dual Connectivity',
        'Long-Life Keycaps with Clear Markings',
        'Subtle Ambient Key Backlighting'
      ],
      description: 'Comfortable typing feel and responsive actuation for programming, writing, and daily computing.'
    },
    {
      id: 'mouse',
      name: 'Mice',
      tagline: 'Precision • Ergonomic',
      category: 'Input Devices',
      badge: 'Input Hardware',
      image: 'assets/products/mouse.jpg',
      specs: [
        'Precision Optical Sensor Tracking',
        'Ergonomic Contoured Shape for Reduced Hand Strain',
        'Tactile Scroll Wheel & Programmable Function Buttons',
        'Dampened Click Acoustics',
        'Rechargeable Battery via USB-C'
      ],
      description: 'Precision cursor control and ergonomic support for creative software, spreadsheets, and extended work.'
    },
    {
      id: 'headphones',
      name: 'Headphones',
      tagline: 'Gaming • Professional',
      category: 'Audio & Acoustics',
      badge: 'Audio Hardware',
      image: 'assets/products/headphones.jpg',
      specs: [
        'High-Fidelity Audio Drivers with Balanced Soundstage',
        'Comfortable Cushioned Over-Ear Cups',
        'Detachable Braided Audio Cable',
        'Passive Noise Reduction',
        'Lightweight Adjustable Headband'
      ],
      description: 'Clear audio playback and comfortable wear for calls, media editing, and focused listening.'
    },
    {
      id: 'accessory',
      name: 'Accessories',
      tagline: 'Storage • RAM • More',
      category: 'Internal Components',
      badge: 'Hardware Parts',
      image: 'assets/products/accessory.jpg',
      specs: [
        'High-Performance Desktop & Laptop Processors',
        'PCIe Solid State Drives with Fast Read/Write Speeds',
        'DDR4 & DDR5 RAM Upgrade Kits',
        'Quality Thermal Pastes & Cooling Accessories',
        'Hardware Compatibility & Installation Guidance'
      ],
      description: 'Upgrade components, memory, and fast solid-state storage to keep your systems running at peak speed.'
    }
  ];

  // ---------------------------------------------------------------------------
  // 2. DOM ELEMENTS CACHE
  // ---------------------------------------------------------------------------
  const orbitTrack = document.getElementById('orbitTrack');
  const orbitViewport = document.getElementById('orbitViewport');
  const productDotsGroup = document.getElementById('productDotsGroup');
  const ctrlPlayPause = document.getElementById('ctrlPlayPause');
  const iconPause = document.getElementById('iconPause');
  const iconPlay = document.getElementById('iconPlay');
  const ctrlReverse = document.getElementById('ctrlReverse');
  const ctrlSpeed = document.getElementById('ctrlSpeed');
  const speedLabel = document.getElementById('speedLabel');
  const orbitalTrackPath = document.getElementById('orbitalTrackPath');

  // Modal elements
  const productModal = document.getElementById('productModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const btnModalCloseSecondary = document.getElementById('btnModalCloseSecondary');
  const modalProductImg = document.getElementById('modalProductImg');
  const modalCategoryTag = document.getElementById('modalCategoryTag');
  const modalStatusBadge = document.getElementById('modalStatusBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalTagline = document.getElementById('modalTagline');
  const modalSpecsList = document.getElementById('modalSpecsList');
  const btnModalEnquire = document.getElementById('btnModalEnquire');

  // Enquiry modal elements
  const enquiryModal = document.getElementById('enquiryModal');
  const enquiryCloseBtn = document.getElementById('enquiryCloseBtn');
  const btnHeaderEnquire = document.getElementById('btnHeaderEnquire');
  const btnMobileEnquire = document.getElementById('btnMobileEnquire');
  const enquiryForm = document.getElementById('enquiryForm');
  const enquiryCategory = document.getElementById('enquiryCategory');
  const enquirySuccessMsg = document.getElementById('enquirySuccessMsg');

  // Mobile menu elements
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');

  // ---------------------------------------------------------------------------
  // 3. ORBITAL ENGINE STATE & CONSTANTS
  // ---------------------------------------------------------------------------
  const numItems = PRODUCTS.length;
  let angleStep = (Math.PI * 2) / numItems;
  
  // Base progress angle (radians)
  let progress = 0;
  let targetProgress = 0;
  let isSnapping = false;

  // Animation playback parameters
  let isPlaying = true;
  let direction = 1; // 1 = clockwise / rightward, -1 = reverse
  let speedMultiplier = 1.0;
  const speeds = [1.0, 1.5, 0.5];
  let speedIndex = 0;
  const BASE_ANGULAR_VELOCITY = 0.0020; // ~60s full revolution — slower to reduce distraction

  // Drag / scrub interaction state
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let dragVelocity = 0;
  let isHoverPaused = false;
  let lastTimestamp = 0;

  // Accessibility
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    isPlaying = false;
    updatePlayPauseIcons();
  }

  // Dimension & geometry cache
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;
  let centerX = viewportWidth / 2;
  let centerY = viewportHeight * 0.47;
  let radiusX = 0;
  let radiusY = 0;
  let cardWidth = 210;
  let cardHeight = 210;

  // ---------------------------------------------------------------------------
  // 4. GENERATE DOM ELEMENTS FOR PRODUCT TILES & DOTS
  // ---------------------------------------------------------------------------
  const tileElements = [];
  const dotElements = [];

  function initTilesAndDots() {
    orbitTrack.innerHTML = '';
    productDotsGroup.innerHTML = '';

    PRODUCTS.forEach((product, i) => {
      // Create Product Tile
      const tile = document.createElement('article');
      tile.className = 'product-tile';
      tile.setAttribute('data-product', product.id);
      tile.setAttribute('data-index', i);
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('role', 'button');
      tile.setAttribute('aria-label', `View details for ${product.name}`);

      tile.innerHTML = `
        <div class="tile-hover-pill">${product.id === 'laptop' ? 'Explore Laptops →' : (product.id === 'monitor' ? 'Explore Monitors →' : (product.id === 'desktop-tower' ? 'Explore Desktop PCs →' : 'Inspect Specs'))}</div>
        <div class="tile-image-box">
          <img class="tile-img" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null; this.src='assets/products/laptop.jpg';" />
        </div>
        <div class="tile-caption">
          <div class="tile-title">${product.name}</div>
          <div class="tile-tag">${product.tagline}</div>
        </div>
      `;

      // Tile interactions
      tile.addEventListener('click', (e) => {
        // Prevent click if we were dragging significantly
        if (Math.abs(dragVelocity) > 0.005) return;
        if (product.id === 'laptop') {
          window.location.href = 'laptops.html';
          return;
        }
        if (product.id === 'monitor') {
          window.location.href = 'monitors.html';
          return;
        }
        if (product.id === 'desktop-tower') {
          window.location.href = 'desktops.html';
          return;
        }
        openProductModal(product);
      });

      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (product.id === 'laptop') {
            window.location.href = 'laptops.html';
            return;
          }
          if (product.id === 'monitor') {
            window.location.href = 'monitors.html';
            return;
          }
          if (product.id === 'desktop-tower') {
            window.location.href = 'desktops.html';
            return;
          }
          openProductModal(product);
        }
      });

      tile.addEventListener('mouseenter', () => {
        isHoverPaused = true;
      });

      tile.addEventListener('mouseleave', () => {
        isHoverPaused = false;
      });

      orbitTrack.appendChild(tile);
      tileElements.push(tile);

      // Create Dot for Bottom Console
      const dot = document.createElement('button');
      dot.className = `product-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Focus on ${product.name}`);
      dot.setAttribute('title', product.name);

      dot.addEventListener('click', () => {
        snapToProduct(i);
      });

      productDotsGroup.appendChild(dot);
      dotElements.push(dot);
    });
  }

  // ---------------------------------------------------------------------------
  // 5. GEOMETRY & RESPONSIVE CALCULATION
  // ---------------------------------------------------------------------------
  function updateDimensions() {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    centerX = viewportWidth / 2;

    // Card sizing per breakpoint
    if (viewportWidth <= 480) {
      cardWidth = 140;
      cardHeight = 140;
      centerY = viewportHeight * 0.46;
      radiusX = (viewportWidth / 2) + cardWidth * 0.35;
      radiusY = Math.min(115, viewportHeight * 0.16);
    } else if (viewportWidth <= 768) {
      cardWidth = 164;
      cardHeight = 164;
      centerY = viewportHeight * 0.47;
      radiusX = (viewportWidth / 2) + cardWidth * 0.45;
      radiusY = Math.min(140, viewportHeight * 0.18);
    } else if (viewportWidth <= 1024) {
      cardWidth = 190;
      cardHeight = 190;
      centerY = viewportHeight * 0.47;
      radiusX = (viewportWidth / 2) + cardWidth * 0.50;
      radiusY = Math.min(155, viewportHeight * 0.19);
    } else {
      cardWidth = 210;
      cardHeight = 210;
      centerY = viewportHeight * 0.47;
      radiusX = (viewportWidth / 2) + cardWidth * 0.54;
      radiusY = Math.min(175, viewportHeight * 0.21);
    }

    // Update SVG guide track path for subtle visual reference
    drawOrbitalGuideSvg();
  }

  function drawOrbitalGuideSvg() {
    const svgEl = document.getElementById('orbitalGuideSvg');
    if (!orbitalTrackPath || !svgEl) return;
    
    svgEl.setAttribute('viewBox', `0 0 ${viewportWidth} ${viewportHeight}`);

    const guideRy = radiusY * 1.02;
    // Draw elliptical path in SVG matching card centers
    const d = `
      M ${centerX - radiusX}, ${centerY}
      A ${radiusX} ${guideRy} 0 1,0 ${centerX + radiusX}, ${centerY}
      A ${radiusX} ${guideRy} 0 1,0 ${centerX - radiusX}, ${centerY}
    `;
    orbitalTrackPath.setAttribute('d', d);
  }

  window.addEventListener('resize', () => {
    updateDimensions();
  });

  // ---------------------------------------------------------------------------
  // 6. CORE 3D ORBITAL ANIMATION ENGINE
  // ---------------------------------------------------------------------------
  function renderFrame(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = Math.min(timestamp - lastTimestamp, 64); // Cap delta to prevent jump
    lastTimestamp = timestamp;

    // 1. Advance Progress if not dragging or paused
    if (!isDragging) {
      if (isSnapping) {
        // Smooth ease toward selected product
        const diff = targetProgress - progress;
        progress += diff * 0.08;
        if (Math.abs(diff) < 0.001) {
          progress = targetProgress;
          isSnapping = false;
        }
      } else {
        // Inertia damping after drag release
        if (Math.abs(dragVelocity) > 0.0001) {
          progress += dragVelocity;
          dragVelocity *= 0.93; // Friction
        } else {
          dragVelocity = 0;
          if (isPlaying && !isHoverPaused) {
            progress += direction * BASE_ANGULAR_VELOCITY * speedMultiplier * (delta / 16.66);
          }
        }
      }
    }

    // Keep progress in [0, 2π)
    const twoPi = Math.PI * 2;
    progress = ((progress % twoPi) + twoPi) % twoPi;

    // 2. Calculate and apply 3D transforms for each product tile
    let closestIndex = 0;
    let maxZ = -Infinity;

    for (let i = 0; i < numItems; i++) {
      const tile = tileElements[i];
      if (!tile) continue;

      // Item angle
      const theta = ((progress + i * angleStep) % twoPi + twoPi) % twoPi;

      // Normalized coordinates on ellipse:
      // cos(theta): horizontal [-1, 1]
      // sin(theta): depth & vertical tilt [-1, 1]
      const nx = Math.cos(theta); // -1 (far left) to +1 (far right)
      const nz = Math.sin(theta); // +1 (front-most), -1 (back-most)

      // Screen X coordinate (center of tile)
      const posX = centerX + radiusX * nx;

      // Vertical position Y along inclined ellipse
      // Front cards sweep comfortably below trust bar and above controls
      const posY = centerY + radiusY * nz * 1.02;

      // 3D rotations:
      // rotZ: tilt matching the curve tangent (like Kumo: tilted left on left, tilted right on right)
      let rotZ = 0;
      if (nz >= 0) {
        // Foreground: tilts along tangent: negative on left, positive on right
        rotZ = nx * 22; // tasteful max ~22deg
      } else {
        // Background: subtle reverse tilt as it returns
        rotZ = -nx * 14;
      }

      // 3D perspective tilts:
      const rotY = -nx * 16; // subtle turn toward viewer
      const rotX = nz * 10 - 4; // slight pitch

      // Scale & Depth calculations:
      // Depth factor d in [0, 1] where 1 is closest foreground, 0 is back
      const depthFactor = (nz + 1) / 2;
      const scale = 0.74 + depthFactor * 0.34; // 0.74 to 1.08
      const opacity = 0.48 + depthFactor * 0.52; // 0.48 to 1.0

      // Z-index: Foreground cards sit above central hero (z=20), background cards sit below
      let zIndex = 10;
      if (nz > 0.05) {
        // Foreground
        zIndex = 30 + Math.round(depthFactor * 10);
      } else {
        // Background
        zIndex = 5 + Math.round(depthFactor * 8);
      }

      // Track which item is closest to front-center (nz close to 1)
      if (nz > maxZ) {
        maxZ = nz;
        closestIndex = i;
      }

      // Optional subtle blur on far background tiles for enhanced optical depth
      const blurAmount = nz < -0.3 ? (Math.abs(nz) - 0.3) * 1.8 : 0;
      const filter = blurAmount > 0.2 ? `blur(${blurAmount.toFixed(1)}px)` : 'none';

      // Apply transform using GPU-accelerated translate3d
      const tx = Math.round(posX - cardWidth / 2);
      const ty = Math.round(posY - cardHeight / 2);
      const tz = Math.round(nz * 120);

      tile.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateZ(${rotZ.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      tile.style.opacity = opacity.toFixed(3);
      tile.style.zIndex = zIndex;
      tile.style.filter = filter;
    }

    // 3. Update active dot indicator in bottom controls
    updateActiveDot(closestIndex);

    requestAnimationFrame(renderFrame);
  }

  function updateActiveDot(index) {
    dotElements.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 7. DRAG & TOUCH SCRUBBING ENGINE
  // ---------------------------------------------------------------------------
  function initDragInteractions() {
    const stage = orbitTrack;

    function onPointerDown(e) {
      if (e.target.closest('.modal-close-btn') || e.target.closest('form')) return;
      isDragging = true;
      isSnapping = false;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      lastX = startX;
      dragVelocity = 0;
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = currentX - lastX;
      lastX = currentX;

      // Convert pixel delta into radian progress
      // Dragging right moves items clockwise (direction 1)
      const sensitivity = 0.0042;
      const step = deltaX * sensitivity;
      progress += step;
      dragVelocity = step * 0.65; // Capture momentum
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
    }

    stage.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    stage.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  // ---------------------------------------------------------------------------
  // 8. PRODUCT SNAP NAVIGATION
  // ---------------------------------------------------------------------------
  function snapToProduct(targetIndex) {
    // Front-center position corresponds to theta = π / 2 (where sin(theta) = 1)
    const desiredAngle = Math.PI / 2;
    // targetProgress + targetIndex * angleStep = desiredAngle
    let target = desiredAngle - targetIndex * angleStep;

    const twoPi = Math.PI * 2;
    target = ((target % twoPi) + twoPi) % twoPi;

    // Pick shortest rotational path
    let diff = target - (progress % twoPi);
    if (diff > Math.PI) diff -= twoPi;
    if (diff < -Math.PI) diff += twoPi;

    targetProgress = progress + diff;
    isSnapping = true;
    dragVelocity = 0;
  }

  // ---------------------------------------------------------------------------
  // 9. CONTROLS BAR ACTIONS
  // ---------------------------------------------------------------------------
  function updatePlayPauseIcons() {
    if (isPlaying) {
      iconPause.classList.remove('hidden');
      iconPlay.classList.add('hidden');
      ctrlPlayPause.setAttribute('aria-label', 'Pause animation');
      ctrlPlayPause.setAttribute('title', 'Pause Orbit');
    } else {
      iconPause.classList.add('hidden');
      iconPlay.classList.remove('hidden');
      ctrlPlayPause.setAttribute('aria-label', 'Resume animation');
      ctrlPlayPause.setAttribute('title', 'Resume Orbit');
    }
  }

  ctrlPlayPause.addEventListener('click', () => {
    isPlaying = !isPlaying;
    updatePlayPauseIcons();
  });

  ctrlReverse.addEventListener('click', () => {
    direction *= -1;
  });

  ctrlSpeed.addEventListener('click', () => {
    speedIndex = (speedIndex + 1) % speeds.length;
    speedMultiplier = speeds[speedIndex];
    speedLabel.textContent = `${speedMultiplier.toFixed(1)}x`;
  });

  // ---------------------------------------------------------------------------
  // 10. PRODUCT QUICK-VIEW MODAL
  // ---------------------------------------------------------------------------
  function openProductModal(product) {
    modalProductImg.src = product.image;
    modalProductImg.alt = product.name;
    modalCategoryTag.textContent = product.category;
    modalStatusBadge.textContent = product.badge;
    modalTitle.textContent = product.name;
    modalTagline.textContent = product.tagline;

    modalSpecsList.innerHTML = product.specs
      .map(spec => `<li>${spec}</li>`)
      .join('');

    btnModalEnquire.onclick = () => {
      closeProductModal();
      openEnquiryModal(product.name);
    };

    productModal.classList.add('open');
    productModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    productModal.classList.remove('open');
    productModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeProductModal);
  btnModalCloseSecondary.addEventListener('click', closeProductModal);
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeProductModal();
  });

  // ---------------------------------------------------------------------------
  // 11. ENQUIRY MODAL & CTAS
  // ---------------------------------------------------------------------------
  function openEnquiryModal(preselectedProduct = '') {
    if (preselectedProduct) {
      // Find matching select option
      for (let i = 0; i < enquiryCategory.options.length; i++) {
        if (preselectedProduct.toLowerCase().includes(enquiryCategory.options[i].value.toLowerCase())) {
          enquiryCategory.selectedIndex = i;
          break;
        }
      }
    }
    enquirySuccessMsg.classList.add('hidden');
    enquiryModal.classList.add('open');
    enquiryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeEnquiryModal() {
    enquiryModal.classList.remove('open');
    enquiryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btnHeaderEnquire.addEventListener('click', () => openEnquiryModal());
  btnMobileEnquire.addEventListener('click', () => {
    closeMobileMenu();
    openEnquiryModal();
  });
  enquiryCloseBtn.addEventListener('click', closeEnquiryModal);
  enquiryModal.addEventListener('click', (e) => {
    if (e.target === enquiryModal) closeEnquiryModal();
  });

  // Central Hero CTAs
  const ctaExploreProducts = document.getElementById('ctaExploreProducts');
  const ctaOurServices = document.getElementById('ctaOurServices');

  ctaExploreProducts.addEventListener('click', (e) => {
    e.preventDefault();
    // Smoothly snap to top laptop
    snapToProduct(0);
  });

  ctaOurServices.addEventListener('click', (e) => {
    e.preventDefault();
    openEnquiryModal('Repairs');
  });

  // Form Submission
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    enquirySuccessMsg.classList.remove('hidden');
    setTimeout(() => {
      enquiryForm.reset();
      closeEnquiryModal();
    }, 2400);
  });

  // Global Escape Key to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeEnquiryModal();
      closeMobileMenu();
    }
  });

  // ---------------------------------------------------------------------------
  // 12. MOBILE NAVIGATION DRAWER
  // ---------------------------------------------------------------------------
  function toggleMobileMenu() {
    const isOpen = mobileMenuDrawer.classList.toggle('open');
    mobileMenuBtn.classList.toggle('open', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenuDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  }

  function closeMobileMenu() {
    mobileMenuDrawer.classList.remove('open');
    mobileMenuBtn.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuDrawer.setAttribute('aria-hidden', 'true');
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Smooth scroll links & mobile nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetNav = this.getAttribute('data-nav');
      if (targetNav) {
        e.preventDefault();
        closeMobileMenu();
        if (targetNav === 'products') snapToProduct(0);
        else if (targetNav === 'custom-builds') snapToProduct(1);
        else if (targetNav === 'repairs') openEnquiryModal('Repairs');
        else if (targetNav === 'business') openEnquiryModal('Enterprise');
        else if (targetNav === 'about') snapToProduct(7);
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 13. INITIALIZE ENGINE
  // ---------------------------------------------------------------------------
  initTilesAndDots();
  updateDimensions();
  initDragInteractions();
  requestAnimationFrame(renderFrame);
});
