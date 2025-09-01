import Layout from "@/components/layouts/Layout";

export default function MyEventsPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">My Events</h1>
        <p className="text-gray-600 dark:text-gray-300">You have no events yet.</p>
      </div>
    </Layout>
  );
}
