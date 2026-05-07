import jwt from "jsonwebtoken";
import pool from "../../config/db.js";
import bcrypt from "bcryptjs";

export async function login(email, password) {
  // 1. find the admin by email

  const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [
    email,
  ]);

  const admin = rows[0];

  if (!admin) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign(
    { id: admin.id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );

  return {
    token,
    admin: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
  };
}
