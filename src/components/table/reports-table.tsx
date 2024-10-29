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
import image4 from "../../assets/img/1724086550980.jpg";
import {
  ReportColumns,
  ReportEnColumns,
  type ReportColProp,
} from "../column/report-column";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "src/ui/select";
import { OrderDataTable } from "src/ui/order-data-table";
import { axiosInstance } from "src/lib/http";
import { useTranslation } from "react-i18next";
// import { ReferenceResp } from "src/types/validation";
export interface ResponseReport {
  id: number;
  ar_Title: string;
  en_Title: string;
  img: string;
  ar_description: string;
  en_description: string;
  ar_executive_summary: string;
  en_executive_summary: string;
  ar_table_of_content: string[];
  en_table_of_content: string[];
  date_of_report: Date;
  date_of_publish: Date;
  pdfImg: string;
  pdfFile: string;
  an_note: string;
  en_note: string;
  listOfSections: any[];
}

export interface ReportProp {
  id: number;
  ar_Title: string;
  en_Title: string;
  img: string;
  ar_description: string;
  en_description: string;
  ar_executive_summary: string;
  en_executive_summary: string;
  ar_table_of_content: string[];
  en_table_of_content: string[];
  date_of_report: Date;
  date_of_publish: Date;
  pdfImg: string;
  pdfFile: string;
  an_note: string;
  en_note: string;
  listOfSections: any[];
}
export default function ReportTable() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const defaultData = useMemo<ReportColProp[]>(() => [], []);
  const columnsMemo = useMemo(() => ReportColumns, []);
  const columnsMemos = useMemo(() => ReportEnColumns, []);
  const [data, setData] = useState<ReportProp[]>([]);
  const fetchIssueById = async () => {
    try {
      const response = await axiosInstance.get<ResponseReport>(
        `/api/website/Reports`
      );
      return [response.data];
    } catch (error) {
      console.error("Error fetching issue:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchIssueById();
      setData(data);
    };

    getData();
  }, []);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    // @ts-ignore
    data: data.length ? data[0] : defaultData,
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
    // <>
    //   {dir === "ltr" ? (
    //     <div className="max-w-screen-3xl mx-auto grid grid-cols-4 gap-2 px-12">
    //       <div className="col-span-4 mt-5 h-auto">
    //         <div className="">
    //           <div className="grid grid-cols-4 gap-2 text-right">
    //             {/* Start : input Text */}
    //             <div className="text-start col-span-1 h-auto">
    //               <Label text="publication title" />
    //               <Input
    //                 placeholder="search by publication title"
    //                 value={
    //                   (table
    //                     .getColumn("en_Title")
    //                     ?.getFilterValue() as string) ?? ""
    //                 }
    //                 onChange={(event) =>
    //                   table
    //                     .getColumn("en_Title")
    //                     ?.setFilterValue(event.target.value)
    //                 }
    //               />
    //             </div>
    //             {/* End : input Text */}
    //           </div>
    //         </div>
    //         <div className=" grid grid-cols-4 w-full  items-start gap-4 ">
    //           <div className="col-span-1 ">
    //             {/* <p className="">اجمالي نتائج البحث : {orders?.length ?? 0}</p> */}
    //           </div>
    //           <div className="col-span-3">
    //             <div className="flex flex-row-reverse gap-4 ">
    //               <Select
    //                 dir="ltr"
    //                 onValueChange={(value) => {
    //                   if (value === "All") {
    //                     // Remove all sorting
    //                     table.setSorting([]);
    //                   } else {
    //                     table.setSorting([
    //                       {
    //                         id: "date_of_publish",
    //                         desc: value === "newest",
    //                       },
    //                     ]);
    //                   }
    //                 }}
    //               >
    //                 <SelectTrigger className="w-[180px] bg-[#d4d4d4]">
    //                   <SelectValue placeholder="Published Date Filter" />
    //                 </SelectTrigger>
    //                 <SelectContent className="bg-[#d4d4d4]">
    //                   <SelectGroup>
    //                     <SelectLabel>Published Date Filter</SelectLabel>
    //                     <SelectItem value="All">All</SelectItem>
    //                     <SelectItem value="oldest">oldest</SelectItem>
    //                     <SelectItem value="newest">newest</SelectItem>
    //                   </SelectGroup>
    //                 </SelectContent>
    //               </Select>
    //               <Select
    //                 dir="ltr"
    //                 onValueChange={(value) => {
    //                   table.setColumnFilters((prevFilters) => {
    //                     // Remove existing 'avaliable' filter
    //                     const filters = prevFilters.filter(
    //                       (filter) => filter.id !== "publish"
    //                     );

    //                     if (value === "all") {
    //                       // Return filters without 'publish' filter
    //                       return filters;
    //                     } else {
    //                       // Add the 'publish' filter based on the selected value
    //                       return [
    //                         ...filters,
    //                         {
    //                           id: "publish",
    //                           value: value === "publishing" ? true : false,
    //                         },
    //                       ];
    //                     }
    //                   });
    //                 }}
    //               >
    //                 <SelectTrigger className="w-[180px] bg-[#d4d4d4]">
    //                   <SelectValue placeholder="Publication Status" />
    //                 </SelectTrigger>
    //                 <SelectContent className="bg-[#d4d4d4]">
    //                   <SelectGroup>
    //                     <SelectLabel>Publication Status</SelectLabel>
    //                     <SelectItem value="all">All</SelectItem>
    //                     <SelectItem value="publishing">publishing</SelectItem>
    //                     <SelectItem value="unpublication">
    //                       unpublication
    //                     </SelectItem>
    //                   </SelectGroup>
    //                 </SelectContent>
    //               </Select>

    //               <Link to={`/admin-dashboard/reports/add-report`}>
    //                 <Button className="text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-4 py-2 text-sm font-bold text-white ring-offset-background  transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
    //                   <Plus className="mr-2" />
    //                   Add Report
    //                 </Button>
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="col-span-4 rounded-md">
    //         {/* @ts-ignore */}
    //         <OrderDataTable columns={columnsMemo} table={table} />
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="max-w-screen-3xl mx-auto grid grid-cols-4 gap-2 px-12">
    //       <div className="col-span-4 mt-5 h-auto">
    //         <div className="">
    //           <div className="grid grid-cols-4 gap-2 text-right">
    //             {/* Start : input Text */}
    //             <div className=" col-span-1 h-auto">
    //               <Label text="عنوان المنشور" />
    //               <Input
    //                 placeholder="بحث بعنوان المنشور"
    //                 value={
    //                   (table
    //                     .getColumn("ar_Title")
    //                     ?.getFilterValue() as string) ?? ""
    //                 }
    //                 onChange={(event) =>
    //                   table
    //                     .getColumn("ar_Title")
    //                     ?.setFilterValue(event.target.value)
    //                 }
    //               />
    //             </div>
    //             {/* End : input Text */}
    //           </div>
    //         </div>
    //         <div className=" grid grid-cols-4 w-full  items-start gap-4 ">
    //           <div className="col-span-1 ">
    //             {/* <p className="">اجمالي نتائج البحث : {orders?.length ?? 0}</p> */}
    //           </div>
    //           <div className="col-span-3">
    //             <div className="flex flex-row-reverse gap-4 ">
    //               <Select
    //                 dir="rtl"
    //                 onValueChange={(value) => {
    //                   if (value === "الجميع") {
    //                     // Remove all sorting
    //                     table.setSorting([]);
    //                   } else {
    //                     table.setSorting([
    //                       {
    //                         id: "date_of_publish",
    //                         desc: value === "الاحدث",
    //                       },
    //                     ]);
    //                   }
    //                 }}
    //               >
    //                 <SelectTrigger className="w-[180px] bg-[#d4d4d4]">
    //                   <SelectValue placeholder="فلتر بالتاريخ" />
    //                 </SelectTrigger>
    //                 <SelectContent className="bg-[#d4d4d4]">
    //                   <SelectGroup>
    //                     <SelectLabel>فلتر بالتاريخ</SelectLabel>
    //                     <SelectItem value="الجميع">الجميع</SelectItem>
    //                     <SelectItem value="الاقدم">الاقدم</SelectItem>
    //                     <SelectItem value="الاحدث">الاحدث</SelectItem>
    //                   </SelectGroup>
    //                 </SelectContent>
    //               </Select>
    //               <Select
    //                 dir="rtl"
    //                 onValueChange={(value) => {
    //                   table.setColumnFilters((prevFilters) => {
    //                     // Remove existing 'avaliable' filter
    //                     const filters = prevFilters.filter(
    //                       (filter) => filter.id !== "publish"
    //                     );

    //                     if (value === "الجميع") {
    //                       // Return filters without 'publish' filter
    //                       return filters;
    //                     } else {
    //                       // Add the 'publish' filter based on the selected value
    //                       return [
    //                         ...filters,
    //                         {
    //                           id: "publish",
    //                           value: value === "منشور" ? true : false,
    //                         },
    //                       ];
    //                     }
    //                   });
    //                 }}
    //               >
    //                 <SelectTrigger className="w-[180px] bg-[#d4d4d4]">
    //                   <SelectValue placeholder="فلتر بالحالة" />
    //                 </SelectTrigger>
    //                 <SelectContent className="bg-[#d4d4d4]">
    //                   <SelectGroup>
    //                     <SelectLabel>فلتر يحالة النشر</SelectLabel>
    //                     <SelectItem value="الجميع">الجميع</SelectItem>
    //                     <SelectItem value="منشور">منشور</SelectItem>
    //                     <SelectItem value="غير منشور">غير منشور</SelectItem>
    //                   </SelectGroup>
    //                 </SelectContent>
    //               </Select>
    //               <Link to={`/admin-dashboard/reports/add-report`}>
    //                 <Button className="text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-4 py-2 text-sm font-bold text-white ring-offset-background  transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
    //                   <Plus className="ml-2" />
    //                   اضافة تقرير
    //                 </Button>
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="col-span-4 rounded-md">
    //         {/* @ts-ignore */}
    //         <OrderDataTable columns={columnsMemo} table={table} />
    //       </div>
    //     </div>
    //   )}
    // </>
    <></>
  );
}
