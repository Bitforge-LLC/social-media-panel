import { describe, expect, it } from "vitest";

// Example utility functions to test
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(amount);
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

describe("Utility Functions", () => {
  describe("formatCurrency", () => {
    it("should format positive numbers correctly", () => {
      expect(formatCurrency(100)).toBe("$100.00");
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
    });

    it("should format zero correctly", () => {
      expect(formatCurrency(0)).toBe("$0.00");
    });

    it("should format negative numbers correctly", () => {
      expect(formatCurrency(-50)).toBe("-$50.00");
    });
  });

  describe("truncateText", () => {
    it("should not truncate text shorter than max length", () => {
      const text = "Short text";
      expect(truncateText(text, 20)).toBe(text);
    });

    it("should truncate text longer than max length", () => {
      const text = "This is a very long text that should be truncated";
      expect(truncateText(text, 10)).toBe("This is a ...");
    });

    it("should handle exact length correctly", () => {
      const text = "Exact";
      expect(truncateText(text, 5)).toBe("Exact");
    });

    it("should handle empty string", () => {
      expect(truncateText("", 10)).toBe("");
    });
  });
});
