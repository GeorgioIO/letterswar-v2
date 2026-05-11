import { useState, useEffect, useActionState } from "react";
import getAllLettersRequest from "../../../../api/letters.api";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { useAuth } from "../../../../hooks/useAuth";
import { isNotEmpty } from "../../../../util/validation";
import { useToast } from "../../../../hooks/useToast";

export default function QuestionForm({
  initialValues,
  onSubmit,
  handleRefresh,
}) {
  const [letters, setLetters] = useState([]);
  const [error, setError] = useState(null);
  const [formState, formAction] = useActionState(addQuestionAction, {
    errors: null,
  });
  const { admin } = useAuth();
  const { showToast } = useToast();

  async function addQuestionAction(prevState, formData) {
    // Get needed data
    const letterId = formData.get("letter_id");
    const questionText = formData.get("question");
    const answer = formData.get("answer");
    const adminId = admin.id;

    const selectedLetter = letters.find(
      (letter) => letter.id === Number(letterId),
    )?.letter;

    let errors = {};

    // Validate
    if (!letterId) {
      errors.letter_id = "Please select a letter";
    }

    if (!isNotEmpty(questionText)) {
      errors.questionText = "Question is required";
    }

    if (!isNotEmpty(answer)) {
      errors.answer = "Answer is required";
    } else if (!answer.startsWith(selectedLetter)) {
      errors.answer = `Answer must start with ${selectedLetter}`;
    }

    if (Object.keys(errors).length > 0) {
      return { errors, enteredValues: { letterId, questionText, answer } };
    }

    // Submit
    try {
      await onSubmit({
        letter_id: letterId,
        letter: selectedLetter,
        question_text: questionText,
        answer,
      });
      handleRefresh();
      showToast("Question added successfully", "success");
      return { errors: null };
    } catch (error) {
      showToast("Adding question failed", "fail");
      return {
        errors: {
          general: error.response?.data?.message || "Problem Adding Question",
          errors,
        },
        enteredValues: { letterId, questionText, answer },
      };
    }
  }

  useEffect(() => {
    async function fetchLetters() {
      try {
        const data = await getAllLettersRequest();
        setLetters(data);
      } catch (error) {
        setError(error.message || "Problem in loading letters...");
      }
    }
    fetchLetters();
  }, []);

  return (
    <form action={formAction} className="flex flex-col gap-4 p-1">
      <FormSelect
        label="Letter*"
        id="letter_id"
        name="letter_id"
        placeholder="Select A Letter"
        error={formState.errors?.letter_id}
        defaultValue={formState.enteredValues?.letterId}
        options={letters}
      />
      <FormInput
        label="Question*"
        id="question"
        name="question"
        placeholder="Question"
        error={formState.errors?.questionText}
        defaultValue={formState.enteredValues?.questionText}
      />
      <FormInput
        label="Answer*"
        id="answer"
        name="answer"
        placeholder="Answer"
        error={formState.errors?.answer}
        defaultValue={formState.enteredValues?.answer}
      />
      {formState.errors?.general && (
        <p className="text-red-400 text-xs text-center">
          {formState.errors.general}
        </p>
      )}
      <button
        type="submit"
        className="mt-2 h-10 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Save Question
      </button>
    </form>
  );
}
