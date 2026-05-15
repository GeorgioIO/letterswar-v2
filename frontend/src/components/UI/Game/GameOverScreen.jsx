import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../../store/slices/gameSlice";
import { generateBoardRequest } from "../../../api/board.api";
import { Home, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ResultBadge from "./ResultBadge";
import Scores from "./Scores";

export default function GameOverScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { winner, board, teams, phase, answerMode } = useSelector(
    (state) => state.game,
  );

  if (phase !== "gameover") return null;

  const orangeCount = board.filter((cell) => cell.owner === "orange").length;
  const greenCount = board.filter((cell) => cell.owner === "green").length;

  const isTie = winner === "tie";

  async function handlePlayAgain() {
    try {
      const newBoard = await generateBoardRequest();
      dispatch(gameActions.resetGame());
      dispatch(gameActions.setAnswerMode(answerMode));
      dispatch(
        gameActions.setTeamNames({
          orangeTeamName: teams.orange.name,
          greenTeamName: teams.green.name,
        }),
      );
      dispatch(gameActions.setBoard(newBoard));
    } catch (error) {
      console.error(error);
    }
  }

  function handleGoHome() {
    dispatch(gameActions.resetGame());
    navigate("/game");
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 flex flex-col items-center gap-5">
        {/* Result Badge */}
        <ResultBadge isTie={isTie} winner={winner} />

        {isTie ? (
          <>
            <h2 className="text-2xl font-black text-gray-900">It's a Tie!</h2>
            <p className="text-gray-400 text-sm">
              Both teams captured equal cells
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-black text-gray-900">
              {teams[winner]?.name || winner} Wins! 🎉
            </h2>
            <p className="text-gray-400 text-sm">
              {winner === "orange"
                ? "Connected left to right!"
                : "Connected top to bottom!"}
            </p>
          </>
        )}

        {/* Scores */}
        <Scores
          orangeCount={orangeCount}
          greenCount={greenCount}
          teams={teams}
        />

        <div className="w-full flex flex-col gap-2">
          <button
            onClick={handlePlayAgain}
            className="cursor-pointer w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw size={18} />
            Play Again
          </button>
          <button
            onClick={handleGoHome}
            className="cursor-pointer w-full h-12 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Home size={18} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
