import pool from "../../config/db.js";

// in this file we place the functions that talk to the database

export async function getAllQuestions() {
  const [rows] = await pool.query(`
    SELECT
	    q.id,
        q.question_text,
        q.answer,
        q.is_deleted,
        l.letter,
        a.username AS created_by
    FROM questions q
    JOIN letters l ON q.letter_id = l.id
    LEFT JOIN admins a ON q.created_by = a.id 
    WHERE q.is_deleted = FALSE;
    `);

  return rows;
}

export async function getQuestionById(id) {
  const [rows] = await pool.query(
    `
    SELECT
	      q.id,
        q.question_text,
        q.answer,
        q.is_deleted,
        l.letter,
        a.username AS created_by
    FROM questions q
    JOIN letters l ON q.letter_id = l.id
    LEFT JOIN admins a ON q.created_by = a.id 
    WHERE q.id = ? AND q.is_deleted = FALSE;
    `,
    [id],
  );

  return rows[0] || null;
}

export async function createQuestion(
  letter_id,
  question_text,
  answer,
  admin_id,
) {
  const [result] = await pool.query(
    `
        INSERT INTO questions (letter_id , question_text , answer , created_by)
        VALUES (? , ? , ? , ?)
        `,
    [letter_id, question_text, answer, admin_id],
  );

  return result.insertId;
}

export async function updateQuestion(
  id,
  letter_id,
  question_text,
  answer,
  admin_id,
) {
  const [result] = await pool.query(
    `
        UPDATE questions 
        SET question_text = ?, answer = ?, letter_id = ?, updated_by = ?
        WHERE id = ? AND is_deleted = FALSE
        `,
    [question_text, answer, letter_id, admin_id, id],
  );

  return result.affectedRows;
}

export async function deleteQuestion(id) {
  const [result] = await pool.query(
    `
        UPDATE questions
        SET is_deleted = TRUE
        WHERE id = ?
        `,
    [id],
  );

  return result.affectedRows;
}
