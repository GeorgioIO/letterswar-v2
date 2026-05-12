export function errorHandler(err, req, res, next) {
  if (err.code === "ER_DUP_ENTRY") {
    if (err.message.includes("email")) {
      return res.status(400).json({ message: "Email already in use." });
    }

    if (err.code) {
      return res.status(400).json({ message: "Username already in use." });
    }
    return res.status(400).json({ message: "Duplicate entry." });
  }

  // Foreign key violation
  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    return res
      .status(400)
      .json({ message: "Invalid reference — related record not found" });
  }

  // Generic fallback
  res.status(500).json({ message: err.message || "Internal server error" });
}
