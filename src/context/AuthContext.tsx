"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  reload,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { isAdminEmail } from "@/lib/db";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  userRole: "admin" | "client";
  signInWithGoogle: () => Promise<User | null>;
  signInWithEmail: (e: string, p: string) => Promise<User | null>;
  signUpWithEmail: (e: string, p: string) => Promise<User | null>;
  sendVerificationEmail: () => Promise<void>;
  reloadUser: () => Promise<void>;
  resetPasswordEmail: (email: string) => Promise<void>;
  changeUserPassword: (newPass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  userRole: "client",
  signInWithGoogle: async () => null,
  signInWithEmail: async () => null,
  signUpWithEmail: async () => null,
  sendVerificationEmail: async () => {},
  reloadUser: async () => {},
  resetPasswordEmail: async () => {},
  changeUserPassword: async () => {},
  logout: async () => {},
});

export const formatFirebaseAuthError = (err: any): string => {
  const code = err?.code || "";
  const msg = err?.message || "";

  if (code.includes("unauthorized-domain") || msg.includes("unauthorized-domain")) {
    return `⚠️ Unauthorized Domain Error in Firebase!\n\nYour current domain is not authorized in Firebase Console.\n\nTo fix in 10 seconds:\n1. Open console.firebase.google.com\n2. Select your Firebase project\n3. Click Authentication → Settings (or Settings tab)\n4. Scroll to "Authorized domains"\n5. Click "Add domain" and add your current hostname (e.g. localhost, 127.0.0.1, or your production/Vercel domain)\n6. Click Save!`;
  }
  if (code.includes("operation-not-allowed") || msg.includes("operation-not-allowed")) {
    return `⚠️ Email/Password Auth is disabled in Firebase Console!\n\nTo enable it:\n1. Open console.firebase.google.com\n2. Select your Firebase project\n3. Click "Authentication" → "Sign-in method"\n4. Click "Email/Password" → Toggle ENABLE & Save!`;
  }
  if (code.includes("user-not-found") || code.includes("wrong-password") || code.includes("invalid-credential")) {
    return "Invalid email address or password. Please check your credentials.";
  }
  if (code.includes("email-already-in-use")) {
    return "An account with this email already exists. Try logging in instead.";
  }
  if (code.includes("weak-password")) {
    return "Password is too weak. Please use at least 6 characters.";
  }

  return msg || "Firebase Authentication error occurred.";
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<"admin" | "client">("client");

  const syncUserRoleAndProfile = async (currentUser: User, forceAdminRole?: boolean) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      
      const emailIsAdmin = isAdminEmail(currentUser.email);
      let role: "admin" | "client" = (emailIsAdmin || forceAdminRole) ? "admin" : "client";

      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.role === "admin") {
          role = "admin";
        }
      }

      setIsAdmin(role === "admin");
      setUserRole(role);

      await setDoc(
        userRef,
        {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || currentUser.email?.split("@")[0] || "User",
          photoURL: currentUser.photoURL || null,
          role,
          emailVerified: currentUser.emailVerified || false,
          lastLogin: serverTimestamp(),
          ...(userSnap.exists() ? {} : { createdAt: serverTimestamp() }),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn("Firestore user sync warning:", err);
      if (isAdminEmail(currentUser.email)) {
        setIsAdmin(true);
        setUserRole("admin");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserRoleAndProfile(currentUser);
      } else {
        setIsAdmin(false);
        setUserRole("client");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      setUser(result.user);
      await syncUserRoleAndProfile(result.user);
      return result.user;
    }
    return null;
  };

  const signInWithEmail = async (email: string, pass: string): Promise<User | null> => {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    if (result.user) {
      setUser(result.user);
      await syncUserRoleAndProfile(result.user);
      return result.user;
    }
    return null;
  };

  const signUpWithEmail = async (email: string, pass: string): Promise<User | null> => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    if (res.user) {
      setUser(res.user);
      await syncUserRoleAndProfile(res.user);
      // Automatically send email verification link on sign up
      try {
        await sendEmailVerification(res.user);
      } catch (e) {
        console.warn("Could not send initial verification email:", e);
      }
      return res.user;
    }
    return null;
  };

  const sendVerificationEmail = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user logged in.");
    await sendEmailVerification(auth.currentUser);
  };

  const reloadUser = async (): Promise<void> => {
    if (auth.currentUser) {
      await reload(auth.currentUser);
      setUser({ ...auth.currentUser });
    }
  };

  const resetPasswordEmail = async (email: string): Promise<void> => {
    try {
      const res = await fetch("/api/auth/custom-reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send password reset email.");
      }
    } catch (err) {
      // Fallback to Firebase client SDK reset email
      const redirectUrl = typeof window !== "undefined" ? `${window.location.origin}/login` : "http://localhost:3000/login";
      await sendPasswordResetEmail(auth, email, {
        url: redirectUrl,
        handleCodeInApp: false,
      });
    }
  };

  const changeUserPassword = async (newPass: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user is currently logged in.");
    await updatePassword(auth.currentUser, newPass);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
    setUserRole("client");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        userRole,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendVerificationEmail,
        reloadUser,
        resetPasswordEmail,
        changeUserPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



