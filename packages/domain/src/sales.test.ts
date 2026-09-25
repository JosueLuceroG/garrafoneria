import { describe, expect, it } from "vitest";
import { calculateSaleTotals } from "./sales.js";

describe("calculateSaleTotals", () => {
  it("calcula subtotales y total en centavos", () => {
    const result = calculateSaleTotals([
      {
        productId: "p1",
        productName: "Garrafón 20L",
        quantity: 2,
        unitPriceCents: 3800,
      },
      {
        productId: "p2",
        productName: "Agua 1L",
        quantity: 3,
        unitPriceCents: 1200,
      },
    ]);

    expect(result.items[0]?.subtotalCents).toBe(7600);
    expect(result.totalCents).toBe(11200);
  });

  it("rechaza una venta sin productos", () => {
    expect(() => calculateSaleTotals([])).toThrow("al menos un producto");
  });
});
