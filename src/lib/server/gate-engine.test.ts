import { describe, expect, it } from "vitest";
import { runGateDiagnosis, type GateBar } from "./gate-engine";

function makeBars(count: number, base = 100): GateBar[] {
  return Array.from({ length: count }, (_, i) => {
    const close = base + i * 0.2;
    return {
      open: close - 0.1,
      high: close + 0.5,
      low: close - 0.5,
      close,
      volume: 1_000_000 + i * 1000,
      ma5: close - 0.2,
      ma20: close - 1,
      ma60: close - 2,
    };
  });
}

const basePortfolio = {
  cash: 500_000,
  totalValue: 1_000_000,
  positions: [],
  dailyPnl: 0,
  maxDrawdown: 0.02,
};

describe("runGateDiagnosis", () => {
  it("rejects when bar history is insufficient", () => {
    const result = runGateDiagnosis({
      bars: makeBars(20),
      technicals: { rsi: 50, ema8: 100, ema21: 99, ema55: 95, adx14: 25 },
      portfolio: basePortfolio,
      currentPrice: 104,
      symbol: "0700.HK",
    });

    expect(result.verdict).toBe("wait");
    expect(result.nodes[0]?.id).toBe("g1_data");
    expect(result.nodes[0]?.answer).toBe("no");
  });

  it("proceeds for healthy trend data", () => {
    const result = runGateDiagnosis({
      bars: makeBars(80),
      technicals: {
        rsi: 55,
        ema8: 116,
        ema21: 112,
        ema55: 108,
        adx14: 28,
        volumeRatio: 1.1,
      },
      portfolio: basePortfolio,
      currentPrice: 116,
      symbol: "0700.HK",
    });

    expect(result.verdict).toBe("proceed");
    expect(result.nodes).toHaveLength(4);
  });

  it("rejects on climax RSI overbought with price above upper band", () => {
    const result = runGateDiagnosis({
      bars: makeBars(80),
      technicals: {
        rsi: 82,
        ema8: 116,
        ema21: 112,
        ema55: 108,
        adx14: 28,
        bollingerUpper: 115,
        bollingerLower: 105,
      },
      portfolio: basePortfolio,
      currentPrice: 116,
      symbol: "0981.HK",
    });

    expect(result.verdict).toBe("reject");
    expect(result.climaxRisk).toBe("triggered");
  });
});
