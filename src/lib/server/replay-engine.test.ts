import { describe, expect, it } from "vitest";
import { runReplay } from "./replay-engine";

describe("runReplay", () => {
  it("hits take profit on a long trade", () => {
    const result = runReplay({
      direction: "long",
      entryPrice: 100,
      stopLoss: 95,
      takeProfit: 110,
      futureBars: [
        { timestamp: "2025-04-08", open: 101, high: 105, low: 100, close: 104 },
        { timestamp: "2025-04-09", open: 104, high: 111, low: 103, close: 109 },
      ],
    });

    expect(result.outcome).toBe("tp_hit");
    expect(result.pnlPerShare).toBeGreaterThan(0);
  });

  it("hits stop loss on a long trade", () => {
    const result = runReplay({
      direction: "long",
      entryPrice: 100,
      stopLoss: 95,
      takeProfit: 110,
      futureBars: [
        { timestamp: "2025-04-08", open: 99, high: 100, low: 94, close: 95 },
      ],
    });

    expect(result.outcome).toBe("sl_hit");
    expect(result.pnlPerShare).toBeLessThan(0);
  });

  it("returns no_trade for invalid levels", () => {
    const result = runReplay({
      direction: "long",
      entryPrice: 100,
      stopLoss: 105,
      takeProfit: 110,
      futureBars: [
        { timestamp: "2025-04-08", open: 100, high: 101, low: 99, close: 100 },
      ],
    });

    expect(result.outcome).toBe("no_trade");
    expect(result.replayPath).toHaveLength(0);
  });
});
