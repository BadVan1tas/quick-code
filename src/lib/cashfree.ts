export interface CashfreeOrderOptions {
  orderId: string;
  orderAmount: number;
  orderCurrency?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

export async function createCashfreeOrder(options: CashfreeOrderOptions) {
  // In production, this calls Cashfree REST API v3: POST /pg/orders
  const paymentSessionId = `session_cf_${options.orderId}_${Math.random().toString(36).slice(2, 8)}`;
  
  return {
    orderId: options.orderId,
    paymentSessionId,
    orderAmount: options.orderAmount,
    currency: options.orderCurrency || "INR",
    environment: process.env.NEXT_PUBLIC_CASHFREE_ENV || "sandbox",
  };
}

export function loadCashfreeSDK(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Cashfree) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
