const Config = {
    storageKey: 'cart',
    qty: { min: 1, max: 99 },
    selectors: {
        // product page
        addToCartBtn: '.add-to-cart, .btn-outline-blue:contains("Добавить в корзину")',
        productRoot: '.w-100',
        productQty: '.number-input input[type="number"]',

        // cart page
        cartList: '.js-cart-list',
        cartItem: '.cart-item',
        qtyInput: '.number-input input[type="number"]',
        qtyPlus: '.number-input .plus',
        qtyMinus: '.number-input .minus',
        deleteBtn: '.js-cart-delete-selected',
        summaryBox: '.bg-main-2'
    }
};
export default Config;
