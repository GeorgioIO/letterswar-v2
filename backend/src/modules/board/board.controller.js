import { generateBoard } from "./board.service.js";

export async function generate(req, res, next) {
  try {
    const board = await generateBoard();
    res.json(board);
  } catch (error) {
    next(error);
  }
}
