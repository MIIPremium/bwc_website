import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "../../ui/button";
import LinkIcon from "../../assets/icons/LinkIcon";
import DeleteDialog from "../dailog/delete-dialog";
import { Link } from "react-router-dom";
import EditIcon from "src/assets/icons/edit-icon";
import Tooltip from "src/ui/tooltap";

export type AddReferenceOrder = {
  isSelected: boolean;
  id: string;
  ar_title: string;
  en_title: string;
  link: string;
  noOfPublications: number;
};

export const AddReferenceColumns: ColumnDef<AddReferenceOrder>[] = [
  {
    id: "ar_title",
    accessorKey: "ar_title",
    header: "العنوان",
    cell: ({ row }) => (
      <div className="flex">
        <p className="ml-2">{row.original.ar_title}</p>
        <a href={row.original.link} target="_blank">
          <LinkIcon />
        </a>
      </div>
    ),
  },
  {
    accessorKey: "noOfPublications",
    header: "عدد المنشورات المرتبطه به",
    cell: ({ row }) => (
      <div className="flex">
        <p>{row.original.noOfPublications}</p>
      </div>
    ),
  },

  {
    id: "actions",
    header: "الإعدادات",
    cell: ({ row }) => {
      //   const { data: session } = useSession();

      return (
        <div className="flex justify-start ">
          <Link to={`/admin-dashboard/references/update/${row.original?.id}`}>
            <Tooltip text="تعديل">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/references/info/${row.original.id}`}>
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
              url={`/api/References/${row.original?.id}`}
              path={"/admin-dashboard/references"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
export const EnAddReferenceColumns: ColumnDef<AddReferenceOrder>[] = [
  {
    id: "en_title",
    accessorKey: "en_title",
    header: "title",
    cell: ({ row }) => (
      <div className="flex">
        <p className="mr-2">{row.original.en_title}</p>
        <a href={row.original.link} target="_blank">
          <LinkIcon />
        </a>
      </div>
    ),
  },
  {
    accessorKey: "noOfPublications",
    header: "Number of publications associated with it",
    cell: ({ row }) => <p>{row.original.noOfPublications}</p>,
  },

  {
    id: "actions",
    header: "settings",
    cell: ({ row }) => {
      //   const { data: session } = useSession();

      return (
        <div className="flex justify-start ">
          <Link to={`/admin-dashboard/references/update/${row.original?.id}`}>
            <Tooltip text="Edit">
              <Button
                className="bg-[#d5ae78] text-white ml-3 rounded-lg"
                size={"sm"}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/admin-dashboard/references/info/${row.original.id}`}>
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
              url={`/api/References/${row.original?.id}`}
              path={"/admin-dashboard/references"}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
