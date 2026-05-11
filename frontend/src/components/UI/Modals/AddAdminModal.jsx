import ModalHeader from "./ModalHeader";
import { Shield } from "lucide-react";
import Modal from "./Modal";
import AdminForm from "../Dashboard/Forms/AdminForm";
export default function AddAdminModal({
  isOpen,
  handleClose,
  handleRefresh,
  successMessage,
  failMessage,
}) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalHeader title="Add Admin" Icon={Shield} handleClose={handleClose} />
      <AdminForm
        handleRefresh={handleRefresh}
        successMessage={successMessage}
        failMessage={failMessage}
      />
    </Modal>
  );
}
