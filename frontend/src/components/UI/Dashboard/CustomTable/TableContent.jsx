import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

export default function TableContent({ data }) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <section className="divide-y divide-gray-100">
      {data.map((row, i) => (
        <div
          key={row.id ?? i}
          className="grid grid-cols-5 px-6 py-4 items-center hover:bg-orange-50 transition-colors"
        >
          <div className="text-sm font-semibold text-orange-500">
            {row.letter}
          </div>
          <div className="text-sm text-gray-700 truncate pr-4">
            {row.question_text}
          </div>
          <div className="text-sm text-gray-700 truncate pr-4">
            {row.answer}
          </div>
          <div className="text-sm text-gray-500">{row.created_by}</div>

          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === i ? null : i)}
              className="p-1.5 rounded-lg hover:bg-orange-100 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <MoreHorizontal size={18} />
            </button>

            {openMenu === i && (
              <div className="absolute right-0 top-8 z-10 w-36 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5">
                {/* buttons go here */}
                <button>Edit</button>
                <button>Delete</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
