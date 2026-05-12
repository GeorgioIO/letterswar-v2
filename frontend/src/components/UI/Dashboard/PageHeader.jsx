import { Funnel, Plus } from "lucide-react";
import OutlineButton from "./Buttons/OutlineButton";
import Button from "./Buttons/Button";

export default function PageHeader({
  sectionTitle,
  addText,
  openFiltering,
  openAdd,
  limit,
  onLimitChange,
  onDeletedChange,
}) {
  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 h-15 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-900">{sectionTitle}</h2>

      <div className="flex items-center gap-3">
        {limit && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <label htmlFor="pagination">Showing</label>
            <select
              name="pagination"
              id="pagination"
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-300"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
        )}
        {onDeletedChange && (
          <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              name="show-deleted"
              id="show-deleted"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              onChange={onDeletedChange}
            />
            <label
              htmlFor="show-deleted"
              className="text-sm font-medium text-gray-600 cursor-pointer select-none"
            >
              Show deleted
            </label>
          </div>
        )}
        {openFiltering && (
          <OutlineButton onClick={openFiltering}>
            <Funnel size={15} /> Filter
          </OutlineButton>
        )}
        {openAdd && (
          <Button onClick={openAdd}>
            <Plus size={15} /> {addText}
          </Button>
        )}
      </div>
    </header>
  );
}
