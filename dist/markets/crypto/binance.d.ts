export declare class BinanceSpot {
    private client;
    candles(symbol: string, tf: string): Promise<import("ccxt").OHLCV[]>;
    balance(): Promise<import("ccxt").Balance | 0>;
    buy(symbol: string, amount: number): Promise<void>;
}
//# sourceMappingURL=binance.d.ts.map