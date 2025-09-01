import { Suspense } from "react";
import ProfilePage from "@/components/pages/ProfilePage";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Profile() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProfilePage />
    </Suspense>
  );
}