import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../../store/slices/gameSlice";
import Timer from "./Timer";
import { useState } from "react";
import PhaseLabel from "./PhaseLabel";
import LetterBadge from "./LetterBadge";
import Answer from "./Answer";
import Feedback from "./Feedback";
import RevealAnswerButton from "./RevealAnswerButton";
import { checkWinner } from "../../../util/winDetection.js";
import VoiceCaptureButtons from "./VoiceCaptureButtons.jsx";

export default function QuestionOverlay() {
  const {
    currentTurn,
    phase,
    activeCell,
    activeQuestion,
    answerMode,
    teams,
    board,
    isAnswerRevealed,
  } = useSelector((state) => state.game);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const dispatch = useDispatch();

  if (!activeQuestion || phase === "picking" || phase === "gameover") return;

  const isAnswering = phase === "answering";
  const isStealing = phase === "stealing";
  const stealingTeam = currentTurn === "orange" ? "green" : "orange";
  const answeringTeam = isAnswering ? currentTurn : stealingTeam;

  function handleAfterCapture(updatedBoard, team) {
    dispatch(
      gameActions.captureCell({
        cellIndex: activeCell.index,
        team: team,
      }),
    );
    dispatch(gameActions.addUsedQuestion(activeQuestion.id));

    // Check winner
    const winner = checkWinner(updatedBoard);
    if (winner) {
      dispatch(gameActions.setWinner(winner));
      dispatch(gameActions.setPhase("gameover"));
      return true;
    }

    // All captured - no winner
    const allCaptured = updatedBoard.every((cell) => cell.owner !== null);
    if (allCaptured) {
      // count cells
      const orangeCount = updatedBoard.filter(
        (cell) => cell.owner === "orange",
      ).length;
      const greenCount = updatedBoard.filter(
        (cell) => cell.owner === "green",
      ).length;

      if (orangeCount > greenCount) {
        dispatch(gameActions.setWinner("orange"));
      } else if (greenCount > orangeCount) {
        dispatch(gameActions.setWinner("green"));
      } else {
        dispatch(gameActions.setWinner("tie"));
      }

      dispatch(gameActions.setPhase("gameover"));
      return true;
    }

    return false;
  }

  function handleCorrect() {
    // Update board to use the updated state before dispatch
    const updatedBoard = board.map((cell) =>
      cell.index === activeCell.index
        ? { ...cell, owner: answeringTeam }
        : cell,
    );

    const isOver = handleAfterCapture(updatedBoard, answeringTeam);
    if (isOver) return;

    setFeedback("correct");
    setTimeout(() => {
      setFeedback(null);
      setAnswer("");
      dispatch(gameActions.setActiveCell(null));
      dispatch(gameActions.setActiveQuestion(null));
      dispatch(gameActions.switchTurn());
      dispatch(gameActions.setPhase("picking"));
    }, 1500);
  }

  function handleWrong() {
    if (isAnswering) {
      dispatch(gameActions.setPhase("stealing"));
      setAnswer("");
    } else {
      dispatch(gameActions.addUsedQuestion(activeQuestion.id));
      setFeedback("wrong");

      setTimeout(() => {
        setFeedback(null);
        setAnswer("");
        dispatch(gameActions.setActiveCell(null));
        dispatch(gameActions.setActiveQuestion(null));
        dispatch(gameActions.switchTurn());
        dispatch(gameActions.setPhase("picking"));
      }, 1500);
    }
  }

  function handleTimeUp() {
    if (isAnswering) {
      dispatch(gameActions.setPhase("stealing"));
    } else {
      dispatch(gameActions.addUsedQuestion(activeQuestion.id));
      dispatch(gameActions.setActiveCell(null));
      dispatch(gameActions.setActiveQuestion(null));
      dispatch(gameActions.switchTurn());
      dispatch(gameActions.setPhase("picking"));
    }
  }

  function handleSubmitAnswer() {
    const isCorrect =
      answer.trim().toLowerCase() ===
      activeQuestion.answer.trim().toLowerCase();

    if (isCorrect) {
      handleCorrect();
    } else {
      handleWrong();
    }
  }

  function handleVoiceCapture(team) {
    // Update board to use the updated state before dispatch
    const updatedBoard = board.map((cell) =>
      cell.index === activeCell.index ? { ...cell, owner: team } : cell,
    );

    const isOver = handleAfterCapture(updatedBoard, team);
    if (isOver) return;

    dispatch(gameActions.toggleIsAnswerRevealed(false));
    dispatch(gameActions.setActiveCell(null));
    dispatch(gameActions.setActiveQuestion(null));
    dispatch(gameActions.switchTurn());
    dispatch(gameActions.setPhase("picking"));
  }

  function handleNobodyAnswered() {
    dispatch(gameActions.toggleIsAnswerRevealed(false));
    dispatch(gameActions.addUsedQuestion(activeQuestion.id));
    dispatch(gameActions.setActiveCell(null));
    dispatch(gameActions.setActiveQuestion(null));
    dispatch(gameActions.switchTurn());
    dispatch(gameActions.setPhase("picking"));
  }

  function handleRevealAnswer() {
    dispatch(gameActions.toggleIsAnswerRevealed(true));
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 flex flex-col items-center gap-5">
        {/* Phase label */}
        <PhaseLabel
          isStealing={isStealing}
          isAnswering={isAnswering}
          answeringTeam={answeringTeam}
          stealingTeam={stealingTeam}
        />
        {/* Letter Badge */}
        <LetterBadge
          letter={activeCell?.letter}
          isStealing={isStealing}
          isAnswering={isAnswering}
          answeringTeam={answeringTeam}
          stealingTeam={stealingTeam}
        />
        {/* Question  */}
        <p className="text-center text-lg font-bold text-gray-900 leading-snug">
          {activeQuestion.question_text}
        </p>
        {/* Timer */}
        <Timer
          duration={isAnswering ? 40 : 20}
          onTimeUp={handleTimeUp}
          paused={isAnswerRevealed}
        />

        {/* Feedback */}
        {feedback && <Feedback feedback={feedback} />}

        {/* Answer */}
        {!feedback && (
          <>
            {answerMode === "text" && (
              <Answer
                isStealing={isStealing}
                isAnswering={isAnswering}
                answeringTeam={answeringTeam}
                stealingTeam={stealingTeam}
                onSubmitAnswer={handleSubmitAnswer}
                answer={answer}
                setAnswer={setAnswer}
              />
            )}
            {answerMode === "voice" && (
              <>
                {!isAnswerRevealed ? (
                  <RevealAnswerButton
                    isStealing={isStealing}
                    isAnswering={isAnswering}
                    answeringTeam={answeringTeam}
                    stealingTeam={stealingTeam}
                    handleRevealAnswer={handleRevealAnswer}
                  />
                ) : (
                  <>
                    <p className="text-center font-bold text-gray-900">
                      {activeQuestion.answer}
                    </p>
                    <VoiceCaptureButtons
                      handleCapture={handleVoiceCapture}
                      handleNobody={handleNobodyAnswered}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
