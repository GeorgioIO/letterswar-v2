export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer inline-flex items-center gap-2 px-4 h-9 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
