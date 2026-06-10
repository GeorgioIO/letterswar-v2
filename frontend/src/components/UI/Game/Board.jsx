import Cell from "./Cell";
import { motion } from "framer-motion";

export default function Board({ board, onCellClick, currentTurn }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="
      p-2.5
      grid grid-cols-5 gap-2 w-full max-w-sm mx-auto 
      border-y-4 border-t-green-500 border-b-green-500 
      border-x-4 border-l-orange-500 border-r-orange-500
      rounded-xl
    "
    >
      {board.map((cell) => (
        <Cell
          key={cell.index}
          cell={cell}
          onCellClick={onCellClick}
          currentTurn={currentTurn}
        />
      ))}
    </motion.div>
  );
}
