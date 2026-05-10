import { useToast } from "../../hooks/useToast";
import { CheckCircle, XCircle } from "lucide-react";

export default function Toast() {
  const { toast } = useToast();

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${
        isSuccess ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {isSuccess ? <CheckCircle size={18} /> : <XCircle size={18} />}
      {toast.message}
    </div>
  );
}
