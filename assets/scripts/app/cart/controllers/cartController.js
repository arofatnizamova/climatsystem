import Config from '../config.js';
import Repo from '../repo.js';
import { on, Events } from '../bus.js';
import bindQuantity from '../ui/quantityControl.js';
import { itemId, selectedIds, removeSelectedFromDom, renderFromStorage, refreshSummary, updateDeleteBtnState } from '../views/cartView.js';
import { clamp } from '../utils.js';

const CartController = {
    init() {
        const $ = window.jQuery;
        bindQuantity(document);

        // если нет готовых карточек — сгенерируем из localStorage
        if (!$(Config.selectors.cartItem).length) {
            renderFromStorage();
        }

        // Выделение карточек
        $(document).on('click', Config.selectors.cartItem, function (e) {
            if ($(e.target).closest('.number-input, button, a, input').length) return;
            $(this).toggleClass('selected');
            updateDeleteBtnState();
        });

        // Изменение количества
        $(document).on('change', Config.selectors.qtyInput, function () {
            const $item = $(this).closest(Config.selectors.cartItem);
            const id = itemId($item);
            const qty = clamp(parseInt($(this).val()) || 1, Config.qty.min, Config.qty.max);
            $(this).val(qty);
            Repo.updateQty(id, qty);
        });

        // Удалить выбранное
        $(document).on('click', Config.selectors.deleteBtn, function (e) {
            e.preventDefault();
            const ids = selectedIds();
            if (!ids.length) return;
            Repo.removeMany(ids);
            if ($(Config.selectors.cartList).length) renderFromStorage();
            else removeSelectedFromDom();
        });

        // Автопересчёт
        on(Events.CHANGED, function () { refreshSummary(); updateDeleteBtnState(); });

        // первичный пересчёт
        refreshSummary();
        updateDeleteBtnState();
    }
};
export default CartController;
