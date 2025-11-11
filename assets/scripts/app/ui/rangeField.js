import clamp from '../utils/clamp.js';

// Инициализация всех .range-field (noUiSlider + wNumb)
export default function initRangeFields($) {
    $('.range-field').each(function () {
        const $root = $(this);
        const $slider = $root.find('.js-range');
        const $minInp = $root.find('.js-range-from');
        const $maxInp = $root.find('.js-range-to');

        const MIN = Number($root.data('min') ?? 0);
        const MAX = Number($root.data('max') ?? 100);
        const STEP = Number($root.data('step') ?? 1);

        const startAttr = ($root.data('start') || '')
            .toString().split(',')
            .map(s => Number(s.trim()))
            .filter(n => !isNaN(n));

        let start = startAttr.length === 2
            ? startAttr
            : [Number($minInp.val() || MIN), Number($maxInp.val() || MAX)];

        start = [clamp(start[0], MIN, MAX, STEP), clamp(start[1], MIN, MAX, STEP)];
        if (start[0] > start[1]) start[1] = start[0];

        noUiSlider.create($slider[0], {
            start, connect: true, step: STEP, range: { min: MIN, max: MAX },
            tooltips: [true, true], format: wNumb({ decimals: 0 })
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

        // наружу: событие изменения
        $slider[0].noUiSlider.on('change', (values) => {
            const from = parseInt(values[0], 10);
            const to = parseInt(values[1], 10);
            $root.trigger('range:change', [[from, to]]);
        });
    });
}
