import { describe, expect, it } from "vitest";
import { analyzeConversation, containsPotentialPersonalData } from "./analysisEngine";

describe("analyzeConversation", () => {
  it("extracts candidate-side momentum with quoted evidence", () => {
    const result = analyzeConversation(
      "Great feedback. We'd like to schedule the final round next Tuesday.",
      "en",
      "candidate",
    );

    expect(result.readLevel).toBe("positive");
    expect(result.positiveSignals.length).toBeGreaterThanOrEqual(2);
    expect(result.positiveSignals.every((signal) => signal.evidence.startsWith("“"))).toBe(true);
  });

  it("detects recruiter-side competing-offer risk", () => {
    const result = analyzeConversation(
      "I am excited, but I have another offer and need more time to decide.",
      "en",
      "recruiter",
    );

    expect(result.readLevel).toBe("high-risk");
    expect(result.riskSignals.map((signal) => signal.title)).toContain("A competing opportunity is mentioned");
  });

  it("returns a low-coverage state instead of inventing signals", () => {
    const result = analyzeConversation("Thanks for your message.", "en", "candidate");

    expect(result.headline).toBe("Not Enough Evidence for a Reliable Read");
    expect(result.confidence).toBeLessThan(25);
    expect(result.positiveSignals).toHaveLength(0);
    expect(result.riskSignals).toHaveLength(0);
  });

  it("supports Chinese signal extraction", () => {
    const result = analyzeConversation("我想再和家人商量一下，而且手上有另一个Offer。", "zh", "recruiter");

    expect(result.riskSignals.length).toBeGreaterThanOrEqual(2);
    expect(result.readLevel).toBe("high-risk");
  });
});

describe("containsPotentialPersonalData", () => {
  it.each([
    "Email me at candidate@example.com",
    "Call +1 (212) 555-0199",
    "微信：candidate_2026",
  ])("flags common contact details in %s", (input) => {
    expect(containsPotentialPersonalData(input)).toBe(true);
  });

  it("does not flag an ordinary recruiting message", () => {
    expect(containsPotentialPersonalData("We will schedule the next round tomorrow.")).toBe(false);
  });
});
