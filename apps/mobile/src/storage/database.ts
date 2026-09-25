import type { SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(
  database: SQLiteDatabase,
): Promise<void> {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY NOT NULL,
      business_id TEXT NOT NULL,
      name TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY NOT NULL,
      business_id TEXT NOT NULL,
      name TEXT NOT NULL,
      unit_price_cents INTEGER NOT NULL,
      active INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY NOT NULL,
      business_id TEXT NOT NULL,
      note_number TEXT NOT NULL,
      route_id TEXT NOT NULL,
      driver_id TEXT NOT NULL,
      device_id TEXT NOT NULL,
      customer_id TEXT NOT NULL,
      occurred_at TEXT NOT NULL,
      total_cents INTEGER NOT NULL,
      payment_method TEXT NOT NULL,
      status TEXT NOT NULL,
      sync_status TEXT NOT NULL,
      receiver_name TEXT NOT NULL,
      signature_data TEXT NOT NULL,
      gps_json TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      synced_at TEXT
    );
    CREATE TABLE IF NOT EXISTS sale_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sale_id TEXT NOT NULL REFERENCES sales(id),
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price_cents INTEGER NOT NULL,
      subtotal_cents INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS outbox (
      id TEXT PRIMARY KEY NOT NULL,
      entity TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      operation TEXT NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL,
      last_error TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS sales_business_note_idx ON sales(business_id, note_number);
    CREATE INDEX IF NOT EXISTS sales_sync_status_idx ON sales(sync_status);
  `);

  await database.runAsync(
    "INSERT OR IGNORE INTO customers (id, business_id, name, active) VALUES (?, ?, ?, 1)",
    "customer-demo-1",
    "demo-business",
    "Abarrotes La Esquina",
  );
  await database.runAsync(
    "INSERT OR IGNORE INTO customers (id, business_id, name, active) VALUES (?, ?, ?, 1)",
    "customer-demo-2",
    "demo-business",
    "Tienda San Miguel",
  );
  await database.runAsync(
    "INSERT OR IGNORE INTO products (id, business_id, name, unit_price_cents, active) VALUES (?, ?, ?, ?, 1)",
    "product-demo-1",
    "demo-business",
    "Garrafón 20 L",
    3800,
  );
}
