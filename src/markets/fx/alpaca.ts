import axios from "axios";

type Timeframe = "1Min" | "5Min" | "15Min" | "30Min" | "1Hour";

export class AlpacaFX {
  private dataBase = "https://data.alpaca.markets";
  private tradeBase = "https://paper-api.alpaca.markets";

  private key: string;
  private secret: string;

  constructor() {
    if (!process.env.ALPACA_KEY || !process.env.ALPACA_SECRET) {
      throw new Error("Missing Alpaca API credentials");
    }

    this.key = process.env.ALPACA_KEY;
    this.secret = process.env.ALPACA_SECRET;
  }

  private headers() {
    return {
      "APCA-API-KEY-ID": this.key,
      "APCA-API-SECRET-KEY": this.secret
    };
  }

  // =========================
  // FX MARKET DATA
  // =========================
  async getFxCandles(pair: string, timeframe: Timeframe) {
    try {
      // Alpaca requires EUR/USD format
      const formattedPair = pair.includes("/") ? pair : pair.slice(0, 3) + "/" + pair.slice(3);
  
      const res = await axios.get(
        `${this.dataBase}/v1beta1/forex/bars`,
        {
          headers: this.headers(),
          params: {
            currency_pairs: formattedPair,
            timeframe,
            limit: 500
          }
        }
      );
  
      const bars = res.data?.bars?.[formattedPair] ?? [];
  
      return bars.map((c: any) => ({
        time: new Date(c.t).getTime(),
        open: Number(c.o),
        high: Number(c.h),
        low: Number(c.l),
        close: Number(c.c)
      }));
    } catch (err: any) {
      console.error(` FX candles error (${pair}):`, err.response?.data || err.message);
      return [];
    }
  }

  // =========================
  // CRYPTO MARKET DATA
  // =========================
  async getCryptoCandles(symbol: string, timeframe: Timeframe) {
    try {
      const res = await axios.get(
        `${this.dataBase}/v1beta3/crypto/us/bars`,
        {
          headers: this.headers(),
          params: {
            symbols: symbol,
            timeframe,
            limit: 500
          }
        }
      );

      const bars = res.data?.bars?.[symbol] ?? [];

      return bars.map((c: any) => ({
        time: new Date(c.t).getTime(),
        open: Number(c.o),
        high: Number(c.h),
        low: Number(c.l),
        close: Number(c.c)
      }));
    } catch (err: any) {
      console.error(` Crypto candles error (${symbol}):`, err.response?.data || err.message);
      return [];
    }
  }

  // =========================
  // PLACE ORDER (PAPER)
  // =========================
  async placeOrder(symbol: string, qty: number, side: "buy" | "sell") {
    try {
      await axios.post(
        `${this.tradeBase}/v2/orders`,
        {
          symbol,
          qty,
          side,
          type: "market",
          time_in_force: "gtc"
        },
        { headers: this.headers() }
      );

      console.log(`Order placed: ${side} ${qty} ${symbol}`);
    } catch (err: any) {
      console.error("Order failed:", err.response?.data || err.message);
    }
  }
}
