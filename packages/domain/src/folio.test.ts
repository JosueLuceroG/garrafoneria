import { describe, expect, it } from "vitest";
import { createId, formatNoteNumber } from "./folio.js";

describe("formatNoteNumber", () => {
  it("mantiene el folio legible por ruta", () => {
    expect(formatNoteNumber({ routeCode: "R01", sequence: 125 })).toBe(
      "R01-000125",
    );
  });

  it("rechaza secuencias inválidas", () => {
    expect(() => formatNoteNumber({ routeCode: "R01", sequence: 0 })).toThrow();
  });

  it("genera una identidad UUID para una venta local", () => {
    expect(createId()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });
});
