export function fees(market, notional) {
    return market === "crypto" ? notional * 0.0004 : notional * 0.00015;
}
//# sourceMappingURL=fees.js.map