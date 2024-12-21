import { type Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Pagination, PaginationContent, PaginationItem } from "./pagination";
import { Button } from "./button";
import { useTranslation } from "react-i18next";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  function getPaginationArr() {
    const currentPage = table.getState().pagination.pageIndex;
    const result: number[] = [];
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i < 0) {
        continue;
      }
      if (i > table.getPageCount() - 1) {
        continue;
      }
      result.push(i + 1);
    }
    return result;
  }

  return (
    <>
      {dir === "ltr" ? (
        <div className="my-2 flex flex-row items-center justify-between px-2 ">
          <div className=" basis-[30%]  text-sm text-muted-foreground"></div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant={"outline"}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <svg
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 17 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.8516 6.92578H1M1 6.92578L6.29734 12.2231M1 6.92578L6.29734 1.62845"
                      stroke="#272829"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="px-4 text-xs font-bold">prev</span>
                </Button>
              </PaginationItem>
              {table.getState().pagination.pageIndex != 0 &&
                !getPaginationArr().includes(1) && (
                  <>
                    <PaginationItem className="flex justify-center rounded-md px-2">
                      <Button
                        className={
                          table.getState().pagination.pageIndex == 0
                            ? "bg-primary text-white"
                            : ""
                        }
                        variant={"outline"}
                        onClick={() => table.setPageIndex(0)}
                        disabled={table.getState().pagination.pageIndex == 0}
                      >
                        {1}
                      </Button>
                    </PaginationItem>
                    <PaginationItem className="flex justify-center rounded-md px-2">
                      ...
                    </PaginationItem>
                  </>
                )}
              {getPaginationArr().map((value, i) => (
                <PaginationItem
                  className="flex justify-center rounded-md px-2"
                  key={i}
                >
                  <Button
                    className={
                      table.getState().pagination.pageIndex == i
                        ? "bg-primary text-white"
                        : ""
                    }
                    variant={"outline"}
                    onClick={() => table.setPageIndex(i)}
                    disabled={table.getState().pagination.pageIndex == i}
                  >
                    {value}
                  </Button>
                </PaginationItem>
              ))}
              {table.getPageCount() != 0 &&
                table.getState().pagination.pageIndex !=
                  table.getPageCount() - 1 &&
                !getPaginationArr().includes(table.getPageCount()) && (
                  <>
                    <PaginationItem className="flex justify-center rounded-md px-2">
                      ...
                    </PaginationItem>
                    <PaginationItem className="flex justify-center rounded-md px-2">
                      <Button
                        className={
                          table.getState().pagination.pageIndex ==
                          table.getPageCount() - 1
                            ? "bg-primary text-white"
                            : ""
                        }
                        variant={"outline"}
                        onClick={() =>
                          table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={
                          table.getState().pagination.pageIndex ==
                          table.getPageCount() - 1
                        }
                      >
                        {table.getPageCount()}
                      </Button>
                    </PaginationItem>
                  </>
                )}

              {/* {
            table.getPageCount() > table.getState().pagination.pageIndex && (
              <PaginationItem>...</PaginationItem>
            )} */}

              {/* <div className="flex h-14 w-80 justify-center overflow-x-auto rounded-md px-2">
            <Button className="bg-primary text-white">4</Button>
            <Button className="bg-primary text-white">4</Button>
            <Button className="bg-primary text-white">4</Button>
            <Button className="bg-primary text-white">4</Button>
          </div> */}

              <PaginationItem>
                <Button
                  variant={"outline"}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="px-4 text-xs font-bold">next</span>

                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 17 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 6.42578H15.8516M15.8516 6.42578L10.5542 1.12845M15.8516 6.42578L10.5542 11.7231"
                      stroke="#272829"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex basis-[30%] items-center gap-2 ">
            <div className="flex items-center">
              <p className="px-1 text-sm font-medium">cell </p>
              <Select
                value={`${table.getState().pagination.pageSize}`} // Default to 5 if no value is set
                onValueChange={(value) => {
                  table.setPageSize(Number(value)); // Set the page size based on user selection
                }}
              >
                <SelectTrigger className="m-1 h-8 w-[60px]">
                  <SelectValue
                    placeholder={`${table.getState().pagination.pageSize}`}
                  />
                </SelectTrigger>
                <SelectContent defaultValue={5} side="top" className="bg-white">
                  {[5, 10, 15, 20].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full text-left text-sm font-medium">
              <p>
                page {table.getState().pagination.pageIndex + 1} from{" "}
                {table.getPageCount()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-2 flex flex-row items-center justify-between px-2 ">
          <div className=" basis-[30%]  text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} من{" "}
            {table.getFilteredRowModel().rows.length} سطر (s) المحددة.
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant={"outline"}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 17 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 6.42578H15.8516M15.8516 6.42578L10.5542 1.12845M15.8516 6.42578L10.5542 11.7231"
                      stroke="#272829"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="px-4 text-xs font-bold">السابق</span>
                </Button>
              </PaginationItem>
              {table.getState().pagination.pageIndex != 0 &&
                !getPaginationArr().includes(1) && (
                  <>
                    <PaginationItem className="flex justify-center rounded-md px-2">
                      <Button
                        className={
                          table.getState().pagination.pageIndex == 0
                            ? "bg-primary text-white"
                            : ""
                        }
                        variant={"outline"}
                        onClick={() => table.setPageIndex(0)}
                        disabled={table.getState().pagination.pageIndex == 0}
                      >
                        {1}
                      </Button>
                    </PaginationItem>
                    <PaginationItem className="flex justify-center rounded-md px-2">
                      ...
                    </PaginationItem>
                  </>
                )}
              {getPaginationArr().map((value, i) => (
                <PaginationItem
                  className="flex justify-center rounded-md px-2"
                  key={i}
                >
                  <Button
                    className={
                      table.getState().pagination.pageIndex == i
                        ? "bg-primary text-white"
                        : ""
                    }
                    variant={"outline"}
                    onClick={() => table.setPageIndex(i)}
                    disabled={table.getState().pagination.pageIndex == i}
                  >
                    {value}
                  </Button>
                </PaginationItem>
              ))}
              {table.getPageCount() != 0 &&
                table.getState().pagination.pageIndex !=
                  table.getPageCount() - 1 &&
                !getPaginationArr().includes(table.getPageCount()) && (
                  <>
                    <PaginationItem className="flex justify-center rounded-md px-2">
                      ...
                    </PaginationItem>
                    <PaginationItem className="flex justify-center rounded-md px-2">
                      <Button
                        className={
                          table.getState().pagination.pageIndex ==
                          table.getPageCount() - 1
                            ? "bg-primary text-white"
                            : ""
                        }
                        variant={"outline"}
                        onClick={() =>
                          table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={
                          table.getState().pagination.pageIndex ==
                          table.getPageCount() - 1
                        }
                      >
                        {table.getPageCount()}
                      </Button>
                    </PaginationItem>
                  </>
                )}

              {/* {
            table.getPageCount() > table.getState().pagination.pageIndex && (
              <PaginationItem>...</PaginationItem>
            )} */}

              {/* <div className="flex h-14 w-80 justify-center overflow-x-auto rounded-md px-2">
            <Button className="bg-primary text-white">4</Button>
            <Button className="bg-primary text-white">4</Button>
            <Button className="bg-primary text-white">4</Button>
            <Button className="bg-primary text-white">4</Button>
          </div> */}

              <PaginationItem>
                <Button
                  variant={"outline"}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="px-4 text-xs font-bold">التالي</span>
                  <svg
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 17 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.8516 6.92578H1M1 6.92578L6.29734 12.2231M1 6.92578L6.29734 1.62845"
                      stroke="#272829"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex basis-[30%] items-center gap-2 ">
            <div className="flex items-center">
              <p className="px-1 text-sm font-medium">الاسطر </p>
              <Select
                value={`${table.getState().pagination.pageSize}`} // Default to 5 if no value is set
                onValueChange={(value) => {
                  table.setPageSize(Number(value)); // Set the page size based on user selection
                }}
              >
                <SelectTrigger className="m-1 h-8 w-[60px]">
                  <SelectValue
                    placeholder={`${table.getState().pagination.pageSize}`}
                  />
                </SelectTrigger>
                <SelectContent defaultValue={5} side="top" className="bg-white">
                  {[5, 10, 15, 20].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full text-left text-sm font-medium">
              <p>
                الصفحة {table.getState().pagination.pageIndex + 1} من{" "}
                {table.getPageCount()}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
