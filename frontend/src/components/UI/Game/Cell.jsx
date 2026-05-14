export default function Cell({ cell, onCellClick, currentTurn }) {
  const isOwned = cell.owner !== null;

  let cellClasses = `aspect-square flex items-center justify-center
    rounded-xl text-lg font-black cursor-pointer
    transition-all active:scale-95 select-none
    border-2`;

  if (cell.owner === "orange") {
    cellClasses += " bg-orange-500 border-orange-600 text-white";
  } else if (cell.owner === "green") {
    cellClasses += " bg-green-500 border-green-600 text-white";
  } else {
    cellClasses += " bg-white border-gray-200 text-gray-700";
  }

  if (currentTurn === "orange") {
    cellClasses += " hover:border-orange-300 hover:bg-orange-50";
  } else {
    cellClasses += " hover:border-green-300 hover:bg-green-50";
  }

  function handleClick() {
    if (isOwned) return;
    onCellClick(cell);
  }

  return (
    <div className={cellClasses} onClick={handleClick}>
      {cell.letter}
    </div>
  );
}
