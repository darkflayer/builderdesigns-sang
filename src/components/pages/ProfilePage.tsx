"use client";

import Layout from "@/components/layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/lib/api";

export default function ProfilePage() {
  const { data, isLoading, error } = useFetch<any>(['profile'], endpoints.user.profile);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        {isLoading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
        {error && <p className="text-red-600">Failed to load profile.</p>}
        {data && (
          <div className="space-y-2">
            <div className="font-semibold">{data.name}</div>
            <div className="text-sm text-gray-500">{data.email}</div>
          </div>
        )}
      </div>
    </Layout>
  );
}
