document.addEventListener("DOMContentLoaded", function () {
    /**
     * Fungsi generik untuk memuat komponen HTML.
     * Kini mengembalikan Promise agar kita bisa menunggu prosesnya selesai.
     */
    function loadComponent(elementId, filePath, callback) {
        // Mengembalikan Promise dari fetch
        return fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Tidak bisa memuat ${filePath}: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(elementId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                    if (callback) callback();
                }
            })
            .catch(error => {
                console.error('Gagal memuat komponen:', error);
            });
    }

    /**
     * Fungsi yang diperbarui untuk menandai link navbar yang aktif.
     * Menggabungkan logika dari kedua kode Anda.
     */
    function setActiveLink() {
        const currentPagePath = window.location.pathname;
        
        const allLinks = document.querySelectorAll('#navbar-pertama .nav-link, #navbar-pertama .dropdown-item, #navbar-kedua .nav-link, #navbar-kedua .dropdown-item , #navbar-pendukung .btn-selanjutnya');

        allLinks.forEach(link => {
            // 1. Reset semua link terlebih dahulu (dari kode baru Anda)
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            // Hapus juga 'active' dari dropdown parent jika ada
            if (link.closest('.dropdown')) {
                const dropdownToggle = link.closest('.dropdown').querySelector('.dropdown-toggle');
                if (dropdownToggle) {
                    dropdownToggle.classList.remove('active');
                }
            }

            // 2. Bandingkan path dan atur link yang aktif
            const linkPath = new URL(link.href).pathname;
            if (currentPagePath === linkPath) {
                // Tambahkan 'active' dan 'aria-current' (dari kode baru Anda)
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');

                // Logika untuk dropdown dari kode lama Anda (dipertahankan)
                if (link.classList.contains('dropdown-item')) {
                    const dropdownToggle = link.closest('.dropdown').querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
            }
        });
    }

    /**
     * Fungsi untuk mengatur posisi navbar kedua di bawah navbar pertama.
     */
    function positionSecondNavbar() {
        const navbarUtama = document.getElementById('navbar-pertama');
        const navbarKedua = document.getElementById('navbar-kedua');

        if (navbarUtama && navbarKedua) {
            const tinggiNavbarUtama = navbarUtama.offsetHeight;
            navbarKedua.style.top = tinggiNavbarUtama + 'px';
        }
    }

    // --- Menggunakan Promise.all untuk menunggu semua komponen penting selesai dimuat ---
    Promise.all([
        loadComponent('navbar-pertama', 'components/navbar-pertama.html', setActiveLink),
        loadComponent('navbar-kedua', 'components/navbar-kedua.html')
    ]).then(() => {
        // Kode ini HANYA akan berjalan SETELAH kedua navbar selesai dimuat.
        positionSecondNavbar();
    });

    // Memuat footer bisa berjalan sendiri karena tidak terkait dengan yang lain.
    loadComponent('footer-placeholder', 'components/footer.html');
    loadComponent('navbar-pendukung', 'components/navbar-pendukung.html', setActiveLink);
});