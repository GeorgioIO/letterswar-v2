import * as adminsServices from "./admins.service.js";
import { isValidEmail, isNotEmpty } from "../../utils/validation.js";

// ! Get all admins controller
export async function getAll(req, res) {
  try {
    const admins = await adminsServices.getAllAdmins();
    res.json(admins);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Problem in getting admins..." });
  }
}

// ! Create admin controller
export async function create(req, res) {
  try {
    const { username, email, password, role } = req.body;

    if (!isNotEmpty(username) || !isNotEmpty(password) || !isNotEmpty(role)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const newAdminId = await adminsServices.createAdmin(
      username,
      email,
      password,
      role,
    );

    res.status(201).json({ message: "Admin is created", id: newAdminId });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Problem in creating admin..." });
  }
}

// ! Update admin controller
export async function update(req, res) {
  try {
    const { username, email, role, password } = req.body;

    const affected = await adminsServices.updateAdmin(
      req.params.id,
      username,
      email,
      password,
      role,
    );

    if (affected === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Problem in updating admin." });
  }
}

// ! Delete admin controller
export async function remove(req, res) {
  try {
    const affectedRows = await adminsServices.deleteAdmin(req.params.id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Problem in deleting admin..." });
  }
}
