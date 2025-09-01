import Layout from "@/components/layouts/Layout";

import { useState } from "react";
import { useApiMutation } from "@/hooks/useFetch";
import { endpoints } from "@/lib/api";

export default function ScanPage() {
  const [code, setCode] = useState("");
  const scanMutation = useApiMutation<any, { code: string }>('post', endpoints.qr.scan);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-4">
        <h1 className="text-2xl font-semibold">Scan</h1>
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter QR/Ticket code"
            className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/60"
          />
          <button
            onClick={() => scanMutation.mutate({ code })}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={!code || scanMutation.isPending}
          >
            {scanMutation.isPending ? 'Scanning...' : 'Scan'}
          </button>
        </div>
        {scanMutation.error && (
          <p className="text-red-600">Scan failed.</p>
        )}
        {scanMutation.data && (
          <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-auto">{JSON.stringify(scanMutation.data, null, 2)}</pre>
        )}
      </div>
    </Layout>
  );
}
