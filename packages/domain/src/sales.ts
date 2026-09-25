import type { SaleItem, SaleItemInput } from "./types.js";

export function calculateItemSubtotal(item: SaleItemInput): number {
  if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
    throw new Error("La cantidad debe ser un entero positivo.");
  }

  if (!Number.isInteger(item.unitPriceCents) || item.unitPriceCents < 0) {
    throw new Error(
      "El precio unitario debe expresarse en centavos no negativos.",
    );
  }

  return item.quantity * item.unitPriceCents;
}

export function calculateSaleTotals(items: SaleItemInput[]): {
  items: SaleItem[];
  subtotalCents: number;
  totalCents: number;
} {
  if (items.length === 0) {
    throw new Error("Una venta debe contener al menos un producto.");
  }

  const calculatedItems = items.map((item) => ({
    ...item,
    subtotalCents: calculateItemSubtotal(item),
  }));
  const totalCents = calculatedItems.reduce(
    (sum, item) => sum + item.subtotalCents,
    0,
  );

  return { items: calculatedItems, subtotalCents: totalCents, totalCents };
}
