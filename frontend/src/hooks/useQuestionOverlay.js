import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../store/slices/gameSlice";
import { checkWinner } from "../util/winDetection";

export function useQuestionOverlay() {
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

  const isAnswering = phase === "answering";
  const isStealing = phase === "stealing";
  const stealingTeam = currentTurn === "orange" ? "green" : "orange";
  const answeringTeam = isAnswering ? currentTurn : stealingTeam;

  // Runs after capturing a cell
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

  // Runs if answer is correct
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

  // Runs if answer is wrong
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

  // Runs if time is over
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

  // Runs when submitting in input mode
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

  // Runs when correct or wrong is picked in voice mode
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

  // Runs when nobody answers in voice mode
  function handleNobodyAnswered() {
    dispatch(gameActions.toggleIsAnswerRevealed(false));
    dispatch(gameActions.addUsedQuestion(activeQuestion.id));
    dispatch(gameActions.setActiveCell(null));
    dispatch(gameActions.setActiveQuestion(null));
    dispatch(gameActions.switchTurn());
    dispatch(gameActions.setPhase("picking"));
  }

  // Runs when we reveal answer in voice mode
  function handleRevealAnswer() {
    dispatch(gameActions.toggleIsAnswerRevealed(true));
  }

  return {
    // State
    answer,
    setAnswer,
    feedback,
    // Derived values
    isAnswering,
    isStealing,
    stealingTeam,
    answeringTeam,
    // Redux state
    board,
    currentTurn,
    phase,
    activeCell,
    activeQuestion,
    answerMode,
    teams,
    isAnswerRevealed,
    // Handlers
    handleCorrect,
    handleWrong,
    handleSubmitAnswer,
    handleAfterCapture,
    handleVoiceCapture,
    handleRevealAnswer,
    handleTimeUp,
    handleNobodyAnswered,
  };
}
