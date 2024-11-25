import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { deleteApi } from "../../lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "src/ui/button";
import DeleteIcon from "src/assets/icons/delete-icon";
import Cookies from "js-cookie";

interface DeleteDialogProps {
  url: string;
  disabled?: boolean;
  keys?: string[];
  path: string;
}

export default function DeleteDialog({
  url,
  disabled = false,
  keys,
  path,
}: DeleteDialogProps) {
  const AccessToken = Cookies.get("accessToken");
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  const dir = i18n.dir();

  const { mutate, isSuccess, isError, error } = useMutation({
    mutationFn: () =>
      deleteApi(url, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      }),
    onSuccess: () => {
      if (keys) {
        queryClient.invalidateQueries({ queryKey: keys });
      }
      // Navigate and reload the page
      setTimeout(() => {
        window.location.href = path.startsWith("/") ? path : `/${path}`;
      }, 1000);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("تمت الحذف بنجاح.", {
        style: {
          border: "1px solid #eb0b1a",
          padding: "16px",
          color: "#eb0b1a",
        },
        iconTheme: {
          primary: "#eb0b1a",
          secondary: "#FFFAEE",
        },
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const backendMessage =
        (error as any)?.response?.data || "لم تتم العملية.";
      toast.error(`${backendMessage}`, {
        style: {
          border: "1px solid #FF5733",
          padding: "16px",
          color: "#FF5733",
        },
        iconTheme: {
          primary: "#FF5733",
          secondary: "#FFFAEE",
        },
      });
    }
  }, [isError, error]);

  return (
    <>
      {dir === "ltr" ? (
        <AlertDialog>
          <AlertDialogTrigger
            className={`m-0 flex items-center gap-1 rounded ml-2 -translate-y-[7px] w-10   py-1.5 text-right  hover:bg-gray-100 ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={disabled}
          >
            <Button
              className="bg-[#FF7387] text-white w-12   rounded-lg"
              size={"sm"}
            >
              <DeleteIcon />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#f2f2f2]">
            <AlertDialogHeader>
              <AlertDialogTitle dir="ltr">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription dir="ltr">
                You can't undo this action. Data will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="!justify-between gap-3">
              <AlertDialogCancel className="text-muted-foreground">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-500"
                onClick={() => {
                  mutate();
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger
            className={`m-0 flex items-center gap-1 rounded -translate-y-[7px] w-10   py-1.5 text-right  hover:bg-gray-100 ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={disabled}
          >
            <Button
              className="bg-[#FF7387] text-white w-12   rounded-lg"
              size={"sm"}
            >
              <DeleteIcon />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#f2f2f2]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-start">
                هل أنت متأكد؟
              </AlertDialogTitle>
              <AlertDialogDescription className="text-start">
                لا يمكنك التراجع عن هذه العملية. سيتم حذف البيانات بشكل نهائي.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="!justify-between gap-3">
              <AlertDialogCancel className="text-muted-foreground">
                إلغاء
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-500"
                onClick={() => {
                  mutate();
                }}
              >
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
