import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../../store/slices/gameSlice";
import Timer from "./Timer";
import { useState } from "react";
import PhaseLabel from "./PhaseLabel";
import LetterBadge from "./LetterBadge";
import Answer from "./Answer";
import Feedback from "./Feedback";
import RevealAnswerButton from "./RevealAnswerButton";

export default function QuestionOverlay() {
  const { currentTurn, phase, activeCell, activeQuestion, answerMode, teams } =
    useSelector((state) => state.game);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const dispatch = useDispatch();

  if (!activeQuestion || phase === "picking" || phase === "gameover") return;

  const isAnswering = phase === "answering";
  const isStealing = phase === "stealing";
  const stealingTeam = currentTurn === "orange" ? "green" : "orange";
  const answeringTeam = isAnswering ? currentTurn : stealingTeam;

  function handleCorrect() {
    dispatch(
      gameActions.captureCell({
        cellIndex: activeCell.index,
        team: answeringTeam,
      }),
    );
    dispatch(gameActions.addUsedQuestion(activeQuestion.id));
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
    dispatch(
      gameActions.captureCell({
        cellIndex: activeCell.index,
        team,
      }),
    );
    dispatch(gameActions.addUsedQuestion(activeQuestion.id));

    setIsAnswerRevealed(false);
    dispatch(gameActions.setActiveCell(null));
    dispatch(gameActions.setActiveQuestion(null));
    dispatch(gameActions.switchTurn());
    dispatch(gameActions.setPhase("picking"));
  }

  function handleNobodyAnswered() {
    setIsAnswerRevealed(false);
    dispatch(gameActions.addUsedQuestion(activeQuestion.id));
    dispatch(gameActions.setActiveCell(null));
    dispatch(gameActions.setActiveQuestion(null));
    dispatch(gameActions.switchTurn());
    dispatch(gameActions.setPhase("picking"));
  }

  function handleRevealAnswer() {
    setIsAnswerRevealed(true);
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
                    <div className="flex gap-8">
                      <button
                        className="w-14 h-14 bg-gray-200 rounded-xl"
                        onClick={() => handleVoiceCapture("orange")}
                      >
                        🟧
                      </button>
                      <button
                        className="w-14 h-14 bg-gray-200 rounded-xl"
                        onClick={() => handleVoiceCapture("green")}
                      >
                        🟩
                      </button>
                      <button
                        className="w-14 h-14 bg-gray-200 rounded-xl"
                        onClick={handleNobodyAnswered}
                      >
                        ❌
                      </button>
                    </div>
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
