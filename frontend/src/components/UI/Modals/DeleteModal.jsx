import Modal from "./Modal";
import { CircleAlert } from "lucide-react";

export default function DeleteModal({
  isOpen,
  handleClose,
  title,
  message,
  onSubmit,
}) {
  return (
    <Modal open={isOpen} handleClose={handleClose}>
      <div className="flex flex-col items-center text-center gap-4 p-2">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <CircleAlert size={25} className="text-red-500" />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-400">{message}</p>
        </div>

        <div className="flex gap-3 w-full mt-1">
          <button
            onClick={handleClose}
            className="cursor-pointer flex-1 h-10 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            No, Keep it
          </button>
          <button
            onClick={onSubmit}
            className="cursor-pointer flex-1 h-10 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </Modal>
  );
}
