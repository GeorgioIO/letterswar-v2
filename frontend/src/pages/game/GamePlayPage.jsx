import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../store/slices/gameSlice";
import { generateBoardRequest } from "../../api/board.api";
import { useEffect } from "react";
import Board from "../../components/UI/Game/Board";
import TeamPanel from "../../components/UI/Game/TeamPanel";
import { getRandomQuestionRequest } from "../../api/questions.api";

export default function GamePlayPage() {
  const dispatch = useDispatch();

  const {
    board,
    teams,
    currentTurn,
    phase,
    activeCell,
    activeQuestion,
    usedQuestionIds,
    winner,
    answerMode,
  } = useSelector((state) => state.game);

  useEffect(() => {
    async function initBoard() {
      try {
        const board = await generateBoardRequest();
        dispatch(gameActions.setBoard(board));
      } catch (error) {
        console.log(error);
      }
    }
    initBoard();
  }, []);

  async function handleCellClick(cell) {
    if (phase !== "picking") return;

    dispatch(gameActions.setActiveCell(cell));
    dispatch(gameActions.setPhase("answering"));

    try {
      const question = await getRandomQuestionRequest(
        cell.letter,
        usedQuestionIds,
      );
      console.log(question);
      dispatch(gameActions.setActiveQuestion(question));
    } catch (error) {
      dispatch(gameActions.setPhase("picking"));
      dispatch(gameActions.setActiveCell(null));
    }
  }

  if (board.length === 0) {
    return <p>Loading board...</p>;
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
    </section>
  );
}
