import { getStats } from "./stats.service.js";

export async function getAll(req, res, next) {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
}
