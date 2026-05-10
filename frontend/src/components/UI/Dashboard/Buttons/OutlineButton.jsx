export default function OutlineButton({ children, onClick, className = "" }) {
  return (
    <button
      className={`cursor-pointer inline-flex items-center gap-2 px-4 h-9 border border-gray-200 hover:border-gray-300 text-gray-600 text-sm font-medium rounded-lg transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
