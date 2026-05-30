import ModalHeader from "./ModalHeader";
import { Puzzle } from "lucide-react";
import Modal from "./Modal";
import QuestionForm from "../Dashboard/Forms/QuestionForm";

export default function AddQuestionModal({
  isOpen,
  isAdding,
  handleClose,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalHeader
        title="Add Question"
        Icon={Puzzle}
        handleClose={handleClose}
      />
      <QuestionForm onSubmit={onSubmit} isAdding={isAdding} />
    </Modal>
  );
}
