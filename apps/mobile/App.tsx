import { Suspense, useEffect, useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type GestureResponderEvent,
} from "react-native";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import * as Location from "expo-location";
import Svg, { Polyline } from "react-native-svg";
import {
  calculateSaleTotals,
  createId,
  formatNoteNumber,
  MockPrinterService,
  type PaymentMethod,
  type Sale,
} from "@garrafoneria/domain";
import { initializeDatabase } from "./src/storage/database";
import type { LocalSaleRow } from "./src/storage/types";

const BUSINESS_ID = "demo-business";
const ROUTE_CODE = "R01";
const mockPrinter = new MockPrinterService();

export default function App() {
  return (
    <Suspense
      fallback={<Text style={{ padding: 24 }}>Preparando base local...</Text>}
    >
      <SQLiteProvider
        databaseName="garrafoneria.local.db"
        onInit={initializeDatabase}
        useSuspense
      >
        <DemoDeliveryScreen />
      </SQLiteProvider>
    </Suspense>
  );
}

function DemoDeliveryScreen() {
  const database = useSQLiteContext();
  const [customerId, setCustomerId] = useState("customer-demo-1");
  const [quantity, setQuantity] = useState(1);
  const [receiverName, setReceiverName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [signaturePoints, setSignaturePoints] = useState<SignaturePoint[]>([]);
  const [localSales, setLocalSales] = useState<LocalSaleRow[]>([]);
  const [message, setMessage] = useState("Venta local lista para capturarse.");

  const total = useMemo(
    () =>
      calculateSaleTotals([
        {
          productId: "product-demo-1",
          productName: "Garrafón 20 L",
          quantity,
          unitPriceCents: 3800,
        },
      ]).totalCents,
    [quantity],
  );

  useEffect(() => {
    void refreshSales();
  }, []);

  async function refreshSales() {
    const rows = await database.getAllAsync<LocalSaleRow>(
      `SELECT sales.id, sales.note_number, customers.name AS customer_name, sales.total_cents, sales.sync_status, sales.created_at
       FROM sales JOIN customers ON customers.id = sales.customer_id ORDER BY sales.created_at DESC`,
    );
    setLocalSales(rows);
  }

  function addSignaturePoint(event: GestureResponderEvent) {
    const { locationX, locationY } = event.nativeEvent;
    setSignaturePoints((points) => [...points, { x: locationX, y: locationY }]);
  }

  async function saveSale() {
    if (!receiverName.trim()) {
      setMessage("Escribe quién recibe antes de confirmar.");
      return;
    }
    if (signaturePoints.length < 2) {
      setMessage("Captura una firma para confirmar la entrega.");
      return;
    }

    const now = new Date().toISOString();
    const saleId = createId();
    const noteNumber = formatNoteNumber({
      routeCode: ROUTE_CODE,
      sequence: (Date.now() % 999999) + 1,
    });
    const totals = calculateSaleTotals([
      {
        productId: "product-demo-1",
        productName: "Garrafón 20 L",
        quantity,
        unitPriceCents: 3800,
      },
    ]);
    let gpsJson: string | null = null;

    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status === "granted") {
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        gpsJson = JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracyMeters: position.coords.accuracy,
          capturedAt: new Date(position.timestamp).toISOString(),
        });
      }
    } catch {
      setMessage(
        "Guardando sin GPS: la ubicación es evidencia adicional y no bloquea la entrega.",
      );
    }

    await database.withTransactionAsync(async () => {
      await database.runAsync(
        `INSERT INTO sales (id, business_id, note_number, route_id, driver_id, device_id, customer_id, occurred_at, total_cents, payment_method, status, sync_status, receiver_name, signature_data, gps_json, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'signed', 'pending', ?, ?, ?, ?, ?)`,
        saleId,
        BUSINESS_ID,
        noteNumber,
        ROUTE_CODE,
        "driver-demo",
        "device-demo",
        customerId,
        now,
        totals.totalCents,
        paymentMethod,
        receiverName.trim(),
        JSON.stringify(signaturePoints),
        gpsJson,
        now,
        now,
      );
      await database.runAsync(
        `INSERT INTO sale_items (sale_id, product_id, product_name, quantity, unit_price_cents, subtotal_cents) VALUES (?, ?, ?, ?, ?, ?)`,
        saleId,
        totals.items[0]!.productId,
        totals.items[0]!.productName,
        totals.items[0]!.quantity,
        totals.items[0]!.unitPriceCents,
        totals.items[0]!.subtotalCents,
      );
      await database.runAsync(
        `INSERT INTO outbox (id, entity, entity_id, operation, attempts, status, created_at, updated_at) VALUES (?, 'sale', ?, 'upsert', 0, 'pending', ?, ?)`,
        createId(),
        saleId,
        now,
        now,
      );
    });

    const saleForPrinting: Sale = {
      id: saleId,
      businessId: BUSINESS_ID,
      noteNumber,
      routeId: ROUTE_CODE,
      driverId: "driver-demo",
      deviceId: "device-demo",
      customerId,
      occurredAt: now,
      items: totals.items,
      subtotalCents: totals.subtotalCents,
      totalCents: totals.totalCents,
      paymentMethod,
      status: "signed",
      syncStatus: "pending",
      deliveryProof: {
        receiverName: receiverName.trim(),
        signatureData: JSON.stringify(signaturePoints),
        signedAt: now,
      },
      createdAt: now,
      updatedAt: now,
    };

    try {
      await mockPrinter.connect();
      await mockPrinter.printReceipt(saleForPrinting);
      setMessage(
        `${noteNumber} guardada localmente y enviada a impresión mock.`,
      );
    } catch {
      setMessage(
        `${noteNumber} guardada localmente; la impresión puede reintentarse.`,
      );
    }

    setSignaturePoints([]);
    setReceiverName("");
    await refreshSales();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.overline}>
              Garrafonería · Ruta {ROUTE_CODE}
            </Text>
            <Text style={styles.title}>Nueva entrega</Text>
          </View>
          <View style={styles.offlineBadge}>
            <Text style={styles.offlineText}>● OFFLINE</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>1 · Cliente</Text>
        <View style={styles.choiceRow}>
          <ChoiceButton
            label="Abarrotes La Esquina"
            active={customerId === "customer-demo-1"}
            onPress={() => setCustomerId("customer-demo-1")}
          />
          <ChoiceButton
            label="Tienda San Miguel"
            active={customerId === "customer-demo-2"}
            onPress={() => setCustomerId("customer-demo-2")}
          />
        </View>

        <Text style={styles.sectionLabel}>2 · Garrafones</Text>
        <View style={styles.productCard}>
          <View>
            <Text style={styles.productName}>Garrafón 20 L</Text>
            <Text style={styles.productPrice}>$38.00 cada uno</Text>
          </View>
          <View style={styles.quantityControl}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityText}>−</Text>
            </Pressable>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <Pressable
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityText}>＋</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${(total / 100).toFixed(2)}</Text>
        </View>

        <Text style={styles.sectionLabel}>3 · Forma de pago</Text>
        <View style={styles.choiceRow}>
          <ChoiceButton
            label="Efectivo"
            active={paymentMethod === "cash"}
            onPress={() => setPaymentMethod("cash")}
          />
          <ChoiceButton
            label="Transferencia"
            active={paymentMethod === "transfer"}
            onPress={() => setPaymentMethod("transfer")}
          />
          <ChoiceButton
            label="Crédito"
            active={paymentMethod === "credit"}
            onPress={() => setPaymentMethod("credit")}
          />
        </View>

        <Text style={styles.sectionLabel}>4 · Recibe y firma</Text>
        <TextInput
          value={receiverName}
          onChangeText={setReceiverName}
          placeholder="Nombre de quien recibe"
          placeholderTextColor="#82958a"
          style={styles.input}
        />
        <View
          style={styles.signatureBox}
          onTouchStart={addSignaturePoint}
          onTouchMove={addSignaturePoint}
        >
          <Text style={styles.signatureHint}>Firma del cliente</Text>
          <Svg style={StyleSheet.absoluteFill} viewBox="0 0 320 150">
            <Polyline
              points={signaturePoints
                .map((point) => `${point.x},${point.y}`)
                .join(" ")}
              fill="none"
              stroke="#17352a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <Pressable style={styles.saveButton} onPress={() => void saveSale()}>
          <Text style={styles.saveButtonText}>
            Confirmar, guardar e imprimir después
          </Text>
        </Pressable>
        <Text style={styles.message}>{message}</Text>

        <Text style={styles.sectionLabel}>Historial local</Text>
        {localSales.length === 0 ? (
          <Text style={styles.emptyText}>
            Todavía no hay entregas guardadas.
          </Text>
        ) : (
          localSales.map((sale) => (
            <View style={styles.historyRow} key={sale.id}>
              <View>
                <Text style={styles.historyTitle}>
                  {sale.note_number} · {sale.customer_name}
                </Text>
                <Text style={styles.historyMeta}>
                  {new Date(sale.created_at).toLocaleString()} ·{" "}
                  {sale.sync_status}
                </Text>
              </View>
              <Text style={styles.historyTotal}>
                ${(sale.total_cents / 100).toFixed(2)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function ChoiceButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.choiceButton, active && styles.choiceButtonActive]}
    >
      <Text style={[styles.choiceText, active && styles.choiceTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

interface SignaturePoint {
  x: number;
  y: number;
}

const styles = {
  safeArea: { flex: 1, backgroundColor: "#f4f7f2" },
  container: { padding: 22, paddingBottom: 42 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  overline: {
    color: "#71907d",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: { color: "#17352a", fontSize: 32, fontWeight: "800", marginTop: 6 },
  offlineBadge: {
    backgroundColor: "#e2f2e2",
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  offlineText: { color: "#39744b", fontSize: 11, fontWeight: "800" },
  sectionLabel: {
    color: "#4c6d58",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 18,
    textTransform: "uppercase",
  },
  choiceRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  choiceButton: {
    backgroundColor: "#fff",
    borderColor: "#dbe7dc",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  choiceButtonActive: { backgroundColor: "#dff1e2", borderColor: "#6caf79" },
  choiceText: { color: "#506858", fontSize: 13, fontWeight: "600" },
  choiceTextActive: { color: "#235a34" },
  productCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#e0e9e0",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 17,
  },
  productName: { color: "#193c2b", fontSize: 16, fontWeight: "700" },
  productPrice: { color: "#789080", fontSize: 13, marginTop: 5 },
  quantityControl: { alignItems: "center", flexDirection: "row", gap: 12 },
  quantityButton: {
    alignItems: "center",
    backgroundColor: "#e5f2e6",
    borderRadius: 9,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  quantityText: { color: "#317042", fontSize: 22 },
  quantityValue: { color: "#17352a", fontSize: 19, fontWeight: "800" },
  totalRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  totalLabel: { color: "#496552", fontSize: 17, fontWeight: "700" },
  totalValue: { color: "#17352a", fontSize: 29, fontWeight: "800" },
  input: {
    backgroundColor: "#fff",
    borderColor: "#dbe7dc",
    borderRadius: 10,
    borderWidth: 1,
    color: "#17352a",
    fontSize: 15,
    padding: 15,
  },
  signatureBox: {
    backgroundColor: "#fff",
    borderColor: "#b9cfbd",
    borderRadius: 12,
    borderStyle: "dashed",
    borderWidth: 1,
    height: 150,
    marginTop: 10,
    overflow: "hidden",
  },
  signatureHint: { color: "#9aac9e", fontSize: 12, padding: 12 },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#276447",
    borderRadius: 12,
    marginTop: 17,
    padding: 17,
  },
  saveButtonText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  message: {
    color: "#5f7867",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    textAlign: "center",
  },
  emptyText: { color: "#8a9a8c", fontSize: 13 },
  historyRow: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#e3ece3",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 13,
  },
  historyTitle: { color: "#2e4e39", fontSize: 13, fontWeight: "700" },
  historyMeta: { color: "#8a9a8c", fontSize: 11, marginTop: 4 },
  historyTotal: { color: "#2d6840", fontSize: 15, fontWeight: "800" },
} as const;
