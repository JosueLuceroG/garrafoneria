import type { Sale } from "./types.js";

export interface PrinterStatus {
  connected: boolean;
  printerName?: string;
}

export interface PrinterService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getStatus(): Promise<PrinterStatus>;
  printReceipt(sale: Sale): Promise<void>;
  testPrint(): Promise<void>;
}

export class MockPrinterService implements PrinterService {
  private connected = false;
  readonly printedReceipts: string[] = [];

  async connect(): Promise<void> {
    this.connected = true;
  }

  async disconnect(): Promise<void> {
    this.connected = false;
  }

  async getStatus(): Promise<PrinterStatus> {
    return { connected: this.connected, printerName: "Mock ESC/POS 58mm" };
  }

  async printReceipt(sale: Sale): Promise<void> {
    if (!this.connected) {
      throw new Error("La impresora mock no está conectada.");
    }
    this.printedReceipts.push(`${sale.noteNumber}:${sale.totalCents}`);
  }

  async testPrint(): Promise<void> {
    if (!this.connected) {
      throw new Error("La impresora mock no está conectada.");
    }
    this.printedReceipts.push("test-print");
  }
}
