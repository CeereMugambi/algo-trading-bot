export function slippage(price: number, atr: number, side: "buy" | "sell") {
    const pct = Math.min(0.001, (atr / price) * 0.1);
    return side === "buy" ? price * (1 + pct) : price * (1 - pct);
  }
  