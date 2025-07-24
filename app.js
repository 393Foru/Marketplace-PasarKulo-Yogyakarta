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
            nama: "Pasar Gede Hardjonagoro", daerah: "Surakarta, Jawa Tengah", gambarBanner: "https://placehold.co/600x400/3498db/ffffff?text=Pasar+Gede", gambarLogo: "https://placehold.co/100x100/2980b9/ffffff?text=PG",
            toko: [
                {
                    nama: "Toko Sembako Makmur Jaya", kategori: "Sembako", rating: 4.5, promo: ["Gratis Ongkir", "Diskon 10%"], gambarBanner: "https://placehold.co/600x400/16a085/ffffff?text=Toko+Makmur", gambarLogo: "https://placehold.co/100x100/1abc9c/ffffff?text=MJ",
                    produk: [
                        { nama: "Minyak Goreng Sania Pouch 2 Liter", harga: 35000, hargaCoret: 40000, rating: 4.9, terjual: "1rb+", gambar: "https://placehold.co/400x400/f39c12/ffffff?text=Minyak" },
                        { nama: "Beras Kepala Super Wangi Cap Bunga 5KG", harga: 68000, hargaCoret: null, rating: 4.8, terjual: "500+", gambar: "https://placehold.co/400x400/ecf0f1/000000?text=Beras" },
                        { nama: "Gula Pasir Kristal Putih GULAKU 1KG", harga: 16000, hargaCoret: 18000, rating: 4.7, terjual: "5rb+", gambar: "https://placehold.co/400x400/3498db/ffffff?text=Gula" }
                    ]
                }
            ]
        },
        {
            nama: "Pasar Beringharjo", daerah: "Yogyakarta, DIY", gambarBanner: "https://placehold.co/600x400/e74c3c/ffffff?text=Beringharjo", gambarLogo: "https://placehold.co/100x100/c0392b/ffffff?text=PB",
            toko: [
                {
                    nama: "Warung Sayur Segar Bu Tini", kategori: "Sayur & Buah", rating: 5.0, promo: ["Cashback 5rb"], gambarBanner: "https://placehold.co/600x400/27ae60/ffffff?text=Sayur+Segar", gambarLogo: "https://placehold.co/100x100/2ecc71/ffffff?text=BT",
                    produk: [{ nama: "Apel Fuji Premium Manis dan Renyah 1KG", harga: 45000, hargaCoret: 55000, rating: 5.0, terjual: "2rb+", gambar: "https://placehold.co/400x400/e74c3c/ffffff?text=Apel" }]
                },
                {
                    nama: "Lapak Daging Sapi Premium", kategori: "Daging", rating: 4.8, promo: [], gambarBanner: "https://placehold.co/600x400/c0392b/ffffff?text=Daging+Premium", gambarLogo: "https://placehold.co/100x100/e74c3c/ffffff?text=DS",
                    produk: [{ nama: "Daging Sapi Has Dalam (Tenderloin) 500gr", harga: 75000, hargaCoret: null, rating: 4.9, terjual: "750+", gambar: "https://placehold.co/400x400/c0392b/ffffff?text=Daging" }]
                }
            ]
        },
        {
            nama: "Pasar Sukawati", daerah: "Gianyar, Bali", gambarBanner: "https://placehold.co/600x400/f1c40f/ffffff?text=Sukawati", gambarLogo: "https://placehold.co/100x100/f39c12/ffffff?text=PS",
            toko: [
                {
                    nama: "Bumbu Dapur Lengkap Mbah Uti", kategori: "Bumbu", rating: 4.2, promo: ["Beli 2 Gratis 1"], gambarBanner: "https://placehold.co/600x400/d35400/ffffff?text=Bumbu+Mbah+Uti", gambarLogo: "https://placehold.co/100x100/e67e22/ffffff?text=BU",
                    produk: [{ nama: "Paket Bumbu Rawon Komplit Siap Masak", harga: 15000, hargaCoret: null, rating: 4.8, terjual: "300+", gambar: "https://placehold.co/400x400/34495e/ffffff?text=Bumbu" }]
                }
            ]
        },
        {
            nama: "Pasar Gec", daerah: "Surakarta, Jawa Tengah", gambarBanner: "https://placehold.co/600x400/3498db/ffffff?text=Pasar+Gede", gambarLogo: "https://placehold.co/100x100/2980b9/ffffff?text=PG",
            toko: [
                {
                    nama: "Toko Sembako Makmur Jaya", kategori: "Sembako", rating: 4.5, promo: ["Gratis Ongkir", "Diskon 10%"], gambarBanner: "https://placehold.co/600x400/16a085/ffffff?text=Toko+Makmur", gambarLogo: "https://placehold.co/100x100/1abc9c/ffffff?text=MJ",
                    produk: [
                        { nama: "Minyak Goreng Sania Pouch 2 Liter", harga: 35000, hargaCoret: 40000, rating: 4.9, terjual: "1rb+", gambar: "https://placehold.co/400x400/f39c12/ffffff?text=Minyak" },
                        { nama: "Beras Kepala Super Wangi Cap Bunga 5KG", harga: 68000, hargaCoret: null, rating: 4.8, terjual: "500+", gambar: "https://placehold.co/400x400/ecf0f1/000000?text=Beras" },
                        { nama: "Gula Pasir Kristal Putih GULAKU 1KG", harga: 16000, hargaCoret: 18000, rating: 4.7, terjual: "5rb+", gambar: "https://placehold.co/400x400/3498db/ffffff?text=Gula" }
                    ]
                }
            ]
        },
        {
            nama: "Pasar Gede v", daerah: "Surakarta, Jawa Tengah", gambarBanner: "https://placehold.co/600x400/3498db/ffffff?text=Pasar+Gede", gambarLogo: "https://placehold.co/100x100/2980b9/ffffff?text=PG",
            toko: [
                {
                    nama: "Toko Sembako Makmur Jaya", kategori: "Sembako", rating: 4.5, promo: ["Gratis Ongkir", "Diskon 10%"], gambarBanner: "https://placehold.co/600x400/16a085/ffffff?text=Toko+Makmur", gambarLogo: "https://placehold.co/100x100/1abc9c/ffffff?text=MJ",
                    produk: [
                        { nama: "Minyak Goreng Sania Pouch 2 Liter", harga: 35000, hargaCoret: 40000, rating: 4.9, terjual: "1rb+", gambar: "https://placehold.co/400x400/f39c12/ffffff?text=Minyak" },
                        { nama: "Beras Kepala Super Wangi Cap Bunga 5KG", harga: 68000, hargaCoret: null, rating: 4.8, terjual: "500+", gambar: "https://placehold.co/400x400/ecf0f1/000000?text=Beras" },
                        { nama: "Gula Pasir Kristal Putih GULAKU 1KG", harga: 16000, hargaCoret: 18000, rating: 4.7, terjual: "5rb+", gambar: "https://placehold.co/400x400/3498db/ffffff?text=Gula" }
                    ]
                }
            ]
        },
        {
            nama: "Pasar Gede a", daerah: "Surakarta, Jawa Tengah", gambarBanner: "https://placehold.co/600x400/3498db/ffffff?text=Pasar+Gede", gambarLogo: "https://placehold.co/100x100/2980b9/ffffff?text=PG",
            toko: [
                {
                    nama: "Toko Sembako Makmur Jaya", kategori: "Sembako", rating: 4.5, promo: ["Gratis Ongkir", "Diskon 10%"], gambarBanner: "https://placehold.co/600x400/16a085/ffffff?text=Toko+Makmur", gambarLogo: "https://placehold.co/100x100/1abc9c/ffffff?text=MJ",
                    produk: [
                        { nama: "Minyak Goreng Sania Pouch 2 Liter", harga: 35000, hargaCoret: 40000, rating: 4.9, terjual: "1rb+", gambar: "https://placehold.co/400x400/f39c12/ffffff?text=Minyak" },
                        { nama: "Beras Kepala Super Wangi Cap Bunga 5KG", harga: 68000, hargaCoret: null, rating: 4.8, terjual: "500+", gambar: "https://placehold.co/400x400/ecf0f1/000000?text=Beras" },
                        { nama: "Gula Pasir Kristal Putih GULAKU 1KG", harga: 16000, hargaCoret: 18000, rating: 4.7, terjual: "5rb+", gambar: "https://placehold.co/400x400/3498db/ffffff?text=Gula" }
                    ]
                }
            ]
        },
    ];

    /**
     * Fungsi ini akan dijalankan SETELAH semua komponen HTML dimuat.
     * Isinya adalah logika untuk membuat kartu dan menginisialisasi Swiper.
     */
    function initializePageContent() {
        // --- HELPER FUNCTIONS ---
        function shuffleArray(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        }
        function formatRupiah(angka) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka); }
        function generateStars(rating) { if (!rating) return ''; return `<span class="text-warning">&#9733;</span> <span class="text-muted">(${rating.toFixed(1)})</span>`; }
        function generatePromos(promos) { if (!promos || promos.length === 0) return ''; return promos.map(promo => `<span class="badge bg-success opacity-75 me-1">${promo}</span>`).join(''); }
        function generateDiscount(harga, hargaCoret) { if (!hargaCoret || hargaCoret <= harga) return ''; const diskon = Math.round(((hargaCoret - harga) / hargaCoret) * 100); return `<div class="d-flex align-items-center mb-1 gap-1 flex-wrap"><span class="fw-bold badge bg-danger discount-badge">${diskon}%</span><span class="text-muted text-decoration-line-through harga-dicoret">${formatRupiah(hargaCoret)}</span></div>`; }

        // --- RENDER CARDS ---
        const pasarContainer = document.querySelector('#PasarPilihanSwiper .swiper-wrapper');
        const tokoContainer = document.querySelector('#tokoPilihanSwiper .swiper-wrapper');
        const produkContainer = document.querySelector('#ProdukSwiper .swiper-wrapper');

        if (!pasarContainer || !tokoContainer || !produkContainer) {
            console.error("Satu atau lebih kontainer Swiper (.swiper-wrapper) tidak ditemukan. Pastikan ID dan struktur HTML komponen kartu sudah benar dan telah dimuat.");
            return;
        }

        const LIMIT_PASAR = 7;
        const LIMIT_TOKO = 8;
        const LIMIT_PRODUK = 12;

        const allToko = dataPasar.flatMap(pasar => pasar.toko.map(toko => ({ ...toko, namaPasar: pasar.nama, daerahPasar: pasar.daerah })));
        const allProduk = allToko.flatMap(toko => (toko.produk || []).map(produk => ({ ...produk, namaToko: toko.nama })));

        const displayedPasar = shuffleArray(dataPasar).slice(0, LIMIT_PASAR);
        const displayedToko = shuffleArray(allToko).slice(0, LIMIT_TOKO);
        const displayedProduk = shuffleArray(allProduk).slice(0, LIMIT_PRODUK);

        // Sembunyikan/tampilkan seluruh section berdasarkan data
        const pasarSection = document.getElementById('pasar-section');
        const tokoSection = document.getElementById('toko-section');
        const produkSection = document.getElementById('produk-section');

        if(pasarSection) pasarSection.style.display = displayedPasar.length > 0 ? 'block' : 'none';
        if(tokoSection) tokoSection.style.display = displayedToko.length > 0 ? 'block' : 'none';
        if(produkSection) produkSection.style.display = displayedProduk.length > 0 ? 'block' : 'none';

        // Render Pasar Cards
        displayedPasar.forEach(pasar => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide d-flex align-items-stretch';
            slide.innerHTML = `<div class="card card-pasar rounded-4 w-100"><img src="${pasar.gambarBanner}" class="img-top rounded-top-4" alt="Banner ${pasar.nama}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Not+Found';"><div class="card-body d-flex align-items-center"><div class="me-3 flex-shrink-0"><img src="${pasar.gambarLogo}" alt="Logo ${pasar.nama}" class="img-fluid rounded-circle logo-pasar" onerror="this.onerror=null;this.src='https://placehold.co/100x100/cccccc/ffffff?text=Logo';"></div><div class="text-start w-100"><h4 class="card-title mb-1 judul-pasar">${pasar.nama}</h4><p class="card-text mb-0 judul-sub-pasar text-muted">${pasar.daerah}</p></div></div></div>`;
            pasarContainer.appendChild(slide);
        });

        // Render Toko Cards
        displayedToko.forEach(toko => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide d-flex align-items-stretch';
            slide.innerHTML = `<div class="card card-toko rounded-4 w-100"><img src="${toko.gambarBanner}" class="card-img-top img-top rounded-top-4" alt="Banner ${toko.nama}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Not+Found';"><div class="card-body d-flex flex-column"><div class="promo mb-2">${generatePromos(toko.promo)}</div><div class="d-flex align-items-center mb-2"><div class="me-2 flex-shrink-0"><img src="${toko.gambarLogo}" alt="Logo ${toko.nama}" class="logo-toko img-fluid rounded-circle" onerror="this.onerror=null;this.src='https://placehold.co/100x100/cccccc/ffffff?text=Logo';"></div><div class="w-100" style="min-width: 0;"><h4 class="card-title mb-0 judul-toko" title="${toko.nama}">${toko.nama}</h4><div class="teks-kategori d-flex align-items-center gap-1 flex-wrap"><p class="mb-0">${toko.kategori}</p></div></div></div><div class="mt-auto"><div class="d-flex justify-content-start mb-2">${generateStars(toko.rating)}</div><div class="flex-column text-start small text-muted d-flex w-100"><span class="teks-footer-card">${toko.namaPasar}</span><hr class="my-1" style="border-top: 1px solid #e0e0e0;"><span class="teks-footer-card text-muted opacity-75">${toko.daerahPasar}</span></div></div></div></div>`;
            tokoContainer.appendChild(slide);
        });

        // Render Produk Cards
        displayedProduk.forEach(produk => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide d-flex align-items-stretch';
            slide.innerHTML = `<div class="card card-produk rounded-4 w-100"><img src="${produk.gambar}" class="card-produk-img-top card-img-top rounded-top-4" alt="${produk.nama}" onerror="this.onerror=null;this.src='https://placehold.co/400x400/cccccc/ffffff?text=Not+Found';"><div class="card-body d-flex flex-column p-2"><div class="judul-produk" title="${produk.nama}">${produk.nama}</div><div class="mt-auto"><p class="harga fw-bold m-0">${formatRupiah(produk.harga)}</p>${generateDiscount(produk.harga, produk.hargaCoret)}<div class="d-flex align-items-center gap-1 flex-wrap info-terjual">${generateStars(produk.rating)}<span class="text-muted">|</span><span class="text-muted">${produk.terjual} terjual</span></div><div class="footer-card flex-column text-start small text-muted d-flex w-100 mt-2"><span class="teks-footer-card text-muted opacity-75">${produk.namaToko}</span></div></div></div></div>`;
            produkContainer.appendChild(slide);
        });

        // --- Inisialisasi SWIPER SETELAH KARTU DIBUAT ---
        new Swiper("#PasarPilihanSwiper", { slidesPerView: 1, spaceBetween: 10, loop: true, navigation: { nextEl: "#PasarPilihanSwiper .swiper-button-next", prevEl: "#PasarPilihanSwiper .swiper-button-prev" }, pagination: { el: "#PasarPilihanSwiper .swiper-pagination", clickable: true }, breakpoints: { 576: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } } });
        new Swiper("#tokoPilihanSwiper", { slidesPerView: 1, spaceBetween: 10, loop: true, nested: true, navigation: { nextEl: "#tokoPilihanSwiper .swiper-button-next", prevEl: "#tokoPilihanSwiper .swiper-button-prev" }, breakpoints: { 576: { slidesPerView: 2 }, 768: { slidesPerView: 2 }, 992: { slidesPerView: 4 } } });
        new Swiper("#ProdukSwiper", { slidesPerView: 2, spaceBetween: 10, loop: true, navigation: { nextEl: "#ProdukSwiper .swiper-button-next", prevEl: "#ProdukSwiper .swiper-button-prev" }, pagination: { el: "#ProdukSwiper .swiper-pagination", clickable: true }, breakpoints: { 576: { slidesPerView: 3 }, 768: { slidesPerView: 3 }, 992: { slidesPerView: 6 } } });
    }

    // --- MAIN EXECUTION ---
    // Pastikan semua komponen, TERUTAMA YANG BERISI KONTAINER KARTU, dimuat di sini.
    Promise.all([
        loadComponent('navbar-pertama', 'components/navbar-pertama.html'),
        loadComponent('navbar-kedua', 'components/navbar-kedua.html'),
        loadComponent('navbar-pendukung', 'components/navbar-pendukung.html'),
        loadComponent('banner-utama-1', 'components/banner-utama-1.html'),
        loadComponent('banner-utama-2', 'components/banner-utama-2.html'),
        
        // ====================================================================
        // PERUBAHAN KUNCI: Pindahkan pemuatan komponen kartu ke dalam Promise.all
        // Pastikan ID placeholder dan path file-nya sudah benar.
        // ====================================================================
        // loadComponent('card-pasar-template', 'components/card-pasar-template.html'),
        // loadComponent('card-toko-template', 'components/card-toko-template.html'),
        // loadComponent('card-produk-template', 'components/card-produk-template.html'),

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
        if(body) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-danger m-3';
            errorDiv.innerText = 'Gagal memuat beberapa komponen halaman. Silakan periksa console log (F12) untuk detail dan pastikan path file komponen sudah benar.';
            body.prepend(errorDiv);
        }
    });

});
