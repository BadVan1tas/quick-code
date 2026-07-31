"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth, formatFirebaseAuthError } from "@/context/AuthContext";
import {
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUserRole,
  addOrderMessage,
  subscribeToOrderMessages,
  OrderData,
  OrderMessage,
  UserProfile,
} from "@/lib/db";
import {
  ShieldCheck,
  ShoppingBag,
  DollarSign,
  Users,
  RefreshCw,
  Send,
  Clock,
  MessageSquare,
  Lock,
  Mail,
  KeyRound,
  Search,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user, loading, isAdmin, signInWithEmail, signUpWithEmail, resetPasswordEmail, signInWithGoogle, logout } = useAuth();

  // Admin Login Form State
  const [adminAuthMode, setAdminAuthMode] = useState<"signin" | "create" | "reset">("signin");
  const [adminEmailInput, setAdminEmailInput] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Active Admin View Tab: 'orders' | 'users'
  const [activeTab, setActiveTab] = useState<"orders" | "users">("orders");

  // Orders State
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [newStatus, setNewStatus] = useState<string>("IN_PROGRESS");
  const [adminNote, setAdminNote] = useState<string>("");
  const [updating, setUpdating] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Messaging State
  const [messages, setMessages] = useState<OrderMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Users State
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState("");

  const fetchOrdersData = async () => {
    setLoadingOrders(true);
    const data = await getAllOrders();
    setOrders(data as OrderData[]);
    setLoadingOrders(false);
  };

  const fetchUsersData = async () => {
    setLoadingUsers(true);
    const data = await getAllUsers();
    setUsersList(data);
    setLoadingUsers(false);
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchOrdersData();
      fetchUsersData();
    }
  }, [user, isAdmin]);

  // Subscribe to messages when selectedOrder changes
  useEffect(() => {
    if (!selectedOrder?.id) {
      setMessages([]);
      return;
    }
    const unsubscribe = subscribeToOrderMessages(selectedOrder.id, (msgs) => {
      setMessages(msgs);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
    return () => unsubscribe();
  }, [selectedOrder?.id]);

  // Handle Admin Auth Submission (Sign In / Register / Reset Password)
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");
    setAuthLoading(true);

    try {
      if (adminAuthMode === "signin") {
        await signInWithEmail(adminEmailInput, adminPasswordInput);
      } else if (adminAuthMode === "create") {
        await signUpWithEmail(adminEmailInput, adminPasswordInput);
        setAuthSuccess("✅ Admin account successfully created!");
      } else if (adminAuthMode === "reset") {
        await resetPasswordEmail(adminEmailInput);
        setAuthSuccess(`📧 Password reset email sent to ${adminEmailInput}! Please check your inbox.`);
      }
    } catch (err: any) {
      const errCode = err?.code || "";
      if (adminAuthMode === "signin" && (errCode.includes("user-not-found") || errCode.includes("invalid-credential"))) {
        setAuthError("Account not found or password incorrect. If this is a new Admin account, click 'Register Admin Account' tab above!");
      } else {
        setAuthError(formatFirebaseAuthError(err));
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Google Admin Login
  const handleGoogleAdminLogin = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setAuthError(err.message || "Google sign-in error.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Order Status Update
  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder?.id) return;
    setUpdating(true);
    const success = await updateOrderStatus(selectedOrder.id, newStatus, adminNote);
    if (success) {
      await fetchOrdersData();
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus as any, adminNote } : null));
    }
    setUpdating(false);
  };

  // Handle Send Message to Client
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !selectedOrder?.id) return;
    setSendingMsg(true);

    const senderEmail = user?.email || "admin@quickcode.com";
    const senderName = user?.displayName || "QuickCode Support Team";

    await addOrderMessage(selectedOrder.id, senderEmail, senderName, newMessageText.trim(), true);
    setNewMessageText("");
    setSendingMsg(false);
  };

  // Handle Role Toggle
  const handleToggleUserRole = async (targetUid: string, currentRole?: string) => {
    const nextRole = currentRole === "admin" ? "client" : "admin";
    await updateUserRole(targetUid, nextRole);
    await fetchUsersData();
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      o.service?.toLowerCase().includes(search.toLowerCase()) ||
      o.paymentId?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filtered Users
  const filteredUsers = usersList.filter(
    (u) =>
      u.displayName?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Financial Stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const activeOrders = orders.filter((o) => o.status === "IN_PROGRESS" || o.status === "PAID").length;

  // Render Loading State
  if (loading) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#05070d" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(99,102,241,0.2)", borderTopColor: "#6366f1", animation: "spin 1s linear infinite" }} />
            <span>Verifying Admin Authorization...</span>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // RENDER ADMIN AUTHENTICATION GATE (If not logged in or not authorized admin)
  if (!user || !isAdmin) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#05070d" }}>
        <Navbar />

        <section style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
          <div
            style={{
              width: "100%",
              maxWidth: 480,
              padding: 40,
              borderRadius: "24px",
              background: "rgba(11, 17, 35, 0.8)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(99, 102, 241, 0.15)",
                  border: "1px solid rgba(99, 102, 241, 0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  color: "#6366f1",
                }}
              >
                <Lock size={30} />
              </div>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "#fff", marginBottom: 8 }}>
                Admin Portal Login
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5 }}>
                Restricted Access. Authenticate with your Admin credentials to access QuickCode Master Dashboard.
              </p>
            </div>

            {/* Admin Auth Mode Selector Tabs */}
            <div style={{ display: "flex", gap: 6, marginBottom: 24, padding: 4, borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                type="button"
                onClick={() => { setAdminAuthMode("signin"); setAuthError(""); setAuthSuccess(""); }}
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: adminAuthMode === "signin" ? "rgba(99,102,241,0.25)" : "transparent",
                  border: `1px solid ${adminAuthMode === "signin" ? "#6366f1" : "transparent"}`,
                  color: adminAuthMode === "signin" ? "#fff" : "var(--text-muted)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => { setAdminAuthMode("create"); setAuthError(""); setAuthSuccess(""); }}
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: adminAuthMode === "create" ? "rgba(99,102,241,0.25)" : "transparent",
                  border: `1px solid ${adminAuthMode === "create" ? "#6366f1" : "transparent"}`,
                  color: adminAuthMode === "create" ? "#fff" : "var(--text-muted)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Create Account
              </button>

              <button
                type="button"
                onClick={() => { setAdminAuthMode("reset"); setAuthError(""); setAuthSuccess(""); }}
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: adminAuthMode === "reset" ? "rgba(99,102,241,0.25)" : "transparent",
                  border: `1px solid ${adminAuthMode === "reset" ? "#6366f1" : "transparent"}`,
                  color: adminAuthMode === "reset" ? "#fff" : "var(--text-muted)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Reset Password
              </button>
            </div>

            {user && !isAdmin && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#fca5a5",
                  fontSize: "0.85rem",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                ⚠️ Current account (<strong>{user.email}</strong>) does not have Admin authorization. Please log in with an Admin account.
              </div>
            )}

            {authError && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#fca5a5",
                  fontSize: "0.85rem",
                  marginBottom: 20,
                  whiteSpace: "pre-line",
                }}
              >
                {authError}
              </div>
            )}

            {authSuccess && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  color: "#6ee7b7",
                  fontSize: "0.85rem",
                  marginBottom: 20,
                  whiteSpace: "pre-line",
                }}
              >
                {authSuccess}
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)" }}>
                  Admin Email
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    required
                    placeholder="admin@quickcode.com"
                    value={adminEmailInput}
                    onChange={(e) => setAdminEmailInput(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px 14px 44px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                      fontSize: "0.92rem",
                      outline: "none",
                    }}
                  />
                  <Mail size={18} color="var(--text-dim)" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>

              {adminAuthMode !== "reset" && (
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)" }}>
                    Admin Password {adminAuthMode === "create" && "(Set new password)"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "14px 16px 14px 44px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#fff",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                    <KeyRound size={18} color="var(--text-dim)" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary"
                style={{ width: "100%", padding: "14px", marginTop: 8, fontSize: "0.95rem", justifyContent: "center" }}
              >
                {authLoading
                  ? "Processing..."
                  : adminAuthMode === "signin"
                  ? "Unlock Admin Dashboard →"
                  : adminAuthMode === "create"
                  ? "Register Admin Account →"
                  : "Send Password Reset Email →"}
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", margin: "24px 0", gap: 12 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", textTransform: "uppercase" }}>Or</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
            </div>

            <button
              onClick={handleGoogleAdminLogin}
              disabled={authLoading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              Sign In with Authorized Google Account
            </button>

            <div style={{ marginTop: 24, textAlign: "center", fontSize: "0.78rem", color: "var(--text-dim)" }}>
              Default Admin Email: <code style={{ color: "#a5b4fc" }}>admin@quickcode.com</code>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // RENDER AUTHORIZED ADMIN CONTROL PANEL
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#05070d" }}>
      <Navbar />

      <section style={{ flex: 1, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "40px 24px" }}>
        {/* Header Bar */}
        <div style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 9999, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", fontSize: "0.75rem", color: "#a5b4fc", fontFamily: "var(--font-mono)", marginBottom: 10 }}>
              <ShieldCheck size={14} color="#6366f1" /> AUTHORIZED ADMIN MASTER CONTROL PANEL
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}>
              QuickCode <span className="text-gradient">Admin Dashboard</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: 4 }}>
              Logged in as <strong style={{ color: "#fff" }}>{user.email}</strong> · Real-time Firestore Sync Active
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={() => {
                fetchOrdersData();
                fetchUsersData();
              }}
              style={{
                padding: "10px 18px",
                borderRadius: "var(--r-sm)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f1f5f9",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <RefreshCw size={16} /> Refresh
            </button>

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
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Analytics Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18, marginBottom: 32 }}>
          <div style={{ padding: 20, borderRadius: "16px", background: "rgba(11, 17, 35, 0.7)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#818cf8", fontSize: "0.75rem", fontFamily: "var(--font-mono)", marginBottom: 6 }}>
              <DollarSign size={16} /> TOTAL REVENUE
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "#fff" }}>
              ${totalRevenue}.00 <span style={{ fontSize: "0.75rem", color: "#6ee7b7" }}>(₹{totalRevenue * 83})</span>
            </div>
          </div>

          <div style={{ padding: 20, borderRadius: "16px", background: "rgba(11, 17, 35, 0.7)", border: "1px solid rgba(16,185,129,0.25)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6ee7b7", fontSize: "0.75rem", fontFamily: "var(--font-mono)", marginBottom: 6 }}>
              <ShoppingBag size={16} /> TOTAL ORDERS
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "#fff" }}>
              {orders.length} Orders
            </div>
          </div>

          <div style={{ padding: 20, borderRadius: "16px", background: "rgba(11, 17, 35, 0.7)", border: "1px solid rgba(6,182,212,0.25)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#06b6d4", fontSize: "0.75rem", fontFamily: "var(--font-mono)", marginBottom: 6 }}>
              <Clock size={16} /> ACTIVE PROJECTS
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "#fff" }}>
              {activeOrders} In Progress
            </div>
          </div>

          <div style={{ padding: 20, borderRadius: "16px", background: "rgba(11, 17, 35, 0.7)", border: "1px solid rgba(236,72,153,0.25)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#f472b6", fontSize: "0.75rem", fontFamily: "var(--font-mono)", marginBottom: 6 }}>
              <Users size={16} /> REGISTERED USERS
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "#fff" }}>
              {usersList.length} Clients
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
          <button
            onClick={() => setActiveTab("orders")}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              background: activeTab === "orders" ? "rgba(99,102,241,0.2)" : "transparent",
              border: `1px solid ${activeTab === "orders" ? "#6366f1" : "transparent"}`,
              color: activeTab === "orders" ? "#fff" : "var(--text-muted)",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ShoppingBag size={16} /> Orders & Client Messaging ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab("users")}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              background: activeTab === "users" ? "rgba(99,102,241,0.2)" : "transparent",
              border: `1px solid ${activeTab === "users" ? "#6366f1" : "transparent"}`,
              color: activeTab === "users" ? "#fff" : "var(--text-muted)",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Users size={16} /> User Management ({usersList.length})
          </button>
        </div>

        {/* TAB 1: ORDERS & MESSAGING PANEL */}
        {activeTab === "orders" && (
          <div>
            {/* Filter & Search Bar */}
            <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 260, position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search orders by client name, email, service, or Txn ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 42px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    outline: "none",
                    fontSize: "0.9rem",
                  }}
                />
                <Search size={18} color="var(--text-dim)" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Status:</span>
                {["ALL", "PAID", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      background: statusFilter === st ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${statusFilter === st ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                      color: statusFilter === st ? "#fff" : "var(--text-muted)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Grid Layout */}
            <div style={{ display: "grid", gridTemplateColumns: selectedOrder ? "1fr 1fr" : "1fr", gap: 24 }}>
              {/* Order List */}
              <div
                style={{
                  padding: 24,
                  borderRadius: "20px",
                  background: "rgba(11, 17, 35, 0.7)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 16 }}>
                  Client Orders ({filteredOrders.length})
                </h3>

                {loadingOrders ? (
                  <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted)" }}>
                    Loading Firestore orders...
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                    No client orders found. Place an order on the <Link href="/book" style={{ color: "#6366f1" }}>Booking Page</Link>.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {filteredOrders.map((ord) => (
                      <div
                        key={ord.id}
                        onClick={() => {
                          setSelectedOrder(ord);
                          setNewStatus(ord.status || "IN_PROGRESS");
                          setAdminNote(ord.adminNote || "");
                        }}
                        style={{
                          padding: 18,
                          borderRadius: "14px",
                          background: selectedOrder?.id === ord.id ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.02)",
                          border: `1px solid ${selectedOrder?.id === ord.id ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 16,
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                            <strong style={{ fontSize: "0.95rem", color: "#fff" }}>{ord.customerName}</strong>
                            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{ord.customerEmail}</span>
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "#a5b4fc", fontWeight: 600 }}>{ord.service}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)", marginTop: 4 }}>
                            Txn: {ord.paymentId} · {ord.gateway?.toUpperCase()}
                          </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#6ee7b7", fontFamily: "var(--font-heading)" }}>
                            ${ord.amount || 150}
                          </div>
                          <span
                            style={{
                              display: "inline-block",
                              marginTop: 4,
                              padding: "2px 8px",
                              borderRadius: 9999,
                              background:
                                ord.status === "COMPLETED"
                                  ? "rgba(16,185,129,0.2)"
                                  : ord.status === "IN_PROGRESS"
                                  ? "rgba(6,182,212,0.2)"
                                  : "rgba(99,102,241,0.2)",
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
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Inspector & Live Chat Drawer */}
              {selectedOrder && (
                <div
                  style={{
                    padding: 24,
                    borderRadius: "20px",
                    background: "rgba(11, 17, 35, 0.9)",
                    border: "1px solid rgba(99,102,241,0.4)",
                    boxShadow: "0 16px 40px rgba(99,102,241,0.15)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#fff" }}>
                      Order & Live Message Portal
                    </h3>
                    <button onClick={() => setSelectedOrder(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.2rem" }}>
                      ✕
                    </button>
                  </div>

                  {/* Client Details Summary & UTR Verification Box */}
                  <div style={{ padding: 16, borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    <div>Client: <strong style={{ color: "#fff" }}>{selectedOrder.customerName}</strong> ({selectedOrder.customerEmail})</div>
                    <div>Service: <strong style={{ color: "#a5b4fc" }}>{selectedOrder.service}</strong></div>
                    <div>Budget & Timeline: <strong style={{ color: "#fff" }}>{selectedOrder.budget} ({selectedOrder.timeline})</strong></div>
                    <div>Submitted UTR / Txn ID: <strong style={{ color: "#fbbf24", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>{selectedOrder.paymentId || "N/A"}</strong> ({selectedOrder.gateway?.toUpperCase() || "UPI_QR"})</div>
                    {selectedOrder.details && (
                      <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "0.8rem" }}>
                        <em>"{selectedOrder.details}"</em>
                      </div>
                    )}
                  </div>

                  {/* High Priority UTR Approval / Rejection Action Panel */}
                  {selectedOrder.status === "VERIFICATION_PENDING" && (
                    <div
                      style={{
                        padding: "16px 20px",
                        borderRadius: "14px",
                        background: "rgba(245, 158, 11, 0.12)",
                        border: "1px solid rgba(245, 158, 11, 0.4)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fbbf24", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span>⏳ Action Required: Verify Client Payment Reference</span>
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#fde68a" }}>
                        Client submitted UTR: <strong style={{ color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>{selectedOrder.paymentId}</strong>. Verify against your MobiKwik / bank account.
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          type="button"
                          disabled={updating}
                          onClick={async () => {
                            setUpdating(true);
                            await updateOrderStatus(selectedOrder.id!, "PAID", "Payment verified by Admin via UTR");
                            setSelectedOrder({ ...selectedOrder, status: "PAID" });
                            setUpdating(false);
                            const updated = await getAllOrders();
                            setOrders(updated as any);
                          }}
                          style={{
                            flex: 1,
                            padding: "10px 14px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            border: "none",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
                          }}
                        >
                          ✅ APPROVE PAYMENT (Mark Paid)
                        </button>
                        <button
                          type="button"
                          disabled={updating}
                          onClick={async () => {
                            setUpdating(true);
                            await updateOrderStatus(selectedOrder.id!, "REJECTED", "Invalid UTR ID or transaction not received");
                            setSelectedOrder({ ...selectedOrder, status: "REJECTED" });
                            setUpdating(false);
                            const updated = await getAllOrders();
                            setOrders(updated as any);
                          }}
                          style={{
                            flex: 1,
                            padding: "10px 14px",
                            borderRadius: "10px",
                            background: "rgba(239,68,68,0.2)",
                            border: "1px solid rgba(239,68,68,0.4)",
                            color: "#fca5a5",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                          }}
                        >
                          ❌ REJECT PAYMENT
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Order Status Form */}
                  <form onSubmit={handleUpdateStatus} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: 4, fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)" }}>
                          Project Status
                        </label>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "10px",
                            background: "#080c17",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "#fff",
                            outline: "none",
                            fontSize: "0.85rem",
                          }}
                        >
                          <option value="VERIFICATION_PENDING">⏳ VERIFICATION_PENDING (Payment Pending Admin Review)</option>
                          <option value="PAID">✅ PAID (Order & Payment Verified)</option>
                          <option value="IN_PROGRESS">⚡ IN_PROGRESS (Development Active)</option>
                          <option value="COMPLETED">🎉 COMPLETED (Project Delivered)</option>
                          <option value="REJECTED">❌ REJECTED (Invalid UTR ID)</option>
                          <option value="CANCELLED">🚫 CANCELLED (Refunded)</option>
                        </select>
                      </div>

                      <div style={{ alignSelf: "flex-end" }}>
                        <button
                          type="submit"
                          disabled={updating}
                          className="btn-primary"
                          style={{ padding: "10px 16px", fontSize: "0.85rem" }}
                        >
                          {updating ? "Saving..." : "Update Status"}
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Real-time Message Chat Drawer */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
                      <MessageSquare size={16} color="#6366f1" /> Direct Chat with Client ({messages.length})
                    </div>

                    {/* Messages Container */}
                    <div
                      style={{
                        height: 220,
                        overflowY: "auto",
                        padding: 12,
                        borderRadius: "12px",
                        background: "#05070d",
                        border: "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        marginBottom: 12,
                      }}
                    >
                      {messages.length === 0 ? (
                        <div style={{ margin: "auto", textAlign: "center", color: "var(--text-dim)", fontSize: "0.82rem" }}>
                          No messages yet. Send a status update or note to the client below!
                        </div>
                      ) : (
                        messages.map((msg, idx) => (
                          <div
                            key={msg.id || idx}
                            style={{
                              alignSelf: msg.isAdmin ? "flex-end" : "flex-start",
                              maxWidth: "85%",
                              padding: "8px 12px",
                              borderRadius: msg.isAdmin ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                              background: msg.isAdmin ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "rgba(255,255,255,0.08)",
                              color: "#fff",
                              fontSize: "0.84rem",
                            }}
                          >
                            <div style={{ fontSize: "0.7rem", color: msg.isAdmin ? "#c7d2fe" : "var(--text-dim)", marginBottom: 2, fontWeight: 600 }}>
                              {msg.isAdmin ? "Admin (You)" : msg.senderName || msg.senderEmail}
                            </div>
                            <div>{msg.text}</div>
                          </div>
                        ))
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input Box */}
                    <form onSubmit={handleSendMessage} style={{ display: "flex", gap: 8 }}>
                      <input
                        type="text"
                        placeholder="Type message to client..."
                        value={newMessageText}
                        onChange={(e) => setNewMessageText(e.target.value)}
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
                        disabled={sendingMsg || !newMessageText.trim()}
                        className="btn-primary"
                        style={{ padding: "10px 16px" }}
                      >
                        <Send size={15} />
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: USER MANAGEMENT PANEL */}
        {activeTab === "users" && (
          <div
            style={{
              padding: 24,
              borderRadius: "20px",
              background: "rgba(11, 17, 35, 0.7)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#fff" }}>
                  Registered Firestore Users ({filteredUsers.length})
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  All users signed up via Firebase Authentication & synced to Firestore
                </p>
              </div>

              <div style={{ position: "relative", width: 280 }}>
                <input
                  type="text"
                  placeholder="Search user name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px 10px 38px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
                <Search size={16} color="var(--text-dim)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>

            {loadingUsers ? (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                Fetching registered users from Firestore...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                No users found.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {filteredUsers.map((u) => (
                  <div
                    key={u.uid}
                    style={{
                      padding: 16,
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <strong style={{ fontSize: "0.95rem", color: "#fff" }}>{u.displayName || u.email?.split("@")[0]}</strong>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: 9999,
                            background: u.role === "admin" ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)",
                            border: `1px solid ${u.role === "admin" ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`,
                            color: u.role === "admin" ? "#a5b4fc" : "var(--text-muted)",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                          }}
                        >
                          {u.role === "admin" ? "ADMIN" : "CLIENT"}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>{u.email}</div>
                    </div>

                    <button
                      onClick={() => handleToggleUserRole(u.uid, u.role)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "8px",
                        background: u.role === "admin" ? "rgba(239,68,68,0.12)" : "rgba(16,185,129,0.12)",
                        border: `1px solid ${u.role === "admin" ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}`,
                        color: u.role === "admin" ? "#fca5a5" : "#6ee7b7",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {u.role === "admin" ? "Revoke Admin Role" : "Make Admin"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
