import { getStats } from "./stats.service.js";

export async function getAll(req, res) {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Problem in getting stats..." });
  }
}
