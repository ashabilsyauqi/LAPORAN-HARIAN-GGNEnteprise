/**
 * JURAGANKOS ID - LOGIKA BISNIS & OPERASIONAL KOS
 * Management Dashboard Engine
 */

const JuraganState = {
  property: {},
  rooms: [],
  tenants: [],
  transactions: [],
  complaints: [],
  currentTab: 'dashboard',
  darkMode: false,
  activeFilterFloor: 'all',
  activeFilterRoomStatus: 'all',
  activeFilterTenantStatus: 'all'
};

// Currency Formatter
const formatRupiah = (num) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num || 0);
};

// Date Formatter
const formatDateIndo = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initTheme();
  setupEventListeners();
  switchTab('dashboard');
});

// Load Data from LocalStorage or Default
function loadData() {
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
      loadDefaults();
    }
  } else {
    loadDefaults();
  }
}

function loadDefaults() {
  JuraganState.property = { ...JURAGAN_DEFAULT_DATA.property };
  JuraganState.rooms = JSON.parse(JSON.stringify(JURAGAN_DEFAULT_DATA.rooms));
  JuraganState.tenants = JSON.parse(JSON.stringify(JURAGAN_DEFAULT_DATA.tenants));
  JuraganState.transactions = JSON.parse(JSON.stringify(JURAGAN_DEFAULT_DATA.transactions));
  JuraganState.complaints = JSON.parse(JSON.stringify(JURAGAN_DEFAULT_DATA.complaints));
  saveData();
}

function saveData() {
  localStorage.setItem('juragankos_data_v1', JSON.stringify({
    property: JuraganState.property,
    rooms: JuraganState.rooms,
    tenants: JuraganState.tenants,
    transactions: JuraganState.transactions,
    complaints: JuraganState.complaints
  }));
}

// Dark Mode
function initTheme() {
  const savedTheme = localStorage.getItem('juragan_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    JuraganState.darkMode = true;
    document.documentElement.classList.add('dark');
  } else {
    JuraganState.darkMode = false;
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();
}

function toggleDarkMode() {
  JuraganState.darkMode = !JuraganState.darkMode;
  if (JuraganState.darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('juragan_theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('juragan_theme', 'light');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerHTML = JuraganState.darkMode 
      ? '<i class="fa-solid fa-sun text-amber-400 text-lg"></i>' 
      : '<i class="fa-solid fa-moon text-slate-600 text-lg"></i>';
  }
}

// Navigation Tab Switcher
function switchTab(tabId) {
  JuraganState.currentTab = tabId;

  // Update nav buttons
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabId;
    if (isTarget) {
      btn.className = "nav-tab-btn flex items-center gap-3 px-4 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-md transition-all";
    } else {
      btn.className = "nav-tab-btn flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm transition-all";
    }
  });

  // Hide/Show tab views
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.add('hidden');
  });

  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) {
    targetView.classList.remove('hidden');
  }

  // Refresh tab content
  if (tabId === 'dashboard') renderDashboard();
  if (tabId === 'kamar') renderRooms();
  if (tabId === 'penyewa') renderTenants();
  if (tabId === 'keuangan') renderFinance();
  if (tabId === 'keluhan') renderComplaints();
  if (tabId === 'pengaturan') renderSettings();
}

// ==================== 1. DASHBOARD ====================
function renderDashboard() {
  const totalRooms = JuraganState.rooms.length;
  const occupiedRooms = JuraganState.rooms.filter(r => r.status === 'occupied').length;
  const availableRooms = JuraganState.rooms.filter(r => r.status === 'available').length;
  const maintenanceRooms = JuraganState.rooms.filter(r => r.status === 'maintenance').length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  // Financial Stats (Current Month)
  const currentYearMonth = new Date().toISOString().slice(0, 7); // "2026-09"
  
  let incomeThisMonth = 0;
  let expenseThisMonth = 0;

  JuraganState.transactions.forEach(t => {
    if (t.date && t.date.startsWith(currentYearMonth)) {
      if (t.type === 'income') incomeThisMonth += t.amount;
      if (t.type === 'expense') expenseThisMonth += t.amount;
    }
  });

  const netProfit = incomeThisMonth - expenseThisMonth;

  // Unpaid Rent Calculation
  const activeTenants = JuraganState.tenants.filter(t => t.status === 'active');
  const unpaidTenants = activeTenants.filter(t => t.paymentStatus !== 'paid');
  const totalUnpaidAmount = unpaidTenants.reduce((sum, t) => sum + t.monthlyRent, 0);

  // Update DOM
  document.getElementById('statTotalRooms').textContent = totalRooms;
  document.getElementById('statOccupiedRooms').textContent = occupiedRooms;
  document.getElementById('statAvailableRooms').textContent = availableRooms;
  document.getElementById('statMaintenanceRooms').textContent = maintenanceRooms;
  document.getElementById('statOccupancyRate').textContent = `${occupancyRate}%`;
  document.getElementById('statOccupancyBar').style.width = `${occupancyRate}%`;

  document.getElementById('statIncomeMonth').textContent = formatRupiah(incomeThisMonth);
  document.getElementById('statExpenseMonth').textContent = formatRupiah(expenseThisMonth);
  document.getElementById('statNetProfit').textContent = formatRupiah(netProfit);
  document.getElementById('statUnpaidAmount').textContent = formatRupiah(totalUnpaidAmount);
  document.getElementById('statUnpaidCount').textContent = `${unpaidTenants.length} Penyewa`;

  // Property Header Info
  document.getElementById('dashPropertyName').textContent = JuraganState.property.name;
  document.getElementById('dashOwnerName').textContent = `Dikelola oleh: ${JuraganState.property.owner}`;

  // Render Overdue Alert List
  renderDueSoonAlerts(unpaidTenants);
  // Render Recent Activity / Transactions
  renderRecentTransactions();
}

function renderDueSoonAlerts(unpaidList) {
  const container = document.getElementById('dueAlertsContainer');
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

function renderRecentTransactions() {
  const container = document.getElementById('recentTransactionsContainer');
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

// ==================== 2. MANAJEMEN KAMAR ====================
function renderRooms() {
  const container = document.getElementById('roomsGridContainer');
  if (!container) return;

  let list = [...JuraganState.rooms];

  if (JuraganState.activeFilterFloor !== 'all') {
    list = list.filter(r => r.floor === parseInt(JuraganState.activeFilterFloor));
  }

  if (JuraganState.activeFilterRoomStatus !== 'all') {
    list = list.filter(r => r.status === JuraganState.activeFilterRoomStatus);
  }

  // Sort by room number
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
          <!-- Header -->
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

          <!-- Price & Size -->
          <div class="mb-4">
            <div class="text-base font-extrabold text-blue-600 dark:text-blue-400">
              ${formatRupiah(room.priceMonthly)}<span class="text-xs font-normal text-slate-400">/bln</span>
            </div>
            <div class="text-xs text-slate-500"><i class="fa-solid fa-vector-square mr-1 text-slate-400"></i>Ukuran: ${room.size}</div>
          </div>

          <!-- Tenant Info if Occupied -->
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

        <!-- Action Buttons -->
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
          <button onclick="openEditRoomModal('${room.id}')" title="Edit Kamar" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 text-xs transition-colors">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Filter Rooms by Floor / Status
function filterRooms(type, val, element) {
  if (type === 'floor') JuraganState.activeFilterFloor = val;
  if (type === 'status') JuraganState.activeFilterRoomStatus = val;

  // Active styles
  element.parentElement.querySelectorAll('button').forEach(b => {
    b.classList.remove('bg-blue-600', 'text-white');
    b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
  });
  element.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
  element.classList.add('bg-blue-600', 'text-white');

  renderRooms();
}

// ==================== 3. MANAJEMEN PENYEWA (CRM) ====================
function renderTenants() {
  const container = document.getElementById('tenantsTableBody');
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
    const room = JuraganState.rooms.find(r => r.id === tenant.roomId);
    
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

// Mark as Paid
function markAsPaid(tenantId) {
  const tenant = JuraganState.tenants.find(t => t.id === tenantId);
  if (!tenant) return;

  tenant.paymentStatus = 'paid';

  // Add Income Transaction
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
  saveData();
  showToast(`Pembayaran sewa ${tenant.name} berhasil dicatat lunas! 🎉`);

  if (JuraganState.currentTab === 'dashboard') renderDashboard();
  if (JuraganState.currentTab === 'kamar') renderRooms();
  if (JuraganState.currentTab === 'penyewa') renderTenants();
}

// WhatsApp Bill Generator
function sendWhatsAppInvoice(tenantId) {
  const tenant = JuraganState.tenants.find(t => t.id === tenantId);
  if (!tenant) return;

  const prop = JuraganState.property;
  const message = 
`Halo Kak *${tenant.name}*,
Salam dari pengelola *${prop.name}*.

Kami ingin menginformasikan rincian tagihan sewa kamar kos Anda:
🏠 *Kamar:* No. ${tenant.roomNumber}
🗓️ *Jatuh Tempo:* ${formatDateIndo(tenant.dueDate)}
💰 *Total Tagihan:* ${formatRupiah(tenant.monthlyRent)}

Pembayaran dapat ditransfer melalui:
🏦 *Bank:* ${prop.bankName}
💳 *No. Rekening:* ${prop.bankAccount}
👤 *Atas Nama:* ${prop.bankHolder}

Mohon konfirmasi bukti transfer jika sudah melakukan pembayaran ya kak. Terima kasih banyak! 🙏`;

  const cleanPhone = tenant.phone.replace(/[^0-9]/g, '');
  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  showToast(`Membuka WhatsApp untuk mengirim tagihan ke ${tenant.name}`);
}

// Digital Kwitansi / Receipt Modal
function openReceiptModal(tenantId) {
  const tenant = JuraganState.tenants.find(t => t.id === tenantId);
  if (!tenant) return;

  const prop = JuraganState.property;
  const receiptNo = `KW-${Date.now().toString().slice(-6)}`;
  const today = formatDateIndo(new Date().toISOString());

  const container = document.getElementById('receiptModalBody');
  if (!container) return;

  container.innerHTML = `
    <div id="printableReceipt" class="p-8 bg-white text-slate-800 rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto font-sans">
      <!-- Receipt Header -->
      <div class="flex justify-between items-start pb-4 border-b-2 border-slate-800 mb-6">
        <div>
          <h2 class="text-xl font-black uppercase text-blue-600 tracking-wide">${prop.name}</h2>
          <p class="text-xs text-slate-500">${prop.address}</p>
          <p class="text-xs text-slate-500">Telp: ${prop.phone}</p>
        </div>
        <div class="text-right">
          <div class="text-xs font-black text-slate-400 uppercase">KWITANSI RESMI</div>
          <div class="text-sm font-extrabold text-slate-800">${receiptNo}</div>
          <div class="text-[11px] text-slate-500">${today}</div>
        </div>
      </div>

      <!-- Receipt Content -->
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
          <span class="font-bold text-slate-900">Sewa Kos Periode Jatuh Tempo ${formatDateIndo(tenant.dueDate)}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-slate-100">
          <span class="text-slate-500">Metode Pembayaran:</span>
          <span class="font-bold text-slate-900">Transfer Bank (${prop.bankName})</span>
        </div>
      </div>

      <!-- Amount Box -->
      <div class="p-4 rounded-xl bg-blue-50 border border-blue-200 flex justify-between items-center mb-8">
        <span class="font-bold text-xs text-blue-900 uppercase">Jumlah Pembayaran:</span>
        <span class="text-lg font-black text-blue-600">${formatRupiah(tenant.monthlyRent)}</span>
      </div>

      <!-- Signatures -->
      <div class="flex justify-between items-end pt-4 text-center text-xs">
        <div>
          <div class="text-[11px] text-slate-400 mb-12">Penyewa,</div>
          <div class="font-bold text-slate-800">(${tenant.name})</div>
        </div>
        <div>
          <div class="text-[11px] text-slate-400 mb-12">Pengelola Kos,</div>
          <div class="font-bold text-slate-800 underline">(${prop.owner})</div>
        </div>
      </div>
    </div>

    <!-- Modal Action Buttons -->
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

// ==================== 4. CHECK-IN & CHECK-OUT ====================
function openCheckInModal(roomId) {
  const room = JuraganState.rooms.find(r => r.id === roomId);
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
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pekerjaan / Instansi</label>
          <input type="text" id="ciJob" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none" placeholder="Mahasiswa / Karyawan">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kontak Darurat (Ortu/Kerabat)</label>
          <input type="text" id="ciEmergency" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none" placeholder="0813xxx (Ibu)">
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
  const job = document.getElementById('ciJob').value;
  const emergencyContact = document.getElementById('ciEmergency').value;
  const startDate = document.getElementById('ciStartDate').value;
  const dueDate = document.getElementById('ciDueDate').value;
  const deposit = parseFloat(document.getElementById('ciDeposit').value) || 0;

  const newTenant = {
    id: tenantId,
    name,
    phone,
    ktp,
    job,
    emergencyContact,
    roomId: room.id,
    roomNumber: room.number,
    startDate,
    dueDate,
    monthlyRent: room.priceMonthly,
    deposit,
    paymentStatus: 'paid', // initial payment
    status: 'active'
  };

  // Update room status
  room.status = 'occupied';
  room.currentTenantId = tenantId;

  // Add Tenant
  JuraganState.tenants.push(newTenant);

  // Add Initial Income Transaction (First Month Rent + Deposit)
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

  saveData();
  closeModal('checkInModal');
  showToast(`Penyewa ${name} berhasil check-in di Kamar ${room.number}! 🏠`);

  renderRooms();
  renderTenants();
  renderDashboard();
}

function openCheckOutModal(tenantId) {
  const tenant = JuraganState.tenants.find(t => t.id === tenantId);
  if (!tenant) return;

  if (confirm(`Apakah Anda yakin ingin melakukan proses Check-Out untuk ${tenant.name} dari Kamar ${tenant.roomNumber}? Deposit yang perlu dikembalikan: ${formatRupiah(tenant.deposit)}`)) {
    // Check out tenant
    tenant.status = 'inactive';

    // Free up room
    const room = JuraganState.rooms.find(r => r.id === tenant.roomId);
    if (room) {
      room.status = 'available';
      room.currentTenantId = null;
    }

    // Add Expense for Returned Deposit
    if (tenant.deposit > 0) {
      JuraganState.transactions.push({
        id: `TX-${Date.now()}`,
        type: 'expense',
        category: 'Pengembalian Deposit',
        date: new Date().toISOString().slice(0, 10),
        amount: tenant.deposit,
        tenantName: tenant.name,
        roomNumber: tenant.roomNumber,
        note: `Pengembalian uang jaminan deposit saat check-out`
      });
    }

    saveData();
    showToast(`Check-out ${tenant.name} berhasil! Kamar ${tenant.roomNumber} kini berstatus Kosong.`);
    renderRooms();
    renderTenants();
    renderDashboard();
  }
}

// ==================== 5. PEMBUKUAN KEUANGAN ====================
function renderFinance() {
  const container = document.getElementById('financeTableBody');
  if (!container) return;

  let totalIncome = 0;
  let totalExpense = 0;

  JuraganState.transactions.forEach(t => {
    if (t.type === 'income') totalIncome += t.amount;
    if (t.type === 'expense') totalExpense += t.amount;
  });

  document.getElementById('finTotalIncome').textContent = formatRupiah(totalIncome);
  document.getElementById('finTotalExpense').textContent = formatRupiah(totalExpense);
  document.getElementById('finNetBalance').textContent = formatRupiah(totalIncome - totalExpense);

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
  saveData();
  closeModal('addTransactionModal');
  e.target.reset();
  showToast('Transaksi keuangan berhasil ditambahkan! 💵');
  renderFinance();
  renderDashboard();
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

// ==================== 6. KELUHAN & PERBAIKAN ====================
function renderComplaints() {
  const container = document.getElementById('complaintsContainer');
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
  saveData();
  showToast('Status tiket keluhan berhasil diperbarui!');
  renderComplaints();
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

  saveData();
  closeModal('addComplaintModal');
  e.target.reset();
  showToast('Laporan keluhan berhasil didaftarkan!');
  renderComplaints();
}

// ==================== 7. PENGATURAN PROPERTI ====================
function renderSettings() {
  const prop = JuraganState.property;
  document.getElementById('setPropName').value = prop.name || '';
  document.getElementById('setOwnerName').value = prop.owner || '';
  document.getElementById('setPhone').value = prop.phone || '';
  document.getElementById('setBankName').value = prop.bankName || '';
  document.getElementById('setBankAccount').value = prop.bankAccount || '';
  document.getElementById('setBankHolder').value = prop.bankHolder || '';
  document.getElementById('setAddress').value = prop.address || '';
  document.getElementById('setRules').value = prop.rulesNote || '';
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

  saveData();
  showToast('Pengaturan properti kos berhasil disimpan! ✅');
  renderDashboard();
}

// ==================== 8. MODAL & TOAST ====================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    document.body.classList.add('overflow-hidden');
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('active');
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

function setupEventListeners() {
  // Listeners if needed
}
