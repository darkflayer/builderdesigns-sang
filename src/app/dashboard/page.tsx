"use client";

import Layout from "@/components/layouts/Layout";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        {isAuthenticated ? (
          <p className="text-gray-600 dark:text-gray-300">Welcome, {user?.name}</p>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">Please login to view your dashboard.</p>
        )}
      </div>
    </Layout>
  );
}
