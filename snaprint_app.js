// Snaprint Digital Printing - Application Logic
// Elegant Midnight Navy Blue Edition

// Initial Product Catalog
const PRODUCTS_DATA = [
  {
    id: "spanduk-outdoor",
    name: "Spanduk / Banner Outdoor Flexi",
    category: "Banner & Spanduk",
    categoryKey: "banner",
    badge: "Best Seller",
    type: "area", // priced per m2
    basePrice: 20000, // per m2
    minSize: 1, // min 1 m2
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    desc: "Spanduk outdoor tahan panas & hujan dengan tinta solvent tahan hingga 1 tahun. Cocok untuk toko, event, dan promosi pinggir jalan.",
    materials: [
      { id: "flexi-280", name: "Flexi Standar 280gr (Ekonomis)", price: 20000 },
      { id: "flexi-340", name: "Flexi Tebal 340gr (High Quality)", price: 28000 },
      { id: "flexi-korea-440", name: "Flexi Korea 440gr (Super Tebal Matte)", price: 38000 },
      { id: "flexi-jerman-510", name: "Flexi Jerman 510gr (Premium Tarpaulin)", price: 65000 }
    ],
    finishings: [
      { id: "mata-ayam-4", name: "Mata Ayam 4 Sudut (Standar)", price: 0 },
      { id: "mata-ayam-keliling", name: "Mata Ayam Keliling (Per 1 Meter)", price: 5000 },
      { id: "selongsong-kanan-kiri", name: "Selongsong Kanan - Kiri", price: 3000 },
      { id: "selongsong-atas-bawah", name: "Selongsong Atas - Bawah", price: 3000 },
      { id: "lipat-press", name: "Lipat Press Keliling (Rapi)", price: 2000 },
      { id: "tanpa-finishing", name: "Potong Pas Gambar (Polos)", price: 0 }
    ],
    defaultWidth: 200, // cm
    defaultHeight: 100 // cm
  },
  {
    id: "x-banner-indoor",
    name: "X-Banner & Y-Banner Indoor + Stand",
    category: "Banner & Spanduk",
    categoryKey: "banner",
    badge: "Cepat Jadi",
    type: "fixed",
    basePrice: 65000,
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=600&q=80",
    desc: "Standing banner indoor resolusi tinggi dengan bahan Albatros / Luster anti robek & tidak melengkung. Sudah termasuk kaki X-stand hitam.",
    materials: [
      { id: "albatros-matte", name: "Albatros 180gr + Laminasi Doff (60x160cm)", price: 65000 },
      { id: "albatros-glossy", name: "Albatros 180gr + Laminasi Glossy (60x160cm)", price: 65000 },
      { id: "luster-premium", name: "Luster Premium Pearl Texture (60x160cm)", price: 85000 },
      { id: "albatros-80x180", name: "Albatros Besar (80x180cm) + Kaki X-Stand", price: 95000 }
    ],
    finishings: [
      { id: "stand-fiber", name: "Stand Fiber Hitam + Sarung", price: 0 },
      { id: "stand-alumunium", name: "Stand Alumunium Kokoh + Sarung", price: 25000 }
    ]
  },
  {
    id: "roll-up-banner",
    name: "Roll Up Banner Aluminium Portable",
    category: "Banner & Spanduk",
    categoryKey: "banner",
    badge: "Elegan",
    type: "fixed",
    basePrice: 165000,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80",
    desc: "Display banner premium roll-up otomatis dengan cassette aluminium tebal. Praktis ditarik dan dibawa kemana saja dalam tas jinjing.",
    materials: [
      { id: "rollup-60x160", name: "Albatros + Laminasi Doff (60 x 160 cm)", price: 165000 },
      { id: "rollup-80x200", name: "Albatros + Laminasi Doff (80 x 200 cm)", price: 195000 },
      { id: "rollup-85x200", name: "Albatros + Laminasi Doff (85 x 200 cm)", price: 215000 }
    ],
    finishings: [
      { id: "rollup-standar", name: "Body Aluminium Standar + Sarung", price: 0 },
      { id: "rollup-stainless", name: "Body Stainless Heavy Duty", price: 45000 }
    ]
  },
  {
    id: "stiker-label-a3",
    name: "Stiker Label Makanan / Kemasan A3+ Kiss Cut",
    category: "Stiker & Label",
    categoryKey: "stiker",
    badge: "Promo UMKM",
    type: "fixed",
    basePrice: 12000,
    image: "https://images.unsplash.com/photo-1589384267710-7a255964d4b1?auto=format&fit=crop&w=600&q=80",
    desc: "Cetak stiker label potong kiss cut (setengah putus siap copot). Cocok untuk botol frozen food, box kemasan, cup minuman, dan kosmetik.",
    materials: [
      { id: "chromo-a3", name: "Stiker Chromo / Kertas Glossy A3+", price: 12000 },
      { id: "vinyl-glossy-a3", name: "Stiker Vinyl Putih Glossy Waterproof A3+", price: 17000 },
      { id: "vinyl-doff-a3", name: "Stiker Vinyl Putih Matte / Doff A3+", price: 17000 },
      { id: "transparan-a3", name: "Stiker Vinyl Transparan Bening A3+", price: 18000 },
      { id: "hologram-a3", name: "Stiker Hologram Laser Pelangi A3+", price: 25000 },
      { id: "kraft-a3", name: "Stiker Vintage Kraft Coklat A3+", price: 15000 }
    ],
    finishings: [
      { id: "kiss-cut", name: "Potong Kiss Cut (Tinggal Cabut Tempel)", price: 3000 },
      { id: "die-cut", name: "Potong Die Cut (Putus Satuan Pcs)", price: 6000 },
      { id: "lam-doff-a3", name: "Kiss Cut + Tambahan Laminasi Doff Panas", price: 7000 },
      { id: "lam-gloss-a3", name: "Kiss Cut + Tambahan Laminasi Glossy Panas", price: 7000 },
      { id: "tanpa-cut", name: "Tanpa Potong (Lembaran A3+ Utuh)", price: 0 }
    ]
  },
  {
    id: "kartu-nama-exclusive",
    name: "Kartu Nama Bisnis (1 Box = 100 Pcs)",
    category: "Brosur & Dokumen",
    categoryKey: "brosur",
    badge: "Best Value",
    type: "fixed",
    basePrice: 35000,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
    desc: "Kartu nama full color 2 sisi cetak mesin digital Fuji Xerox / Konica Minolta. Warna tajam, presisi, bonus box plastik mika bening.",
    materials: [
      { id: "art-carton-260", name: "Art Carton 260gr (1 Sisi)", price: 35000 },
      { id: "art-carton-260-2s", name: "Art Carton 260gr (2 Sisi Bolak-Balik)", price: 45000 },
      { id: "ac260-lam-doff", name: "Art Carton 260gr 2 Sisi + Laminasi Doff Lembut", price: 60000 },
      { id: "linen-jepang", name: "Kertas Fancy Linen Jepang Tekstur Garis (2 Sisi)", price: 75000 },
      { id: "bw-lokal", name: "Kertas Fancy Blues White (BW) Berserat", price: 70000 }
    ],
    finishings: [
      { id: "potong-lurus", name: "Sudut Standar Kotak Lurus", price: 0 },
      { id: "sudut-round", name: "Sudut Membulat (Round Corner 4 Sudut)", price: 10000 },
      { id: "foil-emas", name: "Hot Print Poly Emas / Silver Logo", price: 35000 }
    ]
  },
  {
    id: "brosur-flyer-a4",
    name: "Brosur / Flyer Full Color (Paket 1 Rim / 500 Lembar)",
    category: "Brosur & Dokumen",
    categoryKey: "brosur",
    badge: "Cetak Cepat",
    type: "fixed",
    basePrice: 225000,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    desc: "Brosur promosi sales, menu restoran, atau flyer perumahan. Hasil cetak jernih dengan kertas Art Paper licin premium.",
    materials: [
      { id: "ap120-a5-1s", name: "Ukuran A5 - Art Paper 120gr (1 Sisi / 500 Pcs)", price: 165000 },
      { id: "ap120-a5-2s", name: "Ukuran A5 - Art Paper 120gr (2 Sisi / 500 Pcs)", price: 225000 },
      { id: "ap150-a4-1s", name: "Ukuran A4 - Art Paper 150gr (1 Sisi / 500 Pcs)", price: 295000 },
      { id: "ap150-a4-2s", name: "Ukuran A4 - Art Paper 150gr (2 Sisi / 500 Pcs)", price: 395000 },
      { id: "ap150-a4-lipat3", name: "Ukuran A4 - Art Paper 150gr Lipat 3 (500 Pcs)", price: 440000 }
    ],
    finishings: [
      { id: "tanpa-lipat", name: "Potong Flat Lembaran", price: 0 },
      { id: "lipat-2", name: "Lipat 2 (Half Fold)", price: 25000 },
      { id: "lipat-3-z", name: "Lipat 3 (Z-Fold / C-Fold)", price: 35000 }
    ]
  },
  {
    id: "tote-bag-custom",
    name: "Tote Bag Kanvas & Blacu Custom Cetak DTF",
    category: "Merchandise & Souvenir",
    categoryKey: "merchandise",
    badge: "Trendy",
    type: "fixed",
    basePrice: 28000,
    image: "https://images.unsplash.com/photo-1597484662317-c93121b671a5?auto=format&fit=crop&w=600&q=80",
    desc: "Tote bag bahan Blacu / Kanvas tebal dengan cetak DTF full color anti luntur. Cocok untuk seminar kit, event, kado, dan merchandise brand.",
    materials: [
      { id: "blacu-30x40", name: "Bahan Blacu Cream 30x40cm + Sablon DTF A4", price: 28000 },
      { id: "kanvas-putih-30x40", name: "Bahan Kanvas Putih Tebal 30x40cm + DTF A4", price: 38000 },
      { id: "kanvas-hitam-30x40", name: "Bahan Kanvas Hitam Tebal 30x40cm + DTF A4", price: 43000 },
      { id: "kanvas-zipper", name: "Bahan Kanvas Hitam Premium + Resleting (Zipper)", price: 49000 }
    ],
    finishings: [
      { id: "kemas-plastik", name: "Kemas Plastik Satuan OPP Rapi", price: 1000 },
      { id: "kemas-box", name: "Kemas Box Kraft Coklat + Tali Rami", price: 6000 }
    ]
  },
  {
    id: "mug-custom-keramik",
    name: "Mug Keramik Custom Coating Sublimasi",
    category: "Merchandise & Souvenir",
    categoryKey: "merchandise",
    badge: "Souvenir",
    type: "fixed",
    basePrice: 22000,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    desc: "Mug keramik SNI putih polos dengan cetak sublimasi full color. Aman untuk microwave dan minuman panas/dingin.",
    materials: [
      { id: "mug-putih-sni", name: "Mug Standar Putih SNI 11oz", price: 22000 },
      { id: "mug-bunglon-magic", name: "Mug Bunglon Magic (Berubah Warna saat Panas)", price: 42000 },
      { id: "mug-warna-dalam", name: "Mug Inner Color (Warna Bagian Dalam)", price: 26000 }
    ],
    finishings: [
      { id: "box-putih-polos", name: "Box Putih Standar Gratis", price: 0 },
      { id: "box-jendela", name: "Box Jendela Kraft + Pita Souvenir", price: 3500 }
    ]
  },
  {
    id: "kaos-dtf-custom",
    name: "Kaos Polos Cotton Combed 30s + Cetak DTF",
    category: "Tekstil & DTF",
    categoryKey: "tekstil",
    badge: "Sablon Kilat",
    type: "fixed",
    basePrice: 58000,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    desc: "Kaos distro bahan 100% Cotton Combed 30s lembut dan adem, dengan cetak DTF (Direct to Film) full color tidak pecah.",
    materials: [
      { id: "kaos-dtf-a4", name: "Kaos Combed 30s + Cetak DTF Depan A4", price: 58000 },
      { id: "kaos-dtf-a3", name: "Kaos Combed 30s + Cetak DTF Depan A3 (Besar)", price: 68000 },
      { id: "kaos-dtf-depan-belakang", name: "Kaos Combed 30s + Cetak Depan (Logo) & Belakang (A3)", price: 78000 }
    ],
    finishings: [
      { id: "lipat-plastik", name: "Finishing Press Ulang + Plastik Ziplock", price: 2000 },
      { id: "hangtag-label", name: "Hangtag Snaprint + Plastik Satuan", price: 4000 }
    ]
  },
  {
    id: "box-packaging-kemasan",
    name: "Box Kemasan Makanan / Hardbox Custom",
    category: "Kemasan & Packaging",
    categoryKey: "kemasan",
    badge: "Custom Box",
    type: "fixed",
    basePrice: 1500,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    desc: "Cetak lunch box, box snack, corrugated mailer box, atau box hampers dengan cetak logo brand full color dan laminasi foodgrade.",
    materials: [
      { id: "kraft-pe-foodgrade", name: "Kraft PE Brown Foodgrade 290gr (Min 100 Pcs)", price: 1800 },
      { id: "ivory-foodgrade-300", name: "Ivory White Premium 300gr + Lam Doff (Min 100 Pcs)", price: 2500 },
      { id: "duplex-350", name: "Duplex Board 350gr Ekonomis (Min 100 Pcs)", price: 1500 }
    ],
    finishings: [
      { id: "window-mika", name: "Tambah Jendela Plastik Mika Bening", price: 500 },
      { id: "hotprint-gold", name: "Foil Tulisan Emas Logo", price: 800 }
    ]
  }
];

// Blog Articles
const BLOG_ARTICLES = [
  {
    id: "blog-1",
    title: "Panduan Memilih Bahan Stiker: Vinyl vs Chromo vs Kraft",
    category: "Tips Percetakan",
    date: "8 September 2026",
    image: "https://images.unsplash.com/photo-1589384267710-7a255964d4b1?auto=format&fit=crop&w=600&q=80",
    snippet: "Ketahui perbedaan stiker tahan air Vinyl, stiker kertas Chromo yang ekonomis, dan nuansa vintage stiker Kraft untuk branding produk Anda.",
    content: `
      <p class="mb-3 text-slate-300">Memilih bahan stiker label yang tepat sangat menentukan citra brand dan ketahanan kemasan Anda. Berikut panduannya:</p>
      <h4 class="font-bold text-sky-400 mt-2 mb-1">1. Stiker Chromo (Ekonomis & Glossy)</h4>
      <p class="mb-3 text-slate-400">Berbahan dasar kertas licin mengkilap. Sangat cocok untuk produk makanan kering, toples kue kering, atau label barcode yang tidak terkena air dan tidak disimpan di freezer.</p>
      <h4 class="font-bold text-sky-400 mt-2 mb-1">2. Stiker Vinyl (Waterproof & Anti Sobek)</h4>
      <p class="mb-3 text-slate-400">Berbahan dasar plastik sintetis lentur. Tahan air 100%, tahan minyak, dan aman dimasukkan ke dalam kulkas / freezer (frozen food, botol minuman, kosmetik).</p>
      <h4 class="font-bold text-sky-400 mt-2 mb-1">3. Stiker Kraft (Coklat Alami & Eco-Friendly)</h4>
      <p class="text-slate-400">Memberikan kesan organik, rustic, dan ramah lingkungan. Sangat populer untuk produk kopi artisan, roti buatan rumahan, dan lilin aromaterapi.</p>
    `
  },
  {
    id: "blog-2",
    title: "Perbedaan Spanduk Flexi 280g, 340g, dan Flexi Korea 440g",
    category: "Panduan Bahan",
    date: "5 September 2026",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    snippet: "Jangan salah pilih bahan banner luar ruangan! Simak ketahanan spanduk terhadap cuaca ekstrem dan paparan sinar matahari.",
    content: `
      <p class="mb-3 text-slate-300">Spanduk outdoor memiliki beragam ketebalan gramasi (GSM). Pemilihan yang tepat akan menghemat anggaran Anda:</p>
      <ul class="list-disc pl-5 space-y-2 text-slate-400">
        <li><b class="text-white">Flexi Standar 280gr:</b> Cocok untuk event singkat (1-3 hari), bazar, umbul-umbul sementara, atau promosi musiman berbiaya hemat.</li>
        <li><b class="text-white">Flexi Tebal 340gr:</b> Standar kualitas menengah yang kokoh, tidak mudah robek terkena hembusan angin jalanan, tahan 3-6 bulan.</li>
        <li><b class="text-white">Flexi Korea 440gr:</b> Bahan tebal bertekstur matte halus, hasil cetak sangat tajam, serat kuat tahan tarikan kencang, tahan panas hujan hingga 1 tahun+.</li>
      </ul>
    `
  },
  {
    id: "blog-3",
    title: "Setting File Cetak CMYK & 300 DPI Agar Hasil Tidak Gelap & Buram",
    category: "Preflight Desain",
    date: "1 September 2026",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=600&q=80",
    snippet: "Trik menyiapkan file sebelum dikirim ke percetakan agar warna monitor dan hasil cetak fisik tetap akurat.",
    content: `
      <p class="mb-3 text-slate-300">Banyak desainer pemula mengalami hasil cetak lebih gelap daripada yang terlihat di layar HP/Monitor. Ikuti tips preflight ini:</p>
      <ol class="list-decimal pl-5 space-y-2 text-slate-400">
        <li><b class="text-white">Ubah Color Mode ke CMYK:</b> Monitor menggunakan RGB (cahaya), sedangkan mesin cetak memakai tinta CMYK. Selalu convert ke CMYK FOGRA39 atau Coated GRACoL.</li>
        <li><b class="text-white">Resolusi Gambar Minimal 150-300 DPI:</b> Pastikan foto tidak pecah saat diperbesar ke ukuran cetak asli (1:1 scale).</li>
        <li><b class="text-white">Tambahkan Bleed 3mm:</b> Beri batas lebihan potong di sekeliling desain agar tidak ada garis putih saat dipotong pisau mesin.</li>
        <li><b class="text-white">Create Outline / Flatten Font:</b> Kunci jenis font menjadi vector agar tidak berubah menjadi font standar saat dibuka operator cetak.</li>
      </ol>
    `
  }
];

// Available Promo Vouchers
const PROMO_VOUCHERS = [
  {
    code: "ONGKIR10K",
    title: "Potongan Ongkir Rp 10.000",
    desc: "Berlaku untuk semua kurir pengiriman dengan min. belanja Rp 100.000",
    minSpend: 100000,
    discountAmount: 10000,
    type: "fixed"
  },
  {
    code: "SNAPRINT20",
    title: "Diskon Promo 20% (Maks Rp 30.000)",
    desc: "Diskon cetak khusus pelanggan setia Snaprint dengan min. belanja Rp 120.000",
    minSpend: 120000,
    discountPercent: 0.2,
    maxDiscount: 30000,
    type: "percent"
  },
  {
    code: "UMKMBANGKIT",
    title: "Potongan Rp 25.000 Paket UMKM",
    desc: "Khusus pemesanan stiker label & packaging dengan min. belanja Rp 150.000",
    minSpend: 150000,
    discountAmount: 25000,
    type: "fixed"
  }
];

// State Store
let cart = JSON.parse(localStorage.getItem("snaprint_cart") || "[]");
let orders = JSON.parse(localStorage.getItem("snaprint_orders") || "[]");
let appliedVoucher = JSON.parse(localStorage.getItem("snaprint_voucher") || "null");
let userProfile = JSON.parse(
  localStorage.getItem("snaprint_profile") ||
    JSON.stringify({
      name: "Ashabil Syauqi",
      phone: "081234567890",
      email: "ashabilsyauqi@gmail.com",
      address: "Jl. Percetakan Negara Raya No. 128, Jakarta Pusat",
      tier: "Gold Member",
      points: 450
    })
);

let activeCategory = "all";
let searchQuery = "";
let currentCustomizingProduct = null;
let uploadedFileMeta = null;

// Currency Formatter
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

// Toast Notifications
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const bgClass =
    type === "success"
      ? "bg-emerald-600/90 text-white border border-emerald-400/30"
      : type === "error"
      ? "bg-rose-600/90 text-white border border-rose-400/30"
      : "bg-sky-700/90 text-white border border-sky-400/30";
  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-3 opacity-0 ${bgClass}`;
  toast.innerHTML = `
    <span class="font-bold flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-xs">${icon}</span>
    <span class="text-xs font-semibold">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("translate-y-3", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("translate-y-3", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem("snaprint_cart", JSON.stringify(cart));
  localStorage.setItem("snaprint_voucher", JSON.stringify(appliedVoucher));
  updateCartBadge();
  renderCartDrawer();
}

// Save Orders to LocalStorage
function saveOrders() {
  localStorage.setItem("snaprint_orders", JSON.stringify(orders));
}

// Save Profile to LocalStorage
function saveProfile() {
  localStorage.setItem("snaprint_profile", JSON.stringify(userProfile));
}

// Update Cart Header Counter
function updateCartBadge() {
  const badgeCount = document.getElementById("cart-count");
  const badgeTotal = document.getElementById("cart-header-total");
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.subtotal, 0);

  if (badgeCount) badgeCount.textContent = totalItems;
  if (badgeTotal) badgeTotal.textContent = formatRupiah(totalPrice);
}

// Render Products Grid
function renderProducts() {
  const container = document.getElementById("products-grid");
  const emptyState = document.getElementById("empty-products");
  if (!container) return;

  let filtered = PRODUCTS_DATA.filter((item) => {
    const matchCat = activeCategory === "all" || item.categoryKey === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  container.innerHTML = filtered
    .map(
      (prod) => `
    <div class="glass-card rounded-3xl overflow-hidden card-hover-effect flex flex-col justify-between group">
      <div>
        <div class="relative overflow-hidden aspect-[4/3] bg-slate-900 cursor-pointer" onclick="openCustomizer('${prod.id}')">
          <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" loading="lazy" />
          <span class="absolute top-3 left-3 bg-sky-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-lg">
            ${prod.badge}
          </span>
          <span class="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-sky-200 border border-sky-500/30 text-[11px] px-2.5 py-0.5 rounded-lg">
            ${prod.category}
          </span>
        </div>

        <div class="p-5">
          <h3 class="font-bold text-white text-base leading-snug group-hover:text-sky-400 transition-colors cursor-pointer" onclick="openCustomizer('${prod.id}')">
            ${prod.name}
          </h3>
          <p class="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            ${prod.desc}
          </p>

          <div class="mt-4 pt-3 border-t border-sky-500/15 flex items-baseline justify-between">
            <span class="text-xs text-slate-400 font-medium">Mulai dari:</span>
            <span class="text-lg font-black text-amber-400 font-heading">
              ${formatRupiah(prod.basePrice)} ${prod.type === "area" ? '<span class="text-xs text-slate-400 font-normal">/ m²</span>' : '<span class="text-xs text-slate-400 font-normal">/ pcs</span>'}
            </span>
          </div>
        </div>
      </div>

      <div class="p-5 pt-0">
        <button onclick="openCustomizer('${prod.id}')" class="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 active:scale-[0.98] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-900/40">
          <svg class="w-4 h-4 text-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          Kustom & Hitung Harga
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

// Open Customizer Modal for a Specific Product
function openCustomizer(productId) {
  const product = PRODUCTS_DATA.find((p) => p.id === productId) || PRODUCTS_DATA[0];
  currentCustomizingProduct = product;
  uploadedFileMeta = null;

  const modal = document.getElementById("customizer-modal");
  const modalTitle = document.getElementById("modal-prod-title");
  const modalCategory = document.getElementById("modal-prod-category");
  const modalImg = document.getElementById("modal-prod-img");
  const modalDesc = document.getElementById("modal-prod-desc");

  if (modalTitle) modalTitle.textContent = product.name;
  if (modalCategory) modalCategory.textContent = product.category;
  if (modalImg) modalImg.src = product.image;
  if (modalDesc) modalDesc.textContent = product.desc;

  // Render Dimensions input if area type
  const dimensionContainer = document.getElementById("dimension-wrapper");
  if (product.type === "area") {
    dimensionContainer.classList.remove("hidden");
    document.getElementById("cust-width").value = product.defaultWidth || 200;
    document.getElementById("cust-height").value = product.defaultHeight || 100;
  } else {
    dimensionContainer.classList.add("hidden");
  }

  // Render Materials options
  const matContainer = document.getElementById("cust-materials");
  matContainer.innerHTML = product.materials
    .map(
      (m, idx) => `
    <label class="relative flex items-center p-3.5 border rounded-2xl cursor-pointer hover:border-sky-400 hover:bg-sky-950/40 transition-all ${idx === 0 ? "border-sky-500 bg-sky-950/60" : "border-slate-700 bg-slate-900/60"}">
      <input type="radio" name="material-option" value="${m.id}" data-price="${m.price}" data-name="${m.name}" class="text-sky-500 focus:ring-sky-400" ${idx === 0 ? "checked" : ""} onchange="calculateCustomPrice()">
      <div class="ml-3 flex-1 flex items-center justify-between text-xs">
        <span class="font-semibold text-slate-200">${m.name}</span>
        <span class="font-bold text-amber-400">${formatRupiah(m.price)}</span>
      </div>
    </label>
  `
    )
    .join("");

  // Render Finishing options
  const finContainer = document.getElementById("cust-finishings");
  finContainer.innerHTML = product.finishings
    .map(
      (f, idx) => `
    <label class="relative flex items-center p-3.5 border rounded-2xl cursor-pointer hover:border-sky-400 hover:bg-sky-950/40 transition-all ${idx === 0 ? "border-sky-500 bg-sky-950/60" : "border-slate-700 bg-slate-900/60"}">
      <input type="radio" name="finishing-option" value="${f.id}" data-price="${f.price}" data-name="${f.name}" class="text-sky-500 focus:ring-sky-400" ${idx === 0 ? "checked" : ""} onchange="calculateCustomPrice()">
      <div class="ml-3 flex-1 flex items-center justify-between text-xs">
        <span class="font-semibold text-slate-200">${f.name}</span>
        <span class="font-bold text-sky-300">${f.price > 0 ? "+" + formatRupiah(f.price) : "Gratis"}</span>
      </div>
    </label>
  `
    )
    .join("");

  // Reset Quantity & File Inputs
  document.getElementById("cust-qty").value = 1;
  document.getElementById("cust-notes").value = "";
  document.getElementById("cust-drive-link").value = "";
  document.getElementById("uploaded-file-info").classList.add("hidden");
  document.getElementById("file-upload-input").value = "";

  calculateCustomPrice();

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

// Close Customizer Modal
function closeCustomizer() {
  const modal = document.getElementById("customizer-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  document.body.classList.remove("overflow-hidden");
}

// Calculate Price in Customizer Modal
function calculateCustomPrice() {
  if (!currentCustomizingProduct) return;

  const product = currentCustomizingProduct;
  const qty = Math.max(1, parseInt(document.getElementById("cust-qty").value) || 1);

  const selectedMatEl = document.querySelector('input[name="material-option"]:checked');
  const selectedFinEl = document.querySelector('input[name="finishing-option"]:checked');

  const matPrice = selectedMatEl ? parseFloat(selectedMatEl.dataset.price) : product.basePrice;
  const finPrice = selectedFinEl ? parseFloat(selectedFinEl.dataset.price) : 0;

  let unitPrice = 0;
  let calculationDetails = "";

  if (product.type === "area") {
    const widthCm = Math.max(10, parseFloat(document.getElementById("cust-width").value) || 100);
    const heightCm = Math.max(10, parseFloat(document.getElementById("cust-height").value) || 100);
    const areaM2 = (widthCm / 100) * (heightCm / 100);
    const effectiveArea = Math.max(1, areaM2);

    unitPrice = effectiveArea * matPrice + finPrice;
    calculationDetails = `Ukuran: ${widthCm}x${heightCm}cm (${effectiveArea.toFixed(2)} m²) × ${formatRupiah(matPrice)} + Finishing: ${formatRupiah(finPrice)}`;
  } else {
    unitPrice = matPrice + finPrice;
    calculationDetails = `Harga Dasar: ${formatRupiah(matPrice)} + Finishing: ${formatRupiah(finPrice)}`;
  }

  const subtotal = unitPrice * qty;

  document.getElementById("modal-calc-unit-price").textContent = formatRupiah(unitPrice);
  document.getElementById("modal-calc-total").textContent = formatRupiah(subtotal);
  document.getElementById("modal-calc-formula").textContent = calculationDetails;
}

// File Upload Handler in Modal
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 50 * 1024 * 1024) {
    showToast("Ukuran file maksimal 50MB. Gunakan Google Drive jika lebih besar.", "error");
    return;
  }

  uploadedFileMeta = {
    name: file.name,
    size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
    type: file.type || "Dokumen/Desain"
  };

  const infoEl = document.getElementById("uploaded-file-info");
  const nameEl = document.getElementById("uploaded-filename");
  const sizeEl = document.getElementById("uploaded-filesize");

  if (infoEl && nameEl && sizeEl) {
    nameEl.textContent = uploadedFileMeta.name;
    sizeEl.textContent = `${uploadedFileMeta.size} • ${uploadedFileMeta.type}`;
    infoEl.classList.remove("hidden");
  }

  showToast(`File "${file.name}" siap dicetak!`, "success");
}

function removeUploadedFile() {
  uploadedFileMeta = null;
  document.getElementById("file-upload-input").value = "";
  document.getElementById("uploaded-file-info").classList.add("hidden");
  showToast("File desain dihapus.", "info");
}

// Add Item from Customizer to Cart
function addCustomizedItemToCart() {
  if (!currentCustomizingProduct) return;

  const product = currentCustomizingProduct;
  const qty = Math.max(1, parseInt(document.getElementById("cust-qty").value) || 1);

  const selectedMatEl = document.querySelector('input[name="material-option"]:checked');
  const selectedFinEl = document.querySelector('input[name="finishing-option"]:checked');

  const matName = selectedMatEl ? selectedMatEl.dataset.name : "Standar";
  const matPrice = selectedMatEl ? parseFloat(selectedMatEl.dataset.price) : product.basePrice;
  const finName = selectedFinEl ? selectedFinEl.dataset.name : "Tanpa Finishing";
  const finPrice = selectedFinEl ? parseFloat(selectedFinEl.dataset.price) : 0;

  const notes = document.getElementById("cust-notes").value.trim();
  const driveLink = document.getElementById("cust-drive-link").value.trim();

  let dimensions = null;
  let unitPrice = 0;

  if (product.type === "area") {
    const widthCm = Math.max(10, parseFloat(document.getElementById("cust-width").value) || 100);
    const heightCm = Math.max(10, parseFloat(document.getElementById("cust-height").value) || 100);
    const areaM2 = (widthCm / 100) * (heightCm / 100);
    const effectiveArea = Math.max(1, areaM2);
    unitPrice = effectiveArea * matPrice + finPrice;
    dimensions = { widthCm, heightCm, areaM2: effectiveArea };
  } else {
    unitPrice = matPrice + finPrice;
  }

  const subtotal = unitPrice * qty;

  const cartItem = {
    cartId: "cart-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
    productId: product.id,
    name: product.name,
    category: product.category,
    image: product.image,
    material: matName,
    finishing: finName,
    dimensions: dimensions,
    qty: qty,
    unitPrice: unitPrice,
    subtotal: subtotal,
    fileMeta: uploadedFileMeta,
    driveLink: driveLink,
    notes: notes,
    createdAt: new Date().toISOString()
  };

  cart.push(cartItem);
  saveCart();
  closeCustomizer();

  showToast(`"${product.name}" ditambahkan ke keranjang!`, "success");
  openCartDrawer();
}

// Cart Drawer Functions
function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  drawer.classList.remove("translate-x-full");
  document.getElementById("cart-backdrop").classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  drawer.classList.add("translate-x-full");
  document.getElementById("cart-backdrop").classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function calculateDiscount(subtotal) {
  let discount = 0;
  let desc = "";

  if (subtotal >= 100000) {
    discount = 10000;
    desc = "Promo Otomatis Diskon Ongkir (Min 100rb)";
  }

  if (appliedVoucher) {
    if (subtotal >= appliedVoucher.minSpend) {
      if (appliedVoucher.type === "fixed") {
        discount = Math.max(discount, appliedVoucher.discountAmount);
        desc = `Voucher [${appliedVoucher.code}]: -${formatRupiah(appliedVoucher.discountAmount)}`;
      } else if (appliedVoucher.type === "percent") {
        const pDisc = Math.min(appliedVoucher.maxDiscount || 999999, subtotal * appliedVoucher.discountPercent);
        discount = Math.max(discount, pDisc);
        desc = `Voucher [${appliedVoucher.code}]: -${formatRupiah(pDisc)}`;
      }
    }
  }

  return { discount, desc };
}

function renderCartDrawer() {
  const container = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("cart-subtotal");
  const discountEl = document.getElementById("cart-discount");
  const discountDescEl = document.getElementById("cart-discount-desc");
  const grandTotalEl = document.getElementById("cart-grand-total");
  const emptyEl = document.getElementById("cart-empty-state");
  const footerEl = document.getElementById("cart-footer");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "";
    if (emptyEl) emptyEl.classList.remove("hidden");
    if (footerEl) footerEl.classList.add("hidden");
    return;
  }

  if (emptyEl) emptyEl.classList.add("hidden");
  if (footerEl) footerEl.classList.remove("hidden");

  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const { discount, desc } = calculateDiscount(subtotal);
  const grandTotal = Math.max(0, subtotal - discount);

  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  if (discountEl) discountEl.textContent = discount > 0 ? "-" + formatRupiah(discount) : "Rp 0";
  if (discountDescEl) discountDescEl.textContent = desc || "Klaim voucher di menu Campaign Promo";
  if (grandTotalEl) grandTotalEl.textContent = formatRupiah(grandTotal);

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="p-4 bg-[#0a152e] border border-sky-500/20 rounded-2xl flex flex-col gap-3 relative text-white">
      <button onclick="removeCartItem('${item.cartId}')" class="absolute top-3 right-3 text-slate-400 hover:text-rose-400 transition-colors" title="Hapus item">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>

      <div class="flex gap-3">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl border border-sky-500/30 flex-shrink-0" />
        <div class="flex-1 pr-4">
          <h4 class="font-bold text-white text-sm leading-tight">${item.name}</h4>
          <p class="text-xs text-slate-400 mt-1">Bahan: <span class="font-medium text-sky-200">${item.material}</span></p>
          <p class="text-xs text-slate-400">Finishing: <span class="font-medium text-sky-200">${item.finishing}</span></p>
          ${item.dimensions ? `<p class="text-xs text-sky-400 font-medium">Ukuran: ${item.dimensions.widthCm} x ${item.dimensions.heightCm} cm</p>` : ""}
        </div>
      </div>

      <div class="text-[11px] bg-slate-950/70 p-2.5 rounded-xl border border-sky-500/15 flex flex-col gap-1 text-slate-300">
        ${item.fileMeta ? `<div>📎 <b>File:</b> <span class="text-sky-300">${item.fileMeta.name}</span> (${item.fileMeta.size})</div>` : ""}
        ${item.driveLink ? `<div class="truncate">🔗 <b>Link:</b> <a href="${item.driveLink}" target="_blank" class="text-sky-400 underline">${item.driveLink}</a></div>` : ""}
        ${!item.fileMeta && !item.driveLink ? `<span class="text-amber-400">⚠️ Belum ada file desain terlampir</span>` : ""}
        ${item.notes ? `<div class="italic text-slate-400">📝 "${item.notes}"</div>` : ""}
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-sky-500/15">
        <div class="flex items-center border border-slate-700 rounded-xl bg-slate-900 overflow-hidden">
          <button onclick="updateCartQty('${item.cartId}', ${item.qty - 1})" class="px-2.5 py-1 text-slate-300 hover:bg-slate-800 transition-colors font-bold text-sm">-</button>
          <span class="px-3 py-1 text-xs font-bold text-white">${item.qty}</span>
          <button onclick="updateCartQty('${item.cartId}', ${item.qty + 1})" class="px-2.5 py-1 text-slate-300 hover:bg-slate-800 transition-colors font-bold text-sm">+</button>
        </div>

        <div class="text-right">
          <span class="text-xs text-slate-400 block">${formatRupiah(item.unitPrice)} / pcs</span>
          <span class="font-extrabold text-amber-400 text-sm">${formatRupiah(item.subtotal)}</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function updateCartQty(cartId, newQty) {
  if (newQty <= 0) {
    removeCartItem(cartId);
    return;
  }

  cart = cart.map((item) => {
    if (item.cartId === cartId) {
      item.qty = newQty;
      item.subtotal = item.unitPrice * newQty;
    }
    return item;
  });

  saveCart();
}

function removeCartItem(cartId) {
  cart = cart.filter((item) => item.cartId !== cartId);
  saveCart();
  showToast("Item berhasil dihapus dari keranjang", "info");
}

function clearCart() {
  if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
    cart = [];
    saveCart();
    showToast("Keranjang telah dikosongkan.", "info");
  }
}

// Checkout Modal Flow
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Keranjang Anda masih kosong.", "error");
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById("checkout-modal");
  if (!modal) return;

  if (userProfile) {
    document.getElementById("chk-name").value = userProfile.name || "";
    document.getElementById("chk-phone").value = userProfile.phone || "";
    document.getElementById("chk-email").value = userProfile.email || "";
    document.getElementById("chk-address").value = userProfile.address || "";
  }

  updateCheckoutTotals();

  const summaryList = document.getElementById("chk-items-summary");
  summaryList.innerHTML = cart
    .map(
      (item) => `
    <div class="flex items-center justify-between text-xs py-1.5 border-b border-sky-500/15">
      <span class="font-medium text-slate-300 truncate pr-2">${item.name} (${item.qty}x)</span>
      <span class="font-bold text-amber-400 flex-shrink-0">${formatRupiah(item.subtotal)}</span>
    </div>
  `
    )
    .join("");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function updateCheckoutTotals() {
  const courier = document.getElementById("chk-courier")?.value || "sicepat";
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const { discount } = calculateDiscount(subtotal);
  const shipping = courier === "pickup" ? 0 : 15000;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  document.getElementById("chk-subtotal").textContent = formatRupiah(subtotal);
  document.getElementById("chk-discount").textContent = discount > 0 ? "-" + formatRupiah(discount) : "Rp 0";
  document.getElementById("chk-shipping").textContent = formatRupiah(shipping);
  document.getElementById("chk-grand-total").textContent = formatRupiah(grandTotal);
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  document.body.classList.remove("overflow-hidden");
}

// Process Checkout & Generate Order
function processCheckout(event) {
  event.preventDefault();

  const customerName = document.getElementById("chk-name").value.trim();
  const customerPhone = document.getElementById("chk-phone").value.trim();
  const customerEmail = document.getElementById("chk-email").value.trim();
  const customerAddress = document.getElementById("chk-address").value.trim();
  const courier = document.getElementById("chk-courier").value;
  const paymentMethod = document.querySelector('input[name="chk-payment"]:checked')?.value || "QRIS";

  if (!customerName || !customerPhone || !customerAddress) {
    showToast("Mohon lengkapi data penerima dan alamat pengiriman.", "error");
    return;
  }

  userProfile.name = customerName;
  userProfile.phone = customerPhone;
  userProfile.email = customerEmail;
  userProfile.address = customerAddress;
  userProfile.points = (userProfile.points || 0) + 50;
  saveProfile();

  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const { discount } = calculateDiscount(subtotal);
  const shipping = courier === "pickup" ? 0 : 15000;
  const grandTotal = subtotal - discount + shipping;

  const orderId = "SNP-" + new Date().getFullYear() + Math.floor(100000 + Math.random() * 900000);

  const newOrder = {
    orderId: orderId,
    customer: {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: customerAddress
    },
    items: [...cart],
    courier: courier,
    paymentMethod: paymentMethod,
    subtotal: subtotal,
    discount: discount,
    shippingFee: shipping,
    grandTotal: grandTotal,
    status: "Review Desain",
    statusStep: 2,
    createdAt: new Date().toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" })
  };

  orders.unshift(newOrder);
  saveOrders();

  cart = [];
  appliedVoucher = null;
  saveCart();
  closeCheckoutModal();

  openOrderSuccessModal(newOrder);
}

// Order Success Modal
function openOrderSuccessModal(order) {
  const modal = document.getElementById("success-modal");
  if (!modal) return;

  document.getElementById("success-order-id").textContent = order.orderId;
  document.getElementById("success-customer-name").textContent = order.customer.name;
  document.getElementById("success-payment-method").textContent = order.paymentMethod;
  document.getElementById("success-total-paid").textContent = formatRupiah(order.grandTotal);
  document.getElementById("success-track-btn").setAttribute("onclick", `trackOrder('${order.orderId}')`);

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeOrderSuccessModal() {
  const modal = document.getElementById("success-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// Order Tracking System
function trackOrder(targetId = null) {
  const inputEl = document.getElementById("tracking-input");
  const query = (targetId || (inputEl ? inputEl.value : "")).trim();

  if (!query) {
    showToast("Silakan masukkan ID Pesanan Anda (contoh: SNP-20260908-01).", "error");
    return;
  }

  const order = orders.find((o) => o.orderId.toLowerCase() === query.toLowerCase());
  const resultContainer = document.getElementById("tracking-result-container");
  const notFoundEl = document.getElementById("tracking-not-found");

  if (!order) {
    if (resultContainer) resultContainer.classList.add("hidden");
    if (notFoundEl) {
      notFoundEl.classList.remove("hidden");
      document.getElementById("tracking-search-term").textContent = query;
    }
    return;
  }

  if (notFoundEl) notFoundEl.classList.add("hidden");
  if (resultContainer) resultContainer.classList.remove("hidden");

  document.getElementById("track-res-id").textContent = order.orderId;
  document.getElementById("track-res-date").textContent = order.createdAt;
  document.getElementById("track-res-name").textContent = order.customer.name;
  document.getElementById("track-res-courier").textContent = order.courier.toUpperCase();
  document.getElementById("track-res-total").textContent = formatRupiah(order.grandTotal);
  document.getElementById("track-res-status-badge").textContent = order.status;

  const steps = [1, 2, 3, 4, 5];
  steps.forEach((stepNum) => {
    const iconEl = document.getElementById(`track-step-icon-${stepNum}`);
    const labelEl = document.getElementById(`track-step-label-${stepNum}`);

    if (iconEl && labelEl) {
      if (stepNum <= order.statusStep) {
        iconEl.className = "w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-sky-500/30 ring-4 ring-sky-500/20";
        labelEl.className = "text-xs font-bold text-sky-400 mt-2 text-center";
      } else {
        iconEl.className = "w-9 h-9 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center font-bold text-sm border border-slate-700";
        labelEl.className = "text-xs font-medium text-slate-500 mt-2 text-center";
      }
    }
  });

  const itemsList = document.getElementById("track-items-list");
  if (itemsList) {
    itemsList.innerHTML = order.items
      .map(
        (it) => `
      <div class="flex items-center justify-between text-xs py-2 border-b border-sky-500/10 last:border-0">
        <div>
          <span class="font-bold text-white">${it.name}</span>
          <span class="text-slate-400 block text-[11px]">Bahan: ${it.material} | Finishing: ${it.finishing}</span>
        </div>
        <span class="font-semibold text-amber-400">${it.qty} pcs</span>
      </div>
    `
      )
      .join("");
  }

  const simBtn = document.getElementById("simulate-progress-btn");
  if (simBtn) {
    simBtn.onclick = () => simulateNextStatus(order.orderId);
  }

  const trackSection = document.getElementById("order-tracking-section");
  if (trackSection) {
    trackSection.scrollIntoView({ behavior: "smooth" });
  }

  closeOrderSuccessModal();
  closeAccountModal();
}

function simulateNextStatus(orderId) {
  const order = orders.find((o) => o.orderId === orderId);
  if (!order) return;

  const statuses = [
    { step: 1, text: "Menunggu Pembayaran" },
    { step: 2, text: "Cek File Desain & Preflight" },
    { step: 3, text: "Proses Cetak Mesin" },
    { step: 4, text: "Finishing & Quality Control" },
    { step: 5, text: "Paket Siap Dikirim / Diambil" }
  ];

  if (order.statusStep < 5) {
    order.statusStep += 1;
    order.status = statuses[order.statusStep - 1].text;
    saveOrders();
    trackOrder(orderId);
    showToast(`Status pesanan ${orderId} diperbarui: "${order.status}"`, "success");
  } else {
    order.statusStep = 1;
    order.status = statuses[0].text;
    saveOrders();
    trackOrder(orderId);
    showToast(`Status direset ke awal.`, "info");
  }
}

// MEMBER ACCOUNT MODAL
function openAccountModal() {
  const modal = document.getElementById("account-modal");
  if (!modal) return;

  document.getElementById("acc-name-input").value = userProfile.name || "";
  document.getElementById("acc-phone-input").value = userProfile.phone || "";
  document.getElementById("acc-email-input").value = userProfile.email || "";
  document.getElementById("acc-address-input").value = userProfile.address || "";
  document.getElementById("acc-member-badge").textContent = userProfile.tier || "Gold Member";
  document.getElementById("acc-points-badge").textContent = `${userProfile.points || 0} Poin`;

  renderAccountOrderHistory();

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeAccountModal() {
  const modal = document.getElementById("account-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  document.body.classList.remove("overflow-hidden");
}

function saveAccountProfile(event) {
  event.preventDefault();
  userProfile.name = document.getElementById("acc-name-input").value.trim();
  userProfile.phone = document.getElementById("acc-phone-input").value.trim();
  userProfile.email = document.getElementById("acc-email-input").value.trim();
  userProfile.address = document.getElementById("acc-address-input").value.trim();
  saveProfile();
  showToast("Profil berhasil diperbarui!", "success");
}

function renderAccountOrderHistory() {
  const container = document.getElementById("acc-orders-list");
  if (!container) return;

  if (orders.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-xs text-slate-500">Belum ada riwayat pesanan.</div>`;
    return;
  }

  container.innerHTML = orders
    .map(
      (ord) => `
    <div class="p-3.5 bg-[#0a152e] border border-sky-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div>
        <div class="flex items-center gap-2">
          <span class="font-mono font-bold text-sky-400">${ord.orderId}</span>
          <span class="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">${ord.status}</span>
        </div>
        <p class="text-slate-400 mt-1">${ord.createdAt}</p>
        <p class="text-slate-300 font-medium mt-0.5">${ord.items.length} item • Total: <b class="text-amber-400">${formatRupiah(ord.grandTotal)}</b></p>
      </div>
      <button onclick="trackOrder('${ord.orderId}')" class="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-3.5 py-1.5 rounded-xl transition-colors self-start sm:self-center">
        Lacak Pesanan ➜
      </button>
    </div>
  `
    )
    .join("");
}

// CAMPAIGN & PROMO VOUCHERS MODAL
function openCampaignModal() {
  const modal = document.getElementById("campaign-modal");
  if (!modal) return;

  const container = document.getElementById("vouchers-container");
  container.innerHTML = PROMO_VOUCHERS.map(
    (v) => `
    <div class="p-4 rounded-2xl border-2 border-dashed ${appliedVoucher && appliedVoucher.code === v.code ? "border-emerald-400 bg-emerald-950/40" : "border-sky-500/30 bg-[#0a152e]"} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="bg-amber-400/20 text-amber-300 font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-amber-400/40">
            ${v.code}
          </span>
          <h4 class="font-bold text-white text-sm">${v.title}</h4>
        </div>
        <p class="text-xs text-slate-400 mt-1">${v.desc}</p>
      </div>
      <button onclick="applyVoucherCode('${v.code}')" class="${appliedVoucher && appliedVoucher.code === v.code ? "bg-emerald-600 text-white" : "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white"} text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md flex-shrink-0">
        ${appliedVoucher && appliedVoucher.code === v.code ? "✓ Digunakan" : "Klaim & Pakai"}
      </button>
    </div>
  `
  ).join("");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeCampaignModal() {
  const modal = document.getElementById("campaign-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  document.body.classList.remove("overflow-hidden");
}

function applyVoucherCode(code) {
  const v = PROMO_VOUCHERS.find((item) => item.code === code);
  if (!v) return;

  appliedVoucher = v;
  saveCart();
  closeCampaignModal();
  showToast(`Voucher "${v.code}" berhasil diterapkan ke keranjang!`, "success");
  openCartDrawer();
}

// STORE LOCATIONS MODAL
function openStoreModal() {
  const modal = document.getElementById("store-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  }
}

function closeStoreModal() {
  const modal = document.getElementById("store-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  document.body.classList.remove("overflow-hidden");
}

// CONTACT US MODAL
function openContactModal() {
  const modal = document.getElementById("contact-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  }
}

function closeContactModal() {
  const modal = document.getElementById("contact-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  document.body.classList.remove("overflow-hidden");
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("contact-name").value;
  showToast(`Pesan terkirim! Tim Customer Care Snaprint segera merespon Bapak/Ibu ${name}.`, "success");
  event.target.reset();
  closeContactModal();
}

// BLOG ARTICLES MODAL & READER
function openBlogsModal() {
  const modal = document.getElementById("blogs-modal");
  if (!modal) return;

  const container = document.getElementById("blogs-grid-container");
  container.innerHTML = BLOG_ARTICLES.map(
    (b) => `
    <div class="glass-card rounded-2xl overflow-hidden card-hover-effect flex flex-col justify-between cursor-pointer" onclick="readArticle('${b.id}')">
      <div>
        <img src="${b.image}" alt="${b.title}" class="w-full h-40 object-cover opacity-90 hover:opacity-100" />
        <div class="p-4">
          <div class="flex items-center justify-between text-[11px] text-sky-400 font-semibold mb-1">
            <span>${b.category}</span>
            <span class="text-slate-500">${b.date}</span>
          </div>
          <h4 class="font-bold text-white text-sm leading-snug">${b.title}</h4>
          <p class="text-xs text-slate-400 mt-2 line-clamp-2">${b.snippet}</p>
        </div>
      </div>
      <div class="p-4 pt-0">
        <button class="text-sky-400 font-bold text-xs flex items-center gap-1 hover:text-sky-300">
          <span>Baca Selengkapnya</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  `
  ).join("");

  document.getElementById("blog-list-view").classList.remove("hidden");
  document.getElementById("blog-reader-view").classList.add("hidden");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeBlogsModal() {
  const modal = document.getElementById("blogs-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  document.body.classList.remove("overflow-hidden");
}

function readArticle(articleId) {
  const article = BLOG_ARTICLES.find((a) => a.id === articleId);
  if (!article) return;

  document.getElementById("reader-title").textContent = article.title;
  document.getElementById("reader-category").textContent = article.category;
  document.getElementById("reader-date").textContent = article.date;
  document.getElementById("reader-img").src = article.image;
  document.getElementById("reader-content").innerHTML = article.content;

  document.getElementById("blog-list-view").classList.add("hidden");
  document.getElementById("blog-reader-view").classList.remove("hidden");
}

function backToBlogList() {
  document.getElementById("blog-list-view").classList.remove("hidden");
  document.getElementById("blog-reader-view").classList.add("hidden");
}

// RFQ Form Handler
function handleRFQSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("rfq-name").value.trim();
  const phone = document.getElementById("rfq-phone").value.trim();
  const desc = document.getElementById("rfq-desc").value.trim();

  if (!name || !phone || !desc) {
    showToast("Silakan isi nama, WhatsApp, dan deskripsi kebutuhan cetak.", "error");
    return;
  }

  showToast(`Terima kasih Bapak/Ibu ${name}. Tim Estimator Snaprint akan menghubungi via WhatsApp (${phone}) dengan surat penawaran resmi!`, "success");

  event.target.reset();
  closeRFQModal();
}

function openRFQModal() {
  const modal = document.getElementById("rfq-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  }
}

function closeRFQModal() {
  const modal = document.getElementById("rfq-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  document.body.classList.remove("overflow-hidden");
}

// Quick Calculator Launcher
function openQuickCalculator() {
  openCustomizer("spanduk-outdoor");
}

// Search Suggestions
function handleSearchSuggestions(e) {
  searchQuery = e.target.value;
  renderProducts();
}

// Setup Event Listeners & Initial Data
document.addEventListener("DOMContentLoaded", () => {
  if (orders.length === 0) {
    orders.push({
      orderId: "SNP-20260908-01",
      customer: {
        name: "Ashabil Syauqi",
        phone: "081234567890",
        email: "ashabilsyauqi@gmail.com",
        address: "Jl. Percetakan Negara Raya No. 128, Jakarta Pusat"
      },
      items: [
        {
          cartId: "sample-1",
          productId: "spanduk-outdoor",
          name: "Spanduk / Banner Outdoor Flexi",
          material: "Flexi Tebal 340gr",
          finishing: "Mata Ayam 4 Sudut",
          qty: 2,
          unitPrice: 56000,
          subtotal: 112000
        }
      ],
      courier: "sicepat",
      paymentMethod: "QRIS",
      subtotal: 112000,
      discount: 10000,
      shippingFee: 15000,
      grandTotal: 117000,
      status: "Proses Cetak Mesin",
      statusStep: 3,
      createdAt: "Selasa, 8 September 2026 10:30 WIB"
    });
    saveOrders();
  }

  renderProducts();
  updateCartBadge();
  renderCartDrawer();

  const searchInput = document.getElementById("global-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchSuggestions);
  }

  const catButtons = document.querySelectorAll(".cat-filter-btn");
  catButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      catButtons.forEach((b) => {
        b.classList.remove("bg-gradient-to-r", "from-sky-500", "to-blue-600", "text-white", "font-bold", "shadow-lg", "shadow-sky-500/25", "border-sky-400", "active");
        b.classList.add("bg-[#0c1836]", "text-slate-300", "border-sky-500/20");
      });

      btn.classList.add("bg-gradient-to-r", "from-sky-500", "to-blue-600", "text-white", "font-bold", "shadow-lg", "shadow-sky-500/25", "border-sky-400", "active");
      btn.classList.remove("bg-[#0c1836]", "text-slate-300", "border-sky-500/20");

      activeCategory = btn.dataset.category || "all";
      renderProducts();
    });
  });

  const widthInput = document.getElementById("cust-width");
  const heightInput = document.getElementById("cust-height");
  const qtyInput = document.getElementById("cust-qty");

  if (widthInput) widthInput.addEventListener("input", calculateCustomPrice);
  if (heightInput) heightInput.addEventListener("input", calculateCustomPrice);
  if (qtyInput) qtyInput.addEventListener("input", calculateCustomPrice);

  const fileInput = document.getElementById("file-upload-input");
  if (fileInput) fileInput.addEventListener("change", handleFileUpload);

  const courierSelect = document.getElementById("chk-courier");
  if (courierSelect) courierSelect.addEventListener("change", updateCheckoutTotals);

  // Initialize 3-Minute Active Viewers Tracker
  initThreeMinuteViewerTracker();
});

// 3-Minute Active Viewer Tracker & Loyalty Reward System
let sessionSeconds = 0;
let base3MinViewers = parseInt(localStorage.getItem("snaprint_3min_viewers") || "1482");
let hasReceived3MinReward = localStorage.getItem("snaprint_user_3min_verified") === "true";

function formatSecondsToMMSS(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
}

function updateViewersUI() {
  const countEls = document.querySelectorAll(".engaged-viewers-count");
  const timeEls = document.querySelectorAll(".user-session-timer");
  const progressBar = document.getElementById("viewer-3min-progress");
  const badgeStatus = document.getElementById("viewer-status-badge");

  countEls.forEach((el) => {
    el.textContent = new Intl.NumberFormat("id-ID").format(base3MinViewers);
  });

  timeEls.forEach((el) => {
    el.textContent = formatSecondsToMMSS(sessionSeconds);
  });

  if (progressBar) {
    const progressPercent = Math.min(100, (sessionSeconds / 180) * 100);
    progressBar.style.width = `${progressPercent}%`;
  }

  if (badgeStatus) {
    if (sessionSeconds >= 180) {
      badgeStatus.innerHTML = `⭐ <span class="text-amber-300 font-bold">Viewer Terverifikasi (≥3 Menit)</span>`;
    } else {
      const remainingSec = 180 - sessionSeconds;
      badgeStatus.innerHTML = `<span class="text-sky-300">${formatSecondsToMMSS(remainingSec)} lagi untuk klaim voucher</span>`;
    }
  }
}

function initThreeMinuteViewerTracker() {
  updateViewersUI();

  // Session clock timer (ticks every 1 second)
  setInterval(() => {
    sessionSeconds++;
    updateViewersUI();

    // Trigger 3-minute milestone
    if (sessionSeconds === 180 && !hasReceived3MinReward) {
      hasReceived3MinReward = true;
      localStorage.setItem("snaprint_user_3min_verified", "true");
      base3MinViewers += 1;
      localStorage.setItem("snaprint_3min_viewers", base3MinViewers.toString());
      updateViewersUI();

      // Add special loyalty voucher
      PROMO_VOUCHERS.unshift({
        code: "LOYAL3MIN",
        title: "Kupon Loyalitas 3 Menit (Rp 15.000)",
        desc: "Bonus khusus karena Anda telah aktif menjelajah Snaprint lebih dari 3 menit!",
        minSpend: 50000,
        discountAmount: 15000,
        type: "fixed"
      });

      showToast("🎉 Selamat! Anda telah aktif berkunjung ≥3 menit! Voucher diskon Rp 15.000 (LOYAL3MIN) telah diaktifkan!", "success");
    }
  }, 1000);

  // Realistic live fluctuation of 3-minute engaged viewers (every 5 seconds)
  setInterval(() => {
    const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
    base3MinViewers = Math.max(1450, Math.min(1530, base3MinViewers + change));
    localStorage.setItem("snaprint_3min_viewers", base3MinViewers.toString());
    updateViewersUI();
  }, 5000);
}
