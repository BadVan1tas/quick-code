// Helper function for Automated WhatsApp & SMS Notifications
export async function sendOrderNotification({
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  status,
  serviceName,
}: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  status: string;
  serviceName: string;
}) {
  try {
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const interaktApiKey = process.env.INTERAKT_API_KEY;

    const messageText = `⚡ QuickCode Update: Hi ${customerName}, your order #${orderId.slice(-6)} for "${serviceName}" status has been updated to "${status}". Check progress at: ${process.env.NEXT_PUBLIC_APP_URL || "https://quickcode.com"}/profile`;

    // 1. Twilio SMS / WhatsApp API Integration
    if (twilioSid && twilioAuthToken && customerPhone) {
      try {
        const authHeader = "Basic " + Buffer.from(`${twilioSid}:${twilioAuthToken}`).toString("base64");
        await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: "POST",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            From: twilioPhone || "+12015550123",
            To: customerPhone,
            Body: messageText,
          }),
        });
        console.log(`WhatsApp/SMS Notification dispatched via Twilio to ${customerPhone}`);
      } catch (tErr) {
        console.warn("Twilio SMS dispatch warning:", tErr);
      }
    }

    // 2. Interakt WhatsApp Business API Integration
    if (interaktApiKey && customerPhone) {
      try {
        await fetch("https://api.interakt.ai/v1/public/message/", {
          method: "POST",
          headers: {
            Authorization: `Basic ${interaktApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: customerPhone,
            type: "Template",
            template: {
              name: "order_status_update",
              languageCode: "en",
              headerValues: [orderId.slice(-6)],
              bodyValues: [customerName, serviceName, status],
            },
          }),
        });
        console.log(`WhatsApp Notification dispatched via Interakt to ${customerPhone}`);
      } catch (iErr) {
        console.warn("Interakt WhatsApp dispatch warning:", iErr);
      }
    }

    return true;
  } catch (err) {
    console.error("Order notification error:", err);
    return false;
  }
}
