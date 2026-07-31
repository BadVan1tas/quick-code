import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface OrderData {
  id?: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  service: string;
  budget: string;
  timeline: string;
  details?: string;
  gateway: "upi_qr" | "cashfree" | "stripe";
  amount: number;
  paymentId: string; // UTR or Txn Ref ID
  status: "VERIFICATION_PENDING" | "PAID" | "REJECTED" | "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  adminNote?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface OrderMessage {
  id?: string;
  orderId: string;
  senderEmail: string;
  senderName: string;
  text: string;
  isAdmin: boolean;
  createdAt?: any;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: "admin" | "client";
  createdAt?: any;
  lastLogin?: any;
}

// Configured default admin emails
export const DEFAULT_ADMIN_EMAILS = [
  "admin@quickcode.com",
  "admin@quick-code.com",
  process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() || "",
].filter(Boolean);

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return DEFAULT_ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function createFirestoreOrder(order: OrderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (err) {
    console.error("Firestore Order Error:", err);
    return `ord_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export async function getUserOrders(email: string) {
  try {
    const q = query(collection(db, "orders"), where("customerEmail", "==", email), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  } catch (err) {
    console.error("Error fetching user orders:", err);
    return [];
  }
}

// ─── MESSAGING FUNCTIONS ─────────────────────────────────────────

export async function addOrderMessage(
  orderId: string,
  senderEmail: string,
  senderName: string,
  text: string,
  isAdmin: boolean
) {
  try {
    const docRef = await addDoc(collection(db, "orders", orderId, "messages"), {
      orderId,
      senderEmail,
      senderName,
      text,
      isAdmin,
      createdAt: serverTimestamp(),
    });
    // also touch order updatedAt
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { updatedAt: serverTimestamp() });
    } catch (_) {}
    return docRef.id;
  } catch (err) {
    console.error("Error adding message to order:", err);
    return null;
  }
}

export async function getOrderMessages(orderId: string): Promise<OrderMessage[]> {
  try {
    const q = query(collection(db, "orders", orderId, "messages"), orderBy("createdAt", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as any) }));
  } catch (err) {
    console.error("Error fetching order messages:", err);
    return [];
  }
}

export function subscribeToOrderMessages(orderId: string, callback: (messages: OrderMessage[]) => void) {
  try {
    const q = query(collection(db, "orders", orderId, "messages"), orderBy("createdAt", "asc"));
    return onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as any) }));
        callback(msgs);
      },
      (err) => {
        console.warn("Firestore subscription permission warning:", err);
      }
    );
  } catch (err) {
    console.error("Error subscribing to order messages:", err);
    return () => {};
  }
}

// ─── ADMIN & USER MANAGEMENT FUNCTIONS ───────────────────────────

export async function getAllOrders() {
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  } catch (err) {
    console.error("Error fetching all orders for Admin:", err);
    return [];
  }
}

export async function updateOrderStatus(orderId: string, status: string, adminNote?: string) {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status,
      adminNote: adminNote || "",
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error("Error updating order status:", err);
    return false;
  }
}

export async function getAllUsers(): Promise<UserProfile[]> {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.docs.map((docSnap) => docSnap.data() as UserProfile);
  } catch (err) {
    console.error("Error fetching all users:", err);
    return [];
  }
}

export async function updateUserRole(uid: string, role: "admin" | "client") {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { role, updatedAt: serverTimestamp() });
    return true;
  } catch (err) {
    console.error("Error updating user role:", err);
    return false;
  }
}

