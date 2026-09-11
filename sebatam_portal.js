/**
 * SEBATAM SUPER-PORTAL - JAVASCRIPT ENGINE (FULLY INTEGRATED & ACTIVATED)
 * Menghubungkan seluruh ekosistem direktori Batam, Kos, Bengkel 24 Jam, Snaprint & Kasir Keuangan
 */

// --- 1. KOORDINAT SENTRAL 12 KECAMATAN KOTA BATAM ---
const KECAMATAN_COORDINATES = {
  "Batam Kota": [1.1275, 104.0500],
  "Lubuk Baja": [1.1440, 104.0120], // Nagoya
  "Batu Ampar": [1.1645, 104.0089],
  "Bengkong": [1.1568, 104.0321],
  "Batu Aji": [1.0560, 103.9870],
  "Sagulung": [1.0340, 103.9720],
  "Sei Beduk": [1.0680, 104.0410], // Muka Kuning
  "Sekupang": [1.1150, 103.9580], // Tiban
  "Nongsa": [1.1780, 104.1020],
  "Belakang Padang": [1.1580, 103.8820],
  "Bulang": [0.9850, 103.9230],
  "Galang": [0.7500, 104.2200]
};

// --- 2. DATABASE UTAMA LISTING TERINTEGRASI ---
const INITIAL_SEBATAM_LISTINGS = [
  // === PERCETAKAN & DIGITAL PRINTING (SNAPRINT) ===
  {
    id: "sbt-prn-01",
    nama: "Snaprint Batam - Digital Printing & Souvenir Enterprise",
    kategori: "percetakan",
    kategoriLabel: "Percetakan & Advertising",
    kecamatan: "Batam Kota",
    alamat: "Ruko Mahkota Raya Blok C No. 8, Batam Center",
    telepon: "081270889900",
    whatsapp: "6281270889900",
    harga: "Spanduk Flexi mulai Rp 15.000/m²",
    rating: 5.0,
    reviewsCount: 340,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1275,
    lng: 104.0450,
    foto: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600&auto=format&fit=crop&q=80",
    jamBuka: "08:00 - 21:00 WIB (Senin - Sabtu)",
    deskripsi: "Pusat cetak cepat Batam: Spanduk Outdoor Flexi, Roll Banner, Brosur, Stiker Vinyl Die Cut, Sablon DTF Kaos & Jersey, Tumbler, Mug Promosi & Nota Faktur NCR.",
    tags: ["Snaprint", "Digital Printing", "Spanduk Flexi", "Sablon DTF", "Souvenir Batam"],
    terkaitApp: "snaprint.html"
  },
  {
    id: "sbt-prn-02",
    nama: "Snaprint Express Zamrud Offset & Neon Box",
    kategori: "percetakan",
    kategoriLabel: "Advertising & Reklame",
    kecamatan: "Lubuk Baja",
    alamat: "Komp. Nagoya Business Center Blok IV No. 2, Nagoya",
    telepon: "081372884411",
    whatsapp: "6281372884411",
    harga: "Mulai Rp 20.000",
    rating: 4.9,
    reviewsCount: 165,
    isFeatured: false,
    isVerified: true,
    is24Jam: false,
    lat: 1.1415,
    lng: 104.0150,
    foto: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop&q=80",
    jamBuka: "08:30 - 18:00 WIB",
    deskripsi: "Spesialis pembuatan Neon Box akrilik, Huruf Timbul Stainless, Plakat Akrilik Wisuda/Penghargaan, Banner Event, dan cetak buku laporan tahunan.",
    tags: ["Neon Box", "Huruf Timbul", "Nagoya", "Plakat", "Snaprint"],
    terkaitApp: "snaprint.html"
  },

  // === BENGKEL OTOMOTIF & PANGGILAN 24 JAM ===
  {
    id: "sbt-bkl-01",
    nama: "Bengkel Mobil Panggilan & Derek Towing 24 Jam Batam",
    kategori: "bengkel",
    kategoriLabel: "Bengkel & Derek 24 Jam",
    kecamatan: "Batu Ampar",
    alamat: "Jl. Yos Sudarso No. 45, Harbour Bay, Batu Ampar, Batam",
    telepon: "082177889911",
    whatsapp: "6282177889911",
    harga: "Servis Darurat mulai Rp 75.000",
    rating: 4.9,
    reviewsCount: 290,
    isFeatured: true,
    isVerified: true,
    is24Jam: true,
    lat: 1.1645,
    lng: 104.0089,
    foto: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=600&auto=format&fit=crop&q=80",
    jamBuka: "Buka Siaga 24 Jam Nonstop",
    deskripsi: "Unit respon darurat mobil mogok, jumper aki, radiator overheat, ganti ban bocor di jalan/tol, evakuasi derek towing gendong seluruh Batam.",
    tags: ["Buka 24 Jam", "Derek Towing", "Jumper Aki", "Panggilan Darurat", "Harbour Bay"],
    terkaitApp: "cari_bengkel.html"
  },
  {
    id: "sbt-bkl-02",
    nama: "Bengkel Motor Injeksi & Tambal Ban Tubeless Aviari",
    kategori: "bengkel",
    kategoriLabel: "Bengkel Motor",
    kecamatan: "Batu Aji",
    alamat: "Jl. R. Suprapto Komplek Ruko Aviari Blok B-12, Batu Aji",
    telepon: "081366554433",
    whatsapp: "6281366554433",
    harga: "Mulai Rp 20.000",
    rating: 4.8,
    reviewsCount: 140,
    isFeatured: false,
    isVerified: true,
    is24Jam: true,
    lat: 1.0560,
    lng: 103.9870,
    foto: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80",
    jamBuka: "Buka 24 Jam Siaga Ban",
    deskripsi: "Servis injeksi motor matic Honda/Yamaha, reset ECU, infus injector, ganti oli, ban tubeless motor & tambal tip-top di area Batu Aji & Sagulung.",
    tags: ["Tambal Tubeless", "Batu Aji", "Aviari", "24 Jam", "Servis Motor"],
    terkaitApp: "cari_bengkel.html"
  },
  {
    id: "sbt-bkl-03",
    nama: "Sentra Aki Batam Delivery 24 Jam (Astra & Yuasa)",
    kategori: "bengkel",
    kategoriLabel: "Layanan Aki & Jumper",
    kecamatan: "Batam Kota",
    alamat: "Ruko Palm Spring Blok A No. 3, Batam Center",
    telepon: "081908070605",
    whatsapp: "6281908070605",
    harga: "Antar Pasang Gratis",
    rating: 4.9,
    reviewsCount: 215,
    isFeatured: true,
    isVerified: true,
    is24Jam: true,
    lat: 1.1330,
    lng: 104.0480,
    foto: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    jamBuka: "Layanan Antar 24 Jam",
    deskripsi: "Tukar tambah aki mobil & motor, antar langsung dan pasang di tempat 24 jam. Bergaransi resmi 12 bulan GS Astra, Incoe, Yuasa.",
    tags: ["Aki Mobil", "Jumper 24 Jam", "Batam Center", "Delivery Aki"],
    terkaitApp: "cari_bengkel.html"
  },

  // === KOS & PENGINAPAN BATAM ===
  {
    id: "sbt-kos-01",
    nama: "Kos Putri & Eksekutif Graha Batam Center (Full Furnished)",
    kategori: "kos",
    kategoriLabel: "Kos & Penginapan",
    kecamatan: "Batam Kota",
    alamat: "Komp. Taman Eden Blok D No. 15, Batam Center",
    telepon: "081277665544",
    whatsapp: "6281277665544",
    harga: "Rp 1.200.000 / Bulan",
    rating: 4.9,
    reviewsCount: 95,
    isFeatured: true,
    isVerified: true,
    is24Jam: true,
    lat: 1.1320,
    lng: 104.0580,
    foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
    jamBuka: "Akses 24 Jam (Smart Card)",
    deskripsi: "Kos nyaman dekat Mega Mall & Pelabuhan Batam Center. Fasilitas: AC, Kamar Mandi Dalam, Kasur Springbed, Meja Kerja, Wifi Fiber 100Mbps, Dapur Bersama & CCTV.",
    tags: ["AC", "Kamar Mandi Dalam", "Wifi 100Mbps", "Mega Mall", "Batam Center"],
    terkaitApp: "cari_kos.html"
  },
  {
    id: "sbt-kos-02",
    nama: "Kos Karyawan Industri Muka Kuning Pintu 2",
    kategori: "kos",
    kategoriLabel: "Kos Karyawan Industri",
    kecamatan: "Sei Beduk",
    alamat: "Perumahan Bida Ayu Blok F No. 22, Sei Beduk (Dekat Pintu 2 Batamindo)",
    telepon: "085264332211",
    whatsapp: "6285264332211",
    harga: "Rp 650.000 / Bulan",
    rating: 4.7,
    reviewsCount: 68,
    isFeatured: false,
    isVerified: true,
    is24Jam: true,
    lat: 1.0680,
    lng: 104.0410,
    foto: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format&fit=crop&q=80",
    jamBuka: "Bebas 24 Jam",
    deskripsi: "Lokasi sangat dekat kawasan industri Batamindo Muka Kuning (cuma 5 menit jalan kaki/motor). Bebas air PDAM & listrik standar, aman dan asri.",
    tags: ["Muka Kuning", "Batamindo", "Karyawan", "Murah", "Sei Beduk"],
    terkaitApp: "cari_kos.html"
  },
  {
    id: "sbt-kos-03",
    nama: "Kos Paviliun Tiban Asri Sekupang",
    kategori: "kos",
    kategoriLabel: "Kos & Kontrakan",
    kecamatan: "Sekupang",
    alamat: "Tiban Centre Blok C No. 10, Sekupang, Batam",
    telepon: "081270993311",
    whatsapp: "6281270993311",
    harga: "Rp 850.000 / Bulan",
    rating: 4.8,
    reviewsCount: 42,
    isFeatured: false,
    isVerified: true,
    is24Jam: true,
    lat: 1.1150,
    lng: 103.9580,
    foto: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop&q=80",
    jamBuka: "Bebas 24 Jam",
    deskripsi: "Kamar luas, parkir mobil aman berpagar, dekat pasar Tiban Centre, akses cepat ke Pelabuhan Feri Domestik & Internasional Sekupang.",
    tags: ["Sekupang", "Tiban", "Parkir Mobil", "Dekat Pelabuhan"],
    terkaitApp: "cari_kos.html"
  },

  // === KULINER & OLEH-OLEH KHAS BATAM ===
  {
    id: "sbt-kul-01",
    nama: "Warung Seafood Kelong Mak Bengkong Laut",
    kategori: "kuliner",
    kategoriLabel: "Kuliner & Seafood",
    kecamatan: "Bengkong",
    alamat: "Kelong Golden Prawn No. 12, Bengkong Laut, Batam",
    telepon: "081270112233",
    whatsapp: "6281270112233",
    harga: "Mulai Rp 35.000",
    rating: 4.9,
    reviewsCount: 220,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1568,
    lng: 104.0321,
    foto: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80",
    jamBuka: "10:00 - 22:30 WIB",
    deskripsi: "Seafood kelong terapung view laut: Kepiting Saus Padang pedas manis, Ikan Bakar Sambal Dabu-dabu, Gonggong rebus khas Kepri dan Udang Nestum.",
    tags: ["Seafood", "Gonggong", "Kelong Terapung", "Bengkong", "Halal"]
  },
  {
    id: "sbt-kul-02",
    nama: "Kedai Kopi & Teh Tarik Tradisional Nagoya",
    kategori: "kuliner",
    kategoriLabel: "Cafe & Warung Kopi",
    kecamatan: "Lubuk Baja",
    alamat: "Jl. Imam Bonjol No. 28, Nagoya Hill, Lubuk Baja",
    telepon: "081372998877",
    whatsapp: "6281372998877",
    harga: "Mulai Rp 12.000",
    rating: 4.8,
    reviewsCount: 180,
    isFeatured: false,
    isVerified: true,
    is24Jam: false,
    lat: 1.1440,
    lng: 104.0120,
    foto: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80",
    jamBuka: "06:30 - 23:00 WIB",
    deskripsi: "Kopi O pekat harum biji lokal, Teh Tarik buih tebal, Mie Lendir, dan Roti Canai Kari khas Melayu Batam.",
    tags: ["Kopi O", "Teh Tarik", "Mie Lendir", "Nagoya", "Sarapan Pagi"]
  },
  {
    id: "sbt-kul-03",
    nama: "Rumah Produksi Lapis Legit & Kue Bingka Nongsa",
    kategori: "kuliner",
    kategoriLabel: "Oleh-Oleh Khas",
    kecamatan: "Nongsa",
    alamat: "Jl. Hang Lekiu No. 3, Nongsa (Dekat Nongsapura Ferry)",
    telepon: "081270001199",
    whatsapp: "6281270001199",
    harga: "Mulai Rp 45.000 / Box",
    rating: 4.9,
    reviewsCount: 310,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1780,
    lng: 104.1020,
    foto: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    jamBuka: "07:30 - 21:00 WIB",
    deskripsi: "Oleh-oleh premium khas Batam: Lapis Legit Original Wisman, Lapis Prunes, Bingka Bakar Pandan, Keripik Gonggong siap antar ke Bandara & Pelabuhan.",
    tags: ["Lapis Legit", "Bingka Bakar", "Oleh-Oleh Batam", "Nongsa"]
  },

  // === SERVIS AC & ELEKTRONIK ===
  {
    id: "sbt-elk-01",
    nama: "Spesialis Cuci & Servis AC Batam Dingin Jaya",
    kategori: "elektronik",
    kategoriLabel: "Servis AC & Elektronik",
    kecamatan: "Lubuk Baja",
    alamat: "Jl. Teuku Umar No. 10, Nagoya, Lubuk Baja, Batam",
    telepon: "081378889900",
    whatsapp: "6281378889900",
    harga: "Cuci AC Rp 65.000",
    rating: 4.9,
    reviewsCount: 310,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1440,
    lng: 104.0120,
    foto: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    jamBuka: "08:00 - 18:00 WIB",
    deskripsi: "Cuci AC split rumah/kantor, tambah/isi freon R32 & R410, perbaikan AC netes air, modul PCB rusak, bongkar pasang AC bergaransi 30 hari.",
    tags: ["Cuci AC", "Isi Freon", "Nagoya", "Batam Center", "Garansi 30 Hari"]
  },

  // === JASA BISNIS, LEGALITAS & KEUANGAN ENTERPRISE ===
  {
    id: "sbt-leg-01",
    nama: "Batam Legalitas Prima & Gigin Swanto Enterprise Consulting",
    kategori: "legalitas",
    kategoriLabel: "Jasa Bisnis & Legalitas",
    kecamatan: "Batam Kota",
    alamat: "Graha Pena Building Lantai 5, Batam Center",
    telepon: "0811776633",
    whatsapp: "62811776633",
    harga: "Konsultasi Pendirian Usaha Gratis",
    rating: 5.0,
    reviewsCount: 180,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1290,
    lng: 104.0550,
    foto: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
    jamBuka: "08:30 - 17:00 WIB (Senin - Jumat)",
    deskripsi: "Layanan satu pintu legalitas usaha Batam: Pendirian PT Perorangan/PT PMA, CV, NIB OSS RBA, Izin BP Batam, Hak Merek HKI, & Manajemen Keuangan Enterprise.",
    tags: ["Pendirian PT", "OSS RBA", "BP Batam", "Gigin Swanto Enterprise", "Pajak UMKM"],
    terkaitApp: "KEUANGAN_GIGIN_SWANTO_ENTERPRISE.html"
  },

  // === TUKANG BANGUNAN & BENGKEL LAS ===
  {
    id: "sbt-tkg-01",
    nama: "Bengkel Las & Kanopi Minimalis Sagulung",
    kategori: "bangunan",
    kategoriLabel: "Bengkel Las & Kanopi",
    kecamatan: "Sagulung",
    alamat: "Jl. Dapur 12 No. 88, Sagulung, Batam",
    telepon: "081372551144",
    whatsapp: "6281372551144",
    harga: "Kanopi mulai Rp 280.000/m²",
    rating: 4.8,
    reviewsCount: 88,
    isFeatured: false,
    isVerified: true,
    is24Jam: false,
    lat: 1.0340,
    lng: 103.9720,
    foto: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    jamBuka: "08:00 - 17:30 WIB",
    deskripsi: "Pengerjaan Kanopi Spandek/Alderon/Solarflat, Pagar Rumah Minimalis, Teralis Jendela, Pintu Harmonika Ruko, dan Renovasi Atap Bocor Rumah Batam.",
    tags: ["Kanopi", "Teralis", "Bengkel Las", "Sagulung", "Renovasi"]
  },

  // === ARISAN RUMAH BOLON ===
  {
    id: "sbt-ars-01",
    nama: "Komunitas & Sistem Arisan Rumah Bolon Batam",
    kategori: "legalitas",
    kategoriLabel: "Komunitas & Arisan",
    kecamatan: "Batam Kota",
    alamat: "Sekretariat Rumah Bolon, Batam Center",
    telepon: "081270334455",
    whatsapp: "6281270334455",
    harga: "Sistem Terbuka & Transparan",
    rating: 5.0,
    reviewsCount: 150,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1280,
    lng: 104.0510,
    foto: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=80",
    jamBuka: "09:00 - 20:00 WIB",
    deskripsi: "Pengelolaan arisan keluarga, paguyuban, dan arisan barang terstruktur dengan generator video undian otomatis dan buku kas digital.",
    tags: ["Arisan Rumah Bolon", "Generator Video", "Batam Center", "Komunitas"],
    terkaitApp: "ARISAN_RUMAH_BOLON.html"
  },

  // === JASA BUAT APLIKASI, WEB & IT SOLUTION BATAM ===
  {
    id: "sbt-app-01",
    nama: "Gigin Tech Enterprise - Solusi Software, Kasir POS & Web Batam",
    kategori: "aplikasi",
    kategoriLabel: "Jasa Buat Aplikasi & Web",
    kecamatan: "Batam Kota",
    alamat: "Ruko Mahkota Raya Blok C No. 8, Batam Center",
    telepon: "081270889900",
    whatsapp: "6281270889900",
    harga: "Website/App Mulai Rp 750.000",
    rating: 5.0,
    reviewsCount: 180,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1275,
    lng: 104.0450,
    foto: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    jamBuka: "08:30 - 20:00 WIB (Senin - Sabtu)",
    deskripsi: "Jasa pembuatan software custom & web profesional Batam: Aplikasi Kasir POS Thermal Bluetooth, Sistem Keuangan Enterprise, Web Portofolio Company Profile, Sistem Manajemen Kos & Arisan, hingga integrasi WhatsApp API & Database Cloud.",
    tags: ["Jasa Buat Aplikasi", "Kasir POS", "Website Batam", "Software House", "Batam Center"],
    terkaitApp: "KEUANGAN_GIGIN_SWANTO_ENTERPRISE.html"
  },
  {
    id: "sbt-app-02",
    nama: "Batam Code Lab - Pembuatan Toko Online, Web & Android App",
    kategori: "aplikasi",
    kategoriLabel: "Software House & Mobile Dev",
    kecamatan: "Lubuk Baja",
    alamat: "Komp. Nagoya Hill Superblock Blok R No. 12, Nagoya",
    telepon: "082188990011",
    whatsapp: "6282188990011",
    harga: "Mulai Rp 1.500.000",
    rating: 4.9,
    reviewsCount: 95,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1440,
    lng: 104.0120,
    foto: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    jamBuka: "09:00 - 18:00 WIB",
    deskripsi: "Developer web & mobile app native/Flutter: Pembuatan toko online terintegrasi payment gateway QRIS, aplikasi reservasi servis kendaraan, landing page promosi instan, dan maintenance sistem IT.",
    tags: ["Toko Online", "Mobile App", "Android iOS", "Nagoya", "Web Developer"]
  },
  {
    id: "sbt-app-03",
    nama: "Snaprint Tech - Sistem Pemesanan Cetak & Invoice Digital",
    kategori: "aplikasi",
    kategoriLabel: "IT Percetakan & Digitalisasi",
    kecamatan: "Batu Ampar",
    alamat: "Harbour Bay Downtown Blok A No. 5, Batu Ampar",
    telepon: "081372884411",
    whatsapp: "6281372884411",
    harga: "Mulai Rp 1.200.000",
    rating: 4.9,
    reviewsCount: 74,
    isFeatured: false,
    isVerified: true,
    is24Jam: false,
    lat: 1.1645,
    lng: 104.0089,
    foto: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    jamBuka: "08:00 - 18:00 WIB",
    deskripsi: "Digitalisasi bisnis UMKM & percetakan: Pembuatan kalkulator harga cetak online otomatis, sistem nota invoice digital PDF, katalog produk interaktif, dan integrasi WhatsApp broadcast.",
    tags: ["Digitalisasi UMKM", "Invoice Digital", "Kalkulator Online", "Snaprint Tech"]
  },

  // === LOWONGAN KERJA & LAPANGAN KARIER BATAM ===
  {
    id: "sbt-lkr-01",
    nama: "Lowongan: Graphic Designer & Operator Mesin DTF/Flexi",
    perusahaan: "Snaprint Digital Advertising Batam",
    kategori: "loker",
    kategoriLabel: "Lowongan Kerja (Loker)",
    kecamatan: "Batam Kota",
    alamat: "Snaprint Hub, Ruko Mahkota Raya Blok C No. 8, Batam Center",
    telepon: "081270889900",
    whatsapp: "6281270889900",
    harga: "Gaji: Rp 4.700.000 - Rp 6.200.000",
    rating: 5.0,
    reviewsCount: 42,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1275,
    lng: 104.0450,
    foto: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    foto2: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
    foto3: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80",
    tipeKerja: "Full Time (Penuh Waktu)",
    pendidikan: "SMA / SMK / D3 Desain",
    pengalaman: "Minimal 1 Tahun",
    kualifikasi: "1. Pria / Wanita, usia maks. 28 tahun\n2. Menguasai CorelDraw, Adobe Photoshop, atau Illustrator\n3. Memahami proses setting warna CMYK & layout cetak spanduk / stiker / DTF\n4. Disiplin, jujur, teliti, dan mampu bekerja sama dalam tim produksi",
    deskripsi: "Dibutuhkan segera: 2 Orang Desainer Grafis & Operator Mesin Percetakan Snaprint. Bertanggung jawab melayani kebutuhan layout desain konsumen, setting file cetak large format banner flexi, stiker label, sablon kaos DTF, dan pengawasan kualitas hasil cetak.",
    benefits: ["BPJS Kesehatan", "BPJS Ketenagakerjaan", "Uang Makan Siang", "Bonus Target Bulanan", "Lembur Dibayar"],
    email: "karir@snaprint.batam.com",
    jamBuka: "Batas Lamaran: 30 September 2026",
    tags: ["Loker Batam", "Desain Grafis", "Snaprint", "Full Time", "Batam Center"],
    terkaitApp: "snaprint.html"
  },
  {
    id: "sbt-lkr-02",
    nama: "Lowongan: Teknisi Servis AC & Mekanik Mobil 24 Jam",
    perusahaan: "Bengkel Sentral Auto & AC Batam",
    kategori: "loker",
    kategoriLabel: "Lowongan Kerja (Loker)",
    kecamatan: "Batu Ampar",
    alamat: "Bengkel Sentral Siaga 24 Jam, Harbour Bay, Batu Ampar",
    telepon: "082177889911",
    whatsapp: "6282177889911",
    harga: "Gaji: Rp 4.800.000 - Rp 6.500.000 + Insentif",
    rating: 4.9,
    reviewsCount: 30,
    isFeatured: true,
    isVerified: true,
    is24Jam: true,
    lat: 1.1645,
    lng: 104.0089,
    foto: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    foto2: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    foto3: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    tipeKerja: "Full Time / Shift Siaga",
    pendidikan: "SMK Otomotif / Elektro / Terbuka",
    pengalaman: "Minimal 2 Tahun",
    kualifikasi: "1. Pria, usia 20 - 38 tahun, memiliki SIM C/A aktif\n2. Menguasai kelistrikan otomotif, tune-up injeksi, ganti oli, dan servis AC mobil/kantor\n3. Bersedia sistem shift panggilan darurat 24 jam\n4. Loyal, tanggap, dan jujur",
    deskripsi: "Dibutuhkan Mekanik Mobil Panggilan & Teknisi AC berpengalaman. Menangani panggilan perbaikan kendaraan mogok di jalan, servis AC ruko dan instansi, serta perawatan armada mitra se-Batam.",
    benefits: ["Gaji Pokok UMK", "Insentif Panggilan Malam", "Kendaraan Operasional", "Mess Teknisi", "BPJS"],
    email: "hrd.sentralauto@gmail.com",
    jamBuka: "Batas Lamaran: Terbuka (Urgent)",
    tags: ["Loker Mekanik", "Teknisi AC", "Batu Ampar", "Loker 24 Jam", "Insentif"],
    terkaitApp: "cari_bengkel.html"
  },
  {
    id: "sbt-lkr-03",
    nama: "Lowongan: Admin Keuangan, Kasir & Front Office Properti",
    perusahaan: "Gigin Property & Kos Enterprise",
    kategori: "loker",
    kategoriLabel: "Lowongan Kerja (Loker)",
    kecamatan: "Lubuk Baja",
    alamat: "Komp. Nagoya Business Center Blok IV No. 2, Nagoya",
    telepon: "081372884411",
    whatsapp: "6281372884411",
    harga: "Gaji: Rp 4.500.000 - Rp 5.500.000",
    rating: 4.9,
    reviewsCount: 25,
    isFeatured: false,
    isVerified: true,
    is24Jam: false,
    lat: 1.1415,
    lng: 104.0150,
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    foto2: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    tipeKerja: "Full Time (Penuh Waktu)",
    pendidikan: "SMA / SMK Akuntansi / D3 / S1",
    pengalaman: "Fresh Graduate / 1 Tahun",
    kualifikasi: "1. Wanita / Pria, usia maks. 28 tahun\n2. Pendidikan min. SMK Akuntansi / D3 Manajemen / Administrasi\n3. Mahir MS Excel, input software POS kasir & ramah berkomunikasi\n4. Teliti dalam pembukuan nota dan kas kecil",
    deskripsi: "Dibutuhkan Admin Kasir & Front Office Properti. Bertanggung jawab atas pencatatan pembayaran sewa kos via sistem keuangan, rekapitulasi nota harian, penerimaan tamu kos, dan penyusunan laporan laba rugi.",
    benefits: ["Gaji Pokok", "Tunjangan Transport", "Uang Makan", "Bonus Kinerja Properti", "BPJS"],
    email: "rekrutmen.gigin@gmail.com",
    jamBuka: "Batas Lamaran: 25 September 2026",
    tags: ["Admin Keuangan", "Kasir", "Nagoya", "Kelola Kos", "Loker Wanita/Pria"],
    terkaitApp: "KEUANGAN_GIGIN_SWANTO_ENTERPRISE.html"
  },
  {
    id: "sbt-lkr-04",
    nama: "Lowongan: Fullstack Web & Junior Mobile App Developer",
    perusahaan: "Gigin Tech Solution Batam",
    kategori: "loker",
    kategoriLabel: "Lowongan IT & Software",
    kecamatan: "Batam Kota",
    alamat: "Gigin Tech Solution, Batam Center",
    telepon: "081270889900",
    whatsapp: "6281270889900",
    harga: "Gaji: Rp 6.000.000 - Rp 10.000.000",
    rating: 5.0,
    reviewsCount: 38,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1275,
    lng: 104.0450,
    foto: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    foto2: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
    foto3: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    tipeKerja: "Full Time / Hybrid",
    pendidikan: "D3 / S1 Ilmu Komputer / Informatika (Terbuka untuk Portofolio Kuat)",
    pengalaman: "Minimal 1 - 2 Tahun",
    kualifikasi: "1. Menguasai HTML5, CSS3, Modern JavaScript, REST API, Node.js / React / Vue atau Flutter\n2. Terbiasa menggunakan Git, database SQL / NoSQL\n3. Pengalaman membangun aplikasi POS kasir, e-commerce, atau web portal\n4. Problem solver dan berorientasi pada kualitas kode",
    deskripsi: "Membuka kesempatan bagi Software Engineer untuk mengembangkan produk SaaS, platform e-commerce, portal web interaktif, dan integrasi WhatsApp API untuk klien korporat & UMKM se-Batam.",
    benefits: ["Gaji Kompetitif di atas UMK", "Fasilitas Laptop & Monitor Kerja", "BPJS Kesehatan & TK", "Bonus Proyek", "Kerja Hybrid"],
    email: "developer@gigintech.com",
    jamBuka: "Batas Lamaran: Urgent / Segera",
    tags: ["Loker IT", "Web Developer", "Software Engineer", "Batam Kota", "Full Time"]
  },

  // === TALENTA & PENCARI KERJA SIAP KERJA BATAM ===
  {
    id: "sbt-cv-01",
    nama: "Rizky Ananda - Graphic Designer, Video Editor & Social Media Specialist",
    kategori: "pencarikerja",
    kategoriLabel: "Pencari Kerja & Talenta",
    kecamatan: "Batam Kota",
    alamat: "Batam Center, Kota Batam",
    telepon: "081277665544",
    whatsapp: "6281277665544",
    harga: "Gaji Harapan: Rp 5.000.000 - Rp 6.500.000",
    rating: 5.0,
    reviewsCount: 18,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.1275,
    lng: 104.0500,
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    pendidikan: "Bootcamp IT / Coding / Desain Digital",
    jamBuka: "Status: Siap Kerja Segera",
    deskripsi: "Profil Kandidat: Lulusan Bootcamp Desain Digital & Video Editing dengan pengalaman 3 tahun di bidang Desain Grafis (Photoshop, Illustrator, Canva, Figma) & Video Reels/TikTok (CapCut, Premiere Pro). Memiliki portofolio konten brand & siap bekerja Full-time atau Hybrid di Batam.",
    tags: ["Pencari Kerja", "Desainer Grafis", "Video Editor", "Batam Center", "Siap Interview"]
  },
  {
    id: "sbt-cv-02",
    nama: "Ahmad Fauzi - Teknisi Listrik Arus Kuat, Mesin & Servis AC",
    kategori: "pencarikerja",
    kategoriLabel: "Pencari Kerja & Talenta",
    kecamatan: "Batu Aji",
    alamat: "Batu Aji, Kota Batam",
    telepon: "082166554433",
    whatsapp: "6282166554433",
    harga: "Gaji Harapan: Rp 4.800.000 - Rp 5.800.000",
    rating: 4.9,
    reviewsCount: 14,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: 1.0560,
    lng: 103.9870,
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    pendidikan: "Sertifikasi Profesi (BNSP / K3 / Keahlian)",
    jamBuka: "Status: Siap Bekerja Shift / Lapangan",
    deskripsi: "Profil Kandidat: Memiliki Sertifikasi Profesi BNSP K3 & Teknisi Refrigerasi/AC. Pengalaman 4 tahun maintenance mesin pabrik Muka Kuning & instalasi panel listrik gedung. Memiliki SIM C & A aktif.",
    tags: ["Pencari Kerja", "Teknisi Listrik", "Mekanik", "Batu Aji", "Bersertifikat"]
  },
  {
    id: "sbt-cv-03",
    nama: "Siti Rahmawati, S.Ak - Staff Akuntansi, Kasir & Pajak Usaha",
    kategori: "pencarikerja",
    kategoriLabel: "Pencari Kerja & Talenta",
    kecamatan: "Lubuk Baja",
    alamat: "Nagoya, Kota Batam",
    telepon: "081399887766",
    whatsapp: "6281399887766",
    harga: "Gaji Harapan: Rp 4.700.000 - Rp 5.500.000",
    rating: 5.0,
    reviewsCount: 22,
    isFeatured: false,
    isVerified: true,
    is24Jam: false,
    lat: 1.1440,
    lng: 104.0120,
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
    pendidikan: "Sarjana (S1)",
    jamBuka: "Status: Siap Kerja Segera",
    deskripsi: "Profil Kandidat: Sarjana Akuntansi IPK 3.82. Mahir Accurate, Zahir Accounting, Microsoft Excel VLOOKUP/Pivot, e-Faktur Pajak, dan rekonsiliasi kas bank. Teliti, jujur, dan siap memajukan keuangan perusahaan Anda.",
    tags: ["Pencari Kerja", "Akuntansi", "Admin Kasir", "Nagoya", "Fresh Graduate S1"]
  },
  {
    id: "sbt-cv-04",
    nama: "Budi Santoso - Driver Logistik SIM B1 & Pengawas Gudang",
    kategori: "pencarikerja",
    kategoriLabel: "Pencari Kerja & Talenta",
    kecamatan: "Sekupang",
    alamat: "Tiban, Sekupang, Kota Batam",
    telepon: "085211223344",
    whatsapp: "6285211223344",
    harga: "Gaji Harapan: Rp 4.500.000 - Rp 5.200.000",
    rating: 4.8,
    reviewsCount: 16,
    isFeatured: false,
    isVerified: true,
    is24Jam: false,
    lat: 1.1150,
    lng: 103.9580,
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
    pendidikan: "Kursus / Pelatihan LPK / Balai Latihan Kerja (BLK)",
    jamBuka: "Status: Siap Bekerja Segera",
    deskripsi: "Profil Kandidat: Pelatihan Logistik & Pergudangan BLK Batam. Memiliki SIM B1 Umum aktif, hafal rute seluruh kawasan industri Batam (Batamindo, Kabil, Batu Ampar, Tanjung Uncang), bebas narkoba, dan disiplin tinggi.",
    tags: ["Pencari Kerja", "Driver Logistik", "SIM B1", "Gudang", "Sekupang"]
  }
];


// --- 3. KATEGORI MASTER DIREKTORI (USAHA & JASA BATAM) ---
const CATEGORIES = [
  { id: "percetakan", label: "Snaprint & Percetakan", icon: "fa-print" },
  { id: "bengkel", label: "Bengkel & Derek 24 Jam", icon: "fa-wrench" },
  { id: "kos", label: "Kos & Properti Batam", icon: "fa-building-user" },
  { id: "kuliner", label: "Kuliner & Seafood Kelong", icon: "fa-utensils" },
  { id: "elektronik", label: "Servis AC & Elektronik", icon: "fa-snowflake" },
  { id: "bangunan", label: "Tukang & Bengkel Las", icon: "fa-hammer" },
  { id: "legalitas", label: "Legalitas PT & Bisnis", icon: "fa-scale-balanced" },
  { id: "aplikasi", label: "IT & Jasa Buat Aplikasi", icon: "fa-code" }
];

const DISTRICTS = [
  "Semua",
  "Batam Kota",
  "Lubuk Baja",
  "Batu Ampar",
  "Bengkong",
  "Batu Aji",
  "Sagulung",
  "Sei Beduk",
  "Sekupang",
  "Nongsa",
  "Belakang Padang",
  "Bulang",
  "Galang"
];

// --- 4. STATE MANAJEMEN GLOBAL ---
let listingsData = [];
let activeCategory = "all";
let activeArea = "";
let searchQuery = "";
let filterFeaturedOnly = false;
let filter24JamOnly = false;
let filterVerifiedOnly = false;
let filterFavoritesOnly = false;
let currentViewMode = "grid"; // 'grid', 'list', 'map'
let bookmarkedIds = [];
let leafletMap = null;
let markersLayer = null;

// --- 5. INITIALIZATION ON LOAD ---
document.addEventListener("DOMContentLoaded", () => {
  loadListingsFromStorage();
  loadBookmarksFromStorage();
  initTheme();
  renderSidebarCategories();
  renderDistrictChips();
  setupEventListeners();
  updateSidebarBadges();
  calculateAppDevEstimate();
  applyFilterAndRender();
});

// Load / Init Data
function loadListingsFromStorage() {
  const saved = localStorage.getItem("sebatam_portal_listings_v2");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Merge initial listings if missing (e.g. sbt-app-01, sbt-app-02)
      const existingIds = new Set(parsed.map(x => x.id));
      INITIAL_SEBATAM_LISTINGS.forEach(item => {
        if (!existingIds.has(item.id)) {
          parsed.push(item);
        }
      });
      listingsData = parsed;
    } catch (e) {
      listingsData = [...INITIAL_SEBATAM_LISTINGS];
    }
  } else {
    listingsData = [...INITIAL_SEBATAM_LISTINGS];
  }
  saveListingsToStorage();
}

function saveListingsToStorage() {
  localStorage.setItem("sebatam_portal_listings_v2", JSON.stringify(listingsData));
}

function loadBookmarksFromStorage() {
  const saved = localStorage.getItem("sebatam_portal_bookmarks");
  if (saved) {
    try {
      bookmarkedIds = JSON.parse(saved);
    } catch (e) {
      bookmarkedIds = [];
    }
  }
}

function saveBookmarksToStorage() {
  localStorage.setItem("sebatam_portal_bookmarks", JSON.stringify(bookmarkedIds));
}

// --- 6. RENDER SIDEBAR CATEGORIES & DISTRICT CHIPS ---
function renderSidebarCategories() {
  const container = document.getElementById("sidebarCategoryList");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    let count = 0;
    if (cat.id === "all") {
      count = listingsData.length;
    } else {
      count = listingsData.filter(item => item.kategori === cat.id).length;
    }

    const isActive = (activeCategory === cat.id && !filterFavoritesOnly && !filterFeaturedOnly && !filter24JamOnly);

    return `
      <li class="sidebar-nav-item">
        <button 
          class="sidebar-nav-btn ${isActive ? 'active' : ''}" 
          id="catBtn_${cat.id}"
          onclick="setCategoryFilter('${cat.id}')"
          title="Kategori ${cat.label}"
        >
          <span class="nav-left-part">
            <i class="fa-solid ${cat.icon}"></i>
            <span>${cat.label}</span>
          </span>
          <span class="nav-badge-pill">${count}</span>
        </button>
      </li>
    `;
  }).join("");
}

function renderDistrictChips() {
  const container = document.getElementById("districtChipsBar");
  if (!container) return;

  container.innerHTML = DISTRICTS.map(dist => {
    const isSemua = dist === "Semua";
    const isActive = isSemua ? (!activeArea) : (activeArea === dist);
    const label = isSemua ? "🌟 Semua Wilayah" : dist;
    const filterVal = isSemua ? "" : dist;

    return `
      <button 
        class="district-chip ${isActive ? 'active' : ''}" 
        onclick="setAreaFilter('${filterVal}')"
      >
        ${label}
      </button>
    `;
  }).join("");
}

function updateSidebarBadges() {
  const badgeAll = document.getElementById("badgeAllCount");
  if (badgeAll) badgeAll.textContent = listingsData.length;

  const badgeFav = document.getElementById("badgeFavCount");
  if (badgeFav) badgeFav.textContent = bookmarkedIds.length;

  const badgeLoker = document.getElementById("badgeLokerCount");
  if (badgeLoker) badgeLoker.textContent = listingsData.filter(x => x.kategori === "loker").length;

  const badgePencari = document.getElementById("badgePencariCount");
  if (badgePencari) badgePencari.textContent = listingsData.filter(x => x.kategori === "pencarikerja").length;
}

// Navigation & Category Selection
function selectMainMenu(menuKey) {
  // Clear sidebar category active states
  document.querySelectorAll("#sidebarCategoryList .sidebar-nav-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".sidebar-nav-list .sidebar-nav-btn").forEach(btn => btn.classList.remove("active"));

  if (menuKey === "direktori") {
    activeCategory = "all";
    filterFeaturedOnly = false;
    filter24JamOnly = false;
    filterFavoritesOnly = false;
    currentViewMode = "grid";
    document.getElementById("navBtnDirektori")?.classList.add("active");
    setHeadingText("Katalog Direktori Batam");
  } else if (menuKey === "appdev") {
    activeCategory = "aplikasi";
    filterFeaturedOnly = false;
    filter24JamOnly = false;
    filterFavoritesOnly = false;
    currentViewMode = "grid";
    document.getElementById("navBtnAppDev")?.classList.add("active");
    setHeadingText("Jasa Pembuatan Aplikasi, Website & IT Solution Batam");
  } else if (menuKey === "loker") {
    activeCategory = "loker";
    filterFeaturedOnly = false;
    filter24JamOnly = false;
    filterFavoritesOnly = false;
    currentViewMode = "grid";
    document.getElementById("navBtnLoker")?.classList.add("active");
    setHeadingText("Bursa Lowongan Kerja & Peluang Karier Perusahaan Batam");
  } else if (menuKey === "pencarikerja") {
    activeCategory = "pencarikerja";
    filterFeaturedOnly = false;
    filter24JamOnly = false;
    filterFavoritesOnly = false;
    currentViewMode = "grid";
    document.getElementById("navBtnPencariKerja")?.classList.add("active");
    setHeadingText("Talent Pool & Database Pencari Kerja Siap Kerja Batam");
  } else if (menuKey === "featured") {
    activeCategory = "all";
    filterFeaturedOnly = true;
    filter24JamOnly = false;
    filterFavoritesOnly = false;
    currentViewMode = "grid";
    document.getElementById("navBtnFeatured")?.classList.add("active");
    setHeadingText("Rekomendasi Usaha Unggulan (PRO)");
  } else if (menuKey === "24jam") {
    activeCategory = "all";
    filterFeaturedOnly = false;
    filter24JamOnly = true;
    filterFavoritesOnly = false;
    currentViewMode = "grid";
    document.getElementById("navBtn24Jam")?.classList.add("active");
    setHeadingText("Layanan Siaga & Bengkel 24 Jam Nonstop Batam");
  } else if (menuKey === "favorit") {
    activeCategory = "all";
    filterFeaturedOnly = false;
    filter24JamOnly = false;
    filterFavoritesOnly = true;
    currentViewMode = "grid";
    document.getElementById("navBtnFavorit")?.classList.add("active");
    setHeadingText("Daftar Usaha & Jasa Favorit Anda ❤️");
  } else if (menuKey === "map") {
    activeCategory = "all";
    filterFeaturedOnly = false;
    filter24JamOnly = false;
    filterFavoritesOnly = false;
    currentViewMode = "map";
    document.getElementById("navBtnMap")?.classList.add("active");
    setHeadingText("Peta Interaktif Sebaran Usaha Batam");
  }

  // Update view mode button states
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === currentViewMode);
  });

  renderSidebarCategories();
  applyFilterAndRender();
  toggleSidebar(false);
}

function setHeadingText(text) {
  const heading = document.getElementById("activeFilterHeading");
  if (heading) heading.textContent = text;
}

function setCategoryFilter(catId) {
  activeCategory = catId;
  filterFeaturedOnly = false;
  filter24JamOnly = false;
  filterFavoritesOnly = false;

  // Clear main menu buttons
  document.getElementById("navBtnDirektori")?.classList.remove("active");
  document.getElementById("navBtnAppDev")?.classList.remove("active");
  document.getElementById("navBtnLoker")?.classList.remove("active");
  document.getElementById("navBtnPencariKerja")?.classList.remove("active");
  document.getElementById("navBtnFeatured")?.classList.remove("active");
  document.getElementById("navBtn24Jam")?.classList.remove("active");
  document.getElementById("navBtnFavorit")?.classList.remove("active");
  document.getElementById("navBtnMap")?.classList.remove("active");

  const selectedCategory = CATEGORIES.find(c => c.id === catId);
  setHeadingText(selectedCategory ? `Kategori: ${selectedCategory.label}` : "Direktori Batam");

  renderSidebarCategories();
  applyFilterAndRender();
  toggleSidebar(false);
}

function setAreaFilter(area) {
  const select = document.getElementById("areaSelect");
  if (select) select.value = area;
  activeArea = area;
  
  if (area && KECAMATAN_COORDINATES[area] && leafletMap) {
    leafletMap.flyTo(KECAMATAN_COORDINATES[area], 13);
  }
  
  renderDistrictChips();
  applyFilterAndRender();
}

// Mobile sidebar toggle
function toggleSidebar(show) {
  const sidebar = document.getElementById("leftSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (!sidebar) return;

  const willShow = show !== undefined ? show : !sidebar.classList.contains("show");
  sidebar.classList.toggle("show", willShow);
  if (backdrop) backdrop.classList.toggle("show", willShow);
}

// --- 7. EVENT LISTENERS SETUP & SEARCH ENGINE ---
function triggerSearch() {
  const searchInput = document.getElementById("mainSearchInput");
  const areaSelect = document.getElementById("areaSelect");

  if (searchInput) {
    searchQuery = searchInput.value.trim().toLowerCase();
  }
  if (areaSelect && areaSelect.value) {
    activeArea = areaSelect.value;
  }

  // Reset exclusive tab states to general directory search
  filterFavoritesOnly = false;
  filterFeaturedOnly = false;
  filter24JamOnly = false;

  applyFilterAndRender();

  // Smooth scroll down to results
  const target = document.getElementById("districtChipsBar") || document.getElementById("listingGridContainer") || document.getElementById("activeFilterHeading");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (searchQuery) {
    showToast(`🔍 Menampilkan hasil pencarian: "${searchQuery}"`);
  } else if (activeArea) {
    showToast(`📍 Menampilkan direktori wilayah: ${activeArea}`);
  } else {
    showToast("📋 Menampilkan seluruh katalog direktori Batam.");
  }
}

function focusAndSearchDirektori(customQuery = "") {
  selectMainMenu("direktori");
  const searchInput = document.getElementById("mainSearchInput");
  if (searchInput) {
    if (customQuery) {
      searchInput.value = customQuery;
      searchQuery = customQuery.toLowerCase();
    }
    searchInput.focus();
    searchInput.select();
  }
  triggerSearch();
}

function setupEventListeners() {
  const searchInput = document.getElementById("mainSearchInput");
  const areaSelect = document.getElementById("areaSelect");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const addListingForm = document.getElementById("addListingForm");

  let debounceTimer;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilterAndRender();
      }, 250);
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        triggerSearch();
      }
    });
  }

  if (areaSelect) {
    areaSelect.addEventListener("change", (e) => {
      setAreaFilter(e.target.value);
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  if (addListingForm) {
    addListingForm.addEventListener("submit", handleAddListingSubmit);
  }
}

// --- 8. FILTER & RENDER ENGINE ---
function getFilteredListings() {
  return listingsData.filter(item => {
    // Favorites only match
    if (filterFavoritesOnly && !bookmarkedIds.includes(item.id)) {
      return false;
    }

    // Featured only match
    if (filterFeaturedOnly && !item.isFeatured) {
      return false;
    }

    // Category match
    const matchCategory = (activeCategory === "all") || (item.kategori === activeCategory);
    
    // Area match
    const matchArea = (!activeArea) || (item.kecamatan.toLowerCase() === activeArea.toLowerCase());

    // 24 Jam match
    const match24Jam = (!filter24JamOnly) || (item.is24Jam === true);

    // Verified match
    const matchVerified = (!filterVerifiedOnly) || (item.isVerified === true);

    // Search query match (search name, desc, tags, alamat, kecamatan)
    let matchSearch = true;
    if (searchQuery) {
      const combinedText = `
        ${item.nama} 
        ${item.deskripsi} 
        ${item.kecamatan} 
        ${item.alamat} 
        ${item.kategoriLabel || ''} 
        ${(item.tags || []).join(" ")}
      `.toLowerCase();
      matchSearch = combinedText.includes(searchQuery);
    }

    return matchCategory && matchArea && match24Jam && matchVerified && matchSearch;
  });
}

function applyFilterAndRender() {
  updateSidebarBadges();
  const filtered = getFilteredListings();
  const countBadge = document.getElementById("resultsCountBadge");
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Usaha Ditemukan`;
  }

  const containerGrid = document.getElementById("listingGridView");
  const containerList = document.getElementById("listingListView");
  const emptyState = document.getElementById("emptyStateBox");
  const mapContainer = document.getElementById("mapContainer");

  if (filtered.length === 0) {
    if (containerGrid) containerGrid.innerHTML = "";
    if (containerList) containerList.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    if (mapContainer && currentViewMode === "map") updateMapMarkers([]);
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  if (currentViewMode === "grid") {
    if (containerGrid) {
      containerGrid.style.display = "grid";
      containerGrid.innerHTML = filtered.map(item => renderCardItemHTML(item)).join("");
    }
    if (containerList) containerList.style.display = "none";
    if (mapContainer) mapContainer.classList.remove("show");
  } else if (currentViewMode === "list") {
    if (containerList) {
      containerList.style.display = "flex";
      containerList.innerHTML = filtered.map(item => renderListItemHTML(item)).join("");
    }
    if (containerGrid) containerGrid.style.display = "none";
    if (mapContainer) mapContainer.classList.remove("show");
  } else if (currentViewMode === "map") {
    if (containerGrid) containerGrid.style.display = "none";
    if (containerList) containerList.style.display = "none";
    if (mapContainer) {
      mapContainer.classList.add("show");
      setTimeout(() => {
        initLeafletMap();
        updateMapMarkers(filtered);
      }, 100);
    }
  }
}

// --- 9. TEMPLATE BUILDERS ---

// Grid Card Template
function renderCardItemHTML(item) {
  const isBookmarked = bookmarkedIds.includes(item.id);
  const waUrl = getWhatsAppDirectUrl(item);
  const gmapsUrl = getGoogleMapsRouteUrl(item);

  return `
    <div class="card-item ${item.isFeatured ? 'featured' : ''}">
      <div class="card-image-wrapper">
        <img src="${item.foto}" alt="${item.nama}" class="card-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80'">
        ${item.isFeatured ? '<span class="badge-featured"><i class="fa-solid fa-crown"></i> Unggulan</span>' : ''}
        ${item.is24Jam ? '<span class="badge-featured" style="background:#dc2626; top: 40px;"><i class="fa-solid fa-clock"></i> 24 JAM</span>' : ''}
        <span class="badge-category">${item.kategoriLabel || item.kategori}</span>
        <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" title="Simpan ke Favorit" onclick="toggleBookmark('${item.id}', event)">
          <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
      </div>

      <div class="card-body">
        <h3 class="card-title">${item.nama}</h3>
        
        <div class="card-meta">
          <span class="card-rating"><i class="fa-solid fa-star"></i> ${item.rating || '4.8'} (${item.reviewsCount || 50}+)</span>
          <span>•</span>
          <span class="card-location"><i class="fa-solid fa-location-dot" style="color:#ef4444;"></i> ${item.kecamatan}</span>
        </div>

        <p class="card-description">${item.deskripsi}</p>

        <div class="card-tags">
          ${(item.tags || []).slice(0, 3).map(tag => `<span class="card-tag" onclick="filterByTag('${tag}', event)">#${tag}</span>`).join("")}
        </div>

        <div style="font-size: 0.95rem; font-weight: 800; color: var(--primary); margin-bottom: 12px;">
          ${item.harga || 'Hubungi Kami'}
        </div>

        <div class="card-footer">
          <a href="${waUrl}" target="_blank" class="btn-wa-action" title="Chat WhatsApp Pemilik">
            <i class="fa-brands fa-whatsapp"></i> Chat WA
          </a>
          <button class="btn-detail-action" onclick="openDetailModal('${item.id}')" title="Lihat Profil Lengkap">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <a href="${gmapsUrl}" target="_blank" class="btn-detail-action" title="Buka Rute Google Maps">
            <i class="fa-solid fa-diamond-turn-right" style="color:#2563eb;"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

// List Item Template (Sebatam Style Row)
function renderListItemHTML(item) {
  const isBookmarked = bookmarkedIds.includes(item.id);
  const waUrl = getWhatsAppDirectUrl(item);
  const gmapsUrl = getGoogleMapsRouteUrl(item);

  return `
    <div class="list-row-item">
      <div class="list-profile-wrap">
        <img src="${item.foto}" alt="${item.nama}" class="list-profile-img" onerror="this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80'">
      </div>

      <div class="list-content-wrap">
        <h3 class="list-title">
          <span>${item.nama}</span>
          ${item.isFeatured ? '<span class="badge-featured" style="position:static; padding:2px 8px; font-size:0.65rem;"><i class="fa-solid fa-crown"></i> PRO</span>' : ''}
          ${item.is24Jam ? '<span class="badge-featured" style="position:static; padding:2px 8px; font-size:0.65rem; background:#dc2626;"><i class="fa-solid fa-clock"></i> 24 JAM</span>' : ''}
        </h3>

        <p class="list-desc">${item.deskripsi}</p>

        <div class="list-meta-info">
          <span><i class="fa-solid fa-tag" style="color:var(--primary)"></i> ${item.kategoriLabel || item.kategori}</span>
          <span><i class="fa-solid fa-location-dot" style="color:#ef4444"></i> ${item.kecamatan}, Batam</span>
          <span><i class="fa-solid fa-clock" style="color:#10b981"></i> ${item.jamBuka || 'Buka Setiap Hari'}</span>
          <span><i class="fa-solid fa-star" style="color:#f59e0b"></i> ${item.rating || '4.8'} (${item.reviewsCount || 0} ulasan)</span>
        </div>
      </div>

      <div class="list-action-wrap">
        <div class="list-price-text">${item.harga || 'Hubungi Kami'}</div>
        <a href="${waUrl}" target="_blank" class="btn-wa-action">
          <i class="fa-brands fa-whatsapp"></i> Chat WA
        </a>
        <div style="display: flex; gap: 6px; justify-content: flex-end;">
          <a href="${gmapsUrl}" target="_blank" class="btn-gmaps" title="Buka Rute Maps">
            <i class="fa-solid fa-location-arrow"></i> Rute
          </a>
          <button class="btn-detail-action" style="padding: 6px 12px;" onclick="openDetailModal('${item.id}')">
            Detail
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- 10. URL BUILDERS ---
function getWhatsAppDirectUrl(item) {
  const cleanPhone = (item.whatsapp || item.telepon || "6281270889900").replace(/[^0-9]/g, "");
  const formattedPhone = cleanPhone.startsWith("0") ? "62" + cleanPhone.substring(1) : cleanPhone;
  
  let text = "";
  if (item.kategori === "loker") {
    text = encodeURIComponent(
      `Halo HRD / Rekruter *${item.perusahaan || item.nama}*,\n\n` +
      `Saya melihat lowongan pekerjaan: *${item.nama}* di ${item.kecamatan}, Batam melalui *SEBATAM Super-Portal*.\n\n` +
      `Saya sangat tertarik untuk melamar posisi ini. Apakah lowongan ini masih membuka penerimaan kandidat?\n\n` +
      `Mohon arahan proses pengiriman berkas/interview. Terima kasih!`
    );
  } else if (item.kategori === "pencarikerja") {
    text = encodeURIComponent(
      `Halo *${item.nama}*,\n\n` +
      `Kami melihat profil/CV Anda di *SEBATAM Talent Pool* dan tertarik dengan kualifikasi Anda.\n\n` +
      `Apakah Anda saat ini masih bersedia untuk proses seleksi / interview kerja di Batam?\n\n` +
      `Terima kasih!`
    );
  } else {
    text = encodeURIComponent(
      `Halo *${item.nama}*, saya menemukan informasi usaha/jasa Anda melalui *SEBATAM Super-Portal*.\n\n` +
      `📍 Lokasi: ${item.kecamatan}, Batam\n` +
      `📝 Layanan: ${item.kategoriLabel || item.kategori}\n` +
      `Saya ingin menanyakan detail pemesanan & ketersediaan. Terima kasih!`
    );
  }

  return `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${text}`;
}

function getGoogleMapsRouteUrl(item) {
  if (item.lat && item.lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;
  }
  const query = encodeURIComponent(`${item.nama} ${item.kecamatan} Batam`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// --- 11. VIEW MODE & TAG FILTER ---
function setViewMode(mode) {
  currentViewMode = mode;
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === mode);
  });
  applyFilterAndRender();
}

function filterByTag(tag, event) {
  if (event) event.stopPropagation();
  const searchInput = document.getElementById("mainSearchInput");
  if (searchInput) searchInput.value = tag;
  searchQuery = tag.toLowerCase();
  applyFilterAndRender();
  showToast(`Memfilter tagar: #${tag}`);
}

// --- 12. MAP INTEGRATION (LEAFLET OSM) ---
function initLeafletMap() {
  if (leafletMap) return;

  const mapElem = document.getElementById("mapContainer");
  if (!mapElem) return;

  leafletMap = L.map("mapContainer").setView([1.1200, 104.0300], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
  }).addTo(leafletMap);

  markersLayer = L.layerGroup().addTo(leafletMap);
}

function updateMapMarkers(items) {
  if (!leafletMap || !markersLayer) return;

  markersLayer.clearLayers();

  items.forEach(item => {
    if (item.lat && item.lng) {
      const marker = L.marker([item.lat, item.lng]);
      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; max-width: 240px;">
          <h4 style="font-size: 14px; margin-bottom: 4px; font-weight: 800; color: #0f172a;">${item.nama}</h4>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 6px;">📍 ${item.kecamatan} • <strong>${item.harga || ''}</strong></p>
          <div style="display: flex; gap: 6px;">
            <a href="${getWhatsAppDirectUrl(item)}" target="_blank" style="flex:1; text-align:center; background: #25d366; color: white; padding: 5px 8px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 11px;">
              <i class="fa-brands fa-whatsapp"></i> Chat WA
            </a>
            <a href="${getGoogleMapsRouteUrl(item)}" target="_blank" style="background: #2563eb; color: white; padding: 5px 8px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 11px;">
              <i class="fa-solid fa-location-arrow"></i>
            </a>
          </div>
        </div>
      `;
      marker.bindPopup(popupContent);
      markersLayer.addLayer(marker);
    }
  });

  leafletMap.invalidateSize();
}

// --- 13. BOOKMARK / FAVORIT ---
function toggleBookmark(id, event) {
  if (event) event.stopPropagation();

  const idx = bookmarkedIds.indexOf(id);
  if (idx > -1) {
    bookmarkedIds.splice(idx, 1);
    showToast("Dihapus dari daftar favorit.");
  } else {
    bookmarkedIds.push(id);
    showToast("Disimpan ke daftar favorit ❤️");
  }

  saveBookmarksToStorage();
  applyFilterAndRender();
}

function showOnlyBookmarks() {
  selectMainMenu("favorit");
}

function resetAllFilters() {
  activeCategory = "all";
  activeArea = "";
  searchQuery = "";
  filterFeaturedOnly = false;
  filter24JamOnly = false;
  filterVerifiedOnly = false;
  filterFavoritesOnly = false;
  
  const searchInput = document.getElementById("mainSearchInput");
  const areaSelect = document.getElementById("areaSelect");
  if (searchInput) searchInput.value = "";
  if (areaSelect) areaSelect.value = "";

  setHeadingText("Katalog Direktori Batam");

  // Highlight Direktori in sidebar
  document.querySelectorAll("#sidebarCategoryList .sidebar-nav-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".sidebar-nav-list .sidebar-nav-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById("navBtnDirektori")?.classList.add("active");

  renderSidebarCategories();
  renderDistrictChips();
  applyFilterAndRender();
  showToast("Filter direset ke katalog awal.");
}

// --- 14. DETAIL MODAL & SHARING ---
function openDetailModal(id) {
  const item = listingsData.find(x => x.id === id);
  if (!item) return;

  const modalBody = document.getElementById("detailModalBody");
  const modalTitle = document.getElementById("detailModalTitle");
  const waBtn = document.getElementById("detailWaBtn");

  const isCv = item.kategori === "pencarikerja";
  const isLoker = item.kategori === "loker";

  if (modalTitle) {
    if (isCv) {
      modalTitle.innerHTML = `<i class="fa-solid fa-user-tie" style="color:#06b6d4;"></i> Profil & CV Kandidat: ${item.nama}`;
    } else if (isLoker) {
      modalTitle.innerHTML = `<i class="fa-solid fa-briefcase" style="color:#10b981;"></i> Info Lowongan Kerja: ${item.nama}`;
    } else {
      modalTitle.innerHTML = item.nama;
    }
  }

  if (waBtn) {
    waBtn.href = getWhatsAppDirectUrl(item);
    if (isCv) {
      waBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Hubungi / Rekrut Kandidat`;
    } else if (isLoker) {
      waBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Lamar via WhatsApp HRD`;
    } else {
      waBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Hubungi WhatsApp`;
    }
  }

  // Collect all valid photos (up to 6 photos)
  const photos = [item.foto, item.foto2, item.foto3, item.foto4, item.foto5, item.foto6].filter(p => p && p.trim() !== "");

  if (modalBody) {
    modalBody.innerHTML = `
      <!-- Main Photo & Gallery Viewer -->
      <div style="margin-bottom: 16px;">
        <div style="border-radius: 16px; overflow: hidden; height: 260px; background: #0f172a; position: relative; display: flex; align-items: center; justify-content: center;">
          <img id="detailMainImg" src="${photos[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80'}" alt="${item.nama}" style="width: 100%; height: 100%; object-fit: contain; background: #1e293b;">
          ${item.is24Jam ? '<span class="badge-featured" style="background:#dc2626;"><i class="fa-solid fa-clock"></i> SIAGA 24 JAM</span>' : ''}
          ${isCv ? '<span class="badge-featured" style="background:#06b6d4;"><i class="fa-solid fa-graduation-cap"></i> TALENTA TERVERIFIKASI</span>' : ''}
          ${isLoker ? '<span class="badge-featured" style="background:#10b981;"><i class="fa-solid fa-briefcase"></i> LOWONGAN KERJA AKTIF</span>' : ''}
        </div>

        ${photos.length > 1 ? `
          <div class="cv-gallery-viewer">
            ${photos.map((p, idx) => `
              <div class="cv-gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="switchDetailPhoto('${p}', this)">
                <img src="${p}" alt="Foto ${idx + 1}" style="width:100%; height:100%; object-fit:cover;">
              </div>
            `).join("")}
          </div>
        ` : ''}
      </div>

      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px; flex-wrap: wrap;">
        <span style="background: ${isCv ? '#e0f2fe' : isLoker ? '#dcfce7' : 'var(--primary-light)'}; color: ${isCv ? '#0369a1' : isLoker ? '#15803d' : 'var(--primary-dark)'}; padding: 4px 12px; border-radius: 999px; font-weight: 700; font-size: 0.8rem;">
          ${item.kategoriLabel || item.kategori}
        </span>
        ${item.perusahaan ? `
          <span style="background: #f1f5f9; color: #334155; padding: 4px 10px; border-radius: 999px; font-weight: 700; font-size: 0.8rem;">
            <i class="fa-solid fa-building"></i> ${item.perusahaan}
          </span>
        ` : ''}
        ${item.tipeKerja ? `
          <span style="background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 999px; font-weight: 700; font-size: 0.8rem;">
            <i class="fa-solid fa-briefcase"></i> ${item.tipeKerja}
          </span>
        ` : ''}
        ${item.pendidikan ? `
          <span style="background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 999px; font-weight: 700; font-size: 0.8rem;">
            <i class="fa-solid fa-user-graduate"></i> ${item.pendidikan}
          </span>
        ` : ''}
        <span style="color: #f59e0b; font-weight: 700; font-size: 0.9rem;">
          <i class="fa-solid fa-star"></i> ${item.rating || '5.0'} (${item.reviewsCount || 1} Review)
        </span>
      </div>

      <!-- Quick Specs Grid -->
      <div class="loker-detail-spec-grid">
        <div class="loker-spec-box">
          <span class="loker-spec-label">${isCv ? 'Gaji Harapan:' : isLoker ? 'Gaji / Upah:' : 'Estimasi Tarif:'}</span>
          <span class="loker-spec-val" style="color:var(--primary); font-size:1.05rem;">${item.harga || 'Negosiasi'}</span>
        </div>
        <div class="loker-spec-box">
          <span class="loker-spec-label">Wilayah Kerja:</span>
          <span class="loker-spec-val"><i class="fa-solid fa-location-dot" style="color:#ef4444"></i> ${item.kecamatan}</span>
        </div>
        <div class="loker-spec-box">
          <span class="loker-spec-label">${isLoker ? 'Batas Lamaran:' : isCv ? 'Kesiapan:' : 'Jam Operasional:'}</span>
          <span class="loker-spec-val"><i class="fa-solid fa-clock" style="color:#10b981"></i> ${item.jamBuka || 'Aktif'}</span>
        </div>
        ${item.pengalaman ? `
          <div class="loker-spec-box">
            <span class="loker-spec-label">Pengalaman:</span>
            <span class="loker-spec-val">${item.pengalaman}</span>
          </div>
        ` : ''}
      </div>

      ${item.kualifikasi ? `
        <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; padding: 14px; margin-bottom: 16px;">
          <h4 style="font-size: 0.92rem; font-weight: 800; color: #10b981; margin-bottom: 8px;">
            <i class="fa-solid fa-clipboard-check"></i> Kualifikasi & Persyaratan:
          </h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; white-space: pre-line;">${item.kualifikasi}</p>
        </div>
      ` : ''}

      <div style="margin-bottom: 16px;">
        <h4 style="font-size: 0.92rem; font-weight: 800; margin-bottom: 6px; color: var(--text-primary);">
          <i class="fa-solid fa-list-check" style="color:var(--primary);"></i> ${isLoker ? 'Tanggung Jawab & Deskripsi Pekerjaan (Jobdesk):' : isCv ? 'Ringkasan Profil & Pengalaman:' : 'Deskripsi Profil Usaha / Jasa:'}
        </h4>
        <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; white-space: pre-line;">${item.deskripsi}</p>
      </div>

      ${item.benefits && item.benefits.length ? `
        <div style="margin-bottom: 16px;">
          <h4 style="font-size: 0.85rem; font-weight: 800; margin-bottom: 8px; color: var(--text-muted);">FASILITAS & BENEFIT:</h4>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${item.benefits.map(b => `<span style="background:rgba(16,185,129,0.12); color:#059669; border:1px solid rgba(16,185,129,0.3); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700;"><i class="fa-solid fa-circle-check"></i> ${b}</span>`).join("")}
          </div>
        </div>
      ` : ''}

      <div style="background: var(--bg-main); padding: 14px; border-radius: 12px; margin-bottom: 18px; border: 1px solid var(--border-color); font-size:0.88rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; flex-wrap:wrap; gap:4px;">
          <span style="color:var(--text-muted); font-weight:700;">Lokasi Lengkap:</span>
          <span style="font-weight:600; color:var(--text-primary);">${item.alamat || item.kecamatan + ', Kota Batam'}</span>
        </div>
        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px;">
          <span style="color:var(--text-muted); font-weight:700;">Kontak Telepon:</span>
          <span><a href="tel:${item.telepon}" style="color:var(--primary); font-weight:700; text-decoration:none;"><i class="fa-solid fa-phone"></i> ${item.telepon}</a></span>
        </div>
        ${item.email ? `
          <div style="display:flex; justify-content:space-between; margin-top:6px; flex-wrap:wrap; gap:4px;">
            <span style="color:var(--text-muted); font-weight:700;">Email Lamaran:</span>
            <span><a href="mailto:${item.email}" style="color:#2563eb; font-weight:700; text-decoration:none;"><i class="fa-solid fa-envelope"></i> ${item.email}</a></span>
          </div>
        ` : ''}
      </div>

      <div style="display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap;">
        <a href="${getGoogleMapsRouteUrl(item)}" target="_blank" class="btn-gmaps" style="flex:1; justify-content:center;">
          <i class="fa-solid fa-diamond-turn-right"></i> Petunjuk Lokasi
        </a>
        <button class="btn-detail-action" style="flex:1;" onclick="shareListing('${item.id}')">
          <i class="fa-solid fa-share-nodes"></i> Bagikan Info
        </button>
        ${item.email ? `
          <a href="mailto:${item.email}?subject=Lamaran%20Pekerjaan%20-%20${encodeURIComponent(item.nama)}" class="btn-detail-action" style="background:#2563eb; color:white; border:none;" title="Kirim CV via Email">
            <i class="fa-solid fa-envelope"></i> Kirim Email
          </a>
        ` : ''}
        ${item.formLink ? `
          <a href="${item.formLink}" target="_blank" class="btn-primary-gradient nav-btn" style="flex:1; justify-content:center; text-decoration:none; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
            <i class="fa-solid fa-file-pen"></i> Form Online
          </a>
        ` : ''}
        ${item.docLink ? `
          <a href="${item.docLink}" target="_blank" class="btn-primary-gradient nav-btn" style="flex:1; justify-content:center; text-decoration:none; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);">
            <i class="fa-solid fa-file-arrow-down"></i> Buka Portofolio
          </a>
        ` : ''}
      </div>

      <div>
        <h4 style="font-size: 0.85rem; font-weight: 800; margin-bottom: 8px; color: var(--text-muted);">TAGAR BIDANG:</h4>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${(item.tags || []).map(t => `<span style="background:var(--bg-card); border:1px solid var(--border-color); padding:3px 10px; border-radius:8px; font-size:0.8rem; font-weight:600; cursor:pointer;" onclick="closeDetailModal(); filterByTag('${t}')">#${t}</span>`).join("")}
        </div>
      </div>
    `;
  }

  const modal = document.getElementById("detailModal");
  if (modal) modal.classList.add("show");
}

function switchDetailPhoto(imgSrc, thumbElem) {
  const mainImg = document.getElementById("detailMainImg");
  if (mainImg) mainImg.src = imgSrc;

  document.querySelectorAll(".cv-gallery-thumb").forEach(t => t.classList.remove("active"));
  if (thumbElem) thumbElem.classList.add("active");
}

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  if (modal) modal.classList.remove("show");
}

function shareListing(id) {
  const item = listingsData.find(x => x.id === id);
  if (!item) return;

  const shareText = `Temukan ${item.nama} (${item.kategoriLabel || item.kategori}) di ${item.kecamatan}, Batam melalui SEBATAM Super-Portal!\nInfo & Pemesanan: https://sebatam.com`;

  if (navigator.share) {
    navigator.share({
      title: item.nama,
      text: shareText,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareText);
    showToast("Teks informasi usaha berhasil disalin ke clipboard!");
  }
}

// --- 15. TAMBAH LISTING MODAL & CRUD ---
function openAddListingModal() {
  const modal = document.getElementById("addListingModal");
  if (modal) modal.classList.add("show");
}

function closeAddListingModal() {
  const modal = document.getElementById("addListingModal");
  if (modal) modal.classList.remove("show");
}

function handleAddListingSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const newListing = {
    id: "sbt-usr-" + Date.now(),
    nama: form.namaUsaha.value.trim(),
    kategori: form.kategoriUsaha.value,
    kategoriLabel: form.kategoriUsaha.options[form.kategoriUsaha.selectedIndex].text,
    kecamatan: form.kecamatanUsaha.value,
    alamat: form.alamatUsaha.value.trim(),
    telepon: form.teleponUsaha.value.trim(),
    whatsapp: form.teleponUsaha.value.trim(),
    harga: form.hargaUsaha.value.trim() || "Hubungi Kami",
    rating: 5.0,
    reviewsCount: 1,
    isFeatured: false,
    isVerified: true,
    is24Jam: form.is24JamUsaha ? form.is24JamUsaha.checked : false,
    lat: KECAMATAN_COORDINATES[form.kecamatanUsaha.value] ? KECAMATAN_COORDINATES[form.kecamatanUsaha.value][0] + (Math.random() - 0.5) * 0.015 : 1.1300,
    lng: KECAMATAN_COORDINATES[form.kecamatanUsaha.value] ? KECAMATAN_COORDINATES[form.kecamatanUsaha.value][1] + (Math.random() - 0.5) * 0.015 : 104.0500,
    foto: form.fotoUsaha.value.trim() || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    jamBuka: form.jamBukaUsaha.value.trim() || "08:00 - 21:00 WIB",
    deskripsi: form.deskripsiUsaha.value.trim(),
    tags: form.tagsUsaha.value.split(",").map(x => x.trim()).filter(Boolean)
  };

  listingsData.unshift(newListing);
  saveListingsToStorage();
  
  form.reset();
  closeAddListingModal();
  applyFilterAndRender();
  showToast("Usaha Anda berhasil didaftarkan di Sebatam Super-Portal! 🎉");
}

// --- 16. MODAL QUICK CALCULATOR BAGI HASIL & SNAP PRINT ---
function openQuickCalcModal() {
  let modal = document.getElementById("quickCalcModal");
  if (modal) {
    modal.classList.add("show");
  }
}

function closeQuickCalcModal() {
  let modal = document.getElementById("quickCalcModal");
  if (modal) {
    modal.classList.remove("show");
  }
}

function calculateSpandukEstimate() {
  const p = parseFloat(document.getElementById("calcPanjang").value) || 0;
  const l = parseFloat(document.getElementById("calcLebar").value) || 0;
  const qty = parseInt(document.getElementById("calcQty").value) || 1;
  const pricePerMeter = parseInt(document.getElementById("calcBahan").value) || 18000;

  const area = p * l;
  const total = area * pricePerMeter * qty;

  const resultElem = document.getElementById("calcResultText");
  if (resultElem) {
    resultElem.innerHTML = `
      <div style="background: var(--primary-light); color: var(--primary-dark); padding: 14px; border-radius: 12px; text-align: center;">
        <span style="font-size: 0.85rem; font-weight: 700;">TOTAL ESTIMASI HARGA CETAK:</span>
        <h3 style="font-size: 1.6rem; font-weight: 800; color: var(--primary); margin: 4px 0;">Rp ${total.toLocaleString("id-ID")}</h3>
        <p style="font-size: 0.8rem;">Luas Total: ${(area * qty).toFixed(2)} m² (${qty} Pcs)</p>
      </div>
    `;
  }
}

// --- 17. BACKUP & EXPORT/IMPORT JSON ---
function exportListingsJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(listingsData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `sebatam_portal_data_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Database direktori berhasil diekspor ke format JSON!");
}

function importListingsJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        listingsData = imported;
        saveListingsToStorage();
        applyFilterAndRender();
        showToast(`Berhasil mengimpor ${imported.length} data usaha!`);
      } else {
        alert("Format JSON tidak valid!");
      }
    } catch (err) {
      alert("Gagal membaca file JSON.");
    }
  };
  reader.readAsText(file);
}

// --- 18. MOBILE DRAWER NAVIGATION ---
function toggleMobileDrawer() {
  const drawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("mobileDrawerBackdrop");
  if (drawer && backdrop) {
    drawer.classList.toggle("open");
    backdrop.classList.toggle("open");
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("mobileDrawerBackdrop");
  if (drawer && backdrop) {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
  }
}

// --- 19. THEME TOGGLER (DARK / LIGHT) ---
function initTheme() {
  const savedTheme = localStorage.getItem("sebatam_portal_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const nextTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("sebatam_portal_theme", nextTheme);
  updateThemeIcon(nextTheme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;
  btn.innerHTML = theme === "dark" 
    ? '<i class="fa-solid fa-sun" style="color:#fbbf24;"></i>' 
    : '<i class="fa-solid fa-moon"></i>';
}

// --- 20. TOAST NOTIFICATION ---
function showToast(message) {
  let toast = document.getElementById("toastNotice");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotice";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> ${message}`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// --- 21. MODAL KONSULTASI & ESTIMASI BUAT APLIKASI ---
function openAppDevModal() {
  const modal = document.getElementById("appDevModal");
  if (modal) {
    calculateAppDevEstimate();
    modal.classList.add("show");
  }
}

function closeAppDevModal() {
  const modal = document.getElementById("appDevModal");
  if (modal) modal.classList.remove("show");
}

function calculateAppDevEstimate() {
  const select = document.getElementById("appTypeSelect");
  if (!select) return;

  const basePrice = parseInt(select.value) || 0;
  const typeLabel = select.options[select.selectedIndex]?.dataset.label || select.options[select.selectedIndex]?.text;

  let addonPrice = 0;
  const addonsSelected = [];

  const addonThermal = document.getElementById("addonThermal");
  if (addonThermal && addonThermal.checked) {
    addonPrice += parseInt(addonThermal.value);
    addonsSelected.push("Cetak Struk Thermal Bluetooth");
  }

  const addonWaApi = document.getElementById("addonWaApi");
  if (addonWaApi && addonWaApi.checked) {
    addonPrice += parseInt(addonWaApi.value);
    addonsSelected.push("Notifikasi WA Gateway");
  }

  const addonExport = document.getElementById("addonExport");
  if (addonExport && addonExport.checked) {
    addonPrice += parseInt(addonExport.value);
    addonsSelected.push("Laporan Laba Rugi & Excel");
  }

  const addonDomain = document.getElementById("addonDomain");
  if (addonDomain && addonDomain.checked) {
    addonPrice += parseInt(addonDomain.value);
    addonsSelected.push("Domain .COM + Server Cloud 1 Thn");
  }

  const total = basePrice + addonPrice;

  const resultElem = document.getElementById("appDevResultText");
  if (resultElem) {
    resultElem.innerHTML = `
      <div style="background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(79,70,229,0.15)); border: 1px solid rgba(99,102,241,0.3); color: var(--text-primary); padding: 14px; border-radius: 12px; text-align: center;">
        <span style="font-size: 0.8rem; font-weight: 700; color: #6366f1; text-transform: uppercase;">ESTIMASI INVESTASI APLIKASI:</span>
        <h3 style="font-size: 1.6rem; font-weight: 800; color: #4f46e5; margin: 4px 0;">Rp ${total.toLocaleString("id-ID")}</h3>
        <p style="font-size: 0.82rem; color: var(--text-secondary);">Paket: <strong>${typeLabel}</strong> ${addonsSelected.length ? ' • ' + addonsSelected.length + ' Fitur Tambahan' : ''}</p>
      </div>
    `;
  }
}

function sendAppDevOrderWhatsApp() {
  const select = document.getElementById("appTypeSelect");
  const typeLabel = select ? select.options[select.selectedIndex]?.dataset.label : "Aplikasi Kasir POS";
  const name = document.getElementById("appClientName")?.value.trim() || "Calon Klien";
  const clientWa = document.getElementById("appClientWa")?.value.trim() || "-";
  const notes = document.getElementById("appClientNotes")?.value.trim() || "Ingin konsultasi fitur detail";

  const addons = [];
  if (document.getElementById("addonThermal")?.checked) addons.push("Cetak Struk Thermal");
  if (document.getElementById("addonWaApi")?.checked) addons.push("WhatsApp Gateway");
  if (document.getElementById("addonExport")?.checked) addons.push("Ekspor Excel & Laporan");
  if (document.getElementById("addonDomain")?.checked) addons.push("Domain .COM + Cloud");

  const text = encodeURIComponent(
    `Halo *Gigin Tech Developer (Sebatam)*,\n\n` +
    `Saya tertarik untuk membuat aplikasi/website untuk bisnis saya di Batam.\n\n` +
    `👤 *Nama*: ${name}\n` +
    `📱 *Kontak*: ${clientWa}\n` +
    `💻 *Jenis Aplikasi*: ${typeLabel}\n` +
    `✨ *Add-on*: ${addons.join(", ") || "Standar"}\n` +
    `📝 *Catatan Kebutuhan*: ${notes}\n\n` +
    `Mohon info ketersediaan konsultasi & proposal pengembangannya. Terima kasih!`
  );

  window.open(`https://api.whatsapp.com/send?phone=6281270889900&text=${text}`, "_blank");
  closeAppDevModal();
  showToast("Membuka WhatsApp Konsultasi Pembuatan Aplikasi...");
}

// --- 22. MODAL CV & UPLOAD PROFIL PENCARI KERJA BATAM ---
function openCvUploadModal() {
  const modal = document.getElementById("cvUploadModal");
  if (modal) {
    modal.classList.add("show");
  }
}

function closeCvUploadModal() {
  const modal = document.getElementById("cvUploadModal");
  if (modal) {
    modal.classList.remove("show");
  }
}

function triggerCvFileInput(slotNum) {
  const fileInput = document.getElementById(`cvFileInput${slotNum}`);
  if (fileInput) fileInput.click();
}

function handleCvFileSelect(slotNum, event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("Ukuran file foto maksimal 5 MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUri = e.target.result;
    const valInput = document.getElementById(`cvPhotoVal${slotNum}`);
    if (valInput) valInput.value = dataUri;

    const slot = document.getElementById(`cvSlot${slotNum}`);
    if (slot) {
      slot.classList.add("has-photo");
      slot.innerHTML = `
        <img src="${dataUri}" class="cv-photo-preview-img" alt="Foto ${slotNum}">
        <button type="button" class="cv-photo-remove-btn" onclick="removeCvPhoto(${slotNum}, event)" title="Hapus foto">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <input type="file" id="cvFileInput${slotNum}" accept="image/*" style="display: none;" onchange="handleCvFileSelect(${slotNum}, event)" />
        <input type="hidden" id="cvPhotoVal${slotNum}" value="${dataUri}" />
      `;
    }
  };
  reader.readAsDataURL(file);
}

function handleCvUrlInput(url) {
  const cleanUrl = url.trim();
  const valInput = document.getElementById("cvPhotoVal1");
  if (valInput) valInput.value = cleanUrl;

  if (cleanUrl) {
    const slot = document.getElementById("cvSlot1");
    if (slot) {
      slot.classList.add("has-photo");
      slot.innerHTML = `
        <img src="${cleanUrl}" class="cv-photo-preview-img" alt="Foto Profil" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'">
        <button type="button" class="cv-photo-remove-btn" onclick="removeCvPhoto(1, event)" title="Hapus foto">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <input type="file" id="cvFileInput1" accept="image/*" style="display: none;" onchange="handleCvFileSelect(1, event)" />
        <input type="hidden" id="cvPhotoVal1" value="${cleanUrl}" />
      `;
    }
  }
}

function removeCvPhoto(slotNum, event) {
  if (event) event.stopPropagation();

  const slot = document.getElementById(`cvSlot${slotNum}`);
  if (!slot) return;

  slot.classList.remove("has-photo");

  let defaultIcon = "fa-user-circle";
  let defaultColor = "#06b6d4";
  let defaultLabel = "Foto Profil Utama *";

  if (slotNum === 2) {
    defaultIcon = "fa-award";
    defaultColor = "#f59e0b";
    defaultLabel = "Portofolio / Sertifikat #1";
  } else if (slotNum === 3) {
    defaultIcon = "fa-briefcase";
    defaultColor = "#10b981";
    defaultLabel = "Portofolio / Sertifikat #2";
  }

  slot.innerHTML = `
    <i class="fa-solid ${defaultIcon}" style="font-size: 2rem; color: ${defaultColor}; margin-bottom: 6px;"></i>
    <span style="font-size: 0.78rem; font-weight: 700;">${defaultLabel}</span>
    <span style="font-size: 0.68rem; color: var(--text-muted);">Klik untuk upload</span>
    <input type="file" id="cvFileInput${slotNum}" accept="image/*" style="display: none;" onchange="handleCvFileSelect(${slotNum}, event)" />
    <input type="hidden" id="cvPhotoVal${slotNum}" value="" />
  `;
}

function toggleCvSkillChip(elem, skillName) {
  elem.classList.toggle("selected");

  const inputElem = document.getElementById("cvSkillTags");
  if (!inputElem) return;

  let currentTags = inputElem.value.split(",").map(t => t.trim()).filter(Boolean);

  if (elem.classList.contains("selected")) {
    if (!currentTags.includes(skillName)) {
      currentTags.push(skillName);
    }
  } else {
    currentTags = currentTags.filter(t => t.toLowerCase() !== skillName.toLowerCase());
  }

  inputElem.value = currentTags.join(", ");
}

function updateCvLivePreview() {
  // Can be expanded for live CV card preview if needed
}

function handleCvFormSubmit(e) {
  e.preventDefault();

  const nama = document.getElementById("cvNama")?.value.trim();
  const posisi = document.getElementById("cvPosisi")?.value.trim();
  const wa = document.getElementById("cvWa")?.value.trim();
  const kecamatan = document.getElementById("cvKecamatan")?.value || "Batam Kota";
  const pendidikan = document.getElementById("cvPendidikan")?.value || "SMA / SMK Sederajat";
  const gaji = document.getElementById("cvGaji")?.value.trim();
  const statusKerja = document.getElementById("cvStatusKerja")?.value || "Status: Siap Kerja Segera";
  const pengalaman = document.getElementById("cvPengalaman")?.value.trim();
  const docLink = document.getElementById("cvDocLink")?.value.trim();

  const foto1 = document.getElementById("cvPhotoVal1")?.value.trim() || document.getElementById("cvUrlInput1")?.value.trim();
  const foto2 = document.getElementById("cvPhotoVal2")?.value.trim();
  const foto3 = document.getElementById("cvPhotoVal3")?.value.trim();

  // Combine skill tags
  const manualTags = document.getElementById("cvSkillTags")?.value.split(",").map(t => t.trim()).filter(Boolean) || [];
  const allTags = Array.from(new Set(["Pencari Kerja", posisi, pendidikan, kecamatan, ...manualTags]));

  const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80";

  const newCvListing = {
    id: "sbt-cv-" + Date.now(),
    nama: `${nama} - ${posisi}`,
    kategori: "pencarikerja",
    kategoriLabel: "Pencari Kerja & Talenta",
    kecamatan: kecamatan,
    alamat: `Domisili: ${kecamatan}, Kota Batam`,
    telepon: wa,
    whatsapp: wa,
    harga: gaji ? `Gaji Harapan: ${gaji}` : "Gaji: Negosiasi",
    rating: 5.0,
    reviewsCount: 1,
    isFeatured: true,
    isVerified: true,
    is24Jam: false,
    lat: KECAMATAN_COORDINATES[kecamatan] ? KECAMATAN_COORDINATES[kecamatan][0] + (Math.random() - 0.5) * 0.015 : 1.1300,
    lng: KECAMATAN_COORDINATES[kecamatan] ? KECAMATAN_COORDINATES[kecamatan][1] + (Math.random() - 0.5) * 0.015 : 104.0500,
    foto: foto1 || defaultAvatar,
    foto2: foto2 || "",
    foto3: foto3 || "",
    pendidikan: pendidikan,
    docLink: docLink || "",
    jamBuka: statusKerja,
    deskripsi: `Profil Kandidat (${pendidikan}): ${pengalaman}`,
    tags: allTags
  };

  listingsData.unshift(newCvListing);
  saveListingsToStorage();

  // Reset form
  const form = document.getElementById("cvUploadForm");
  if (form) form.reset();

  removeCvPhoto(1);
  removeCvPhoto(2);
  removeCvPhoto(3);
  document.querySelectorAll(".skill-select-chip").forEach(c => c.classList.remove("selected"));

  closeCvUploadModal();

  // Navigate to Pencari Kerja category to show newly added CV immediately
  selectMainMenu("pencarikerja");
  showToast("🎉 Format CV Anda berhasil diterbitkan ke bursa bakat Sebatam!");
}

// --- 23. MODAL PASANG IKLAN LOWONGAN KERJA & JASA BATAM ---
function openJobPostModal() {
  const modal = document.getElementById("jobPostModal");
  if (modal) {
    modal.classList.add("show");
  }
}

function closeJobPostModal() {
  const modal = document.getElementById("jobPostModal");
  if (modal) {
    modal.classList.remove("show");
  }
}

function setJobTypeSelection(type) {
  const cardLoker = document.getElementById("jobRadioCardLoker");
  const cardJasa = document.getElementById("jobRadioCardJasa");
  const perusahaanLabel = document.getElementById("jobPerusahaanLabel");
  const judulLabel = document.getElementById("jobJudulLabel");
  const gajiLabel = document.getElementById("jobGajiLabel");

  if (type === "loker") {
    if (cardLoker) cardLoker.classList.add("active");
    if (cardJasa) cardJasa.classList.remove("active");
    if (perusahaanLabel) perusahaanLabel.textContent = "Nama Perusahaan / Brand Usaha *";
    if (judulLabel) judulLabel.textContent = "Posisi / Judul Iklan Lowongan *";
    if (gajiLabel) gajiLabel.textContent = "Gaji / Upah Ditawarkan (Per Bulan/Proyek) *";
  } else {
    if (cardJasa) cardJasa.classList.add("active");
    if (cardLoker) cardLoker.classList.remove("active");
    if (perusahaanLabel) perusahaanLabel.textContent = "Nama Penyedia Jasa / Brand Usaha *";
    if (judulLabel) judulLabel.textContent = "Nama Layanan / Jasa Spesialis *";
    if (gajiLabel) gajiLabel.textContent = "Estimasi Tarif / Biaya Layanan Jasa *";
  }
}

function triggerJobFileInput(slotNum) {
  const fileInput = document.getElementById(`jobFileInput${slotNum}`);
  if (fileInput) fileInput.click();
}

function handleJobFileSelect(slotNum, event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("Ukuran file foto maksimal 5 MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUri = e.target.result;
    const valInput = document.getElementById(`jobPhotoVal${slotNum}`);
    if (valInput) valInput.value = dataUri;

    const slot = document.getElementById(`jobSlot${slotNum}`);
    if (slot) {
      slot.classList.add("has-photo");
      slot.innerHTML = `
        <img src="${dataUri}" class="cv-photo-preview-img" alt="Flyer ${slotNum}">
        <button type="button" class="cv-photo-remove-btn" onclick="removeJobPhoto(${slotNum}, event)" title="Hapus foto">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <input type="file" id="jobFileInput${slotNum}" accept="image/*" style="display: none;" onchange="handleJobFileSelect(${slotNum}, event)" />
        <input type="hidden" id="jobPhotoVal${slotNum}" value="${dataUri}" />
      `;
    }
  };
  reader.readAsDataURL(file);
}

function handleJobUrlInput(url) {
  const cleanUrl = url.trim();
  const valInput = document.getElementById("jobPhotoVal1");
  if (valInput) valInput.value = cleanUrl;

  if (cleanUrl) {
    const slot = document.getElementById("jobSlot1");
    if (slot) {
      slot.classList.add("has-photo");
      slot.innerHTML = `
        <img src="${cleanUrl}" class="cv-photo-preview-img" alt="Poster Loker" onerror="this.src='https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=80'">
        <button type="button" class="cv-photo-remove-btn" onclick="removeJobPhoto(1, event)" title="Hapus foto">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <input type="file" id="jobFileInput1" accept="image/*" style="display: none;" onchange="handleJobFileSelect(1, event)" />
        <input type="hidden" id="jobPhotoVal1" value="${cleanUrl}" />
      `;
    }
  }
}

function removeJobPhoto(slotNum, event) {
  if (event) event.stopPropagation();

  const slot = document.getElementById(`jobSlot${slotNum}`);
  if (!slot) return;

  slot.classList.remove("has-photo");

  let defaultIcon = "fa-bullhorn";
  let defaultColor = "#10b981";
  let defaultLabel = "Poster / Flyer Utama *";
  let defaultSub = "Klik pilih JPG/PNG";

  if (slotNum === 2) {
    defaultIcon = "fa-building";
    defaultColor = "#0ea5e9";
    defaultLabel = "Gedung / Kantor #1";
    defaultSub = "Klik untuk upload";
  } else if (slotNum === 3) {
    defaultIcon = "fa-laptop-code";
    defaultColor = "#6366f1";
    defaultLabel = "Ruang Kerja / Workshop #2";
    defaultSub = "Klik untuk upload";
  } else if (slotNum === 4) {
    defaultIcon = "fa-couch";
    defaultColor = "#a855f7";
    defaultLabel = "Fasilitas / Mess #3";
    defaultSub = "Klik untuk upload";
  } else if (slotNum === 5) {
    defaultIcon = "fa-users-gear";
    defaultColor = "#f59e0b";
    defaultLabel = "Aktivitas Tim / Proyek #4";
    defaultSub = "Klik untuk upload";
  } else if (slotNum === 6) {
    defaultIcon = "fa-file-shield";
    defaultColor = "#059669";
    defaultLabel = "Legalitas / Sertifikat #5";
    defaultSub = "Klik untuk upload";
  }

  slot.innerHTML = `
    <i class="fa-solid ${defaultIcon}" style="font-size: 1.8rem; color: ${defaultColor}; margin-bottom: 6px;"></i>
    <span style="font-size: 0.78rem; font-weight: 700;">${defaultLabel}</span>
    <span style="font-size: 0.68rem; color: var(--text-muted);">${defaultSub}</span>
    <input type="file" id="jobFileInput${slotNum}" accept="image/jpeg,image/png,image/webp,image/*" style="display: none;" onchange="handleJobFileSelect(${slotNum}, event)" />
    <input type="hidden" id="jobPhotoVal${slotNum}" value="" />
  `;
}

function toggleJobBenefitChip(elem, benefitName) {
  elem.classList.toggle("selected");

  const inputElem = document.getElementById("jobBenefitText");
  if (!inputElem) return;

  let currentBenefits = inputElem.value.split(",").map(t => t.trim()).filter(Boolean);

  if (elem.classList.contains("selected")) {
    if (!currentBenefits.includes(benefitName)) {
      currentBenefits.push(benefitName);
    }
  } else {
    currentBenefits = currentBenefits.filter(t => t.toLowerCase() !== benefitName.toLowerCase());
  }

  inputElem.value = currentBenefits.join(", ");
}

function handleJobPostFormSubmit(e) {
  e.preventDefault();

  const perusahaan = document.getElementById("jobPerusahaan")?.value.trim();
  const judul = document.getElementById("jobJudul")?.value.trim();
  const kategoriSelect = document.getElementById("jobKategoriSelect");
  const subBidangLabel = kategoriSelect ? kategoriSelect.options[kategoriSelect.selectedIndex].text : "Lowongan Kerja";
  const kecamatan = document.getElementById("jobKecamatan")?.value || "Batam Kota";
  const alamat = document.getElementById("jobAlamat")?.value.trim() || `Kawasan ${kecamatan}, Kota Batam`;
  const tipeKerja = document.getElementById("jobTipeKerja")?.value || "Full Time";
  const gaji = document.getElementById("jobGaji")?.value.trim() || "Gaji Sesuai Standar UMK";
  const pendidikan = document.getElementById("jobPendidikan")?.value || "SMA / SMK Sederajat";
  const pengalaman = document.getElementById("jobPengalaman")?.value || "Fresh Graduate";
  const kualifikasi = document.getElementById("jobKualifikasi")?.value.trim();
  const deskripsi = document.getElementById("jobDeskripsi")?.value.trim();
  const deadline = document.getElementById("jobDeadline")?.value.trim() || "Dibutuhkan Segera";
  const wa = document.getElementById("jobWa")?.value.trim();
  const email = document.getElementById("jobEmail")?.value.trim();
  const formLink = document.getElementById("jobFormLink")?.value.trim();

  const manualBenefits = document.getElementById("jobBenefitText")?.value.split(",").map(t => t.trim()).filter(Boolean) || [];

  const foto1 = document.getElementById("jobPhotoVal1")?.value.trim() || document.getElementById("jobUrlInput1")?.value.trim();
  const foto2 = document.getElementById("jobPhotoVal2")?.value.trim();
  const foto3 = document.getElementById("jobPhotoVal3")?.value.trim();
  const foto4 = document.getElementById("jobPhotoVal4")?.value.trim();
  const foto5 = document.getElementById("jobPhotoVal5")?.value.trim();
  const foto6 = document.getElementById("jobPhotoVal6")?.value.trim();

  const defaultJobPhoto = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=80";

  const allTags = Array.from(new Set([
    "Lowongan Kerja",
    "Loker Batam",
    judul,
    perusahaan,
    kecamatan,
    tipeKerja,
    pendidikan
  ]));

  const newJobListing = {
    id: "sbt-job-" + Date.now(),
    nama: `Lowongan: ${judul} - ${perusahaan}`,
    perusahaan: perusahaan,
    kategori: "loker",
    kategoriLabel: "Lowongan Kerja (Loker)",
    subBidang: subBidangLabel,
    kecamatan: kecamatan,
    alamat: alamat,
    telepon: wa,
    whatsapp: wa,
    harga: gaji.toLowerCase().startsWith("gaji") || gaji.toLowerCase().startsWith("upah") || gaji.toLowerCase().startsWith("rp") ? gaji : `Gaji: ${gaji}`,
    rating: 5.0,
    reviewsCount: 1,
    isFeatured: true,
    isVerified: true,
    is24Jam: tipeKerja.includes("24 Jam") || tipeKerja.includes("Shift"),
    lat: KECAMATAN_COORDINATES[kecamatan] ? KECAMATAN_COORDINATES[kecamatan][0] + (Math.random() - 0.5) * 0.015 : 1.1300,
    lng: KECAMATAN_COORDINATES[kecamatan] ? KECAMATAN_COORDINATES[kecamatan][1] + (Math.random() - 0.5) * 0.015 : 104.0500,
    foto: foto1 || defaultJobPhoto,
    foto2: foto2 || "",
    foto3: foto3 || "",
    foto4: foto4 || "",
    foto5: foto5 || "",
    foto6: foto6 || "",
    tipeKerja: tipeKerja,
    pendidikan: pendidikan,
    pengalaman: pengalaman,
    kualifikasi: kualifikasi,
    deskripsi: deskripsi,
    benefits: manualBenefits,
    jamBuka: deadline.startsWith("Batas") ? deadline : `Batas Lamaran: ${deadline}`,
    email: email || "",
    formLink: formLink || "",
    isJobPost: true,
    tags: allTags
  };

  listingsData.unshift(newJobListing);
  saveListingsToStorage();

  // Reset form
  const form = document.getElementById("jobPostForm");
  if (form) form.reset();

  removeJobPhoto(1);
  removeJobPhoto(2);
  removeJobPhoto(3);
  removeJobPhoto(4);
  removeJobPhoto(5);
  removeJobPhoto(6);
  document.querySelectorAll(".benefit-chip").forEach(c => c.classList.remove("selected"));

  closeJobPostModal();

  // Filter directly to loker
  selectMainMenu("loker");
  showToast("🎉 Iklan Lowongan Kerja (dengan foto) berhasil dipublikasikan ke Bursa Loker Batam!");
}

// Global modal overlay click to close
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("show");
  }
});




