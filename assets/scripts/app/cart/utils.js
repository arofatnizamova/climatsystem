export const clamp = (n, min, max) => Math.max(min, Math.min(max, Number(n) || 0));
export const digits = (s) => String(s || '').replace(/[^\d]/g, '');
export const toNumberRub = (s) => { const d = digits(s); return d ? parseInt(d, 10) : 0; };
export const formatRub = (n) => {
    try { return new Intl.NumberFormat('ru-RU').format(n) + ' руб.'; }
    catch { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.'; }
};
export const plural = (n, forms) => {
    const n10 = n % 10, n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return forms[0];
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
    return forms[2];
};
