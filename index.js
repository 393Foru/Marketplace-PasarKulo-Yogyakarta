// ============================
// KOLEKSI JS NAVBAR
// ============================

// Navbar tumpuk 2
document.addEventListener('DOMContentLoaded', function () {
    // Ambil elemen navbar pertama dan kedua
    const navbarUtama = document.getElementById('navbar-pertama');
    const navbarKedua = document.getElementById('navbar-kedua');

    // Pastikan kedua elemen ada
    if (navbarUtama && navbarKedua) {
        // Ambil tinggi sebenarnya dari navbar pertama
        const tinggiNavbarUtama = navbarUtama.offsetHeight;

        // Atur properti CSS 'top' untuknavbar kedua
        navbarKedua.style.top = tinggiNavbarUtama + 'px';
    }
});

// ==============================
// KOLEKSI JS SWIPER
// ==============================

// Inisialisasi untuk slider "Pilihan Pasar"
var pasarSwiper = new Swiper("#PasarPilihanSwiper", {
    slidesPerView: 1,
    spaceBetween: 10, // Anda bisa sesuaikan jarak untuk slider ini
    loop: true,
    navigation: {
        nextEl: "#PasarPilihanSwiper .swiper-button-next",
        prevEl: "#PasarPilihanSwiper .swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    }
});

// Inisialisasi untuk slider "Toko Pilihan"
var tokoSwiper = new Swiper("#tokoPilihanSwiper", {
    slidesPerView: 1,
    spaceBetween: 10, // Ini akan memberikan gap 10px
    loop: true,
    nested: true, // Mengaktifkan nested swiper
    navigation: {
        nextEl: "#tokoPilihanSwiper .swiper-button-next", // Target navigasi spesifik
        prevEl: "#tokoPilihanSwiper .swiper-button-prev", // Target navigasi spesifik
    },
    // pagination: {
    //     el: "#tokoPilihanSwiper .swiper-pagination", // Target paginasi spesifik
    //     clickable: true,
    // },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 4, // Menampilkan 4 slide pada layar lebar
        }
    }
});

// Inisialisasi untuk slider "Produk Pilihan"
var produkSwiper = new Swiper("#ProdukSwiper", {
    slidesPerView: 2,
    spaceBetween: 10, // Anda bisa sesuaikan jarak untuk slider ini
    loop: true,
    navigation: {
        nextEl: "#ProdukSwiper .swiper-button-next",
        prevEl: "#ProdukSwiper .swiper-button-prev",
    },
    pagination: {
        el: "#ProdukSwiper .swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 6,
        }
    }
});

