import { Suspense } from "react";
import ScanPage from "@/components/pages/ScanPage";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Scan() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ScanPage />
    </Suspense>
  );
}