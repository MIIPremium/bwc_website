import React, { useState } from "react";
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
import { addReportSchema } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import { Button } from "../../ui/button";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "src/lib/http";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddPersonalImageDialog from "../dailog/add-personal-image-dialog";
import { Textarea } from "src/ui/textarea";
import Cookies from "js-cookie";

type ReportFormValue = z.infer<typeof addReportSchema>;

export default function AddReportForm() {
  const AccessToken = Cookies.get("accessToken");
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof addReportSchema>>({
    resolver: zodResolver(addReportSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["AddReferences"],
    mutationFn: (datas: ReportFormValue) =>
      postApi(
        "/api/References",
        {
          Ar_Title: datas.Ar_Title,
          En_Title: datas.En_Title,
          Img: datas.Img,
          Ar_description: datas.Ar_description,
          En_description: datas.En_description,
          Ar_executive_summary: datas.Ar_executive_summary,
          En_executive_summary: datas.En_executive_summary,
          Ar_table_of_content: datas.Ar_table_of_content,
          Er_table_of_content: datas.Er_table_of_content,
          date_of_report: datas.date_of_report,
          date_of_publish: datas.date_of_publish,
          PdfImg: datas.PdfImg,
          pdf_link: datas.pdf_link,
          An_note: datas.An_note,
          En_note: datas.En_note,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensures that the request body is treated as JSON
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
      navigate("/admin-dashboard/references");
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
  const [personalPhoto, setPersonalPhoto] = useState<string>();
  // data?.file.personalPhoto ?? "",
  const onSubmit = (datas: ReportFormValue) => {
    mutate(datas);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-h-[90vh]   w-[100%] "
      >
        {
          <>
            <div className=" items-right col-span-1 flex h-[140px] flex-col mr-10">
              <label className="text-md mb-2 block font-bold text-gray-950">
                صورة التقرير
              </label>
              <AddPersonalImageDialog
                setPersonalPhoto={setPersonalPhoto}
                personalPhoto={personalPhoto}
              />
              <FormField
                control={form.control}
                name="Img"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="hidden"
                        {...field}
                        onChange={(e) => {
                          field.onChange(personalPhoto);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3"></div>
          </>
        }
        <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="عنوان التقرير" />
            <FormField
              control={form.control}
              name="Ar_Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">
                    {"عنوان التقرير"}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل عنوان التقرير..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div dir="ltr" className="text-end col-span-1 h-auto translate-y-10">
            <Label text="Title" />
            <FormField
              control={form.control}
              name="En_Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">{"Title"}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div dir="ltr" className="text-end col-span-1 h-auto translate-y-10">
            <Label text="تاريخ النشر" />
            <FormField
              control={form.control}
              name="date_of_publish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">
                    {"تاريخ النشر"}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل تاريخ النشر" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="تاريخ التقرير" />
            <FormField
              control={form.control}
              name="date_of_report"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">
                    {"تاريخ التقرير"}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل تاريخ التقرير..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="رابط الملف" />
            <FormField
              control={form.control}
              name="pdf_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">{"رابط الملف"}</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل رابط الملف..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="صورة الغلاف للتقرير" />
            <FormField
              control={form.control}
              name="PdfImg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">
                    {"صورة الغلاف للتقرير"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل صورة الغلاف للتقرير..."
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
            <Label text="وصف التقرير" />
            <FormField
              control={form.control}
              name="Ar_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">
                    {"وصف التقرير"}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ادخل وصف التقرير..."
                      rows={5}
                      className="bg-white"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="Description" />
            <FormField
              control={form.control}
              name="En_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">
                    {"Description"}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="bg-white"
                      placeholder="enter Description ..."
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="ملخص تنفيذي" />
            <FormField
              control={form.control}
              name="Ar_executive_summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">
                    {"ملخص تنفيذي"}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="bg-white"
                      placeholder="ادخل ملخص تنفيذي ..."
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="Executive summary" />
            <FormField
              control={form.control}
              name="En_executive_summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">
                    {"Executive summary"}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="bg-white"
                      placeholder="enter Executive summary ..."
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="فهرس المحتوى" />
            <FormField
              control={form.control}
              name="Ar_table_of_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">
                    {"فهرس المحتوى"}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="bg-white"
                      placeholder="ادخل فهرس المحتوى ..."
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="Table of content" />
            <FormField
              control={form.control}
              name="Er_table_of_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">
                    {"Table of content"}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="bg-white"
                      placeholder="enter Table of content ..."
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="ملاحظة" />
            <FormField
              control={form.control}
              name="An_note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">{"ملاحظة"}</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="bg-white"
                      placeholder="ادخل ملاحظة ..."
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
          <div className=" col-span-1 h-auto translate-y-10">
            <Label text="Note" />
            <FormField
              control={form.control}
              name="En_note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">{"Note"}</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="bg-white"
                      placeholder="enter the Note ..."
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
          <Button className="text-md mb-10 inline-flex h-10 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            إضافة
          </Button>
        </div>
      </form>
    </Form>
  );
}
