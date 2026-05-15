export default function VoiceCaptureButtons({ handleCapture, handleNobody }) {
  return (
    <div className="flex gap-8">
      <button
        className="w-14 h-14 bg-gray-200 rounded-xl"
        onClick={() => handleCapture("orange")}
      >
        🟧
      </button>
      <button
        className="w-14 h-14 bg-gray-200 rounded-xl"
        onClick={() => handleCapture("green")}
      >
        🟩
      </button>
      <button
        className="w-14 h-14 bg-gray-200 rounded-xl"
        onClick={handleNobody}
      >
        ❌
      </button>
    </div>
  );
}
