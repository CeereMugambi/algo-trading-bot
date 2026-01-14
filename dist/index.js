import "dotenv/config";
import { BinanceSpot } from "./markets/crypto/binance.js";
import { Oanda } from "./markets/fx/oanda.js";
import { cryptoTrend } from "./strategies/trend.crypto.js";
import { fxTrend } from "./strategies/trend.fx.js";
import { RiskEngine } from "./engine/riskEngine.js";
import { update } from "./dashboard/metrics.js";
(async () => {
    const binance = new BinanceSpot();
    const oanda = new Oanda();
    const risk = new RiskEngine();
    const crypto = await binance.candles("BTC/USDT", "1h");
    const fx = await oanda.candles("EUR_USD");
    const cSignal = cryptoTrend(crypto);
    const fSignal = fxTrend(fx);
    console.log("Crypto:", cSignal.signal);
    console.log("FX:", fSignal.signal);
    update({ openTrades: 0 });
    risk.check(10000);
})();
//# sourceMappingURL=index.js.map