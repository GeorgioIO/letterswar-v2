import { getAllLetters } from "./letters.service.js";

export async function getAll(req, res) {
  try {
    const letters = await getAllLetters();

    res.json(letters);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Problem in getting letters..." });
  }
}
