import ccxt from "ccxt";

export class BinanceSpot {
private client = new ccxt.binance({
        apiKey: process.env.BINANCE_KEY ?? "",
        secret: process.env.BINANCE_SECRET ?? "",
        enableRateLimit: true
 });

  async candles(symbol: string, tf: string) {
    return this.client.fetchOHLCV(symbol, tf, undefined, 300);
  }

  async balance() {
    const b = await this.client.fetchBalance();
    return b.total ?? 0;
  }

  async buy(symbol: string, amount: number) {
    await this.client.createMarketBuyOrder(symbol, amount);
  }
}
