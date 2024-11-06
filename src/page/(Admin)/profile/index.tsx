import { UploadCloud, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import Breadcrumb from "src/ui/breadcrumb";
import { Button } from "src/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "src/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/ui/form";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../../../ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "src/lib/http";
import toast from "react-hot-toast";
import Label from "src/ui/label";
import { useTranslation } from "react-i18next";
import EnBreadcrumb from "src/ui/en-breadcrumb";

const formSchema = z.object({
  FormFile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5000000,
      "حجم الملف يجب ألا يتجاوز 5MB"
    )
    .refine(
      (file) => !file || file.name.endsWith(".pdf"),
      "يجب أن تكون صيغة الملف PDF"
    ),
  name: z.string(),
});
type ProfileFormValue = z.infer<typeof formSchema>;
export default function Profile() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || undefined;
    if (file) {
      setSelectedFile(file);
      form.setValue("FormFile", file);
    }
  };
  const path = "/admin-dashboard/profile";
  const handleRemoveFile = () => {
    form.reset();
    setSelectedFile(null);
  };
  const { mutate } = useMutation({
    mutationKey: ["AddProfile"],
    mutationFn: (datas: ProfileFormValue) => {
      const formData = new FormData();
      formData.append("FormFile", datas.FormFile as Blob);
      formData.append("name", datas.name);

      return postApi("/api/ProfileFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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

      setTimeout(() => {
        window.location.href = path.startsWith("/") ? path : `/${path}`;
      }, 1000);
    },
    onError: (error) => {},
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <>
      {dir === "ltr" ? (
        <main>
          <div className="min-h-screen w-[80%] text-right bg-[#f2f2f2] flex flex-col gap-12">
            <div className="grid grid-cols-1 ">
              <div className="col-span-1 h-0 mt-4 rounded-lg">
                <EnBreadcrumb
                  tilte1="Features"
                  path1="/admin-dashboard/profile"
                  tilte2="Profile"
                  path2="/admin-dashboard/profile"
                  tilte3=""
                  path3=""
                />
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-h-[100vh] "
              >
                <div className="grid grid-cols-4 w-[100%] translate-x-44 items-start mb-4 text-right h-[10vh]  ">
                  <div className=" col-span-1 h-auto ">
                    <label htmlFor="" className="float-start font-semibold">
                      File Name
                    </label>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-red-900">
                            {"File Name"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter File Name ..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center  translate-x-32">
                  <div className="bg-white w-[60vw] flex justify-center items-center">
                    <div className="w-[80%] flex flex-col items-center justify-center gap-6 my-6">
                      <h1 className="text-3xl">UPLOAD</h1>
                      <FormField
                        control={form.control}
                        name="FormFile"
                        render={({ field }) => (
                          <FormItem className="w-full bg-[#fbf7f2] border border-[#b5adaa] border-dashed h-[50vh]">
                            <label htmlFor="file" className="w-full">
                              <div className="flex flex-col items-center justify-center h-full w-full">
                                <UploadCloud
                                  className="text-[#d5ae78]"
                                  size={100}
                                  strokeWidth={1}
                                />
                                <p className="text-xl">
                                  <span className="text-[#d5ae78]">
                                    Explore
                                  </span>
                                </p>
                                <small className="text-[#676767] font-thin">
                                  Supports the following formula : PDF
                                </small>
                              </div>
                            </label>
                            <FormControl>
                              <Input
                                type="file"
                                id="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {selectedFile && (
                        <div className="border w-full">
                          <div className="flex justify-between items-center border-b border-[#d5ae78] p-1.5">
                            <p>{selectedFile.name}</p>
                            <XCircleIcon
                              className="fill-[#bbb] hover:fill-[#a8a8a8] stroke-white cursor-pointer"
                              onClick={handleRemoveFile}
                            />
                          </div>
                        </div>
                      )}
                      <AlertDialog>
                        {/* AlertDialogTrigger wraps the SEND button */}
                        <AlertDialogTrigger asChild>
                          <Button
                            className={`bg-black text-white w-full ${
                              !selectedFile
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={!selectedFile}
                          >
                            SEND
                          </Button>
                        </AlertDialogTrigger>

                        {/* AlertDialogContent defines the dialog */}
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle dir="ltr" className="text-start">
                              Do you want to save this file?
                            </AlertDialogTitle>
                            <AlertDialogDescription
                              dir="ltr"
                              className="text-start"
                            >
                              <p>
                                This file will be saved or the existing file
                                will be replaced if there is a conflict.
                              </p>
                              <p>Click Yes if you agree.</p>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex relative gap-4">
                            {/* Cancel Button */}
                            <AlertDialogCancel className="bg-red-700 absolute right-0 text-white">
                              Cancel
                            </AlertDialogCancel>
                            {/* Confirm Button */}
                            <Button
                              className="bg-black text-[#d5ae78]"
                              variant="destructive"
                              onClick={() => {
                                // Submit the form upon confirmation
                                form.handleSubmit(onSubmit)();
                              }}
                            >
                              Yes
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </main>
      ) : (
        <main>
          <div className="min-h-screen w-[80%] text-right bg-[#f2f2f2] flex flex-col gap-12">
            <div className="grid grid-cols-1 ">
              <div className="col-span-1 h-0 mt-4 rounded-lg">
                <Breadcrumb
                  tilte1="المزايا"
                  path1="/admin-dashboard/profile"
                  tilte2="الملف الشخصي"
                  path2="/admin-dashboard/profile"
                  tilte3=""
                  path3=""
                />
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-h-[100vh] "
              >
                <div className="grid grid-cols-4 w-[100%] -translate-x-44 items-start  text-right h-[10vh]  ">
                  <div className=" col-span-1 h-auto ">
                    <Label text="عنوان الملف" />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-red-900">
                            {"عنوان الملف"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ادخل عنوان الملف ..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center -translate-x-32">
                  <div className="bg-white w-[60vw] flex justify-center items-center">
                    <div className="w-[80%] flex flex-col items-center justify-center gap-6 my-6">
                      <h1 className="text-3xl">الرفع</h1>
                      <FormField
                        control={form.control}
                        name="FormFile"
                        render={({ field }) => (
                          <FormItem className="w-full bg-[#fbf7f2] border border-[#b5adaa] border-dashed h-[50vh]">
                            <label htmlFor="file" className="w-full">
                              <div className="flex flex-col items-center justify-center h-full w-full">
                                <UploadCloud
                                  className="text-[#d5ae78]"
                                  size={100}
                                  strokeWidth={1}
                                />
                                <p className="text-xl">
                                  <span className="text-[#d5ae78]">
                                    استعراض
                                  </span>
                                </p>
                                <small className="text-[#676767] font-thin">
                                  يدعم الصيغة الاتية : PDF
                                </small>
                              </div>
                            </label>
                            <FormControl>
                              <Input
                                type="file"
                                id="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {selectedFile && (
                        <div className="border w-full">
                          <div className="flex justify-between items-center border-b border-[#d5ae78] p-1.5">
                            <p>{selectedFile.name}</p>
                            <XCircleIcon
                              className="fill-[#bbb] hover:fill-[#a8a8a8] stroke-white cursor-pointer"
                              onClick={handleRemoveFile}
                            />
                          </div>
                        </div>
                      )}
                      <AlertDialog>
                        {/* AlertDialogTrigger wraps the SEND button */}
                        <AlertDialogTrigger asChild>
                          <Button
                            className={`bg-black text-white w-full ${
                              !selectedFile
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={!selectedFile}
                          >
                            إرسال
                          </Button>
                        </AlertDialogTrigger>

                        {/* AlertDialogContent defines the dialog */}
                        <AlertDialogContent className=" bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-start">
                              هل تريد حفظ هذا الملف؟
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-start">
                              <p>
                                سوف يتم حفظ هذا الملف او استبدال الملف الموجود
                                ان وجد ....
                              </p>
                              <p>اضغط نعم في حاله الموافقه</p>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex relative gap-4 ">
                            {/* Cancel Button */}
                            <AlertDialogCancel className="bg-red-700 absolute right-0 text-white">
                              إلغاء
                            </AlertDialogCancel>
                            {/* Confirm Button */}
                            <Button
                              className="bg-black text-[#d5ae78]"
                              variant="destructive"
                              onClick={() => {
                                // Submit the form upon confirmation
                                form.handleSubmit(onSubmit)();
                              }}
                            >
                              نعم
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </main>
      )}
    </>
  );
}
