import Layout from "@/components/layouts/Layout";

"use client";

import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/lib/api";

export default function MyEventsPage() {
  const { data, isLoading, error } = useFetch<any[]>(['my-events'], endpoints.user.events);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">My Events</h1>
        {isLoading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
        {error && <p className="text-red-600">Failed to load events.</p>}
        {!isLoading && !error && (
          <ul className="space-y-3">
            {(data ?? []).map((e: any) => (
              <li key={e.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50">
                <div className="font-medium">{e.title || e.name}</div>
                <div className="text-sm text-gray-500">{e.date} {e.time} • {e.location}</div>
              </li>
            ))}
            {(data ?? []).length === 0 && (
              <p className="text-gray-600 dark:text-gray-300">You have no events yet.</p>
            )}
          </ul>
        )}
      </div>
    </Layout>
  );
}
