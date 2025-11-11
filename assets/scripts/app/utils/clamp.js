// округляет к шагу и ограничивает
export default function clamp(v, min, max, step = 1) {
    const s = Number(step) || 1;
    const snapped = Math.round((Number(v) || 0) / s) * s;
    return Math.min(max, Math.max(min, snapped));
}
