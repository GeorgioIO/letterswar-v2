import { motion } from "framer-motion";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function LetterStrip() {
  return (
    <div className="relative h-12 md:h-14 overflow-hidden border-y border-orange-200">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex  whitespace-nowrap w-max"
      >
        {[...LETTERS, ...LETTERS].map((l, i) => (
          <span
            key={i}
            className={`w-10 h-12 md:w-14 md:h-14 inline-flex items-center justify-center text-base md:text-xl font-medium border-r border-orange-200
                ${i % 2 === 0 ? "text-orange-500 bg-orange-50" : "text-orange-300 bg-orange-100"}`}
          >
            {l}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
