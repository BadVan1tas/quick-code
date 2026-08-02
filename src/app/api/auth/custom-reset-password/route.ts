import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
    const origin = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
    const redirectUrl = `${origin}/login`;

    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY;
    let resetLink = redirectUrl;

    // 1. Generate Firebase Password Reset Link via Firebase Auth REST API
    try {
      if (apiKey) {
        const fbRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
            continueUrl: redirectUrl,
          }),
        });

        if (fbRes.ok) {
          const fbData = await fbRes.json();
          if (fbData.oobLink) {
            resetLink = fbData.oobLink;
          }
        } else {
          const errData = await fbRes.json();
          const msg = errData?.error?.message || "";
          if (msg.includes("EMAIL_NOT_FOUND")) {
            return NextResponse.json({ error: "No account found with this email address." }, { status: 404 });
          }
          return NextResponse.json({ error: errData?.error?.message || "Failed to generate password reset link." }, { status: 400 });
        }
      }
    } catch (fbErr) {
      console.warn("Firebase REST OOB Code generation warning:", fbErr);
    }

    // 2. Transporter configuration (SMTP or Nodemailer Ethereal fallback)
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const isRealSmtp = smtpUser && smtpPass && smtpUser !== "your_email@gmail.com" && !smtpUser.includes("your_email");

    let transporter;

    if (isRealSmtp) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    } else {
      // Ethereal Test Account Fallback for Local Development
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // 3. Branded QuikCode HTML Email Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #05070d; color: #ffffff; margin: 0; padding: 40px 20px; }
          .card { max-width: 520px; margin: 0 auto; background: #0b1123; border: 1px solid rgba(99,102,241,0.3); border-radius: 20px; padding: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
          .logo { font-size: 24px; font-weight: 800; color: #6366f1; letter-spacing: -0.03em; margin-bottom: 24px; display: inline-block; }
          .title { font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
          .text { font-size: 15px; color: #8b9ec7; line-height: 1.6; margin-bottom: 28px; }
          .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #ffffff !important; text-decoration: none; font-weight: 700; border-radius: 12px; font-size: 15px; box-shadow: 0 8px 24px rgba(99,102,241,0.4); }
          .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #4b5680; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="logo">⚡ QuikCode</div>
          <div class="title">Reset Your Password</div>
          <p class="text">
            We received a request to reset your password for your <strong>QuikCode</strong> account (<code>${email}</code>).
            Click the button below to set a new password.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetLink}" class="btn">Reset Password →</a>
          </div>
          <p class="text" style="font-size: 13px;">
            If you did not request a password reset, you can safely ignore this email.
          </p>
          <div class="footer">
            © ${new Date().getFullYear()} QuikCode Agency. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"QuikCode Team" <${smtpUser || "noreply@quik-code.com"}>`,
      to: email,
      subject: "Reset your password for QuikCode",
      html: htmlContent,
    });

    console.log("Custom Password Reset Email sent:", info.messageId);

    return NextResponse.json({
      success: true,
      message: `📧 Custom Password Reset Email dispatched for ${email}!`,
    });
  } catch (err: any) {
    console.error("Custom Email Sender Error:", err);
    return NextResponse.json({ error: err?.message || "Failed to send reset email." }, { status: 500 });
  }
}
