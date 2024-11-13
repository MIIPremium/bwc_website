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
} from "@tanstack/react-table";
import Label from "src/ui/label";
import { Input } from "src/ui/input";

import {
  AddTaskForceColumns,
  AddEnTaskForceColumns,
  type AddTaskForceOrder,
} from "../../components/column/add-task-force-column";
import { useTranslation } from "react-i18next";
import { OrderDataTable } from "src/ui/order-data-table";
// import { ReferenceResp } from "src/types/validation";

export interface ReferenceProp {
  id: number;
  ar_name: string;
  en_name: string;
  ar_degree: string;
  en_degree: string;
  ar_role: string;
  en_role: string;
  img: string;
}

export type ReferenceResp = {
  id: number;
  ar_name: string;
  en_name: string;
  ar_degree: string;
  en_degree: string;
  ar_role: string;
  en_role: string;
  img: string;
};

type Taskforce = {
  data?: ReferenceResp[];
};

export default function TaskForceTable({ data }: Taskforce) {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const defaultData = useMemo<AddTaskForceOrder[]>(() => [], []);
  const columnsMemo = useMemo(() => AddTaskForceColumns, []);
  const columnsMemos = useMemo(() => AddEnTaskForceColumns, []);
  

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    // @ts-ignore
    data: data ?? defaultData,
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
  });

  return (
    <>
      {dir === "ltr" ? (
        <div className="max-w-screen-3xl mx-auto grid grid-cols-4 gap-2 px-12">
          <div className="col-span-4 mt-5 h-auto">
            <div className="">
              <div className="grid grid-cols-4 gap-2 text-right">
                {/* Start : input Text */}
                <div className=" col-span-1 h-auto">
                  <label htmlFor="" className="float-start">
                    employee name
                  </label>
                  <Input
                    placeholder="enter employee name"
                    value={
                      (table
                        .getColumn("en_name")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("en_name")
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
                  <Link to={"/admin-dashboard/taskforce/add-employee"}>
                    <Button className="text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-4 py-2 text-sm font-bold text-white ring-offset-background  transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      <Plus className="mr-2" />
                      Add employee
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
                  <Label text="اسم الموظف" />
                  <Input
                    placeholder="بحث باسم الموظف"
                    value={
                      (table
                        .getColumn("ar_name")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("ar_name")
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
                  <Link to={"/admin-dashboard/taskforce/add-employee"}>
                    <Button className="text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-4 py-2 text-sm font-bold text-white ring-offset-background  transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      <Plus className="ml-2" />
                      إضافة موظف
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
