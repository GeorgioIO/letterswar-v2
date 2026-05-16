import { login } from "./auth.service.js";
import { isValidEmail, isNotEmpty } from "../../utils/validation.js";

export async function loginController(req, res, next) {
  const { email, password } = req.body;

  // Validation
  if (!isNotEmpty(email)) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!isNotEmpty(password)) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Email is invalid" });
  }

  // Send data to login using try catch
  try {
    const { token, admin } = await login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 8 * 60 * 60 * 1000,
    });

    return res.json({ admin });
  } catch (error) {
    next(error);
  }
}

export async function logoutController(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
}

export async function meController(req, res) {
  res.json({ admin: req.admin });
}
