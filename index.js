    // Inisialisasi untuk slider "Pilihan Pasar"
    var pasarSwiper = new Swiper(".mySwiper:not(#tokoPilihanSwiper)", {
        slidesPerView: 1,
        spaceBetween: 20, // Anda bisa sesuaikan jarak untuk slider ini
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
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
                slidesPerView: 4, // Menggunakan auto untuk menyesuaikan dengan ukuran konten
            }
        }
    });