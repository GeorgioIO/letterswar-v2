import Modal from "./Modal";
import { Download } from "lucide-react";

export default function RestoreModal({
  isOpen,
  isRestoring,
  handleClose,
  title,
  message,
  onSubmit,
}) {
  // const { showToast } = useToast();

  // async function handleRestore() {
  //   try {
  //     await restoreRequest();
  //     onSuccess();
  //     handleClose();
  //     showToast(successMessage, "success");
  //   } catch (error) {
  //     showToast(error.response?.data?.message || failMessage, "error");
  //   }
  // }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="flex flex-col items-center text-center gap-4 p-2">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <Download size={25} className="text-green-500" />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-400">{message}</p>
        </div>

        <div className="flex gap-3 w-full mt-1">
          {isRestoring && (
            <p className="w-full text-center text-green-500 font-black tracking-wider">
              Restoring...
            </p>
          )}
          {!isRestoring && (
            <>
              <button
                onClick={handleClose}
                className="cursor-pointer flex-1 h-10 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                No, Keep it
              </button>
              <button
                onClick={onSubmit}
                className="cursor-pointer flex-1 h-10 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
              >
                Yes, Restore it
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
