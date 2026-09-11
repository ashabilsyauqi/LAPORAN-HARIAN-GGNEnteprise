// bengkel_app.js - Logika Interaktif Pencari WhatsApp Bengkel Aktif Terdekat

// State Aplikasi
let state = {
  userLocation: {
    lat: -6.2088, // Default Monas Jakarta
    lng: 106.8456,
    address: "Jakarta Pusat (Titik Default)",
    isGPS: false
  },
  allBengkel: [],
  filteredBengkel: [],
  activeCategory: "all",
  filter24JamOnly: false,
  filterPanggilanOnly: false,
  filterResmiOnly: false,
  searchQuery: "",
  radiusKm: 15,
  sortBy: "jarak",
  liveDataLoaded: false,
  isLoadingLive: false
};

// Map & Marker references
let map = null;
let userMarker = null;
let userAccuracyCircle = null;
let bengkelLayerGroup = null;

// ==========================================
// INISIALISASI SAAT HALAMAN DIMUAT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initData();
  initMap();
  setupEventListeners();
  renderCategories();
  
  // Otomatis minta GPS pengguna
  setTimeout(() => {
    detectLocation(false);
  }, 500);
});

// Load data awal dari bengkel_data.js + LocalStorage
function initData() {
  const localCustomData = JSON.parse(localStorage.getItem("custom_bengkel_data") || "[]");
  state.allBengkel = [...DEFAULT_BENGKEL_DATA, ...localCustomData];
  recalculateDistances();
  applyFilters();
}

// ==========================================
// LEAFLET MAP INITIALIZATION
// ==========================================
function initMap() {
  map = L.map("map", {
    zoomControl: true,
    attributionControl: false
  }).setView([state.userLocation.lat, state.userLocation.lng], 13);

  // OpenStreetMap Tile Layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
  }).addTo(map);

  bengkelLayerGroup = L.layerGroup().addTo(map);

  // Map Click Listener untuk mode pilih koordinat saat tambah bengkel
  map.on("click", (e) => {
    const latInput = document.getElementById("addBengkelLat");
    const lngInput = document.getElementById("addBengkelLng");
    if (latInput && lngInput) {
      latInput.value = e.latlng.lat.toFixed(6);
      lngInput.value = e.latlng.lng.toFixed(6);
    }
  });

  updateUserMarker();
}

// Update Marker Posisi Pengguna di Peta
function updateUserMarker() {
  if (!map) return;

  if (userMarker) map.removeLayer(userMarker);
  if (userAccuracyCircle) map.removeLayer(userAccuracyCircle);

  // Custom User Icon
  const userIcon = L.divIcon({
    className: "custom-user-marker",
    html: `
      <div class="relative flex items-center justify-center">
        <div class="w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow-xl flex items-center justify-center text-white text-xs">
          <i class="fa-solid fa-person-pin"></i>
        </div>
        <div class="absolute -top-1 -left-1 w-10 h-10 bg-blue-500/40 rounded-full animate-ping pointer-events-none"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  userMarker = L.marker([state.userLocation.lat, state.userLocation.lng], { icon: userIcon })
    .addTo(map)
    .bindPopup(`
      <div class="text-slate-900 dark:text-white p-1">
        <strong class="text-blue-500 font-bold block mb-1">📍 Lokasi Anda</strong>
        <p class="text-xs text-slate-300 leading-tight">${state.userLocation.address}</p>
        <span class="text-[10px] text-slate-400 mt-1 block">(${state.userLocation.lat.toFixed(4)}, ${state.userLocation.lng.toFixed(4)})</span>
      </div>
    `);

  // Lingkaran Radius Pencarian
  userAccuracyCircle = L.circle([state.userLocation.lat, state.userLocation.lng], {
    radius: state.radiusKm * 1000,
    color: "#3b82f6",
    fillColor: "#3b82f6",
    fillOpacity: 0.08,
    weight: 1.5,
    dashArray: "4, 6"
  }).addTo(map);
}

// Update Semua Marker Bengkel di Peta
function updateBengkelMarkers() {
  if (!map || !bengkelLayerGroup) return;
  bengkelLayerGroup.clearLayers();

  const bounds = L.latLngBounds([[state.userLocation.lat, state.userLocation.lng]]);

  state.filteredBengkel.forEach((item) => {
    if (!item.lat || !item.lng) return;

    let iconBg = "bg-blue-600";
    let iconFa = "fa-car";
    if (item.kategori === "motor") { iconBg = "bg-emerald-600"; iconFa = "fa-motorcycle"; }
    else if (item.kategori === "derek") { iconBg = "bg-amber-600"; iconFa = "fa-truck-pickup"; }
    else if (item.kategori === "aki") { iconBg = "bg-purple-600"; iconFa = "fa-car-battery"; }

    const is24Badge = item.is24Jam ? `<span class="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase ml-1">24 JAM</span>` : "";

    const markerIcon = L.divIcon({
      className: "custom-bengkel-pin",
      html: `
        <div class="relative group cursor-pointer">
          <div class="w-9 h-9 rounded-2xl ${iconBg} border-2 border-white shadow-lg text-white flex items-center justify-center transform transition group-hover:scale-110">
            <i class="fa-solid ${iconFa} text-sm"></i>
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const marker = L.marker([item.lat, item.lng], { icon: markerIcon });
    
    // Popup HTML
    const popupContent = `
      <div class="p-2 text-slate-100 min-w-[220px]">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-black text-blue-400 uppercase tracking-wider">${item.kategori}</span>
          ${is24Badge}
        </div>
        <h4 class="font-bold text-sm text-white mb-1 leading-snug">${item.nama}</h4>
        <p class="text-xs text-slate-300 mb-2 flex items-center gap-1">
          <i class="fa-solid fa-location-dot text-red-400"></i> ${item.jarak ? item.jarak.toFixed(1) + ' km dari Anda' : item.alamat}
        </p>
        <div class="flex items-center gap-2 pt-2 border-t border-slate-700">
          <button onclick="directChatWA('${item.id}')" class="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow transition">
            <i class="fa-brands fa-whatsapp text-sm"></i> Chat WA
          </button>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}" target="_blank" class="bg-slate-700 hover:bg-slate-600 text-slate-200 p-1.5 rounded-lg text-xs transition" title="Buka Rute Google Maps">
            <i class="fa-solid fa-diamond-turn-right"></i>
          </a>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent);
    bengkelLayerGroup.addLayer(marker);
    bounds.extend([item.lat, item.lng]);
  });

  // Sesuaikan zoom jika ada bengkel yang ditemukan
  if (state.filteredBengkel.length > 0) {
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }
}

// ==========================================
// DETEKSI GEOLOCATION GPS & GEOCODING
// ==========================================
function detectLocation(showAlert = true) {
  const btn = document.getElementById("btnDetectGps");
  if (btn) {
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Mendeteksi GPS...`;
    btn.classList.add("opacity-75");
  }

  if (!navigator.geolocation) {
    if (showAlert) alert("Browser Anda tidak mendukung deteksi lokasi otomatis Geolocation.");
    resetGpsBtn();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      state.userLocation.lat = position.coords.latitude;
      state.userLocation.lng = position.coords.longitude;
      state.userLocation.isGPS = true;

      // Reverse geocoding via Nominatim OpenStreetMap
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${state.userLocation.lat}&lon=${state.userLocation.lng}&zoom=16&addressdetails=1`);
        const geo = await res.json();
        const suburb = geo.address.suburb || geo.address.village || geo.address.neighbourhood || geo.address.city_district || "";
        const city = geo.address.city || geo.address.county || geo.address.state || "Lokasi Anda";
        state.userLocation.address = suburb ? `${suburb}, ${city}` : (geo.display_name ? geo.display_name.split(",").slice(0, 3).join(",") : city);
      } catch (err) {
        state.userLocation.address = `GPS (${state.userLocation.lat.toFixed(4)}, ${state.userLocation.lng.toFixed(4)})`;
      }

      updateLocationUI();
      recalculateDistances();
      applyFilters();
      updateUserMarker();
      resetGpsBtn();

      // Trigger automatic live scan Overpass API in the background
      fetchLiveOverpassBengkel();
    },
    (error) => {
      console.warn("GPS Error:", error.message);
      if (showAlert) {
        alert("Gagal mengakses GPS. Pastikan izin lokasi diizinkan pada browser Anda. Anda juga dapat mengetikkan nama kota/wilayah pada kotak pencarian lokasi.");
      }
      resetGpsBtn();
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
}

function resetGpsBtn() {
  const btn = document.getElementById("btnDetectGps");
  if (btn) {
    btn.innerHTML = `<i class="fa-solid fa-crosshairs text-blue-400"></i> Ambil GPS Saya`;
    btn.classList.remove("opacity-75");
  }
}

// Pencarian Lokasi Manual (Kota / Kecamatan)
async function searchManualLocation() {
  const input = document.getElementById("manualLocationInput");
  const query = input ? input.value.trim() : "";
  if (!query) return;

  const btn = document.getElementById("btnSearchLocation");
  if (btn) btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=id&limit=1`);
    const results = await res.json();

    if (results && results.length > 0) {
      const best = results[0];
      state.userLocation.lat = parseFloat(best.lat);
      state.userLocation.lng = parseFloat(best.lon);
      state.userLocation.address = best.display_name.split(",").slice(0, 3).join(",");
      state.userLocation.isGPS = false;

      updateLocationUI();
      recalculateDistances();
      applyFilters();
      updateUserMarker();
      map.setView([state.userLocation.lat, state.userLocation.lng], 13);
      
      // Auto-query live OSM around new location
      fetchLiveOverpassBengkel();
    } else {
      alert(`Lokasi "${query}" tidak ditemukan. Coba ketik nama kota atau kecamatan yang lebih spesifik.`);
    }
  } catch (err) {
    alert("Terjadi gangguan koneksi saat mencari lokasi.");
  } finally {
    if (btn) btn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
  }
}

function updateLocationUI() {
  const textEl = document.getElementById("currentLocationText");
  const coordsEl = document.getElementById("currentCoordsText");
  if (textEl) textEl.innerText = state.userLocation.address;
  if (coordsEl) coordsEl.innerText = `${state.userLocation.lat.toFixed(5)}, ${state.userLocation.lng.toFixed(5)}`;
}

// ==========================================
// OVERPASS API - REAL-TIME LIVE SEARCH OSM
// ==========================================
async function fetchLiveOverpassBengkel() {
  if (state.isLoadingLive) return;
  state.isLoadingLive = true;

  const statusEl = document.getElementById("liveScanStatus");
  if (statusEl) {
    statusEl.classList.remove("hidden");
    statusEl.innerHTML = `<span class="flex items-center gap-2 text-xs text-blue-400"><i class="fa-solid fa-radar fa-spin"></i> Memindai data bengkel live OpenStreetMap di radius ${state.radiusKm} km...</span>`;
  }

  const radiusMeters = Math.min(state.radiusKm * 1000, 15000); // max 15km for Overpass speed
  const lat = state.userLocation.lat;
  const lng = state.userLocation.lng;

  // Overpass Query for car & motorcycle repair shops
  const overpassQuery = `
    [out:json][timeout:15];
    (
      node["shop"="car_repair"](around:${radiusMeters},${lat},${lng});
      node["shop"="motorcycle_repair"](around:${radiusMeters},${lat},${lng});
      node["shop"="tyres"](around:${radiusMeters},${lat},${lng});
      node["amenity"="vehicle_inspection"](around:${radiusMeters},${lat},${lng});
      way["shop"="car_repair"](around:${radiusMeters},${lat},${lng});
      way["shop"="motorcycle_repair"](around:${radiusMeters},${lat},${lng});
    );
    out center 40;
  `;

  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery
    });
    const data = await res.json();

    if (data && data.elements && data.elements.length > 0) {
      const liveBengkel = [];

      data.elements.forEach((el, index) => {
        const tags = el.tags || {};
        const bklLat = el.lat || (el.center && el.center.lat);
        const bklLng = el.lon || (el.center && el.center.lon);
        if (!bklLat || !bklLng) return;

        const shopType = tags.shop || "car_repair";
        const isMotor = shopType === "motorcycle_repair" || (tags.name && tags.name.toLowerCase().includes("motor"));
        const isTyre = shopType === "tyres" || (tags.name && tags.name.toLowerCase().includes("ban"));
        
        let kategori = "mobil";
        if (isMotor || isTyre) kategori = "motor";

        // Raw phone parsing
        let phoneRaw = tags.phone || tags["contact:phone"] || tags["contact:mobile"] || tags["contact:whatsapp"] || "";
        let cleanPhone = cleanWhatsAppNumber(phoneRaw);

        // Name formatting
        let nama = tags.name || (tags.brand ? `${tags.brand} Workshop` : (isMotor ? "Bengkel Motor Terdekat" : "Bengkel Mobil Terdekat"));
        
        // Cek apakah sudah ada dalam daftar (mencegah duplikat)
        const alreadyExists = state.allBengkel.some(b => 
          (b.lat && Math.abs(b.lat - bLat(bklLat)) < 0.0005 && Math.abs(b.lng - bLat(bklLng)) < 0.0005) ||
          (b.nama && b.nama.toLowerCase() === nama.toLowerCase())
        );

        if (!alreadyExists) {
          liveBengkel.push({
            id: `osm-${el.id || index}`,
            nama: nama,
            kategori: kategori,
            jenisLayanan: [tags.service || "Servis Kendaraan", "Perbaikan & Perawatan", tags.brand || "Umum"],
            telepon: phoneRaw || "Hubungi Langsung",
            whatsapp: cleanPhone || "search_nearby",
            alamat: tags["addr:street"] ? `${tags["addr:street"]} ${tags["addr:housenumber"] || ""}` : (tags.description || `Area Sekitar (${bklLat.toFixed(3)}, ${bklLng.toFixed(3)})`),
            kota: tags["addr:city"] || "Sekitar Anda",
            lat: bklLat,
            lng: bklLng,
            jamBuka: tags.opening_hours || "08:00 - 18:00",
            is24Jam: tags.opening_hours === "24/7" || (tags.name && tags.name.toLowerCase().includes("24 jam")),
            isPanggilan: true,
            isResmi: Boolean(tags.brand),
            rating: 4.6,
            ulasanCount: Math.floor(Math.random() * 40) + 15,
            isFromOSM: true,
            foto: isMotor ? "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=600&auto=format&fit=crop&q=80",
            deskripsi: `Ditemukan live melalui pemetaan radar OpenStreetMap di sekitar titik koordinat Anda.`
          });
        }
      });

      if (liveBengkel.length > 0) {
        state.allBengkel = [...state.allBengkel, ...liveBengkel];
        recalculateDistances();
        applyFilters();
      }

      if (statusEl) {
        statusEl.innerHTML = `<span class="flex items-center gap-1.5 text-xs text-emerald-400"><i class="fa-solid fa-circle-check"></i> Berhasil menemukan ${liveBengkel.length} bengkel tambahan langsung dari satelit OSM.</span>`;
        setTimeout(() => statusEl.classList.add("hidden"), 4000);
      }
    } else {
      if (statusEl) {
        statusEl.innerHTML = `<span class="text-xs text-slate-400">Database lokal siap (${state.allBengkel.length} bengkel terverifikasi).</span>`;
        setTimeout(() => statusEl.classList.add("hidden"), 3000);
      }
    }
  } catch (err) {
    console.warn("Overpass query notice:", err);
    if (statusEl) statusEl.classList.add("hidden");
  } finally {
    state.isLoadingLive = false;
  }
}

function bLat(val) {
  return typeof val === 'number' ? val : parseFloat(val);
}

// ==========================================
// KALKULASI JARAK (HAVERSINE FORMULA)
// ==========================================
function recalculateDistances() {
  state.allBengkel.forEach((item) => {
    if (item.lat && item.lng) {
      item.jarak = calculateHaversine(state.userLocation.lat, state.userLocation.lng, item.lat, item.lng);
    } else {
      item.jarak = 9999;
    }
  });
}

function calculateHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius bumi dalam KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Format nomor WhatsApp ke format internasional (+62)
function cleanWhatsAppNumber(phone) {
  if (!phone) return "";
  let clean = phone.replace(/[^0-9]/g, "");
  if (clean.startsWith("08")) {
    clean = "628" + clean.substring(2);
  } else if (clean.startsWith("8")) {
    clean = "62" + clean;
  }
  return clean;
}

// ==========================================
// FILTER & RENDER CARD
// ==========================================
function setCategory(cat) {
  state.activeCategory = cat;
  renderCategories();
  applyFilters();
}

function renderCategories() {
  const container = document.getElementById("categoryTabsContainer");
  if (!container) return;

  container.innerHTML = Object.keys(BENGKEL_CATEGORIES).map((key) => {
    const item = BENGKEL_CATEGORIES[key];
    const isActive = state.activeCategory === key;
    const activeClass = isActive
      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 border-blue-500"
      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border-slate-700/60";

    return `
      <button onclick="setCategory('${key}')" class="px-4 py-2 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all transform ${activeClass}">
        <i class="${item.icon}"></i>
        <span>${item.label}</span>
      </button>
    `;
  }).join("");
}

function applyFilters() {
  let result = [...state.allBengkel];

  // Filter Kategori
  if (state.activeCategory !== "all") {
    result = result.filter(b => b.kategori === state.activeCategory);
  }

  // Filter Radius (Jarak Maksimal)
  result = result.filter(b => (b.jarak || 0) <= state.radiusKm);

  // Filter Toggle 24 Jam
  if (state.filter24JamOnly) {
    result = result.filter(b => b.is24Jam);
  }

  // Filter Toggle Panggilan / Home Service
  if (state.filterPanggilanOnly) {
    result = result.filter(b => b.isPanggilan);
  }

  // Filter Toggle Bengkel Resmi
  if (state.filterResmiOnly) {
    result = result.filter(b => b.isResmi);
  }

  // Search Query (Nama, Alamat, Jenis Layanan)
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(b =>
      b.nama.toLowerCase().includes(q) ||
      b.alamat.toLowerCase().includes(q) ||
      (b.kota && b.kota.toLowerCase().includes(q)) ||
      (b.jenisLayanan && b.jenisLayanan.some(l => l.toLowerCase().includes(q)))
    );
  }

  // Urutkan (Sorting)
  if (state.sortBy === "jarak") {
    result.sort((a, b) => (a.jarak || 0) - (b.jarak || 0));
  } else if (state.sortBy === "rating") {
    result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (state.sortBy === "nama") {
    result.sort((a, b) => a.nama.localeCompare(b.nama));
  }

  state.filteredBengkel = result;
  renderBengkelGrid();
  updateBengkelMarkers();
  updateStats();
}

function updateStats() {
  const totalEl = document.getElementById("totalBengkelCount");
  const activeNearEl = document.getElementById("nearestCount");
  if (totalEl) totalEl.innerText = state.filteredBengkel.length;
  if (activeNearEl) {
    const under5km = state.filteredBengkel.filter(b => (b.jarak || 0) <= 5).length;
    activeNearEl.innerText = `${under5km} bengkel < 5 km`;
  }
}

function renderBengkelGrid() {
  const container = document.getElementById("bengkelGrid");
  const emptyState = document.getElementById("emptyState");
  if (!container) return;

  if (state.filteredBengkel.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  container.innerHTML = state.filteredBengkel.map((item) => {
    const distText = item.jarak ? `${item.jarak.toFixed(1)} km` : "N/A";
    const catMeta = BENGKEL_CATEGORIES[item.kategori] || BENGKEL_CATEGORIES.all;
    
    const tagsHtml = (item.jenisLayanan || []).slice(0, 3).map(t => 
      `<span class="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">${t}</span>`
    ).join(" ");

    const badge24 = item.is24Jam
      ? `<span class="bg-red-500/20 text-red-400 border border-red-500/40 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-red-400 pulse-dot"></span> 24 JAM</span>`
      : `<span class="bg-slate-700/50 text-slate-400 text-[11px] px-2 py-0.5 rounded-full"><i class="fa-regular fa-clock"></i> ${item.jamBuka || '08:00 - 17:00'}</span>`;

    const badgePanggilan = item.isPanggilan
      ? `<span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full"><i class="fa-solid fa-truck-fast"></i> Bisa Panggilan</span>`
      : "";

    const badgeResmi = item.isResmi
      ? `<span class="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full"><i class="fa-solid fa-certificate"></i> Bengkel Resmi</span>`
      : "";

    return `
      <div class="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
        <!-- Top Info Header -->
        <div>
          <div class="flex items-start justify-between gap-3 mb-2.5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-bold ${catMeta.badgeColor} text-white px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                <i class="${catMeta.icon}"></i> ${catMeta.label}
              </span>
              ${badge24}
              ${badgePanggilan}
              ${badgeResmi}
            </div>
            <div class="text-right">
              <span class="text-xs font-black text-blue-400 bg-blue-950/80 border border-blue-800/60 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <i class="fa-solid fa-location-arrow"></i> ${distText}
              </span>
            </div>
          </div>

          <h3 class="text-base font-extrabold text-white group-hover:text-blue-400 transition-colors leading-snug mb-1">
            ${item.nama}
          </h3>

          <p class="text-xs text-slate-400 flex items-start gap-1.5 mb-3 line-clamp-2">
            <i class="fa-solid fa-map-pin text-rose-400 mt-0.5 flex-shrink-0"></i>
            <span>${item.alamat}</span>
          </p>

          <p class="text-xs text-slate-300 mb-3 line-clamp-2 italic">
            "${item.deskripsi || 'Layanan servis kendaraan cepat, mekanik berpengalaman & responsif.'}"
          </p>

          <!-- Layanan Tags -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${tagsHtml}
          </div>
        </div>

        <!-- Action Buttons Footer -->
        <div class="pt-3 border-t border-slate-700/60 flex items-center gap-2">
          <!-- WhatsApp Button -->
          <button onclick="directChatWA('${item.id}')" class="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition transform active:scale-95">
            <i class="fa-brands fa-whatsapp text-base"></i>
            <span>Chat WhatsApp</span>
          </button>

          <!-- SOS Fast Template -->
          <button onclick="openSosModalForBengkel('${item.id}')" class="bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 hover:border-rose-600 text-rose-300 hover:text-white p-2.5 rounded-xl text-xs transition" title="Kirim Pesan SOS Darurat">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </button>

          <!-- Call Button -->
          <a href="tel:${item.telepon || item.whatsapp}" class="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 p-2.5 rounded-xl text-xs transition" title="Telepon Seluler">
            <i class="fa-solid fa-phone"></i>
          </a>

          <!-- Google Maps Route -->
          <a href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}" target="_blank" class="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 p-2.5 rounded-xl text-xs transition" title="Petunjuk Arah Google Maps">
            <i class="fa-solid fa-diamond-turn-right"></i>
          </a>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================
// WHATSAPP INTEGRATION & TEMPLATES
// ==========================================
function directChatWA(bengkelId, issueText = "") {
  const bengkel = state.allBengkel.find(b => b.id === bengkelId);
  if (!bengkel) return;

  const userMapsLink = `https://www.google.com/maps?q=${state.userLocation.lat},${state.userLocation.lng}`;
  const kendala = issueText || "servis kendaraan / bantuan perbaikan";

  let waNumber = bengkel.whatsapp;
  if (!waNumber || waNumber === "search_nearby") {
    // Jika data OSM tanpa nomor telepon, tawarkan cari kontak via Google
    const searchQuery = encodeURIComponent(`nomor whatsapp telepon ${bengkel.nama} ${bengkel.alamat}`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    return;
  }

  waNumber = cleanWhatsAppNumber(waNumber);

  const message = 
`Halo *${bengkel.nama}*,
Saya mendapatkan info kontak bengkel dari aplikasi Pencari Bengkel Terdekat.

Saya butuh bantuan untuk:
🔧 *Kendala:* ${kendala}
📍 *Lokasi Saya:* ${state.userLocation.address}
🗺️ *Link Peta:* ${userMapsLink}

Apakah saat ini bengkel sedang buka dan mekanik bisa melayani / datang ke lokasi? Terima kasih.`;

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
}

// ==========================================
// EMERGENCY SOS FAST DISPATCH MODAL
// ==========================================
let targetSosBengkelId = null;

function openSosModalForBengkel(bengkelId = null) {
  targetSosBengkelId = bengkelId;
  const modal = document.getElementById("sosModal");
  if (modal) modal.classList.remove("hidden");
}

function closeSosModal() {
  const modal = document.getElementById("sosModal");
  if (modal) modal.classList.add("hidden");
  targetSosBengkelId = null;
}

function triggerSosIssue(issueType) {
  let issueText = "";
  if (issueType === "mogok") issueText = "Mobil/Motor MOGOK mendadak di jalan / mesin mati tidak bisa starter";
  else if (issueType === "ban") issueText = "BAN BOCOR / KEMPES, butuh tambal ban panggilan cepat atau ganti ban";
  else if (issueType === "aki") issueText = "AKI DROP / SOAK, butuh jumper aki darurat atau ganti aki baru di tempat";
  else if (issueType === "derek") issueText = "TOWING DEREK MOBIL DARURAT, kendaraan tidak bisa jalan dan perlu dievakuasi";

  if (targetSosBengkelId) {
    directChatWA(targetSosBengkelId, issueText);
    closeSosModal();
  } else {
    // Jika belum memilih bengkel, otomatis pilih bengkel 24 Jam terdekat yang sesuai
    let target = null;
    if (issueType === "derek") {
      target = state.filteredBengkel.find(b => b.kategori === "derek") || state.filteredBengkel[0];
    } else if (issueType === "aki") {
      target = state.filteredBengkel.find(b => b.kategori === "aki") || state.filteredBengkel[0];
    } else {
      target = state.filteredBengkel.find(b => b.is24Jam || b.isPanggilan) || state.filteredBengkel[0];
    }

    if (target) {
      directChatWA(target.id, issueText);
      closeSosModal();
    } else {
      alert("Tidak ada bengkel terdekat yang ditemukan dalam radius saat ini. Coba perbesar radius pencarian.");
    }
  }
}

// ==========================================
// FORM TAMBAH BENGKEL BARU (LOCALSTORAGE)
// ==========================================
function openAddBengkelModal() {
  const modal = document.getElementById("addBengkelModal");
  const latInput = document.getElementById("addBengkelLat");
  const lngInput = document.getElementById("addBengkelLng");
  
  if (latInput && lngInput) {
    latInput.value = state.userLocation.lat.toFixed(6);
    lngInput.value = state.userLocation.lng.toFixed(6);
  }

  if (modal) modal.classList.remove("hidden");
}

function closeAddBengkelModal() {
  const modal = document.getElementById("addBengkelModal");
  if (modal) modal.classList.add("hidden");
}

function handleAddBengkelSubmit(e) {
  e.preventDefault();

  const nama = document.getElementById("addNama").value.trim();
  const kategori = document.getElementById("addKategori").value;
  const whatsapp = document.getElementById("addWhatsapp").value.trim();
  const alamat = document.getElementById("addAlamat").value.trim();
  const jamBuka = document.getElementById("addJamBuka").value.trim() || "08:00 - 17:00";
  const is24Jam = document.getElementById("addIs24Jam").checked;
  const isPanggilan = document.getElementById("addIsPanggilan").checked;
  const isResmi = document.getElementById("addIsResmi").checked;
  const layananRaw = document.getElementById("addLayanan").value.trim();
  const lat = parseFloat(document.getElementById("addBengkelLat").value) || state.userLocation.lat;
  const lng = parseFloat(document.getElementById("addBengkelLng").value) || state.userLocation.lng;
  const deskripsi = document.getElementById("addDeskripsi").value.trim() || "Bengkel terdaftar oleh komunitas.";

  if (!nama || !whatsapp || !alamat) {
    alert("Harap isi Nama Bengkel, Nomor WhatsApp, dan Alamat dengan lengkap.");
    return;
  }

  const newBengkel = {
    id: `custom-${Date.now()}`,
    nama: nama,
    kategori: kategori,
    jenisLayanan: layananRaw ? layananRaw.split(",").map(s => s.trim()) : ["Servis Kendaraan", "Perbaikan"],
    telepon: whatsapp,
    whatsapp: cleanWhatsAppNumber(whatsapp),
    alamat: alamat,
    kota: "Lokal",
    lat: lat,
    lng: lng,
    jamBuka: is24Jam ? "Buka 24 Jam" : jamBuka,
    is24Jam: is24Jam,
    isPanggilan: isPanggilan,
    isResmi: isResmi,
    rating: 5.0,
    ulasanCount: 1,
    foto: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=600&auto=format&fit=crop&q=80",
    deskripsi: deskripsi
  };

  // Simpan ke LocalStorage
  const localCustomData = JSON.parse(localStorage.getItem("custom_bengkel_data") || "[]");
  localCustomData.unshift(newBengkel);
  localStorage.setItem("custom_bengkel_data", JSON.stringify(localCustomData));

  // Update State
  state.allBengkel.unshift(newBengkel);
  recalculateDistances();
  applyFilters();

  closeAddBengkelModal();
  document.getElementById("addBengkelForm").reset();
  alert(`Bengkel "${nama}" berhasil didaftarkan dan langsung aktif dalam pencarian!`);
}

// ==========================================
// EVENT LISTENERS & BINDINGS
// ==========================================
function setupEventListeners() {
  // Input Pencarian Nama/Layanan
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      applyFilters();
    });
  }

  // Slider Radius
  const radiusSlider = document.getElementById("radiusSlider");
  const radiusValueText = document.getElementById("radiusValueText");
  if (radiusSlider && radiusValueText) {
    radiusSlider.addEventListener("input", (e) => {
      state.radiusKm = parseInt(e.target.value, 10);
      radiusValueText.innerText = `${state.radiusKm} km`;
      updateUserMarker();
      applyFilters();
    });
  }

  // Filter 24 Jam Checkbox
  const chk24Jam = document.getElementById("chk24Jam");
  if (chk24Jam) {
    chk24Jam.addEventListener("change", (e) => {
      state.filter24JamOnly = e.target.checked;
      applyFilters();
    });
  }

  // Filter Panggilan Checkbox
  const chkPanggilan = document.getElementById("chkPanggilan");
  if (chkPanggilan) {
    chkPanggilan.addEventListener("change", (e) => {
      state.filterPanggilanOnly = e.target.checked;
      applyFilters();
    });
  }

  // Filter Bengkel Resmi Checkbox
  const chkResmi = document.getElementById("chkResmi");
  if (chkResmi) {
    chkResmi.addEventListener("change", (e) => {
      state.filterResmiOnly = e.target.checked;
      applyFilters();
    });
  }

  // Sorting Dropdown
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      applyFilters();
    });
  }

  // Input Pencarian Lokasi Manual dengan Enter
  const manualLocationInput = document.getElementById("manualLocationInput");
  if (manualLocationInput) {
    manualLocationInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchManualLocation();
      }
    });
  }

  // Form Tambah Bengkel
  const addForm = document.getElementById("addBengkelForm");
  if (addForm) {
    addForm.addEventListener("submit", handleAddBengkelSubmit);
  }
}
