import { Suspense } from "react";
import EventDetailsPage from "@/components/pages/EventDetailsPage";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EventDetailsPage eventId={params.id} />
    </Suspense>
  );
}