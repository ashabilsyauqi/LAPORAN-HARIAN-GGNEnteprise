/**
 * JURAGANKOS ID - DATASET AWAL PENGELOLAAN KOS
 * Berisi master data properti, kamar, penyewa, transaksi keuangan, dan tiket pemeliharaan.
 */

const JURAGAN_DEFAULT_DATA = {
  property: {
    name: "Kos Graha Asri Tebet",
    owner: "Bpk. Swanto / Ibu Hj. Rahmawati",
    phone: "081234567890",
    bankName: "BCA",
    bankAccount: "8830-1234-5678",
    bankHolder: "Swanto",
    address: "Jl. Tebet Barat Dalam VII No. 18, Tebet, Jakarta Selatan",
    totalFloors: 2,
    electricityRatePerKwh: 1650,
    rulesNote: "Pembayaran sewa paling lambat tanggal 5 setiap bulannya. Dilarang merokok di kamar AC."
  },

  rooms: [
    {
      id: "R-101",
      number: "101",
      floor: 1,
      type: "Eksklusif AC",
      priceMonthly: 2300000,
      size: "3.5 x 4.5 m",
      status: "occupied", // occupied | available | maintenance
      facilities: ["AC", "Kamar Mandi Dalam", "Kasur Springbed", "Lemari", "Meja Kerja", "Water Heater"],
      currentTenantId: "T-001"
    },
    {
      id: "R-102",
      number: "102",
      floor: 1,
      type: "Eksklusif AC",
      priceMonthly: 2300000,
      size: "3.5 x 4.5 m",
      status: "occupied",
      facilities: ["AC", "Kamar Mandi Dalam", "Kasur Springbed", "Lemari", "Meja Kerja", "Water Heater"],
      currentTenantId: "T-002"
    },
    {
      id: "R-103",
      number: "103",
      floor: 1,
      type: "Standar AC",
      priceMonthly: 1850000,
      size: "3 x 3.5 m",
      status: "available",
      facilities: ["AC", "Kamar Mandi Dalam", "Kasur Busa Super", "Lemari", "Meja Belajar"],
      currentTenantId: null
    },
    {
      id: "R-104",
      number: "104",
      floor: 1,
      type: "Standar AC",
      priceMonthly: 1850000,
      size: "3 x 3.5 m",
      status: "occupied",
      facilities: ["AC", "Kamar Mandi Dalam", "Kasur Busa Super", "Lemari", "Meja Belajar"],
      currentTenantId: "T-003"
    },
    {
      id: "R-105",
      number: "105",
      floor: 1,
      type: "Hemat Non-AC",
      priceMonthly: 1200000,
      size: "3 x 3 m",
      status: "maintenance",
      facilities: ["Exhaust Fan", "Kamar Mandi Luar", "Kasur Single", "Lemari", "Meja"],
      currentTenantId: null
    },
    {
      id: "R-201",
      number: "201",
      floor: 2,
      type: "VIP Balkon",
      priceMonthly: 2600000,
      size: "4 x 5 m",
      status: "occupied",
      facilities: ["AC", "Kamar Mandi Dalam", "Smart TV", "Balkon Pribadi", "Kulkas Mini", "Water Heater"],
      currentTenantId: "T-004"
    },
    {
      id: "R-202",
      number: "202",
      floor: 2,
      type: "VIP Balkon",
      priceMonthly: 2600000,
      size: "4 x 5 m",
      status: "available",
      facilities: ["AC", "Kamar Mandi Dalam", "Smart TV", "Balkon Pribadi", "Kulkas Mini", "Water Heater"],
      currentTenantId: null
    },
    {
      id: "R-203",
      number: "203",
      floor: 2,
      type: "Standar AC",
      priceMonthly: 1850000,
      size: "3 x 3.5 m",
      status: "occupied",
      facilities: ["AC", "Kamar Mandi Dalam", "Kasur Springbed", "Lemari", "Meja Belajar"],
      currentTenantId: "T-005"
    },
    {
      id: "R-204",
      number: "204",
      floor: 2,
      type: "Standar AC",
      priceMonthly: 1850000,
      size: "3 x 3.5 m",
      status: "available",
      facilities: ["AC", "Kamar Mandi Dalam", "Kasur Springbed", "Lemari", "Meja Belajar"],
      currentTenantId: null
    },
    {
      id: "R-205",
      number: "205",
      floor: 2,
      type: "Standar AC",
      priceMonthly: 1850000,
      size: "3 x 3.5 m",
      status: "occupied",
      facilities: ["AC", "Kamar Mandi Dalam", "Kasur Springbed", "Lemari", "Meja Belajar"],
      currentTenantId: "T-006"
    }
  ],

  tenants: [
    {
      id: "T-001",
      name: "Dimas Aditya Pratama",
      phone: "6281234567891",
      ktp: "3174092109960002",
      job: "Software Engineer (WFH)",
      emergencyContact: "08129887766 (Ibu Dimas)",
      roomId: "R-101",
      roomNumber: "101",
      startDate: "2026-01-10",
      dueDate: "2026-09-10",
      monthlyRent: 2300000,
      deposit: 500000,
      paymentStatus: "paid", // paid | due_soon | overdue
      status: "active" // active | inactive
    },
    {
      id: "T-002",
      name: "Nabila Putri Safitri",
      phone: "6285712345678",
      ktp: "3273014508980004",
      job: "Mahasiswi S2 UI / Karyawati",
      emergencyContact: "08561122334 (Ayah Nabila)",
      roomId: "R-102",
      roomNumber: "102",
      startDate: "2026-03-05",
      dueDate: "2026-09-05",
      monthlyRent: 2300000,
      deposit: 500000,
      paymentStatus: "overdue", // Telat bayar
      status: "active"
    },
    {
      id: "T-003",
      name: "Rizky Ramadhan",
      phone: "6282198765432",
      ktp: "3374021203990001",
      job: "Accountant di SCBD",
      emergencyContact: "08134455667 (Kakak)",
      roomId: "R-104",
      roomNumber: "104",
      startDate: "2026-05-12",
      dueDate: "2026-09-12",
      monthlyRent: 1850000,
      deposit: 400000,
      paymentStatus: "due_soon", // 4 hari lagi
      status: "active"
    },
    {
      id: "T-004",
      name: "Kevin Sanjaya & Istri",
      phone: "6281809871234",
      ktp: "3171051506950007",
      job: "Pasangan Suami Istri (Eksekutif)",
      emergencyContact: "08190011223 (Keluarga)",
      roomId: "R-201",
      roomNumber: "201",
      startDate: "2026-02-01",
      dueDate: "2026-09-01",
      monthlyRent: 2600000,
      deposit: 1000000,
      paymentStatus: "paid",
      status: "active"
    },
    {
      id: "T-005",
      name: "Fathir Muhammad",
      phone: "6287812993344",
      ktp: "3275091407000003",
      job: "Graphic Designer",
      emergencyContact: "087811223344 (Ibu Fathir)",
      roomId: "R-203",
      roomNumber: "203",
      startDate: "2026-06-15",
      dueDate: "2026-09-15",
      monthlyRent: 1850000,
      deposit: 400000,
      paymentStatus: "due_soon",
      status: "active"
    },
    {
      id: "T-006",
      name: "Sarah Amanda",
      phone: "6281355443322",
      ktp: "3172085204990005",
      job: "Consultant Deloitte",
      emergencyContact: "08139988776 (Orang Tua)",
      roomId: "R-205",
      roomNumber: "205",
      startDate: "2026-04-01",
      dueDate: "2026-09-01",
      monthlyRent: 1850000,
      deposit: 400000,
      paymentStatus: "paid",
      status: "active"
    }
  ],

  transactions: [
    {
      id: "TX-2026-09-01",
      type: "income", // income | expense
      category: "Sewa Kamar",
      date: "2026-09-01",
      amount: 2600000,
      tenantName: "Kevin Sanjaya",
      roomNumber: "201",
      note: "Pembayaran sewa bulan September 2026"
    },
    {
      id: "TX-2026-09-02",
      type: "income",
      category: "Sewa Kamar",
      date: "2026-09-01",
      amount: 1850000,
      tenantName: "Sarah Amanda",
      roomNumber: "205",
      note: "Pembayaran sewa bulan September 2026"
    },
    {
      id: "TX-2026-09-03",
      type: "income",
      category: "Sewa Kamar",
      date: "2026-09-03",
      amount: 2300000,
      tenantName: "Dimas Aditya Pratama",
      roomNumber: "101",
      note: "Pembayaran sewa bulan September 2026 (Transfer BCA)"
    },
    {
      id: "TX-2026-09-04",
      type: "expense",
      category: "Listrik PLN",
      date: "2026-09-02",
      amount: 850000,
      tenantName: "-",
      roomNumber: "Area Umum",
      note: "Token Listrik Pompa Air & Lampu Luar"
    },
    {
      id: "TX-2026-09-05",
      type: "expense",
      category: "Internet & WiFi",
      date: "2026-09-03",
      amount: 450000,
      tenantName: "-",
      roomNumber: "All",
      note: "IndiHome Biz 100 Mbps Bulan September"
    },
    {
      id: "TX-2026-09-06",
      type: "expense",
      category: "Gaji & Kebersihan",
      date: "2026-09-01",
      amount: 1200000,
      tenantName: "-",
      roomNumber: "All",
      note: "Gaji Petugas Kebersihan & Jaga Kos (Pak Somad)"
    },
    {
      id: "TX-2026-09-07",
      type: "expense",
      category: "Pemeliharaan / Perbaikan",
      date: "2026-09-04",
      amount: 250000,
      tenantName: "-",
      roomNumber: "105",
      note: "Servis Exhaust Fan & Penggantian Kran Air"
    }
  ],

  complaints: [
    {
      id: "CMP-001",
      roomNumber: "105",
      tenantName: "Admin",
      category: "Fasilitas Kamar",
      description: "Exhaust fan berisik dan kran kamar mandi sedikit menetes",
      date: "2026-09-04",
      status: "in_progress", // pending | in_progress | resolved
      cost: 250000
    },
    {
      id: "CMP-002",
      roomNumber: "102",
      tenantName: "Nabila Putri",
      category: "AC & Elektronik",
      description: "Remot AC baterainya habis dan hembusan angin terasa kurang dingin",
      date: "2026-09-06",
      status: "pending",
      cost: 0
    },
    {
      id: "CMP-003",
      roomNumber: "203",
      tenantName: "Fathir Muhammad",
      category: "WiFi / Jaringan",
      description: "Sinyal WiFi di pojok lantai 2 sering putus nyambung pas malam",
      date: "2026-08-28",
      status: "resolved",
      cost: 150000
    }
  ]
};
