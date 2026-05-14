export default function PhaseLabel({
  isStealing,
  isAnswering,
  answeringTeam,
  stealingTeam,
}) {
  let stealingStyles = `inline-block bg-red-100 text-red-600 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full`;

  let answeringStyles = `inline-block text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full`;

  if (answeringTeam === "orange") {
    answeringStyles += " bg-orange-100 text-orange-600";
  } else {
    answeringStyles += " bg-green-100 text-green-600";
  }

  return (
    <div className="text-center">
      {isStealing && (
        <span className={stealingStyles}>
          🔥 Steal Oppurtunity - {stealingTeam} Team
        </span>
      )}
      {isAnswering && (
        <span className={answeringStyles}>{`${answeringTeam}'s`} TURN</span>
      )}
    </div>
  );
}
