/**
 * CARIKOS & JURAGANKOS - UNIFIED APPLICATION ENGINE
 * Menggabungkan Mode Pencari Kos (Seeker) & Portal Pemilik Kos (Owner)
 */

// Application Master State
const AppState = {
  appMode: 'seeker', // 'seeker' | 'owner'
  allKos: [],
  filteredKos: [],
  favorites: new Set(),
  comparisonList: [],
  activeKos: null,
  activeGalleryIndex: 0,
  viewMode: 'split', // 'grid' | 'split'
  darkMode: false,
  map: null,
  markers: [],
  activeFilters: {
    keyword: '',
    city: 'Semua Kota',
    type: 'all', // all | Putra | Putri | Campur | Pasutri
    category: 'all', // all | Dekat Kampus | Eksklusif | Kos Murah | Bebas 24 Jam
    maxPrice: 5000000,
    facilities: [],
    electricityIncluded: false,
    sortBy: 'popular'
  }
};

// Juragan Kos (Owner) Master State
const JuraganState = {
  property: {},
  rooms: [],
  tenants: [],
  transactions: [],
  complaints: [],
  currentTab: 'dash', // 'dash' | 'kamar' | 'penyewa' | 'keuangan' | 'keluhan' | 'pengaturan'
  activeFilterFloor: 'all',
  activeFilterRoomStatus: 'all',
  activeFilterTenantStatus: 'all'
};

// Facility Icons Mapping
const FACILITY_ICONS = {
  "AC": "fa-snowflake",
  "WiFi Cepat": "fa-wifi",
  "Kamar Mandi Dalam": "fa-bath",
  "Kamar Mandi Luar Bersih": "fa-shower",
  "Kasur Springbed": "fa-bed",
  "Kasur King Size": "fa-bed",
  "Kasur Busa Super": "fa-bed",
  "Kasur Busa": "fa-bed",
  "Lemari Pakaian": "fa-door-closed",
  "Lemari Besar": "fa-door-closed",
  "Meja Belajar": "fa-chair",
  "Meja Kerja": "fa-laptop",
  "Meja Rias & Meja Belajar": "fa-mirror",
  "Water Heater": "fa-temperature-high",
  "Dapur Bersama": "fa-utensils",
  "Dapur Pribadi / Mini Kitchen": "fa-kitchen-set",
  "Kulkas Bersama": "fa-cubes-stacked",
  "Kulkas Pribadi": "fa-cubes-stacked",
  "Dispenser": "fa-faucet-drip",
  "Dispenser RO": "fa-faucet-drip",
  "Parkir Mobil": "fa-car",
  "Parkir Motor": "fa-motorcycle",
  "Parkir Motor Luas": "fa-motorcycle",
  "CCTV 24 Jam": "fa-video",
  "Security": "fa-shield-halved",
  "Security 24 Jam": "fa-shield-halved",
  "Bebas 24 Jam": "fa-clock",
  "Listrik Termasuk": "fa-bolt",
  "Laundry Kiloan": "fa-shirt",
  "Smart TV": "fa-tv",
  "Kolam Renang": "fa-water-ladder",
  "Balkon": "fa-sun",
  "Balkon Pribadi": "fa-sun",
  "Balkon Jemuran": "fa-shirt",
  "Jemuran Luas": "fa-shirt",
  "Housekeeping Mingguan": "fa-broom",
  "Housekeeping 2x Seminggu": "fa-broom",
  "Coworking Space": "fa-users-viewfinder",
  "Kartu Akses": "fa-id-card"
};

// Formatting Utilities
const formatRupiah = (num) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num || 0);
};

const formatPriceShort = (num) => {
  if (num >= 1000000) {
    const formatted = (num / 1000000).toFixed(1).replace('.0', '');
    return `Rp ${formatted} jt`;
  }
  return `Rp ${(num / 1000).toFixed(0)} rb`;
};

const formatDateIndo = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  loadStoredData();
  loadJuraganData();
  initTheme();
  initLeafletMap();
  setupEventListeners();
  applyFilters();
  updateFavoritesCounter();
  updateComparisonCounter();
});

// Load stored data
function loadStoredData() {
  const localKos = localStorage.getItem('carikos_custom_listings');
  if (localKos) {
    try {
      const parsed = JSON.parse(localKos);
      AppState.allKos = [...INITIAL_KOS_DATA, ...parsed];
    } catch (e) {
      AppState.allKos = [...INITIAL_KOS_DATA];
    }
  } else {
    AppState.allKos = [...INITIAL_KOS_DATA];
  }

  const storedFavs = localStorage.getItem('carikos_favorites');
  if (storedFavs) {
    try {
      AppState.favorites = new Set(JSON.parse(storedFavs));
    } catch (e) {
      AppState.favorites = new Set();
    }
  }
}

// Load Juragan Owner Data
function loadJuraganData() {
  const saved = localStorage.getItem('juragankos_data_v1');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      JuraganState.property = parsed.property || JURAGAN_DEFAULT_DATA.property;
      JuraganState.rooms = parsed.rooms || JURAGAN_DEFAULT_DATA.rooms;
      JuraganState.tenants = parsed.tenants || JURAGAN_DEFAULT_DATA.tenants;
      JuraganState.transactions = parsed.transactions || JURAGAN_DEFAULT_DATA.transactions;
      JuraganState.complaints = parsed.complaints || JURAGAN_DEFAULT_DATA.complaints;
    } catch (e) {
      loadJuraganDefaults();
    }
  } else {
    loadJuraganDefaults();
  }
}

function loadJuraganDefaults() {
  if (typeof JURAGAN_DEFAULT_DATA !== 'undefined') {
    JuraganState.property = { ...JURAGAN_DEFAULT_DATA.property };
    JuraganState.rooms = JSON.parse(JSON.stringify(JURAGAN_DEFAULT_DATA.rooms));
    JuraganState.tenants = JSON.parse(JSON.stringify(JURAGAN_DEFAULT_DATA.tenants));
    JuraganState.transactions = JSON.parse(JSON.stringify(JURAGAN_DEFAULT_DATA.transactions));
    JuraganState.complaints = JSON.parse(JSON.stringify(JURAGAN_DEFAULT_DATA.complaints));
  }
  saveJuraganData();
}

function saveJuraganData() {
  localStorage.setItem('juragankos_data_v1', JSON.stringify({
    property: JuraganState.property,
    rooms: JuraganState.rooms,
    tenants: JuraganState.tenants,
    transactions: JuraganState.transactions,
    complaints: JuraganState.complaints
  }));
}

// ==================== MODE SWITCHER (PENCARI vs PEMILIK) ====================
function switchAppMode(mode) {
  AppState.appMode = mode;

  const seekerSection = document.getElementById('seekerAppSection');
  const ownerSection = document.getElementById('ownerAppSection');
  const btnSeeker = document.getElementById('modeBtnSeeker');
  const btnOwner = document.getElementById('modeBtnOwner');

  if (mode === 'owner') {
    if (seekerSection) seekerSection.classList.add('hidden');
    if (ownerSection) ownerSection.classList.remove('hidden');

    if (btnOwner) {
      btnOwner.className = "px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5";
    }
    if (btnSeeker) {
      btnSeeker.className = "px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 font-semibold text-xs transition-all flex items-center gap-1.5";
    }

    switchOwnerTab('dash');
    showToast('Beralih ke Portal Manajemen Pemilik Kos 🔑');
  } else {
    if (ownerSection) ownerSection.classList.add('hidden');
    if (seekerSection) seekerSection.classList.remove('hidden');

    if (btnSeeker) {
      btnSeeker.className = "px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5";
    }
    if (btnOwner) {
      btnOwner.className = "px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 font-semibold text-xs transition-all flex items-center gap-1.5";
    }

    if (AppState.map) {
      setTimeout(() => AppState.map.invalidateSize(), 200);
    }
    showToast('Beralih ke Mode Pencari Kos 🏠');
  }
}

// Dark Mode Handling
function initTheme() {
  const savedTheme = localStorage.getItem('carikos_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    AppState.darkMode = true;
    document.documentElement.classList.add('dark');
  } else {
    AppState.darkMode = false;
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();
}

function toggleDarkMode() {
  AppState.darkMode = !AppState.darkMode;
  if (AppState.darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('carikos_theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('carikos_theme', 'light');
  }
  updateThemeIcon();
  if (AppState.map) {
    updateMapTileLayer();
  }
}

function updateThemeIcon() {
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerHTML = AppState.darkMode 
      ? '<i class="fa-solid fa-sun text-amber-400 text-lg"></i>' 
      : '<i class="fa-solid fa-moon text-slate-600 text-lg"></i>';
  }
}

// Map Initialization (Leaflet.js)
let tileLayerInstance = null;

function initLeafletMap() {
  const mapElement = document.getElementById('leaflet-map');
  if (!mapElement) return;

  AppState.map = L.map('leaflet-map', {
    center: [-7.250445, 110.158434],
    zoom: 7,
    zoomControl: true
  });

  updateMapTileLayer();
}

function updateMapTileLayer() {
  if (!AppState.map) return;
  if (tileLayerInstance) {
    AppState.map.removeLayer(tileLayerInstance);
  }

  const tileUrl = AppState.darkMode
    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  tileLayerInstance = L.tileLayer(tileUrl, {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(AppState.map);
}

// Update Map Markers based on filtered results
function updateMapMarkers() {
  if (!AppState.map) return;

  AppState.markers.forEach(m => AppState.map.removeLayer(m));
  AppState.markers = [];

  const bounds = [];

  AppState.filteredKos.forEach(kos => {
    if (!kos.lat || !kos.lng) return;

    let typeClass = 'type-campur';
    if (kos.type === 'Putri') typeClass = 'type-putri';
    if (kos.type === 'Putra') typeClass = 'type-putra';
    if (kos.type === 'Pasutri') typeClass = 'type-pasutri';

    const customIcon = L.divIcon({
      className: '',
      html: `<div class="custom-kos-marker ${typeClass}" id="marker-${kos.id}">
              <span>${formatPriceShort(kos.priceMonthly)}</span>
             </div>`,
      iconSize: [80, 28],
      iconAnchor: [40, 14]
    });

    const marker = L.marker([kos.lat, kos.lng], { icon: customIcon }).addTo(AppState.map);

    const popupContent = `
      <div class="p-1 max-w-xs font-sans text-slate-800">
        <img src="${kos.images[0]}" class="w-full h-24 object-cover rounded-lg mb-2 shadow-sm" alt="${kos.name}">
        <div class="flex items-center gap-1.5 mb-1">
          <span class="text-xs px-2 py-0.5 rounded-full font-semibold ${getTypeBadgeClass(kos.type)}">${kos.type}</span>
          <span class="text-xs text-amber-500 font-bold"><i class="fa-solid fa-star mr-0.5"></i>${kos.rating}</span>
        </div>
        <h4 class="font-bold text-sm leading-tight text-slate-900 line-clamp-1 mb-1">${kos.name}</h4>
        <p class="text-xs text-slate-500 line-clamp-1 mb-2"><i class="fa-solid fa-location-dot mr-1 text-red-500"></i>${kos.district}, ${kos.city}</p>
        <div class="flex items-center justify-between pt-1 border-t border-slate-100">
          <div class="text-xs font-extrabold text-blue-600">${formatRupiah(kos.priceMonthly)}<span class="font-normal text-slate-400">/bln</span></div>
          <button onclick="openKosDetail('${kos.id}')" class="px-2.5 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm">
            Lihat Kos
          </button>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent);
    marker.on('click', () => {
      highlightCard(kos.id);
    });

    AppState.markers.push(marker);
    bounds.push([kos.lat, kos.lng]);
  });

  if (bounds.length > 0) {
    if (bounds.length === 1) {
      AppState.map.setView(bounds[0], 14);
    } else {
      AppState.map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }
}

function highlightCard(kosId) {
  const card = document.getElementById(`card-${kosId}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('ring-4', 'ring-blue-500', 'ring-offset-2');
    setTimeout(() => {
      card.classList.remove('ring-4', 'ring-blue-500', 'ring-offset-2');
    }, 2500);
  }
}

// Type Badge Class Helper
function getTypeBadgeClass(type) {
  switch (type) {
    case 'Putri': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300';
    case 'Putra': return 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300';
    case 'Pasutri': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';
    default: return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
  }
}

// Filter and Search Engine
function applyFilters() {
  const { keyword, city, type, category, maxPrice, facilities, electricityIncluded, sortBy } = AppState.activeFilters;

  AppState.filteredKos = AppState.allKos.filter(item => {
    if (keyword.trim()) {
      const q = keyword.toLowerCase().trim();
      const matchText = `${item.name} ${item.address} ${item.nearCampus} ${item.district} ${item.city} ${item.facilities.join(' ')}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    if (city !== 'Semua Kota') {
      if (!item.city.toLowerCase().includes(city.toLowerCase())) return false;
    }

    if (type !== 'all') {
      if (item.type !== type) return false;
    }

    if (category !== 'all') {
      if (category === 'Kos Murah' && item.priceMonthly > 1000000) return false;
      if (category === 'Eksklusif' && item.priceMonthly < 2000000 && item.category !== 'Eksklusif') return false;
      if (category === 'Dekat Kampus' && item.category !== 'Dekat Kampus' && !item.nearCampus) return false;
      if (category === 'Bebas 24 Jam' && !item.facilities.includes('Bebas 24 Jam')) return false;
    }

    if (item.priceMonthly > maxPrice) return false;

    if (facilities.length > 0) {
      const hasAllFacilities = facilities.every(fac => item.facilities.includes(fac));
      if (!hasAllFacilities) return false;
    }

    if (electricityIncluded && !item.electricityIncluded) return false;

    return true;
  });

  AppState.filteredKos.sort((a, b) => {
    if (sortBy === 'price_asc') return a.priceMonthly - b.priceMonthly;
    if (sortBy === 'price_desc') return b.priceMonthly - a.priceMonthly;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
    return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
  });

  renderKosCards();
  updateMapMarkers();
  updateResultStats();
}

// Render Kos Cards
function renderKosCards() {
  const container = document.getElementById('kosContainer');
  if (!container) return;

  if (AppState.filteredKos.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 px-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div class="w-20 h-20 bg-blue-50 dark:bg-slate-700 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          <i class="fa-solid fa-house-chimney-crack"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Kos Tidak Ditemukan</h3>
        <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 text-sm">
          Tidak ada kos yang cocok dengan kriteria filter saat ini. Coba ubah rentang harga atau reset filter.
        </p>
        <button onclick="resetAllFilters()" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md">
          <i class="fa-solid fa-rotate-left mr-2"></i>Reset Semua Filter
        </button>
      </div>
    `;
    return;
  }

  const isSplit = AppState.viewMode === 'split';
  container.className = isSplit 
    ? "grid grid-cols-1 md:grid-cols-2 gap-5" 
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  container.innerHTML = AppState.filteredKos.map(kos => {
    const isFav = AppState.favorites.has(kos.id);
    const isCompared = AppState.comparisonList.some(k => k.id === kos.id);
    const previewFacilities = kos.facilities.slice(0, 3);

    return `
      <div id="card-${kos.id}" class="kos-card group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
        <div>
          <!-- Image Banner -->
          <div class="relative overflow-hidden cursor-pointer" onclick="openKosDetail('${kos.id}')">
            <img src="${kos.images[0]}" alt="${kos.name}" class="img-aspect-cover w-full group-hover:scale-105 transition-transform duration-500" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
              <span class="text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md ${getTypeBadgeClass(kos.type)}">
                Kos ${kos.type}
              </span>
              ${kos.isPromo ? `
                <span class="badge-promo text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                  <i class="fa-solid fa-fire mr-1"></i>Promo
                </span>
              ` : ''}
            </div>

            <div class="absolute top-3 right-3 flex items-center gap-1.5">
              <button onclick="event.stopPropagation(); toggleComparison('${kos.id}')" 
                      title="Bandingkan Kos" 
                      class="w-9 h-9 rounded-full ${isCompared ? 'bg-indigo-600 text-white' : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-indigo-600'} flex items-center justify-center backdrop-blur-md shadow transition-colors">
                <i class="fa-solid fa-code-compare text-xs"></i>
              </button>
              <button onclick="event.stopPropagation(); toggleFavorite('${kos.id}')" 
                      title="Simpan Favorit" 
                      class="w-9 h-9 rounded-full ${isFav ? 'bg-red-500 text-white' : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-red-500'} flex items-center justify-center backdrop-blur-md shadow transition-colors">
                <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart text-sm"></i>
              </button>
            </div>

            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <span class="flex items-center gap-1 font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                <i class="fa-solid fa-door-open text-emerald-400"></i> Sisa ${kos.availableRooms} Kamar
              </span>
              <span class="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg font-medium">
                <i class="fa-solid fa-vector-square text-sky-400 mr-1"></i>${kos.roomSize}
              </span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-4 cursor-pointer" onclick="openKosDetail('${kos.id}')">
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              <span class="flex items-center gap-1 font-medium line-clamp-1">
                <i class="fa-solid fa-location-dot text-rose-500"></i> ${kos.district}, ${kos.city}
              </span>
              <span class="flex items-center gap-1 font-bold text-amber-500 shrink-0">
                <i class="fa-solid fa-star"></i> ${kos.rating} <span class="text-slate-400 font-normal">(${kos.reviewsCount})</span>
              </span>
            </div>

            <h3 class="font-bold text-base text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 transition-colors mb-1.5">
              ${kos.name}
            </h3>

            <div class="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mb-3 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-md w-fit line-clamp-1">
              <i class="fa-solid fa-graduation-cap text-blue-500"></i>
              <span class="line-clamp-1">${kos.nearCampus}</span>
            </div>

            <div class="flex flex-wrap gap-1.5 mb-2">
              ${previewFacilities.map(f => `
                <span class="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                  <i class="fa-solid ${FACILITY_ICONS[f] || 'fa-check'} text-slate-400 text-[10px]"></i> ${f}
                </span>
              `).join('')}
              ${kos.facilities.length > 3 ? `
                <span class="text-[11px] font-medium text-slate-400 px-1 py-0.5">+${kos.facilities.length - 3} lainnya</span>
              ` : ''}
            </div>
          </div>
        </div>

        <div class="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-700/70 flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-400 font-medium">${kos.electricityIncluded ? '⚡ Listrik Termasuk' : '⚡ Belum Termasuk Listrik'}</div>
            <div class="text-base font-extrabold text-blue-600 dark:text-blue-400 leading-tight">
              ${formatRupiah(kos.priceMonthly)}<span class="text-xs font-normal text-slate-400">/bln</span>
            </div>
          </div>
          <button onclick="openKosDetail('${kos.id}')" class="px-3.5 py-1.5 bg-blue-50 dark:bg-slate-700 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-300 rounded-xl text-xs font-semibold transition-all">
            Detail
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function updateResultStats() {
  const countEl = document.getElementById('resultsCount');
  if (countEl) {
    countEl.textContent = `${AppState.filteredKos.length} Kos Ditemukan`;
  }
}

// Favorites & Comparison
function toggleFavorite(kosId) {
  if (AppState.favorites.has(kosId)) {
    AppState.favorites.delete(kosId);
    showToast('Kos dihapus dari favorit');
  } else {
    AppState.favorites.add(kosId);
    showToast('Kos disimpan ke daftar favorit! ❤️');
  }
  localStorage.setItem('carikos_favorites', JSON.stringify(Array.from(AppState.favorites)));
  updateFavoritesCounter();
  renderKosCards();
}

function updateFavoritesCounter() {
  const badge = document.getElementById('favCounterBadge');
  if (badge) {
    const size = AppState.favorites.size;
    badge.textContent = size;
    badge.classList.toggle('hidden', size === 0);
  }
}

function showFavoritesOnly() {
  if (AppState.favorites.size === 0) {
    showToast('Anda belum menyimpan kos favorit.');
    return;
  }
  AppState.filteredKos = AppState.allKos.filter(k => AppState.favorites.has(k.id));
  renderKosCards();
  updateMapMarkers();
  updateResultStats();
  showToast(`Menampilkan ${AppState.favorites.size} kos favorit Anda`);
}

function toggleComparison(kosId) {
  const kos = AppState.allKos.find(k => k.id === kosId);
  if (!kos) return;

  const existingIdx = AppState.comparisonList.findIndex(k => k.id === kosId);
  if (existingIdx > -1) {
    AppState.comparisonList.splice(existingIdx, 1);
    showToast(`Kos ${kos.name} dihapus dari perbandingan`);
  } else {
    if (AppState.comparisonList.length >= 3) {
      showToast('Maksimal dapat membandingkan 3 kos sekaligus!');
      return;
    }
    AppState.comparisonList.push(kos);
    showToast(`Kos ${kos.name} ditambahkan untuk dibandingkan! ⚖️`);
  }
  updateComparisonCounter();
  renderKosCards();
}

function updateComparisonCounter() {
  const drawer = document.getElementById('compareDrawer');
  const countSpan = document.getElementById('compareCount');
  if (drawer && countSpan) {
    countSpan.textContent = AppState.comparisonList.length;
    if (AppState.comparisonList.length > 0) {
      drawer.classList.remove('translate-y-full');
    } else {
      drawer.classList.add('translate-y-full');
    }
  }
}

function openComparisonModal() {
  if (AppState.comparisonList.length < 2) {
    showToast('Pilih minimal 2 kos untuk dibandingkan!');
    return;
  }

  const tableContainer = document.getElementById('compareTableContainer');
  if (!tableContainer) return;

  const items = AppState.comparisonList;

  let html = `
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-700">
            <th class="p-4 font-bold text-slate-400 text-xs uppercase tracking-wider w-40">Spesifikasi</th>
            ${items.map(k => `
              <th class="p-4 min-w-[220px]">
                <div class="relative rounded-xl overflow-hidden mb-2">
                  <img src="${k.images[0]}" class="w-full h-28 object-cover rounded-xl" alt="${k.name}">
                  <span class="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${getTypeBadgeClass(k.type)}">
                    ${k.type}
                  </span>
                  <button onclick="toggleComparison('${k.id}'); openComparisonModal();" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-red-600">
                    <i class="fa-solid fa-times"></i>
                  </button>
                </div>
                <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm line-clamp-1">${k.name}</h4>
                <div class="text-blue-600 font-extrabold text-sm mt-1">${formatRupiah(k.priceMonthly)}<span class="text-xs font-normal text-slate-400">/bln</span></div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-300">
          <tr>
            <td class="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/50">Lokasi & Kota</td>
            ${items.map(k => `<td class="p-4 font-medium"><i class="fa-solid fa-location-dot text-red-500 mr-1"></i>${k.district}, ${k.city}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/50">Dekat Kampus</td>
            ${items.map(k => `<td class="p-4">${k.nearCampus}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/50">Ukuran Kamar</td>
            ${items.map(k => `<td class="p-4 font-bold text-slate-900 dark:text-slate-100">${k.roomSize}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/50">Listrik</td>
            ${items.map(k => `
              <td class="p-4">
                ${k.electricityIncluded 
                  ? '<span class="text-emerald-600 font-semibold"><i class="fa-solid fa-check-circle mr-1"></i>Termasuk</span>' 
                  : '<span class="text-amber-600 font-semibold"><i class="fa-solid fa-bolt mr-1"></i>Token Pribadi</span>'}
              </td>
            `).join('')}
          </tr>
          <tr>
            <td class="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/50">Rating & Review</td>
            ${items.map(k => `<td class="p-4 font-bold text-amber-500"><i class="fa-solid fa-star mr-1"></i>${k.rating} <span class="text-xs text-slate-400">(${k.reviewsCount} ulasan)</span></td>`).join('')}
          </tr>
          <tr>
            <td class="p-4 font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/50">Aksi</td>
            ${items.map(k => `
              <td class="p-4">
                <button onclick="closeModal('compareModal'); openKosDetail('${k.id}');" class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-sm">
                  Pilih Kos Ini
                </button>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;

  tableContainer.innerHTML = html;
  openModal('compareModal');
}

// Detail Kos Modal & Gallery
function openKosDetail(kosId) {
  const kos = AppState.allKos.find(k => k.id === kosId);
  if (!kos) return;

  AppState.activeKos = kos;
  AppState.activeGalleryIndex = 0;

  const content = document.getElementById('detailModalBody');
  if (!content) return;

  const isFav = AppState.favorites.has(kos.id);

  content.innerHTML = `
    <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-700">
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold px-3 py-1 rounded-full ${getTypeBadgeClass(kos.type)}">
          Kos ${kos.type}
        </span>
        <span class="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
          <i class="fa-solid fa-building mr-1"></i>${kos.category}
        </span>
        ${kos.isVerified ? `
          <span class="badge-verified text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <i class="fa-solid fa-circle-check text-xs"></i> Terverifikasi
          </span>
        ` : ''}
      </div>
      <div class="flex items-center gap-2">
        <button onclick="toggleFavorite('${kos.id}'); openKosDetail('${kos.id}');" class="p-2.5 rounded-full ${isFav ? 'bg-red-50 text-red-500 dark:bg-red-950/40' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'} hover:scale-105 transition-all">
          <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart text-base"></i>
        </button>
        <button onclick="shareKos('${kos.name}')" class="p-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:scale-105 transition-all">
          <i class="fa-solid fa-share-nodes text-base"></i>
        </button>
      </div>
    </div>

    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 leading-snug">${kos.name}</h2>
      <div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-500 dark:text-slate-400">
        <span class="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
          <i class="fa-solid fa-location-dot text-rose-500"></i> ${kos.address}
        </span>
        <span class="flex items-center gap-1 font-bold text-amber-500">
          <i class="fa-solid fa-star"></i> ${kos.rating} <span class="font-normal text-slate-400">(${kos.reviewsCount} review penyewa)</span>
        </span>
      </div>
    </div>

    <div class="mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl overflow-hidden">
        <div class="md:col-span-2 relative group h-72 md:h-96">
          <img id="mainGalleryImg" src="${kos.images[0]}" class="w-full h-full object-cover rounded-xl transition-all duration-300" alt="Foto Utama">
          ${kos.promoText ? `
            <div class="absolute bottom-4 left-4 badge-promo font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
              <i class="fa-solid fa-tags"></i> ${kos.promoText}
            </div>
          ` : ''}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-1 gap-3 h-72 md:h-96">
          ${kos.images.slice(1, 3).map((img, i) => `
            <div class="h-full relative overflow-hidden rounded-xl cursor-pointer" onclick="setMainGalleryImage('${img}')">
              <img src="${img}" class="w-full h-full object-cover hover:scale-105 transition-transform" alt="Galeri ${i+1}">
            </div>
          `).join('')}
        </div>
      </div>
      <div class="flex gap-2 mt-3 overflow-x-auto pb-2 no-scrollbar">
        ${kos.images.map((img, i) => `
          <button onclick="setMainGalleryImage('${img}')" class="shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition-all">
            <img src="${img}" class="w-full h-full object-cover" alt="Thumb ${i+1}">
          </button>
        `).join('')}
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div class="text-center p-2">
            <div class="text-slate-400 text-xs mb-1"><i class="fa-solid fa-vector-square mr-1"></i>Ukuran Kamar</div>
            <div class="font-bold text-sm text-slate-800 dark:text-slate-100">${kos.roomSize}</div>
          </div>
          <div class="text-center p-2 border-l border-slate-200 dark:border-slate-700">
            <div class="text-slate-400 text-xs mb-1"><i class="fa-solid fa-door-open mr-1"></i>Sisa Kamar</div>
            <div class="font-bold text-sm text-emerald-600 dark:text-emerald-400">${kos.availableRooms} dari ${kos.totalRooms}</div>
          </div>
          <div class="text-center p-2 border-l border-slate-200 dark:border-slate-700">
            <div class="text-slate-400 text-xs mb-1"><i class="fa-solid fa-bolt mr-1"></i>Listrik</div>
            <div class="font-bold text-sm text-slate-800 dark:text-slate-100">${kos.electricityIncluded ? 'Termasuk' : 'Token Mandiri'}</div>
          </div>
          <div class="text-center p-2 border-l border-slate-200 dark:border-slate-700">
            <div class="text-slate-400 text-xs mb-1"><i class="fa-solid fa-money-bill mr-1"></i>Deposit Masuk</div>
            <div class="font-bold text-sm text-slate-800 dark:text-slate-100">${formatRupiah(kos.deposit)}</div>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">Deskripsi Kos</h3>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">${kos.description}</p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-3">Fasilitas Kos & Kamar</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            ${kos.facilities.map(f => `
              <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60">
                <div class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm shrink-0">
                  <i class="fa-solid ${FACILITY_ICONS[f] || 'fa-check'}"></i>
                </div>
                <span class="text-xs font-semibold text-slate-700 dark:text-slate-200">${f}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-3">Peraturan Kos</h3>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            ${kos.rules.map(r => `
              <li class="flex items-start gap-2.5">
                <i class="fa-solid fa-circle-info text-blue-500 mt-0.5 text-xs"></i>
                <span>${r}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="sticky top-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
          <div>
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mulai Dari</span>
            <div class="flex items-baseline gap-1 mt-1">
              <span class="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400">${formatRupiah(kos.priceMonthly)}</span>
              <span class="text-xs text-slate-500">/ bulan</span>
            </div>
            <div class="flex gap-2 mt-2 text-xs text-slate-500">
              <span>Harian: <b>${formatRupiah(kos.priceDaily)}</b></span>
              <span>•</span>
              <span>Tahunan: <b>${formatRupiah(kos.priceYearly)}</b></span>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <div>
              <div class="text-[11px] text-slate-400 font-medium">Pemilik / Pengelola</div>
              <div class="font-bold text-sm text-slate-800 dark:text-slate-100">${kos.ownerName}</div>
            </div>
          </div>

          <button onclick="contactWhatsApp('${kos.ownerPhone}', '${kos.name}')" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all">
            <i class="fa-brands fa-whatsapp text-lg"></i> Tanya Pemilik via WhatsApp
          </button>

          <button onclick="openBookingForm('${kos.id}')" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all">
            <i class="fa-solid fa-calendar-check"></i> Ajukan Sewa Kamar Ini
          </button>
        </div>
      </div>
    </div>
  `;

  openModal('detailModal');
}

function setMainGalleryImage(src) {
  const main = document.getElementById('mainGalleryImg');
  if (main) main.src = src;
}

function shareKos(kosName) {
  if (navigator.share) {
    navigator.share({
      title: kosName,
      text: `Lihat kos nyaman ini: ${kosName} di CariKos!`,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast('Tautan kos berhasil disalin ke clipboard!');
  }
}

function contactWhatsApp(phone, kosName) {
  const msg = encodeURIComponent(`Halo ${kosName}, saya melihat listing kos Anda di CariKos dan tertarik untuk menanyakan ketersediaan kamar. Apakah masih ada kamar kosong untuk bulan depan? Terima kasih.`);
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
}

// Booking Form Simulation
function openBookingForm(kosId) {
  const kos = AppState.allKos.find(k => k.id === kosId);
  if (!kos) return;

  const formBody = document.getElementById('bookingModalBody');
  if (!formBody) return;

  formBody.innerHTML = `
    <div class="p-4 bg-blue-50 dark:bg-slate-700/60 rounded-xl mb-6 flex items-center gap-4">
      <img src="${kos.images[0]}" class="w-16 h-16 rounded-lg object-cover" alt="${kos.name}">
      <div>
        <h4 class="font-bold text-sm text-slate-900 dark:text-white">${kos.name}</h4>
        <div class="text-xs text-blue-600 font-extrabold mt-0.5">${formatRupiah(kos.priceMonthly)} / bulan</div>
        <div class="text-[11px] text-slate-400">${kos.district}, ${kos.city}</div>
      </div>
    </div>

    <form id="bookingForm" onsubmit="submitBooking(event, '${kos.id}')" class="space-y-4 text-left">
      <div>
        <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap Penyewa *</label>
        <input type="text" required id="bookName" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Masukkan nama sesuai KTP">
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nomor WhatsApp *</label>
          <input type="tel" required id="bookPhone" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0812xxxxxxx">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pekerjaan / Status</label>
          <select id="bookJob" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="Mahasiswa">Mahasiswa</option>
            <option value="Karyawan Swasta">Karyawan Swasta</option>
            <option value="PNS / BUMN">PNS / BUMN</option>
            <option value="Freelancer / Nomad">Freelancer / Nomad</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Rencana Tanggal Masuk *</label>
          <input type="date" required id="bookDate" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Durasi Sewa *</label>
          <select id="bookDuration" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="1 Bulan">1 Bulan</option>
            <option value="3 Bulan">3 Bulan</option>
            <option value="6 Bulan">6 Bulan</option>
            <option value="1 Tahun">1 Tahun</option>
          </select>
        </div>
      </div>
      <div class="pt-2">
        <button type="submit" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all">
          Kirim Pengajuan Sewa Sekarang
        </button>
      </div>
    </form>
  `;

  openModal('bookingModal');
}

function submitBooking(e, kosId) {
  e.preventDefault();
  const kos = AppState.allKos.find(k => k.id === kosId);
  const phone = document.getElementById('bookPhone').value;
  closeModal('bookingModal');
  showToast(`Pengajuan sewa ${kos.name} berhasil dikirim! Pemilik akan menghubungi nomor ${phone} segera.`);
}

// Budget Calculator Modal
function openCalculatorForKos(kosId) {
  const kos = AppState.allKos.find(k => k.id === kosId) || AppState.allKos[0];
  openModal('calculatorModal');
  
  if (kos) {
    document.getElementById('calcRent').value = kos.priceMonthly;
    document.getElementById('calcDeposit').value = kos.deposit || 0;
    document.getElementById('calcElectricity').value = kos.electricityIncluded ? 0 : 150000;
  }
  calculateBudget();
}

function calculateBudget() {
  const rent = parseFloat(document.getElementById('calcRent')?.value || 0);
  const electricity = parseFloat(document.getElementById('calcElectricity')?.value || 0);
  const parking = parseFloat(document.getElementById('calcParking')?.value || 0);
  const laundry = parseFloat(document.getElementById('calcLaundry')?.value || 0);
  const food = parseFloat(document.getElementById('calcFood')?.value || 0);
  const deposit = parseFloat(document.getElementById('calcDeposit')?.value || 0);

  const totalMonthly = rent + electricity + parking + laundry + food;
  const totalFirstMonth = totalMonthly + deposit;
  const totalYearly = (totalMonthly * 12) + deposit;

  document.getElementById('calcTotalMonthly').textContent = formatRupiah(totalMonthly);
  document.getElementById('calcTotalFirstMonth').textContent = formatRupiah(totalFirstMonth);
  document.getElementById('calcTotalYearly').textContent = formatRupiah(totalYearly);
}

// Add New Kos Listing
function handleNewKosSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('addKosName').value;
  const city = document.getElementById('addKosCity').value;
  const district = document.getElementById('addKosDistrict').value;
  const address = document.getElementById('addKosAddress').value;
  const nearCampus = document.getElementById('addKosCampus').value;
  const type = document.getElementById('addKosType').value;
  const category = document.getElementById('addKosCategory').value;
  const priceMonthly = parseFloat(document.getElementById('addKosPrice').value);
  const deposit = parseFloat(document.getElementById('addKosDeposit').value) || 0;
  const roomSize = document.getElementById('addKosSize').value || '3 x 3 m';
  const availableRooms = parseInt(document.getElementById('addKosRooms').value) || 1;
  const ownerName = document.getElementById('addKosOwner').value;
  const ownerPhone = document.getElementById('addKosPhone').value;
  const electricityIncluded = document.getElementById('addKosElectricity').checked;
  const imageUrl = document.getElementById('addKosImage').value || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80';
  const description = document.getElementById('addKosDesc').value;

  const facilitiesCheckboxes = document.querySelectorAll('input[name="newKosFacilities"]:checked');
  const facilities = Array.from(facilitiesCheckboxes).map(cb => cb.value);

  const newKos = {
    id: `custom-kos-${Date.now()}`,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    type,
    category,
    city,
    district,
    address,
    nearCampus,
    lat: -6.2088 + (Math.random() - 0.5) * 0.1,
    lng: 106.8456 + (Math.random() - 0.5) * 0.1,
    priceMonthly,
    priceDaily: Math.round(priceMonthly / 15),
    priceYearly: Math.round(priceMonthly * 11),
    deposit,
    electricityIncluded,
    roomSize,
    availableRooms,
    totalRooms: availableRooms + 2,
    rating: 5.0,
    reviewsCount: 1,
    ownerName,
    ownerPhone,
    isVerified: true,
    isPromo: false,
    promoText: "Iklan Baru",
    images: [imageUrl, "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"],
    facilities: facilities.length > 0 ? facilities : ["WiFi Cepat", "Kamar Mandi Dalam", "Kasur Springbed"],
    rules: ["Menjaga ketertiban kos", "Dilarang membawa rokok / narkoba"],
    description: description || "Kos nyaman dan bersih, fasilitas lengkap siap huni.",
    nearbyPlaces: [{ name: nearCampus || city, distance: "500 m" }],
    reviews: [{ user: "Admin CariKos", rating: 5, date: "Baru saja", comment: "Listing terverifikasi baru!" }]
  };

  AppState.allKos.unshift(newKos);
  
  const customListings = AppState.allKos.filter(k => k.id.startsWith('custom-kos-'));
  localStorage.setItem('carikos_custom_listings', JSON.stringify(customListings));

  closeModal('addKosModal');
  e.target.reset();
  applyFilters();
  showToast(`Listing ${name} berhasil ditambahkan dan langsung aktif! 🚀`);
}

// Reset All Filters
function resetAllFilters() {
  AppState.activeFilters = {
    keyword: '',
    city: 'Semua Kota',
    type: 'all',
    category: 'all',
    maxPrice: 5000000,
    facilities: [],
    electricityIncluded: false,
    sortBy: 'popular'
  };

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  
  const citySelect = document.getElementById('cityFilter');
  if (citySelect) citySelect.value = 'Semua Kota';

  const typeSelect = document.getElementById('typeFilterHero');
  if (typeSelect) typeSelect.value = 'all';

  const priceSlider = document.getElementById('priceRangeSlider');
  if (priceSlider) {
    priceSlider.value = 5000000;
    document.getElementById('priceSliderValue').textContent = formatRupiah(5000000);
  }

  document.querySelectorAll('input[name="filterFacility"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('bg-blue-600', 'text-white'));
  
  document.querySelectorAll('.campus-chip').forEach(c => {
    c.classList.remove('bg-blue-600', 'text-white');
    c.classList.add('bg-slate-100', 'dark:bg-slate-700', 'text-slate-600', 'dark:text-slate-300');
  });

  document.querySelectorAll('.cat-chip').forEach((el, idx) => {
    if (idx === 0) {
      el.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      el.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
    } else {
      el.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      el.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
    }
  });

  applyFilters();
  showToast('Semua filter berhasil di-reset.');
}

// Popular Campus Quick Tag Click
function selectPopularCampus(campusCode, cityName, element) {
  const isAlreadyActive = AppState.activeFilters.keyword === campusCode;

  document.querySelectorAll('.campus-chip').forEach(el => {
    el.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
    el.classList.add('bg-slate-100', 'dark:bg-slate-700', 'text-slate-600', 'dark:text-slate-300');
  });

  if (isAlreadyActive) {
    AppState.activeFilters.keyword = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    showToast('Filter kampus dinonaktifkan.');
  } else {
    AppState.activeFilters.keyword = campusCode;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = campusCode;

    if (cityName) {
      AppState.activeFilters.city = cityName;
      const citySelect = document.getElementById('cityFilter');
      if (citySelect) citySelect.value = cityName;
    }

    if (element) {
      element.classList.remove('bg-slate-100', 'dark:bg-slate-700', 'text-slate-600', 'dark:text-slate-300');
      element.classList.add('bg-blue-600', 'text-white', 'shadow-md');
    }
    showToast(`Menampilkan kos di sekitar ${campusCode} (${cityName})... 🎓`);
  }

  applyFilters();
  scrollToResults();
}

function triggerHeroSearch() {
  applyFilters();
  scrollToResults();
  showToast(`Ditemukan ${AppState.filteredKos.length} kos yang cocok! 🔍`);
}

function scrollToResults() {
  const target = document.getElementById('resultsCount');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Quick Category Chip Click
function selectQuickCategory(category, element) {
  document.querySelectorAll('.cat-chip').forEach(el => {
    el.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
    el.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
  });

  if (AppState.activeFilters.category === category) {
    AppState.activeFilters.category = 'all';
  } else {
    AppState.activeFilters.category = category;
    if (element) {
      element.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
      element.classList.add('bg-blue-600', 'text-white', 'shadow-md');
    }
  }
  applyFilters();
  scrollToResults();
}

// Quick Type Chip Click
function selectQuickType(type, element) {
  document.querySelectorAll('.type-chip').forEach(el => {
    el.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
    el.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
  });

  if (AppState.activeFilters.type === type) {
    AppState.activeFilters.type = 'all';
  } else {
    AppState.activeFilters.type = type;
    if (element) {
      element.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
      element.classList.add('bg-blue-600', 'text-white', 'shadow-md');
    }
  }
  applyFilters();
  scrollToResults();
}

// ====================================================================
// ==================== PORTAL PEMILIK KOS ENGINE =====================
// ====================================================================

function switchOwnerTab(tabId) {
  JuraganState.currentTab = tabId;

  document.querySelectorAll('.owner-nav-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabId;
    if (isTarget) {
      btn.className = "owner-nav-btn flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md transition-all";
    } else {
      btn.className = "owner-nav-btn flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-all";
    }
  });

  document.querySelectorAll('.owner-tab-view').forEach(view => {
    view.classList.add('hidden');
  });

  const targetView = document.getElementById(`owner-view-${tabId}`);
  if (targetView) {
    targetView.classList.remove('hidden');
  }

  if (tabId === 'dash') renderOwnerDashboard();
  if (tabId === 'kamar') renderOwnerRooms();
  if (tabId === 'penyewa') renderOwnerTenants();
  if (tabId === 'keuangan') renderOwnerFinance();
  if (tabId === 'keluhan') renderOwnerComplaints();
  if (tabId === 'publik') renderOwnerPublicProperties();
  if (tabId === 'pengaturan') renderOwnerSettings();
}

// Owner Dashboard
function renderOwnerDashboard() {
  const totalRooms = JuraganState.rooms.length;
  const occupiedRooms = JuraganState.rooms.filter(r => r.status === 'occupied').length;
  const availableRooms = JuraganState.rooms.filter(r => r.status === 'available').length;
  const maintenanceRooms = JuraganState.rooms.filter(r => r.status === 'maintenance').length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const currentYearMonth = new Date().toISOString().slice(0, 7);
  let incomeThisMonth = 0;
  let expenseThisMonth = 0;

  JuraganState.transactions.forEach(t => {
    if (t.date && t.date.startsWith(currentYearMonth)) {
      if (t.type === 'income') incomeThisMonth += t.amount;
      if (t.type === 'expense') expenseThisMonth += t.amount;
    }
  });

  const netProfit = incomeThisMonth - expenseThisMonth;
  const activeTenants = JuraganState.tenants.filter(t => t.status === 'active');
  const unpaidTenants = activeTenants.filter(t => t.paymentStatus !== 'paid');
  const totalUnpaidAmount = unpaidTenants.reduce((sum, t) => sum + t.monthlyRent, 0);

  const elTotal = document.getElementById('ownerStatTotalRooms');
  if (elTotal) elTotal.textContent = totalRooms;

  const elOccRate = document.getElementById('ownerStatOccupancyRate');
  if (elOccRate) elOccRate.textContent = `${occupancyRate}%`;

  const elOccBar = document.getElementById('ownerStatOccupancyBar');
  if (elOccBar) elOccBar.style.width = `${occupancyRate}%`;

  const elIncome = document.getElementById('ownerStatIncomeMonth');
  if (elIncome) elIncome.textContent = formatRupiah(incomeThisMonth);

  const elExpense = document.getElementById('ownerStatExpenseMonth');
  if (elExpense) elExpense.textContent = formatRupiah(expenseThisMonth);

  const elNet = document.getElementById('ownerStatNetProfit');
  if (elNet) elNet.textContent = formatRupiah(netProfit);

  const elUnpaid = document.getElementById('ownerStatUnpaidAmount');
  if (elUnpaid) elUnpaid.textContent = formatRupiah(totalUnpaidAmount);

  const elUnpaidCnt = document.getElementById('ownerStatUnpaidCount');
  if (elUnpaidCnt) elUnpaidCnt.textContent = `${unpaidTenants.length} Penyewa`;

  const propNameEl = document.getElementById('ownerDashPropertyName');
  if (propNameEl) propNameEl.textContent = JuraganState.property.name || "Kos Graha Asri Tebet";

  renderOwnerDueAlerts(unpaidTenants);
  renderOwnerRecentTransactions();
}

function renderOwnerDueAlerts(unpaidList) {
  const container = document.getElementById('ownerDueAlertsContainer');
  if (!container) return;

  if (unpaidList.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
        <i class="fa-solid fa-circle-check text-emerald-500 text-3xl mb-2"></i>
        <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Semua Tagihan Lunas!</p>
        <p class="text-xs">Tidak ada penyewa yang memiliki tagihan tertunggak saat ini.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = unpaidList.map(t => {
    const isOverdue = t.paymentStatus === 'overdue';
    return `
      <div class="p-4 rounded-2xl bg-white dark:bg-slate-800 border ${isOverdue ? 'border-red-200 dark:border-red-900/40 bg-red-50/30' : 'border-amber-200 dark:border-amber-900/40 bg-amber-50/30'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl ${isOverdue ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'} flex items-center justify-center font-bold text-sm">
            ${t.roomNumber}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100">${t.name}</h4>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${isOverdue ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}">
                ${isOverdue ? 'Menunggak' : 'Segera Jatuh Tempo'}
              </span>
            </div>
            <p class="text-xs text-slate-500">Jatuh Tempo: <b>${formatDateIndo(t.dueDate)}</b> • ${formatRupiah(t.monthlyRent)}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 w-full sm:w-auto">
          <button onclick="sendWhatsAppInvoice('${t.id}')" class="flex-1 sm:flex-initial px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5">
            <i class="fa-brands fa-whatsapp text-sm"></i> Tagih via WA
          </button>
          <button onclick="markAsPaid('${t.id}')" class="flex-1 sm:flex-initial px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-check"></i> Catat Lunas
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderOwnerRecentTransactions() {
  const container = document.getElementById('ownerRecentTransactionsContainer');
  if (!container) return;

  const recent = [...JuraganState.transactions].reverse().slice(0, 5);

  if (recent.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Belum ada riwayat transaksi.</p>`;
    return;
  }

  container.innerHTML = recent.map(tx => `
    <div class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 transition-colors">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400'} flex items-center justify-center text-sm">
          <i class="fa-solid ${tx.type === 'income' ? 'fa-arrow-down-left' : 'fa-arrow-up-right'}"></i>
        </div>
        <div>
          <h5 class="font-bold text-xs text-slate-800 dark:text-slate-100">${tx.category}</h5>
          <p class="text-[11px] text-slate-400">${formatDateIndo(tx.date)} • ${tx.note || '-'}</p>
        </div>
      </div>
      <div class="text-right">
        <div class="font-extrabold text-xs ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}">
          ${tx.type === 'income' ? '+' : '-'}${formatRupiah(tx.amount)}
        </div>
        <span class="text-[10px] text-slate-400">Kamar ${tx.roomNumber}</span>
      </div>
    </div>
  `).join('');
}

// Owner Rooms Matrix
function renderOwnerRooms() {
  const container = document.getElementById('ownerRoomsGridContainer');
  if (!container) return;

  let list = [...JuraganState.rooms];

  if (JuraganState.activeFilterFloor !== 'all') {
    list = list.filter(r => r.floor === parseInt(JuraganState.activeFilterFloor));
  }

  if (JuraganState.activeFilterRoomStatus !== 'all') {
    list = list.filter(r => r.status === JuraganState.activeFilterRoomStatus);
  }

  list.sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }));

  container.innerHTML = list.map(room => {
    let statusClass = 'room-available';
    let badgeText = 'Kosong';
    let badgeClass = 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';

    const tenant = JuraganState.tenants.find(t => t.roomId === room.id && t.status === 'active');

    if (room.status === 'occupied') {
      statusClass = 'room-occupied';
      badgeText = 'Terisi';
      badgeClass = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';

      if (tenant) {
        if (tenant.paymentStatus === 'overdue') {
          statusClass = 'room-overdue';
          badgeText = 'Menunggak';
          badgeClass = 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';
        } else if (tenant.paymentStatus === 'due_soon') {
          statusClass = 'room-due-soon';
          badgeText = 'Jatuh Tempo';
          badgeClass = 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
        }
      }
    } else if (room.status === 'maintenance') {
      statusClass = 'room-maintenance';
      badgeText = 'Perbaikan';
      badgeClass = 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
    }

    return `
      <div class="room-card ${statusClass} bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 font-extrabold text-sm flex items-center justify-center text-slate-800 dark:text-slate-100">
                ${room.number}
              </span>
              <div>
                <span class="text-[10px] uppercase tracking-wider font-bold text-slate-400">Lantai ${room.floor}</span>
                <h4 class="font-bold text-xs text-slate-800 dark:text-slate-100 line-clamp-1">${room.type}</h4>
              </div>
            </div>
            <span class="text-[11px] font-bold px-2.5 py-1 rounded-full ${badgeClass}">
              ${badgeText}
            </span>
          </div>

          <div class="mb-4">
            <div class="text-base font-extrabold text-blue-600 dark:text-blue-400">
              ${formatRupiah(room.priceMonthly)}<span class="text-xs font-normal text-slate-400">/bln</span>
            </div>
            <div class="text-xs text-slate-500"><i class="fa-solid fa-vector-square mr-1 text-slate-400"></i>Ukuran: ${room.size}</div>
          </div>

          ${tenant ? `
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 mb-4 border border-slate-100 dark:border-slate-600/50">
              <div class="text-[10px] text-slate-400 font-semibold uppercase">Penyewa Aktif:</div>
              <div class="font-bold text-xs text-slate-800 dark:text-slate-100 line-clamp-1">${tenant.name}</div>
              <div class="text-[11px] text-slate-500 mt-0.5">Jatuh Tempo: <b>${formatDateIndo(tenant.dueDate)}</b></div>
            </div>
          ` : `
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 mb-4 border border-dashed border-slate-200 dark:border-slate-700 text-center">
              <span class="text-xs text-slate-400 italic">Kamar Kosong / Siap Huni</span>
            </div>
          `}
        </div>

        <div class="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
          ${room.status === 'occupied' && tenant ? `
            <button onclick="sendWhatsAppInvoice('${tenant.id}')" title="Kirim Tagihan WA" class="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-colors">
              <i class="fa-brands fa-whatsapp text-sm"></i>
            </button>
            <button onclick="openCheckOutModal('${tenant.id}')" class="flex-1 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-bold transition-colors">
              Check-Out
            </button>
          ` : `
            <button onclick="openCheckInModal('${room.id}')" class="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors">
              + Check-In Penyewa
            </button>
          `}
          <button onclick="openReceiptModal('${tenant ? tenant.id : ''}')" title="Kwitansi" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 text-xs transition-colors">
            <i class="fa-solid fa-receipt"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterOwnerRooms(type, val, element) {
  if (type === 'floor') JuraganState.activeFilterFloor = val;
  if (type === 'status') JuraganState.activeFilterRoomStatus = val;

  element.parentElement.querySelectorAll('button').forEach(b => {
    b.classList.remove('bg-blue-600', 'text-white');
    b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
  });
  element.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
  element.classList.add('bg-blue-600', 'text-white');

  renderOwnerRooms();
}

// Owner Tenants Table
function renderOwnerTenants() {
  const container = document.getElementById('ownerTenantsTableBody');
  if (!container) return;

  let list = JuraganState.tenants.filter(t => t.status === 'active');

  if (JuraganState.activeFilterTenantStatus !== 'all') {
    list = list.filter(t => t.paymentStatus === JuraganState.activeFilterTenantStatus);
  }

  if (list.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-8 text-slate-400 text-xs">Tidak ada data penyewa yang cocok.</td>
      </tr>
    `;
    return;
  }

  container.innerHTML = list.map((tenant, idx) => {
    let statusBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Lunas</span>`;
    if (tenant.paymentStatus === 'overdue') {
      statusBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">Menunggak</span>`;
    } else if (tenant.paymentStatus === 'due_soon') {
      statusBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">Jatuh Tempo</span>`;
    }

    return `
      <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-xs transition-colors">
        <td class="p-4 font-bold text-slate-400">${idx + 1}</td>
        <td class="p-4">
          <div class="font-bold text-slate-800 dark:text-slate-100">${tenant.name}</div>
          <div class="text-[11px] text-slate-400"><i class="fa-solid fa-id-card mr-1"></i>KTP: ${tenant.ktp || '-'}</div>
          <div class="text-[11px] text-slate-500">${tenant.job || '-'}</div>
        </td>
        <td class="p-4">
          <span class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-extrabold flex items-center justify-center">
            ${tenant.roomNumber}
          </span>
        </td>
        <td class="p-4">
          <div class="font-bold text-slate-800 dark:text-slate-200">${formatRupiah(tenant.monthlyRent)}/bln</div>
          <div class="text-[10px] text-slate-400">Deposit: ${formatRupiah(tenant.deposit)}</div>
        </td>
        <td class="p-4">
          <div class="font-medium text-slate-700 dark:text-slate-300">${formatDateIndo(tenant.dueDate)}</div>
          <div class="text-[10px] text-slate-400">Masuk: ${formatDateIndo(tenant.startDate)}</div>
        </td>
        <td class="p-4">${statusBadge}</td>
        <td class="p-4">
          <div class="flex items-center gap-1.5">
            <button onclick="sendWhatsAppInvoice('${tenant.id}')" title="Kirim Tagihan WA" class="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
            <button onclick="openReceiptModal('${tenant.id}')" title="Cetak Kwitansi" class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
              <i class="fa-solid fa-receipt"></i>
            </button>
            <button onclick="markAsPaid('${tenant.id}')" title="Catat Lunas" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 hover:bg-slate-200 transition-colors">
              <i class="fa-solid fa-check"></i>
            </button>
            <button onclick="openCheckOutModal('${tenant.id}')" title="Check-Out" class="p-2 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 hover:bg-red-600 hover:text-white transition-colors">
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function markAsPaid(tenantId) {
  const tenant = JuraganState.tenants.find(t => t.id === tenantId);
  if (!tenant) return;

  tenant.paymentStatus = 'paid';

  const newTx = {
    id: `TX-${Date.now()}`,
    type: 'income',
    category: 'Sewa Kamar',
    date: new Date().toISOString().slice(0, 10),
    amount: tenant.monthlyRent,
    tenantName: tenant.name,
    roomNumber: tenant.roomNumber,
    note: `Pembayaran sewa ${formatDateIndo(tenant.dueDate)} (Kamar ${tenant.roomNumber})`
  };

  JuraganState.transactions.push(newTx);
  saveJuraganData();
  showToast(`Pembayaran sewa ${tenant.name} berhasil dicatat lunas! 🎉`);

  renderOwnerDashboard();
  renderOwnerRooms();
  renderOwnerTenants();
}

function sendWhatsAppInvoice(tenantId) {
  const tenant = JuraganState.tenants.find(t => t.id === tenantId);
  if (!tenant) return;

  const prop = JuraganState.property;
  const message = 
`Halo Kak *${tenant.name}*,
Salam dari pengelola *${prop.name || 'Kos'}*.

Kami ingin menginformasikan rincian tagihan sewa kamar kos Anda:
🏠 *Kamar:* No. ${tenant.roomNumber}
🗓️ *Jatuh Tempo:* ${formatDateIndo(tenant.dueDate)}
💰 *Total Tagihan:* ${formatRupiah(tenant.monthlyRent)}

Pembayaran dapat ditransfer melalui:
🏦 *Bank:* ${prop.bankName || 'BCA'}
💳 *No. Rekening:* ${prop.bankAccount || '8830-1234-5678'}
👤 *Atas Nama:* ${prop.bankHolder || 'Pengelola Kos'}

Mohon konfirmasi bukti transfer jika sudah melakukan pembayaran ya kak. Terima kasih banyak! 🙏`;

  const cleanPhone = tenant.phone.replace(/[^0-9]/g, '');
  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  showToast(`Membuka WhatsApp untuk mengirim tagihan ke ${tenant.name}`);
}

function openReceiptModal(tenantId) {
  const tenant = JuraganState.tenants.find(t => t.id === tenantId) || JuraganState.tenants[0];
  if (!tenant) return;

  const prop = JuraganState.property;
  const receiptNo = `KW-${Date.now().toString().slice(-6)}`;
  const today = formatDateIndo(new Date().toISOString());

  const container = document.getElementById('receiptModalBody');
  if (!container) return;

  container.innerHTML = `
    <div id="printableReceipt" class="p-8 bg-white text-slate-800 rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto font-sans">
      <div class="flex justify-between items-start pb-4 border-b-2 border-slate-800 mb-6">
        <div>
          <h2 class="text-xl font-black uppercase text-blue-600 tracking-wide">${prop.name || 'Kos Graha Asri'}</h2>
          <p class="text-xs text-slate-500">${prop.address || 'Jakarta Selatan'}</p>
          <p class="text-xs text-slate-500">Telp: ${prop.phone || '-'}</p>
        </div>
        <div class="text-right">
          <div class="text-xs font-black text-slate-400 uppercase">KWITANSI RESMI</div>
          <div class="text-sm font-extrabold text-slate-800">${receiptNo}</div>
          <div class="text-[11px] text-slate-500">${today}</div>
        </div>
      </div>

      <div class="space-y-3 text-xs mb-6">
        <div class="flex justify-between py-1 border-b border-slate-100">
          <span class="text-slate-500">Telah Terima Dari:</span>
          <span class="font-bold text-slate-900">${tenant.name}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-slate-100">
          <span class="text-slate-500">Kamar:</span>
          <span class="font-bold text-slate-900">Kamar No. ${tenant.roomNumber}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-slate-100">
          <span class="text-slate-500">Untuk Pembayaran:</span>
          <span class="font-bold text-slate-900">Sewa Kos Periode ${formatDateIndo(tenant.dueDate)}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-slate-100">
          <span class="text-slate-500">Metode:</span>
          <span class="font-bold text-slate-900">Transfer (${prop.bankName || 'BCA'})</span>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-blue-50 border border-blue-200 flex justify-between items-center mb-8">
        <span class="font-bold text-xs text-blue-900 uppercase">Jumlah Pembayaran:</span>
        <span class="text-lg font-black text-blue-600">${formatRupiah(tenant.monthlyRent)}</span>
      </div>

      <div class="flex justify-between items-end pt-4 text-center text-xs">
        <div>
          <div class="text-[11px] text-slate-400 mb-12">Penyewa,</div>
          <div class="font-bold text-slate-800">(${tenant.name})</div>
        </div>
        <div>
          <div class="text-[11px] text-slate-400 mb-12">Pengelola Kos,</div>
          <div class="font-bold text-slate-800 underline">(${prop.owner || 'Pengelola'})</div>
        </div>
      </div>
    </div>

    <div class="flex gap-3 justify-end mt-6 no-print">
      <button onclick="closeModal('receiptModal')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
        Tutup
      </button>
      <button onclick="window.print()" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2">
        <i class="fa-solid fa-print"></i> Cetak Kwitansi
      </button>
    </div>
  `;

  openModal('receiptModal');
}

// Check-In Modal & Submit
function openCheckInModal(roomId) {
  const room = JuraganState.rooms.find(r => r.id === roomId) || JuraganState.rooms[0];
  if (!room) return;

  const body = document.getElementById('checkInModalBody');
  if (!body) return;

  const today = new Date().toISOString().slice(0, 10);
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextMonthStr = nextMonth.toISOString().slice(0, 10);

  body.innerHTML = `
    <div class="p-4 bg-blue-50 dark:bg-slate-800 rounded-xl mb-6 flex justify-between items-center">
      <div>
        <span class="text-xs text-slate-500 font-medium">Check-In Kamar</span>
        <h4 class="font-black text-base text-blue-600 dark:text-blue-400">Kamar No. ${room.number} (${room.type})</h4>
      </div>
      <div class="text-right">
        <span class="text-xs text-slate-500">Harga Sewa:</span>
        <div class="font-bold text-sm text-slate-800 dark:text-slate-100">${formatRupiah(room.priceMonthly)}/bln</div>
      </div>
    </div>

    <form onsubmit="submitCheckIn(event, '${room.id}')" class="space-y-4 text-left">
      <div>
        <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap Penyewa *</label>
        <input type="text" required id="ciName" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none" placeholder="Nama sesuai KTP">
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">No. WhatsApp *</label>
          <input type="tel" required id="ciPhone" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none" placeholder="0812xxxxxxx">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nomor KTP / NIK</label>
          <input type="text" id="ciKtp" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none" placeholder="3174xxxxxxx">
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tanggal Masuk *</label>
          <input type="date" required id="ciStartDate" value="${today}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Jatuh Tempo Pertama *</label>
          <input type="date" required id="ciDueDate" value="${nextMonthStr}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Uang Deposit (Rp)</label>
          <input type="number" id="ciDeposit" value="500000" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none">
        </div>
      </div>

      <div class="pt-2">
        <button type="submit" class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all">
          Konfirmasi Check-In Penyewa
        </button>
      </div>
    </form>
  `;

  openModal('checkInModal');
}

function submitCheckIn(e, roomId) {
  e.preventDefault();
  const room = JuraganState.rooms.find(r => r.id === roomId);
  if (!room) return;

  const tenantId = `T-${Date.now().toString().slice(-4)}`;
  const name = document.getElementById('ciName').value;
  const phone = document.getElementById('ciPhone').value;
  const ktp = document.getElementById('ciKtp').value;
  const startDate = document.getElementById('ciStartDate').value;
  const dueDate = document.getElementById('ciDueDate').value;
  const deposit = parseFloat(document.getElementById('ciDeposit').value) || 0;

  const newTenant = {
    id: tenantId,
    name,
    phone,
    ktp,
    roomId: room.id,
    roomNumber: room.number,
    startDate,
    dueDate,
    monthlyRent: room.priceMonthly,
    deposit,
    paymentStatus: 'paid',
    status: 'active'
  };

  room.status = 'occupied';
  room.currentTenantId = tenantId;
  JuraganState.tenants.push(newTenant);

  JuraganState.transactions.push({
    id: `TX-${Date.now()}`,
    type: 'income',
    category: 'Sewa Kamar',
    date: startDate,
    amount: room.priceMonthly + deposit,
    tenantName: name,
    roomNumber: room.number,
    note: `Check-in awal (Sewa + Deposit Rp ${deposit})`
  });

  saveJuraganData();
  closeModal('checkInModal');

  // Auto-sync available rooms to public listing (kos-001)
  const defaultProp = AppState.allKos.find(k => k.id === 'kos-001');
  if (defaultProp) {
    defaultProp.availableRooms = JuraganState.rooms.filter(r => r.status === 'available').length;
  }

  showToast(`Penyewa ${name} berhasil check-in di Kamar ${room.number}! 🏠`);

  renderOwnerRooms();
  renderOwnerTenants();
  renderOwnerDashboard();
  renderOwnerPublicProperties();
}

function openCheckOutModal(tenantId) {
  const tenant = JuraganState.tenants.find(t => t.id === tenantId);
  if (!tenant) return;

  if (confirm(`Apakah Anda yakin ingin melakukan proses Check-Out untuk ${tenant.name} dari Kamar ${tenant.roomNumber}? Deposit yang perlu dikembalikan: ${formatRupiah(tenant.deposit)}`)) {
    tenant.status = 'inactive';

    const room = JuraganState.rooms.find(r => r.id === tenant.roomId);
    if (room) {
      room.status = 'available';
      room.currentTenantId = null;
    }

    if (tenant.deposit > 0) {
      JuraganState.transactions.push({
        id: `TX-${Date.now()}`,
        type: 'expense',
        category: 'Pengembalian Deposit',
        date: new Date().toISOString().slice(0, 10),
        amount: tenant.deposit,
        tenantName: tenant.name,
        roomNumber: tenant.roomNumber,
        note: `Pengembalian uang deposit saat check-out`
      });
    }

    // Auto-sync available rooms to public listing (kos-001)
    const defaultProp = AppState.allKos.find(k => k.id === 'kos-001');
    if (defaultProp) {
      defaultProp.availableRooms = JuraganState.rooms.filter(r => r.status === 'available').length;
    }

    saveJuraganData();
    showToast(`Check-out ${tenant.name} berhasil! Kamar ${tenant.roomNumber} kini berstatus Kosong.`);
    renderOwnerRooms();
    renderOwnerTenants();
    renderOwnerDashboard();
    renderOwnerPublicProperties();
  }
}

// Owner Finance
function renderOwnerFinance() {
  const container = document.getElementById('ownerFinanceTableBody');
  if (!container) return;

  let totalIncome = 0;
  let totalExpense = 0;

  JuraganState.transactions.forEach(t => {
    if (t.type === 'income') totalIncome += t.amount;
    if (t.type === 'expense') totalExpense += t.amount;
  });

  const finInc = document.getElementById('ownerFinTotalIncome');
  if (finInc) finInc.textContent = formatRupiah(totalIncome);

  const finExp = document.getElementById('ownerFinTotalExpense');
  if (finExp) finExp.textContent = formatRupiah(totalExpense);

  const finNet = document.getElementById('ownerFinNetBalance');
  if (finNet) finNet.textContent = formatRupiah(totalIncome - totalExpense);

  const sortedTx = [...JuraganState.transactions].reverse();

  container.innerHTML = sortedTx.map((tx, idx) => `
    <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-xs">
      <td class="p-4 font-bold text-slate-400">${idx + 1}</td>
      <td class="p-4 font-medium">${formatDateIndo(tx.date)}</td>
      <td class="p-4">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'}">
          ${tx.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
        </span>
      </td>
      <td class="p-4 font-bold text-slate-800 dark:text-slate-100">${tx.category}</td>
      <td class="p-4 text-slate-500">${tx.note || '-'}</td>
      <td class="p-4 text-slate-400">Kamar ${tx.roomNumber}</td>
      <td class="p-4 text-right font-extrabold ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}">
        ${tx.type === 'income' ? '+' : '-'}${formatRupiah(tx.amount)}
      </td>
    </tr>
  `).join('');
}

function handleAddTransactionSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('txType').value;
  const category = document.getElementById('txCategory').value;
  const amount = parseFloat(document.getElementById('txAmount').value);
  const date = document.getElementById('txDate').value;
  const roomNumber = document.getElementById('txRoomNumber').value || 'All';
  const note = document.getElementById('txNote').value;

  const newTx = {
    id: `TX-${Date.now()}`,
    type,
    category,
    amount,
    date,
    roomNumber,
    note
  };

  JuraganState.transactions.push(newTx);
  saveJuraganData();
  closeModal('addTransactionModal');
  e.target.reset();
  showToast('Transaksi keuangan berhasil dicatat! 💵');
  renderOwnerFinance();
  renderOwnerDashboard();
}

function exportFinanceToCSV() {
  let csv = "ID,Tanggal,Tipe,Kategori,Nominal,Kamar,Catatan\n";
  JuraganState.transactions.forEach(t => {
    csv += `"${t.id}","${t.date}","${t.type}","${t.category}","${t.amount}","${t.roomNumber}","${t.note}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Laporan_Keuangan_Kos_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Laporan keuangan berhasil diunduh dalam format CSV!');
}

// Owner Complaints
function renderOwnerComplaints() {
  const container = document.getElementById('ownerComplaintsContainer');
  if (!container) return;

  if (JuraganState.complaints.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-400">Tidak ada tiket keluhan aktif.</div>`;
    return;
  }

  container.innerHTML = JuraganState.complaints.map(cmp => {
    let statusClass = 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
    let statusText = 'Menunggu Tindakan';

    if (cmp.status === 'in_progress') {
      statusClass = 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
      statusText = 'Sedang Dikerjakan';
    } else if (cmp.status === 'resolved') {
      statusClass = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
      statusText = 'Selesai';
    }

    return `
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-black text-xs">Kamar ${cmp.roomNumber}</span>
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${statusClass}">${statusText}</span>
            <span class="text-[11px] text-slate-400">${formatDateIndo(cmp.date)}</span>
          </div>
          <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">${cmp.category}: ${cmp.description}</h4>
          <p class="text-xs text-slate-500">Pelapor: ${cmp.tenantName} • Estimasi Biaya: ${formatRupiah(cmp.cost)}</p>
        </div>

        <div class="flex items-center gap-2">
          ${cmp.status !== 'resolved' ? `
            <button onclick="updateComplaintStatus('${cmp.id}', 'resolved')" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors">
              <i class="fa-solid fa-check mr-1"></i> Tandai Selesai
            </button>
          ` : `
            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400"><i class="fa-solid fa-circle-check mr-1"></i>Tuntas</span>
          `}
        </div>
      </div>
    `;
  }).join('');
}

function updateComplaintStatus(cmpId, newStatus) {
  const cmp = JuraganState.complaints.find(c => c.id === cmpId);
  if (!cmp) return;
  cmp.status = newStatus;
  saveJuraganData();
  showToast('Status tiket keluhan berhasil diperbarui!');
  renderOwnerComplaints();
}

function handleAddComplaintSubmit(e) {
  e.preventDefault();
  const roomNumber = document.getElementById('cmpRoom').value;
  const tenantName = document.getElementById('cmpTenant').value || 'Penyewa';
  const category = document.getElementById('cmpCategory').value;
  const description = document.getElementById('cmpDesc').value;
  const cost = parseFloat(document.getElementById('cmpCost').value) || 0;

  JuraganState.complaints.unshift({
    id: `CMP-${Date.now()}`,
    roomNumber,
    tenantName,
    category,
    description,
    date: new Date().toISOString().slice(0, 10),
    status: 'pending',
    cost
  });

  saveJuraganData();
  closeModal('addComplaintModal');
  e.target.reset();
  showToast('Laporan keluhan berhasil didaftarkan!');
  renderOwnerComplaints();
}

// Owner Settings
function renderOwnerSettings() {
  const prop = JuraganState.property;
  const elProp = document.getElementById('setPropName');
  if (elProp) elProp.value = prop.name || '';
  const elOwner = document.getElementById('setOwnerName');
  if (elOwner) elOwner.value = prop.owner || '';
  const elPhone = document.getElementById('setPhone');
  if (elPhone) elPhone.value = prop.phone || '';
  const elBank = document.getElementById('setBankName');
  if (elBank) elBank.value = prop.bankName || '';
  const elAcc = document.getElementById('setBankAccount');
  if (elAcc) elAcc.value = prop.bankAccount || '';
  const elHolder = document.getElementById('setBankHolder');
  if (elHolder) elHolder.value = prop.bankHolder || '';
  const elAddr = document.getElementById('setAddress');
  if (elAddr) elAddr.value = prop.address || '';
  const elRules = document.getElementById('setRules');
  if (elRules) elRules.value = prop.rulesNote || '';
}

function handleSaveSettings(e) {
  e.preventDefault();
  JuraganState.property.name = document.getElementById('setPropName').value;
  JuraganState.property.owner = document.getElementById('setOwnerName').value;
  JuraganState.property.phone = document.getElementById('setPhone').value;
  JuraganState.property.bankName = document.getElementById('setBankName').value;
  JuraganState.property.bankAccount = document.getElementById('setBankAccount').value;
  JuraganState.property.bankHolder = document.getElementById('setBankHolder').value;
  JuraganState.property.address = document.getElementById('setAddress').value;
  JuraganState.property.rulesNote = document.getElementById('setRules').value;

  saveJuraganData();

  // Auto sync to main public listing kos-001
  const defaultProp = AppState.allKos.find(k => k.id === 'kos-001');
  if (defaultProp) {
    defaultProp.name = JuraganState.property.name || defaultProp.name;
    defaultProp.ownerName = JuraganState.property.owner || defaultProp.ownerName;
    defaultProp.ownerPhone = JuraganState.property.phone || defaultProp.ownerPhone;
    if (JuraganState.property.address) defaultProp.address = JuraganState.property.address;
  }

  showToast('Pengaturan properti kos berhasil disimpan! ✅');
  renderOwnerDashboard();
  renderOwnerPublicProperties();
}

// ==================== OWNER PUBLIC PROPERTIES ENGINE ====================
function getOwnerManagedListings() {
  const defaultProp = AppState.allKos.find(k => k.id === 'kos-001');
  const customListings = AppState.allKos.filter(k => k.id.startsWith('custom-kos-'));
  
  if (defaultProp) {
    return [defaultProp, ...customListings];
  }
  return customListings.length > 0 ? customListings : [AppState.allKos[0]].filter(Boolean);
}

function renderOwnerPublicProperties() {
  const container = document.getElementById('ownerPublicPropertiesContainer');
  if (!container) return;

  const listings = getOwnerManagedListings();
  
  const badgeCount = document.getElementById('ownerPublicBadgeCount');
  if (badgeCount) {
    badgeCount.textContent = `${listings.length} Listing Tayang`;
  }

  let totalAvailableRooms = 0;
  listings.forEach(k => {
    totalAvailableRooms += (k.availableRooms || 0);
  });

  const availRoomsEl = document.getElementById('ownerPublicAvailRoomsCount');
  if (availRoomsEl) {
    availRoomsEl.textContent = `${totalAvailableRooms} Kamar Tersedia`;
  }

  if (listings.length === 0) {
    container.innerHTML = `
      <div class="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
        <i class="fa-solid fa-bullhorn text-4xl text-slate-300 dark:text-slate-600 mb-3"></i>
        <h4 class="font-black text-lg text-slate-800 dark:text-white">Belum Ada Properti Ditawarkan</h4>
        <p class="text-xs text-slate-400 mt-1 max-w-md mx-auto">Mulai pasang iklan kos Anda ke jutaan pencari kos di platform CariKos ID.</p>
        <button onclick="openAddPublicKosModal()" class="mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all">
          + Pasang Iklan Sekarang
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = listings.map(kos => {
    const isPrimaryDefault = kos.id === 'kos-001';
    const mainImg = kos.images && kos.images.length > 0 ? kos.images[0] : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80';
    const facilitiesPreview = (kos.facilities || []).slice(0, 5);

    return `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
        <div class="flex flex-col lg:flex-row gap-6 items-start">
          
          <!-- Image Thumbnail -->
          <div class="relative w-full lg:w-64 h-44 sm:h-48 rounded-2xl overflow-hidden shrink-0 group">
            <img src="${mainImg}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${kos.name}">
            <div class="absolute top-3 left-3 flex gap-1.5">
              <span class="px-2.5 py-1 rounded-full bg-blue-600/90 text-white font-bold text-[10px] backdrop-blur-md">
                ${kos.type}
              </span>
              ${kos.isVerified ? `
                <span class="px-2.5 py-1 rounded-full bg-emerald-600/90 text-white font-bold text-[10px] backdrop-blur-md flex items-center gap-1">
                  <i class="fa-solid fa-circle-check"></i> Terverifikasi
                </span>
              ` : ''}
            </div>
            <div class="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
              <i class="fa-solid fa-camera mr-1"></i> ${kos.images ? kos.images.length : 1} Foto
            </div>
          </div>

          <!-- Content Details -->
          <div class="flex-1 w-full flex flex-col justify-between min-h-[180px]">
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-[11px]">
                    ${kos.category}
                  </span>
                  ${isPrimaryDefault ? `
                    <span class="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-black text-[10px] uppercase">
                      Properti Utama
                    </span>
                  ` : ''}
                </div>
                <div class="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                  <i class="fa-solid fa-star"></i>
                  <span>${kos.rating || '5.0'}</span>
                  <span class="text-slate-400 font-normal">(${kos.reviewsCount || 1} ulasan)</span>
                </div>
              </div>

              <h3 class="text-lg font-black text-slate-900 dark:text-white leading-tight">
                ${kos.name}
              </h3>

              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <i class="fa-solid fa-location-dot text-blue-500"></i>
                <span>${kos.address || `${kos.district}, ${kos.city}`}</span>
              </p>

              ${kos.nearCampus ? `
                <p class="text-[11px] text-slate-400 mt-0.5">
                  <i class="fa-solid fa-graduation-cap text-indigo-500 mr-1"></i> ${kos.nearCampus}
                </p>
              ` : ''}

              <div class="flex flex-wrap items-center gap-1.5 mt-2">
                <span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold">
                  <i class="fa-solid fa-vector-square mr-1 text-blue-500"></i>${kos.roomSize || '3.5 x 4.5 m'}
                </span>
                <span class="px-2 py-0.5 rounded-md ${kos.electricityIncluded ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'} text-[11px] font-semibold">
                  ⚡ ${kos.electricityIncluded ? 'Listrik Termasuk' : 'Token Mandiri'}
                </span>
                <span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold">
                  <i class="fa-solid fa-shield-halved mr-1 text-blue-500"></i>Deposit: ${formatRupiah(kos.deposit !== undefined ? kos.deposit : 500000)}
                </span>
                ${kos.promoText ? `
                  <span class="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-[11px] font-bold">
                    <i class="fa-solid fa-tag mr-1"></i>${kos.promoText}
                  </span>
                ` : ''}
              </div>

              <!-- Facilities Badges -->
              <div class="flex flex-wrap gap-1.5 mt-2.5">
                ${facilitiesPreview.map(f => `
                  <span class="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-700/60 border border-slate-200/60 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-medium flex items-center gap-1.5">
                    <i class="fa-solid ${FACILITY_ICONS[f] || 'fa-check'} text-blue-500 text-[10px]"></i>
                    ${f}
                  </span>
                `).join('')}
                ${(kos.facilities || []).length > 5 ? `
                  <span class="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-400 text-[10px] font-bold">
                    +${kos.facilities.length - 5} lainnya
                  </span>
                ` : ''}
              </div>
            </div>

            <!-- Price & Action Buttons Bar -->
            <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div class="flex items-baseline gap-1">
                  <span class="text-xl font-black text-blue-600 dark:text-blue-400">${formatRupiah(kos.priceMonthly)}</span>
                  <span class="text-xs text-slate-400 font-medium">/ bulan</span>
                </div>
                <div class="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                  <span>Harian: <b>${formatRupiah(kos.priceDaily || Math.round(kos.priceMonthly/20))}</b></span>
                  <span>•</span>
                  <span>Sisa <b class="text-emerald-600 dark:text-emerald-400 font-bold">${kos.availableRooms || 0} / ${kos.totalRooms || 10} Kamar</b></span>
                </div>
              </div>

              <div class="flex items-center gap-2 flex-wrap">
                <!-- Preview Live as Seeker Modal -->
                <button onclick="openKosDetail('${kos.id}')" class="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5">
                  <i class="fa-solid fa-eye text-blue-500"></i> Preview Detail
                </button>

                <!-- Edit Public Listing -->
                <button onclick="openEditPublicKosModal('${kos.id}')" class="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-600 dark:text-blue-300 text-xs font-bold transition-all flex items-center gap-1.5 border border-blue-200 dark:border-blue-800">
                  <i class="fa-solid fa-pen-to-square"></i> Edit Iklan
                </button>

                <!-- Delete Custom Listing (if not kos-001) -->
                ${!isPrimaryDefault ? `
                  <button onclick="deletePublicKos('${kos.id}', '${kos.name}')" class="p-2 rounded-xl bg-red-50 dark:bg-red-900/30 hover:bg-red-100 text-red-600 text-xs font-bold transition-all" title="Hapus Iklan Publik">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                ` : ''}
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }).join('');
}

// ==================== MULTI-PHOTO GALLERY HANDLERS (MINIMAL 6 FOTO BERKATEGORI) ====================
let currentUploadedImages = []; // Array of objects { url: string, category: string }

const PHOTO_CATEGORIES = [
  { id: "Tampak Depan", label: "🏢 Tampak Depan / Gedung" },
  { id: "Kamar Tidur", label: "🛏️ Kamar Tidur" },
  { id: "Kamar Mandi", label: "🚿 Kamar Mandi" },
  { id: "Dapur", label: "🍳 Dapur / Pantry" },
  { id: "Area Parkir", label: "🛵 Area Parkir" },
  { id: "Fasilitas Bersama", label: "✨ Fasilitas Bersama" },
  { id: "Lainnya", label: "📷 Lainnya" }
];

function normalizePhotoItem(item, idx = 0) {
  if (typeof item === 'string') {
    const defaultCat = idx < PHOTO_CATEGORIES.length ? PHOTO_CATEGORIES[idx].id : 'Kamar Tidur';
    return { url: item, category: defaultCat };
  }
  if (item && item.url) {
    return { url: item.url, category: item.category || 'Kamar Tidur' };
  }
  return { url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80', category: 'Kamar Tidur' };
}

function handleMultipleKosPhotoUpload(event) {
  const files = Array.from(event.target.files || []);
  if (files.length === 0) return;

  let loadedCount = 0;
  const validFiles = files.filter(f => f.type.startsWith('image/'));

  if (validFiles.length === 0) {
    showToast('Harap pilih file gambar yang valid (JPG, PNG, WEBP).');
    return;
  }

  validFiles.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      showToast(`File ${file.name} melebihi batas 5MB (dilewati).`);
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      // Tentukan default kategori sesuai urutan agar otomatis terdistribusi
      const catIdx = currentUploadedImages.length % PHOTO_CATEGORIES.length;
      const assignedCat = PHOTO_CATEGORIES[catIdx].id;

      currentUploadedImages.push({
        url: e.target.result,
        category: assignedCat
      });

      loadedCount++;
      if (loadedCount === validFiles.length) {
        renderPhotoGalleryGrid();
        showToast(`Berhasil menambahkan ${loadedCount} foto! 📸`);
      }
    };
    reader.readAsDataURL(file);
  });

  // Reset input
  event.target.value = '';
}

function updatePhotoCategory(index, newCategory) {
  if (currentUploadedImages[index]) {
    currentUploadedImages[index].category = newCategory;
    renderPhotoGalleryGrid();
    showToast(`Kategori foto #${index + 1} diubah ke "${newCategory}".`);
  }
}

function renderPhotoGalleryGrid() {
  const grid = document.getElementById('pubKosGalleryGrid');
  const countText = document.getElementById('pubPhotoCountText');
  const countBadge = document.getElementById('pubPhotoCounterBadge');
  if (!grid) return;

  const total = currentUploadedImages.length;
  const minRequired = 6;

  if (countText && countBadge) {
    if (total >= minRequired) {
      countText.textContent = `${total} / 6 Foto (Memenuhi Syarat)`;
      countBadge.className = "self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5";
      countBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${total} / 6 Foto (Lengkap ✅)</span>`;
    } else {
      const sisa = minRequired - total;
      countBadge.className = "self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1.5";
      countBadge.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <span>${total} / 6 Foto (Kurang ${sisa} foto lagi)</span>`;
    }
  }

  if (total === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-6 text-center text-xs text-slate-400 bg-white dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
        <i class="fa-solid fa-images text-2xl mb-1 text-slate-300 dark:text-slate-600"></i>
        <p>Belum ada foto yang diunggah. Unggah minimal 6 foto properti kos.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = currentUploadedImages.map((item, idx) => {
    const photoObj = normalizePhotoItem(item, idx);
    // Sync back
    currentUploadedImages[idx] = photoObj;

    return `
      <div class="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between gap-2 group">
        <div class="relative rounded-xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
          <img src="${photoObj.url}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Foto ${idx + 1}">
          
          <div class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md ${idx === 0 ? 'bg-blue-600 text-white font-black' : 'bg-slate-900/80 text-white font-bold'} text-[10px] backdrop-blur-md flex items-center gap-1">
            ${idx === 0 ? '⭐ Foto Utama' : `#${idx + 1}`}
          </div>

          <button type="button" onclick="removeGalleryPhoto(${idx})" class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-[10px] shadow transition-all" title="Hapus foto ini">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>

        <div class="space-y-1.5">
          <label class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Kategori Foto:
          </label>
          <select onchange="updatePhotoCategory(${idx}, this.value)" class="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-blue-500">
            ${PHOTO_CATEGORIES.map(c => `
              <option value="${c.id}" ${photoObj.category === c.id ? 'selected' : ''}>${c.label}</option>
            `).join('')}
          </select>
        </div>

        ${idx !== 0 ? `
          <button type="button" onclick="setAsPrimaryPhoto(${idx})" class="w-full py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-600 dark:text-slate-300 hover:text-blue-600 text-[10px] font-bold transition-all text-center border border-slate-200/60 dark:border-slate-700">
            ⭐ Jadikan Sampul Utama
          </button>
        ` : `
          <div class="w-full py-1 text-center text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            ✅ Sampul Utama
          </div>
        `}
      </div>
    `;
  }).join('');
}

function removeGalleryPhoto(index) {
  currentUploadedImages.splice(index, 1);
  renderPhotoGalleryGrid();
  showToast('Foto dihapus dari daftar.');
}

function setAsPrimaryPhoto(index) {
  if (index < 0 || index >= currentUploadedImages.length) return;
  const target = currentUploadedImages.splice(index, 1)[0];
  currentUploadedImages.unshift(target);
  renderPhotoGalleryGrid();
  showToast('Foto berhasil disetel sebagai Foto Sampul Utama! ⭐');
}

function addPhotoByUrl() {
  const input = document.getElementById('pubKosUrlInputSingle');
  const catSelect = document.getElementById('pubKosUrlCategorySingle');
  if (!input) return;
  const url = input.value.trim();
  const category = catSelect ? catSelect.value : 'Kamar Tidur';

  if (!url || (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('data:image'))) {
    showToast('Harap masukkan format tautan URL gambar yang valid.');
    return;
  }

  currentUploadedImages.push({
    url: url,
    category: category
  });

  input.value = '';
  renderPhotoGalleryGrid();
  showToast(`Foto kategori "${category}" berhasil ditambahkan! 📸`);
}

function openAddPublicKosModal() {
  const form = document.getElementById('publicKosForm');
  if (form) form.reset();

  document.getElementById('publicKosModalTitle').textContent = 'Pasang Iklan Properti ke Publik';
  document.getElementById('pubKosId').value = '';
  
  // Set default placeholder 6 sample images with diverse categories
  currentUploadedImages = [
    { url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", category: "Tampak Depan" },
    { url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80", category: "Kamar Tidur" },
    { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80", category: "Kamar Mandi" },
    { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", category: "Dapur" },
    { url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80", category: "Area Parkir" },
    { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", category: "Fasilitas Bersama" }
  ];
  renderPhotoGalleryGrid();

  const prop = JuraganState.property;
  document.getElementById('pubKosOwner').value = prop.owner || 'Pemilik Kos';
  document.getElementById('pubKosPhone').value = prop.phone || '081234567890';
  document.getElementById('pubKosName').value = prop.name || '';
  document.getElementById('pubKosAddress').value = prop.address || '';
  
  // Reset new integrated fields
  const elPriceDaily = document.getElementById('pubKosPriceDaily');
  if (elPriceDaily) elPriceDaily.value = '';
  const elPriceYearly = document.getElementById('pubKosPriceYearly');
  if (elPriceYearly) elPriceYearly.value = '';
  const elDeposit = document.getElementById('pubKosDeposit');
  if (elDeposit) elDeposit.value = '500000';
  const elTotalRooms = document.getElementById('pubKosTotalRooms');
  if (elTotalRooms) elTotalRooms.value = '10';
  const elElec = document.getElementById('pubKosElectricity');
  if (elElec) elElec.checked = false;
  const elPromo = document.getElementById('pubKosPromoText');
  if (elPromo) elPromo.value = '';
  const elRules = document.getElementById('pubKosRules');
  if (elRules) elRules.value = "Tamu lawan jenis dilarang masuk kamar\nDilarang merokok di kamar ber-AC\nMenjaga kebersihan & ketertiban bersama";

  openModal('publicKosModal');
}

function openEditPublicKosModal(kosId) {
  const kos = AppState.allKos.find(k => k.id === kosId);
  if (!kos) return;

  document.getElementById('publicKosModalTitle').textContent = `Edit Iklan: ${kos.name}`;
  document.getElementById('pubKosId').value = kos.id;
  document.getElementById('pubKosName').value = kos.name || '';
  document.getElementById('pubKosCity').value = kos.city || 'Jakarta Selatan';
  document.getElementById('pubKosDistrict').value = kos.district || '';
  document.getElementById('pubKosType').value = kos.type || 'Campur';
  document.getElementById('pubKosAddress').value = kos.address || '';
  document.getElementById('pubKosNearCampus').value = kos.nearCampus || '';
  document.getElementById('pubKosCategory').value = kos.category || 'Eksklusif';
  document.getElementById('pubKosPrice').value = kos.priceMonthly || '';
  document.getElementById('pubKosSize').value = kos.roomSize || '3.5 x 4.5 m';
  document.getElementById('pubKosAvailable').value = kos.availableRooms || 1;
  document.getElementById('pubKosOwner').value = kos.ownerName || '';
  document.getElementById('pubKosPhone').value = kos.ownerPhone || '';
  document.getElementById('pubKosDesc').value = kos.description || '';

  // New integrated fields
  const elPriceDaily = document.getElementById('pubKosPriceDaily');
  if (elPriceDaily) elPriceDaily.value = kos.priceDaily || Math.round(kos.priceMonthly / 20) || '';
  const elPriceYearly = document.getElementById('pubKosPriceYearly');
  if (elPriceYearly) elPriceYearly.value = kos.priceYearly || (kos.priceMonthly * 11) || '';
  const elDeposit = document.getElementById('pubKosDeposit');
  if (elDeposit) elDeposit.value = kos.deposit !== undefined ? kos.deposit : 500000;
  const elTotalRooms = document.getElementById('pubKosTotalRooms');
  if (elTotalRooms) elTotalRooms.value = kos.totalRooms || (kos.availableRooms ? kos.availableRooms + 4 : 10);
  const elElec = document.getElementById('pubKosElectricity');
  if (elElec) elElec.checked = !!kos.electricityIncluded;
  const elPromo = document.getElementById('pubKosPromoText');
  if (elPromo) elPromo.value = kos.promoText || '';
  const elRules = document.getElementById('pubKosRules');
  if (elRules) elRules.value = Array.isArray(kos.rules) ? kos.rules.join('\n') : (kos.rules || '');

  // Load existing images array
  if (kos.images && Array.isArray(kos.images) && kos.images.length > 0) {
    currentUploadedImages = kos.images.map((img, i) => normalizePhotoItem(img, i));
  } else {
    currentUploadedImages = [
      { url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", category: "Tampak Depan" },
      { url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80", category: "Kamar Tidur" },
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80", category: "Kamar Mandi" },
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", category: "Dapur" },
      { url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80", category: "Area Parkir" },
      { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", category: "Fasilitas Bersama" }
    ];
  }
  renderPhotoGalleryGrid();

  const existingFacs = kos.facilities || [];
  document.querySelectorAll('input[name="pubFacility"]').forEach(cb => {
    cb.checked = existingFacs.includes(cb.value);
  });

  openModal('publicKosModal');
}

function handleSavePublicKosSubmit(e) {
  e.preventDefault();

  // VALIDASI MINIMAL 6 FOTO
  if (currentUploadedImages.length < 6) {
    const kurang = 6 - currentUploadedImages.length;
    alert(`⚠️ Foto yang diunggah belum memenuhi syarat!\n\nAnda baru mengunggah ${currentUploadedImages.length} foto. Wajib mengunggah minimal 6 foto dengan kategorinya masing-masing (kurang ${kurang} foto lagi) agar calon penyewa mendapatkan gambaran lengkap properti kos Anda.`);
    showToast(`⚠️ Wajib minimal 6 foto! Kurang ${kurang} foto lagi.`);
    return;
  }

  const kosId = document.getElementById('pubKosId').value;
  const name = document.getElementById('pubKosName').value;
  const city = document.getElementById('pubKosCity').value;
  const district = document.getElementById('pubKosDistrict').value || city;
  const type = document.getElementById('pubKosType').value;
  const address = document.getElementById('pubKosAddress').value;
  const nearCampus = document.getElementById('pubKosNearCampus').value;
  const category = document.getElementById('pubKosCategory').value;
  const priceMonthly = parseFloat(document.getElementById('pubKosPrice').value) || 1500000;
  const priceDaily = parseFloat(document.getElementById('pubKosPriceDaily')?.value) || Math.round(priceMonthly / 20);
  const priceYearly = parseFloat(document.getElementById('pubKosPriceYearly')?.value) || Math.round(priceMonthly * 11);
  const deposit = parseFloat(document.getElementById('pubKosDeposit')?.value) || 500000;
  const roomSize = document.getElementById('pubKosSize').value || '3.5 x 4.5 m';
  const availableRooms = parseInt(document.getElementById('pubKosAvailable').value) || 1;
  const totalRooms = parseInt(document.getElementById('pubKosTotalRooms')?.value) || (availableRooms + 4);
  const electricityIncluded = document.getElementById('pubKosElectricity')?.checked || false;
  const promoText = document.getElementById('pubKosPromoText')?.value.trim() || '';
  const isPromo = promoText.length > 0;
  const ownerName = document.getElementById('pubKosOwner').value;
  const ownerPhone = document.getElementById('pubKosPhone').value;
  const description = document.getElementById('pubKosDesc').value || 'Kos nyaman dan bersih, fasilitas lengkap siap huni.';

  // Parse rules
  const rawRules = document.getElementById('pubKosRules')?.value || '';
  const rules = rawRules.split('\n').map(r => r.trim()).filter(r => r.length > 0);

  const facilityCbs = document.querySelectorAll('input[name="pubFacility"]:checked');
  const facilities = Array.from(facilityCbs).map(cb => cb.value);

  // Simpan array URL murni atau string URL untuk kompatibilitas visual penuh
  const imagesToSave = currentUploadedImages.map(item => item.url || item);

  if (kosId) {
    // Edit existing
    const idx = AppState.allKos.findIndex(k => k.id === kosId);
    if (idx !== -1) {
      const existing = AppState.allKos[idx];
      existing.name = name;
      existing.city = city;
      existing.district = district;
      existing.type = type;
      existing.address = address;
      existing.nearCampus = nearCampus;
      existing.category = category;
      existing.priceMonthly = priceMonthly;
      existing.priceDaily = priceDaily;
      existing.priceYearly = priceYearly;
      existing.deposit = deposit;
      existing.roomSize = roomSize;
      existing.availableRooms = availableRooms;
      existing.totalRooms = totalRooms;
      existing.electricityIncluded = electricityIncluded;
      existing.isPromo = isPromo;
      existing.promoText = promoText;
      existing.ownerName = ownerName;
      existing.ownerPhone = ownerPhone;
      existing.description = description;
      existing.images = imagesToSave;
      if (facilities.length > 0) {
        existing.facilities = facilities;
      }
      if (rules.length > 0) {
        existing.rules = rules;
      }
    }
  } else {
    // Create new custom listing
    const newKos = {
      id: `custom-kos-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type,
      category,
      city,
      district,
      address,
      nearCampus: nearCampus || `Dekat pusat kota ${city}`,
      lat: -6.2088 + (Math.random() - 0.5) * 0.05,
      lng: 106.8456 + (Math.random() - 0.5) * 0.05,
      priceMonthly,
      priceDaily,
      priceYearly,
      deposit,
      electricityIncluded,
      roomSize,
      availableRooms,
      totalRooms,
      rating: 5.0,
      reviewsCount: 1,
      ownerName,
      ownerPhone,
      isVerified: true,
      isPromo,
      promoText: promoText || (isPromo ? promoText : "Listing Baru"),
      images: imagesToSave,
      facilities: facilities.length > 0 ? facilities : ["WiFi Cepat", "Kamar Mandi Dalam", "Kasur Springbed"],
      rules: rules.length > 0 ? rules : ["Menjaga ketertiban kos", "Dilarang membawa rokok di kamar AC"],
      description,
      nearbyPlaces: [{ name: nearCampus || city, distance: "500 m" }],
      reviews: [{ user: "Admin CariKos", rating: 5, date: "Baru saja", comment: "Listing baru terverifikasi!" }]
    };
    AppState.allKos.unshift(newKos);
  }

  // Persist custom listings
  const customListings = AppState.allKos.filter(k => k.id.startsWith('custom-kos-'));
  localStorage.setItem('carikos_custom_listings', JSON.stringify(customListings));

  closeModal('publicKosModal');
  applyFilters();
  renderOwnerPublicProperties();
  showToast(`Iklan properti ${name} berhasil disimpan dan tayang di publik! 🚀`);
}

function deletePublicKos(kosId, kosName) {
  if (!confirm(`Hapus listing iklan "${kosName}" dari publik?`)) return;

  AppState.allKos = AppState.allKos.filter(k => k.id !== kosId);
  const customListings = AppState.allKos.filter(k => k.id.startsWith('custom-kos-'));
  localStorage.setItem('carikos_custom_listings', JSON.stringify(customListings));

  applyFilters();
  renderOwnerPublicProperties();
  showToast(`Listing ${kosName} telah dihapus dari publik.`);
}

// Modal Helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('overflow-hidden');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  }
}

function showToast(message) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md text-sm font-semibold transition-all duration-300 transform translate-y-20 opacity-0 flex items-center gap-2.5';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-bell text-blue-400 dark:text-blue-600"></i> ${message}`;
  toast.classList.remove('translate-y-20', 'opacity-0');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}

// Global Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.activeFilters.keyword = e.target.value;
      applyFilters();
    });
  }

  const citySelect = document.getElementById('cityFilter');
  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      AppState.activeFilters.city = e.target.value;
      applyFilters();
    });
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.activeFilters.sortBy = e.target.value;
      applyFilters();
    });
  }

  const priceSlider = document.getElementById('priceRangeSlider');
  const priceVal = document.getElementById('priceSliderValue');
  if (priceSlider && priceVal) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      AppState.activeFilters.maxPrice = val;
      priceVal.textContent = formatRupiah(val);
      applyFilters();
    });
  }

  const viewGridBtn = document.getElementById('viewGridBtn');
  const viewSplitBtn = document.getElementById('viewSplitBtn');
  const mapContainer = document.getElementById('mapColumn');

  if (viewGridBtn && viewSplitBtn) {
    viewGridBtn.addEventListener('click', () => {
      AppState.viewMode = 'grid';
      viewGridBtn.classList.add('bg-blue-600', 'text-white');
      viewGridBtn.classList.remove('text-slate-600', 'dark:text-slate-300');
      viewSplitBtn.classList.remove('bg-blue-600', 'text-white');
      viewSplitBtn.classList.add('text-slate-600', 'dark:text-slate-300');
      if (mapContainer) mapContainer.classList.add('hidden');
      renderKosCards();
    });

    viewSplitBtn.addEventListener('click', () => {
      AppState.viewMode = 'split';
      viewSplitBtn.classList.add('bg-blue-600', 'text-white');
      viewSplitBtn.classList.remove('text-slate-600', 'dark:text-slate-300');
      viewGridBtn.classList.remove('bg-blue-600', 'text-white');
      viewGridBtn.classList.add('text-slate-600', 'dark:text-slate-300');
      if (mapContainer) {
        mapContainer.classList.remove('hidden');
        setTimeout(() => AppState.map?.invalidateSize(), 200);
      }
      renderKosCards();
    });
  }
}
