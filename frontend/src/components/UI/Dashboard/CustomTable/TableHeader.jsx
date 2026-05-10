export default function TableHeader({ columns }) {
  return (
    <header className="grid grid-cols-5 px-6 py-3 bg-orange-50 border-b border-orange-100 rounded-t-xl">
      {columns.map((col) => (
        <div
          key={col}
          className="text-xs font-semibold text-orange-400 uppercase tracking-wider"
        >
          {col}
        </div>
      ))}
    </header>
  );
}
