import LetterCell from "./LetterCell";

export default function LettersGrid({ letters }) {
  return (
    <ul className="grid grid-cols-7 gap-3">
      {letters.map((letter) => (
        <LetterCell key={letter.id} letter={letter} />
      ))}
    </ul>
  );
}
