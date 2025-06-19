(function () {
    "use strict";

if (document.querySelectorAll('#qui-dashboard').length > 0) {
    const options = {
        centeredSlides: false,
        loop: false,
        slidesPerView: 4,
        autoplay:false,
        spaceBetween: 32,
        breakpoints: {
            320: { slidesPerView: 1 },
            550: { slidesPerView: 1 },
            991: { slidesPerView: 1 },
            1400: { slidesPerView: 1 },
            1500: { slidesPerView: 1 },
            1920: { slidesPerView: 1 },
            2040: { slidesPerView: 1 },
            2440: { slidesPerView: 1 }
        },
        pagination: {
            el: '.swiper-pagination'
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar'
        }
    }

    let swiper = new Swiper('#qui-dashboard',options);

    document.addEventListener('theme_scheme_direction', (e) => {
      swiper.destroy(true, true)
      setTimeout(() => {
          swiper = new Swiper('#qui-dashboard',options);
      }, 500);
    })
}

})(jQuery);