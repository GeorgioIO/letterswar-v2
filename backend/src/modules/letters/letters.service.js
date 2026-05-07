import pool from "../../config/db.js";

export async function getAllLetters() {
  const [rows] = await pool.query(`
        SELECT 
            l.id,
            l.letter,
            COUNT(q.id) AS questions_count
        FROM letters l
        LEFT JOIN questions q ON l.id = q.letter_id AND q.is_deleted = FALSE
        GROUP BY l.id , l.letter;        
        `);

  return rows;
}
