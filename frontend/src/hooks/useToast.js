import { useContext } from "react";
import { ToastContext } from "../store/ToastContext";

export function useToast() {
  return useContext(ToastContext);
}
