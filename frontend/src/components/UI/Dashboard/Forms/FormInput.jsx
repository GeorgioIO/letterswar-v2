export default function FormInput({
  label,
  id,
  error,
  toggleButton,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <div className="w-full flex items-center gap-2">
        <input
          className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-800 outline-none focus:border-orange-400 transition-colors placeholder:text-gray-300"
          id={id}
          {...props}
        />
        {toggleButton && toggleButton}
      </div>
      {error && <span className="text-red-300 text-xs px-2">{error}</span>}
    </div>
  );
}
