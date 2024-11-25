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
import { addTaskForceSchema } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import { Button } from "../../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "src/lib/http";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { LoaderIcon } from "lucide-react";
type TaskForceFormValue = z.infer<typeof addTaskForceSchema>;

export default function AddTaskForce() {
  const AccessToken = Cookies.get("accessToken");
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const dir = i18n.dir();
  const navigate = useNavigate();
  const [_preview, setPreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof addTaskForceSchema>>({
    resolver: zodResolver(addTaskForceSchema),
  });

  const { mutate ,isPending} = useMutation({
    mutationKey: ["AddTaskForce"],
    mutationFn: (datas: TaskForceFormValue) => {
      const formData = new FormData();
      formData.append("Ar_name", datas.Ar_name); // Corrected this from decisionDate to decisionName
      formData.append("En_name", datas.En_name);
      formData.append("Ar_degree", datas.Ar_degree);
      formData.append("En_degree", datas.En_degree);
      formData.append("Ar_role", datas.Ar_role);
      formData.append("En_role", datas.En_role);

      if (datas.ImageFile) {
        formData.append("ImageFile", datas.ImageFile[0]); // Add the file to formData
      }

      return postApi("/api/Taskforce", formData, {
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
      queryClient.invalidateQueries({ queryKey: ["Taskforce"] });
      navigate("/admin-dashboard/taskforce");
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

  const onSubmit = (datas: TaskForceFormValue) => {
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
            {
              <>
                <div className=" float-start col-span-1  flex h-[70px] flex-col ml-10">
                  <label className="text-md text-left mb-2 block font-bold text-gray-950">
                    Employee Photo
                  </label>
                  <FormField
                    control={form.control}
                    name="ImageFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              handleFileChange(e); // Set the preview and form data
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
                <Label text="الاسم بالكامل" />
                <FormField
                  control={form.control}
                  name="Ar_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"الاسم بالكامل"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          placeholder="ادخل الاسم بالكامل..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="الدرجة" />
                <FormField
                  control={form.control}
                  name="Ar_degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"الدرجة"}</FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          placeholder="ادخل الدرجة..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="المسمى الوظيفي" />
                <FormField
                  control={form.control}
                  name="Ar_role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"المسمى الوظيفي"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          placeholder="ادخل المسمى الوظيفي..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-start">
                  full name
                </label>
                <FormField
                  control={form.control}
                  name="En_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"full name"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-start">
                  degree
                </label>
                <FormField
                  control={form.control}
                  name="En_degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"degree"}</FormLabel>
                      <FormControl>
                        <Input placeholder="enter degree" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-start">
                  role
                </label>
                <FormField
                  control={form.control}
                  name="En_role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"role"}</FormLabel>
                      <FormControl>
                        <Input placeholder="enter role..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full -translate-x-10 flex justify-end">
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
            {
              <>
                <div className=" items-right col-span-1 flex h-[140px] flex-col mr-10">
                  <label className="text-md mb-2 block font-bold text-gray-950">
                    صورة الموظف
                  </label>
                  <FormField
                    control={form.control}
                    name="ImageFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              handleFileChange(e); // Set the preview and form data
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
                <Label text="الاسم بالكامل" />
                <FormField
                  control={form.control}
                  name="Ar_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"الاسم بالكامل"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل الاسم بالكامل..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="الدرجة" />
                <FormField
                  control={form.control}
                  name="Ar_degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"الدرجة"}</FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل الدرجة..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="المسمى الوظيفي" />
                <FormField
                  control={form.control}
                  name="Ar_role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"المسمى الوظيفي"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل المسمى الوظيفي..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-end">
                  full name
                </label>
                <FormField
                  control={form.control}
                  name="En_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"full name"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="enter full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-end">
                  degree
                </label>
                <FormField
                  control={form.control}
                  name="En_degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"degree"}</FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="enter degree"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-end">
                  role
                </label>
                <FormField
                  control={form.control}
                  name="En_role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"role"}</FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="enter role..."
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
              <Button className="text-lg inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-6 py-2  font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
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
