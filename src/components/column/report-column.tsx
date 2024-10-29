import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "../../ui/button";
import DeleteDialog from "../dailog/delete-dialog";
import { Link } from "react-router-dom";
import EditIcon from "src/assets/icons/edit-icon";
import Tooltip from "src/ui/tooltap";

import ChangePublishesStatusPostDialog from "../dailog/change-publish-publishes";

export interface ReportColProp {
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

export const ReportColumns: ColumnDef<ReportColProp>[] = [
  {
    id: "img",
    accessorKey: "img",
    header: "ص",
    cell: ({ row }) => {
      return (
        <div className=" w-[50px] h-[50px] rounded-full">
          <img
            src={row.original.img}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      );
    },
  },
  {
    accessorKey: "ar_Title",
    header: "العنوان",
  },
  {
    accessorKey: "date_of_report",
    header: "تاريخ التقرير",
    cell: ({ row }) => {
      return <p>{String(row.original.date_of_report).split("T")[0]}</p>;
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "pdfImg",
    header: "ص",
    cell: ({ row }) => {
      return (
        <div className=" w-[50px] h-[50px] rounded-full">
          <img
            src={row.original.pdfImg}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      //   const { data: session } = useSession();

      return (
        <div className="flex justify-center ">
          <Link to={`/admin-dashboard/update-publications/${row.original?.id}`}>
            <Tooltip text="تعديل">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/reports/info/${row.original.id}`}>
            <Tooltip text="عرض">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <Eye className="" />
              </Button>
            </Tooltip>
          </Link>
          {/* <Tooltip text="تغير حالة النشر">
            <ChangePublishesStatusPostDialog id={row.original.id} />
          </Tooltip> */}
          <Tooltip text="حذف">
            <DeleteDialog
              url={`/api/Reports/${row.original?.id}`}
              path={"/admin-dashboard/reports"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];

export const ReportEnColumns: ColumnDef<ReportColProp>[] = [
  {
    id: "img",
    accessorKey: "img",
    header: "img",
    cell: ({ row }) => {
      return (
        <div className=" w-[50px] h-[50px] rounded-full">
          <img
            src={row.original.img}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      );
    },
  },
  {
    accessorKey: "en_Title",
    header: "report title",
  },
  {
    accessorKey: "date_of_report",
    header: "Date of Report",
    cell: ({ row }) => {
      return <p>{String(row.original.date_of_report).split("T")[0]}</p>;
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "pdfImg",
    header: "PDF Image",
    cell: ({ row }) => {
      return (
        <div className=" w-[50px] h-[50px] rounded-full">
          <img
            src={row.original.pdfImg}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      //   const { data: session } = useSession();

      return (
        <div className="flex justify-center ">
          <Link to={`/admin-dashboard/update-publications/${row.original?.id}`}>
            <Tooltip text="Edit">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/reports/info/${row.original.id}`}>
            <Tooltip text="view">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <Eye className="" />
              </Button>
            </Tooltip>
          </Link>
          {/* <Tooltip text="Change publishing status">
            <ChangePublishesStatusPostDialog id={row.original.id} />
          </Tooltip> */}
          <Tooltip text="delete">
            <DeleteDialog
              url={`/api/Reports/${row.original?.id}`}
              path={"/admin-dashboard/reports"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
