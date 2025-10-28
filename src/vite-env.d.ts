/// <reference types="vite/client" />

interface Window {
  firePurchaseEvent?: (email: string) => Promise<void>;
  logPurchaseToSupabase?: (email: string) => Promise<boolean>;
}
