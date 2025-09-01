import Link from "next/link";
import { Calendar } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F5EF] to-[#F2EDE6] dark:from-black dark:to-gray-900">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-gradient-to-br from-[#7DA3D8] to-[#4F6789] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Calendar className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center bg-gradient-to-r from-[#7DA3D8] to-[#4F6789] hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}