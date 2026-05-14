export default function LetterBadge({
  letter,
  isAnswering,
  isStealing,
  answeringTeam,
  stealingTeam,
}) {
  let bgColor = ``;

  if (isAnswering) {
    bgColor = answeringTeam === "orange" ? "bg-orange-400" : "bg-green-400";
  }

  if (isStealing) {
    bgColor = stealingTeam === "orange" ? "bg-orange-400" : "bg-green-400";
  }

  return (
    <div className="flex justify-center">
      <div
        className={`w-14 h-14 rounded-2xl ${bgColor} flex justify-center items-center`}
      >
        <span className="text-2xl text-white font-black">{letter}</span>
      </div>
    </div>
  );
}
