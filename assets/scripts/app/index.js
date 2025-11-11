// scripts/app/index.js
import initSlick from './sliders/initSlick.js';
import initSwiper from './sliders/initSwiper.js';
// import initNumberInput from './ui/numberInput.js';
import initRangeFields from './ui/rangeField.js';
import initSocialFab from './ui/socialFab.js';

// корзина
import CartModule from './cart/index.js';

const $ = window.jQuery;

$(function () {
    // --- UI ---
    initSlick($);
    initSwiper();
    // initNumberInput($);
    initRangeFields($);
    initSocialFab($);

    // --- Корзина ---
    CartModule.init();
});
