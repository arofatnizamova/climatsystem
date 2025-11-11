// scripts/app/cart/index.js
import ProductController from './controllers/productController.js';
import CartController from './controllers/cartController.js';
import Config from './config.js';
import Repo from './repo.js';
import initCartBadge from './ui/cartBadge.js';

const CartModule = {
    init() {
        const $ = window.jQuery;
        $(function () {
            // обновляем бейдж сразу при старте
            initCartBadge($);

            // инициализация страниц
            if ($(Config.selectors.addToCartBtn).length) ProductController.init();
            if ($(Config.selectors.cartList).length || $('.text-uppercase:contains("Корзина")').length) CartController.init();
        });
    },
    repo: Repo,
    config: Config
};

export default CartModule;
