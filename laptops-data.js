/**
 * A2Z COMPUTERS — Laptop Catalog Data Store
 * Structured demo inventory for New & Refurbished Laptops.
 * Shared across laptops.html and laptop-details.html.
 */

const LAPTOP_DATA = [
  // =========================================================================
  // NEW LAPTOPS (12 Models across ASUS, Dell, HP, Apple, Lenovo, Acer)
  // =========================================================================
  {
    id: 'asus-rog-g16',
    type: 'new',
    brand: 'ASUS',
    model: 'ROG Zephyrus G16 (2024)',
    tagline: 'Ultra-slim OLED Gaming & Creator Powerhouse',
    price: 179990,
    priceDisplay: '₹1,79,990',
    availability: 'In Stock',
    badge: 'New Arrival',
    image: 'assets/products/asus.jpg',
    gallery: [
      'assets/products/asus.jpg',
      'assets/products/laptop.jpg',
      'assets/products/dell.jpg'
    ],
    shortSpecs: 'Core Ultra 9 • 32GB RAM • 1TB SSD • RTX 4070 • 240Hz OLED',
    fullSpecs: {
      processor: 'Intel Core Ultra 9 185H (16 Cores, 22 Threads, up to 5.1GHz)',
      ram: '32GB LPDDR5X 7467MHz Dual-Channel',
      storage: '1TB M.2 PCIe Gen 4.0 NVMe SSD',
      display: '16.0" 2.5K (2560 x 1600) ROG Nebula OLED, 240Hz, 0.2ms, 100% DCI-P3, G-Sync',
      graphics: 'NVIDIA GeForce RTX 4070 Laptop GPU 8GB GDDR6 (105W Max TGP)',
      os: 'Windows 11 Home 64-bit',
      battery: '90Wh High-Capacity 4-cell Li-ion with 100W USB-C Fast Charge',
      ports: '1x Thunderbolt 4, 1x USB-C 3.2 Gen 2 (DP/PD), 2x USB-A 3.2, HDMI 2.1, SD Card Reader, 3.5mm Combo Audio',
      weight: '1.85 kg (4.08 lbs) CNC Aluminum Unibody',
      warranty: '1-Year Manufacturer Warranty + A2Z Tech Desk Support'
    },
    description: 'The ASUS ROG Zephyrus G16 combines an ultra-premium CNC-machined aluminum chassis with a jaw-dropping 2.5K 240Hz OLED display. Powered by the Intel Core Ultra 9 processor and NVIDIA RTX 4070, it delivers workstation-grade creative throughput and tournament-grade gaming in a razor-thin 1.49cm profile.',
    isDemo: true
  },
  {
    id: 'dell-xps-15',
    type: 'new',
    brand: 'Dell',
    model: 'XPS 15 9530 Creator Edition',
    tagline: 'Precision Crafted InfinityEdge Display for Studio Work',
    price: 194990,
    priceDisplay: '₹1,94,990',
    availability: 'In Stock',
    badge: 'Creator Choice',
    image: 'assets/products/dell.jpg',
    gallery: [
      'assets/products/dell.jpg',
      'assets/products/laptop.jpg',
      'assets/products/lenovo.jpg'
    ],
    shortSpecs: 'Core i9-13900H • 32GB RAM • 1TB SSD • RTX 4060 • 3.5K OLED Touch',
    fullSpecs: {
      processor: '13th Gen Intel Core i9-13900H (14 Cores, 20 Threads, up to 5.4GHz)',
      ram: '32GB DDR5 4800MHz (Dual SO-DIMM Upgradeable up to 64GB)',
      storage: '1TB M.2 PCIe Gen 4 NVMe Solid State Drive',
      display: '15.6" 3.5K (3456 x 2160) OLED InfinityEdge Touch, 400 nits, 100% DCI-P3',
      graphics: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (50W TGP)',
      os: 'Windows 11 Pro 64-bit',
      battery: '86Wh Integrated 6-Cell Battery with 130W Type-C AC Adapter',
      ports: '2x Thunderbolt 4 with DP & Power Delivery, 1x USB-C 3.2 Gen 2, Full-size SD Card v6.0 slot, 3.5mm Headphone Jack',
      weight: '1.92 kg (4.23 lbs) CNC Machined Aluminum & Carbon Fiber Palmrest',
      warranty: '1-Year Dell Hardware Warranty'
    },
    description: 'Designed for graphic designers, videographers, and architecture studios, the Dell XPS 15 offers a stunning 3.5K OLED touch display with 100% DCI-P3 color precision. Its diamond-cut aluminum exterior and carbon fiber palm rest ensure extreme durability and cool typing comfort.',
    isDemo: true
  },
  {
    id: 'apple-macbook-pro-16',
    type: 'new',
    brand: 'Apple',
    model: 'MacBook Pro 16" (M3 Pro)',
    tagline: 'Extreme Efficiency & Liquid Retina XDR Brilliance',
    price: 249900,
    priceDisplay: '₹2,49,900',
    availability: 'In Stock',
    badge: 'Pro Tier',
    image: 'assets/products/macbook.jpg',
    gallery: [
      'assets/products/macbook.jpg',
      'assets/products/laptop.jpg',
      'assets/products/asus.jpg'
    ],
    shortSpecs: 'Apple M3 Pro (12-core CPU, 18-core GPU) • 36GB Unified Memory • 512GB SSD',
    fullSpecs: {
      processor: 'Apple M3 Pro (12-Core CPU with 6 Performance & 6 Efficiency Cores)',
      ram: '36GB High-Speed Unified Memory (150GB/s bandwidth)',
      storage: '512GB Ultra-Fast NVMe SSD Storage',
      display: '16.2" Liquid Retina XDR Display (3456 x 2234), 1600 nits peak HDR, ProMotion 120Hz',
      graphics: '18-Core Integrated GPU with Hardware-Accelerated Ray Tracing',
      os: 'macOS Sonoma',
      battery: '100Wh Lithium-Polymer (Up to 22 Hours Apple TV app movie playback)',
      ports: '3x Thunderbolt 4 (USB-C), HDMI Port, SDXC Card Slot, MagSafe 3 Port, 3.5mm Headphone Jack',
      weight: '2.14 kg (4.71 lbs) 100% Recycled Aluminum Enclosure',
      warranty: '1-Year Apple Manufacturer Limited Warranty'
    },
    description: 'With the game-changing M3 Pro chip architecture, this 16-inch MacBook Pro delivers relentless sustained performance whether plugged into the wall or operating on battery. Enjoy unprecedented battery longevity, whisper-quiet thermal operation, and the best laptop audio system ever engineered.',
    isDemo: true
  },
  {
    id: 'hp-spectre-14',
    type: 'new',
    brand: 'HP',
    model: 'Spectre x360 2-in-1 14"',
    tagline: 'Gem-cut Convertible with 2.8K OLED Touchscreen',
    price: 154990,
    priceDisplay: '₹1,54,990',
    availability: 'In Stock',
    badge: '2-in-1 Touch',
    image: 'assets/products/hp.jpg',
    gallery: [
      'assets/products/hp.jpg',
      'assets/products/laptop.jpg',
      'assets/products/dell.jpg'
    ],
    shortSpecs: 'Intel Core Ultra 7 • 16GB RAM • 1TB SSD • 2.8K OLED 120Hz Touch • Stylus Included',
    fullSpecs: {
      processor: 'Intel Core Ultra 7 155H (16 Cores, Intel AI Boost NPU, up to 4.8GHz)',
      ram: '16GB LPDDR5x 7467MHz Dual-Channel Onboard',
      storage: '1TB PCIe Gen 4 NVMe TLC M.2 SSD',
      display: '14.0" 2.8K (2880 x 1800) OLED Touch, 120Hz VRR, 0.2ms, HDR 500 nits, HP Rechargeable Tilt Pen included',
      graphics: 'Intel Arc Integrated Graphics',
      os: 'Windows 11 Home 64-bit with Microsoft Office Home & Student',
      battery: '68Wh 4-cell Li-ion Polymer with 65W USB-C Power Adapter (Fast Charge 50% in 45 min)',
      ports: '2x Thunderbolt 4 with USB Type-C 40Gbps, 1x USB Type-A 10Gbps, 1x Headphone/Mic combo',
      weight: '1.44 kg (3.17 lbs) All-Metal CNC Aluminum Finish',
      warranty: '1-Year HP On-Site Hardware Warranty'
    },
    description: 'The HP Spectre x360 seamlessly transforms from an ultra-portable laptop to an expressive digital canvas. Featuring AI-enhanced studio webcams, auto audio tuning, and a vibrant 2.8K 120Hz OLED touch panel, it is the pinnacle of executive versatility.',
    isDemo: true
  },
  {
    id: 'lenovo-thinkpad-x1',
    type: 'new',
    brand: 'Lenovo',
    model: 'ThinkPad X1 Carbon Gen 11',
    tagline: 'Legendary Enterprise Durability & Keyboard Ergonomics',
    price: 169990,
    priceDisplay: '₹1,69,990',
    availability: 'In Stock',
    badge: 'Business Flagship',
    image: 'assets/products/lenovo.jpg',
    gallery: [
      'assets/products/lenovo.jpg',
      'assets/products/laptop.jpg',
      'assets/products/macbook.jpg'
    ],
    shortSpecs: 'Core i7-1365U vPro • 32GB RAM • 1TB SSD • 14" WUXGA Low Power IPS • 1.12kg',
    fullSpecs: {
      processor: '13th Gen Intel Core i7-1365U vPro Enterprise (10 Cores, 12 Threads, up to 5.2GHz)',
      ram: '32GB LPDDR5 6400MHz Dual-Channel',
      storage: '1TB M.2 2280 PCIe 4.0x4 Performance NVMe Opal 2.0 SSD',
      display: '14.0" WUXGA (1920 x 1200) IPS Anti-glare, 400 nits, 100% sRGB, Eyesafe Low Blue Light',
      graphics: 'Intel Iris Xe Graphics',
      os: 'Windows 11 Pro 64-bit Enterprise Ready',
      battery: '57Wh Battery with Rapid Charge (80% in 60 minutes) 65W USB-C Adapter',
      ports: '2x Thunderbolt 4, 2x USB-A 3.2 Gen 1, HDMI 2.1, Nano-SIM slot (optional), 3.5mm Headphone Jack',
      weight: '1.12 kg (2.48 lbs) Carbon-Fiber Top Cover & Magnesium Chassis (MIL-STD 810H Certified)',
      warranty: '3-Year Lenovo Premier Onsite Support'
    },
    description: 'Renowned as the gold standard for executive and corporate mobile computing, the ThinkPad X1 Carbon Gen 11 weighs a featherlight 1.12 kg while passing military-grade torture tests. Features the world-renowned spill-resistant ThinkPad keyboard and TrackPoint.',
    isDemo: true
  },
  {
    id: 'acer-predator-16',
    type: 'new',
    brand: 'Acer',
    model: 'Predator Helios 16 Gaming',
    tagline: 'Extreme Esports Frame Rates & Dual AeroBlade Cooling',
    price: 149990,
    priceDisplay: '₹1,49,990',
    availability: 'In Stock',
    badge: 'Esports Ready',
    image: 'assets/products/acer.jpg',
    gallery: [
      'assets/products/acer.jpg',
      'assets/products/asus.jpg',
      'assets/products/laptop.jpg'
    ],
    shortSpecs: 'Core i7-14700HX • 16GB RAM • 1TB SSD • RTX 4070 140W • 16" WQXGA 240Hz',
    fullSpecs: {
      processor: '14th Gen Intel Core i7-14700HX (20 Cores, 28 Threads, up to 5.5GHz)',
      ram: '16GB DDR5 5600MHz (Upgradeable to 64GB across dual slots)',
      storage: '1TB PCIe Gen 4 NVMe Solid State Drive (Dual M.2 slots available)',
      display: '16.0" WQXGA (2560 x 1600) IPS, 240Hz, 3ms Overdrive, 500 nits, 100% DCI-P3, G-Sync',
      graphics: 'NVIDIA GeForce RTX 4070 8GB GDDR6 Dedicated GPU (140W Maximum Graphics Power with MUX Switch)',
      os: 'Windows 11 Home 64-bit',
      battery: '90Wh Li-ion Battery with 330W High-Output Power Supply',
      ports: '2x Thunderbolt 4, 3x USB-A 3.2 Gen 2, HDMI 2.1, RJ-45 Gigabit Killer Ethernet E2600, MicroSD Card Reader',
      weight: '2.60 kg (5.73 lbs) with Custom Per-Key RGB Mechanical Keyboard',
      warranty: '1-Year Acer International Traveler Warranty'
    },
    description: 'The Acer Predator Helios 16 harnesses the 20-core 14th Gen HX processor and a fully unleashed 140W RTX 4070. Equipped with 5th Gen AeroBlade 3D metal fans and liquid metal thermal interface, it guarantees zero throttling during long gaming marathons and heavy rendering.',
    isDemo: true
  },
  {
    id: 'apple-macbook-air-15',
    type: 'new',
    brand: 'Apple',
    model: 'MacBook Air 15" (M2)',
    tagline: 'Impossibly Thin Design with Expansive 15.3" Liquid Retina',
    price: 134900,
    priceDisplay: '₹1,34,900',
    availability: 'In Stock',
    badge: 'Popular',
    image: 'assets/products/macbook.jpg',
    gallery: [
      'assets/products/macbook.jpg',
      'assets/products/laptop.jpg',
      'assets/products/dell.jpg'
    ],
    shortSpecs: 'Apple M2 (8-core CPU, 10-core GPU) • 16GB Unified Memory • 512GB SSD • Fanless',
    fullSpecs: {
      processor: 'Apple M2 Chip (8-Core CPU with 4 performance cores & 4 efficiency cores)',
      ram: '16GB Unified Memory',
      storage: '512GB Fast SSD Storage',
      display: '15.3" Liquid Retina Display (2880 x 1864) with True Tone, 500 nits brightness, Wide Color (P3)',
      graphics: '10-Core Integrated GPU with Hardware Video Decode Engine',
      os: 'macOS Sonoma',
      battery: '66.5Wh Lithium-Polymer (Up to 18 Hours Apple TV playback) with 35W Dual USB-C Compact Adapter',
      ports: 'MagSafe 3 Charging Port, 2x Thunderbolt / USB 4 ports, 3.5mm Headphone Jack with spatial audio support',
      weight: '1.51 kg (3.3 lbs) 1.15 cm Thin Fanless Architecture',
      warranty: '1-Year Apple Limited Warranty'
    },
    description: 'The 15-inch MacBook Air gives you room for more of what you love with a spacious Liquid Retina display. Completely silent fanless design with up to 18 hours of real-world battery life, all inside an impossibly thin and rigid all-aluminum casing.',
    isDemo: true
  },
  {
    id: 'asus-zenbook-14',
    type: 'new',
    brand: 'ASUS',
    model: 'ZenBook 14 OLED (UX3405)',
    tagline: 'Intel Core Ultra AI Ultrabook with 3K 120Hz Lumina OLED',
    price: 114990,
    priceDisplay: '₹1,14,990',
    availability: 'In Stock',
    badge: 'OLED Choice',
    image: 'assets/products/asus.jpg',
    gallery: [
      'assets/products/asus.jpg',
      'assets/products/laptop.jpg',
      'assets/products/hp.jpg'
    ],
    shortSpecs: 'Core Ultra 7 155H • 16GB RAM • 1TB SSD • 3K 120Hz OLED • 1.2kg',
    fullSpecs: {
      processor: 'Intel Core Ultra 7 155H Processor with Neural Processing Unit (NPU)',
      ram: '16GB LPDDR5X 7467MHz Dual Channel',
      storage: '1TB M.2 NVMe PCIe 4.0 SSD',
      display: '14.0" 3K (2880 x 1800) ASUS Lumina OLED 16:10, 120Hz, 0.2ms, 600 nits HDR Peak, 100% DCI-P3',
      graphics: 'Intel Arc Graphics Built-in',
      os: 'Windows 11 Home 64-bit',
      battery: '75Wh High-Capacity Battery (Up to 15+ Hours usage) with 65W Type-C Fast Charger',
      ports: '2x Thunderbolt 4 supporting display/power, 1x USB-A 3.2 Gen 1, 1x HDMI 2.1 TMDS, 3.5mm Combo Audio',
      weight: '1.20 kg (2.65 lbs) All-Metal Ponder Blue Finish',
      warranty: '1-Year ASUS International Warranty'
    },
    description: 'Elevate everyday productivity with the featherlight ZenBook 14 OLED. Equipped with ASUS Lumina OLED 3K display, Harman Kardon audio, and next-gen AI compute cores that accelerate local machine learning and image generation.',
    isDemo: true
  },
  {
    id: 'dell-inspiron-16',
    type: 'new',
    brand: 'Dell',
    model: 'Inspiron 16 Plus (7630)',
    tagline: 'Spacious 16-Inch Powerhouse for Code & Multitasking',
    price: 124990,
    priceDisplay: '₹1,24,990',
    availability: 'In Stock',
    badge: 'Value Performance',
    image: 'assets/products/dell.jpg',
    gallery: [
      'assets/products/dell.jpg',
      'assets/products/laptop.jpg',
      'assets/products/acer.jpg'
    ],
    shortSpecs: 'Core i7-13700H • 16GB RAM • 1TB SSD • RTX 3050 6GB • 2.5K 16:10',
    fullSpecs: {
      processor: '13th Gen Intel Core i7-13700H (14 Cores, 20 Threads, up to 5.0GHz Turbo)',
      ram: '16GB DDR5 4800MHz Dual-Channel (Upgradeable)',
      storage: '1TB M.2 PCIe NVMe Solid State Drive',
      display: '16.0" 2.5K (2560 x 1600) Anti-Glare IPS Non-Touch, 300 nits, 100% sRGB, ComfortView Plus',
      graphics: 'NVIDIA GeForce RTX 3050 6GB GDDR6',
      os: 'Windows 11 Home with Lifetime MS Office',
      battery: '86Wh Integrated 6-Cell Battery with 130W Barrel/Type-C Adapter',
      ports: '1x Thunderbolt 4, 2x USB 3.2 Gen 1 Type-A, HDMI 2.0, SD Card Reader, Headphone/Microphone Jack',
      weight: '2.06 kg (4.54 lbs) Dark Green Anodized Aluminum Top',
      warranty: '1-Year Dell Hardware Warranty'
    },
    description: 'The Dell Inspiron 16 Plus combines workstation-tier processing with an expansive 16:10 display format. Enjoy plenty of vertical screen real estate for multiple IDE panes, large spreadsheets, and video timelines.',
    isDemo: true
  },
  {
    id: 'hp-envy-16',
    type: 'new',
    brand: 'HP',
    model: 'Envy 16 Studio Edition',
    tagline: 'Vapor Chamber Cooled Creator Station with WQXGA 120Hz',
    price: 164990,
    priceDisplay: '₹1,64,990',
    availability: 'Available to Order',
    badge: 'Studio Ready',
    image: 'assets/products/hp.jpg',
    gallery: [
      'assets/products/hp.jpg',
      'assets/products/asus.jpg',
      'assets/products/laptop.jpg'
    ],
    shortSpecs: 'Core i7-13700H • 32GB RAM • 1TB SSD • RTX 4060 8GB • 16" WQXGA 120Hz',
    fullSpecs: {
      processor: '13th Gen Intel Core i7-13700H (14 Cores, 20 Threads, up to 5.0GHz)',
      ram: '32GB DDR5 5200MHz Dual-Channel RAM',
      storage: '1TB PCIe Gen 4 NVMe TLC M.2 SSD',
      display: '16.0" WQXGA (2560 x 1600) IPS, 120Hz, 400 nits, 100% sRGB, Eyesafe Certified',
      graphics: 'NVIDIA GeForce RTX 4060 8GB GDDR6 Dedicated GPU',
      os: 'Windows 11 Pro 64-bit',
      battery: '83Wh Li-ion Polymer Battery with 200W Smart AC Power Adapter',
      ports: '2x Thunderbolt 4 with USB Type-C 40Gbps, 2x USB-A 10Gbps, HDMI 2.1, MicroSD Card Reader, 3.5mm Audio',
      weight: '2.34 kg (5.16 lbs) Natural Silver All-Aluminum Build',
      warranty: '1-Year HP Hardware Support'
    },
    description: 'The HP Envy 16 Studio is engineered to maintain high sustained clock speeds without thermal throttling. A vapor chamber thermal system and dual 12V fans keep the system cool during intensive 4K exports and Blender renders.',
    isDemo: true
  },
  {
    id: 'lenovo-yoga-9i',
    type: 'new',
    brand: 'Lenovo',
    model: 'Yoga 9i Gen 8 2-in-1',
    tagline: 'Bowers & Wilkins Rotating Soundbar with 4K OLED',
    price: 174990,
    priceDisplay: '₹1,74,990',
    availability: 'In Stock',
    badge: 'Luxury 2-in-1',
    image: 'assets/products/lenovo.jpg',
    gallery: [
      'assets/products/lenovo.jpg',
      'assets/products/laptop.jpg',
      'assets/products/macbook.jpg'
    ],
    shortSpecs: 'Core i7-1360P • 16GB RAM • 1TB SSD • 14" 4K OLED Touch • Rotating Soundbar',
    fullSpecs: {
      processor: '13th Gen Intel Core i7-1360P (12 Cores, 16 Threads, up to 5.0GHz)',
      ram: '16GB LPDDR5 5200MHz Soldered',
      storage: '1TB M.2 PCIe 4.0 NVMe SSD',
      display: '14.0" 4K (3840 x 2400) OLED Touchscreen, 400 nits, 100% DCI-P3, Dolby Vision, Lenovo Precision Pen 2 included',
      graphics: 'Intel Iris Xe Graphics',
      os: 'Windows 11 Home 64-bit with Pen Suite',
      battery: '75Wh Battery with Rapid Charge Boost (3 hours usage in 15 min charge) 100W USB-C Adapter',
      ports: '2x Thunderbolt 4, 1x USB-C 3.2 Gen 2, 1x USB-A 3.2 Gen 1, 3.5mm Headphone Jack',
      weight: '1.40 kg (3.08 lbs) Comfort Edge Rounded Aluminum Ergonomic Frame',
      warranty: '1-Year Lenovo Premium Care'
    },
    description: 'The Yoga 9i features an industry-exclusive Bowers & Wilkins 360-degree rotating soundbar hinge, surrounding you in spatial Dolby Atmos audio in laptop, tent, stand, or tablet mode. The 4K OLED panel delivers infinite contrast and rich saturated color.',
    isDemo: true
  },
  {
    id: 'acer-swift-go-14',
    type: 'new',
    brand: 'Acer',
    model: 'Swift Go 14 OLED (2024)',
    tagline: 'Lightweight AI Copilot+ Ultrabook with 90Hz OLED',
    price: 84990,
    priceDisplay: '₹84,990',
    availability: 'In Stock',
    badge: 'Best Value OLED',
    image: 'assets/products/acer.jpg',
    gallery: [
      'assets/products/acer.jpg',
      'assets/products/laptop.jpg',
      'assets/products/dell.jpg'
    ],
    shortSpecs: 'Intel Core Ultra 5 125H • 16GB RAM • 512GB SSD • 2.8K 90Hz OLED • 1.3kg',
    fullSpecs: {
      processor: 'Intel Core Ultra 5 125H (14 Cores, 18 Threads, Intel AI Boost NPU, up to 4.5GHz)',
      ram: '16GB LPDDR5X Dual-Channel',
      storage: '512GB PCIe Gen 4 NVMe Solid State Drive',
      display: '14.0" 2.8K (2880 x 1800) OLED 16:10, 90Hz, 0.2ms, 500 nits HDR Peak, 100% DCI-P3',
      graphics: 'Intel Arc Graphics with AI Upscaling',
      os: 'Windows 11 Home with Dedicated Copilot AI Key',
      battery: '65Wh 3-cell Li-ion Battery with 100W USB-C Fast Charger',
      ports: '2x Thunderbolt 4, 2x USB-A 3.2 Gen 1, HDMI 2.1, MicroSD Card Reader, Audio Jack',
      weight: '1.32 kg (2.91 lbs) Thin Anodized Aluminum Chassis',
      warranty: '1-Year Acer International Hardware Warranty'
    },
    description: 'The Acer Swift Go 14 punches far above its price class with a gorgeous 2.8K 90Hz OLED panel, dedicated hardware NPU for on-device AI tasks, and a full aluminum chassis under 1.35 kg. An ideal laptop for students, coders, and traveling professionals.',
    isDemo: true
  },

  // =========================================================================
  // REFURBISHED LAPTOPS (6 Verified Hardware Models with Condition & Battery)
  // =========================================================================
  {
    id: 'dell-latitude-7420-refurb',
    type: 'refurbished',
    brand: 'Dell',
    model: 'Latitude 7420 Business Ultrabook',
    tagline: 'A2Z Certified Refurbished Enterprise Ultrabook',
    price: 36990,
    priceDisplay: '₹36,990',
    availability: 'In Stock (4 Units)',
    badge: 'Grade A+ Refurbished',
    image: 'assets/products/dell.jpg',
    gallery: [
      'assets/products/dell.jpg',
      'assets/products/laptop.jpg',
      'assets/products/lenovo.jpg'
    ],
    shortSpecs: 'Core i5-1145G7 vPro • 16GB RAM • 512GB SSD • 14" FHD IPS • Grade A+',
    fullSpecs: {
      processor: '11th Gen Intel Core i5-1145G7 vPro (4 Cores, 8 Threads, up to 4.4GHz Turbo)',
      ram: '16GB LPDDR4x 4267MHz Memory',
      storage: '512GB PCIe M.2 NVMe SSD (Brand New High-Speed Replacement Drive)',
      display: '14.0" Full HD (1920 x 1080) Anti-Glare IPS, 300 nits, Super Low Power',
      graphics: 'Intel Iris Xe Graphics',
      os: 'Windows 11 Pro 64-bit (Fresh Clean Installation with Digital License)',
      battery: '63Wh Battery with ExpressCharge (94% Tested Health Capacity)',
      ports: '2x Thunderbolt 4 with Power Delivery & DisplayPort, 1x USB 3.2 Gen 1, HDMI 2.0, uSD Card Reader, Audio Jack',
      weight: '1.22 kg (2.70 lbs) Carbon Fiber Weave Exterior',
      warranty: '6-Month A2Z Hardware Replacement Warranty'
    },
    conditionGrade: 'Grade A+ (Pristine Condition, zero screen scratches, zero dents)',
    batteryHealth: '94% Original Capacity Verified (OEM battery diagnostics certified)',
    includedAccessories: 'Original Dell 65W Type-C AC Adapter, Heavy-duty Power Cable, A2Z Protective Pouch',
    testingStatus: 'A2Z 40-Point Diagnostic Check Passed: Keypad, Thermals, Ports, Audio & Display Benchmarked',
    description: 'Corporate-leased Dell Latitude ultrabook thoroughly inspected, cleaned, and upgraded by A2Z Computers technicians. Built with a carbon-fiber reinforced structure and reliable enterprise components, it delivers robust reliability at a fraction of the cost of new retail.',
    isDemo: true
  },
  {
    id: 'apple-macbook-air-m1-refurb',
    type: 'refurbished',
    brand: 'Apple',
    model: 'MacBook Air 13" (M1)',
    tagline: 'A2Z Certified Refurbished Apple Silicon Classic',
    price: 52990,
    priceDisplay: '₹52,990',
    availability: 'Limited Stock (2 Units)',
    badge: 'Grade A Refurbished',
    image: 'assets/products/macbook.jpg',
    gallery: [
      'assets/products/macbook.jpg',
      'assets/products/laptop.jpg',
      'assets/products/asus.jpg'
    ],
    shortSpecs: 'Apple M1 Chip • 8GB Unified Memory • 256GB SSD • 13.3" Retina • Space Gray',
    fullSpecs: {
      processor: 'Apple M1 Chip (8-Core CPU with 4 performance & 4 efficiency cores)',
      ram: '8GB Unified Memory',
      storage: '256GB Apple Fast NVMe SSD Storage',
      display: '13.3" LED-backlit Retina Display (2560 x 1600) with True Tone, 400 nits brightness, Wide Color (P3)',
      graphics: '7-Core Integrated GPU & 16-Core Neural Engine',
      os: 'macOS Sonoma (Clean Factory Reset)',
      battery: '49.9Wh Lithium-Polymer (91% Tested Health, under 180 lifetime cycles)',
      ports: '2x Thunderbolt / USB 4 ports, 3.5mm Headphone Jack',
      weight: '1.29 kg (2.8 lbs) All-Metal Space Gray Unibody',
      warranty: '6-Month A2Z Hardware Warranty'
    },
    conditionGrade: 'Grade A (Excellent condition, subtle minor signs of light desktop use, flawless screen glass)',
    batteryHealth: '91% Battery Health Capacity (178 Cycle Count, tested 12+ hours continuous playback)',
    includedAccessories: 'Original Apple 30W USB-C Power Adapter, 2-Meter Braided USB-C Cable, A2Z Quality Certificate',
    testingStatus: 'A2Z Certified: Thermal Stress Passed, Logic Board Inspected, Keyboard & Trackpad 100% Calibrated',
    description: 'The M1 MacBook Air remains one of the best value computing investments ever created. Totally silent, completely fanless, and delivering instantaneous app launches with incredible battery longevity. Certified and tested by A2Z Computers technicians.',
    isDemo: true
  },
  {
    id: 'lenovo-thinkpad-t14-refurb',
    type: 'refurbished',
    brand: 'Lenovo',
    model: 'ThinkPad T14 Gen 2',
    tagline: 'A2Z Certified Refurbished Enterprise Workhorse',
    price: 39990,
    priceDisplay: '₹39,990',
    availability: 'In Stock (5 Units)',
    badge: 'Grade A+ Refurbished',
    image: 'assets/products/lenovo.jpg',
    gallery: [
      'assets/products/lenovo.jpg',
      'assets/products/laptop.jpg',
      'assets/products/dell.jpg'
    ],
    shortSpecs: 'Core i7-1165G7 • 16GB RAM • 512GB NVMe SSD • 14" FHD IPS • Grade A+',
    fullSpecs: {
      processor: '11th Gen Intel Core i7-1165G7 (4 Cores, 8 Threads, up to 4.7GHz)',
      ram: '16GB DDR4 3200MHz (Expandable up to 48GB with open SODIMM slot)',
      storage: '512GB M.2 PCIe 3.0 NVMe SSD',
      display: '14.0" FHD (1920 x 1080) IPS Anti-glare, 300 nits, 45% NTSC',
      graphics: 'Intel Iris Xe Graphics',
      os: 'Windows 11 Pro 64-bit Genuine Digital License',
      battery: '50Wh Battery (92% Health, Rapid Charge capable with 65W adapter)',
      ports: '2x Thunderbolt 4, 2x USB-A 3.2 Gen 1, HDMI 2.0, MicroSD Card Reader, RJ-45 Gigabit Ethernet, Audio Jack',
      weight: '1.53 kg (3.37 lbs) Rugged Glass Fiber Reinforced Plastic Frame',
      warranty: '6-Month A2Z Comprehensive Hardware Warranty'
    },
    conditionGrade: 'Grade A+ (Near Mint, zero cracks, clean touchpad and keys)',
    batteryHealth: '92% Battery Health (Verified under continuous video playback loop)',
    includedAccessories: 'Original Lenovo 65W USB-C Charger & Indian 3-Pin Power Cable',
    testingStatus: 'A2Z 40-Point Hardware Inspected: Motherboard, BIOS Updated, Fresh Thermal Grizzly Paste applied',
    description: 'The ThinkPad T series is famous across multinational corporate fleets for indestructible engineering. This Gen 2 model with 11th Gen Core i7 offers dual Thunderbolt 4 ports, physical RJ-45 LAN, and full RAM upgradeability.',
    isDemo: true
  },
  {
    id: 'hp-elitebook-840-refurb',
    type: 'refurbished',
    brand: 'HP',
    model: 'EliteBook 840 G8',
    tagline: 'A2Z Certified Refurbished Premium Business Notebook',
    price: 38490,
    priceDisplay: '₹38,490',
    availability: 'In Stock (3 Units)',
    badge: 'Grade A Refurbished',
    image: 'assets/products/hp.jpg',
    gallery: [
      'assets/products/hp.jpg',
      'assets/products/asus.jpg',
      'assets/products/laptop.jpg'
    ],
    shortSpecs: 'Core i5-1135G7 • 16GB RAM • 512GB SSD • 14" FHD IPS • Silver Aluminum',
    fullSpecs: {
      processor: '11th Gen Intel Core i5-1135G7 (4 Cores, 8 Threads, up to 4.2GHz Turbo)',
      ram: '16GB DDR4 3200MHz (Dual Channel, dual SODIMM slots)',
      storage: '512GB PCIe NVMe Solid State Drive',
      display: '14.0" FHD (1920 x 1080) IPS Anti-Glare, 250 nits, HP Sure View privacy ready',
      graphics: 'Intel Iris Xe Graphics',
      os: 'Windows 11 Pro 64-bit Genuine',
      battery: '53Wh 3-cell Li-ion Long Life (89% Tested Health Capacity)',
      ports: '2x Thunderbolt 4 with USB4 Type-C, 2x USB-A 3.2 Gen 1, HDMI 2.0b, Audio Combo Jack',
      weight: '1.35 kg (2.98 lbs) All-Metal Silver Aluminum Finish',
      warranty: '6-Month A2Z Hardware Support'
    },
    conditionGrade: 'Grade A (Excellent physical condition, polished clean metal finish)',
    batteryHealth: '89% Original Capacity (Tested 7+ hours productivity life)',
    includedAccessories: 'Original HP 65W Type-C Power Adapter, Standard Power Cord',
    testingStatus: 'A2Z Benchmarked: Audio Bang & Olufsen verified, keyboard backlight checked, ports tested',
    description: 'Sleek silver metal styling paired with enterprise security features. The EliteBook 840 G8 provides Bang & Olufsen tuned audio, dual Thunderbolt 4 connections, and a crisp Full HD display. Refurbished and backed by A2Z Computers.',
    isDemo: true
  },
  {
    id: 'asus-tuf-f15-refurb',
    type: 'refurbished',
    brand: 'ASUS',
    model: 'TUF Gaming F15 (FX506)',
    tagline: 'A2Z Certified Refurbished Budget High-FPS Gaming',
    price: 49990,
    priceDisplay: '₹49,990',
    availability: 'Limited Stock (2 Units)',
    badge: 'Grade A Refurbished',
    image: 'assets/products/asus.jpg',
    gallery: [
      'assets/products/asus.jpg',
      'assets/products/acer.jpg',
      'assets/products/laptop.jpg'
    ],
    shortSpecs: 'Core i5-11400H • 16GB RAM • 512GB NVMe • RTX 3050 4GB • 144Hz FHD',
    fullSpecs: {
      processor: '11th Gen Intel Core i5-11400H (6 Cores, 12 Threads, up to 4.5GHz)',
      ram: '16GB DDR4 3200MHz Dual-Channel (Upgraded)',
      storage: '512GB PCIe 3.0 NVMe M.2 SSD + Additional Empty M.2 Slot',
      display: '15.6" Full HD (1920 x 1080) IPS, 144Hz Refresh Rate, Adaptive-Sync',
      graphics: 'NVIDIA GeForce RTX 3050 4GB GDDR6 Dedicated GPU (Up to 75W with Dynamic Boost)',
      os: 'Windows 11 Home 64-bit',
      battery: '48Wh Li-ion Battery (88% Health Capacity) with 150W Original Charger',
      ports: '1x Thunderbolt 4 / USB-C, 3x USB-A 3.2 Gen 1, HDMI 2.0b, RJ45 LAN, 3.5mm Audio',
      weight: '2.30 kg (5.07 lbs) Eclipse Gray Military-Grade Chassis',
      warranty: '6-Month A2Z Hardware Warranty'
    },
    conditionGrade: 'Grade A (Great shape, minor palm rest gloss from gentle use, screen in flawless 144Hz condition)',
    batteryHealth: '88% Battery Capacity (Tested for 3.5 hours productivity / 1.5 hours unconstrained load)',
    includedAccessories: 'Original ASUS 150W AC Adapter, Heavy-duty Power Cable, A2Z Laptop Sleeve',
    testingStatus: 'A2Z Gaming Benchmarked: 3DMark FireStrike & FurMark thermal stress tests executed with zero artifacts',
    description: 'Get into high-refresh competitive gaming without overspending. The ASUS TUF F15 combines a 6-core 11th Gen Core i5 with a dedicated NVIDIA RTX 3050 GPU and a smooth 144Hz display. Repasted with premium thermal compound and cleaned by A2Z Computers.',
    isDemo: true
  },
  {
    id: 'acer-aspire-5-refurb',
    type: 'refurbished',
    brand: 'Acer',
    model: 'Aspire 5 Slim (A515)',
    tagline: 'A2Z Certified Refurbished Student & Office Essential',
    price: 29990,
    priceDisplay: '₹29,990',
    availability: 'In Stock (6 Units)',
    badge: 'Grade A+ Refurbished',
    image: 'assets/products/acer.jpg',
    gallery: [
      'assets/products/acer.jpg',
      'assets/products/laptop.jpg',
      'assets/products/hp.jpg'
    ],
    shortSpecs: 'Core i5-1135G7 • 16GB RAM • 512GB SSD • 15.6" Full HD IPS • Grade A+',
    fullSpecs: {
      processor: '11th Gen Intel Core i5-1135G7 (4 Cores, 8 Threads, up to 4.2GHz)',
      ram: '16GB DDR4 3200MHz Memory (Dual Channel Upgraded)',
      storage: '512GB M.2 NVMe SSD (Brand New High-Speed Replacement Drive)',
      display: '15.6" Full HD (1920 x 1080) Acer ComfyView IPS Narrow-Border Display',
      graphics: 'Intel Iris Xe Graphics',
      os: 'Windows 11 Home 64-bit Genuine',
      battery: '48Wh Li-ion Battery (93% Tested Capacity, 45W AC Adapter included)',
      ports: '1x USB-C 3.2 Gen 1, 2x USB-A 3.2 Gen 1, 1x USB-A 2.0, HDMI 2.0, RJ-45 LAN, Headphone/Speaker Jack',
      weight: '1.65 kg (3.64 lbs) Pure Silver Aluminum Top Cover',
      warranty: '6-Month A2Z Hardware Warranty'
    },
    conditionGrade: 'Grade A+ (Like-new condition, clean keyboard and screen, pristine top lid)',
    batteryHealth: '93% Battery Health (Tested for 6+ hours web browsing & document work)',
    includedAccessories: 'Original Acer 45W Power Adapter, Indian 3-Pin Cable, A2Z Warranty Certificate',
    testingStatus: 'A2Z Inspected: Wi-Fi 6 stability checked, SSD health 100%, speakers & mic tested',
    description: 'An affordable, high-reliability 15.6-inch laptop for students, office accountants, and family computing. Features an aluminum lid, numeric keypad, full-size HDMI port, and upgraded 16GB RAM for smooth multitasking.',
    isDemo: true
  }
];

// Helper to look up a laptop by its ID
function getLaptopById(id) {
  return LAPTOP_DATA.find(item => item.id === id) || null;
}
