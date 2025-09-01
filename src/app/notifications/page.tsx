"use client";

import Layout from "@/components/layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/lib/api";

export default function NotificationsPage() {
  const { data, isLoading, error } = useFetch<any[]>(['notifications'], endpoints.user.notifications);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
        {isLoading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
        {error && <p className="text-red-600">Failed to load notifications.</p>}
        <ul className="space-y-3">
          {(data ?? []).map((n: any) => (
            <li key={n.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50">
              <div className="font-medium">{n.title || n.message}</div>
              <div className="text-sm text-gray-500">{n.createdAt}</div>
            </li>
          ))}
          {(data ?? []).length === 0 && !isLoading && !error && (
            <p className="text-gray-600 dark:text-gray-300">No notifications.</p>
          )}
        </ul>
      </div>
    </Layout>
  );
}
