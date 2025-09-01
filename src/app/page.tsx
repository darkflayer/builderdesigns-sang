import { Suspense } from "react";
import HomePage from "@/components/pages/HomePage";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePage />
    </Suspense>
  );
}