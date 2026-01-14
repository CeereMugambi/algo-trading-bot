declare let state: {
    equity: number;
    drawdown: number;
    openTrades: number;
    dailyPnL: number;
};
export declare function update(m: Partial<typeof state>): void;
export declare function metrics(): {
    equity: number;
    drawdown: number;
    openTrades: number;
    dailyPnL: number;
};
export {};
//# sourceMappingURL=metrics.d.ts.map