export type Id = string;
export type BusinessId = Id;
export type CustomerId = Id;
export type ProductId = Id;
export type SaleId = Id;

export type PaymentMethod = "cash" | "transfer" | "credit" | "other";
export type SaleStatus = "draft" | "signed" | "cancelled";
export type SyncStatus =
  "local_only" | "pending" | "syncing" | "synced" | "failed";

export interface Customer {
  id: CustomerId;
  businessId: BusinessId;
  name: string;
  address?: string;
  phone?: string;
  active: boolean;
}

export interface Product {
  id: ProductId;
  businessId: BusinessId;
  name: string;
  unitPriceCents: number;
  active: boolean;
}

export interface SaleItemInput {
  productId: ProductId;
  productName: string;
  quantity: number;
  unitPriceCents: number;
}

export interface SaleItem extends SaleItemInput {
  subtotalCents: number;
}

export interface GpsPoint {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  capturedAt: string;
}

export interface DeliveryProof {
  receiverName: string;
  signatureData: string;
  gps?: GpsPoint;
  signedAt: string;
}

export interface Sale {
  id: SaleId;
  businessId: BusinessId;
  noteNumber: string;
  routeId: Id;
  driverId: Id;
  deviceId: Id;
  customerId: CustomerId;
  occurredAt: string;
  items: SaleItem[];
  subtotalCents: number;
  totalCents: number;
  paymentMethod: PaymentMethod;
  status: SaleStatus;
  syncStatus: SyncStatus;
  deliveryProof?: DeliveryProof;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
}

export interface NoteSequence {
  routeCode: string;
  sequence: number;
}

export interface SyncOperation {
  id: Id;
  entity: "sale";
  entityId: SaleId;
  operation: "upsert";
  attempts: number;
  status: Exclude<SyncStatus, "local_only" | "synced">;
  lastError?: string;
  createdAt: string;
  updatedAt: string;
}
