import { Row, flexRender } from "@tanstack/react-table";
import { TableRow, TableCell } from "@/components/atoms/table";
import { memo } from "react";

interface DataTableRowProps<TData> {
  row: Row<TData>;
}

function DataTableRowComponent<TData>({ row }: DataTableRowProps<TData>) {
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      className="border-white/10 transition-colors hover:bg-white/5"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

// React.memo with generics is tricky. Using `as` assertion.
export const DataTableRow = memo(DataTableRowComponent) as typeof DataTableRowComponent;
