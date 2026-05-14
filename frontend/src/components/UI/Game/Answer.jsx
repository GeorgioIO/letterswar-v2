export default function Answer({
  isAnswering,
  isStealing,
  answeringTeam,
  stealingTeam,
  onSubmitAnswer,
  answer,
  setAnswer,
}) {
  let inputClasses = `flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none`;
  let buttonClasses = `cursor-pointer px-4 py-3  rounded-xl text-white font-bold transition-colors`;

  if (isAnswering) {
    inputClasses +=
      answeringTeam === "orange"
        ? " focus:border-orange-500"
        : " focus:border-green-500";

    buttonClasses +=
      answeringTeam === "orange"
        ? " bg-orange-500 hover:bg-orange-600"
        : " bg-green-500 hover:bg-green-600";
  }

  if (isStealing) {
    inputClasses +=
      stealingTeam === "orange"
        ? " focus:border-orange-500"
        : " focus:border-green-500";

    buttonClasses +=
      stealingTeam === "orange"
        ? " bg-orange-500 hover:bg-orange-600"
        : " bg-green-500 hover:bg-green-600";
  }
  return (
    <div className="w-full flex gap-2">
      <input
        type="text"
        className={inputClasses}
        placeholder="Type your answer"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && onSubmitAnswer()}
      />
      <button className={buttonClasses} onClick={onSubmitAnswer}>
        Go
      </button>
    </div>
  );
}
