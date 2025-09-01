import { Suspense } from "react";
import AuthPage from "@/components/pages/AuthPage";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Auth() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthPage />
    </Suspense>
  );
}