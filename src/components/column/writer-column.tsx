import { type ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import DeleteDialog from "../dailog/delete-dialog";
import { Link } from "react-router-dom";
import EditIcon from "src/assets/icons/edit-icon";
import Tooltip from "src/ui/tooltap";

export type AddWriterOrder = {
  isSelected: boolean;
  id: number;
  ar_fullName: string;
  en_fullName: string;
  image: string;
  no_of_publication: number;
  ar_role: string;
  en_role: string;
};

export interface Soicalmedia {
  id: number;
  name: string;
  url: string;
  writerId: number;
  writer: null;
}
export const AddWriterColumns: ColumnDef<AddWriterOrder>[] = [
  {
    accessorKey: "image",
    header: "ص",
    cell: ({ row }) => {
      return (
        <div className=" w-[50px] h-[50px] rounded-full">
          <img
            src={row.original.image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      );
    },
  },
  {
    id: "ar_fullName",
    accessorKey: "ar_fullName",
    header: "الاسم الكامل",
    cell: ({ row }) => {
      return (
        <p
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ maxWidth: "20ch" }}
        >
          {row.original.ar_fullName}
        </p>
      );
    },
  },

  {
    accessorKey: "no_of_publication",
    header: "عدد المنشورات",
  },
  {
    accessorKey: "ar_role",
    header: "المسمى الوظيفي",
    cell: ({ row }) => {
      return (
        <p
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ maxWidth: "20ch" }}
        >
          {row.original.ar_role}
        </p>
      );
    },
  },

  {
    id: "actions",
    header: "الإعدادات",
    cell: ({ row }) => {
      return (
        <div className="flex justify-start ">
          <Link
            to={`/admin-dashboard/writer/update-writer/${row.original?.id}`}
          >
            <Tooltip text="تعديل">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/writer/info/${row.original?.id}`}>
            <Tooltip text="عرض">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <Eye className="" />
              </Button>
            </Tooltip>
          </Link>
          <Tooltip text="حذف">
            <DeleteDialog
              url={`/api/Writers/${row.original?.id}`}
              path={"/admin-dashboard/writer"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
export const AddEnWriterColumns: ColumnDef<AddWriterOrder>[] = [
  {
    accessorKey: "image",
    header: "image",
    cell: ({ row }) => {
      return (
        <div className=" w-[50px] h-[50px] rounded-full">
          <img
            src={row.original.image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      );
    },
  },
  {
    id: "en_fullName",
    accessorKey: "en_fullName",
    header: "full name",
    cell: ({ row }) => {
      return (
        <p
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ maxWidth: "20ch" }}
        >
          {row.original.en_fullName}
        </p>
      );
    },
  },
  {
    accessorKey: "no_of_publication",
    header: "number of publishes",
  },
  {
    accessorKey: "en_role",
    header: "role",
    cell: ({ row }) => {
      return (
        <p
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ maxWidth: "20ch" }}
        >
          {row.original.en_role}
        </p>
      );
    },
  },

  {
    id: "actions",
    header: "settings",
    cell: ({ row }) => {
      return (
        <div className="flex justify-start ">
          <Link
            to={`/admin-dashboard/writer/update-writer/${row.original?.id}`}
          >
            <Tooltip text="Edit">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
                title="Edit"
                aria-label="Edit"
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/writer/info/${row.original?.id}`}>
            <Tooltip text="view">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <Eye className="" />
              </Button>
            </Tooltip>
          </Link>
          <Tooltip text="delete">
            <DeleteDialog
              url={`/api/Writers/${row.original?.id}`}
              path={"/admin-dashboard/writer"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
