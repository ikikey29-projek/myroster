// Raw Data extracted from provided courses
const rawCourses = [
    {
        id: 1,
        name: "Bahasa Indonesia",
        classCode: "TN",
        day: "Senin",
        startTime: "19:00",
        endTime: "20:40",
        room: "ONLINE",
        isOnline: true,
        lecturer: "I Nyoman Artana, S.Pd., M.Pd.",
        color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400"
    },
    {
        id: 2,
        name: "Jaringan Komputer",
        classCode: "G",
        day: "Selasa",
        startTime: "13:10",
        endTime: "15:40",
        room: "R122",
        isOnline: false,
        lecturer: "Made Dona Wahyu Aristana, S.Kom., M.Eng.",
        color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400"
    },
    {
        id: 3,
        name: "Keamanan Siber",
        classCode: "Z",
        day: "Selasa",
        startTime: "10:00",
        endTime: "12:20",
        room: "LAB G",
        isOnline: false,
        lecturer: "Ketut Ngurah Semadi, S.Kom, MMKom",
        color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400"
    },
    {
        id: 4,
        name: "Kewirausahaan",
        classCode: "TU",
        day: "Sabtu",
        startTime: "10:00",
        endTime: "11:40",
        room: "R533",
        isOnline: false,
        lecturer: "Dewa Ayu Giovany Angga Indrya, S.Kom., M.M",
        color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400"
    },
    {
        id: 5,
        name: "Object Oriented Analysis and Design",
        classCode: "A",
        day: "Senin",
        startTime: "10:00",
        endTime: "12:20",
        room: "R123",
        isOnline: false,
        lecturer: "Ir. Ni Wayan Jeri Kusuma Dewi, S.Kom., M.Kom.",
        color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400"
    },
    {
        id: 6,
        name: "Pemrograman Web Framework",
        classCode: "A",
        day: "Rabu",
        startTime: "10:00",
        endTime: "12:20",
        room: "LAB K",
        isOnline: false,
        lecturer: "Indra Pratistha, S.Kom., M.Cs.",
        color: "from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400"
    },
    {
        id: 7,
        name: "Pendidikan Kewarganegaraan",
        classCode: "TL",
        day: "Jumat",
        startTime: "17:20",
        endTime: "19:00",
        room: "ONLINE",
        isOnline: true,
        lecturer: "Ni Kadek Puspita Dewi, S.Pd., M.Pd.",
        color: "from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400"
    },
    {
        id: 8,
        name: "Pengantar Akuntansi",
        classCode: "A",
        day: "Jumat",
        startTime: "07:30",
        endTime: "10:00",
        room: "R123",
        isOnline: false,
        lecturer: "Ni Made Mila Rosa Desmayani, S.E., M.Si.",
        color: "from-lime-500/20 to-emerald-500/10 border-lime-500/30 text-lime-400"
    },
    {
        id: 9,
        name: "Tata Kelola dan Audit Teknologi Informasi",
        classCode: "XX",
        day: "Sabtu",
        startTime: "17:20",
        endTime: "19:50",
        room: "R343",
        isOnline: false,
        lecturer: "Ni Kadek Ariasih, S.Kom., M.T.",
        color: "from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-400"
    }
];

// Auth Credentials
const AUTH_CREDENTIALS = {
    nim: "2401010800",
    password: "Lembak2005"
};

// State Variables
let currentDayFilter = "ALL";
let searchQuery = "";
let activeView = "card"; // "card", "timetable", "today", "pertemuan", "daily-notes"
let selectedCourseIdForModal = null;
let currentSelectedPertemuanModal = 1;
let currentDashboardPertemuan = 1;
let editingDailyNoteId = null;

// Indonesian Days Mapping
const dayMap = {
    0: "Minggu",
    1: "Senin",
    2: "Selasa",
    3: "Rabu",
    4: "Kamis",
    5: "Jumat",
    6: "Sabtu"
};

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const dashboardApp = document.getElementById('dashboard-app');
const loginForm = document.getElementById('login-form');
const loginNimInput = document.getElementById('login-nim');
const loginPasswordInput = document.getElementById('login-password');
const loginErrorMsg = document.getElementById('login-error');
const togglePasswordBtn = document.getElementById('toggle-password-btn');
const passwordIcon = document.getElementById('password-icon');
const logoutBtn = document.getElementById('logout-btn');

const clockElem = document.getElementById('current-day-time');
const searchInput = document.getElementById('search-input');
const cardsContainer = document.getElementById('view-cards-container');
const timetableContainer = document.getElementById('view-timetable-container');
const todayContainer = document.getElementById('view-today-container');
const pertemuanContainer = document.getElementById('view-pertemuan-container');
const dailyNotesContainer = document.getElementById('view-daily-notes-container');

// Modal Elements
const modal = document.getElementById('course-modal');
const modalBox = document.getElementById('modal-box');
const modalTitle = document.getElementById('modal-course-title');
const modalCategory = document.getElementById('modal-category-badge');
const modalSchedule = document.getElementById('modal-schedule-text');
const modalRoom = document.getElementById('modal-room-text');
const modalLecturer = document.getElementById('modal-lecturer-text');
const modalNotesInput = document.getElementById('modal-notes-input');
const modalSaveBtn = document.getElementById('modal-save-note-btn');
const modalNoteSavedMsg = document.getElementById('modal-note-saved');
const modalPertemuanSelect = document.getElementById('modal-pertemuan-select');
const modalLinksContainer = document.getElementById('modal-links-container');

// Modal Tabs
const tabBtnPertemuan = document.getElementById('tab-btn-pertemuan');
const tabBtnLinks = document.getElementById('tab-btn-links');
const tabPertemuanContent = document.getElementById('modal-tab-pertemuan-content');
const tabLinksContent = document.getElementById('modal-tab-links-content');

// Daily Notes Form Elements
const dailyNoteFormCard = document.getElementById('daily-note-form-card');
const addDailyNoteBtn = document.getElementById('add-daily-note-btn');
const cancelDailyNoteBtn = document.getElementById('cancel-daily-note-btn');
const saveDailyNoteBtn = document.getElementById('save-daily-note-btn');
const dailyNoteTitleInput = document.getElementById('daily-note-title-input');
const dailyNoteContentInput = document.getElementById('daily-note-content-input');
const dailyNoteFormTitle = document.getElementById('daily-note-form-title');
const dailyNotesList = document.getElementById('daily-notes-list');

// Initialize App & Check Auth Session
window.addEventListener('DOMContentLoaded', () => {
    checkAuthSession();
    setupAuthListeners();
    initModalPertemuanOptions();
});

// Authentication System
function checkAuthSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    loginScreen.classList.remove('hidden');
    dashboardApp.classList.add('hidden');
}

function showDashboard() {
    loginScreen.classList.add('hidden');
    dashboardApp.classList.remove('hidden');

    // Run Dashboard Initialization
    startClock();
    renderStats();
    renderCards();
    renderTimetable();
    renderTodayView();
    renderPertemuanView();
    renderDailyNotesView();
    updateLiveTracker();
    setupDashboardEventListeners();
}

function setupAuthListeners() {
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = loginPasswordInput.type === 'password';
            loginPasswordInput.type = isPassword ? 'text' : 'password';
            passwordIcon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputNim = loginNimInput.value.trim();
            const inputPassword = loginPasswordInput.value.trim();

            if (inputNim === AUTH_CREDENTIALS.nim && inputPassword === AUTH_CREDENTIALS.password) {
                loginErrorMsg.classList.add('hidden');
                localStorage.setItem('isLoggedIn', 'true');
                showDashboard();
            } else {
                loginErrorMsg.classList.remove('hidden');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            loginNimInput.value = '';
            loginPasswordInput.value = '';
            loginErrorMsg.classList.add('hidden');
            showLogin();
        });
    }
}

// Realtime System Clock
function startClock() {
    const updateClock = () => {
        const now = new Date();
        const dayName = dayMap[now.getDay()];
        const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        clockElem.innerHTML = `<span class="text-brand-accent font-semibold">${dayName}</span>, ${dateStr} • ${timeStr}`;
    };
    updateClock();
    setInterval(updateClock, 1000);
    setInterval(updateLiveTracker, 30000);
}

// Calculate Live & Next Class Status
function updateLiveTracker() {
    const now = new Date();
    const currentDayStr = dayMap[now.getDay()];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const toMinutes = (timeStr) => {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    };

    const todaysCourses = rawCourses.filter(c => c.day === currentDayStr);
    
    let activeClass = null;
    let nextClass = null;

    todaysCourses.forEach(c => {
        const startMins = toMinutes(c.startTime);
        const endMins = toMinutes(c.endTime);

        if (currentMinutes >= startMins && currentMinutes <= endMins) {
            activeClass = c;
        } else if (currentMinutes < startMins) {
            if (!nextClass || startMins < toMinutes(nextClass.startTime)) {
                nextClass = c;
            }
        }
    });

    const statusTitle = document.getElementById('tracker-status-title');
    const statusBadge = document.getElementById('tracker-badge');
    const timeElem = document.getElementById('tracker-time');
    const locationElem = document.getElementById('tracker-location');
    const lecturerElem = document.getElementById('tracker-lecturer');
    const countdownVal = document.getElementById('tracker-countdown-val');
    const countdownLabel = document.getElementById('tracker-countdown-label');

    if (activeClass) {
        statusTitle.textContent = `${activeClass.name} - ${activeClass.classCode}`;
        statusBadge.innerHTML = `<span class="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full animate-pulse">BERLANGSUNG SEKARANG</span>`;
        timeElem.textContent = `${activeClass.startTime} - ${activeClass.endTime} WITA`;
        locationElem.textContent = activeClass.room;
        lecturerElem.textContent = activeClass.lecturer;
        
        const endMins = toMinutes(activeClass.endTime);
        const diffMins = endMins - currentMinutes;
        countdownLabel.textContent = "Sisa Waktu Perkuliahan";
        countdownVal.textContent = `${Math.floor(diffMins / 60)}j ${diffMins % 60}m tersisa`;

    } else if (nextClass) {
        statusTitle.textContent = `${nextClass.name} - ${nextClass.classCode}`;
        statusBadge.innerHTML = `<span class="px-3 py-1 text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full">KELAS HARI INI SELANJUTNYA</span>`;
        timeElem.textContent = `${nextClass.startTime} - ${nextClass.endTime} WITA`;
        locationElem.textContent = nextClass.room;
        lecturerElem.textContent = nextClass.lecturer;

        const startMins = toMinutes(nextClass.startTime);
        const diffMins = startMins - currentMinutes;
        countdownLabel.textContent = "Akan Dimulai Dalam";
        countdownVal.textContent = `${Math.floor(diffMins / 60)}j ${diffMins % 60}m lagi`;

    } else {
        statusTitle.textContent = todaysCourses.length > 0 ? "Seluruh Kelas Hari Ini Selesai 🎉" : "Tidak Ada Jadwal Perkuliahan Hari Ini ✨";
        statusBadge.innerHTML = `<span class="px-3 py-1 text-xs font-bold bg-gray-800 text-gray-400 border border-gray-700 rounded-full">BEBAS KULIAH</span>`;
        timeElem.textContent = "Nikmati waktu istirahat atau belajar mandiri";
        locationElem.textContent = "-";
        lecturerElem.textContent = "-";
        countdownLabel.textContent = "Status Hari Ini";
        countdownVal.textContent = "Selesai";
    }
}

function renderStats() {
    document.getElementById('stat-total-courses').textContent = rawCourses.length;
    
    let totalMins = 0;
    rawCourses.forEach(c => {
        const [sh, sm] = c.startTime.split(':').map(Number);
        const [eh, em] = c.endTime.split(':').map(Number);
        totalMins += (eh * 60 + em) - (sh * 60 + sm);
    });
    document.getElementById('stat-total-hours').textContent = (totalMins / 60).toFixed(1);

    const onlineCount = rawCourses.filter(c => c.isOnline).length;
    const offlineCount = rawCourses.length - onlineCount;

    document.getElementById('stat-online-count').textContent = onlineCount;
    document.getElementById('stat-offline-count').textContent = offlineCount;

    const now = new Date();
    const currentDayStr = dayMap[now.getDay()];
    const todays = rawCourses.filter(c => c.day === currentDayStr);
    if (todays.length === 0) {
        document.getElementById('stat-today-progress').textContent = "100%";
    } else {
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        let completed = 0;
        todays.forEach(c => {
            const [eh, em] = c.endTime.split(':').map(Number);
            if (currentMinutes > (eh * 60 + em)) completed++;
        });
        const pct = Math.round((completed / todays.length) * 100);
        document.getElementById('stat-today-progress').textContent = `${pct}%`;
    }
}

function getFilteredCourses() {
    return rawCourses.filter(course => {
        const matchesDay = currentDayFilter === "ALL" || course.day === currentDayFilter;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = !query || 
            course.name.toLowerCase().includes(query) ||
            course.lecturer.toLowerCase().includes(query) ||
            course.room.toLowerCase().includes(query) ||
            course.classCode.toLowerCase().includes(query);
        return matchesDay && matchesSearch;
    });
}

function renderCards() {
    const courses = getFilteredCourses();
    cardsContainer.innerHTML = "";

    if (courses.length === 0) {
        cardsContainer.innerHTML = `
            <div class="col-span-full text-center py-12 glass-panel rounded-2xl">
                <i class="fa-regular fa-folder-open text-4xl text-gray-600 mb-3 block"></i>
                <p class="text-sm text-gray-400">Tidak ada mata kuliah yang cocok dengan kriteria filter.</p>
            </div>
        `;
        return;
    }

    courses.forEach(c => {
        const card = document.createElement('div');
        card.className = `glass-card rounded-2xl p-5 border flex flex-col justify-between cursor-pointer hover:border-brand-500/50 bg-gradient-to-br ${c.color}`;
        card.onclick = () => openModal(c.id);

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-3">
                    <span class="px-2.5 py-1 text-[10px] font-bold rounded-lg ${c.isOnline ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}">
                        ${c.day} • Kelas ${c.classCode}
                    </span>
                    <span class="text-xs font-semibold px-2 py-0.5 rounded ${c.isOnline ? 'bg-amber-900/40 text-amber-400' : 'bg-gray-800 text-gray-300'}">
                        ${c.room}
                    </span>
                </div>
                <h4 class="text-base font-bold text-white mb-2 line-clamp-2">${c.name}</h4>
                <p class="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
                    <i class="fa-solid fa-user-tie text-gray-500"></i> ${c.lecturer}
                </p>
            </div>
            
            <div class="pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-300">
                <span class="flex items-center gap-1.5 font-medium">
                    <i class="fa-regular fa-clock text-brand-accent"></i> ${c.startTime} - ${c.endTime}
                </span>
                <span class="text-brand-400 hover:text-brand-300 flex items-center gap-1 text-[11px] font-semibold">
                    Detail <i class="fa-solid fa-chevron-right text-[9px]"></i>
                </span>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

function renderTimetable() {
    const days = ["Senin", "Selasa", "Rabu", "Jumat", "Sabtu"];
    const slots = [
        { label: "07:30 - 10:00", start: "07:30", end: "10:00" },
        { label: "10:00 - 12:20", start: "10:00", end: "12:20" },
        { label: "13:10 - 15:40", start: "13:10", end: "15:40" },
        { label: "17:20 - 19:00 / 19:50", start: "17:20", end: "19:50" },
        { label: "19:00 - 20:40", start: "19:00", end: "20:40" }
    ];

    const container = document.getElementById('timetable-slots');
    container.innerHTML = "";

    slots.forEach(slot => {
        const row = document.createElement('div');
        row.className = "grid grid-cols-6 gap-3 py-3 items-center text-xs";
        
        let timeCell = `<div class="col-span-1 font-mono text-gray-400 pl-2 font-medium">${slot.label}</div>`;
        let dayCells = "";

        days.forEach(day => {
            const matched = rawCourses.find(c => c.day === day && c.startTime === slot.start);
            if (matched) {
                dayCells += `
                    <div onclick="openModal(${matched.id})" class="p-2 rounded-xl bg-brand-500/15 border border-brand-500/30 text-left cursor-pointer hover:bg-brand-500/25 transition">
                        <div class="font-bold text-white truncate text-[11px]">${matched.name}</div>
                        <div class="text-[10px] text-brand-300 flex justify-between mt-1">
                            <span>${matched.classCode}</span>
                            <span>${matched.room}</span>
                        </div>
                    </div>
                `;
            } else {
                dayCells += `<div class="p-2 rounded-xl bg-gray-900/30 border border-gray-800/40 text-center text-gray-700">-</div>`;
            }
        });

        row.innerHTML = timeCell + dayCells;
        container.appendChild(row);
    });
}

function renderTodayView() {
    const now = new Date();
    const currentDayStr = dayMap[now.getDay()];
    const dateLabel = document.getElementById('today-date-label');
    dateLabel.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const todayClassesContainer = document.getElementById('today-classes-list');
    todayClassesContainer.innerHTML = "";

    const todays = rawCourses.filter(c => c.day === currentDayStr);

    if (todays.length === 0) {
        todayClassesContainer.innerHTML = `
            <div class="text-center py-10">
                <i class="fa-solid fa-mug-hot text-4xl text-gray-600 mb-3 block"></i>
                <p class="text-sm text-gray-400">Tidak ada kelas yang dijadwalkan untuk hari ini (${currentDayStr}). Hari bebas perkuliahan!</p>
            </div>
        `;
        return;
    }

    todays.forEach(c => {
        const item = document.createElement('div');
        item.className = "glass-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-800 cursor-pointer hover:border-brand-500/40";
        item.onclick = () => openModal(c.id);

        item.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex flex-col items-center justify-center text-brand-400 font-bold shrink-0">
                    <i class="fa-solid fa-book-open text-base"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-gray-800 text-gray-300">${c.classCode}</span>
                        <span class="text-xs text-amber-400 font-semibold">${c.room}</span>
                    </div>
                    <h4 class="text-sm font-bold text-white">${c.name}</h4>
                    <p class="text-xs text-gray-400 mt-0.5">${c.lecturer}</p>
                </div>
            </div>

            <div class="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-800">
                <span class="text-xs font-mono font-bold text-brand-accent flex items-center sm:justify-end gap-1">
                    <i class="fa-regular fa-clock"></i> ${c.startTime} - ${c.endTime} WITA
                </span>
                <span class="text-[10px] text-gray-500 block mt-1">Klik untuk detail / catatan</span>
            </div>
        `;
        todayClassesContainer.appendChild(item);
    });
}

// -------------------------------------------------------------
// NEW FEATURE 1: Pertemuan 1 - 16 Dashboard View
// -------------------------------------------------------------
function renderPertemuanView() {
    const gridContainer = document.getElementById('pertemuan-grid-badges');
    const selectElem = document.getElementById('dashboard-pertemuan-select');
    
    gridContainer.innerHTML = "";
    selectElem.innerHTML = "";

    for (let i = 1; i <= 16; i++) {
        // Option
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `Pertemuan ${i}`;
        if (i === currentDashboardPertemuan) opt.selected = true;
        selectElem.appendChild(opt);

        // Badge Card
        const badge = document.createElement('div');
        const isActive = (i === currentDashboardPertemuan);
        badge.className = `p-3 rounded-xl border text-center cursor-pointer transition flex flex-col items-center justify-center ${isActive ? 'bg-brand-600 border-brand-400 text-white shadow-lg shadow-brand-500/30' : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800'}`;
        badge.onclick = () => {
            currentDashboardPertemuan = i;
            selectElem.value = i;
            renderPertemuanView();
        };

        badge.innerHTML = `
            <span class="text-[10px] uppercase tracking-wider block opacity-75">Ptm</span>
            <span class="text-base font-extrabold">${i}</span>
        `;
        gridContainer.appendChild(badge);
    }

    document.getElementById('current-pertemuan-title-label').textContent = `Pertemuan ${currentDashboardPertemuan}`;

    // Render Courses Note Cards for selected Pertemuan
    const coursesListContainer = document.getElementById('pertemuan-courses-list');
    coursesListContainer.innerHTML = "";

    rawCourses.forEach(c => {
        const noteKey = `course_${c.id}_p${currentDashboardPertemuan}_note`;
        const savedNote = localStorage.getItem(noteKey) || "Belum ada catatan tugas untuk pertemuan ini.";

        const card = document.createElement('div');
        card.className = "glass-card rounded-2xl p-4 border border-gray-800 flex flex-col justify-between";
        
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs font-bold text-white">${c.name} (${c.classCode})</span>
                    <span class="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-medium">${c.day}</span>
                </div>
                <p class="text-[11px] text-gray-400 mb-3"><i class="fa-solid fa-user-tie mr-1"></i>${c.lecturer}</p>
                
                <div class="bg-gray-950/80 rounded-xl p-3 border border-gray-800/80 mb-3 text-xs text-gray-300 min-h-[70px] whitespace-pre-line">
                    <div class="text-[10px] text-amber-400 font-semibold mb-1 flex items-center gap-1">
                        <i class="fa-regular fa-note-sticky"></i> Catatan Tugas Ptm ${currentDashboardPertemuan}:
                    </div>
                    ${savedNote}
                </div>
            </div>

            <button onclick="openModalWithPertemuan(${c.id}, ${currentDashboardPertemuan})" class="w-full py-1.5 bg-gray-800 hover:bg-gray-700 text-brand-400 hover:text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-pen-to-square text-[10px]"></i> Edit Catatan / Tautan
            </button>
        `;
        coursesListContainer.appendChild(card);
    });
}

// Open modal pointing directly to a chosen Pertemuan
function openModalWithPertemuan(courseId, ptmNum) {
    currentSelectedPertemuanModal = ptmNum;
    openModal(courseId);
}

// -------------------------------------------------------------
// NEW FEATURE 2: Catatan Harian Pribadi System
// -------------------------------------------------------------
function renderDailyNotesView() {
    const rawNotes = localStorage.getItem('user_daily_notes');
    const notes = rawNotes ? JSON.parse(rawNotes) : [];
    dailyNotesList.innerHTML = "";

    if (notes.length === 0) {
        dailyNotesList.innerHTML = `
            <div class="col-span-full text-center py-12 glass-panel rounded-2xl">
                <i class="fa-solid fa-book-open text-4xl text-gray-600 mb-3 block"></i>
                <p class="text-sm text-gray-400">Belum ada catatan harian. Klik tombol "+ Tambah Catatan Baru" di atas untuk membuat.</p>
            </div>
        `;
        return;
    }

    notes.sort((a, b) => b.timestamp - a.timestamp).forEach(note => {
        const card = document.createElement('div');
        card.className = "glass-card rounded-2xl p-5 border border-gray-800 flex flex-col justify-between";

        const formattedDate = new Date(note.timestamp).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <h4 class="text-sm font-bold text-white line-clamp-1">${note.title}</h4>
                    <span class="text-[10px] text-gray-500">${formattedDate}</span>
                </div>
                <p class="text-xs text-gray-300 whitespace-pre-line mb-4 line-clamp-4">${note.content}</p>
            </div>

            <div class="flex items-center justify-end gap-2 pt-3 border-t border-gray-800/80">
                <button onclick="editDailyNote(${note.id})" class="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1 px-2 py-1 bg-brand-500/10 rounded-lg">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button onclick="deleteDailyNote(${note.id})" class="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 px-2 py-1 bg-rose-500/10 rounded-lg">
                    <i class="fa-solid fa-trash"></i> Hapus
                </button>
            </div>
        `;
        dailyNotesList.appendChild(card);
    });
}

function saveDailyNote() {
    const title = dailyNoteTitleInput.value.trim();
    const content = dailyNoteContentInput.value.trim();

    if (!title || !content) {
        alert("Mohon isi judul dan isi catatan harian Anda.");
        return;
    }

    const rawNotes = localStorage.getItem('user_daily_notes');
    let notes = rawNotes ? JSON.parse(rawNotes) : [];

    if (editingDailyNoteId) {
        notes = notes.map(n => n.id === editingDailyNoteId ? { ...n, title, content, timestamp: Date.now() } : n);
    } else {
        notes.push({
            id: Date.now(),
            title,
            content,
            timestamp: Date.now()
        });
    }

    localStorage.setItem('user_daily_notes', JSON.stringify(notes));

    // Reset Form
    dailyNoteTitleInput.value = "";
    dailyNoteContentInput.value = "";
    editingDailyNoteId = null;
    dailyNoteFormCard.classList.add('hidden');
    renderDailyNotesView();
}

function editDailyNote(id) {
    const rawNotes = localStorage.getItem('user_daily_notes');
    const notes = rawNotes ? JSON.parse(rawNotes) : [];
    const note = notes.find(n => n.id === id);

    if (!note) return;

    editingDailyNoteId = id;
    dailyNoteFormTitle.textContent = "Edit Catatan Harian";
    dailyNoteTitleInput.value = note.title;
    dailyNoteContentInput.value = note.content;
    dailyNoteFormCard.classList.remove('hidden');
}

function deleteDailyNote(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus catatan harian ini?")) return;
    const rawNotes = localStorage.getItem('user_daily_notes');
    let notes = rawNotes ? JSON.parse(rawNotes) : [];
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('user_daily_notes', JSON.stringify(notes));
    renderDailyNotesView();
}

// Init options 1-16 for modal select
function initModalPertemuanOptions() {
    if (!modalPertemuanSelect) return;
    modalPertemuanSelect.innerHTML = "";
    for (let i = 1; i <= 16; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `Pertemuan ${i}`;
        modalPertemuanSelect.appendChild(opt);
    }
}

// Generate 10 input fields for links
function generateLinkInputsForModal(courseId) {
    modalLinksContainer.innerHTML = "";
    const rawSavedLinks = localStorage.getItem(`course_${courseId}_links`);
    const savedLinks = rawSavedLinks ? JSON.parse(rawSavedLinks) : Array(10).fill({ name: '', url: '' });

    for (let i = 0; i < 10; i++) {
        const item = savedLinks[i] || { name: '', url: '' };
        const row = document.createElement('div');
        row.className = "flex gap-2 items-center bg-gray-950/60 p-2 rounded-xl border border-gray-800";
        row.innerHTML = `
            <span class="text-[10px] font-bold text-gray-500 w-5 text-center shrink-0">#${i + 1}</span>
            <input type="text" data-link-index="${i}" data-link-type="name" value="${item.name || ''}" placeholder="Nama Tugas / Link ${i + 1}" 
                   class="w-1/3 bg-gray-900 border border-gray-700/80 rounded-lg px-2.5 py-1 text-xs text-gray-200 focus:outline-none focus:border-brand-500">
            <input type="url" data-link-index="${i}" data-link-type="url" value="${item.url || ''}" placeholder="https://..." 
                   class="flex-1 bg-gray-900 border border-gray-700/80 rounded-lg px-2.5 py-1 text-xs text-brand-300 focus:outline-none focus:border-brand-500">
            ${item.url ? `<a href="${item.url}" target="_blank" class="p-1.5 text-brand-400 hover:text-white shrink-0"><i class="fa-solid fa-arrow-up-right-from-square text-xs"></i></a>` : ''}
        `;
        modalLinksContainer.appendChild(row);
    }
}

// Modal Logic
function openModal(courseId) {
    const course = rawCourses.find(c => c.id === courseId);
    if (!course) return;

    selectedCourseIdForModal = courseId;
    modalTitle.textContent = `${course.name} (${course.classCode})`;
    modalCategory.textContent = course.isOnline ? "Kuliah Daring (Online)" : "Kuliah Tatap Muka (Offline)";
    modalSchedule.textContent = `${course.day}, ${course.startTime} - ${course.endTime} WITA`;
    modalRoom.textContent = `${course.room} ${course.isOnline ? '(Platform Daring)' : ''}`;
    modalLecturer.textContent = course.lecturer;

    // Set Pertemuan Select
    modalPertemuanSelect.value = currentSelectedPertemuanModal;
    loadModalPertemuanNote();

    // Generate 10 Links Inputs
    generateLinkInputsForModal(courseId);

    modalNoteSavedMsg.classList.add('opacity-0');

    // Show modal
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-95');
    modalBox.classList.add('scale-100');
}

function loadModalPertemuanNote() {
    if (!selectedCourseIdForModal) return;
    const ptm = modalPertemuanSelect.value;
    const savedNote = localStorage.getItem(`course_${selectedCourseIdForModal}_p${ptm}_note`) || "";
    modalNotesInput.value = savedNote;
}

function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
    selectedCourseIdForModal = null;
}

function saveNote() {
    if (!selectedCourseIdForModal) return;

    // 1. Save Pertemuan Note
    const ptm = modalPertemuanSelect.value;
    const noteText = modalNotesInput.value.trim();
    localStorage.setItem(`course_${selectedCourseIdForModal}_p${ptm}_note`, noteText);

    // 2. Save 10 Links
    const linkItems = Array(10).fill(null).map(() => ({ name: '', url: '' }));
    const nameInputs = modalLinksContainer.querySelectorAll('input[data-link-type="name"]');
    const urlInputs = modalLinksContainer.querySelectorAll('input[data-link-type="url"]');

    nameInputs.forEach((inp, idx) => {
        linkItems[idx].name = inp.value.trim();
    });
    urlInputs.forEach((inp, idx) => {
        linkItems[idx].url = inp.value.trim();
    });

    localStorage.setItem(`course_${selectedCourseIdForModal}_links`, JSON.stringify(linkItems));

    // Refresh views if open
    renderPertemuanView();

    modalNoteSavedMsg.classList.remove('opacity-0');
    setTimeout(() => {
        modalNoteSavedMsg.classList.add('opacity-0');
    }, 2000);
}

// Event Listeners Setup
function setupDashboardEventListeners() {
    // Day Filter Buttons
    document.querySelectorAll('.day-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.day-filter-btn').forEach(b => {
                b.classList.remove('bg-brand-600', 'text-white', 'shadow-lg', 'shadow-brand-500/30');
                b.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-gray-800');
            });
            
            e.target.classList.remove('text-gray-400', 'hover:text-white', 'hover:bg-gray-800');
            e.target.classList.add('bg-brand-600', 'text-white', 'shadow-lg', 'shadow-brand-500/30');

            currentDayFilter = e.target.getAttribute('data-day');
            renderCards();
        });
    });

    // Search Input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderCards();
        });
    }

    // View Switcher
    const cardBtn = document.getElementById('view-card-btn');
    const timetableBtn = document.getElementById('view-timetable-btn');
    const todayBtn = document.getElementById('view-today-btn');
    const pertemuanBtn = document.getElementById('view-pertemuan-btn');
    const dailyNotesBtn = document.getElementById('view-daily-notes-btn');

    const switchView = (view) => {
        activeView = view;
        [cardBtn, timetableBtn, todayBtn, pertemuanBtn, dailyNotesBtn].forEach(b => {
            if (b) {
                b.classList.remove('text-brand-400', 'bg-gray-800');
                b.classList.add('text-gray-400', 'hover:text-white');
            }
        });

        cardsContainer.classList.add('hidden');
        timetableContainer.classList.add('hidden');
        todayContainer.classList.add('hidden');
        pertemuanContainer.classList.add('hidden');
        dailyNotesContainer.classList.add('hidden');

        if (view === 'card') {
            if (cardBtn) cardBtn.classList.add('text-brand-400', 'bg-gray-800');
            cardsContainer.classList.remove('hidden');
        } else if (view === 'timetable') {
            if (timetableBtn) timetableBtn.classList.add('text-brand-400', 'bg-gray-800');
            timetableContainer.classList.remove('hidden');
        } else if (view === 'today') {
            if (todayBtn) todayBtn.classList.add('text-brand-400', 'bg-gray-800');
            todayContainer.classList.remove('hidden');
        } else if (view === 'pertemuan') {
            if (pertemuanBtn) pertemuanBtn.classList.add('text-brand-400', 'bg-gray-800');
            pertemuanContainer.classList.remove('hidden');
            renderPertemuanView();
        } else if (view === 'daily-notes') {
            if (dailyNotesBtn) dailyNotesBtn.classList.add('text-brand-400', 'bg-gray-800');
            dailyNotesContainer.classList.remove('hidden');
            renderDailyNotesView();
        }
    };

    if (cardBtn) cardBtn.addEventListener('click', () => switchView('card'));
    if (timetableBtn) timetableBtn.addEventListener('click', () => switchView('timetable'));
    if (todayBtn) todayBtn.addEventListener('click', () => switchView('today'));
    if (pertemuanBtn) pertemuanBtn.addEventListener('click', () => switchView('pertemuan'));
    if (dailyNotesBtn) dailyNotesBtn.addEventListener('click', () => switchView('daily-notes'));

    // Dashboard Pertemuan Select Listener
    const dashPtmSelect = document.getElementById('dashboard-pertemuan-select');
    if (dashPtmSelect) {
        dashPtmSelect.addEventListener('change', (e) => {
            currentDashboardPertemuan = parseInt(e.target.value);
            renderPertemuanView();
        });
    }

    // Modal Pertemuan Select Listener
    if (modalPertemuanSelect) {
        modalPertemuanSelect.addEventListener('change', (e) => {
            currentSelectedPertemuanModal = parseInt(e.target.value);
            loadModalPertemuanNote();
        });
    }

    // Modal Tabs Navigation
    if (tabBtnPertemuan && tabBtnLinks) {
        tabBtnPertemuan.addEventListener('click', () => {
            tabBtnPertemuan.className = "pb-2 px-3 text-xs font-semibold border-b-2 border-brand-500 text-brand-400 transition flex items-center gap-1.5";
            tabBtnLinks.className = "pb-2 px-3 text-xs font-semibold border-b-2 border-transparent text-gray-400 hover:text-white transition flex items-center gap-1.5";
            tabPertemuanContent.classList.remove('hidden');
            tabLinksContent.classList.add('hidden');
        });

        tabBtnLinks.addEventListener('click', () => {
            tabBtnLinks.className = "pb-2 px-3 text-xs font-semibold border-b-2 border-brand-500 text-brand-400 transition flex items-center gap-1.5";
            tabBtnPertemuan.className = "pb-2 px-3 text-xs font-semibold border-b-2 border-transparent text-gray-400 hover:text-white transition flex items-center gap-1.5";
            tabLinksContent.classList.remove('hidden');
            tabPertemuanContent.classList.add('hidden');
        });
    }

    // Daily Notes Actions
    if (addDailyNoteBtn) {
        addDailyNoteBtn.addEventListener('click', () => {
            editingDailyNoteId = null;
            dailyNoteFormTitle.textContent = "Tulis Catatan Harian Baru";
            dailyNoteTitleInput.value = "";
            dailyNoteContentInput.value = "";
            dailyNoteFormCard.classList.remove('hidden');
        });
    }

    if (cancelDailyNoteBtn) {
        cancelDailyNoteBtn.addEventListener('click', () => {
            dailyNoteFormCard.classList.add('hidden');
        });
    }

    if (saveDailyNoteBtn) {
        saveDailyNoteBtn.addEventListener('click', saveDailyNote);
    }

    // Modal Controls
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalSaveBtn) modalSaveBtn.addEventListener('click', saveNote);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
}