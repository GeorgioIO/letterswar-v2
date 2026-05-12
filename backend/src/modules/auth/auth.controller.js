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
    const data = await login(email, password);
    return res.json(data);
  } catch (error) {
    next(error);
  }
}
