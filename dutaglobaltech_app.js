/**
 * Dutaglobaltech - Official Enterprise Platform Engine
 * Handles i18n (ID/EN), Theme (Dark/Light), Sidebar Navigation & ScrollSpy,
 * Case Study Filtering & Modal, and Interactive Scope Estimator.
 */

// --- Data Models ---
const caseStudiesData = [
  {
    id: "cs-montirsiaga",
    category: "mobile",
    categories: ["mobile", "webapp"],
    title_id: "MontirSiaga.com - Platform Mobile Tanggap Darurat Mogok 1-Click SOS",
    title_en: "MontirSiaga.com - 1-Click SOS On-Demand Roadside Assistance Mobile App",
    client: "MontirSiaga Indonesia",
    live_url: "montirsiaga.html",
    live_url_display: "Buka MontirSiaga App",
    client_id_desc: "Platform tanggap darurat otomotif on-demand dengan filosofi 'Panik Hilang, Montir Datang' untuk penanganan mogok di jalan raya & jalan tol.",
    client_en_desc: "On-demand emergency roadside assistance platform connecting stranded motorists with certified local mechanics in minutes.",
    tag: "Mobile App (Android/iOS/PWA)",
    impact_id: "Respon montir dalam 15-30 detik, radar geofencing 5 km, bagi hasil 80% montir mandiri",
    impact_en: "15-30s mechanic response, 5 km geofencing radar, 80% direct earnings for independent mechanics",
    desc_id: "Pengembangan mobile app 1-Click SOS dengan preset kendala cepat 3 detik, radar geofencing 2-ring, live tracking GPS montir bergerak, eskalasi derek tol 14080 otomatis, dan verifikasi upload KTP/BNSP mitra.",
    desc_en: "Full mobile app engineering featuring 1-Click SOS, 3-second rapid presets, 2-ring geofencing radar, live mechanic GPS tracking, and toll towing escalation.",
    challenge_id: "Pengendara mogok kerap panik dan butuh kepastian cepat tanpa proses input form yang rumit, serta kebutuhan standarisasi keahlian montir bersertifikat resmi.",
    challenge_en: "Stranded drivers in panic need immediate dispatch without complex forms, alongside guaranteed certified mechanic credentials.",
    solution_id: "Dutaglobaltech merancang mobile app berkecepatan tinggi dengan auto-GPS locking, radar multi-ring, live ETA Leaflet map, dan sistem verifikasi KTP/BNSP digital.",
    solution_en: "Dutaglobaltech engineered a high-speed mobile application with auto-GPS locking, multi-ring radar, live ETA map tracking, and digital credential verification.",
    tech_stack: ["Flutter/PWA", "Leaflet Maps", "Node.js", "WebSocket", "PostgreSQL", "BNSP Auth"],
    badge_color: "from-red-500 to-amber-500"
  },
  {
    id: "cs-snaprint",
    category: "webapp",
    categories: ["webapp", "enterprise"],
    title_id: "SERP Snaprint - Platform ERP & POS Percetakan Digital Terpadu",
    title_en: "SERP Snaprint - Unified Digital Printing ERP & POS Platform",
    client: "Snaprint Indonesia",
    live_url: "https://serp.mysnaprint.com",
    live_url_display: "serp.mysnaprint.com",
    client_id_desc: "Jaringan industri percetakan modern, digital printing, dan kustom merchandise berskala multi-cabang.",
    client_en_desc: "Modern digital printing, apparel, and custom merchandise enterprise network with multi-branch synchronization.",
    tag: "Web App / Enterprise ERP",
    impact_id: "Kalkulasi HPP & order instan, efisiensi operasional workshop +60%, rekonsiliasi kas cabang 100% presisi",
    impact_en: "Instant print COGS & order calculations, +60% workshop operational efficiency, 100% precise branch cash reconciliation",
    desc_id: "Pembangunan platform sistem ERP & POS terintegrasi (serp.mysnaprint.com) untuk manajemen pesanan cetak custom, kalkulator bahan/mesin, antrean SPK workshop, dan pembukuan laba rugi multi-cabang.",
    desc_en: "Development of an integrated print ERP & POS system (serp.mysnaprint.com) featuring dynamic material pricing calculators, automated workshop job tracking, and multi-branch financial accounting.",
    challenge_id: "Kompleksitas kalkulasi ukuran cetak kustom (meteran/lembaran), koordinasi antrian mesin workshop dengan kasir depan, serta pemantauan arus kas harian antar cabang secara akurat.",
    challenge_en: "Complex custom print dimension calculations, disconnected shop-floor production queues, and multi-branch daily cash reconciliation.",
    solution_id: "Dutaglobaltech merancang portal ERP berbasis cloud (serp.mysnaprint.com) dengan database real-time terenkripsi, modul kasir POS responsif, generator SPK cetak otomatis, dan live reporting analitik.",
    solution_en: "Dutaglobaltech engineered a cloud-based ERP platform (serp.mysnaprint.com) featuring encrypted real-time databases, responsive POS cashier modules, automated print tickets, and live business analytics.",
    tech_stack: ["React/Next.js", "Node.js", "PostgreSQL", "TailwindCSS", "WebSocket", "Cloud POS"],
    badge_color: "from-blue-600 to-cyan-500"
  },
  {
    id: "cs-nexaera",
    category: "enterprise",
    categories: ["enterprise", "webapp"],
    title_id: "SERP Nexaera - Sistem Manajemen Enterprise & Automasi Operasional",
    title_en: "SERP Nexaera - Enterprise Management & Operations Automation System",
    client: "Nexaera Digital Ecosystem",
    live_url: "https://serp.nexaeraweb.com",
    live_url_display: "serp.nexaeraweb.com",
    client_id_desc: "Perusahaan penyedia solusi digital, layanan agensi terintegrasi, dan platform operasional enterprise modern.",
    client_en_desc: "Modern digital solutions provider, integrated agency services, and enterprise operations ecosystem.",
    tag: "Enterprise / Web Cloud Platform",
    impact_id: "Automasi alur kerja hingga 70%, monitoring KPI real-time, reduksi biaya overhead operasional 35%",
    impact_en: "Up to 70% workflow automation, real-time KPI monitoring, 35% reduction in operational overhead",
    desc_id: "Pembangunan platform core ERP & operasional terpusat (serp.nexaeraweb.com) yang mencakup manajemen proyek terpadu, automasi invoice & penagihan klien, tracking resource tim, dan dashboard analitik eksekutif.",
    desc_en: "Development of a centralized core ERP & operations platform (serp.nexaeraweb.com) covering project delivery tracking, client billing automation, resource allocation, and executive analytics.",
    challenge_id: "Fragmentasi data operasional antar divisi, pelacakan utilisasi tim yang kurang terpantau, dan proses administrasi penagihan klien yang memakan waktu.",
    challenge_en: "Operational data silos across departments, unmonitored team resource utilization, and time-consuming manual client invoicing workflows.",
    solution_id: "Dutaglobaltech mengimplementasikan portal web ERP skalabel di serp.nexaeraweb.com dengan arsitektur microservices teroptimasi, role-based access control (RBAC), live billing gateway, dan business intelligence reporting.",
    solution_en: "Dutaglobaltech engineered a scalable ERP web portal at serp.nexaeraweb.com featuring optimized microservices, RBAC security, live billing workflows, and business intelligence reporting.",
    tech_stack: ["Next.js", "Node.js", "PostgreSQL", "Docker", "REST API", "TailwindCSS"],
    badge_color: "from-indigo-600 to-purple-600"
  },
  {
    id: "cs-1",
    category: "enterprise",
    categories: ["enterprise", "webapp"],
    title_id: "Arsitektur ERP & Manajemen Logistik Multinasional",
    title_en: "Multinational Logistics ERP & Supply Chain System",
    client: "Global Cargo Nusantara Corp",
    client_id_desc: "Perusahaan logistik dan freight forwarding terkemuka di Asia Tenggara dengan 40+ kantor cabang.",
    client_en_desc: "Leading logistics and freight forwarding company across Southeast Asia with 40+ branches.",
    tag: "Enterprise / Web App",
    impact_id: "Efisiensi operasional +45%, reduksi human-error faktur 92%",
    impact_en: "+45% operational efficiency, 92% invoice human-error reduction",
    desc_id: "Modernisasi sistem monolith lama menjadi microservices berkecepatan tinggi dengan integrasi API Bea Cukai, tracking real-time GPS, dan automated invoice clearance.",
    desc_en: "Legacy monolith modernization into scalable microservices with custom customs API integration, real-time GPS tracking, and automated invoice clearance.",
    challenge_id: "Sistem lama mengalami latensi berat (>12 detik per pencatatan kargo) dan sering down saat lonjakan akhir bulan, mengakibatkan penumpukan dokumen di pelabuhan.",
    challenge_en: "Legacy system suffered heavy latency (>12s per cargo record) and frequent end-of-month downtimes, causing cargo clearance bottlenecks.",
    solution_id: "Dutaglobaltech merancang arsitektur event-driven microservices dengan Go & Node.js, caching Redis berlapis, database PostgreSQL partitioning, dan Next.js dashboard.",
    solution_en: "Dutaglobaltech designed an event-driven microservices architecture using Go & Node.js, layered Redis caching, partitioned PostgreSQL, and a Next.js dashboard.",
    tech_stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Kafka"],
    badge_color: "from-blue-500 to-indigo-600"
  },
  {
    id: "cs-2",
    category: "mobile",
    title_id: "Aplikasi Fintech Super-App & Wealth Management",
    title_en: "Fintech Super-App & Digital Wealth Platform",
    client: "Akselerasi Finansial Utama (AFU)",
    client_id_desc: "Startup fintech terdaftar OJK yang melayani lebih dari 1.2 juta pengguna aktif ritel.",
    client_en_desc: "Regulated fintech startup serving over 1.2M active retail investors and wealth builders.",
    tag: "Mobile App (iOS / Android)",
    impact_id: "Melayani 500k+ request/menit tanpa downtime, rating 4.8 bintang di App Store & Play Store",
    impact_en: "Handles 500k+ req/min with zero downtime, 4.8-star app store average",
    desc_id: "Pengembangan aplikasi mobile hybrid Flutter berkinerja tinggi dengan keamanan biometrik berlapis, chart real-time instan, dan KYC e-KTP OCR otomatis.",
    desc_en: "High-performance Flutter mobile application with multi-layer biometric security, instantaneous financial charts, and automated OCR e-KYC.",
    challenge_id: "Kebutuhan UX yang sangat mulus pada transaksi detik-per-detik tanpa membebani baterai perangkat, serta kepatuhan keamanan data ISO/IEC 27001.",
    challenge_en: "Requirement for sub-second trade executions with low battery drain and stringent ISO/IEC 27001 data encryption compliance.",
    solution_id: "Optimasi Flutter rendering pipeline dengan state management BLoC, enkripsi end-to-end AES-256 pada payload, serta API gateway microservices di GCP.",
    solution_en: "Optimized Flutter rendering pipeline with BLoC state architecture, payload AES-256 end-to-end encryption, and GCP-hosted microservices gateway.",
    tech_stack: ["Flutter", "Dart", "FastAPI", "Google Cloud", "PostgreSQL", "Biometrics Auth"],
    badge_color: "from-emerald-500 to-teal-600"
  },
  {
    id: "cs-3",
    category: "webapp",
    title_id: "Platform SaaS Telemedisin & Manajemen Rumah Sakit Terpadu",
    title_en: "Integrated Telemedicine SaaS & Clinical Management System",
    client: "Medika Sehat Selaras Group",
    client_id_desc: "Jaringan rumah sakit swasta dan poliklinik terpadu di 8 kota besar Indonesia.",
    client_en_desc: "Private hospital network and integrated clinics across 8 major Indonesian cities.",
    tag: "Web App / Cloud",
    impact_id: "Waktu tunggu konsultasi berkurang 60%, kepuasan pasien mencapai 98.4%",
    impact_en: "Consultation wait times cut by 60%, patient satisfaction at 98.4%",
    desc_id: "Platform portal kesehatan web real-time yang menghubungkan dokter spesialis dengan pasien via WebRTC video call terenkripsi, resep digital, dan sinkronisasi EMR.",
    desc_en: "Real-time healthcare web portal connecting medical specialists with patients via encrypted WebRTC video, e-prescriptions, and continuous EMR sync.",
    challenge_id: "Integrasi rekam medis elektronik (EMR) yang kompleks antar cabang fisik dan kebutuhan telekonsultasi video berlatensi sangat rendah di bandwidth terbatas.",
    challenge_en: "Complex electronic medical record (EMR) federation across physical branches and ultra-low latency video streaming over constrained networks.",
    solution_id: "Implementasi WebRTC peer-to-peer teroptimasi dengan SFU fallback, Next.js React frontend, compliant FHIR standard data format, dan AWS HIPAA-ready deployment.",
    solution_en: "Implemented WebRTC P2P with SFU mesh fallback, Next.js interface, FHIR standardized health format, and HIPAA-compliant AWS infrastructure.",
    tech_stack: ["React", "Next.js", "WebRTC", "Node.js", "AWS", "MongoDB", "TailwindCSS"],
    badge_color: "from-cyan-500 to-blue-600"
  },
  {
    id: "cs-4",
    category: "uiux",
    title_id: "Redesign Arsitektur Informasi & Modular Design System B2B Marketplace",
    title_en: "B2B Marketplace UI/UX Architecture & Modular Design System",
    client: "IndoSupply B2B Commerce",
    client_id_desc: "Platform pengadaan barang industri dan wholesale antar perusahaan di Indonesia.",
    client_en_desc: "Industrial procurement and wholesale B2B marketplace platform in Indonesia.",
    tag: "UI/UX & Design System",
    impact_id: "Peningkatan rasio konversi checkout pengadaan sebesar +38%",
    impact_en: "+38% checkout conversion increase for wholesale procurement workflows",
    desc_id: "Audit UX menyeluruh, user journey mapping untuk manajer purchasing korporat, perancangan Figma design tokens, dan prototyping interaktif teruji usability testing.",
    desc_en: "Comprehensive UX audit, user journey mapping for enterprise purchasing officers, Figma tokenized design system, and usability-tested interactive prototypes.",
    challenge_id: "Alur checkout B2B yang rumit (multi-tier approvals, credit terms, purchase orders) membuat tingkat drop-off pengguna baru cukup tinggi (52%).",
    challenge_en: "Complex B2B checkout flows (multi-tier approvals, credit lines, PO tracking) caused a high drop-off rate (52%) among first-time corporate buyers.",
    solution_id: "Penyederhanaan step approval dengan micro-interactions, panduan visual hirarkis yang jelas, dan modular component library siap koding.",
    solution_en: "Streamlined multi-tier approval matrix with contextual micro-interactions, clear visual hierarchy, and production-ready code tokens.",
    tech_stack: ["Figma", "Design Tokens", "Design System", "User Research", "Interactive Prototyping"],
    badge_color: "from-purple-500 to-indigo-600"
  }
];

const teamData = [
  {
    name: "Ir. Rayhan Wicaksana, M.Sc.",
    role_id: "Chief Software Architect",
    role_en: "Chief Software Architect",
    bio_id: "12+ tahun pengalaman merancang distributed systems high-scale, mantan arsitek tier-1 tech company.",
    bio_en: "12+ yrs architecting high-scale distributed systems, ex-tier 1 tech architect."
  },
  {
    name: "Dimas Anggara, S.Kom.",
    role_id: "Engineering Lead",
    role_en: "Engineering Lead",
    bio_id: "Spesialis arsitektur cloud, performa backend, microservices, dan implementasi CI/CD zero-downtime.",
    bio_en: "Specialist in cloud architectures, high-performance backends, and zero-downtime CI/CD."
  },
  {
    name: "Nathania Aurelia, B.Des.",
    role_id: "Principal Product & UX Designer",
    role_en: "Principal Product & UX Designer",
    bio_id: "Berpengalaman merancang interface SaaS & Mobile apps enterprise berfokus pada conversion & accessibility.",
    bio_en: "Expert in enterprise SaaS & Mobile interface design with high focus on conversion & accessibility."
  }
];

const testimonialsData = [
  {
    quote_id: "Dutaglobaltech berhasil mentransformasi sistem logistik kami yang rumit menjadi platform yang super cepat dan stabil. Kecepatan response dan ketelitian engineering mereka luar biasa.",
    quote_en: "Dutaglobaltech successfully transformed our complex logistics stack into an ultra-fast, robust platform. Their engineering rigor and response speed are exceptional.",
    author: "Bambang Sudiro",
    title_id: "CTO, Global Cargo Nusantara",
    title_en: "CTO, Global Cargo Nusantara"
  },
  {
    quote_id: "Peluncuran aplikasi fintech kami berjalan tanpa glitch sedikitpun meski traffic melonjak hingga 500k req/min pada hari peluncuran. Dutaglobaltech adalah partner teknologi sejati.",
    quote_en: "Our fintech app launch executed flawlessly even when traffic spiked to 500k req/min on day one. Dutaglobaltech is a true technical powerhouse.",
    author: "Grace Fransiska",
    title_id: "VP of Product, Akselerasi Finansial",
    title_en: "VP of Product, Akselerasi Finansial"
  },
  {
    quote_id: "Proses pengerjaan transparan, metodologi Agile mereka sangat terstruktur dengan deliverables mingguan yang jelas. Sangat direkomendasikan untuk proyek enterprise.",
    quote_en: "Transparent process, structured Agile workflow with clear weekly deliverables. Highly recommended for enterprise-grade digital projects.",
    author: "dr. Adrian Hartanto",
    title_id: "Head of Digital, Medika Sehat Selaras",
    title_en: "Head of Digital, Medika Sehat Selaras"
  }
];

// --- Translations Dictionary ---
const i18nData = {
  id: {
    nav_home: "Beranda",
    nav_services: "Layanan",
    nav_cases: "Portofolio & Studi Kasus",
    nav_methodology: "Metodologi",
    nav_about: "Tentang Kami",
    nav_contact: "Kontak & Estimasi",
    nav_cta: "Konsultasi Proyek",
    
    hero_badge: "Enterprise Digital Project Development",
    hero_title: "Mentransformasi Ide Menjadi <span class='gradient-text'>Solusi Digital Berkelanjutan</span>",
    hero_subtitle: "Software house & digital agency rekanan strategis korporat untuk rekayasa perangkat lunak berstandar tinggi, skalabilitas enterprise, dan keamanan tingkat tinggi.",
    hero_btn_discuss: "Mulai Diskusi Proyek",
    hero_btn_portfolio: "Jelajahi Portofolio",
    
    stat_1_val: "50+",
    stat_1_lbl: "Proyek Berhasil",
    stat_2_val: "99.8%",
    stat_2_lbl: "Uptime SLA Guarantee",
    stat_3_val: "15+",
    stat_3_lbl: "Klien Korporat & Startup",
    stat_4_val: "< 2 Jam",
    stat_4_lbl: "Respon Konsultasi Cepat",
    
    services_badge: "Kapabilitas Teknis",
    services_title: "Layanan Rekayasa Digital Tingkat Enterprise",
    services_desc: "Kami menggabungkan arsitektur software mutakhir, desain berpusat pada pengguna, dan infrastruktur cloud handal untuk memvalidasi bisnis Anda.",
    
    srv_web_title: "Web & Enterprise Systems",
    srv_web_desc: "Pembangunan sistem internal kompleks, portal SaaS, ERP/CRM kustom, dashboard analitik data tingkat lanjut.",
    srv_mobile_title: "Mobile Apps Development",
    srv_mobile_desc: "Aplikasi mobile native maupun cross-platform berkinerja tinggi, responsif, dan optimal untuk iOS & Android.",
    srv_uiux_title: "UI/UX Design & Research",
    srv_uiux_desc: "Riset pengalaman pengguna, perancangan arsitektur informasi, wireframe interaktif, dan Design System modular.",
    srv_cloud_title: "Cloud, DevOps & Security",
    srv_cloud_desc: "Implementasi arsitektur cloud scalable, CI/CD pipeline otomatis, containerization, dan pengujian keamanan berlapis.",
    
    methodology_badge: "Standar Pengerjaan",
    methodology_title: "Metodologi Pengembangan Transparan (Agile)",
    methodology_desc: "Alur kerja terstruktur 4 tahap untuk memastikan deliverables presisi, mitigasi risiko, dan deployment tepat waktu.",
    step1_title: "1. Discovery & Strategy",
    step1_desc: "Analisis kebutuhan bisnis, penentuan arsitektur sistem, feasibility study, dan timeline roadmap yang detail.",
    step2_title: "2. UI/UX & Prototyping",
    step2_desc: "Pemetaan user journey, wireframe klik interaktif, penyusunan design token, dan usability testing.",
    step3_title: "3. Agile Dev & QA",
    step3_desc: "Sprint koding iteratif, Clean Code standard, unit & integration testing, serta continuous integration.",
    step4_title: "4. Cloud Deployment & SLA",
    step4_desc: "Orkestrasi kontainer, automated CI/CD, load balancing, monitoring performa 24/7, dan garansi SLA.",
    
    portfolio_badge: "Rekam Jejak Nyata",
    portfolio_title: "Portofolio & Studi Kasus Unggulan",
    portfolio_desc: "Eksplorasi bagaimana kami membantu korporat dan institusi membangun solusi digital berdampak terukur.",
    filter_all: "Semua Kategori",
    filter_web: "Web App",
    filter_mobile: "Mobile App",
    filter_enterprise: "Enterprise System",
    filter_uiux: "UI/UX & Design",
    btn_view_case: "Lihat Studi Kasus Lengkap",
    
    about_badge: "Integritas & Rekayasa",
    about_title: "Tentang Kami & Engineering Culture",
    about_desc: "Kami didirikan dengan visi menjadi katalis transformasi digital berskala global melalui solusi rekayasa teknologi presisi.",
    culture_1_title: "Standar Clean Code & Refactoring",
    culture_1_desc: "Kode yang modular, mudah dirawat (maintainable), terdokumentasi rapi, dan sesuai standar industri internasional.",
    culture_2_title: "Comprehensive Automated Testing",
    culture_2_desc: "Unit test, integration test, dan end-to-end testing menyeluruh untuk meminimalkan bug sebelum rilis produksi.",
    culture_3_title: "Zero-Trust Security & Data Protection",
    culture_3_desc: "Enkripsi data berlapis, audit kerentanan berkala, dan kepatuhan privasi data berstandar enterprise.",
    team_title: "Kepemimpinan Teknis & Core Team",
    
    testi_badge: "Validasi Klien",
    testi_title: "Apa Kata Klien & Rekan Bisnis Kami",
    
    estimator_badge: "Mulai Kolaborasi",
    estimator_title: "Formulir Kontak & Interactive Scope Estimator",
    estimator_desc: "Gunakan kalkulator estimasi kebutuhan di bawah ini untuk merancang ruang lingkup proyek Anda dan dapatkan proposal teknis cepat.",
    scope_title: "1. Pilih Lingkup Solusi yang Dibutuhkan:",
    scope_opt_web: "Web & Enterprise System",
    scope_opt_mobile: "Mobile App (iOS/Android)",
    scope_opt_cloud: "Cloud & DevOps Architecture",
    scope_opt_uiux: "UI/UX & Design System Redesign",
    
    budget_lbl: "2. Estimasi Anggaran Proyek (Budget Range):",
    budget_opt_1: "Pilih rentang estimasi anggaran...",
    budget_opt_2: "Rp 35 Juta - Rp 75 Juta (Fase MVP / Modul Spesifik)",
    budget_opt_3: "Rp 75 Juta - Rp 200 Juta (Sistem Skala Menengah)",
    budget_opt_4: "Rp 200 Juta+ (Sistem Enterprise Penuh / Multi-Platform)",
    
    timeline_lbl: "3. Target Waktu Peluncuran (Timeline):",
    timeline_opt_1: "Pilih target pengerjaan...",
    timeline_opt_2: "1 - 2 Bulan (Fast-Track / Sprint Intensif)",
    timeline_opt_3: "3 - 5 Bulan (Standar Produksi Menyeluruh)",
    timeline_opt_4: "6+ Bulan (Transformasi Sistem Jangka Panjang)",
    
    summary_lbl: "4. Ringkasan Kebutuhan Proyek & Problem Statement:",
    summary_placeholder: "Deskripsikan tujuan proyek Anda, tantangan utama yang ingin diselesaikan, atau fitur kunci yang diharapkan...",
    
    btn_submit_lead: "Kirim Permintaan Konsultasi & Proposal",
    direct_wa_btn: "Chat WhatsApp Representatif",
    direct_meet_btn: "Booking Jadwal Video Conference (Google Meet)",
    
    viewer_active: "Aktif Online:",
    viewer_total: "Total Kunjungan:",
    viewer_online_unit: "Pengunjung",

    footer_summary: "Dutaglobaltech adalah Software House & Digital Project Development Company terdepan yang berfokus pada pembangunan solusi digital B2B dan korporat berstandar enterprise.",
    footer_quick_links: "Tautan Cepat",
    footer_services: "Layanan Teknis",
    footer_contact_title: "Kontak & Alamat Kantor",
    footer_rights: "© 2026 Dutaglobaltech. Hak Cipta Dilindungi. All Rights Reserved."
  },
  en: {
    nav_home: "Home",
    nav_services: "Services",
    nav_cases: "Portfolio & Cases",
    nav_methodology: "Methodology",
    nav_about: "About Us",
    nav_contact: "Contact & Estimator",
    nav_cta: "Consult Project",
    
    hero_badge: "Enterprise Digital Project Development",
    hero_title: "Transforming Ideas into <span class='gradient-text'>Sustainable Digital Solutions</span>",
    hero_subtitle: "Premier software house & digital agency partnering with corporations for high-standard software engineering, enterprise scalability, and robust security.",
    hero_btn_discuss: "Start Project Discussion",
    hero_btn_portfolio: "Explore Portfolio",
    
    stat_1_val: "50+",
    stat_1_lbl: "Delivered Projects",
    stat_2_val: "99.8%",
    stat_2_lbl: "Uptime SLA Guarantee",
    stat_3_val: "15+",
    stat_3_lbl: "Enterprise & Scaleup Clients",
    stat_4_val: "< 2 Hours",
    stat_4_lbl: "Consultation Response Time",
    
    services_badge: "Technical Capabilities",
    services_title: "Enterprise-Grade Digital Engineering Services",
    services_desc: "We combine state-of-the-art software architecture, user-centric design, and resilient cloud infrastructure to validate and scale your business.",
    
    srv_web_title: "Web & Enterprise Systems",
    srv_web_desc: "Complex internal systems, SaaS platforms, custom ERP/CRM, and advanced data analytics dashboards.",
    srv_mobile_title: "Mobile Apps Development",
    srv_mobile_desc: "High-performance native and cross-platform mobile apps for iOS and Android ecosystems.",
    srv_uiux_title: "UI/UX Design & Research",
    srv_uiux_desc: "User experience research, information architecture, interactive wireframing, and modular Design Systems.",
    srv_cloud_title: "Cloud, DevOps & Security",
    srv_cloud_desc: "Scalable cloud architecture, automated CI/CD pipelines, containerization, and multi-layered security audits.",
    
    methodology_badge: "Execution Standards",
    methodology_title: "Transparent Agile Development Methodology",
    methodology_desc: "A structured 4-phase workflow ensuring precision deliverables, risk mitigation, and on-schedule deployment.",
    step1_title: "1. Discovery & Strategy",
    step1_desc: "Business requirements analysis, architecture blueprints, technical feasibility study, and structured roadmaps.",
    step2_title: "2. UI/UX & Prototyping",
    step2_desc: "User journey mapping, interactive clickable wireframes, design token setup, and empirical usability tests.",
    step3_title: "3. Agile Dev & QA",
    step3_desc: "Iterative sprints, Clean Code standards, automated unit & integration testing, and continuous delivery.",
    step4_title: "4. Cloud Deployment & SLA",
    step4_desc: "Container orchestration, automated CI/CD, load balancing, 24/7 performance monitoring, and SLA guarantee.",
    
    portfolio_badge: "Proof of Execution",
    portfolio_title: "Featured Case Studies & Portfolio",
    portfolio_desc: "Explore how we helped enterprises and digital leaders engineer measurable business outcomes.",
    filter_all: "All Categories",
    filter_web: "Web App",
    filter_mobile: "Mobile App",
    filter_enterprise: "Enterprise System",
    filter_uiux: "UI/UX & Design",
    btn_view_case: "View Full Case Study",
    
    about_badge: "Integrity & Rigor",
    about_title: "About Us & Engineering Culture",
    about_desc: "Founded with the vision to be a global catalyst of digital transformation through precision technology engineering.",
    culture_1_title: "Clean Code & Refactoring Standards",
    culture_1_desc: "Modular, highly maintainable, thoroughly documented code that strictly follows modern industry benchmarks.",
    culture_2_title: "Comprehensive Automated Testing",
    culture_2_desc: "Unit, integration, and end-to-end testing suites to eliminate regressions before production release.",
    culture_3_title: "Zero-Trust Security & Data Protection",
    culture_3_desc: "Multi-layer data encryption, periodic vulnerability assessments, and enterprise privacy compliance.",
    team_title: "Technical Leadership & Core Team",
    
    testi_badge: "Client Validation",
    testi_title: "What Our Corporate Partners Say",
    
    estimator_badge: "Start Collaboration",
    estimator_title: "Contact & Interactive Scope Estimator",
    estimator_desc: "Use the scope calculator below to configure your technical project specifications and receive a fast proposal.",
    scope_title: "1. Select Required Solution Scopes:",
    scope_opt_web: "Web & Enterprise System",
    scope_opt_mobile: "Mobile App (iOS/Android)",
    scope_opt_cloud: "Cloud & DevOps Architecture",
    scope_opt_uiux: "UI/UX & Design System Redesign",
    
    budget_lbl: "2. Estimated Project Budget Range:",
    budget_opt_1: "Select estimated budget range...",
    budget_opt_2: "IDR 35M - 75M / ~$2.5k - $5k (MVP / Modular Feature)",
    budget_opt_3: "IDR 75M - 200M / ~$5k - $14k (Mid-Scale System)",
    budget_opt_4: "IDR 200M+ / ~$14k+ (Full Enterprise / Multi-Platform)",
    
    timeline_lbl: "3. Target Launch Timeline:",
    timeline_opt_1: "Select delivery target...",
    timeline_opt_2: "1 - 2 Months (Fast-Track / Intensive Sprint)",
    timeline_opt_3: "3 - 5 Months (Comprehensive Production Standard)",
    timeline_opt_4: "6+ Months (Long-term Enterprise Architecture)",
    
    summary_lbl: "4. Project Summary & Problem Statement:",
    summary_placeholder: "Describe your project goals, technical bottlenecks to solve, or key requirements...",
    
    btn_submit_lead: "Submit Consultation Request & Proposal",
    direct_wa_btn: "WhatsApp Representative Chat",
    direct_meet_btn: "Schedule Video Conference (Google Meet)",
    
    viewer_active: "Active Online:",
    viewer_total: "Total Profile Views:",
    viewer_online_unit: "Leads Online",

    footer_summary: "Dutaglobaltech is a leading Software House & Digital Project Development Company dedicated to engineering enterprise B2B solutions.",
    footer_quick_links: "Quick Links",
    footer_services: "Technical Services",
    footer_contact_title: "Contact & Headquarter",
    footer_rights: "© 2026 Dutaglobaltech. All Rights Reserved."
  }
};

// --- Application State ---
let currentLang = localStorage.getItem("dgt_lang") || "id";
let currentTheme = localStorage.getItem("dgt_theme") || "dark";
let activeCategory = "all";
let currentActiveViewers = 14;

// --- DOM Initializer ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initI18n();
  initViewerCount();
  renderCaseStudies();
  renderTeam();
  renderTestimonials();
  initScopeEstimator();
  initEventListeners();
  initScrollSpy();
});

// --- Theme Management ---
function initTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    themeIcon.textContent = currentTheme === "dark" ? "☀️" : "🌙";
  }
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("dgt_theme", currentTheme);
  initTheme();
}

// --- Multi-Language (i18n) Engine ---
function initI18n() {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
  
  const dict = i18nData[currentLang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  renderCaseStudies();
  renderTeam();
  renderTestimonials();
  updateEstimatorSummary();
  updateViewerDisplay(parseInt(localStorage.getItem("dgt_total_visits") || "14820"));
}

function switchLang(lang) {
  if (currentLang === lang) return;
  currentLang = lang;
  localStorage.setItem("dgt_lang", lang);
  initI18n();
}

// --- Live Viewer Count Engine ---
function initViewerCount() {
  // Retrieve or initialize total visits
  let totalVisits = parseInt(localStorage.getItem("dgt_total_visits"));
  if (!totalVisits || isNaN(totalVisits)) {
    totalVisits = 14820;
  }
  
  // Increment view on session
  const lastVisitTime = sessionStorage.getItem("dgt_session_active");
  if (!lastVisitTime) {
    totalVisits += 1;
    localStorage.setItem("dgt_total_visits", totalVisits);
    sessionStorage.setItem("dgt_session_active", Date.now());
  }

  updateViewerDisplay(totalVisits);

  // Periodic active viewers micro-fluctuation (12 to 24 online enterprise leads)
  setInterval(() => {
    const delta = (Math.random() > 0.48 ? 1 : -1) * Math.floor(Math.random() * 2 + 1);
    currentActiveViewers = Math.max(11, Math.min(26, currentActiveViewers + delta));
    updateViewerDisplay(totalVisits);
  }, 4500);
}

function updateViewerDisplay(totalVisits) {
  const activeEl = document.getElementById("active-viewers-count");
  const totalEl = document.getElementById("total-viewers-count");
  const isId = currentLang === "id";

  if (activeEl) {
    activeEl.textContent = `${currentActiveViewers} ${isId ? "Pengunjung" : "Online"}`;
  }

  if (totalEl) {
    const formattedTotal = (totalVisits || 14820).toLocaleString(isId ? "id-ID" : "en-US");
    totalEl.textContent = formattedTotal;
  }
}

// --- Case Studies Rendering & Filtering ---
function renderCaseStudies() {
  const container = document.getElementById("case-studies-container");
  if (!container) return;

  const filtered = activeCategory === "all" 
    ? caseStudiesData 
    : caseStudiesData.filter(item => item.category === activeCategory || (item.categories && item.categories.includes(activeCategory)));

  container.innerHTML = filtered.map(item => {
    const title = currentLang === "id" ? item.title_id : item.title_en;
    const desc = currentLang === "id" ? item.desc_id : item.desc_en;
    const impact = currentLang === "id" ? item.impact_id : item.impact_en;
    const btnText = currentLang === "id" ? "Detail Studi Kasus →" : "Case Study Breakdown →";

    const techBadges = item.tech_stack.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join("");

    return `
      <div class="case-study-card">
        <div class="case-study-thumb">
          <span class="case-study-badge">${item.tag}</span>
          <div style="font-size: 2.4rem; margin-bottom: 6px;">🚀</div>
          <div style="font-weight: 700; color: white; font-size: 1rem;">${item.client}</div>
        </div>
        <div class="case-study-body">
          <div class="case-study-client">${item.client}</div>
          <h4 class="case-study-title">${title}</h4>
          <p class="case-study-desc">${desc}</p>
          <div class="case-study-impact">
            <span>⚡</span>
            <span><strong>Impact:</strong> ${impact}</span>
          </div>
          <div class="tech-tags" style="margin-bottom: 18px;">
            ${techBadges}
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <button class="btn btn-secondary btn-sm" onclick="openCaseStudyModal('${item.id}')">
              ${btnText}
            </button>
            ${item.live_url ? `
              <a href="${item.live_url}" target="_blank" class="btn btn-primary btn-sm" style="font-size: 0.8rem; padding: 7px 12px; background: linear-gradient(135deg, #059669 0%, #0d9488 100%);" title="Buka website ${item.live_url_display}">
                🌐 ${item.live_url_display} ↗
              </a>
            ` : ""}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function filterCategory(category, btnElement) {
  activeCategory = category;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");
  renderCaseStudies();
}

// --- Case Study Anatomy Modal ---
function openCaseStudyModal(id) {
  const study = caseStudiesData.find(c => c.id === id);
  if (!study) return;

  const isId = currentLang === "id";
  const modal = document.getElementById("case-modal");
  const modalBody = document.getElementById("case-modal-body");
  const modalTitle = document.getElementById("case-modal-title");

  modalTitle.textContent = isId ? study.title_id : study.title_en;

  const stackHtml = study.tech_stack.map(t => `<span class="tech-tag">${t}</span>`).join(" ");

  modalBody.innerHTML = `
    <div style="margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <div>
        <span class="section-badge">${study.tag}</span>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-top: 4px;">${study.client}</h3>
      </div>
      <div class="tech-tags">${stackHtml}</div>
    </div>

    <div class="case-anatomy-block">
      <div class="case-anatomy-title">🏢 ${isId ? "1. Client & Background" : "1. Client & Background"}</div>
      <p style="font-size: 0.9rem; color: var(--text-secondary);">${isId ? study.client_id_desc : study.client_en_desc}</p>
    </div>

    <div class="case-anatomy-block">
      <div class="case-anatomy-title">⚠️ ${isId ? "2. Tantangan Spesifik & Bottleneck" : "2. Specific Challenges & Bottleneck"}</div>
      <p style="font-size: 0.9rem; color: var(--text-secondary);">${isId ? study.challenge_id : study.challenge_en}</p>
    </div>

    <div class="case-anatomy-block">
      <div class="case-anatomy-title">🛠️ ${isId ? "3. Solusi Rekayasa Dutaglobaltech" : "3. Dutaglobaltech Engineering Solution"}</div>
      <p style="font-size: 0.9rem; color: var(--text-secondary);">${isId ? study.solution_id : study.solution_en}</p>
    </div>

    <div class="case-anatomy-block" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.3);">
      <div class="case-anatomy-title" style="color: var(--accent-emerald);">📈 ${isId ? "4. Dampak Terukur (Business Impact)" : "4. Measurable Business Impact"}</div>
      <p style="font-size: 0.92rem; font-weight: 600; color: var(--text-primary);">${isId ? study.impact_id : study.impact_en}</p>
    </div>

    <div style="margin-top: 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
      ${study.live_url ? `
        <a href="${study.live_url}" target="_blank" class="btn btn-secondary btn-sm" style="border-color: var(--accent-primary); color: var(--accent-primary); display: inline-flex; align-items: center; gap: 6px;">
          🌐 ${isId ? "Kunjungi Website Langsung" : "Visit Live Platform"}: <strong>${study.live_url_display}</strong> ↗
        </a>
      ` : "<div></div>"}
      <a href="#contact" onclick="closeCaseStudyModal();" class="btn btn-primary btn-sm">
        ${isId ? "Diskusikan Proyek Serupa 🚀" : "Discuss Similar Project 🚀"}
      </a>
    </div>
  `;

  modal.classList.add("active");
}

function closeCaseStudyModal() {
  const modal = document.getElementById("case-modal");
  if (modal) modal.classList.remove("active");
}

// --- Team Rendering ---
function renderTeam() {
  const container = document.getElementById("team-container");
  if (!container) return;

  const isId = currentLang === "id";
  container.innerHTML = teamData.map(member => `
    <div class="team-card">
      <div class="team-avatar">👨‍💻</div>
      <div class="team-name">${member.name}</div>
      <div class="team-role">${isId ? member.role_id : member.role_en}</div>
      <div class="team-bio">${isId ? member.bio_id : member.bio_en}</div>
    </div>
  `).join("");
}

// --- Testimonials Rendering ---
function renderTestimonials() {
  const container = document.getElementById("testimonials-container");
  if (!container) return;

  const isId = currentLang === "id";
  container.innerHTML = testimonialsData.map(item => `
    <div class="testimonial-card">
      <div class="testimonial-rating">★★★★★</div>
      <p class="testimonial-text">"${isId ? item.quote_id : item.quote_en}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${item.author.charAt(0)}</div>
        <div>
          <div class="author-name">${item.author}</div>
          <div class="author-title">${isId ? item.title_id : item.title_en}</div>
        </div>
      </div>
    </div>
  `).join("");
}

// --- Interactive Scope Estimator Logic ---
function initScopeEstimator() {
  document.querySelectorAll(".scope-option-card").forEach(card => {
    card.addEventListener("click", () => {
      const checkbox = card.querySelector("input[type='checkbox']");
      checkbox.checked = !checkbox.checked;
      card.classList.toggle("selected", checkbox.checked);
      updateEstimatorSummary();
    });
  });

  const budgetSelect = document.getElementById("lead-budget");
  const timelineSelect = document.getElementById("lead-timeline");
  if (budgetSelect) budgetSelect.addEventListener("change", updateEstimatorSummary);
  if (timelineSelect) timelineSelect.addEventListener("change", updateEstimatorSummary);
}

function updateEstimatorSummary() {
  const isId = currentLang === "id";
  const selectedScopes = [];
  document.querySelectorAll(".scope-option-card input:checked").forEach(cb => {
    selectedScopes.push(cb.value);
  });

  const count = selectedScopes.length;
  const summaryEl = document.getElementById("estimator-summary-text");
  const badgeEl = document.getElementById("estimator-summary-count");

  if (badgeEl) {
    badgeEl.textContent = `${count} ${isId ? "Modul Terpilih" : "Modules Selected"}`;
  }

  if (summaryEl) {
    if (count === 0) {
      summaryEl.textContent = isId 
        ? "Pilih minimal 1 modul untuk melihat estimasi arsitektur." 
        : "Select at least 1 module to view architecture estimate.";
    } else {
      summaryEl.textContent = isId
        ? `Arsitektur Terpilih: ${selectedScopes.join(", ")}. Tim siap menyusun proposal arsitektur teknis.`
        : `Selected Scope: ${selectedScopes.join(", ")}. Our architects are ready to prepare your blueprint.`;
    }
  }
}

function handleLeadSubmit(event) {
  event.preventDefault();
  const isId = currentLang === "id";
  
  const name = document.getElementById("lead-name").value.trim();
  const email = document.getElementById("lead-email").value.trim();
  const company = document.getElementById("lead-company").value.trim() || "-";
  const budget = document.getElementById("lead-budget").value;
  const timeline = document.getElementById("lead-timeline").value;
  const summary = document.getElementById("lead-summary").value.trim();

  const selectedScopes = [];
  document.querySelectorAll(".scope-option-card input:checked").forEach(cb => {
    selectedScopes.push(cb.value);
  });

  if (selectedScopes.length === 0) {
    alert(isId ? "Silakan pilih minimal 1 lingkup solusi proyek." : "Please select at least 1 project scope.");
    return;
  }

  // Compose WhatsApp Message
  const waText = `Halo Dutaglobaltech, saya ingin mendiskusikan kebutuhan proyek digital:\n\n` +
    `👤 Nama: ${name}\n` +
    `🏢 Perusahaan: ${company}\n` +
    `📧 Email: ${email}\n` +
    `🛠️ Lingkup Kebutuhan: ${selectedScopes.join(", ")}\n` +
    `💰 Estimasi Budget: ${budget}\n` +
    `⏱️ Timeline: ${timeline}\n` +
    `📝 Ringkasan Proyek: ${summary || "Terlampir dalam diskusi awal"}\n\n` +
    `Mohon dijadwalkan sesi konsultasi teknis / video call. Terima kasih!`;

  const waUrl = `https://wa.me/6287781047453?text=${encodeURIComponent(waText)}`;
  
  alert(isId 
    ? "Terima kasih! Permintaan Anda telah kami rekam. Anda akan dialihkan ke WhatsApp Business Dutaglobaltech untuk melanjutkan diskusi teknis." 
    : "Thank you! Your inquiry is registered. You will now be redirected to Dutaglobaltech's WhatsApp for the technical discussion.");

  window.open(waUrl, "_blank");
}

// --- ScrollSpy & Active Nav State ---
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    sidebarLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active");
      }
    });
  });
}

// --- Event Listeners & Mobile Sidebar Toggle ---
function initEventListeners() {
  const mobileToggleBtn = document.getElementById("mobile-toggle-btn");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");

  if (mobileToggleBtn && sidebar && backdrop) {
    mobileToggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      backdrop.classList.toggle("active");
    });

    backdrop.addEventListener("click", () => {
      sidebar.classList.remove("active");
      backdrop.classList.remove("active");
    });

    document.querySelectorAll(".sidebar-link").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1080) {
          sidebar.classList.remove("active");
          backdrop.classList.remove("active");
        }
      });
    });
  }

  // Close modal on click backdrop
  const modalBackdrop = document.getElementById("case-modal");
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeCaseStudyModal();
      }
    });
  }
}
