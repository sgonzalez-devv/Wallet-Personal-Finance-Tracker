"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, provider, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

type AuthContextType = {
    user: User | null;
    plan: string | null;
    userData: { name: string; lastName: string } | null;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [plan, setPlan] = useState<string | null>(null);
    const [userData, setUserData] = useState<{ name: string; lastName: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                const userDoc = doc(db, "users", user.uid);
                const userSnap = await getDoc(userDoc);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setPlan(userSnap.data().plan);

                }
            } else {
                setUser(null);
                setPlan(null);
                setUserData(null);
            }
        });

        return () => unsuscribe();
    }, []);

    const login = async () => {
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

            // Update state
            setUser(user);
            setPlan(userSnap.exists() ? userSnap.data().plan : "free");
        } catch (error) {
            toast.error('There is an error authenticating you. :(', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            console.error("Login error:", error);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setPlan(null);
        setUserData(null);
        router.replace("/auth");
    };

    return (
        <AuthContext.Provider value={{ user, plan, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};