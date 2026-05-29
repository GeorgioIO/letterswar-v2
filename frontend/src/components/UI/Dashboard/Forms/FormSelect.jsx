export default function FormSelect({
  label,
  id,
  options = [],
  placeholder = "Select an option",
  error,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <select
        id={id}
        className="h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-800 outline-none focus:border-orange-400 transition-colors cursor-pointer"
        {...props}
      >
        <option value="" defaultValue>
          {placeholder}
        </option>

        {options.map((letter, index) => {
          return (
            <option key={index} value={index + 1}>
              {letter}
            </option>
          );
        })}
      </select>
      {error && <span className="text-red-300 text-xs px-2">{error}</span>}
    </div>
  );
}
