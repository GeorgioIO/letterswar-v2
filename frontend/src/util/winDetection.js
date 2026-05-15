export function getNeighbors(index) {
  const row = Math.floor(index / 5);
  const col = index % 5;

  const neighbors = [];

  if (row > 0) neighbors.push(index - 5);
  if (row < 4) neighbors.push(index + 5);
  if (col > 0) neighbors.push(index - 1);
  if (col < 4) neighbors.push(index + 1);

  if (row > 0 && col < 4) neighbors.push(index - 4);
  if (row < 4 && col > 0) neighbors.push(index + 4);

  return neighbors;
}

export function checkWinner(board) {
  const orangeWon = hasPath(
    board,
    "orange",
    board.filter((cell) => cell.index % 5 === 0 && cell.owner === "orange"),
    (cell) => cell.index % 5 === 4,
  );

  if (orangeWon) return "orange";

  const greenWon = hasPath(
    board,
    "green",
    board.filter((cell) => cell.index < 5 && cell.owner === "green"),
    (cell) => cell.index >= 20,
  );
  if (greenWon) return "green";

  return null;
}

export function hasPath(board, team, startCells, reachedGoal) {
  // To store visited cells
  const visited = new Set();

  // Locations to start from
  const queue = [...startCells];

  while (queue.length > 0) {
    const current = queue.shift();

    if (reachedGoal(current)) return true;
    if (visited.has(current.index)) continue;

    visited.add(current.index);

    const neighbors = getNeighbors(current.index);
    neighbors.forEach((neighborIndex) => {
      const neighbor = board[neighborIndex];
      if (neighbor && neighbor.owner === team && !visited.has(neighbor.index)) {
        queue.push(neighbor);
      }
    });
  }
  return false;
}
