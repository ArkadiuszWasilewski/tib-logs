import { useState } from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
  });

  return (
    <div className="border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-800">
      <Table className="text-gray-900 dark:text-white">
        <TableHeader className="bg-gray-50 dark:bg-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-gray-900 dark:text-white font-medium p-2.5"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white dark:bg-gray-800">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-gray-900 dark:text-white p-2.5"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-gray-500 dark:text-gray-400"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4 px-4 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              const newPageSize = Number(value);
              setPageSize(newPageSize);
              table.setPageSize(newPageSize);
              setPageIndex(0); // Reset to first page
            }}
          >
            <SelectTrigger className="w-[120px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg p-2.5">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg">
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-900 dark:text-white">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log("Previous clicked");
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-700 dark:hover:text-white focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg text-sm px-5 py-2.5"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log("Next clicked");
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-700 dark:hover:text-white focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg text-sm px-5 py-2.5"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
