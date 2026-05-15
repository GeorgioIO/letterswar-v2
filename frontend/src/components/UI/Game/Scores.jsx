export default function Scores({ orangeCount, greenCount, teams }) {
  return (
    <div className="flex gap-4 w-full">
      <div className="flex-1 bg-orange-50 border border-orange-100 rounded-2xl p-3 flex flex-col items-center">
        <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">
          {teams.orange.name || "Orange"}
        </p>
        <p className="text-2xl font-black text-orange-500">{orangeCount}</p>
      </div>
      <div className="flex-1 bg-green-50 border border-green-100 rounded-2xl p-3 flex flex-col items-center">
        <p className="text-xs text-green-400 font-bold uppercase tracking-wider">
          {teams.green.name || "Green"}
        </p>
        <p className="text-2xl font-black text-green-500">{greenCount}</p>
      </div>
    </div>
  );
}
