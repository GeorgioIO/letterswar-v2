export function isValidEmail(email) {
  if (typeof email !== "string") return false;

  const normalized = email.trim().toLowerCase();

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(normalized);
}

export function isNotEmpty(value) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

export function notStrongPass(password) {
  return (
    password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)
  );
}
