import { TextCursor, AudioLines } from "lucide-react";
import { useState } from "react";

const defaultButtonClasses = `cursor-pointer flex-1 flex justify-center items-center gap-2 py-2 px-4 text-sm font-bold rounded-lg transition-all`;

export default function ModePicker() {
  const [mode, setMode] = useState("input");

  const active = "bg-white text-orange-600 shadow-sm border border-orange-100";

  const inputButtonClasses =
    mode === "input"
      ? `${defaultButtonClasses} ${active}`
      : defaultButtonClasses;

  const voiceButtonClasses =
    mode === "voice"
      ? `${defaultButtonClasses} ${active}`
      : defaultButtonClasses;

  function toggleMode(mode) {
    setMode(mode);
  }

  return (
    <div className="md:col-span-2 flex flex-col gap-6 items-center mt-4 md:mt-6">
      <div className="w-full flex flex-col items-center gap-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
          Pick a mode
        </p>
        <div className="flex gap-1 w-full max-w-75 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => toggleMode("input")}
            type="button"
            className={inputButtonClasses}
          >
            <TextCursor size={18} />
            Input
          </button>
          <button
            onClick={() => toggleMode("voice")}
            type="button"
            className={voiceButtonClasses}
          >
            <AudioLines size={18} />
            Voice
          </button>
        </div>
      </div>
    </div>
  );
}
