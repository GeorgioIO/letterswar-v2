import pool from "../../config/db.js";

// Total questions in DB
// Total letters that have questions < 10
// Total admins
// Total questions added this month

export async function getStats() {
  const [[{ totalQuestions }]] = await pool.query(`
        SELECT 
            COUNT(*) AS totalQuestions
        FROM questions
        WHERE is_deleted = FALSE;
        `);

  const [[{ lettersWithQuestionsU10 }]] = await pool.query(`
        SELECT 
        COUNT(*) AS lettersWithQuestionsU10
        FROM (
            SELECT l.id
            FROM letters l
            LEFT JOIN questions q ON l.id = q.letter_id AND q.is_deleted = FALSE
            GROUP BY l.id
            HAVING COUNT(q.id) < 10
        ) AS subquery
    `);

  const [[{ totalAdmins }]] = await pool.query(`
        SELECT 
            COUNT(*) AS totalAdmins
        FROM admins;
        `);

  const [[{ questionsAddedThisMonth }]] = await pool.query(`
        SELECT
            COUNT(*) AS questionsAddedThisMonth
        FROM questions
        WHERE MONTH(created_at) = MONTH(NOW()) 
        AND YEAR(created_at) = YEAR(NOW())
        AND is_deleted = FALSE;
    `);

  return {
    totalQuestions,
    lettersWithQuestionsU10,
    totalAdmins,
    questionsAddedThisMonth,
  };
}
