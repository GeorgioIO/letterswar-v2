import ModePicker from "./ModePicker";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameActions } from "../../../../store/slices/gameSlice";

export default function SetupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gameMode, setGameMode] = useState("text");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let orangeTeamName = formData.get("orangeTeamName") || "Orange Team";
    let greenTeamName = formData.get("greenTeamName") || "Green Team";

    dispatch(gameActions.setTeamNames({ orangeTeamName, greenTeamName }));
    dispatch(gameActions.setAnswerMode(gameMode));
    navigate("/game/play");
  }

  function toggleMode(mode) {
    setGameMode(mode);
  }

  function goBack() {
    navigate("/game");
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="w-full max-w-[95%] md:max-w-2xl mx-auto p-4 md:p-8 bg-white rounded-4xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 "
    >
      {/* Left Side - Orange Team */}
      <div className="bg-linear-to-br from-orange-50/50 to-white p-5 rounded-2xl border-2 border-orange-100 shadow-sm transition-all hover:border-orange-200">
        <Input
          label="Orange Team"
          id="orangeTeamName"
          placeholder="Enter name"
          name="orangeTeamName"
          accentColor="border-orange-200 focus:border-orange-500 focus:ring-orange-100"
        />
      </div>

      {/* Right Side - Green Team */}
      <div className="bg-linear-to-br from-green-50/50 to-white p-5 rounded-2xl border-2 border-green-100 shadow-sm transition-all hover:border-green-200">
        <Input
          label="Green Team"
          id="greenTeamName"
          placeholder="Enter name"
          name="greenTeamName"
          accentColor="border-green-200 focus:border-green-500 focus:ring-green-100"
        />
      </div>

      {/* Bottom Side  */}
      <div className=" md:col-span-2 flex flex-col gap-8 justify-center mt-2 md:mt-4">
        <ModePicker pickedMode={gameMode} handleModeChange={toggleMode} />
        <div className="flex flex-col gap-4 justify-center">
          <button className="group relative cursor-pointer h-14 w-full md:w-64 md:self-center bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-lg font-bold shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3">
            Start Match
          </button>
          <button
            type="button"
            onClick={goBack}
            className="group relative cursor-pointer h-14 w-full md:w-64 md:self-center border border-gray-400 text-gray-400  rounded-2xl text-lg font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Go Back
          </button>
        </div>
      </div>
    </motion.form>
  );
}

function Input({ label, id, accentColor, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400 font-black px-1"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`w-full bg-white border-2 rounded-xl py-3 px-4 outline-none transition-all placeholder:text-slate-300 text-slate-700 font-semibold text-lg md:text-base ${accentColor} focus:ring-4`}
        id={id}
        {...props}
      />
    </div>
  );
}
