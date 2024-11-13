import React, { useState, useMemo, useEffect } from "react";
import { Button } from "src/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  useReactTable,
  type ColumnFiltersState,
  type RowSelectionState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import {
  AddJobColumns,
  AddEnJobColumns,
  type AddJobOrder,
} from "../../components/column/job-column";

import { OrderDataTable } from "src/ui/order-data-table";
import { axiosInstance } from "src/lib/http";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "src/ui/select";
// import { ReferenceResp } from "src/types/validation";

export interface JobProp {
  id: number;
  ar_jobTitle: string;
  en_jobTitle: string;
  img: string;
  avaliable: boolean;
  publish: boolean;
  ar_basicDescription: string;
  en_basicDescription: string;
  ar_skiles: string[];
  en_skiles: string[];
  ar_advances: string[];
  en_advances: string[];
  formLink: string;
  endDate: Date;
}

export type JobResp = {
  id: number;
  ar_jobTitle: string;
  en_jobTitle: string;
  img: string;
  avaliable: boolean;
  publish: boolean;
  ar_basicDescription: string;
  en_basicDescription: string;
  ar_skiles: string[];
  en_skiles: string[];
  ar_advances: string[];
  en_advances: string[];
  formLink: string;
  endDate: Date;
};

export default function JobsTable() {
  const {  i18n } = useTranslation();
  const dir = i18n.dir();
  const defaultData = useMemo<AddJobOrder[]>(() => [], []);
  const columnsMemo = useMemo(() => AddJobColumns, []);
  const columnsMemos = useMemo(() => AddEnJobColumns, []);
  const [data, setData] = useState<JobProp[]>([]);
  const fetchJob = async () => {
    try {
      const response = await axiosInstance.get<JobResp>(`/api/Jobs`);
      return [response.data];
    } catch (error) {
      console.error("Error fetching issue:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchJob();
      setData(data);
    };

    getData();
  }, []);
  

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    // @ts-ignore
    data: data[0] ?? defaultData,
    // @ts-ignore
    columns: dir === "ltr" ? columnsMemos : columnsMemo,
    state: {
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    sortingFns: {
      myCustomSortingFn: (rowA, rowB, columnId) => {
        return rowA.original[columnId] > rowB.original[columnId] ? 1 : -1;
      },
    },
  });
  return (
    <>
      {dir === "ltr" ? (
        <div className="max-w-screen-3xl mx-auto grid grid-cols-4 gap-2 px-12">
          <div className="col-span-4 mt-5 h-auto">
            <div className="">
              <div className="text-start grid grid-cols-4 gap-2">
                {/* Start : input Text */}
                <div className=" col-span-1 h-auto">
                  <Label text="Job Name " />
                  <Input
                    placeholder="Enter Job Name ..."
                    value={
                      (table
                        .getColumn("en_jobTitle")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("en_jobTitle")
                        ?.setFilterValue(event.target.value)
                    }
                  />
                </div>
                {/* End : input Text */}
              </div>
            </div>
            <div className=" grid grid-cols-4 w-full  items-start gap-4 ">
              <div className="col-span-1 ">
                {/* <p className="">اجمالي نتائج البحث : {orders?.length ?? 0}</p> */}
              </div>
              <div className="col-span-3">
                <div className="flex flex-row-reverse gap-4 ">
                  <Select
                    onValueChange={(value) => {
                      if (value === "All") {
                        // Remove all sorting
                        table.setSorting([]);
                      } else {
                        table.setSorting([
                          {
                            id: "endDate",
                            desc: value === "newest",
                          },
                        ]);
                      }
                    }}
                  >
                    <SelectTrigger className="w-[180px] bg-[#d4d4d4]">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#d4d4d4]">
                      <SelectGroup>
                        <SelectLabel>Filter by date</SelectLabel>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="oldest">oldest</SelectItem>
                        <SelectItem value="newest">newest</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={(value) => {
                      table.setColumnFilters((prevFilters) => {
                        // Remove existing 'avaliable' filter
                        const filters = prevFilters.filter(
                          (filter) => filter.id !== "avaliable"
                        );

                        if (value === "All") {
                          // Return filters without 'avaliable' filter
                          return filters;
                        } else {
                          // Add the 'avaliable' filter based on the selected value
                          return [
                            ...filters,
                            {
                              id: "avaliable",
                              value: value === "available" ? true : false,
                            },
                          ];
                        }
                      });
                    }}
                  >
                    <SelectTrigger className="w-[180px] bg-[#d4d4d4]">
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#d4d4d4]">
                      <SelectGroup>
                        <SelectLabel>Filter Status</SelectLabel>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="available">available</SelectItem>
                        <SelectItem value="unavailable">unavailable</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Link to={"/admin-dashboard/jobs/add-job"}>
                    <Button className="text-lg inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-4 py-2 font-bold text-white ring-offset-background  transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      <Plus className="mr-2" />
                      add job
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 rounded-md">
            {/* @ts-ignore */}
            <OrderDataTable columns={columnsMemo} table={table} />
          </div>
        </div>
      ) : (
        <div className="max-w-screen-3xl mx-auto grid grid-cols-4 gap-2 px-12">
          <div className="col-span-4 mt-5 h-auto">
            <div className="">
              <div className="grid grid-cols-4 gap-2 text-right">
                {/* Start : input Text */}
                <div className=" col-span-1 h-auto">
                  <Label text="اسم الوظيفة " />
                  <Input
                    placeholder="بحث باسم الوظيفة ..."
                    value={
                      (table
                        .getColumn("ar_jobTitle")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("ar_jobTitle")
                        ?.setFilterValue(event.target.value)
                    }
                  />
                </div>
                {/* End : input Text */}
              </div>
            </div>
            <div className=" grid grid-cols-4 w-full  items-start gap-4 ">
              <div className="col-span-1 ">
                {/* <p className="">اجمالي نتائج البحث : {orders?.length ?? 0}</p> */}
              </div>
              <div className="col-span-3">
                <div className="flex flex-row-reverse gap-4 ">
                  <Select
                    dir="rtl"
                    onValueChange={(value) => {
                      if (value === "الجميع") {
                        // Remove all sorting
                        table.setSorting([]);
                      } else {
                        table.setSorting([
                          {
                            id: "endDate",
                            desc: value === "الاحدث",
                          },
                        ]);
                      }
                    }}
                  >
                    <SelectTrigger className="w-[180px] bg-[#d4d4d4]">
                      <SelectValue placeholder="فلتر بالتاريخ" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#d4d4d4]">
                      <SelectGroup>
                        <SelectLabel>فلتر بالتاريخ</SelectLabel>
                        <SelectItem value="الجميع">الجميع</SelectItem>
                        <SelectItem value="الاقدم">الاقدم</SelectItem>
                        <SelectItem value="الاحدث">الاحدث</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select
                    dir="rtl"
                    onValueChange={(value) => {
                      table.setColumnFilters((prevFilters) => {
                        // Remove existing 'avaliable' filter
                        const filters = prevFilters.filter(
                          (filter) => filter.id !== "avaliable"
                        );

                        if (value === "الجميع") {
                          // Return filters without 'avaliable' filter
                          return filters;
                        } else {
                          // Add the 'avaliable' filter based on the selected value
                          return [
                            ...filters,
                            {
                              id: "avaliable",
                              value: value === "متاحة" ? true : false,
                            },
                          ];
                        }
                      });
                    }}
                  >
                    <SelectTrigger className="w-[180px] bg-[#d4d4d4]">
                      <SelectValue placeholder="فلتر بالحالة" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#d4d4d4]">
                      <SelectGroup>
                        <SelectLabel>فلتر بالحالة</SelectLabel>
                        <SelectItem value="الجميع">الجميع</SelectItem>
                        <SelectItem value="متاحة">متاحة</SelectItem>
                        <SelectItem value="غير متاحة">غير متاحة</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Link to={"/admin-dashboard/jobs/add-job"}>
                    <Button className="text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-4 py-2 text-sm font-bold text-white ring-offset-background  transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      <Plus className="ml-2" />
                      اضافة وظيفة
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 rounded-md">
            {/* @ts-ignore */}
            <OrderDataTable columns={columnsMemo} table={table} />
          </div>
        </div>
      )}
    </>
  );
}
