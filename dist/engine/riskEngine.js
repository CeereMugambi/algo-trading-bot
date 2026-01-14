export class RiskEngine {
    peak = 0;
    check(equity) {
        this.peak = Math.max(this.peak, equity);
        const dd = (this.peak - equity) / this.peak;
        if (dd > 0.15) {
            throw new Error("KILL SWITCH: MAX DRAWDOWN HIT");
        }
    }
}
//# sourceMappingURL=riskEngine.js.map