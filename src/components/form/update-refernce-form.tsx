import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addReferenceSchema } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import { Button } from "../../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance, postApi, putApi } from "src/lib/http";
import { useToast } from "src/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import { ReferenceResp } from "../table/referencesTable";
import { useTranslation } from "react-i18next";

type ReferenceFormValue = z.infer<typeof addReferenceSchema>;
export type ReferenceResp = {
  id: number;
  ar_title: string;
  en_title: string;
  link: string;
};
export default function UpdateReferenceForm() {
  // const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof addReferenceSchema>>({
    resolver: zodResolver(addReferenceSchema),
  });

  const fetchData = async () => {
    const response = await axiosInstance.get<ReferenceResp>(
      `/api/References/${id}`,
      {}
    );
    return response.data;
  };
  const {
    data: complaintData,
    error: complaintError,
    isLoading: complaintIsLoading,
  } = useQuery({
    queryKey: ["complaint", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  useEffect(() => {
    if (complaintData) {
      form.reset({
        ar_title: complaintData.ar_title,
        en_title: complaintData.en_title,
        link: complaintData.link,
      });
    }
  }, [complaintData]);
  const { mutate } = useMutation({
    mutationKey: ["UpdateReferences"],
    mutationFn: (datas: ReferenceFormValue) =>
      putApi(`/api/References/${id}`, {
        ar_title: datas.ar_title,
        en_title: datas.en_title,
        link: datas.link,
      }),
    onSuccess: () => {
      toast.success("تمت التعديل بنجاح.", {
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
      navigate("/admin-dashboard/references");
      window.location.reload();
    },
    onError: (error) => {
      toast.success("لم تتم العميله.", {
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

  const onSubmit = (datas: ReferenceFormValue) => {
    mutate(datas);
  };

  return (
    <>
      {dir === "ltr" ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] "
          >
            <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className="text-end col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-start">
                  Title in English
                </label>
                <FormField
                  control={form.control}
                  name="en_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"Title in English"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="">
                  العنوان بالعربية
                </label>
                <FormField
                  control={form.control}
                  name="ar_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"العنوان بالعربية"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          placeholder="ادخل العنوان..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="الرابط" />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"الرابط"}</FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          placeholder="ادخل الرابط..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div
              className={
                dir === "ltr"
                  ? "w-full -translate-x-10 flex justify-end "
                  : "w-full translate-x-10 flex justify-end "
              }
            >
              <Button className="text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-4 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                update a reference
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]  w-[100%] bg-[#f2f2f2]"
          >
            <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="العنوان بالعربية" />
                <FormField
                  control={form.control}
                  name="ar_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"العنوان بالعربية"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل العنوان..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                dir="ltr"
                className="text-end col-span-1 h-auto translate-y-10"
              >
                <Label text="Title in English" />
                <FormField
                  control={form.control}
                  name="en_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"Title in English"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="الرابط" />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"الرابط"}</FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل الرابط..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full translate-x-10 flex justify-end">
              <Button className="text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-4 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                تعديل مرجع
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
