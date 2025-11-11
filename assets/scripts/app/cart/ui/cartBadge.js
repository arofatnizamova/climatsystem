// scripts/app/cart/ui/cartBadge.js
import { on, Events } from '../bus.js';
import Repo from '../repo.js';

export default function initCartBadge($) {
    const $badge = $('.js-cart-count');
    if (!$badge.length) return;

    const updateBadge = () => {
        const { count } = Repo.totals();
        // если 0 — можно спрятать, если хочешь
        if (count <= 0) {
            $badge.text(count).addClass('updated');
            setTimeout(() => $badge.removeClass('updated'), 300);
        } else {
            $badge.text(count).removeClass('opacity-50');
        }
    };

    // 1️⃣ первичная отрисовка
    updateBadge();

    // 2️⃣ обновление при изменении корзины
    on(Events.CHANGED, updateBadge);

    // 3️⃣ при возврате на страницу (если кто-то другой поменял localStorage)
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') updateBadge();
    });
}
