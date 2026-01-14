export function isWeekend(ts: number): boolean {
    const day = new Date(ts).getUTCDay();
    return day === 0 || day === 6;
  }
  
  export function isFxTradable(ts: number): boolean {
    const hour = new Date(ts).getUTCHours();
    return hour >= 12 && hour <= 17; // London–NY overlap
  }
  