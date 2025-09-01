import { Suspense } from "react";
import MyEventsPage from "@/components/pages/MyEventsPage";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function MyEvents() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MyEventsPage />
    </Suspense>
  );
}