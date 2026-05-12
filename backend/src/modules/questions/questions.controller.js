import * as questionServices from "./questions.service.js";
import {
  isNotEmpty,
  isAnswerStartsWithLetter,
} from "../../utils/validation.js";

export async function getAll(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const letter = req.query.letter || null;
  const showDeleted = parseInt(req.query.showDeleted) || 0;

  try {
    const questions = await questionServices.getAllQuestions(
      page,
      limit,
      letter,
      showDeleted,
    );

    console.log(questions);
    res.json(questions);
  } catch (error) {
    next(error);
  }
}

export async function getOne(req, res, next) {
  const id = req.params.id;

  try {
    const question = await questionServices.getQuestionById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  const { letter_id, letter, question_text, answer } = req.body;

  // Validation
  if (
    !isNotEmpty(letter_id) ||
    !isNotEmpty(question_text) ||
    !isNotEmpty(answer)
  ) {
    return res
      .status(400)
      .json({ message: "Letter, question and answer are required" });
  }

  if (!isAnswerStartsWithLetter(answer, letter)) {
    return res
      .status(400)
      .json({ message: "Answer must end with the specified letter " });
  }

  try {
    const newId = await questionServices.createQuestion(
      letter_id,
      question_text,
      answer,
      req.admin.id,
    );
    res.status(201).json({ message: "Question created", id: newId });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  const { letter_id, letter, question_text, answer } = req.body;

  if (
    !isNotEmpty(letter_id) ||
    !isNotEmpty(question_text) ||
    !isNotEmpty(answer)
  ) {
    return res
      .status(400)
      .json({ message: "Letter, question and answer are required" });
  }

  if (!isAnswerStartsWithLetter(answer, letter)) {
    return res
      .status(400)
      .json({ message: "Answer must end with the specified letter" });
  }

  try {
    const affected = await questionServices.updateQuestion(
      req.params.id,
      letter_id,
      question_text,
      answer,
      req.admin.id,
    );

    if (affected === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.json({ message: "Question updated" });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  const id = req.params.id;

  try {
    const affected = await questionServices.deleteQuestion(id);

    if (affected === 0) {
      return res.status(404).json({ message: "Question Not found" });
    }

    res.json({ message: "Question deleted" });
  } catch (error) {
    next(error);
  }
}

export async function restore(req, res, next) {
  const id = req.params.id;

  try {
    const affected = await questionServices.restoreQuestion(id);

    if (affected === 0) {
      return res.status(404).json({ message: "Question Not found" });
    }

    res.json({ message: "Question restored" });
  } catch (error) {
    next(error);
  }
}
