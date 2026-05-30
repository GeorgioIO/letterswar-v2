import Loading from "../../Loading";
import TableContent from "./TableContent";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import { InboxIcon } from "lucide-react";

export default function CustomTable({
  data,
  isLoading,
  isPlaceholderData,
  columns,
  page,
  showDeleted,
  totalPages,
  noDataTitle,
  noDataMessage,
  onPageChange,
  handleOpenDelete,
  handleOpenRestore,
  handleOpenEdit,
  renderRow,
}) {
  if (isLoading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
          <InboxIcon size={22} className="text-orange-400" />
        </div>
        <p className="text-sm font-medium text-gray-700">{noDataTitle}</p>
        <p className="text-xs text-gray-400">{noDataMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        {/* Header */}
        <TableHeader columns={columns} />
        {/* Content */}
        <TableContent
          data={data}
          handleOpenDelete={handleOpenDelete}
          handleOpenRestore={handleOpenRestore}
          handleOpenEdit={handleOpenEdit}
          renderRow={renderRow}
          showDeleted={showDeleted}
        />
      </div>
      {/* Footer */}
      <TableFooter
        isPlaceholderData={isPlaceholderData}
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
