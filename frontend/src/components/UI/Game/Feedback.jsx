export default function Feedback({ feedback }) {
  return (
    <div
      className={`text-center text-2xl font-black ${feedback === "correct" ? "text-green-500" : "text-red-500"}`}
    >
      {feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}
    </div>
  );
}
