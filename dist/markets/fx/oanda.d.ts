export declare class Oanda {
    private token;
    private account;
    private base;
    constructor(token?: string, account?: string);
    candles(pair: string): Promise<any>;
    order(pair: string, units: number): Promise<void>;
}
//# sourceMappingURL=oanda.d.ts.map