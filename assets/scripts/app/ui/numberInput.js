// Плюс/минус для .number-input
export default function initNumberInput($) {
    $('.number-input').each(function () {
        const $wrap = $(this);
        const $input = $wrap.find('input');
        const $plus = $wrap.find('.plus');
        const $minus = $wrap.find('.minus');

        $plus.on('click', function () {
            const value = parseInt($input.val()) || 0;
            $input.val(value + 1).trigger('change');
        });

        $minus.on('click', function () {
            const value = parseInt($input.val()) || 0;
            const min = parseInt($input.attr('min')) || 0;
            if (value > min) {
                $input.val(value - 1).trigger('change');
            }
        });
    });
}
