import { Calendar } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F5EF] to-[#F2EDE6] dark:from-black dark:to-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#7DA3D8] to-[#4F6789] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Calendar className="h-8 w-8 text-white" />
        </div>
        <div className="animate-spin h-8 w-8 border-2 border-[#7DA3D8] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}