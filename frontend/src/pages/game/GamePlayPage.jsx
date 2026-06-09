import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../store/slices/gameSlice";
import { generateBoardRequest } from "../../api/board.api";
import { useEffect, useState } from "react";
import Board from "../../components/UI/Game/Board";
import TeamPanel from "../../components/UI/Game/TeamPanel";
import { getRandomQuestionRequest } from "../../api/questions.api";
import QuestionOverlay from "../../components/UI/Game/QuestionOverlay";
import GameOverScreen from "../../components/UI/Game/GameOverScreen";
import Loading from "../../components/UI/Loading";
import Error from "../../components/UI/Error";
import { Navigate } from "react-router-dom";

export default function GamePlayPage() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const { board, teams, currentTurn, phase, usedQuestionIds, isInitialized } =
    useSelector((state) => state.game);

  useEffect(() => {
    return () => {
      dispatch(gameActions.resetGame());
    };
  }, [dispatch]);

  useEffect(() => {
    async function initBoard() {
      try {
        const board = await generateBoardRequest();
        dispatch(gameActions.setBoard(board));
      } catch (error) {
        setError(error.response?.data?.message || "Board failed to load");
      }
    }
    initBoard();
  }, [dispatch]);

  async function handleCellClick(cell) {
    if (phase !== "picking") return;

    dispatch(gameActions.setActiveCell(cell));
    dispatch(gameActions.setPhase("answering"));

    try {
      const question = await getRandomQuestionRequest(
        cell.letter,
        usedQuestionIds,
      );
      dispatch(gameActions.setActiveQuestion(question));
    } catch {
      try {
        const question = await getRandomQuestionRequest(cell.letter, []);
        dispatch(gameActions.setActiveQuestion(question));
      } catch {
        dispatch(gameActions.setPhase("picking"));
        dispatch(gameActions.setActiveCell(null));
      }
    }
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  if (board.length === 0) {
    return <Loading />;
  }

  if (!isInitialized) {
    return <Navigate to="/game/setup" />;
  }

  return (
    <section className="min-h-screen px-5 py-10  flex flex-col gap-5 items-center justify-center">
      {/* Teams */}
      <div className="grid grid-cols-2 gap-3">
        <TeamPanel
          team="orange"
          name={teams.orange.name}
          isActive={currentTurn === "orange" && phase === "picking"}
        />
        <TeamPanel
          team="green"
          name={teams.green.name}
          isActive={currentTurn === "green" && phase === "picking"}
        />
      </div>
      <Board
        board={board}
        onCellClick={handleCellClick}
        currentTurn={currentTurn}
      />

      <div className="text-center">
        <p className="text-sm text-gray-500 font-medium">
          {phase === "picking" &&
            `${teams[currentTurn].name || currentTurn} — pick a cell`}
          {phase === "answering" &&
            `${teams[currentTurn].name || currentTurn} is answering...`}
          {phase === "stealing" && `Steal opportunity!`}
        </p>
      </div>

      <QuestionOverlay />

      <GameOverScreen />
    </section>
  );
}
