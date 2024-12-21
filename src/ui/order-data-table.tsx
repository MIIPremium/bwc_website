import {
  type ColumnDef,
  flexRender,
  type Table as TableType,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import NoResult from "src/assets/icons/no-result";
import { useTranslation } from "react-i18next";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: TableType<TData>;
}

export function OrderDataTable<TData, TValue>({
  columns,
  table,
}: DataTableProps<TData, TValue>) {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <>
      {dir === "ltr" ? (
        <div>
          <div className="rounded-lg border border-gray-200">
            <div className=" rounded-t-lg ">
              <Table className="min-w-full divide-y-2 divide-gray-200 text-xs ">
                <TableHeader className="bg-[#D4D4D4] text-right">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            className="whitespace-nowrap px-4 py-2 text-left  font-bold text-gray-900  "
                            key={header.id}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <div className="max-h-72 overflow-y-auto"></div>
                <TableBody className="text-gray-900  [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gray-100  ">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className="text-md whitespace-nowrap  px-4 py-2 font-bold over text-left"
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className=" h-24 text-center"
                      >
                        <div className=" w-full h-72 flex justify-center">
                          <NoResult />
                        </div>
                        <h1>there are no data</h1>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <DataTablePagination table={table} />
        </div>
      ) : (
        <div>
          <div className="rounded-lg border border-gray-200">
            <div className=" rounded-t-lg ">
              <Table className="min-w-full divide-y-2 divide-gray-200 text-xs ">
                <TableHeader className="bg-[#D4D4D4] text-right">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            className="whitespace-nowrap px-4 py-2 text-right  font-bold text-gray-900  "
                            key={header.id}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <div className="max-h-72 overflow-y-auto"></div>
                <TableBody className="text-gray-900  [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gray-100  ">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className="text-md whitespace-nowrap  px-4 py-2 font-bold over "
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className=" h-24 text-center"
                      >
                        <div className=" w-full h-72 flex justify-center">
                          <NoResult />
                        </div>
                        <h1>لا توجد بيانات</h1>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <DataTablePagination table={table} />
        </div>
      )}
    </>
  );
}
