import Config from '../config.js';
import Repo from '../repo.js';
import { readItem } from '../views/productView.js';
import bindQuantity from '../ui/quantityControl.js';

const ProductController = {
    init() {
        const $ = window.jQuery;

        bindQuantity(document);

        $(document)
            .off('click.cartAdd', Config.selectors.addToCartBtn)
            .on('click.cartAdd', Config.selectors.addToCartBtn, function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();

                const item = readItem($(this));              // qty читаем СЕЙЧАС, из .val()
                const ex = Repo.get().items[item.id];

                if (ex) {
                    const next = Math.min(ex.qty + item.qty, Config.qty.max); // ПЛЮСУЕМ
                    Repo.updateQty(item.id, next);
                } else {
                    Repo.add(item);                                            // первый раз — с этим qty
                }
            });
    }
};
export default ProductController;

