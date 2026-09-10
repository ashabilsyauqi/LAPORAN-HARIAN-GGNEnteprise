/**
 * DATASET KOS-KOSAN INDONESIA (CariKos Web App)
 * Berisi listing realistis di kota-kota besar & dekat kampus terkemuka (Masing-masing 6+ Foto HD).
 */

const INITIAL_KOS_DATA = [
  {
    "id": "kos-001",
    "name": "Kos Graha Asri Eksklusif Tebet",
    "slug": "kos-graha-asri-tebet",
    "type": "Campur",
    "category": "Eksklusif",
    "city": "Jakarta Selatan",
    "district": "Tebet",
    "address": "Jl. Tebet Barat Dalam VII No. 18, Tebet, Jakarta Selatan",
    "nearCampus": "Dekat Stasiun Tebet & Univ. Sahid",
    "lat": -6.2365,
    "lng": 106.8521,
    "priceMonthly": 2300000,
    "priceDaily": 175000,
    "priceYearly": 25000000,
    "deposit": 500000,
    "electricityIncluded": false,
    "roomSize": "3.5 x 4.5 m",
    "availableRooms": 3,
    "totalRooms": 12,
    "rating": 4.8,
    "reviewsCount": 38,
    "ownerName": "Ibu Hj. Rahmawati",
    "ownerPhone": "6281234567801",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Diskon 10% Bulan Pertama",
    "images": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "AC",
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Springbed",
      "Lemari Pakaian",
      "Meja Belajar",
      "Water Heater",
      "Dapur Bersama",
      "Kulkas Bersama",
      "Parkir Mobil",
      "Parkir Motor",
      "CCTV 24 Jam",
      "Bebas 24 Jam"
    ],
    "rules": [
      "Tamu lawan jenis dilarang masuk kamar",
      "Dilarang merokok di dalam kamar ber-AC",
      "Gerbang akses 24 jam dengan fingerprint / kartu akses",
      "Hewan peliharaan tidak diperbolehkan"
    ],
    "description": "Kos eksklusif dan nyaman di jantung Tebet Jakarta Selatan. Akses super strategis hanya 5 menit ke Stasiun Tebet, dikelilingi berbagai kuliner hits, kafe, dan minimarket. Kamar luas dengan perabotan modern, water heater, dan WiFi kencang untuk WFH.",
    "nearbyPlaces": [
      {
        "name": "Stasiun KRL Tebet",
        "distance": "450 m"
      },
      {
        "name": "Tebet Eco Park",
        "distance": "1.2 km"
      },
      {
        "name": "Universitas Sahid Jakarta",
        "distance": "1.8 km"
      },
      {
        "name": "Mall Kota Kasablanka",
        "distance": "2.5 km"
      }
    ],
    "reviews": [
      {
        "user": "Dimas Aditya",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Tempatnya bersih banget, ibu kos ramah, WiFi stabil buat kerja remote."
      },
      {
        "user": "Nabila Putri",
        "rating": 4.8,
        "date": "Juli 2026",
        "comment": "Lokasi strategis banget deket stasiun dan banyak makanan enak."
      }
    ]
  },
  {
    "id": "kos-001b",
    "name": "Kos Putri Mampang Asri Murah",
    "slug": "kos-putri-mampang-asri",
    "type": "Putri",
    "category": "Kos Murah",
    "city": "Jakarta Selatan",
    "district": "Mampang Prapatan",
    "address": "Jl. Mampang Prapatan IV No. 22, Jakarta Selatan",
    "nearCampus": "Dekat Halte Busway & Univ. Paramadina",
    "lat": -6.2482,
    "lng": 106.8298,
    "priceMonthly": 950000,
    "priceDaily": 85000,
    "priceYearly": 10500000,
    "deposit": 200000,
    "electricityIncluded": true,
    "roomSize": "3 x 3 m",
    "availableRooms": 3,
    "totalRooms": 10,
    "rating": 4.75,
    "reviewsCount": 28,
    "ownerName": "Ibu Nurhayati",
    "ownerPhone": "6281388776655",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Hemat & Listrik Gratis",
    "images": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Busa Super",
      "Lemari Pakaian",
      "Meja Belajar",
      "Dapur Bersama",
      "Parkir Motor",
      "Listrik Termasuk",
      "CCTV 24 Jam"
    ],
    "rules": [
      "Khusus mahasiswi & karyawati",
      "Tamu pria dilarang masuk kamar",
      "Jam malam gerbang 23.00 WIB",
      "Lingkungan aman dan tertib"
    ],
    "description": "Kos putri murah dan bersih di Jakarta Selatan. Lokasi tenang di Mampang, dekat akses transportasi umum dan pusat perkantoran Kuningan/Gatot Subroto.",
    "nearbyPlaces": [
      {
        "name": "Halte TransJakarta Mampang",
        "distance": "300 m"
      },
      {
        "name": "Universitas Paramadina",
        "distance": "1.2 km"
      },
      {
        "name": "Kawasan Rasuna Said",
        "distance": "2.0 km"
      }
    ],
    "reviews": [
      {
        "user": "Rina S.",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Sangat bersahabat harganya untuk daerah Jaksel, bersih dan aman."
      }
    ]
  },
  {
    "id": "kos-001c",
    "name": "Kos Putri Kalibata Pancoran Nyaman",
    "slug": "kos-putri-pancoran-nyaman",
    "type": "Putri",
    "category": "Kos Murah",
    "city": "Jakarta Selatan",
    "district": "Pancoran",
    "address": "Jl. Kalibata Timur I No. 14, Pancoran, Jakarta Selatan",
    "nearCampus": "Dekat Stasiun Duren Kalibata & Univ. Trilogi",
    "lat": -6.2555,
    "lng": 106.855,
    "priceMonthly": 850000,
    "priceDaily": 75000,
    "priceYearly": 9500000,
    "deposit": 150000,
    "electricityIncluded": true,
    "roomSize": "3 x 3 m",
    "availableRooms": 2,
    "totalRooms": 12,
    "rating": 4.7,
    "reviewsCount": 33,
    "ownerName": "Ibu Hartati",
    "ownerPhone": "6285711223344",
    "isVerified": true,
    "isPromo": false,
    "promoText": "",
    "images": [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "WiFi Cepat",
      "Kamar Mandi Bersih",
      "Kasur Busa",
      "Lemari Pakaian",
      "Dapur Bersama",
      "Parkir Motor",
      "Listrik Termasuk",
      "Jemuran Luas"
    ],
    "rules": [
      "Khusus putri",
      "Kunci gerbang bawa sendiri",
      "Dilarang membawa hewan peliharaan"
    ],
    "description": "Kos putri budget bersahabat di Pancoran/Kalibata Jaksel. Hanya 5 menit jalan santai ke Stasiun KRL Duren Kalibata dan Mall Kalibata City.",
    "nearbyPlaces": [
      {
        "name": "Stasiun KRL Duren Kalibata",
        "distance": "400 m"
      },
      {
        "name": "Universitas Trilogi",
        "distance": "900 m"
      },
      {
        "name": "Kalibata City Square",
        "distance": "500 m"
      }
    ],
    "reviews": [
      {
        "user": "Fitriani",
        "rating": 4.8,
        "date": "Juli 2026",
        "comment": "Deket stasiun banget, cari makan gampang di Kalibata."
      }
    ]
  },
  {
    "id": "kos-002",
    "name": "Kos Putri Melati Dago ITB",
    "slug": "kos-putri-melati-dago",
    "type": "Putri",
    "category": "Dekat Kampus",
    "city": "Bandung",
    "district": "Coblong",
    "address": "Jl. Kanayakan No. 24, Dago Atas, Bandung",
    "nearCampus": "ITB Ganesha (7 Menit)",
    "lat": -6.8792,
    "lng": 107.6189,
    "priceMonthly": 1650000,
    "priceDaily": 120000,
    "priceYearly": 18000000,
    "deposit": 300000,
    "electricityIncluded": true,
    "roomSize": "3 x 3.5 m",
    "availableRooms": 2,
    "totalRooms": 15,
    "rating": 4.9,
    "reviewsCount": 52,
    "ownerName": "Ibu Ratna Dewi",
    "ownerPhone": "6281298765432",
    "isVerified": true,
    "isPromo": false,
    "promoText": "",
    "images": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "AC",
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Springbed",
      "Lemari Pakaian",
      "Meja Belajar",
      "Dapur Bersama",
      "Dispenser",
      "Parkir Motor",
      "CCTV 24 Jam",
      "Security",
      "Listrik Termasuk",
      "Laundry Kiloan"
    ],
    "rules": [
      "Khusus mahasiswi / karyawati",
      "Jam malam pukul 22.30 WIB untuk tamu",
      "Dilarang membawa rokok & alkohol",
      "Wajib menjaga ketenangan di atas jam 22.00"
    ],
    "description": "Kos khusus putri yang sangat asri, sejuk, dan aman di kawasan Dago Bandung. Hanya berjarak 7 menit jalan santai ke kampus ITB Ganesha. Dikelola langsung oleh pemilik yang perhatian dengan suasana belajar kondusif.",
    "nearbyPlaces": [
      {
        "name": "Institut Teknologi Bandung (ITB)",
        "distance": "600 m"
      },
      {
        "name": "Universitas Padjadjaran (Dipati Ukur)",
        "distance": "1.1 km"
      },
      {
        "name": "Cihampelas Walk",
        "distance": "2.0 km"
      },
      {
        "name": "RS Santo Borromeus",
        "distance": "900 m"
      }
    ],
    "reviews": [
      {
        "user": "Sarah Amanda",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Aman banget buat cewek, ada security dan ibu kosnya baik sering kasih buah!"
      },
      {
        "user": "Fathia Nur",
        "rating": 4.8,
        "date": "Juni 2026",
        "comment": "Udaranya sejuk, internet kenceng, kamar mandinya bersih."
      }
    ]
  },
  {
    "id": "kos-002b",
    "name": "Kos Putri Cisitu Indah ITB",
    "slug": "kos-putri-cisitu-itb",
    "type": "Putri",
    "category": "Kos Murah",
    "city": "Bandung",
    "district": "Coblong",
    "address": "Jl. Cisitu Lama No. 35, Dago, Bandung",
    "nearCampus": "ITB Ganesha (5 Menit Jalan Kaki)",
    "lat": -6.8835,
    "lng": 107.611,
    "priceMonthly": 850000,
    "priceDaily": 70000,
    "priceYearly": 9500000,
    "deposit": 150000,
    "electricityIncluded": true,
    "roomSize": "3 x 3 m",
    "availableRooms": 3,
    "totalRooms": 12,
    "rating": 4.8,
    "reviewsCount": 40,
    "ownerName": "Ibu Eni",
    "ownerPhone": "6281223344556",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Free WiFi & Air Minum",
    "images": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Busa",
      "Lemari Pakaian",
      "Meja Belajar",
      "Dapur Bersama",
      "Parkir Motor",
      "Listrik Termasuk"
    ],
    "rules": [
      "Khusus mahasiswi ITB / Unpad",
      "Jam malam gerbang 23.00 WIB",
      "Dilarang membawa rokok"
    ],
    "description": "Kos mahasiswi favorit di Cisitu Lama Bandung. Jalan kaki 5 menit ke gerbang belakang ITB. Hemat, sejuk, dan dekat warung makan mahasiswa.",
    "nearbyPlaces": [
      {
        "name": "Gerbang Belakang ITB",
        "distance": "400 m"
      },
      {
        "name": "Masjid Salman ITB",
        "distance": "800 m"
      }
    ],
    "reviews": [
      {
        "user": "Tiara",
        "rating": 4.9,
        "date": "Agustus 2026",
        "comment": "Hemat banget buat mahasiswi ITB!"
      }
    ]
  },
  {
    "id": "kos-003",
    "name": "Kos Putra Pogung UGM Asri",
    "slug": "kos-putra-pogung-ugm",
    "type": "Putra",
    "category": "Dekat Kampus",
    "city": "Yogyakarta",
    "district": "Sleman",
    "address": "Pogung Dalangan No. 45B, Sinduadi, Mlati, Sleman, Yogyakarta",
    "nearCampus": "UGM (3 Menit) & UNY",
    "lat": -7.7654,
    "lng": 110.3776,
    "priceMonthly": 1250000,
    "priceDaily": 90000,
    "priceYearly": 13500000,
    "deposit": 200000,
    "electricityIncluded": true,
    "roomSize": "3 x 3 m",
    "availableRooms": 4,
    "totalRooms": 20,
    "rating": 4.7,
    "reviewsCount": 44,
    "ownerName": "Pak Bambang S.",
    "ownerPhone": "6281311223344",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Free Laundry 10kg/bln",
    "images": [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Springbed",
      "Lemari Pakaian",
      "Meja Belajar",
      "Dapur Bersama",
      "Parkir Motor Luas",
      "Bebas 24 Jam",
      "Listrik Termasuk",
      "Balkon Jemuran"
    ],
    "rules": [
      "Khusus putra mahasiswa / karyawan",
      "Kunci gerbang pegang masing-masing (bebas 24 jam)",
      "Menjaga kebersihan area umum & dapur bersama",
      "Dilarang pesta miras / narkoba"
    ],
    "description": "Kos mahasiswa putra legendaris di Pogung dekat Fakultas Teknik & MIPA UGM. Suasana santai dan akrab antar penghuni, lingkungan tenang, bebas jam malam dengan kunci sendiri, dan sudah termasuk listrik & WiFi.",
    "nearbyPlaces": [
      {
        "name": "Fakultas Teknik UGM",
        "distance": "400 m"
      },
      {
        "name": "RSUP Dr. Sardjito",
        "distance": "850 m"
      },
      {
        "name": "UNY (Univ. Negeri Yogyakarta)",
        "distance": "1.5 km"
      },
      {
        "name": "Hartono Mall / Pakuwon Mall Jogja",
        "distance": "2.3 km"
      }
    ],
    "reviews": [
      {
        "user": "Rizky Ramadhan",
        "rating": 4.8,
        "date": "Agustus 2026",
        "comment": "Sangat dekat ke FT UGM, jalan kaki cuma 5 menit. Mantap!"
      },
      {
        "user": "Aldo Wicaksono",
        "rating": 4.6,
        "date": "Mei 2026",
        "comment": "Parkiran motor luas dan aman, internet stabil."
      }
    ]
  },
  {
    "id": "kos-003b",
    "name": "Kos Putri Karangmalang UGM & UNY",
    "slug": "kos-putri-karangmalang-ugm",
    "type": "Putri",
    "category": "Kos Murah",
    "city": "Yogyakarta",
    "district": "Depok Sleman",
    "address": "Jl. Karangmalang Blok C No. 8, Caturtunggal, Depok, Sleman, Yogyakarta",
    "nearCampus": "UGM (5 Menit) & UNY",
    "lat": -7.7712,
    "lng": 110.3845,
    "priceMonthly": 750000,
    "priceDaily": 60000,
    "priceYearly": 8500000,
    "deposit": 100000,
    "electricityIncluded": true,
    "roomSize": "3 x 3 m",
    "availableRooms": 3,
    "totalRooms": 16,
    "rating": 4.85,
    "reviewsCount": 51,
    "ownerName": "Ibu Sri Wahyuni",
    "ownerPhone": "6281578901234",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Diskon Mahasiswi Baru",
    "images": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Busa",
      "Lemari Pakaian",
      "Meja Belajar",
      "Dapur Bersama",
      "Parkir Motor",
      "Listrik Termasuk"
    ],
    "rules": [
      "Khusus putri mahasiswi",
      "Jam malam 22.00 WIB",
      "Aman dan lingkungan santun"
    ],
    "description": "Kos putri murah dan bersih tepat di antara kampus UGM dan UNY. Suasana Jogja yang ramah dan dekat berbagai angkringan & minimarket.",
    "nearbyPlaces": [
      {
        "name": "Kampus UNY",
        "distance": "300 m"
      },
      {
        "name": "Kampus UGM",
        "distance": "700 m"
      },
      {
        "name": "RS Panti Rapih",
        "distance": "900 m"
      }
    ],
    "reviews": [
      {
        "user": "Aulia",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Ibu kos baik banget dan deket banget ke kampus."
      }
    ]
  },
  {
    "id": "kos-004",
    "name": "Kos Pasutri / Campur Royal Suite Kuningan",
    "slug": "kos-royal-suite-kuningan",
    "type": "Pasutri",
    "category": "Eksklusif",
    "city": "Jakarta Selatan",
    "district": "Setiabudi",
    "address": "Jl. Karet Pedurenan No. 12, Kuningan, Setiabudi, Jakarta Selatan",
    "nearCampus": "Dekat Perkantoran Mega Kuningan & Sudirman",
    "lat": -6.2231,
    "lng": 106.8285,
    "priceMonthly": 3800000,
    "priceDaily": 275000,
    "priceYearly": 42000000,
    "deposit": 1000000,
    "electricityIncluded": false,
    "roomSize": "4 x 5 m",
    "availableRooms": 1,
    "totalRooms": 8,
    "rating": 4.9,
    "reviewsCount": 29,
    "ownerName": "Bapak Hendra Widjaja",
    "ownerPhone": "6281898761234",
    "isVerified": true,
    "isPromo": false,
    "promoText": "",
    "images": [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "AC",
      "Smart TV",
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Water Heater",
      "Kasur King Size",
      "Lemari Besar",
      "Kulkas Pribadi",
      "Dapur Pribadi / Mini Kitchen",
      "Parkir Mobil",
      "Parkir Motor",
      "Bebas 24 Jam",
      "CCTV 24 Jam",
      "Housekeeping Mingguan"
    ],
    "rules": [
      "Bisa untuk Pasutri (wajib surat nikah) atau Karyawan/ti Eksekutif",
      "Bebas 24 jam dengan smart access card",
      "Dilarang membawa anjing (kucing boleh dengan konfirmasi)",
      "Parkir mobil tersedia slot khusus (tersedia charger EV)"
    ],
    "description": "Kamar kos setara apartemen studio di kawasan segitiga emas Kuningan - Sudirman. Dilengkapi Smart TV 43 inch, kitchen set pribadi, kulkas 2 pintu, dan layanan pembersihan kamar mingguan.",
    "nearbyPlaces": [
      {
        "name": "Kuningan City Mall",
        "distance": "500 m"
      },
      {
        "name": "Mall Ambassador & ITC Kuningan",
        "distance": "700 m"
      },
      {
        "name": "MRT Bendungan Hilir / Setiabudi",
        "distance": "1.4 km"
      },
      {
        "name": "Lotte Shopping Avenue",
        "distance": "1.1 km"
      }
    ],
    "reviews": [
      {
        "user": "Kevin & Nadia",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Cocok banget buat pasangan muda, fasilitas lengkap seperti hotel bintang 4."
      }
    ]
  },
  {
    "id": "kos-005",
    "name": "Kos Kukusan Mahasiswa UI Depok",
    "slug": "kos-kukusan-ui-depok",
    "type": "Putra",
    "category": "Kos Murah",
    "city": "Depok",
    "district": "Beji",
    "address": "Jl. Juragan Sinda No. 33, Kukusan, Beji, Kota Depok",
    "nearCampus": "Universitas Indonesia (Kukel / Kutek)",
    "lat": -6.3682,
    "lng": 106.8242,
    "priceMonthly": 850000,
    "priceDaily": 75000,
    "priceYearly": 9500000,
    "deposit": 150000,
    "electricityIncluded": true,
    "roomSize": "3 x 3 m",
    "availableRooms": 5,
    "totalRooms": 18,
    "rating": 4.6,
    "reviewsCount": 65,
    "ownerName": "Bapak H. Syafei",
    "ownerPhone": "6285712349988",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Bayar 1 Tahun Gratis 1 Bulan",
    "images": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "WiFi Cepat",
      "Kamar Mandi Luar Bersih",
      "Kasur Busa",
      "Lemari Pakaian",
      "Meja Belajar",
      "Dapur Bersama",
      "Parkir Motor",
      "Listrik Termasuk",
      "Jemuran Luas"
    ],
    "rules": [
      "Khusus mahasiswa",
      "Gerbang ditutup pukul 23.00 (bisa pinjam kunci darurat)",
      "Dilarang membawa rokok di area kamar tidur",
      "Iuran sampah & air sudah termasuk"
    ],
    "description": "Kos hemat dan nyaman tepat di belakang pintu masuk Kukusan Teknik UI Depok. Sangat ramah di kantong mahasiswa baru dengan fasilitas penting sudah siap pakai.",
    "nearbyPlaces": [
      {
        "name": "Pintu Masuk Kukusan Teknik UI",
        "distance": "250 m"
      },
      {
        "name": "Stasiun KRL Pondok Cina",
        "distance": "1.8 km"
      },
      {
        "name": "Margo City Mall",
        "distance": "2.5 km"
      },
      {
        "name": "Politeknik Negeri Jakarta (PNJ)",
        "distance": "900 m"
      }
    ],
    "reviews": [
      {
        "user": "Bagus Setiawan",
        "rating": 4.7,
        "date": "Juli 2026",
        "comment": "Pilihan terbaik buat mahasiswa teknik UI, jalan kaki ke kampus cuma 5 menit!"
      }
    ]
  },
  {
    "id": "kos-005b",
    "name": "Kos Putri Kutek UI Depok Sejahtera",
    "slug": "kos-putri-kutek-ui-depok",
    "type": "Putri",
    "category": "Kos Murah",
    "city": "Depok",
    "district": "Beji",
    "address": "Jl. H. Amat No. 12, Kukusan Teknik (Kutek), Beji, Depok",
    "nearCampus": "Universitas Indonesia (UI Depok 3 Menit)",
    "lat": -6.365,
    "lng": 106.826,
    "priceMonthly": 800000,
    "priceDaily": 70000,
    "priceYearly": 9000000,
    "deposit": 150000,
    "electricityIncluded": true,
    "roomSize": "3 x 3 m",
    "availableRooms": 4,
    "totalRooms": 14,
    "rating": 4.8,
    "reviewsCount": 37,
    "ownerName": "Ibu Yuni",
    "ownerPhone": "6281233221100",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Dekat Pintu Kutek UI",
    "images": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Busa",
      "Lemari Pakaian",
      "Meja Belajar",
      "Dapur Bersama",
      "Parkir Motor",
      "Listrik Termasuk"
    ],
    "rules": [
      "Khusus mahasiswi UI / PNJ",
      "Gerbang ditutup pukul 22.30 WIB",
      "Aman dan kondusif untuk belajar"
    ],
    "description": "Kos khusus putri di kawasan Kukusan Teknik UI. Cuma 3 menit jalan kaki ke kampus UI. Sangat hemat dan aman.",
    "nearbyPlaces": [
      {
        "name": "Pintu Masuk Kutek UI",
        "distance": "200 m"
      },
      {
        "name": "Stasiun KRL UI",
        "distance": "1.5 km"
      }
    ],
    "reviews": [
      {
        "user": "Melati",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Jalan ke kampus deket banget, ibu kos ramah!"
      }
    ]
  },
  {
    "id": "kos-006",
    "name": "Kos Putri Cantika Gubeng Surabaya",
    "slug": "kos-putri-cantika-gubeng",
    "type": "Putri",
    "category": "Dekat Kampus",
    "city": "Surabaya",
    "district": "Gubeng",
    "address": "Jl. Dharmawangsa Barat No. 8, Gubeng, Surabaya",
    "nearCampus": "Dekat UNAIR Kampus B & RSUD Dr. Soetomo",
    "lat": -7.2715,
    "lng": 112.7588,
    "priceMonthly": 1500000,
    "priceDaily": 110000,
    "priceYearly": 16500000,
    "deposit": 250000,
    "electricityIncluded": false,
    "roomSize": "3 x 4 m",
    "availableRooms": 3,
    "totalRooms": 14,
    "rating": 4.8,
    "reviewsCount": 31,
    "ownerName": "Ibu Maya Susanti",
    "ownerPhone": "6282133445566",
    "isVerified": true,
    "isPromo": false,
    "promoText": "",
    "images": [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "AC",
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Springbed",
      "Lemari Pakaian",
      "Meja Rias & Meja Belajar",
      "Water Heater",
      "Dapur Bersama",
      "Kulkas Bersama",
      "Parkir Motor",
      "CCTV 24 Jam"
    ],
    "rules": [
      "Khusus mahasiswi / karyawati",
      "Tamu pria hanya boleh di ruang tamu lantai 1",
      "Jam malam gerbang 23.00 WIB",
      "Tidak boleh membawa binatang peliharaan"
    ],
    "description": "Kos putri modern dan bersih di kawasan elite Gubeng Surabaya. Selangkah menuju UNAIR Kampus B dan RSUD Dr. Soetomo. Lingkungan sangat aman dan nyaman untuk istirahat & belajar.",
    "nearbyPlaces": [
      {
        "name": "Universitas Airlangga (UNAIR B)",
        "distance": "500 m"
      },
      {
        "name": "RSUD Dr. Soetomo",
        "distance": "650 m"
      },
      {
        "name": "Stasiun Gubeng Surabaya",
        "distance": "1.3 km"
      },
      {
        "name": "Grand City Mall",
        "distance": "2.1 km"
      }
    ],
    "reviews": [
      {
        "user": "Dina Kartika",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Sangat bersih dan terawat, dekat banget ke kampus FK UNAIR."
      }
    ]
  },
  {
    "id": "kos-007",
    "name": "Kos Paviliun Soekarno Hatta Malang",
    "slug": "kos-paviliun-suhat-malang",
    "type": "Campur",
    "category": "Dekat Kampus",
    "city": "Malang",
    "district": "Lowokwaru",
    "address": "Jl. Soekarno Hatta Indah No. 19, Lowokwaru, Kota Malang",
    "nearCampus": "Univ. Brawijaya (UB) & Polinema (5 Menit)",
    "lat": -7.9467,
    "lng": 112.6156,
    "priceMonthly": 1350000,
    "priceDaily": 100000,
    "priceYearly": 14500000,
    "deposit": 200000,
    "electricityIncluded": true,
    "roomSize": "3.5 x 3.5 m",
    "availableRooms": 2,
    "totalRooms": 16,
    "rating": 4.85,
    "reviewsCount": 47,
    "ownerName": "Bapak Agus Salim",
    "ownerPhone": "6281234909090",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Diskon Mahasiswa Baru",
    "images": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "AC",
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Springbed",
      "Lemari Pakaian",
      "Meja Kerja",
      "Dapur Bersama",
      "Dispenser RO",
      "Parkir Mobil",
      "Parkir Motor",
      "Bebas 24 Jam",
      "CCTV 24 Jam",
      "Listrik Termasuk"
    ],
    "rules": [
      "Penyewa mahasiswa / pekerja profesional",
      "Akses gerbang 24 jam dengan kartu elektronik",
      "Dilarang berisik melebihi batas wajar",
      "Tamu lawan jenis berkunjung di ruang santai bersama"
    ],
    "description": "Kos berkonsep modern minimalis di kawasan pusat kuliner dan kampus Suhat Malang. Sangat dekat ke Gerbang UB dan Politeknik Negeri Malang. Suasana dingin sejuk khas Malang.",
    "nearbyPlaces": [
      {
        "name": "Universitas Brawijaya (UB)",
        "distance": "700 m"
      },
      {
        "name": "Politeknik Negeri Malang (Polinema)",
        "distance": "600 m"
      },
      {
        "name": "Pusat Kafe Suhat",
        "distance": "200 m"
      },
      {
        "name": "Matos (Malang Town Square)",
        "distance": "1.5 km"
      }
    ],
    "reviews": [
      {
        "user": "Fajar Pratama",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Kos idaman di Suhat, cari makan gampang banget tinggal jalan kaki."
      }
    ]
  },
  {
    "id": "kos-007b",
    "name": "Kos Putri Watumujur UB Malang",
    "slug": "kos-putri-watumujur-ub",
    "type": "Putri",
    "category": "Kos Murah",
    "city": "Malang",
    "district": "Lowokwaru",
    "address": "Jl. Watumujur No. 27, Ketawanggede, Lowokwaru, Malang",
    "nearCampus": "Universitas Brawijaya (UB 3 Menit)",
    "lat": -7.952,
    "lng": 112.613,
    "priceMonthly": 700000,
    "priceDaily": 60000,
    "priceYearly": 7800000,
    "deposit": 100000,
    "electricityIncluded": true,
    "roomSize": "3 x 3 m",
    "availableRooms": 3,
    "totalRooms": 15,
    "rating": 4.8,
    "reviewsCount": 36,
    "ownerName": "Ibu Hj. Masruroh",
    "ownerPhone": "6281333444555",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Murah & Dekat Gerbang UB",
    "images": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Busa",
      "Lemari Pakaian",
      "Meja Belajar",
      "Dapur Bersama",
      "Parkir Motor",
      "Listrik Termasuk"
    ],
    "rules": [
      "Khusus mahasiswi UB / UM / Polinema",
      "Jam malam 22.30 WIB",
      "Lingkungan aman dan tenang"
    ],
    "description": "Kos putri murah dan bersih tepat di belakang gerbang FIA/FEB UB Malang. Sangat hemat untuk mahasiswi.",
    "nearbyPlaces": [
      {
        "name": "Gerbang FIA UB",
        "distance": "250 m"
      },
      {
        "name": "Matos",
        "distance": "1.0 km"
      }
    ],
    "reviews": [
      {
        "user": "Nisa",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Dekat banget sama kampus UB, jalan kaki 3 menit sampai!"
      }
    ]
  },
  {
    "id": "kos-008",
    "name": "Kos Bali Sunrise Seminyak",
    "slug": "kos-bali-sunrise-seminyak",
    "type": "Campur",
    "category": "Eksklusif",
    "city": "Bali",
    "district": "Kuta",
    "address": "Jl. Sunset Road Gang Melati No. 7, Seminyak, Bali",
    "nearCampus": "Dekat Pantai Seminyak & Kawasan Wisata",
    "lat": -8.6913,
    "lng": 115.1682,
    "priceMonthly": 3200000,
    "priceDaily": 250000,
    "priceYearly": 35000000,
    "deposit": 500000,
    "electricityIncluded": false,
    "roomSize": "4 x 5 m",
    "availableRooms": 1,
    "totalRooms": 10,
    "rating": 4.95,
    "reviewsCount": 58,
    "ownerName": "Wayan Sudarma",
    "ownerPhone": "6281999888777",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Free Kolam Renang & Poolside Sunbed",
    "images": [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "AC",
      "Kolam Renang",
      "Smart TV",
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Water Heater",
      "Kasur King Size",
      "Kulkas Pribadi",
      "Balkon Pribadi",
      "Parkir Mobil",
      "Parkir Motor",
      "Bebas 24 Jam",
      "Housekeeping 2x Seminggu"
    ],
    "rules": [
      "Cocok untuk Digital Nomad / Pasutri / Pekerja",
      "Akses bebas 24 jam",
      "Pembersihan kamar 2 kali seminggu gratis",
      "Penyewa internasional / lokal dipersilakan"
    ],
    "description": "Kost bergaya resort villa dengan fasilitas kolam renang di Seminyak Bali. Sangat pas untuk remote worker / digital nomad yang ingin tinggal nyaman dan tenang dengan suasana tropis.",
    "nearbyPlaces": [
      {
        "name": "Pantai Seminyak / Double Six",
        "distance": "1.5 km"
      },
      {
        "name": "Sunset Point Shopping Mall",
        "distance": "600 m"
      },
      {
        "name": "Bintang Supermarket",
        "distance": "1.1 km"
      },
      {
        "name": "Bandara Ngurah Rai",
        "distance": "8.5 km"
      }
    ],
    "reviews": [
      {
        "user": "Michael & Jessica",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Amazing place to stay and work remotely in Bali! Fast wifi, clean pool."
      }
    ]
  },
  {
    "id": "kos-009",
    "name": "Kos Simpang Lima Heritage Semarang",
    "slug": "kos-simpang-lima-semarang",
    "type": "Putri",
    "category": "Eksklusif",
    "city": "Semarang",
    "district": "Semarang Tengah",
    "address": "Jl. Pandanaran II No. 15, Semarang Tengah, Kota Semarang",
    "nearCampus": "Undip Pleburan & Kawasan Simpang Lima",
    "lat": -6.9902,
    "lng": 110.4229,
    "priceMonthly": 1750000,
    "priceDaily": 130000,
    "priceYearly": 19000000,
    "deposit": 300000,
    "electricityIncluded": true,
    "roomSize": "3.5 x 4 m",
    "availableRooms": 3,
    "totalRooms": 12,
    "rating": 4.75,
    "reviewsCount": 22,
    "ownerName": "Ibu Hartini",
    "ownerPhone": "6281566778899",
    "isVerified": true,
    "isPromo": false,
    "promoText": "",
    "images": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "AC",
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Springbed",
      "Lemari Pakaian",
      "Water Heater",
      "Dapur Bersama",
      "Dispenser",
      "Parkir Mobil",
      "Parkir Motor",
      "CCTV 24 Jam",
      "Listrik Termasuk"
    ],
    "rules": [
      "Khusus putri mahasiswi & karyawati",
      "Akses pintu masuk dengan sidik jari",
      "Batas berkunjung tamu pukul 22.00 di lobby",
      "Dilarang merokok di area kos"
    ],
    "description": "Hunian kos putri eksklusif di pusat kota Semarang. Hanya 3 menit ke Simpang Lima dan Mall Ciputra. Bangunan baru dengan sirkulasi udara yang nyaman dan interior elegan.",
    "nearbyPlaces": [
      {
        "name": "Simpang Lima Semarang",
        "distance": "350 m"
      },
      {
        "name": "Mall Ciputra Semarang",
        "distance": "400 m"
      },
      {
        "name": "Universitas Diponegoro (Pleburan)",
        "distance": "950 m"
      },
      {
        "name": "RS Telogorejo",
        "distance": "1.1 km"
      }
    ],
    "reviews": [
      {
        "user": "Anisa Rahmadani",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Lokasi di tengah kota, gampang kemana-mana dan sangat aman."
      }
    ]
  },
  {
    "id": "kos-010",
    "name": "Kos Kampus ITS Sukolilo Surabaya",
    "slug": "kos-kampus-its-sukolilo",
    "type": "Putra",
    "category": "Dekat Kampus",
    "city": "Surabaya",
    "district": "Sukolilo",
    "address": "Jl. Gebang Wetan No. 50, Sukolilo, Surabaya",
    "nearCampus": "Institut Teknologi Sepuluh Nopember (ITS)",
    "lat": -7.2841,
    "lng": 112.7953,
    "priceMonthly": 900000,
    "priceDaily": 70000,
    "priceYearly": 10000000,
    "deposit": 150000,
    "electricityIncluded": true,
    "roomSize": "3 x 3 m",
    "availableRooms": 4,
    "totalRooms": 16,
    "rating": 4.65,
    "reviewsCount": 39,
    "ownerName": "Pak Slamet",
    "ownerPhone": "6287812345678",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Free Galon Minum & Gas",
    "images": [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Busa",
      "Lemari Pakaian",
      "Meja Belajar",
      "Dapur Bersama",
      "Parkir Motor",
      "Listrik Termasuk",
      "Bebas 24 Jam"
    ],
    "rules": [
      "Khusus putra mahasiswa ITS / UNAIR C / PENS",
      "Kunci pagar masing-masing penghuni",
      "Iuran kebersihan sudah termasuk biaya bulanan"
    ],
    "description": "Kos favorit mahasiswa teknik ITS di daerah Gebang Wetan. Jalan kaki 3 menit ke pintu masuk kampus ITS. Suasana rukun dan nyaman untuk belajar kelompok.",
    "nearbyPlaces": [
      {
        "name": "Institut Teknologi Sepuluh Nopember (ITS)",
        "distance": "300 m"
      },
      {
        "name": "PENS (Politeknik Elektronika ITS)",
        "distance": "500 m"
      },
      {
        "name": "Galaxy Mall Surabaya",
        "distance": "2.0 km"
      }
    ],
    "reviews": [
      {
        "user": "Bayu Anggoro",
        "rating": 4.7,
        "date": "Juli 2026",
        "comment": "Murah meriah dan deket banget ke jurusan Elektro ITS."
      }
    ]
  },
  {
    "id": "kos-011",
    "name": "Kos Eksklusif Seturan Jogja",
    "slug": "kos-eksklusif-seturan-jogja",
    "type": "Campur",
    "category": "Eksklusif",
    "city": "Yogyakarta",
    "district": "Depok Sleman",
    "address": "Jl. Seturan Raya No. 88, Caturtunggal, Depok, Sleman, Yogyakarta",
    "nearCampus": "UPN Veteran, Atma Jaya, YKPN (5 Menit)",
    "lat": -7.7738,
    "lng": 110.4102,
    "priceMonthly": 2100000,
    "priceDaily": 160000,
    "priceYearly": 23000000,
    "deposit": 400000,
    "electricityIncluded": false,
    "roomSize": "3.5 x 4 m",
    "availableRooms": 2,
    "totalRooms": 24,
    "rating": 4.88,
    "reviewsCount": 73,
    "ownerName": "Ibu Jessica Tan",
    "ownerPhone": "6281122334455",
    "isVerified": true,
    "isPromo": true,
    "promoText": "Cashback 200rb Booking Bulan Ini",
    "images": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "AC",
      "Smart TV",
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Water Heater",
      "Kasur Springbed",
      "Lemari Pakaian",
      "Kulkas Pribadi",
      "Balkon",
      "Parkir Mobil",
      "Parkir Motor",
      "Bebas 24 Jam",
      "CCTV 24 Jam",
      "Coworking Space"
    ],
    "rules": [
      "Mahasiswa / Karyawan muda",
      "Bebas 24 jam dengan Smart Card Lock",
      "Tamu dilarang menginap tanpa konfirmasi",
      "Dilarang menyalakan musik kencang larut malam"
    ],
    "description": "Kos modern berfasilitas hotel di pusat nongkrong Seturan Jogja. Terdapat lounge coworking bersama di lantai 1 untuk kerja kelompok atau diskusi santai.",
    "nearbyPlaces": [
      {
        "name": "UPN Veteran Yogyakarta",
        "distance": "450 m"
      },
      {
        "name": "STIE YKPN",
        "distance": "700 m"
      },
      {
        "name": "Universitas Atma Jaya Babarsari",
        "distance": "1.2 km"
      },
      {
        "name": "Pakuwon Mall Jogja",
        "distance": "2.8 km"
      }
    ],
    "reviews": [
      {
        "user": "Rian Hidayat",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Coworking space di bawah ngebantu banget pas ngerjain skripsi."
      }
    ]
  },
  {
    "id": "kos-012",
    "name": "Kos Beverly Putri Grogol Trisakti Untar",
    "slug": "kos-beverly-putri-grogol",
    "type": "Putri",
    "category": "Dekat Kampus",
    "city": "Jakarta Barat",
    "district": "Grogol Petamburan",
    "address": "Jl. Muwardi II No. 11, Grogol, Jakarta Barat",
    "nearCampus": "Univ. Trisakti & Untar (Jalan Kaki 5 Menit)",
    "lat": -6.1668,
    "lng": 106.7892,
    "priceMonthly": 1950000,
    "priceDaily": 150000,
    "priceYearly": 21500000,
    "deposit": 350000,
    "electricityIncluded": false,
    "roomSize": "3 x 4 m",
    "availableRooms": 3,
    "totalRooms": 16,
    "rating": 4.82,
    "reviewsCount": 41,
    "ownerName": "Ibu Silvi",
    "ownerPhone": "6281788990011",
    "isVerified": true,
    "isPromo": false,
    "promoText": "",
    "images": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
    ],
    "facilities": [
      "AC",
      "WiFi Cepat",
      "Kamar Mandi Dalam",
      "Kasur Springbed",
      "Lemari Pakaian",
      "Meja Belajar",
      "Water Heater",
      "Dapur Bersama",
      "Parkir Motor",
      "Security 24 Jam",
      "CCTV 24 Jam",
      "Kartu Akses"
    ],
    "rules": [
      "Khusus mahasiswi / karyawati",
      "Pria dilarang masuk area kamar (hanya di resepsionis)",
      "Jam malam gerbang 23.00 WIB",
      "Menjaga kebersihan dan ketertiban"
    ],
    "description": "Kos putri aman dan sangat nyaman tepat di seberang kampus Trisakti dan Tarumanagara (Untar). Dikelilingi pusat kuliner Muwardi dan transportasi umum TransJakarta & KRL Grogol.",
    "nearbyPlaces": [
      {
        "name": "Universitas Trisakti",
        "distance": "400 m"
      },
      {
        "name": "Universitas Tarumanagara (Untar)",
        "distance": "550 m"
      },
      {
        "name": "Mall Ciputra (Citraland)",
        "distance": "750 m"
      },
      {
        "name": "Stasiun KRL Grogol",
        "distance": "850 m"
      }
    ],
    "reviews": [
      {
        "user": "Clarissa Chandra",
        "rating": 5,
        "date": "Agustus 2026",
        "comment": "Jalan kaki ke kampus deket banget dan security selalu standby."
      }
    ]
  }
];
