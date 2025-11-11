// Простая шина событий на jQuery
export const Events = { CHANGED: 'cart:changed' };
export const on = (evt, handler) => window.jQuery(document).on(evt, handler);
export const emit = (evt, payload) => window.jQuery(document).trigger(evt, payload);
