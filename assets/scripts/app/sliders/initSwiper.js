// Инициализация Swiper main + thumbs по твоей логике
export default function initSwiper() {
    const thumbsSwiper = new Swiper('.swiper-thumbs', {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            0: { slidesPerView: 3 },
            769: { slidesPerView: 3 }
        }
    });

    new Swiper('.swiper-main', {
        loop: true,
        spaceBetween: 10,
        thumbs: { swiper: thumbsSwiper }
    });
}
