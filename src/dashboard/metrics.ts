let state = {
    equity: 10000,
    drawdown: 0,
    openTrades: 0,
    dailyPnL: 0
  };
  
  export function update(m: Partial<typeof state>) {
    state = { ...state, ...m };
  }
  
  export function metrics() {
    return state;
  }
  