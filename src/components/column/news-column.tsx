import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "../../ui/button";
import DeleteDialog from "../dailog/delete-dialog";
import { Link } from "react-router-dom";
import EditIcon from "src/assets/icons/edit-icon";
import Tooltip from "src/ui/tooltap";
import ChangePublishesDialog from "../dailog/change-publish";
import ChangePublishesNewsDialog from "../dailog/change-publish-news";

export type AddNewOrder = {
  isSelected: boolean;
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  images: string[];
  writers: any[];
  reportId: null;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[];
  date_of_publish: Date;
  ar_table_of_content: any[];
  en_table_of_content: any[];
  ar_description: string;
  en_description: string;
  ar_Note: null;
  en_Note: null;
  references: any[];
};

export const AddNewsColumns: ColumnDef<AddNewOrder>[] = [
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
    header: "عنوان الخبر",
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
    accessorKey: "date_of_publish",
    header: "تارخ الخبر",
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
          <Link to={`/admin-dashboard/update-news/${row.original?.id}`}>
            <Tooltip text="تعديل">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/view-news/${row.original.id}`}>
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
            <ChangePublishesNewsDialog id={row.original.id} />
          </Tooltip>
          <Tooltip text="حذف">
            <DeleteDialog
              url={`/api/ManagingPublications/${row.original?.id}`}
              path={"/admin-dashboard/news"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];

export const AddENNewsColumns: ColumnDef<AddNewOrder>[] = [
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
    header: "news title",
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
    accessorKey: "date_of_publish",
    header: "Date of news",
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
          <Link to={`/admin-dashboard/update-news/${row.original?.id}`}>
            <Tooltip text="Edit">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/view-news/${row.original.id}`}>
            <Tooltip text="view">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <Eye className="" />
              </Button>
            </Tooltip>
          </Link>
          <Tooltip text="Change news status">
            <ChangePublishesNewsDialog id={row.original.id} />
          </Tooltip>
          <Tooltip text="delete">
            <DeleteDialog
              url={`/api/ManagingPublications/${row.original?.id}`}
              path={"/admin-dashboard/news"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
