import pool from "../../config/db.js";
import bcrypt from "bcryptjs";

// ! TODO : getAllAdmins
export async function getAllAdmins() {
  const [rows] = await pool.query(`
        SELECT
            id,
            username,
            email,
            role,
            created_at,
            is_deleted
        FROM admins
        WHERE is_deleted = FALSE;
        `);

  return rows;
}

// ! TODO : createAdmin
export async function createAdmin(username, email, password, role) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `
    INSERT INTO admins (username , email , password , role)
    VALUES (? , ? , ? , ?)
    `,
    [username, email, hashedPassword, role],
  );

  return result.insertId;
}

// ! TODO : updateAdmin
export async function updateAdmin(id, username, email, password, role) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `
    UPDATE admins 
    SET username = ?, email = ?, password = ?, role = ?
    WHERE id = ?
    `,
    [username, email, hashedPassword, role, id],
  );

  return result.affectedRows;
}

// ! TODO : deleteAdmin
export async function deleteAdmin(id) {
  const [result] = await pool.query(
    `
        UPDATE admins 
        SET is_deleted = TRUE 
        WHERE id = ?`,
    [id],
  );

  return result.affectedRows;
}
