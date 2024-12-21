import React from "react";
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
import { addServicesSchema } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import { Button } from "../../ui/button";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "src/lib/http";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Textarea } from "src/ui/textarea";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { LoaderIcon } from "lucide-react";
type ServicesFormValue = z.infer<typeof addServicesSchema>;

export default function AddServicesForm() {
  const AccessToken = Cookies.get("accessToken");
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof addServicesSchema>>({
    resolver: zodResolver(addServicesSchema),
  });

  const { mutate,isPending } = useMutation({
    mutationKey: ["AddServices"],
    mutationFn: (datas: ServicesFormValue) =>
      postApi(
        "/api/Services",
        {
          ar_name: datas.ar_name,
          en_name: datas.en_name,
          ar_Description: datas.ar_Description,
          en_Description: datas.en_Description,
        },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      ),
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

      navigate("/admin-dashboard/services");
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

  const onSubmit = (datas: ServicesFormValue) => {
    mutate(datas);
  };

  return (
    <>
      {dir === "ltr" ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]  w-[100%] "
          >
            <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div
                dir="ltr"
                className="text-end col-span-1 h-auto translate-y-10"
              >
                <label htmlFor="" className="float-start">
                  Title
                </label>
                <FormField
                  control={form.control}
                  name="en_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"Title"}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the title of service"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="عنوان الخدمة" />
                <FormField
                  control={form.control}
                  name="ar_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"عنوان الخدمة"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          placeholder="ادخل عنوان الخدمة ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* TODO:REplace with textarea */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="وصف الخدمة" />
                <FormField
                  control={form.control}
                  name="ar_Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"وصف الخدمة"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="ادخل وصف الخدمة ..."
                          {...field}
                          rows={5}
                          dir="rtl"
                          className="bg-white"
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10 mt-5">
                <label htmlFor="" className="float-start">
                  Service Description
                </label>
                <FormField
                  control={form.control}
                  name="en_Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"Service Description"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          className="bg-white"
                          placeholder="Enter the service description"
                          {...field}
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full -translate-x-10 flex justify-end mt-20">
              <Button className="text-lg inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2  font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {isPending ? (
                  <LoaderIcon className="animate-spin duration-1000" />
                ) : (
                  <>
                  Add
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]  w-[100%] "
          >
            <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="عنوان الخدمة" />
                <FormField
                  control={form.control}
                  name="ar_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"عنوان الخدمة"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل عنوان الخدمة ..." {...field} />
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
                <label htmlFor="" className="float-start">
                  Title
                </label>
                <FormField
                  control={form.control}
                  name="en_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"Title"}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the title of service"
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
                <Label text="وصف الخدمة" />
                <FormField
                  control={form.control}
                  name="ar_Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"وصف الخدمة"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="ادخل وصف الخدمة ..."
                          {...field}
                          rows={5}
                          className="bg-white"
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10 mt-5">
                <label htmlFor="" className="float-end">
                  Service Description
                </label>
                <FormField
                  control={form.control}
                  name="en_Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"Service Description"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          dir="ltr"
                          className="bg-white"
                          placeholder="Enter the service description"
                          {...field}
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full translate-x-10 flex justify-end mt-20">
              <Button className="text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-7 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {isPending ? (
                  <LoaderIcon className="animate-spin duration-1000" />
                ) : (
                  <>
                  إضافة
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
