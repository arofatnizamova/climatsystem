import Config from '../config.js';
import { toNumberRub } from '../utils.js';

function findQtyInput($btn) {
    const $ = window.jQuery;

    // 1) в том же «блоке товара»
    let $inp = $btn.closest('.w-100').find('.number-input input[type="number"]').first();
    if ($inp.length) return $inp;

    // 2) родительская колонка -> соседние блоки
    $inp = $btn.closest('.col-6, .row').siblings().find('.number-input input[type="number"]').first();
    if ($inp.length) return $inp;

    // 3) поднимаемся выше до ближайшего контейнера с количеством
    $inp = $btn.parents().filter(function () { return $(this).find('.number-input input[type="number"]').length; })
        .first()
        .find('.number-input input[type="number"]').first();
    if ($inp.length) return $inp;

    // 4) крайний случай — первый инпут на странице (чтобы не было undefined)
    return $('.number-input input[type="number"]').first();
}

export function readItem($btn) {
    const $ = window.jQuery;

    // данные с кнопки
    const id = String($btn.data('id') || $btn.attr('data-id') || 'unknown');
    const name = $btn.data('name') || 'Товар';
    const price = Number($btn.data('price')) || 0;
    const image = $btn.data('image') || '';

    // количество — ТОЛЬКО из .val() того инпута, который реально рядом с кнопкой
    const $qty = findQtyInput($btn);
    const min = parseInt($qty.attr('min')) || 1;
    const max = parseInt($qty.attr('max')) || 99;
    const qty = Math.max(min, Math.min(max, parseInt($qty.val(), 10) || min));

    return { id, name, price, qty, image };
}
