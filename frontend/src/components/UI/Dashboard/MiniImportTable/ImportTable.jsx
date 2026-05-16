import TableContent from "./TableContent";
import TableHeader from "./TableHeader";

export default function ImportTable({ columns, data, renderRow }) {
  return (
    <div className="flex flex-col gap-5">
      <TableHeader columns={columns} />
      <TableContent data={data} renderRow={renderRow} />
    </div>
  );
}
