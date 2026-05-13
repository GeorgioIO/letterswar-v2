import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { Zap, PlayCircle, Info } from "lucide-react";
import LetterStrip from "../../components/UI/Game/LetterStrip";
import { NavLink } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import InstructionsModal from "../../components/UI/Modals/InstructionsModal";

const CARDS = [
  ["26", "Letters"],
  ["500+", "Questions"],
  ["Strategy", "Rounds"],
];

export default function GameHomePage() {
  const instructionsModal = useModal();

  return (
    <section className="min-h-screen bg-orange-50 flex flex-col ">
      <InstructionsModal
        isOpen={instructionsModal.isOpen}
        handleClose={instructionsModal.close}
      />

      <Header className="flex justify-center" />

      <LetterStrip />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-5 md:px-10 gap-5 md:gap-7 py-10">
        <span className="inline-flex items-center gap-1.5 bg-orange-100 border border-orange-200 text-orange-700 text-xs font-medium px-4 py-1.5 rounded-full">
          <Zap size={12} /> Board trivia game
        </span>

        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 leading-tight tracking-tight">
          Letters
          <br />
          <span className="text-orange-500">War</span>
        </h1>

        <p className="text-gray-400 text-sm md:text-base max-w-65 md:max-w-sm leading-relaxed">
          Challenge your general knowledge. Battle letter by letter. Outsmart
          your opponent.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-70 md:max-w-75">
          <NavLink
            to="/game/setup"
            className="cursor-pointer h-13 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-base font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <PlayCircle size={20} /> Play now
          </NavLink>
          <button
            onClick={instructionsModal.open}
            className="cursor-pointer h-11.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Info size={15} className="text-gray-400" /> How to play
          </button>
        </div>

        <div className="flex items-center gap-5 md:gap-8 pt-2">
          {CARDS.map(([value, title], index, array) => (
            <div key={title} className="flex items-center gap-5 md:gap-8">
              <div className="text-center">
                <p className="text-lg md:text-xl font-medium text-orange-500">
                  {value}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{title}</p>
              </div>
              {index < array.length - 1 && (
                <div className="w-px h-7 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
}
