import Config from '../config.js';
import { clamp } from '../utils.js';

export default function bindQuantity(scope = document) {
    const $ = window.jQuery;

    // Глобально сносим любые прямые/делегированные клики, повешенные где-то ещё
    $(document).off('click', '.number-input .plus');
    $(document).off('click', '.number-input .minus');

    // Снимаем наши возможные прошлые (чтобы не задублировать при повторной инициализации)
    $(scope).off('click.cartQty', Config.selectors.qtyPlus);
    $(scope).off('click.cartQty', Config.selectors.qtyMinus);

    // Вешаем РОВНО один раз
    $(scope).on('click.cartQty', Config.selectors.qtyPlus, function (e) {
        e.preventDefault();
        e.stopImmediatePropagation(); // если что-то ещё осталось — не пустим дальше

        const $input = $(this).siblings('input[type="number"]').first();
        const min = parseInt($input.attr('min')) || 1;
        const max = parseInt($input.attr('max')) || 99;
        const next = clamp((parseInt($input.val(), 10) || 0) + 1, min, max);

        $input.val(next).attr('value', next).trigger('input').trigger('change');
    });

    $(scope).on('click.cartQty', Config.selectors.qtyMinus, function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const $input = $(this).siblings('input[type="number"]').first();
        const min = parseInt($input.attr('min')) || 1;
        const max = parseInt($input.attr('max')) || 99;
        const next = clamp((parseInt($input.val(), 10) || 0) - 1, min, max);

        $input.val(next).attr('value', next).trigger('input').trigger('change');
    });
}
