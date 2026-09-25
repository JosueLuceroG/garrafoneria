import type { NoteSequence } from "./types.js";

export function formatNoteNumber(sequence: NoteSequence): string {
  if (!/^[A-Z0-9-]+$/.test(sequence.routeCode)) {
    throw new Error(
      "El código de ruta solo puede contener letras mayúsculas, números y guiones.",
    );
  }
  if (!Number.isInteger(sequence.sequence) || sequence.sequence < 1) {
    throw new Error("La secuencia debe ser un entero positivo.");
  }

  return `${sequence.routeCode}-${String(sequence.sequence).padStart(6, "0")}`;
}

export function createId(): string {
  const nativeUuid = (
    globalThis as { crypto?: { randomUUID?: () => string } }
  ).crypto?.randomUUID?.();
  if (nativeUuid) {
    return nativeUuid;
  }

  const bytes = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256),
  );
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const hex = bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
