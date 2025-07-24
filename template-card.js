// ==============================
    // KOLEKSI JS TEMPLATE CARD
    // ==============================

    const LIMIT_PASAR = 4;
    const LIMIT_TOKO = 8;
    const LIMIT_PRODUK = 12;

    // --- SINGLE NESTED DATA SOURCE ---
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
    ];

    // --- HELPER FUNCTIONS ---

    /**
     * Mengacak urutan elemen dalam sebuah array.
     * Menggunakan algoritma Fisher-Yates (Knuth) shuffle.
     * @param {Array} array Array yang ingin diacak.
     * @returns {Array} Array baru dengan urutan acak.
     */
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
    function generatePromos(promos) { if (!promos || promos.length === 0) return ''; return promos.map(promo => `<span class="badge opacity-75 me-1">${promo}</span>`).join(''); }
    function generateDiscount(harga, hargaCoret) { if (!hargaCoret || hargaCoret <= harga) return ''; const diskon = Math.round(((hargaCoret - harga) / hargaCoret) * 100); return `<div class="d-flex align-items-center mb-1 gap-1 flex-wrap"><span class="fw-bold badge discount-badge">${diskon}%</span><span class="text-muted text-decoration-line-through harga-dicoret">${formatRupiah(hargaCoret)}</span></div>`; }

    // --- RENDER CARDS ON PAGE LOAD ---
    window.onload = function () {
        const pasarContainer = document.getElementById('pasar-container');
        const tokoContainer = document.getElementById('toko-container');
        const produkContainer = document.getElementById('produk-container');

        // 1. Ekstrak dan ratakan (flatten) semua toko dan produk dari data utama
        const allToko = dataPasar.flatMap(pasar =>
            pasar.toko.map(toko => ({ ...toko, namaPasar: pasar.nama, daerahPasar: pasar.daerah }))
        );
        const allProduk = allToko.flatMap(toko =>
            (toko.produk || []).map(produk => ({ ...produk, namaToko: toko.nama }))
        );

        // 2. Acak dan batasi jumlah item untuk setiap kategori
        const displayedPasar = shuffleArray(dataPasar).slice(0, LIMIT_PASAR);
        const displayedToko = shuffleArray(allToko).slice(0, LIMIT_TOKO);
        const displayedProduk = shuffleArray(allProduk).slice(0, LIMIT_PRODUK);

        // Sembunyikan section jika tidak ada data untuk ditampilkan
        document.getElementById('pasar-section').style.display = displayedPasar.length > 0 ? 'block' : 'none';
        document.getElementById('toko-section').style.display = displayedToko.length > 0 ? 'block' : 'none';
        document.getElementById('produk-section').style.display = displayedProduk.length > 0 ? 'block' : 'none';

        // 3. Render setiap kategori dengan data yang sudah diacak dan dibatasi

        // Render Pasar Cards
        displayedPasar.forEach(pasar => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4 d-flex align-items-stretch';
            col.innerHTML = `
                    <div class="card card-pasar rounded-4 w-100">
                        <img src="${pasar.gambarBanner}" class="img-top rounded-top-4" alt="Banner ${pasar.nama}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Not+Found';">
                        <div class="card-body d-flex align-items-center">
                            <div class="me-3 flex-shrink-0"><img src="${pasar.gambarLogo}" alt="Logo ${pasar.nama}" class="img-fluid rounded-circle logo-pasar" onerror="this.onerror=null;this.src='https://placehold.co/100x100/cccccc/ffffff?text=Logo';"></div>
                            <div class="text-start w-100"><h4 class="card-title mb-1 judul-pasar">${pasar.nama}</h4><p class="card-text mb-0 judul-sub-pasar text-muted">${pasar.daerah}</p></div>
                        </div>
                    </div>`;
            pasarContainer.appendChild(col);
        });

        // Render Toko Cards
        displayedToko.forEach(toko => {
            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch';
            col.innerHTML = `
                    <div class="card card-toko rounded-4 w-100">
                        <img src="${toko.gambarBanner}" class="card-img-top img-top rounded-top-4" alt="Banner ${toko.nama}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Not+Found';">
                        <div class="card-body d-flex flex-column">
                            <div class="promo">${generatePromos(toko.promo)}</div>
                            <div class="d-flex align-items-center mb-2">
                                <div class="me-2 flex-shrink-0"><img src="${toko.gambarLogo}" alt="Logo ${toko.nama}" class="logo-toko img-fluid rounded-circle" onerror="this.onerror=null;this.src='https://placehold.co/100x100/cccccc/ffffff?text=Logo';"></div>
                                <div class="w-100" style="min-width: 0;"><h4 class="card-title mb-0 judul-toko" title="${toko.nama}">${toko.nama}</h4><div class="teks-kategori d-flex align-items-center gap-1 flex-wrap"><p class="mb-0">${toko.kategori}</p></div></div>
                            </div>
                            <div class="mt-auto">
                                <div class="d-flex justify-content-start mb-2">${generateStars(toko.rating)}</div>
                                <div class="flex-column text-start small text-muted d-flex w-100"><span class="teks-footer-card">${toko.namaPasar}</span><hr class="my-1" style="border-top: 1px solid #e0e0e0;"><span class="teks-footer-card text-muted opacity-75">${toko.daerahPasar}</span></div>
                            </div>
                        </div>
                    </div>`;
            tokoContainer.appendChild(col);
        });

        // Render Produk Cards
        displayedProduk.forEach(produk => {
            const col = document.createElement('div');
            col.className = 'col-6 col-sm-4 col-md-3 col-lg-2 d-flex align-items-stretch';
            col.innerHTML = `
                    <div class="card card-produk rounded-4 w-100">
                        <img src="${produk.gambar}" class="card-produk-img-top card-img-top rounded-top-4" alt="${produk.nama}" onerror="this.onerror=null;this.src='https://placehold.co/400x400/cccccc/ffffff?text=Not+Found';">
                        <div class="card-body d-flex flex-column p-2">
                            <div class="judul-produk" title="${produk.nama}">${produk.nama}</div>
                            <div class="mt-auto">
                                <p class="harga fw-bold m-0">${formatRupiah(produk.harga)}</p>
                                ${generateDiscount(produk.harga, produk.hargaCoret)}
                                <div class="d-flex align-items-center gap-1 flex-wrap info-terjual">
                                    ${generateStars(produk.rating)}
                                    <span class="text-muted">|</span>
                                    <span class="text-muted">${produk.terjual} terjual</span>
                                </div>
                                <div class="footer-card flex-column text-start small text-muted d-flex w-100 mt-2">
                                    <span class="teks-footer-card text-muted opacity-75">${produk.namaToko}</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
            produkContainer.appendChild(col);
        });
    };