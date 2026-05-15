import pool from "../../config/db.js";

export async function generateBoard() {
  const [letters] = await pool.query(`
      SELECT l.letter, COUNT(q.id) as questionCount
      FROM letters l 
      LEFT JOIN questions q ON l.id = q.letter_id
      GROUP BY l.id , l.letter
      HAVING COUNT(q.id) > 0
    `);

  if (letters.length === 0) {
    throw new Error("No letters with questions found");
  }

  const shuffled = [...letters].sort(() => Math.random() - 0.5);

  const board = Array.from({ length: 25 }, (_, index) => {
    return {
      index,
      letter: shuffled[index % shuffled.length].letter,
      owner: null,
    };
  });

  const shuffledBoard = board
    .sort(() => Math.random() - 0.5)
    .map((cell, index) => ({ ...cell, index }));

  return shuffledBoard;
}
