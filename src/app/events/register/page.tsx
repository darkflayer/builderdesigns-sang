"use client";

import { useState } from "react";
import Layout from "@/components/layouts/Layout";
import { endpoints } from "@/lib/api";
import { useApiMutation } from "@/hooks/useFetch";

export default function EventRegisterPage() {
  const [eventId, setEventId] = useState("");
  const registerMutation = useApiMutation<any, void>('post', endpoints.events.register(eventId || ""));

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-6 py-8 space-y-4">
        <h1 className="text-2xl font-semibold">Register for Event</h1>
        <input
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          placeholder="Enter Event ID"
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/60"
        />
        <button
          onClick={() => eventId && registerMutation.mutate(undefined)}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={!eventId || registerMutation.isPending}
        >
          {registerMutation.isPending ? 'Registering...' : 'Register'}
        </button>
        {registerMutation.error && <p className="text-red-600">Registration failed.</p>}
        {registerMutation.data && (
          <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-auto">{JSON.stringify(registerMutation.data, null, 2)}</pre>
        )}
      </div>
    </Layout>
  );
}
