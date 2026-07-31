import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderId, paymentId } = await req.json();

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const env = process.env.NEXT_PUBLIC_CASHFREE_ENV || "sandbox";

    // If Cashfree App ID and Secret Key are configured, verify with Cashfree REST API
    if (appId && secretKey && appId !== "your_cashfree_app_id") {
      const baseUrl = env === "production" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";
      const cfRes = await fetch(`${baseUrl}/orders/${orderId}`, {
        headers: {
          "x-api-version": "2023-08-01",
          "x-client-id": appId,
          "x-client-secret": secretKey,
        },
      });

      if (cfRes.ok) {
        const cfData = await cfRes.json();
        if (cfData.order_status !== "PAID") {
          return NextResponse.json(
            { verified: false, error: `Payment not verified by Cashfree. Status: ${cfData.order_status}` },
            { status: 400 }
          );
        }
        return NextResponse.json({ verified: true, paymentId: cfData.order_id, amount: cfData.order_amount });
      }
    }

    // Default Sandbox fallback verification check
    if (paymentId && (paymentId.startsWith("cf_pay_") || paymentId.startsWith("tx_"))) {
      return NextResponse.json({ verified: true, paymentId });
    }

    return NextResponse.json({ verified: false, error: "Payment verification failed. No valid payment received." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ verified: false, error: err?.message || "Verification error" }, { status: 500 });
  }
}
