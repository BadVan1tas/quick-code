"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders, addOrderMessage, subscribeToOrderMessages, OrderData, OrderMessage } from "@/lib/db";
import {
  User,
  ShoppingBag,
  ShieldCheck,
  LogOut,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Lock,
  KeyRound,
} from "lucide-react";

export default function ProfilePage() {
  const { user, logout, loading, isAdmin, changeUserPassword, resetPasswordEmail } = useAuth();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeChatOrder, setActiveChatOrder] = useState<OrderData | null>(null);
  const [messages, setMessages] = useState<OrderMessage[]>([]);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Password update states
  const [newPassword, setNewPassword] = useState("");
  const [passStatus, setPassStatus] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });
  const [updatingPass, setUpdatingPass] = useState(false);
  const [resetSending, setResetSending] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPassStatus({ type: "error", msg: "Password must be at least 6 characters long." });
      return;
    }
    setUpdatingPass(true);
    setPassStatus({ type: null, msg: "" });
    try {
      await changeUserPassword(newPassword);
      setPassStatus({ type: "success", msg: "✅ Password successfully updated!" });
      setNewPassword("");
    } catch (err: any) {
      if (err?.code === "auth/requires-recent-login") {
        setPassStatus({ type: "error", msg: "⚠️ Security rule: Please sign out and sign in again before updating your password." });
      } else {
        setPassStatus({ type: "error", msg: err?.message || "Failed to update password." });
      }
    } finally {
      setUpdatingPass(false);
    }
  };

  const handleSendResetEmail = async () => {
    if (!user?.email) return;
    setResetSending(true);
    setPassStatus({ type: null, msg: "" });
    try {
      await resetPasswordEmail(user.email);
      setPassStatus({ type: "success", msg: `📧 Password reset email sent to ${user.email}!` });
    } catch (err: any) {
      setPassStatus({ type: "error", msg: err?.message || "Failed to send reset email." });
    } finally {
      setResetSending(false);
    }
  };

  useEffect(() => {
    async function fetchOrders() {
      if (user?.email) {
        setLoadingOrders(true);
        const data = await getUserOrders(user.email);
        setOrders(data as OrderData[]);
        setLoadingOrders(false);
      } else {
        setLoadingOrders(false);
      }
    }
    fetchOrders();
  }, [user]);

  // Subscribe to order messages for activeChatOrder
  useEffect(() => {
    if (!activeChatOrder?.id) {
      setMessages([]);
      return;
    }
    const unsubscribe = subscribeToOrderMessages(activeChatOrder.id, (msgs) => {
      setMessages(msgs);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
    return () => unsubscribe();
  }, [activeChatOrder?.id]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeChatOrder?.id || !user?.email) return;
    setSending(true);

    await addOrderMessage(
      activeChatOrder.id,
      user.email,
      user.displayName || user.email.split("@")[0],
      replyText.trim(),
      false
    );

    setReplyText("");
    setSending(false);
  };

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#05070d" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
          Loading profile data...
        </div>
        <Footer />
      </main>
    );
  }

  if (!user) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#05070d" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <User size={28} color="#818cf8" />
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: 12 }}>
            Access Your Account Profile
          </h1>
          <p style={{ color: "var(--text-muted)", maxWidth: 420, marginBottom: 28 }}>
            Please sign in to view your account details, purchase history, and active QuikCode project orders.
          </p>
          <Link href="/login" className="btn-primary" style={{ padding: "12px 32px" }}>
            Sign In with Firebase →
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#05070d" }}>
      <Navbar />

      <section style={{ flex: 1, maxWidth: 1100, margin: "0 auto", width: "100%", padding: "48px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 9999, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", fontSize: "0.75rem", color: "#6ee7b7", fontFamily: "var(--font-mono)", marginBottom: 12 }}>
              <span className="dot-live" /> FIREBASE AUTHENTICATED
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}>
              My Account <span className="text-gradient">& Purchases</span>
            </h1>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {isAdmin && (
              <Link
                href="/admin"
                style={{
                  padding: "10px 18px",
                  borderRadius: "var(--r-sm)",
                  background: "rgba(99,102,241,0.2)",
                  border: "1px solid rgba(99,102,241,0.4)",
                  color: "#a5b4fc",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <ShieldCheck size={16} /> Admin Portal →
              </Link>
            )}

            <Link href="/book" className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.88rem" }}>
              + Book New Project
            </Link>

            <button
              onClick={logout}
              style={{
                padding: "10px 18px",
                borderRadius: "var(--r-sm)",
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#fca5a5",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32 }} className="profile-grid">
          {/* Left Column: User Profile Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                padding: 32,
                borderRadius: "var(--r-lg)",
                background: "rgba(11, 17, 35, 0.7)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Profile Avatar */}
              <div
                style={{
                  position: "relative",
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #ec4899)",
                  padding: 3,
                  marginBottom: 16,
                  boxShadow: "0 0 24px rgba(99,102,241,0.4)",
                }}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User Avatar" width={82} height={82} style={{ borderRadius: "50%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#080c17", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
                    {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 4 }}>
                {user.displayName || "QuikCode Client"}
              </h2>

              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
                <Mail size={14} color="#6366f1" /> {user.email}
              </p>

              <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />

              {/* Account Meta */}
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, textAlign: "left", fontSize: "0.83rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-dim)" }}>Firebase User ID:</span>
                  <span style={{ color: "var(--text-main)", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
                    {user.uid.slice(0, 10)}...
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-dim)" }}>Role:</span>
                  <span style={{ color: isAdmin ? "#a5b4fc" : "#6ee7b7", fontWeight: 600 }}>
                    {isAdmin ? "Admin User" : "Client User"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-dim)" }}>Status:</span>
                  <span style={{ color: "#818cf8", fontWeight: 600 }}>Verified & Active</span>
                </div>
              </div>
            </div>

            {/* Security & Password Settings Card */}
            <div
              style={{
                padding: 24,
                borderRadius: "var(--r-md)",
                background: "rgba(11, 17, 35, 0.7)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "var(--font-heading)" }}>
                <Lock size={18} color="#6366f1" /> Account Password Security
              </div>

              {passStatus.type && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: passStatus.type === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                    border: `1px solid ${passStatus.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                    color: passStatus.type === "success" ? "#6ee7b7" : "#fca5a5",
                    fontSize: "0.82rem",
                    whiteSpace: "pre-line",
                  }}
                >
                  {passStatus.msg}
                </div>
              )}

              <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>
                    Update New Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="password"
                      placeholder="Enter new password (min. 6 chars)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px 10px 36px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#fff",
                        fontSize: "0.85rem",
                        outline: "none",
                      }}
                    />
                    <KeyRound size={16} color="var(--text-dim)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={updatingPass || !newPassword}
                  className="btn-primary"
                  style={{ width: "100%", padding: "10px", fontSize: "0.85rem", justifyContent: "center" }}
                >
                  {updatingPass ? "Updating Password..." : "Update Password →"}
                </button>
              </form>

              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>OR</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              </div>

              <button
                type="button"
                onClick={handleSendResetEmail}
                disabled={resetSending}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#a5b4fc",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Mail size={15} /> {resetSending ? "Sending Email..." : "Send Reset Link to Email"}
              </button>
            </div>

            {/* Quick Stats Card */}
            <div
              style={{
                padding: 24,
                borderRadius: "var(--r-md)",
                background: "rgba(11, 17, 35, 0.5)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 4 }}>Total Orders</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-heading)" }}>
                  {orders.length}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 4 }}>Security</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                  <ShieldCheck size={16} /> Verified
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Purchases & Project Messages */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                padding: 32,
                borderRadius: "var(--r-lg)",
                background: "rgba(11, 17, 35, 0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <ShoppingBag size={20} color="#6366f1" />
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
                    My Project Orders & Updates
                  </h3>
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                  {orders.length} RECORD{orders.length !== 1 ? "S" : ""}
                </span>
              </div>

              {loadingOrders ? (
                <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted)" }}>
                  Fetching orders from Firestore...
                </div>
              ) : orders.length === 0 ? (
                <div style={{ padding: "48px 24px", textAlign: "center", background: "rgba(255,255,255,0.02)", borderRadius: "var(--r-md)", border: "1px dashed rgba(255,255,255,0.1)" }}>
                  <ShoppingBag size={36} color="var(--text-dim)" style={{ marginBottom: 12, opacity: 0.6 }} />
                  <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 6 }}>No Purchases Yet</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 20 }}>
                    You haven&apos;t placed any project bookings yet. Start your first custom project with us!
                  </p>
                  <Link href="/book" className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.88rem" }}>
                    Browse Pricing & Book →
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {orders.map((ord, idx) => (
                    <div
                      key={ord.id || idx}
                      style={{
                        padding: 20,
                        borderRadius: "var(--r-md)",
                        background: activeChatOrder?.id === ord.id ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${activeChatOrder?.id === ord.id ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-main)" }}>
                              {ord.service}
                            </span>
                            <span
                              style={{
                                padding: "2px 8px",
                                borderRadius: 9999,
                                background:
                                  ord.status === "COMPLETED"
                                    ? "rgba(16,185,129,0.2)"
                                    : ord.status === "IN_PROGRESS"
                                    ? "rgba(6,182,212,0.2)"
                                    : "rgba(99,102,241,0.2)",
                                border: `1px solid ${
                                  ord.status === "COMPLETED"
                                    ? "rgba(16,185,129,0.4)"
                                    : ord.status === "IN_PROGRESS"
                                    ? "rgba(6,182,212,0.4)"
                                    : "rgba(99,102,241,0.4)"
                                }`,
                                color:
                                  ord.status === "COMPLETED"
                                    ? "#6ee7b7"
                                    : ord.status === "IN_PROGRESS"
                                    ? "#06b6d4"
                                    : "#a5b4fc",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              {ord.status || "PAID"}
                            </span>
                          </div>

                          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", gap: 16, flexWrap: "wrap" }}>
                            <span>Gateway: <strong style={{ color: "#a5b4fc" }}>{ord.gateway ? ord.gateway.toUpperCase() : "UPI_QR"}</strong></span>
                            <span>Txn ID: <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-main)" }}>{ord.paymentId}</span></span>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#6366f1", fontFamily: "var(--font-heading)" }}>
                              {ord.gateway === "upi_qr" ? `₹${(ord.amount || 150) * 83}` : `$${ord.amount || 150}.00`}
                            </div>
                          </div>

                          <button
                            onClick={() => setActiveChatOrder(activeChatOrder?.id === ord.id ? null : ord)}
                            style={{
                              padding: "8px 14px",
                              borderRadius: "8px",
                              background: activeChatOrder?.id === ord.id ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(99,102,241,0.3)",
                              color: "#fff",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <MessageSquare size={14} color="#818cf8" />
                            {activeChatOrder?.id === ord.id ? "Hide Updates" : "Messages & Admin Notes"}
                          </button>
                        </div>
                      </div>

                      {/* Admin Note display */}
                      {ord.adminNote && (
                        <div style={{ padding: 12, borderRadius: "10px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", fontSize: "0.83rem", color: "#c7d2fe" }}>
                          📌 <strong>Admin Update Note:</strong> {ord.adminNote}
                        </div>
                      )}

                      {/* Interactive Chat Box for Client */}
                      {activeChatOrder?.id === ord.id && (
                        <div style={{ marginTop: 8, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 12 }}>
                          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
                            <Sparkles size={14} color="#6366f1" /> Project Communication Thread
                          </div>

                          <div
                            style={{
                              maxHeight: 200,
                              overflowY: "auto",
                              padding: 12,
                              borderRadius: "10px",
                              background: "#05070d",
                              border: "1px solid rgba(255,255,255,0.06)",
                              display: "flex",
                              flexDirection: "column",
                              gap: 10,
                            }}
                          >
                            {messages.length === 0 ? (
                              <div style={{ textAlign: "center", color: "var(--text-dim)", fontSize: "0.8rem", padding: "16px 0" }}>
                                No project messages yet. Leave a note or question for the QuikCode Admin below!
                              </div>
                            ) : (
                              messages.map((msg, mIdx) => (
                                <div
                                  key={msg.id || mIdx}
                                  style={{
                                    alignSelf: msg.isAdmin ? "flex-start" : "flex-end",
                                    maxWidth: "85%",
                                    padding: "8px 12px",
                                    borderRadius: msg.isAdmin ? "12px 12px 12px 2px" : "12px 12px 2px 12px",
                                    background: msg.isAdmin ? "rgba(99,102,241,0.2)" : "linear-gradient(135deg, #10b981, #059669)",
                                    color: "#fff",
                                    fontSize: "0.83rem",
                                  }}
                                >
                                  <div style={{ fontSize: "0.68rem", color: msg.isAdmin ? "#a5b4fc" : "#a7f3d0", marginBottom: 2, fontWeight: 600 }}>
                                    {msg.isAdmin ? "QuikCode Admin Support" : "You"}
                                  </div>
                                  <div>{msg.text}</div>
                                </div>
                              ))
                            )}
                            <div ref={messagesEndRef} />
                          </div>

                          <form onSubmit={handleSendReply} style={{ display: "flex", gap: 8 }}>
                            <input
                              type="text"
                              placeholder="Reply to QuikCode team..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              style={{
                                flex: 1,
                                padding: "10px 14px",
                                borderRadius: "10px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "#fff",
                                fontSize: "0.85rem",
                                outline: "none",
                              }}
                            />
                            <button
                              type="submit"
                              disabled={sending || !replyText.trim()}
                              className="btn-primary"
                              style={{ padding: "10px 16px" }}
                            >
                              <Send size={15} />
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 868px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
