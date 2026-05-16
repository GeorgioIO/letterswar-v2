export default function TableContent({ data, renderRow }) {
  return (
    <section className="divide-y divide-gray-100">
      {data.map((row, index) => {
        if (index < 5) {
          return (
            <div
              key={index}
              className="grid grid-cols-3 px-6 py-4 items-center hover:bg-orange-50 transition-colors"
            >
              {renderRow(row)}
            </div>
          );
        }
      })}
    </section>
  );
}
