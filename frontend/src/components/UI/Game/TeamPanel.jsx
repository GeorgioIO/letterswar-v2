import { motion } from "framer-motion";

export default function TeamPanel({ team, name, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`
      flex flex-col items-center gap-1 p-3 rounded-2xl transition-all
      ${
        team === "orange"
          ? "bg-orange-500 text-white"
          : "bg-green-500 text-white"
      }
      ${isActive ? "scale-110 shadow-lg" : "opacity-60"}
    `}
    >
      <p className="text-xs font-bold uppercase tracking-wider opacity-80">
        {team}
      </p>
      <p className="text-base font-black">{name || `${team} team`}</p>
    </motion.div>
  );
}
