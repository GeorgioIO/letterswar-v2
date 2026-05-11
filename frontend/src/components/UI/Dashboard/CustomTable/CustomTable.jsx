import TableContent from "./TableContent";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

export default function CustomTable({
  data,
  isFetching,
  error,
  columns,
  page,
  totalPages,
  onPageChange,
  handleOpenDelete,
}) {
  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        {/* Header */}
        <TableHeader columns={columns} />
        {/* Content */}
        <TableContent data={data} handleOpenDelete={handleOpenDelete} />
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
