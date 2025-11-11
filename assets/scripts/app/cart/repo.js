import * as Storage from './storage.js';
import Config from './config.js';
import { clamp } from './utils.js';

const Repo = {
    get() { return Storage.read(); },
    totals() {
        const cart = Storage.read(); let count = 0, sum = 0;
        Object.values(cart.items).forEach(it => { count += it.qty; sum += it.qty * it.price; });
        return { count, sum };
    },
    add({ id, name, price, qty, image }) {
        if (!id) return;
        const cart = Storage.read();
        const ex = cart.items[id];
        const q = clamp(qty || 1, Config.qty.min, Config.qty.max);
        if (ex) { ex.qty = clamp(ex.qty + q, Config.qty.min, Config.qty.max); }
        else { cart.items[id] = { id: String(id), name: name || 'Товар', price: Number(price) || 0, qty: q, image: image || '' }; }
        Storage.write(cart);
    },
    updateQty(id, qty) {
        const cart = Storage.read();
        if (cart.items[id]) { cart.items[id].qty = clamp(qty, Config.qty.min, Config.qty.max); Storage.write(cart); }
    },
    removeMany(ids) {
        const cart = Storage.read();
        ids.forEach(id => delete cart.items[id]);
        Storage.write(cart);
    },
    clear() { Storage.write({ items: {} }); }
};
export default Repo;
