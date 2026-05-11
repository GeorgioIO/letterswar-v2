export default function LetterCell({ letter }) {
  let cssClasses =
    "flex flex-col items-center justify-center gap-1 p-4  rounded-xl transition-colors cursor-default";
  const isLow = letter.questions_count < 10;

  if (isLow) {
    cssClasses += " bg-red-100 border-2 border-red-200 hover:bg-red-200";
  } else {
    cssClasses +=
      " bg-white  border border-gray-100  hover:border-orange-300 hover:bg-orange-50";
  }

  return (
    <li className={cssClasses}>
      <span className="text-2xl font-bold text-orange-500">
        {letter.letter}
      </span>
      <span className="text-xs text-gray-400 font-medium">
        {letter.questions_count} Q
      </span>
    </li>
  );
}
