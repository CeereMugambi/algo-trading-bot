export function slippage(price, atr, side) {
    const pct = Math.min(0.001, (atr / price) * 0.1);
    return side === "buy" ? price * (1 + pct) : price * (1 - pct);
}
//# sourceMappingURL=slippage.js.map