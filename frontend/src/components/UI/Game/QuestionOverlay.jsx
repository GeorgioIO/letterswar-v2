import Timer from "./Timer";
import PhaseLabel from "./PhaseLabel";
import LetterBadge from "./LetterBadge";
import Answer from "./Answer";
import Feedback from "./Feedback";
import RevealAnswerButton from "./RevealAnswerButton";
import VoiceCaptureButtons from "./VoiceCaptureButtons.jsx";
import { useQuestionOverlay } from "../../../hooks/useQuestionOverlay.js";

export default function QuestionOverlay() {
  const {
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
    phase,
    activeCell,
    activeQuestion,
    answerMode,
    isAnswerRevealed,
    // Handlers
    handleSubmitAnswer,
    handleVoiceCapture,
    handleRevealAnswer,
    handleTimeUp,
    handleNobodyAnswered,
  } = useQuestionOverlay();

  if (!activeQuestion || phase === "picking" || phase === "gameover") return;

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
