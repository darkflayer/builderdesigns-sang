import Layout from "@/components/layouts/Layout";

"use client";

import { useFetch, useApiMutation } from "@/hooks/useFetch";
import { endpoints } from "@/lib/api";

export default function EventDetailsPage({ eventId }: { eventId: string }) {
  const { data, isLoading, error } = useFetch<any>(['event', eventId], endpoints.events.details(eventId));
  const registerMutation = useApiMutation<any, void>('post', endpoints.events.register(eventId));

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {isLoading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
        {error && <p className="text-red-600">Failed to load event.</p>}
        {data && (
          <>
            <h1 className="text-2xl font-semibold mb-2">{data.title || data.name}</h1>
            <div className="text-sm text-gray-500 mb-4">{data.date} {data.time} • {data.location}</div>
            <button
              onClick={() => registerMutation.mutate(undefined)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {registerMutation.isPending ? 'Registering...' : 'Register Now'}
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
