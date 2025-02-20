import { useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import RestrictedAccessPage from "@/app/restricted-access/page";

export default function FeatureGuard({ children, requiredFeature }: { children: any; requiredFeature: string }) {
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAccess = async () => {
            const user = auth.currentUser;
            if (!user) {
                router.push("/auth");
                return;
            }

            // Get user plan
            const userDoc = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDoc);

            if (!userSnap.exists()) {
                router.push("/restricted-access");
                return;
            }

            const userPlan = userSnap.data().plan;

            // Get plan features
            const planDoc = doc(db, "plans", userPlan);
            const planSnap = await getDoc(planDoc);

            if (!planSnap.exists()) {
                router.push("/restricted-access");
                return;
            }

            const allowedFeatures = planSnap.data().features;
            setHasAccess(allowedFeatures.includes(requiredFeature));
        };

        checkAccess();
    }, []);

    if (hasAccess === null) return <p>Loading...</p>;

    return hasAccess ? children : <RestrictedAccessPage />;
}
