import pool from "../../config/db.js";

// in this file we place the functions that talk to the database

export async function getAllQuestions(page, limit, letter, showDeleted) {
  const offset = (page - 1) * limit;

  let whereClause = "WHERE q.is_deleted = ?";
  const params = [showDeleted];

  if (letter) {
    whereClause += " AND l.letter = ?";
    params.push(letter);
  }

  const [rows] = await pool.query(
    `
    SELECT
	      q.id,
        q.letter_id,
        q.question_text,
        q.answer,
        q.is_deleted,
        l.letter,
        a.username AS created_by
    FROM questions q
    JOIN letters l ON q.letter_id = l.id
    LEFT JOIN admins a ON q.created_by = a.id
    ${whereClause}
    ORDER BY q.answer 
    LIMIT ? OFFSET ? 
    `,
    [...params, limit, offset, showDeleted],
  );

  const [[{ total }]] = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM questions q
    JOIN letters l ON q.letter_id = l.id
    ${whereClause}
    `,
    params,
  );

  return {
    questions: rows,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
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

export async function getRandomQuestion(letter, excludeIds) {
  let query = `    
    SELECT
      q.id,
      q.question_text,
      q.answer,
      l.letter
    FROM questions q
    JOIN letters l ON q.letter_id = l.id
    WHERE l.letter = ? AND q.is_deleted = FALSE `;

  const params = [letter];

  if (excludeIds.length > 0) {
    query += " AND q.id NOT IN (?)";
    params.push(excludeIds);
  }

  query += " ORDER BY RAND() LIMIT 1";

  const [rows] = await pool.query(query, params);

  return rows[0] || null;
}

export async function bulkImport(validatedQuestions, admin_id) {
  const bulkData = validatedQuestions.map((question) => [
    question.letter_id,
    question.question_text,
    question.answer,
    admin_id,
  ]);

  const [result] = await pool.query(
    `INSERT INTO questions (letter_id , question_text , answer , created_by) VALUES ?`,
    [bulkData],
  );

  return result.affectedRows;
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
        WHERE id = ? 
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

export async function restoreQuestion(id) {
  const [result] = await pool.query(
    `
        UPDATE questions
        SET is_deleted = FALSE
        WHERE id = ?
        `,
    [id],
  );

  return result.affectedRows;
}
