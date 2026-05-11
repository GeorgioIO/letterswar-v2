import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  function open(data = null) {
    setData(data);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setData(null);
  }

  return { isOpen, data, open, close };
}
