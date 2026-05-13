import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import { Info } from "lucide-react";

export default function InstructionsModal({ isOpen, handleClose }) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalHeader
        title="How to Play ?"
        Icon={Info}
        handleClose={handleClose}
      />
    </Modal>
  );
}
