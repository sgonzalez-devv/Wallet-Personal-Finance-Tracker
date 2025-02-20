import FeatureGuard from "@/components/featureGuard";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <FeatureGuard requiredFeature={"Data export"}>
      <div className="bg-yellow-700 flex justify-center font-bold text-3xl">
        <Button>Hello</Button>
      </div>
    </FeatureGuard>
  )
}
