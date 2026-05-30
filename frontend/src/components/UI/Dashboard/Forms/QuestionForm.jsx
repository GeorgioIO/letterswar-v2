import { useState, useEffect, useActionState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { isNotEmpty } from "../../../../util/validation";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function QuestionForm({
  initialValues,
  onSubmit,
  isAdding,
  isEditing,
}) {
  const [formState, formAction] = useActionState(submitQuestionAction, {
    errors: null,
  });

  const [selectedLetter, setSelectedLetter] = useState(
    initialValues?.letter_id || formState.enteredValues?.letterId || "",
  );

  async function submitQuestionAction(prevState, formData) {
    // Get needed data
    const letterId = formData.get("letter_id");
    const questionText = formData.get("question");
    const answer = formData.get("answer");

    const selectedLetter = letters.find(
      (letter, index) => index + 1 === Number(letterId),
    );

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
      if (initialValues) {
        await onSubmit({
          id: initialValues.id,
          letter_id: letterId,
          letter: selectedLetter,
          question_text: questionText,
          answer,
        });
      } else {
        await onSubmit({
          letter_id: letterId,
          letter: selectedLetter,
          question_text: questionText,
          answer,
        });
      }

      return {
        errors: null,
        enteredValues: { letterId, questionText, answer },
      };
    } catch (error) {
      alert(error.response?.data?.message);
      return {
        errors: {
          general: error.response?.data?.message || "Operation failed...",
          errors,
        },
        enteredValues: { letterId, questionText, answer },
      };
    }
  }

  // When initialValues come after the form is rendered we use useEffect
  useEffect(() => {
    if (initialValues?.letter_id) {
      setSelectedLetter(Number(initialValues.letter_id));
    } else if (formState.enteredValues?.letterId) {
      setSelectedLetter(Number(formState.enteredValues.letterId));
    }
  }, [initialValues, formState]);

  return (
    <form
      autoComplete="off"
      action={formAction}
      className="flex flex-col gap-4 p-1"
    >
      <FormSelect
        label="Letter*"
        id="letter_id"
        name="letter_id"
        placeholder="Select A Letter"
        error={formState.errors?.letter_id}
        value={selectedLetter}
        onChange={(e) => {
          setSelectedLetter(e.target.value);
        }}
        options={letters}
      />
      <FormInput
        label="Question*"
        id="question"
        name="question"
        placeholder="Question"
        error={formState.errors?.questionText}
        defaultValue={
          initialValues
            ? initialValues.question_text
            : formState.enteredValues?.questionText
        }
      />
      <FormInput
        label="Answer*"
        id="answer"
        name="answer"
        placeholder="Answer"
        error={formState.errors?.answer}
        defaultValue={
          initialValues ? initialValues.answer : formState.enteredValues?.answer
        }
      />
      {formState.errors?.general && (
        <p className="text-red-400 text-xs text-center">
          {formState.errors.general}
        </p>
      )}
      <button
        type="submit"
        className="cursor-pointer mt-2 h-10 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
      >
        {isAdding && "Adding Question..."}
        {isEditing && "Editing Question..."}
        {!isAdding && !isEditing && "Submit"}
      </button>
    </form>
  );
}
