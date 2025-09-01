import Layout from "@/components/layouts/Layout";

export default function EventDetailsPage({ eventId }: { eventId: string }) {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">Event Details</h1>
        <p className="text-gray-600 dark:text-gray-300">Event ID: {eventId}</p>
      </div>
    </Layout>
  );
}
