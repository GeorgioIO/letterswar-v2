import QuestionForm from "../Dashboard/Forms/QuestionForm";
import ModalHeader from "./ModalHeader";
import { Puzzle } from "lucide-react";
import { updateQuestionRequest } from "../../../api/questions.api";
import Modal from "./Modal";
export default function EditQuestionModal({
  question,
  isOpen,
  handleClose,
  handleRefresh,
  successMessage,
  failMessage,
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
        onSubmit={updateQuestionRequest}
        handleRefresh={handleRefresh}
        successMessage={successMessage}
        failMessage={failMessage}
      />
    </Modal>
  );
}
