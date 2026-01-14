import "dotenv/config";
import { BinanceSpot } from "./markets/crypto/binance.js";
import { AlpacaFX } from "./markets/fx/alpaca.js";
import { cryptoTrend } from "./strategies/trend.crypto.js";
import { fxTrend } from "./strategies/trend.fx.js";
import { RiskEngine } from "./engine/riskEngine.js";
import { update } from "./dashboard/metrics.js";

(async () => {
    const binance = new BinanceSpot();
    const alpaca = new AlpacaFX();
    const risk = new RiskEngine();
  
    // Fetch data
    const crypto = await binance.candles("BTC/USDT", "1h");
    const fx = await alpaca.getFxCandles("EURUSD", "30Min");
  
    // Generate signals
    const cSignal = cryptoTrend(crypto);
    const fSignal = fxTrend(fx);
  
    console.log("Crypto:", cSignal.signal, cSignal.price);
    console.log("FX:", fSignal.signal, fSignal.price);
  
    update({ openTrades: 0 });
  
    risk.check(10000);

  })();
  
  async function run() {
    const alpaca = new AlpacaFX();
  
    // ===== FX TEST =====
    const fx = await alpaca.getFxCandles("EURUSD", "30Min");
    console.log("FX candles:", fx.slice(-3));
  
    // ===== CRYPTO TEST =====
    const crypto = await alpaca.getCryptoCandles("BTC/USD", "1Hour");
    console.log("Crypto candles:", crypto.slice(-3));
  }
  
  run();
