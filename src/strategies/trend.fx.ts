import { EMA, RSI } from "technicalindicators";
import { isFxTradable } from "../utils/time.js";

export function fxTrend(candles: any[]) {
  if (candles.length < 200) return { signal: "NONE" };

  const close = candles.map(c => c.close);
  const ema50 = EMA.calculate({ period: 50, values: close });
  const ema200 = EMA.calculate({ period: 200, values: close });
  const rsi = RSI.calculate({ period: 14, values: close });

  const iEma50 = ema50.length - 1;
  const iEma200 = ema200.length - 1;
  const iRsi = rsi.length - 1;

  if (
    ema50[iEma50] === undefined ||
    ema200[iEma200] === undefined ||
    rsi[iRsi] === undefined
  ) return { signal: "NONE" };

  const lastCandle = candles[candles.length - 1];

  if (!isFxTradable(lastCandle.time)) return { signal: "NONE" };

  if (ema50[iEma50] > ema200[iEma200] && rsi[iRsi] > 45 && rsi[iRsi] < 65) {
    return { signal: "LONG", price: lastCandle.close };
  }

  return { signal: "NONE" };
}
