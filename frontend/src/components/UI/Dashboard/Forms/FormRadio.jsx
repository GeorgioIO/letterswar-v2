export default function FormRadio({
  label,
  name,
  error,
  options = [],
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <div className="flex items-center gap-4">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              className="accent-orange-500 w-4 h-4 cursor-pointer"
              {...props}
            />
            <span className="text-sm text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="text-red-300 text-xs px-2">{error}</span>}
    </div>
  );
}
