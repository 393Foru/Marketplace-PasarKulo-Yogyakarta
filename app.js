document.addEventListener("DOMContentLoaded", function () {

    /**
     * Memuat komponen HTML dari file eksternal dan memasukkannya ke dalam placeholder.
     * @param {string} elementId - ID dari elemen placeholder di file HTML utama.
     * @param {string} filePath - Path ke file komponen HTML yang akan dimuat.
     * @returns {Promise} - Promise yang resolve ketika komponen berhasil dimuat.
     */
    function loadComponent(elementId, filePath) {
        return fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Tidak bisa memuat ${filePath}: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(elementId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                } else {
                    // Beri peringatan jika placeholder tidak ditemukan di HTML utama.
                    console.warn(`Placeholder dengan ID '${elementId}' tidak ditemukan di DOM.`);
                }
            })
            .catch(error => {
                console.error(`Gagal memuat komponen untuk #${elementId}:`, error);
                const placeholder = document.getElementById(elementId);
                if (placeholder) {
                    placeholder.innerHTML = `<div class="text-center text-danger p-3">Gagal memuat: ${filePath}</div>`;
                }
            });
    }

    /**
     * Mengatur link navigasi yang aktif berdasarkan URL halaman saat ini.
     */
    function setActiveLink() {
        setTimeout(() => {
            const currentPagePath = window.location.pathname;
            const allLinks = document.querySelectorAll('#navbar-pertama .nav-link, #navbar-pertama .dropdown-item, #navbar-kedua .nav-link, #navbar-kedua .dropdown-item, #navbar-pendukung .btn-selanjutnya');

            allLinks.forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');

                if (link.closest('.dropdown')) {
                    const dropdownToggle = link.closest('.dropdown').querySelector('.dropdown-toggle');
                    if (dropdownToggle) dropdownToggle.classList.remove('active');
                }

                if (link.href) {
                    const linkPath = new URL(link.href, window.location.origin).pathname;
                    if (currentPagePath === linkPath) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');

                        if (link.classList.contains('dropdown-item')) {
                            const dropdownToggle = link.closest('.dropdown').querySelector('.dropdown-toggle');
                            if (dropdownToggle) dropdownToggle.classList.add('active');
                        }
                    }
                }
            });
        }, 100);
    }

    /**
     * Mengatur posisi navbar kedua di bawah navbar pertama.
     */
    function positionSecondNavbar() {
        const navbarUtama = document.getElementById('navbar-pertama');
        const navbarKedua = document.getElementById('navbar-kedua');
        if (navbarUtama && navbarKedua) {
            const tinggiNavbarUtama = navbarUtama.offsetHeight;
            navbarKedua.style.top = `${tinggiNavbarUtama}px`;
        }
    }

    // --- DATA SOURCE (tetap sama) ---
    const dataPasar = [
        {
            nama: "Pasar Gede Hardjonagoro",
            daerah: "Surakarta, Jawa Tengah",
            gambarBanner: "https://placehold.co/600x400/3498db/ffffff?text=Pasar+Gede",
            gambarLogo: "https://placehold.co/100x100/2980b9/ffffff?text=PG",
            toko: [
                {
                    nama: "Toko Sembako Makmur Jaya",
                    kategori: "Sembako",
                    rating: 4.5,
                    promo: ["Gratis Ongkir", "Diskon 10%"],
                    gambarBanner: "https://placehold.co/600x400/16a085/ffffff?text=Toko+Makmur",
                    gambarLogo: "https://placehold.co/100x100/1abc9c/ffffff?text=MJ",
                    produk: [
                        {
                            nama: "Minyak Goreng Sania Pouch 2 Liter",
                            harga: 35000,
                            hargaCoret: 40000,
                            rating: 4.9,
                            terjual: "1rb+",
                            gambar: "https://placehold.co/400x400/f39c12/ffffff?text=Minyak"
                        },
                        {
                            nama: "Beras Kepala Super Wangi Cap Bunga 5KG",
                            harga: 68000,
                            hargaCoret: null,
                            rating: 4.8,
                            terjual: "500+",
                            gambar: "https://placehold.co/400x400/ecf0f1/000000?text=Beras"
                        },
                        {
                            nama: "Gula Pasir Kristal Putih GULAKU 1KG",
                            harga: 16000,
                            hargaCoret: 18000,
                            rating: 4.7,
                            terjual: "5rb+",
                            gambar: "https://placehold.co/400x400/3498db/ffffff?text=Gula"
                        }
                    ]
                }
            ]
        },
        {
            nama: "Pasar Beringharjo",
            daerah: "Yogyakarta, DIY",
            gambarBanner: "https://placehold.co/600x400/e74c3c/ffffff?text=Beringharjo",
            gambarLogo: "https://placehold.co/100x100/c0392b/ffffff?text=PB",
            toko: [
                {
                    nama: "Warung Sayur Segar Bu Tini",
                    kategori: "Sayur & Buah",
                    rating: 5.0,
                    promo: ["Cashback 5rb"],
                    gambarBanner: "https://placehold.co/600x400/27ae60/ffffff?text=Sayur+Segar",
                    gambarLogo: "https://placehold.co/100x100/2ecc71/ffffff?text=BT",
                    produk: [
                        {
                            nama: "Apel Fuji Premium Manis dan Renyah 1KG",
                            harga: 45000,
                            hargaCoret: 55000,
                            rating: 5.0,
                            terjual: "2rb+",
                            gambar: "https://placehold.co/400x400/e74c3c/ffffff?text=Apel"
                        },
                    ]
                },
                {
                    nama: "Lapak Daging Sapi Premium",
                    kategori: "Daging",
                    rating: 4.8,
                    promo: [],
                    gambarBanner: "https://placehold.co/600x400/c0392b/ffffff?text=Daging+Premium",
                    gambarLogo: "https://placehold.co/100x100/e74c3c/ffffff?text=DS",
                    produk: [
                        {
                            nama: "Daging Sapi Has Dalam (Tenderloin) 500gr",
                            harga: 75000,
                            hargaCoret: null,
                            rating: 4.9,
                            terjual: "750+",
                            gambar: "https://placehold.co/400x400/c0392b/ffffff?text=Daging"
                        }
                    ]
                }
            ]
        },
        {
            nama: "Pasar Sukawati",
            daerah: "Gianyar, Bali",
            gambarBanner: "https://placehold.co/600x400/f1c40f/ffffff?text=Sukawati",
            gambarLogo: "https://placehold.co/100x100/f39c12/ffffff?text=PS",
            toko: [
                {
                    nama: "Bumbu Dapur Lengkap Mbah Uti",
                    kategori: "Bumbu",
                    rating: 4.2,
                    promo: ["Beli 2 Gratis 1"],
                    gambarBanner: "https://placehold.co/600x400/d35400/ffffff?text=Bumbu+Mbah+Uti",
                    gambarLogo: "https://placehold.co/100x100/e67e22/ffffff?text=BU",
                    produk: [
                        {
                            nama: "Paket Bumbu Rawon Komplit Siap Masak",
                            harga: 15000,
                            hargaCoret: null,
                            rating: 4.8,
                            terjual: "300+",
                            gambar: "https://placehold.co/400x400/34495e/ffffff?text=Bumbu"
                        }
                    ]
                }
            ]
        },
        {
            nama: "Pasar Gec",
            daerah: "Surakarta, Jawa Tengah",
            gambarBanner: "https://placehold.co/600x400/3498db/ffffff?text=Pasar+Gede",
            gambarLogo: "https://placehold.co/100x100/2980b9/ffffff?text=PG",
            toko: [
                {
                    nama: "Toko Sembako Makmur Jaya",
                    kategori: "Sembako",
                    rating: 4.5,
                    promo: ["Gratis Ongkir", "Diskon 10%"],
                    gambarBanner: "https://placehold.co/600x400/16a085/ffffff?text=Toko+Makmur",
                    gambarLogo: "https://placehold.co/100x100/1abc9c/ffffff?text=MJ",
                    produk: [
                        {
                            nama: "Minyak Goreng Sania Pouch 2 Liter",
                            harga: 35000,
                            hargaCoret: 40000,
                            rating: 4.9,
                            terjual: "1rb+",
                            gambar: "https://placehold.co/400x400/f39c12/ffffff?text=Minyak"
                        },
                        {
                            nama: "Beras Kepala Super Wangi Cap Bunga 5KG",
                            harga: 68000,
                            hargaCoret: null,
                            rating: 4.8,
                            terjual: "500+",
                            gambar: "https://placehold.co/400x400/ecf0f1/000000?text=Beras"
                        },
                        {
                            nama: "Gula Pasir Kristal Putih GULAKU 1KG",
                            harga: 16000,
                            hargaCoret: 18000,
                            rating: 4.7,
                            terjual: "5rb+",
                            gambar: "https://placehold.co/400x400/3498db/ffffff?text=Gula"
                        }
                    ]
                }
            ]
        },
        {
            nama: "Pasar Gede v",
            daerah: "Surakarta, Jawa Tengah",
            gambarBanner: "https://placehold.co/600x400/3498db/ffffff?text=Pasar+Gede",
            gambarLogo: "https://placehold.co/100x100/2980b9/ffffff?text=PG",
            toko: [
                {
                    nama: "Toko Sembako Makmur Jaya",
                    kategori: "Sembako",
                    rating: 4.5,
                    promo: ["Gratis Ongkir", "Diskon 10%"],
                    gambarBanner: "https://placehold.co/600x400/16a085/ffffff?text=Toko+Makmur",
                    gambarLogo: "https://placehold.co/100x100/1abc9c/ffffff?text=MJ",
                    produk: [
                        {
                            nama: "Minyak Goreng Sania Pouch 2 Liter",
                            harga: 35000,
                            hargaCoret: 40000,
                            rating: 4.9,
                            terjual: "1rb+",
                            gambar: "https://placehold.co/400x400/f39c12/ffffff?text=Minyak"
                        },
                        {
                            nama: "Beras Kepala Super Wangi Cap Bunga 5KG",
                            harga: 68000,
                            hargaCoret: null,
                            rating: 4.8,
                            terjual: "500+",
                            gambar: "https://placehold.co/400x400/ecf0f1/000000?text=Beras"
                        },
                        {
                            nama: "Gula Pasir Kristal Putih GULAKU 1KG",
                            harga: 16000,
                            hargaCoret: 18000,
                            rating: 4.7,
                            terjual: "5rb+",
                            gambar: "https://placehold.co/400x400/3498db/ffffff?text=Gula"
                        }
                    ]
                }
            ]
        },
        {
            nama: "Pasar Gede a",
            daerah: "Surakarta, Jawa Tengah",
            gambarBanner: "https://placehold.co/600x400/3498db/ffffff?text=Pasar+Gede",
            gambarLogo: "https://placehold.co/100x100/2980b9/ffffff?text=PG",
            toko: [
                {
                    nama: "Toko Sembako Makmur Jaya",
                    kategori: "Sembako",
                    rating: 4.5,
                    promo: ["Gratis Ongkir", "Diskon 10%"],
                    gambarBanner: "https://placehold.co/600x400/16a085/ffffff?text=Toko+Makmur",
                    gambarLogo: "https://placehold.co/100x100/1abc9c/ffffff?text=MJ",
                    produk: [
                        {
                            nama: "Minyak Goreng Sania Pouch 2 Liter",
                            harga: 35000,
                            hargaCoret: 40000,
                            rating: 4.9,
                            terjual: "1rb+",
                            gambar: "https://placehold.co/400x400/f39c12/ffffff?text=Minyak"
                        },
                        {
                            nama: "Beras Kepala Super Wangi Cap Bunga 5KG",
                            harga: 68000,
                            hargaCoret: null,
                            rating: 4.8,
                            terjual: "500+",
                            gambar: "https://placehold.co/400x400/ecf0f1/000000?text=Beras"
                        },
                        {
                            nama: "Gula Pasir Kristal Putih GULAKU 1KG",
                            harga: 16000,
                            hargaCoret: 18000,
                            rating: 4.7,
                            terjual: "5rb+",
                            gambar: "https://placehold.co/400x400/3498db/ffffff?text=Gula"
                        }
                    ]
                }
            ]
        },
    ];

    const dataKategori = [
        { nama: "Sembako", gambar: "https://placehold.co/400x200/1abc9c/ffffff?text=Sembako" },
        { nama: "Sayur & Buah", gambar: "https://placehold.co/400x200/2ecc71/ffffff?text=Sayur+&+Buah" },
        { nama: "Daging", gambar: "https://placehold.co/400x200/e74c3c/ffffff?text=Daging" },
        { nama: "Bumbu", gambar: "https://placehold.co/400x200/e67e22/ffffff?text=Bumbu" },
        { nama: "Jajanan", gambar: "https://placehold.co/400x200/9b59b6/ffffff?text=Jajanan" },
        { nama: "Minuman", gambar: "https://placehold.co/400x200/3498db/ffffff?text=Minuman" },
        { nama: "Kue Tradisional", gambar: "https://placehold.co/400x200/f1c40f/ffffff?text=Kue+Tradisional" },
        { nama: "Kerajinan", gambar: "https://placehold.co/400x200/34495e/ffffff?text=Kerajinan" },
        { nama: "Elektronik", gambar: "https://placehold.co/400x200/8e44ad/ffffff?text=Elektronik" },
    ];

    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    function formatRupiah(angka) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka); }
    function generateStars(rating) { if (!rating) return ''; 
        return `<span class="text-muted">(${rating.toFixed(1)})</span>`; }
    function generatePromos(promos) { if (!promos || promos.length === 0) return ''; 
        return promos.map(promo => `<span class="badge opacity-75">${promo}</span>`).join(''); }
        
    function generateDiscount(harga, hargaCoret) {
        if (!hargaCoret || hargaCoret <= harga) return ''; const diskon = Math.round(((hargaCoret - harga) / hargaCoret) * 100);
        return `<div class="d-flex align-items-center mb-2 gap-1 flex-wrap">
                    <span class="fw-bold badge discount-badge">${diskon}%</span>
                    <span class="teks-kategori text-muted text-decoration-line-through mb-0">${formatRupiah(hargaCoret)}</span>
                </div>`;
    }

    // ====================================================================
    // PERUBAHAN 1: FUNGSI PEMBUAT KARTU YANG BISA DIGUNAKAN KEMBALI
    // ====================================================================

    /**
     * Membuat HTML untuk satu kartu pasar.
     * @param {object} pasar - Objek data pasar.
     * @returns {string} - String HTML dari kartu.
     */
    function createPasarCardHTML(pasar) {
        const pasarUrlFriendly = pasar.nama.replace(/\s+/g, '-').toLowerCase();
        const link = `./pasar-detail.html?id=${pasarUrlFriendly}`;

        return `
        <a href="${link}" class="text-decoration-none text-dark d-block w-100 h-100">
            <div class="card card-pasar card-hover rounded-4 w-100">
                <img src="${pasar.gambarBanner}" class="img-top rounded-top-4" alt="Banner ${pasar.nama}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Not+Found';">
                <div class="card-body d-flex align-items-center">
                    <div class="me-3 flex-shrink-0">
                        <img src="${pasar.gambarLogo}" alt="Logo ${pasar.nama}" class="img-fluid rounded-circle logo-pasar" onerror="this.onerror=null;this.src='https://placehold.co/100x100/cccccc/ffffff?text=Logo';">
                    </div>
                    <div class="text-start w-100">
                        <h4 class="card-title mb-1 judul-pasar w-75">${pasar.nama}</h4>
                        <p class="card-text mb-0 judul-sub-pasar opacity-75 text-muted">${pasar.daerah}</p>
                    </div>
                </div>
            </div>
        </a>`;
    }

    /**
     * Membuat HTML untuk satu kartu toko.
     * @param {object} toko - Objek data toko.
     * @returns {string} - String HTML dari kartu.
     */
    function createTokoCardHTML(toko) {
        const tokoUrlFriendly = toko.nama.replace(/\s+/g, '-').toLowerCase();
        const link = `./toko-detail.html?id=${tokoUrlFriendly}`;

        return `
        <a href="${link}" class="text-decoration-none text-dark d-block w-100 h-100">
            <div class="card card-toko card-hover rounded-4 w-100">
                <img src="${toko.gambarBanner}" class="card-img-top img-top rounded-top-4" alt="Banner ${toko.nama}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Not+Found';">
                <div class="card-body d-flex flex-column flex-grow-1 w-100">
                    <div class="promo">${generatePromos(toko.promo)}</div>
                    <div class="d-flex align-items-center flex-grow-1 w-100">
                        <div class="me-2 flex-shrink-0">
                            <img src="${toko.gambarLogo}" alt="Logo ${toko.nama}" class="logo-toko img-fluid rounded-circle" onerror="this.onerror=null;this.src='https://placehold.co/100x100/cccccc/ffffff?text=Logo';">
                        </div>
                        <div class="w-100" style="min-width: 0;">
                            <h4 class="card-title mb-0 judul-toko w-75" title="${toko.nama}">${toko.nama}</h4>
                            <div class="teks-kategori d-flex align-items-center gap-1 flex-wrap flex-shrink-0">
                                <p class="mb-0">${toko.kategori}</p>
                                <span class="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
                                <div class="d-flex gap-1 flex-wrap flex-fill">${generateStars(toko.rating)}</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-column text-start small text-muted d-flex w-100">
                        <span class="teks-footer-card">${toko.namaPasar}</span>
                        <hr class="my-0" style="border-top: 2px solid #e0e0e0;">
                        <span class="teks-footer-card text-muted opacity-75">${toko.daerahPasar}</span>
                    </div>
                </div>
            </div>
        </a>`;
    }

    /**
     * Membuat HTML untuk satu kartu produk.
     * @param {object} produk - Objek data produk.
     * @returns {string} - String HTML dari kartu.
     */
    function createProdukCardHTML(produk) {
        const produkUrlFriendly = produk.nama.replace(/\s+/g, '-').toLowerCase();
        const link = `./produk-detail.html?id=${produkUrlFriendly}`;

        return `
        <a href="${link}" class="text-decoration-none text-dark d-block w-100 h-100">
            <div class="card card-produk card-hover rounded-4 w-100">
                <img src="${produk.gambar}" class="card-produk-img-top rounded-top-4" alt="${produk.nama}" onerror="this.onerror=null;this.src='https://placehold.co/400x400/cccccc/ffffff?text=Not+Found';">
                <div class="card-body d-flex flex-column flex-grow-1 w-100">
                    <div class="promo">${generatePromos(produk.produkPromo)}</div>
                    <div class="judul-produk text-start mb-0" title="${produk.nama}">${produk.nama}</div>
                    <div class="d-flex align-items-center flex-grow-1 w-100">
                        <div class="text-start w-100">
                            <div class="gap-2">
                                <p class="harga fw-bold m-0">${formatRupiah(produk.harga)}</p>
                                ${generateDiscount(produk.harga, produk.hargaCoret)}
                            </div>
                            <div class="teks-kategori d-flex align-items-center gap-1 flex-wrap">
                                <span class="text-warning">&#9733;</span>
                                ${generateStars(produk.rating)}
                                <span class="text-muted">|</span>
                                <span class="text-muted">${produk.terjual} terjual</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex-column text-start small text-muted d-flex w-100">
                        <span class="teks-footer-card">${produk.namaToko}</span>
                        <hr class="my-0" style="border-top: 2px solid #e0e0e0;">
                        <span class="teks-footer-card text-muted opacity-75">${produk.namaPasar}</span>
                    </div>
                </div>
            </div>
        </a>`;

    }
    /**
     * @param {object} kategori - Objek data kategori.
     * @returns {string} - String HTML dari kartu.
     */
    function createKategoriCardHTML(kategori) {
        const kategoriUrlFriendly = kategori.nama.replace(/ & /g, '-').replace(/\s+/g, '-').toLowerCase();
        const link = `./page-produk.html?kategori=${kategoriUrlFriendly}`;
        return `
        <a href="${link}" class="text-decoration-none d-block h-100">
            <div class="card card-kategori card-hover-line rounded-4 h-100">
                <div class="judul-produk text-start px-3 mb-0 mt-auto">${kategori.nama}</div>
                <img src="${kategori.gambar}" class="img-bottom rounded-bottom-4 w-100"
                alt="${kategori.nama}" onerror="this.onerror=null;this.src='https://placehold.co/400x200/cccccc/ffffff?text=Not+Found';">
            </div>
        </a>`;

        
    }


    /**
     * Fungsi ini akan dijalankan SETELAH semua komponen HTML dimuat.
     */
    function initializePageContent() {

        /**
         * Fungsi generik untuk merender kartu ke dalam semua kontainer yang cocok.
         * @param {string} selector - Selector CSS untuk kontainer (e.g., '.swiper-toko-container').
         * @param {Array} fullData - Array data LENGKAP yang akan dirender.
         * @param {Function} cardCreator - Fungsi untuk membuat HTML satu kartu.
         * @param {number} limit - Batasan jumlah item yang akan ditampilkan. Gunakan 0 untuk tanpa batas.
         * @param {object} swiperOptions - Konfigurasi untuk Swiper (jika ini adalah Swiper).
         * @param {string} gridColClass - Kelas kolom Bootstrap untuk grid (jika ini adalah grid).
         */
        function renderSection(selector, fullData, cardCreator, limit = 0, swiperOptions = null, gridColClass = '') {
            const containers = document.querySelectorAll(selector);
            if (containers.length === 0) return;

            containers.forEach(container => {
                // PERUBAHAN UTAMA: Data diacak dan dibatasi untuk SETIAP kontainer
                const finalLimit = limit > 0 ? limit : fullData.length;
                const data = shuffleArray(fullData).slice(0, finalLimit);

                const isSwiper = container.classList.contains('swiper');
                const targetContainer = isSwiper ? container.querySelector('.swiper-wrapper') : container;

                if (!targetContainer) {
                    console.error(`Tidak dapat menemukan .swiper-wrapper atau target di dalam`, container);
                    return;
                }

                targetContainer.innerHTML = ''; // Kosongkan kontainer sebelum mengisi

                data.forEach(item => {
                    const cardHTML = cardCreator(item);
                    if (isSwiper) {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide d-flex align-items-stretch';
                        slide.innerHTML = cardHTML;
                        targetContainer.appendChild(slide);
                    } else { // Ini adalah Grid
                        const col = document.createElement('div');
                        col.className = `${gridColClass} d-flex align-items-stretch`;
                        col.innerHTML = cardHTML;
                        targetContainer.appendChild(col);
                    }
                });

                if (isSwiper && swiperOptions) {
                    // Beri ID unik sementara jika belum ada, agar navigasi Swiper tidak bentrok
                    if (!container.id) {
                        container.id = `swiper-unique-${Math.random().toString(36).substr(2, 9)}`;
                    }
                    // Arahkan navigasi ke elemen di dalam kontainer saat ini
                    const navNextEl = container.querySelector('.swiper-button-next');
                    const navPrevEl = container.querySelector('.swiper-button-prev');
                    const paginationEl = container.querySelector('.swiper-pagination');

                    let finalSwiperOptions = { ...swiperOptions };
                    if (navNextEl && navPrevEl) {
                        finalSwiperOptions.navigation = { nextEl: navNextEl, prevEl: navPrevEl };
                    }
                    if (paginationEl) {
                        finalSwiperOptions.pagination = { el: paginationEl, clickable: true };
                    }

                    new Swiper(container, finalSwiperOptions);
                }
            });
        }

        const allToko = dataPasar.flatMap(pasar => 
            pasar.toko.map(toko => ({ 
                ...toko, 
                namaPasar: pasar.nama, 
                daerahPasar: pasar.daerah 
            }))
        );

        const allProduk = allToko.flatMap(toko =>
            (toko.produk || []).map(produk => ({
                ...produk,
                namaToko: toko.nama,
                namaPasar: toko.namaPasar,
                produkPromo: toko.promo
            }))
        );

        // --- Batasan ---
        const LIMIT_SWIPER_PASAR = 4;
        const LIMIT_SWIPER_TOKO = 8;
        const LIMIT_SWIPER_PRODUK = 12;
        const LIMIT_GRID_PASAR = 6;
        const LIMIT_GRID_TOKO = 8;
        const LIMIT_GRID_PRODUK = 12;
        const LIMIT_GRID_KATEGORI = 10;

        // --- Konfigurasi Swiper (tanpa navigasi spesifik) ---
        const swiperPasarOptions = {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            breakpoints: {
                576: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
            }
        };
        const swiperTokoOptions = {
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,
            nested: true,
            breakpoints: {
                576: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 4 }
            }
        };
        const swiperProdukOptions = {
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,
            breakpoints: {
                576: { slidesPerView: 3 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 6 }
            }
        };

        // --- Proses Render ---
        renderSection('.swiper-pasar-container', dataPasar, createPasarCardHTML, LIMIT_SWIPER_PASAR, swiperPasarOptions);
        renderSection('.grid-pasar-limited-container', dataPasar, createPasarCardHTML, LIMIT_GRID_PASAR, null, 'col-12 col-md-6 col-lg-4');
        renderSection('.grid-pasar-all-container', dataPasar, createPasarCardHTML, 0, null, 'col-12 col-md-6 col-lg-4');

        renderSection('.swiper-toko-container', allToko, createTokoCardHTML, LIMIT_SWIPER_TOKO, swiperTokoOptions);
        renderSection('.grid-toko-limited-container', allToko, createTokoCardHTML, LIMIT_GRID_TOKO, null, 'col-12 col-sm-6 col-md-4 col-lg-3');
        renderSection('.grid-toko-all-container', allToko, createTokoCardHTML, 0, null, 'col-12 col-sm-6 col-md-4 col-lg-3');

        renderSection('.swiper-produk-container', allProduk, createProdukCardHTML, LIMIT_SWIPER_PRODUK, swiperProdukOptions);
        renderSection('.grid-produk-limited-container', allProduk, createProdukCardHTML, LIMIT_GRID_PRODUK, null, 'col-6 col-sm-4 col-md-3 col-lg-2');
        renderSection('.grid-produk-all-container', allProduk, createProdukCardHTML, 0, null, 'col-6 col-sm-4 col-md-3 col-lg-2');

        renderSection('.grid-kategori-container', dataKategori, createKategoriCardHTML, LIMIT_GRID_KATEGORI, null, 'col');

        // --- Kode untuk memanggil SATU KARTU SPESIFIK ---
        const produkSpesial = shuffleArray(allProduk)[0];
        const wadahProdukSpesial = document.getElementById('produk-unggulan-container');
        if (produkSpesial && wadahProdukSpesial) {
            wadahProdukSpesial.innerHTML = createProdukCardHTML(produkSpesial);
        }
    }

    // --- MAIN EXECUTION ---
    // Pastikan semua komponen, TERUTAMA YANG BERISI KONTAINER KARTU, dimuat di sini.
    Promise.all([
        loadComponent('navbar-pertama', 'components/navbar-pertama.html'),
        loadComponent('navbar-kedua', 'components/navbar-kedua.html'),
        loadComponent('navbar-pendukung', 'components/navbar-pendukung.html'),
        loadComponent('banner-utama-1', 'components/banner-utama-1.html'),
        loadComponent('banner-utama-2', 'components/banner-utama-2.html'),
        loadComponent('banner-event-1', 'components/banner-event-1.html'),
        loadComponent('banner-event-2', 'components/banner-event-2.html'),
        loadComponent('banner-promo-1', 'components/banner-promo-1.html'),
        loadComponent('banner-promo-2', 'components/banner-promo-2.html'),
        loadComponent('banner-event-3', 'components/banner-event-3.html'),
        loadComponent('swiper-pasar-container', 'components/swiper-pasar-container.html'),
        loadComponent('card-pasar-template', 'components/card-pasar-template.html'),
        loadComponent('card-toko-template', 'components/card-toko-template.html'),
        loadComponent('card-produk-template', 'components/card-produk-template.html'),
        loadComponent('footer-placeholder', 'components/footer.html')
    ]).then(() => {
        // Kode ini HANYA akan berjalan SETELAH SEMUA komponen di atas selesai dimuat.
        console.log("Semua komponen, termasuk template kartu, berhasil dimuat.");

        // 1. Atur posisi navbar
        positionSecondNavbar();

        // 2. Atur link aktif
        setActiveLink();

        // 3. Buat kartu dan inisialisasi Swiper
        initializePageContent();

    }).catch(error => {
        console.error("Terjadi kesalahan kritis saat memuat komponen penting:", error);
        // Tampilkan pesan error di halaman jika ada komponen yang gagal total
        const body = document.querySelector('body');
        if (body) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-danger m-3';
            errorDiv.innerText = 'Gagal memuat beberapa komponen halaman. Silakan periksa console log (F12) untuk detail dan pastikan path file komponen sudah benar.';
            body.prepend(errorDiv);
        }
    });

});
