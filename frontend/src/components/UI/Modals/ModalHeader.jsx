import { X } from "lucide-react";

export default function ModalHeader({ title, Icon, handleClose }) {
  return (
    <header className="flex items-center justify-between mb-1">
      <h3 className="text-base font-medium text-gray-900 flex items-center gap-2">
        <Icon size={16} /> {title}
      </h3>
      <button
        onClick={handleClose}
        className="cursor-pointer p-1 rounded-lg hover:bg-gray-100 text-gray-400"
      >
        <X size={16} />
      </button>
    </header>
  );
}
