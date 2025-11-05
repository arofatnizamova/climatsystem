$(function () {
    $('.slick-slider').each(function () {
        let slider = $(this);
        let wrapper = slider.closest('.slider-wrapper');
        let options = {
            prevArrow: wrapper.find('.slider-prev'),
            nextArrow: wrapper.find('.slider-next'),
            infinite: true,
            autoplay: true,
        }
        let extraOptions = {}
        if (slider.hasClass('banner')) {
            extraOptions = {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
                arrows: true,
                autoplay: true,
            }
        } else if (slider.hasClass('news')) {
            extraOptions = {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                arrows: true,
                dots: false,
                autoplay: true,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2.5,
                            slidesToScroll: 1,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            dots: false,
                            adaptiveHeight: true,
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false,
                            adaptiveHeight: true,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false,
                            adaptiveHeight: true,
                        }
                    },
                ]
            }
        }
        slider.slick($.extend({}, extraOptions, options));
    })


    const thumbsSwiper = new Swiper(".swiper-thumbs", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 3, // по умолчанию 4
        freeMode: true,
        watchSlidesProgress: true,

        // Адаптив
        breakpoints: {
            0: {
                slidesPerView: 3, // на мобильных 3
            },
            769: {
                slidesPerView: 3, // на десктопе 4
            },
        },
    });

    //Основной слайдер
    const mainSwiper = new Swiper(".swiper-main", {
        loop: true,
        spaceBetween: 10,
        thumbs: {
            swiper: thumbsSwiper,
        },
    });

    $('.number-input').each(function () {
        const $wrapper = $(this);
        const $input = $wrapper.find('input');
        const $plus = $wrapper.find('.plus');
        const $minus = $wrapper.find('.minus');

        $plus.on('click', function () {
            let value = parseInt($input.val()) || 0;
            $input.val(value + 1).trigger('change');
        });

        $minus.on('click', function () {
            let value = parseInt($input.val()) || 0;
            let min = parseInt($input.attr('min')) || 0;
            if (value > min) {
                $input.val(value - 1).trigger('change');
            }
        });
    });


    const clamp = (v, min, max, step) => {
        const s = Number(step) || 1;
        const snapped = Math.round(v / s) * s;
        return Math.min(max, Math.max(min, snapped));
    };

    $('.range-field').each(function () {
        const $root = $(this);
        const $slider = $root.find('.js-range');
        const $minInp = $root.find('.js-range-from');
        const $maxInp = $root.find('.js-range-to');

        const MIN = Number($root.data('min') ?? 0);
        const MAX = Number($root.data('max') ?? 100);
        const STEP = Number($root.data('step') ?? 1);

        // старт: data-start="a,b" либо значения из инпутов, либо [MIN, MAX]
        const startAttr = ($root.data('start') || '').toString()
            .split(',')
            .map(s => Number(s.trim()))
            .filter(n => !isNaN(n));

        let start = startAttr.length === 2
            ? startAttr
            : [
                Number($minInp.val() || MIN),
                Number($maxInp.val() || MAX)
            ];

        start = [
            clamp(start[0], MIN, MAX, STEP),
            clamp(start[1], MIN, MAX, STEP)
        ];
        if (start[0] > start[1]) start[1] = start[0];

        // init noUiSlider
        noUiSlider.create($slider[0], {
            start,
            connect: true,
            step: STEP,
            range: { min: MIN, max: MAX },
            tooltips: [true, true],
            format: wNumb({ decimals: 0 })
        });

        // slider -> inputs
        $slider[0].noUiSlider.on('update', (values, handle) => {
            const val = parseInt(values[handle], 10);
            if (handle === 0) $minInp.val(val);
            if (handle === 1) $maxInp.val(val);
        });

        // inputs -> slider
        const syncFromInputs = () => {
            let a = clamp(Number($minInp.val() || MIN), MIN, MAX, STEP);
            let b = clamp(Number($maxInp.val() || MAX), MIN, MAX, STEP);
            if (a > b) b = a;
            $minInp.val(a);
            $maxInp.val(b);
            $slider[0].noUiSlider.set([a, b]);
        };
        $minInp.on('input change', syncFromInputs);
        $maxInp.on('input change', syncFromInputs);

        // наружу: событие изменения диапазона
        $slider[0].noUiSlider.on('change', (values) => {
            const from = parseInt(values[0], 10);
            const to = parseInt(values[1], 10);
            $root.trigger('range:change', [[from, to]]);
        });
    });
});