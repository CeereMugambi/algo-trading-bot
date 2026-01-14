export function fees(market: "crypto" | "fx", notional: number) {
    return market === "crypto" ? notional * 0.0004 : notional * 0.00015;
  }
  