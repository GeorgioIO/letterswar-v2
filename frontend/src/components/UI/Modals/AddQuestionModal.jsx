import ModalHeader from "./ModalHeader";
import { Puzzle } from "lucide-react";
import Modal from "./Modal";
import QuestionForm from "../Dashboard/Forms/QuestionForm";
import { createQuestionRequest } from "../../../api/questions.api.js";

export default function AddQuestionModal({ isOpen, handleClose }) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalHeader
        title="Add Question"
        Icon={Puzzle}
        handleClose={handleClose}
      />
      <QuestionForm onSubmit={createQuestionRequest} />
    </Modal>
  );
}
