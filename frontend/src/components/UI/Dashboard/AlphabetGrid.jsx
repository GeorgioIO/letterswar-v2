const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetGrid({ selected, handleSelectLetter }) {
  return (
    <div className="grid grid-cols-7 gap-1.5 mb-5">
      {letters.map((l) => (
        <button
          key={l}
          onClick={() => handleSelectLetter(l)}
          className={`cursor-pointer h-10 rounded-lg border text-sm font-medium transition-colors
                ${
                  selected === l
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500"
                }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
