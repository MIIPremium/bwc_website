import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "../../ui/button";
import DeleteDialog from "../dailog/delete-dialog";
import { Link } from "react-router-dom";
import EditIcon from "src/assets/icons/edit-icon";
import Tooltip from "src/ui/tooltap";

import ChangePublishesStatusPostDialog from "../dailog/change-publish-publishes";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "src/lib/http";

export interface Reference {
  id: number;
  ar_title: string;
  en_title: string;
  link: string;
  publication: Publication[];
}

export interface Publication {
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  images: string[];
  writers: Writer[];
  reportId: null;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[];
  date_of_publish: Date;
  ar_table_of_content: null;
  en_table_of_content: null;
  ar_description: string;
  en_description: string;
  ar_Note: null;
  en_Note: string;
  references: null[];
}

export interface Writer {
  id: number;
  ar_fullName: string;
  en_fullName: string;
  image: string;
  ar_description: string;
  en_description: string;
  ar_role: string;
  en_role: string;
  publication: null[];
  soicalmedia: any[];
}
export type AddPublishesOrder = {
  isSelected: boolean;
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  images: string[];
  writers: Writer[];
  reportId: number;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[];
  date_of_publish: Date;
  ar_table_of_content: null;
  en_table_of_content: null;
  ar_description: string;
  en_description: string;
  ar_Note: null;
  en_Note: string;
  references: null[];
};
export interface ReportPubResp {
  id: number;
  ar_Title: string;
  en_Title: string;
}

export const AddOPublishesColumns: ColumnDef<AddPublishesOrder>[] = [
  {
    id: "img",
    accessorKey: "img",
    header: "ص",
    cell: ({ row }) => {
      return (
        <div className=" w-[50px] h-[50px] rounded-full">
          <img
            src={row.original.b_image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      );
    },
  },
  {
    accessorKey: "ar_Title",
    header: "عنوان المنشور",
    cell: ({ row }) => {
      return (
        <p
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ maxWidth: "20ch" }}
        >
          {row.original.ar_Title}
        </p>
      );
    },
  },
  {
    accessorKey: "reportId",
    header: "اسم التقرير",
    cell: ({ row }) => {
      // const { data: ReportPub } = useQuery({
      //   queryKey: ["ReportPub"],
      //   queryFn: () => getApi<ReportPubResp[]>("/api/reports/pub"),
      // });
      // // Function to get report title based on reportId
      // const getReportTitle = (reportId: number) => {
      //   const report = ReportPub?.data.find(
      //     (report) => report.id === reportId
      //   );
      //   // Return Arabic title if it exists, otherwise English title
      //   return report ? report.ar_Title || report.en_Title : "Title not found";
      // };

      // Usage example
      // const reportTitle = getReportTitle(row.original.reportId);
    },
  },
  {
    accessorKey: "date_of_publish",
    header: "تاريخ المنشور",
    cell: ({ row }) => {
      return <p>{String(row.original.date_of_publish).split("T")[0]}</p>;
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "publish",
    header: "حالة النشر",
    cell: ({ row }) => {
      return row.original.publish === true ? "منشور" : "غير منشور";
    },
    filterFn: (row, columnId, filterValue) => {
      // If no filter is applied, show all rows
      if (filterValue === undefined) {
        return true;
      }
      return row.getValue(columnId) === filterValue;
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
          <Link to={`/admin-dashboard/view-publishes/${row.original.id}`}>
            <Tooltip text="عرض">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <Eye className="" />
              </Button>
            </Tooltip>
          </Link>
          <Tooltip text="تغير حالة النشر">
            <ChangePublishesStatusPostDialog id={row.original.id} />
          </Tooltip>
          <Tooltip text="حذف">
            <DeleteDialog
              url={`/api/ManagingPublications/${row.original?.id}`}
              path={"/admin-dashboard/publications"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];

export const AddENPublishesColumns: ColumnDef<AddPublishesOrder>[] = [
  {
    id: "img",
    accessorKey: "img",
    header: "img",
    cell: ({ row }) => {
      return (
        <div className=" w-[50px] h-[50px] rounded-full">
          <img
            src={row.original.b_image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      );
    },
  },
  {
    accessorKey: "en_Title",
    header: "post title",
    cell: ({ row }) => {
      return (
        <p
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ maxWidth: "20ch" }}
        >
          {row.original.en_Title}
        </p>
      );
    },
  },
  {
    accessorKey: "reportId",
    header: "report Name",
  },
  {
    accessorKey: "date_of_publish",
    header: "Date of post",
    cell: ({ row }) => {
      return <p>{String(row.original.date_of_publish).split("T")[0]}</p>;
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "publish",
    header: "publish status",
    cell: ({ row }) => {
      return row.original.publish === true ? "publishing" : "unpublication";
    },
    filterFn: (row, columnId, filterValue) => {
      // If no filter is applied, show all rows
      if (filterValue === undefined) {
        return true;
      }
      return row.getValue(columnId) === filterValue;
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
          <Link to={`/admin-dashboard/view-publishes/${row.original.id}`}>
            <Tooltip text="view">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <Eye className="" />
              </Button>
            </Tooltip>
          </Link>
          <Tooltip text="Change publishing status">
            <ChangePublishesStatusPostDialog id={row.original.id} />
          </Tooltip>
          <Tooltip text="delete">
            <DeleteDialog
              url={`/api/ManagingPublications/${row.original?.id}`}
              path={"/admin-dashboard/publications"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
