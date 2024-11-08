import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "../../ui/button";
import DeleteDialog from "../dailog/delete-dialog";
import { Link } from "react-router-dom";
import EditIcon from "src/assets/icons/edit-icon";
import Tooltip from "src/ui/tooltap";

export type AddOrganizationsOrder = {
  isSelected: boolean;
  id: number;
  ar_name: string;
  en_name: string;
  img: string;
  link: string;
};

export const AddOrganizationsColumns: ColumnDef<AddOrganizationsOrder>[] = [
  {
    accessorKey: "img",
    header: "صورة المؤسسة",
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
    id: "ar_name",
    accessorKey: "ar_name",
    header: "اسم المؤسسة",
    cell: ({ row }) => {
      return (
        <p
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ maxWidth: "20ch" }}
        >
          {row.original.ar_name}
        </p>
      );
    },
  },
  {
    accessorKey: "link",
    header: "رابط موقع المؤسسة",
    cell: ({ row }) => (
      <a
        href={row.original.link}
        target="_blank"
        className="whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ maxWidth: "20ch" }}
      >
        {row.original.link}
      </a>
    ),
  },

  {
    id: "actions",
    header: "الإعدادات",
    cell: ({ row }) => {
      //   const { data: session } = useSession();

      return (
        <div className="flex justify-start ">
          <Link to={`/admin-dashboard/organization/update/${row.original?.id}`}>
            <Tooltip text="تعديل">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/organization/info/${row.original.id}`}>
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
              url={`/api/OrgUndBWC/${row.original?.id}`}
              path={"/admin-dashboard/organization"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
export const AddEnOrganizationsColumns: ColumnDef<AddOrganizationsOrder>[] = [
  {
    accessorKey: "img",
    header: "Organization Image",
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
    id: "en_name",
    accessorKey: "en_name",
    header: "institution name",
    cell: ({ row }) => {
      return (
        <p
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ maxWidth: "20ch" }}
        >
          {row.original.en_name}
        </p>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => (
      <a
        href={row.original.link}
        target="_blank"
        className="whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ maxWidth: "20ch" }}
      >
        {row.original.link}
      </a>
    ),
  },

  {
    id: "actions",
    header: "settings",
    cell: ({ row }) => {
      //   const { data: session } = useSession();

      return (
        <div className="flex justify-start ">
          <Link to={`/admin-dashboard/organization/update/${row.original?.id}`}>
            <Tooltip text="Edit">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>

          <Link to={`/admin-dashboard/organization/info/${row.original.id}`}>
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
              url={`/api/OrgUndBWC/${row.original?.id}`}
              path={"/admin-dashboard/organization"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
