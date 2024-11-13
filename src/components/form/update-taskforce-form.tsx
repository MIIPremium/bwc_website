import React, { useEffect, useState } from "react";
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
import { addTaskForceSchema, TaskForceResp } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import { Button } from "../../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance, putApi } from "src/lib/http";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
type TaskForceFormValue = z.infer<typeof addTaskForceSchema>;

export default function UpdateTaskForce() {
  const {  i18n } = useTranslation();
  const dir = i18n.dir();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isNewFileSelected, setIsNewFileSelected] = useState(false);
  const form = useForm<z.infer<typeof addTaskForceSchema>>({
    resolver: zodResolver(addTaskForceSchema),
  });

  const fetchData = async () => {
    const response = await axiosInstance.get<TaskForceResp>(
      `/api/Taskforce/${id}`,
      {}
    );
    return response.data;
  };
  const {
    data: taskForceData,
    error: _taskForceError,
    isLoading: _taskForceIsLoading,
  } = useQuery({
    queryKey: ["TaskForce", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  useEffect(() => {
    if (taskForceData) {
      form.reset({
        Ar_name: taskForceData.ar_name,
        Ar_degree: taskForceData.ar_degree,
        Ar_role: taskForceData.ar_role,
        En_name: taskForceData.en_name,
        En_degree: taskForceData.en_degree,
        En_role: taskForceData.en_role,
      });

      // Set the existing image URL for preview
      setExistingImageUrl(taskForceData.img); // This should be the image URL string
    }
  }, [taskForceData]);

  const { mutate } = useMutation({
    mutationKey: ["UpdateTaskForce"],
    mutationFn: (datas: TaskForceFormValue) => {
      const formData = new FormData();
      formData.append("Ar_name", datas.Ar_name); // Corrected this from decisionDate to decisionName
      formData.append("En_name", datas.En_name);
      formData.append("Ar_degree", datas.Ar_degree);
      formData.append("En_degree", datas.En_degree);
      formData.append("Ar_role", datas.Ar_role);
      formData.append("En_role", datas.En_role);

      if (isNewFileSelected && datas.ImageFile && datas.ImageFile.length > 0) {
        formData.append("imageFile", datas.ImageFile[0]); // Send the first file in the FileList
      } else {
        formData.append("imageFile", existingImageUrl || ""); // Send the existing image URL
      }

      return putApi(`/api/Taskforce/${id}`, formData, {
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
      navigate("/admin-dashboard/taskforce");
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0]; // Get the first file

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Show the preview of the new image
      };
      reader.readAsDataURL(file);

      form.setValue("ImageFile", files); // Pass the FileList to the form
      setIsNewFileSelected(true); // Mark that a new file is selected
    } else {
      setPreview(null);
      setIsNewFileSelected(false); // No new file selected

      // Instead of setting "ImageFile" to null or undefined, skip updating it
      form.setValue("ImageFile", undefined as unknown as FileList); // Optional: if you must reset, but be careful with this
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
            className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] "
          >
            {
              <>
                <div className=" items-right col-span-1 translate-x-10 flex h-[140px] flex-col mr-10">
                  <label className="text-md mb-2  block font-bold text-gray-950">
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
            <div className="mt-4 mr-10 translate-x-10">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover"
                />
              ) : existingImageUrl ? (
                <img
                  src={existingImageUrl}
                  alt="Existing Image"
                  className="w-32 h-32 object-cover"
                />
              ) : (
                <p>No image uploaded</p>
              )}
            </div>
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
              <Button className="text-lg inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-6 py-2  font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Update
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
            <div className="mt-4 mr-10">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover"
                />
              ) : existingImageUrl ? (
                <img
                  src={existingImageUrl}
                  alt="Existing Image"
                  className="w-32 h-32 object-cover"
                />
              ) : (
                <p>No image uploaded</p>
              )}
            </div>
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
                تعديل
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
