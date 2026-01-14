export function isWeekend(ts) {
    const day = new Date(ts).getUTCDay();
    return day === 0 || day === 6;
}
export function isFxTradable(ts) {
    const hour = new Date(ts).getUTCHours();
    return hour >= 12 && hour <= 17; // London–NY overlap
}
//# sourceMappingURL=time.js.map