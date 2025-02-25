"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, provider, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  plan: string | null;
  userData: { name: string; lastName: string } | null;
  loginWithGoogle: () => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ name: string; lastName: string } | null>(null);
  const router = useRouter();

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
          setPlan(userSnap.data().plan);
          setUserData({
            name: userSnap.data().name,
            lastName: userSnap.data().lastName,
          });
        }
      } else {
        setUser(null);
        setPlan(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Google Sign-In
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract name and last name
      const fullName = user.displayName || "";
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      setUserData({ name: firstName, lastName: lastName });

      // Reference to Firestore document
      const userDoc = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDoc);

      if (!userSnap.exists()) {
        // Store user details in Firestore
        await setDoc(userDoc, {
          email: user.email,
          name: firstName,
          lastName: lastName,
          plan: "free", // Default plan
        });
      }

      setUser(user);
      setPlan(userSnap.exists() ? userSnap.data().plan : "free");
    } catch (error) {
      toast.error("There was an error authenticating you.", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Login error:", error);
    }
  };

  // Email/Password Sign-Up
  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });

      // Save to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        name: displayName,
        plan: "free",
      });

      setUser(userCredential.user);
      setPlan("free");
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  // Email/Password Login
  const loginWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setPlan(null);
    setUserData(null);
    router.replace("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, plan, userData, loginWithGoogle, loginWithEmail, signUpWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
