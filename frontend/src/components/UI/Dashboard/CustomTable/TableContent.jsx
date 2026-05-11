import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export default function TableContent({
  data,
  renderRow,
  handleOpenDelete,
  handleOpenEdit,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <section className="divide-y divide-gray-100">
      {data.map((row, i) => (
        <div
          key={row.id ?? i}
          className="grid grid-cols-5 px-6 py-4 items-center hover:bg-orange-50 transition-colors"
        >
          {renderRow(row)}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === i ? null : i)}
              className="cursor-pointer p-1.5 rounded-lg hover:bg-orange-100 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <MoreHorizontal size={18} />
            </button>

            {openMenu === i && (
              <div className="absolute right-0 top-8 z-10 w-40 bg-white border border-gray-100 rounded-xl shadow-md py-1.5 overflow-hidden">
                <button
                  onClick={() => handleOpenEdit(row)}
                  className="cursor-pointer  w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Pencil size={14} className="text-gray-400" />
                  Edit
                </button>
                <hr className="border-gray-100 mx-3" />
                <button
                  onClick={() => handleOpenDelete(row)}
                  className="cursor-pointer w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
