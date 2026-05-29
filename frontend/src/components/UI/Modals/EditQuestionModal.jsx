import QuestionForm from "../Dashboard/Forms/QuestionForm";
import ModalHeader from "./ModalHeader";
import { Puzzle } from "lucide-react";
import Modal from "./Modal";
export default function EditQuestionModal({
  question,
  isOpen,
  handleClose,
  onSubmit,
}) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalHeader
        title="Edit Question"
        Icon={Puzzle}
        handleClose={handleClose}
      />
      <QuestionForm
        initialValues={question}
        onSubmit={onSubmit}
        handleClose={handleClose}
      />
    </Modal>
  );
}
