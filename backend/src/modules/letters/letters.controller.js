import { getAllLetters } from "./letters.service.js";

export async function getAll(req, res, next) {
  try {
    const letters = await getAllLetters();

    res.json(letters);
  } catch (error) {
    next(error);
  }
}
