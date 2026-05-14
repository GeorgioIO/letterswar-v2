export default function RevealAnswerButton({
  isStealing,
  isAnswering,
  answeringTeam,
  stealingTeam,
  handleRevealAnswer,
}) {
  let buttonClasses =
    "cursor-pointer px-4 py-3  rounded-xl text-white font-bold transition-colors";

  if (isAnswering) {
    buttonClasses +=
      answeringTeam === "orange"
        ? " bg-orange-500 hover:bg-orange-600"
        : " bg-green-500 hover:bg-green-600";
  }

  if (isStealing) {
    buttonClasses +=
      stealingTeam === "orange"
        ? " bg-orange-500 hover:bg-orange-600"
        : " bg-green-500 hover:bg-green-600";
  }

  return (
    <button className={buttonClasses} onClick={handleRevealAnswer}>
      Reveal Answer
    </button>
  );
}
