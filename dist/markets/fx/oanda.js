import axios from "axios";
export class Oanda {
    token;
    account;
    base = "https://api-fxpractice.oanda.com/v3";
    constructor(token = process.env.OANDA_API_KEY, account = process.env.OANDA_ACCOUNT_ID) {
        this.token = token;
        this.account = account;
    }
    async candles(pair) {
        const r = await axios.get(`${this.base}/instruments/${pair}/candles`, {
            headers: { Authorization: `Bearer ${this.token}` },
            params: { granularity: "M30", count: 300 }
        });
        return r.data.candles
            .filter((c) => c.complete)
            .map((c) => ({
            time: new Date(c.time).getTime(),
            open: +c.mid.o,
            high: +c.mid.h,
            low: +c.mid.l,
            close: +c.mid.c
        }));
    }
    async order(pair, units) {
        await axios.post(`${this.base}/accounts/${this.account}/orders`, {
            order: {
                units: units.toString(),
                instrument: pair,
                type: "MARKET",
                timeInForce: "FOK"
            }
        }, { headers: { Authorization: `Bearer ${this.token}` } });
    }
}
//# sourceMappingURL=oanda.js.map