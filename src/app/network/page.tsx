import { Suspense } from "react";
import NetworkPage from "@/components/pages/NetworkPage";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Network() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NetworkPage />
    </Suspense>
  );
}