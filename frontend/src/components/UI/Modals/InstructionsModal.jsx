import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import { Info, Trophy, Swords, Zap, Timer } from "lucide-react";

const sections = [
  {
    icon: <Trophy size={18} className="text-orange-500" />,
    title: "How to Win",
    content: [
      "🟧 Orange - connect a path from left to rgiht (or right to left)",
      "🟩 Green - connect a path from top to bottom (or bottom to top)",
      "Path doesn't have to be straight!",
    ],
  },
  {
    icon: <Swords size={18} className="text-orange-500" />,
    title: "How to Play",
    content: [
      "Teams take turns picking a cell on the board",
      "Each cell has a letter - your answer must start with that letter",
      "Answer correctly to capture the cell for your team",
    ],
  },
  {
    icon: <Zap size={18} className="text-orange-500" />,
    title: "Stealing",
    content: [
      "If a team fails to answer, the opponent gets 20 seconds to steal",
      "Answer correctly during steal -> you capture the cell",
      "Nobody answers -> cells stay neutral",
    ],
  },
  {
    icon: <Timer size={18} className="text-orange-500" />,
    title: "Timers",
    content: [
      "40 seconds to answer your question",
      "20 seconds to steal if opponent fails",
    ],
  },
  {
    icon: <Trophy size={18} className="text-orange-500" />,
    title: "Tiebreaker",
    content: [
      "If all cells are captured with no path winner",
      "Team with most captured cells wins",
    ],
  },
];

export default function InstructionsModal({ isOpen, handleClose }) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalHeader
        title="How to Play ?"
        Icon={Info}
        handleClose={handleClose}
      />
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-1">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {section.icon}
              <h3 className="text-sm font-bold text-gray-900">
                {section.title}
              </h3>
            </div>
            <ul className="flex flex-col gap-1 pl-2">
              {section.content.map((item, i) => (
                <li
                  key={i}
                  className="text-xs text-gray-500 leading-relaxed flex gap-2"
                >
                  <span className="text-orange-300 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="h-px bg-gray-100" />
          </div>
        ))}
      </div>
    </Modal>
  );
}
