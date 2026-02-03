import { describe, it, expect } from "vitest";
import {
  processData,
  formatDate,
  formatDateTime,
  calculateScore,
  validateEmail,
} from "./helpers";

describe("helpers", () => {
  describe("processData", () => {
    it("should return null for falsy input", () => {
      expect(processData(null)).toBeNull();
      expect(processData(undefined)).toBeNull();
      expect(processData("")).toBeNull();
    });

    it("should add processed flag to data", () => {
      const input = { name: "test" };
      const result = processData(input);
      expect(result).toEqual({ name: "test", processed: true });
    });
  });

  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = new Date("2024-03-15");
      expect(formatDate(date)).toBe("2024-03-15");
    });

    it("should pad single digit month and day", () => {
      const date = new Date("2024-01-05");
      expect(formatDate(date)).toBe("2024-01-05");
    });
  });

  describe("formatDateTime", () => {
    it("should format date and time correctly", () => {
      const date = new Date("2024-03-15T14:30:00");
      expect(formatDateTime(date)).toBe("2024-03-15 14:30");
    });
  });

  describe("calculateScore", () => {
    it("should calculate basic score without modifiers", () => {
      const result = calculateScore(100, 1, 0, 0, 0, 0);
      expect(result).toBe(100);
    });

    it("should apply multiplier correctly", () => {
      const result = calculateScore(100, 2, 0, 0, 0, 0);
      expect(result).toBe(200);
    });

    it("should apply bonus correctly", () => {
      const result = calculateScore(100, 1, 50, 0, 0, 0);
      expect(result).toBe(150);
    });

    it("should apply penalty correctly", () => {
      const result = calculateScore(100, 1, 0, 20, 0, 0);
      expect(result).toBe(80);
    });

    it("should apply level modifier", () => {
      const result = calculateScore(100, 1, 0, 0, 5, 0);
      expect(result).toBe(150);
    });

    it("should apply streak modifier", () => {
      const result = calculateScore(100, 1, 0, 0, 0, 3);
      expect(result).toBe(110);
    });
  });

  describe("validateEmail", () => {
    it("should validate correct email", () => {
      expect(validateEmail("test@example.com")).toBe(true);
    });

    it("should reject invalid email", () => {
      expect(validateEmail("invalid-email")).toBe(false);
      expect(validateEmail("@example.com")).toBe(false);
      expect(validateEmail("test@")).toBe(false);
    });
  });
});
