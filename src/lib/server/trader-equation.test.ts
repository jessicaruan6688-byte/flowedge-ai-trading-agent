import { describe, expect, it } from "vitest";
import { checkTraderEquation } from "./trader-equation";

describe("checkTraderEquation", () => {
  it("passes when R:R and expected value are healthy", () => {
    const result = checkTraderEquation({
      direction: "long",
      entryPrice: 100,
      stopLoss: 95,
      takeProfit: 115,
      scenarioConfidence: 70,
      adx14: 30,
    });

    expect(result.passed).toBe(true);
    expect(result.riskRewardRatio).toBeGreaterThanOrEqual(1.5);
    expect(result.expectedValue).toBeGreaterThan(0);
  });

  it("rejects when risk reward is too low", () => {
    const result = checkTraderEquation({
      direction: "long",
      entryPrice: 100,
      stopLoss: 90,
      takeProfit: 105,
      scenarioConfidence: 50,
    });

    expect(result.passed).toBe(false);
    expect(result.reason).toContain("风险收益比");
  });
});
