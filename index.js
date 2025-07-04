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
        navigation: {
            nextEl: "#tokoPilihanSwiper .swiper-button-next", // Target navigasi spesifik
            prevEl: "#tokoPilihanSwiper .swiper-button-prev", // Target navigasi spesifik
        },
        pagination: {
            el: "#tokoPilihanSwiper .swiper-pagination", // Target paginasi spesifik
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 4, // Menampilkan 4 slide pada layar lebar
            }
        }
    });