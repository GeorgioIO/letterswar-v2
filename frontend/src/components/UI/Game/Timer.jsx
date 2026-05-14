import { useEffect, useState } from "react";

export default function Timer({ duration, onTimeUp, paused }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // This set the time the first time , and reruns whenever duration changes , useEffect() to prevent setTimeLEft to run again and enter a loop
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (paused) return;
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, paused]);

  const percentage = (timeLeft / duration) * 100;

  const barColor =
    timeLeft > duration * 0.5
      ? "bg-green-500"
      : timeLeft > duration * 0.25
        ? "bg-orange-500"
        : "bg-red-500";

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <p className="text-3xl font-black text-gray-900">{timeLeft}</p>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
