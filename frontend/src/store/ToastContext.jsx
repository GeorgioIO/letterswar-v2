import { useState } from "react";
import { createContext } from "react";

const ToastContext = createContext({
  toast: null,
  showToast: (message, type) => {},
});

function ToastContextProvider({ children }) {
  const [toast, setToast] = useState(null);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  const ctxValue = {
    toast,
    showToast,
  };

  return (
    <ToastContext.Provider value={ctxValue}>{children}</ToastContext.Provider>
  );
}

export { ToastContext };
export default ToastContextProvider;
