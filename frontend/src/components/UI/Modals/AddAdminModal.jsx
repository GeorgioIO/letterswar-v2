import ModalHeader from "./ModalHeader";
import { Shield } from "lucide-react";
import Modal from "./Modal";
import AdminForm from "../Dashboard/Forms/AdminForm";

export default function AddAdminModal({
  isOpen,
  isAdding,
  onSubmit,
  handleClose,
}) {
  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalHeader title="Add Admin" Icon={Shield} handleClose={handleClose} />
      <AdminForm onSubmit={onSubmit} isAdding={isAdding} />
    </Modal>
  );
}
