import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import { Button } from "../../../ui/button";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "src/lib/http";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { LoaderIcon } from "lucide-react";
export const addOrgSchema = z.object({
  username: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  password: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" }),
});
type OrgFormValue = z.infer<typeof addOrgSchema>;

export default function ResetPasswordForm() {
  const AccessToken = Cookies.get("accessToken");
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof addOrgSchema>>({
    resolver: zodResolver(addOrgSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["AddOrg"],
    mutationFn: (datas: OrgFormValue) => {
      const formData = new FormData();
      formData.append("username", datas.username);
      formData.append("password", datas.password);

      return postApi("/api/OrgUndBWC", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${AccessToken}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("تمت الاضافة بنجاح.", {
        style: {
          border: "1px solid #4FFFB0",
          padding: "16px",
          color: "#4FFFB0",
        },
        iconTheme: {
          primary: "#4FFFB0",
          secondary: "#FFFAEE",
        },
      });
      navigate("/admin-dashboard/organization");
      window.location.reload();
    },
    onError: (error) => {
      toast.error("لم تتم العميله.", {
        style: {
          border: "1px solid  #FF5733 ",
          padding: "16px",
          color: " #FF5733 ",
        },
        iconTheme: {
          primary: " #FF5733 ",
          secondary: "#FFFAEE",
        },
      });
    },
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  const [personalPhoto, setPersonalPhoto] = useState<string>();
  // data?.file.personalPhoto ?? "",
  const onSubmit = (datas: OrgFormValue) => {
    mutate(datas);
  };
  return (
    <>
      {dir === "ltr" ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]  w-[50%] mx-auto bg-[#f2f2f2]"
          >
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-start">
                  UserName
                </label>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"userName"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="Enter UserName..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-start">
                  PassWord
                </label>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"PassWord"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter PassWord" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full -translate-x-10 flex justify-end">
              <Button className="text-lg inline-flex h-10 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2  font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {isPending ? (
                  <LoaderIcon className="animate-spin duration-1000" />
                ) : (
                  <>Reset Password</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]  w-[50%] mx-auto bg-[#f2f2f2]"
          >
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="اسم المستخدم" />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"اسم المستخدم"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل اسم المستخدم..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="كلمة المرور الجديدة" />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"كلمة المرور الجديدة"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل كلمة المرور الجديدة..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full translate-x-10 flex justify-end">
              <Button className="text-md inline-flex h-10 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {isPending ? (
                  <LoaderIcon className="animate-spin duration-1000" />
                ) : (
                  <>إعادة تعيين كلمة المرور</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}