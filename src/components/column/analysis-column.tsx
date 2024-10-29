import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "../../ui/button";
import DeleteDialog from "../dailog/delete-dialog";
import { Link } from "react-router-dom";
import EditIcon from "src/assets/icons/edit-icon";
import Tooltip from "src/ui/tooltap";
import ChangePublishesStatusAnalysisDialog from "../dailog/change-publish-Analysis";
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
  images: null;
  writers: Writer[];
  reportId: null;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[];
  date_of_publish: Date;
  ar_table_of_content: string[];
  en_table_of_content: string[];
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
export type AddAnalysisOrder = {
  isSelected: boolean;
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  images: any[];
  writers: Writer[];
  reportId: null;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[];
  date_of_publish: Date;
  ar_table_of_content: string[];
  en_table_of_content: string[];
  ar_description: string;
  en_description: string;
  ar_Note: null;
  en_Note: string;
  references: Reference[];
};

export const AddAnalysisColumns: ColumnDef<AddAnalysisOrder>[] = [
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
    header: "عنوان التحليل",
  },
  {
    accessorKey: "date_of_publish",
    header: "تارخ التحليل",
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
          <Link to={`/admin-dashboard/update-analysis/${row.original?.id}`}>
            <Tooltip text="تعديل">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/view-analysis/${row.original.id}`}>
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
            <ChangePublishesStatusAnalysisDialog id={row.original.id} />
          </Tooltip>
          <Tooltip text="حذف">
            <DeleteDialog
              url={`/api/ManagingPublications/${row.original?.id}`}
              path={"/admin-dashboard/analysis"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];

export const AddENAnalysisColumns: ColumnDef<AddAnalysisOrder>[] = [
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
    header: "analysis title",
  },
  {
    accessorKey: "date_of_publish",
    header: "Date of analysis",
    cell: ({ row }) => {
      return <p>{String(row.original.date_of_publish).split("T")[0]}</p>;
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "publish state",
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
          <Link to={`/admin-dashboard/update-analysis/${row.original?.id}`}>
            <Tooltip text="Edit">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/view-analysis/${row.original.id}`}>
            <Tooltip text="view">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <Eye className="" />
              </Button>
            </Tooltip>
          </Link>
          <Tooltip text="Change analysis status">
            <ChangePublishesStatusAnalysisDialog id={row.original.id} />
          </Tooltip>
          <Tooltip text="delete">
            <DeleteDialog
              url={`/api/ManagingPublications/${row.original?.id}`}
              path={"/admin-dashboard/analysis"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
