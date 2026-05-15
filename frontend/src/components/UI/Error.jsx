import { CircleAlert } from "lucide-react";

export default function Error({ errorMessage }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
        <CircleAlert size={22} className="text-red-400" />
      </div>
      <p className="text-sm font-medium text-gray-700">Something went wrong</p>
      <p className="text-xs text-gray-400">{errorMessage}</p>
    </div>
  );
}
