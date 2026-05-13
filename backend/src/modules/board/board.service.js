import pool from "../../config/db.js";

export async function generateBoard() {
  const [letters] = await pool.query(`
    SELECT 
        l.letter
    FROM letters l
    WHERE (
        SELECT COUNT(*)
        FROM  questions q
        WHERE q.letter_id = l.id AND is_deleted = FALSE
        )> 0
    `);

  if (letters.length === 0) {
    throw new Error("No letters with questions found");
  }

  const board = Array.from({ length: 25 }, (_, index) => {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    return {
      index,
      letter: randomLetter.letter,
      owner: null,
    };
  });

  return board;
}
