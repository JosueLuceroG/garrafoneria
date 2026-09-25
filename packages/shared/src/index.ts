import type { BusinessId, Sale, SyncOperation } from "@garrafoneria/domain";

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export interface SaleSyncPayload {
  businessId: BusinessId;
  sale: Sale;
  operationId: SyncOperation["id"];
}

export function getPublicSupabaseConfig(
  env: Record<string, string | undefined>,
): SupabaseConfig | null {
  const url = env.VITE_SUPABASE_URL ?? env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey =
    env.VITE_SUPABASE_ANON_KEY ?? env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  return url && anonKey ? { url, anonKey } : null;
}
