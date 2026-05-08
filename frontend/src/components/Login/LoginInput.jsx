export default function LoginInput({ LeftIcon, right, error, ...props }) {
  let classes =
    "flex items-center gap-2 h-[42px] px-3 mb-2 rounded-xl bg-slate-100  focus-within:bg-white transition-all";

  if (error) {
    classes += " border border-red-400  focus-within:border-black/20";
  } else {
    classes += " border border-black/8  focus-within:border-black/20";
  }

  return (
    <div className="flex flex-col">
      <div className={classes}>
        <LeftIcon size={16} color="#8A929F" />

        <input
          {...props}
          className="flex-1 bg-transparent outline-none text-[13px] text-gray-800
      placeholder:text-slate-500"
        />
        {right && right}
      </div>
      {error && <span className="text-red-300 text-xs px-2">{error}</span>}
    </div>
  );
}
