import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  const thisModal = useRef();

  let modalClasses = `m-auto py-4 px-6 w-[350px] flex flex-col gap-5 rounded-xs ${className}`;

  useEffect(() => {
    const modal = thisModal.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog className={modalClasses} onClose={onClose} ref={thisModal}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
