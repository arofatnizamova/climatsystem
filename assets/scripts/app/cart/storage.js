import Config from './config.js';
import { emit } from './bus.js';
import { Events } from './bus.js';

export const read = () => {
    try {
        const raw = localStorage.getItem(Config.storageKey);
        return raw ? JSON.parse(raw) : { items: {} };
    } catch { return { items: {} }; }
};
export const write = (cart) => {
    localStorage.setItem(Config.storageKey, JSON.stringify(cart));
    emit(Events.CHANGED, cart);
};
