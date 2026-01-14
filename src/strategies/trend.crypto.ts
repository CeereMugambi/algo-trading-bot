import { EMA, RSI, ATR } from "technicalindicators";

export function cryptoTrend(candles: any[]) {
  if (candles.length < 200) {
    // Not enough data to calculate EMA200
    return { signal: "NONE" };
  }

  const close = candles.map(c => c[4]);
  const high = candles.map(c => c[2]);
  const low = candles.map(c => c[3]);

  const ema50 = EMA.calculate({ period: 50, values: close });
  const ema200 = EMA.calculate({ period: 200, values: close });
  const rsi = RSI.calculate({ period: 14, values: close });
  const atr = ATR.calculate({ period: 14, high, low, close });

  // Latest available index
  const iEma50 = ema50.length - 1;
  const iEma200 = ema200.length - 1;
  const iRsi = rsi.length - 1;
  const iAtr = atr.length - 1;

  // Safety check: if any is undefined, skip
  if (
    ema50[iEma50] === undefined ||
    ema200[iEma200] === undefined ||
    rsi[iRsi] === undefined ||
    atr[iAtr] === undefined
  ) {
    return { signal: "NONE" };
  }

  if (ema50[iEma50] > ema200[iEma200] && rsi[iRsi] > 40 && rsi[iRsi] < 60) {
    return { signal: "LONG", atr: atr[iAtr], price: close[close.length - 1] };
  }

  return { signal: "NONE" };
}
