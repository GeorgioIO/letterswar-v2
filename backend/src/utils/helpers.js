export function numberToLetter(num) {
  if (num < 1 || num > 26) return null;

  return String.fromCharCode(64 + num);
}

export function letterToNumber(letter) {
  if (typeof letter !== "string" || letter.length !== 1) {
    return "Invalid letter";
  }

  const upper = letter.toUpperCase();
  const code = upper.charCodeAt(0);

  if (code < 65 || code > 90) {
    return "Invalid letter";
  }

  return code - 64;
}
