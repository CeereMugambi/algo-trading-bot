import ccxt from "ccxt";
export class BinanceSpot {
    client = new ccxt.binance({
        apiKey: process.env.BINANCE_KEY ?? "",
        secret: process.env.BINANCE_SECRET ?? "",
        enableRateLimit: true
    });
    async candles(symbol, tf) {
        return this.client.fetchOHLCV(symbol, tf, undefined, 300);
    }
    async balance() {
        const b = await this.client.fetchBalance();
        return b.total ?? 0;
    }
    async buy(symbol, amount) {
        await this.client.createMarketBuyOrder(symbol, amount);
    }
}
//# sourceMappingURL=binance.js.map