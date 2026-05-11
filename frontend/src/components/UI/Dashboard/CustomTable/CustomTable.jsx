import Loading from "../../Loading";
import TableContent from "./TableContent";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import { CircleAlert, InboxIcon } from "lucide-react";

export default function CustomTable({
  data,
  isFetching,
  error,
  columns,
  page,
  totalPages,
  noDataTitle,
  noDataMessage,
  onPageChange,
  handleOpenDelete,
  handleOpenEdit,
}) {
  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <CircleAlert size={22} className="text-red-400" />
        </div>
        <p className="text-sm font-medium text-gray-700">
          Something went wrong
        </p>
        <p className="text-xs text-gray-400">{error}</p>
      </div>
    );
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
          handleOpenEdit={handleOpenEdit}
        />
      </div>
      {/* Footer */}
      <TableFooter
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
