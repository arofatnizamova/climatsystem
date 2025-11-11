// Инициализация всех .slick-slider по твоей логике
export default function initSlick($) {
    $('.slick-slider').each(function () {
        const slider = $(this);
        const wrapper = slider.closest('.slider-wrapper');

        const base = {
            prevArrow: wrapper.find('.slider-prev'),
            nextArrow: wrapper.find('.slider-next'),
            infinite: true,
            autoplay: true,
        };

        let extra = {};
        if (slider.hasClass('banner')) {
            extra = { slidesToShow: 1, slidesToScroll: 1, centerMode: false, arrows: true, autoplay: true };
        } else if (slider.hasClass('news')) {
            extra = {
                slidesToShow: 3, slidesToScroll: 1, centerMode: false, arrows: true, dots: false, autoplay: true, adaptiveHeight: true,
                responsive: [
                    { breakpoint: 1200, settings: { slidesToShow: 2.5, slidesToScroll: 1, dots: true } },
                    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1, dots: false, adaptiveHeight: true } },
                    { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, dots: false, adaptiveHeight: true } },
                    { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1, dots: false, adaptiveHeight: true } },
                ]
            };
        } else if (slider.hasClass('serteficates')) {
            extra = {
                slidesToShow: 4, slidesToScroll: 1, centerMode: false, arrows: true, dots: false, autoplay: true, adaptiveHeight: true,
                responsive: [
                    { breakpoint: 1200, settings: { slidesToShow: 2.5, slidesToScroll: 1, dots: true } },
                    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1, dots: true, adaptiveHeight: true } },
                    { breakpoint: 768, settings: { slidesToShow: 1.5, slidesToScroll: 1, dots: true, adaptiveHeight: true } },
                    { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, adaptiveHeight: true } },
                ]
            };
        }

        slider.slick($.extend({}, extra, base));
    });
}
