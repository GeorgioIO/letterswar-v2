export function requireSuperAdmin(req, res, next) {
  if (req.admin.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}
