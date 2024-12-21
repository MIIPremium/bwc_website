import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "../../ui/button";
import DeleteDialog from "../dailog/delete-dialog";
import { Link } from "react-router-dom";
import EditIcon from "src/assets/icons/edit-icon";

export type AddReportOrder = {
  isSelected: boolean;
  id: string;
  ar_title: string;
  link: string;
};

export const AddReportColumns: ColumnDef<AddReportOrder>[] = [
  {
    id: "ar_title",
    accessorKey: "ar_title",
    header: "ص",
  },
  {
    accessorKey: "link",
    header: "العنوان",
  },
  {
    accessorKey: "link",
    header: "تاريخ العنوان",
  },
  {
    accessorKey: "link",
    header: "نشر / إلغاء النشر",
  },
  {
    accessorKey: "link",
    header: "عدد التحميل",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      //   const { data: session } = useSession();

      return (
        <div className="flex justify-center ">
          <Link to={`/admin-dashboard/references/update/${row.original?.id}`}>
            <Button
              className="bg-[#d5ae78] text-white ml-3 rounded-lg"
              size={"sm"}
            >
              <EditIcon />
            </Button>
          </Link>
          <Link to={`/admin-dashboard/reports/info`}>
            <Button
              className="bg-[#d5ae78] text-white ml-3 rounded-lg"
              size={"sm"}
            >
              <Eye className="" />
            </Button>
          </Link>
          <DeleteDialog
            url={`/api/References/${row.original?.id}`}
            path={"/admin-dashboard/references"}
          />
        </div>
      );
    },
  },
];
