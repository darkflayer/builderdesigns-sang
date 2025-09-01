import Layout from "@/components/layouts/Layout";

"use client";

import Layout from "@/components/layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/lib/api";

export default function NetworkPage() {
  const { data, isLoading, error } = useFetch<any[]>(['connections'], endpoints.user.connections);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">Network</h1>
        {isLoading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
        {error && <p className="text-red-600">Failed to load connections.</p>}
        {!isLoading && !error && (
          <ul className="space-y-3">
            {(data ?? []).map((c: any) => (
              <li key={c.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50">
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-gray-500">{c.category}</div>
              </li>
            ))}
            {(data ?? []).length === 0 && (
              <p className="text-gray-600 dark:text-gray-300">No connections yet.</p>
            )}
          </ul>
        )}
      </div>
    </Layout>
  );
}
