import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILES,
  publishes,
  Writer,
} from "../../types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addNews } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import { Button } from "../../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApi, patchApi, postApi } from "src/lib/http";
import { useToast } from "src/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Tiptap from "src/ui/Tiptap";
import { Textarea } from "src/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/ui/select";
import EngTiptap from "src/ui/EngTiptap";
import { MultiSelect } from "primereact/multiselect";
import { Badge } from "src/ui/badge";
import { CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";
import EnBreadcrumb from "src/ui/en-breadcrumb";
import Breadcrumb from "src/ui/breadcrumb";

type WriterOption = {
  value: number;
};
type ReferenceOption = {
  label: string;
  value: number;
};
type NewsFormValue = z.infer<typeof addNews>;
interface WriterResponse {
  data: {
    id: number;
    type: string;
    ar_Title: string;
    en_Title: string;
    b_image: string;
    images: string[];
    writers: Writer[];
    reportId: null;
    report: null;
    publish: boolean;
    t2read: number;
    tags: string[] | null;
    date_of_publish: Date;
    ar_table_of_content: null;
    en_table_of_content: null;
    ar_description: string;
    en_description: string;
    ar_Note: null;
    en_Note: string;
    references: any[];
  };
}
export interface WriterProp {
  id: number;
  ar_fullName: string;
  en_fullName: string;
  image: string;
  ar_description: string;
  en_description: string;
  ar_role: string;
  en_role: string;
  publication: any[];
  soicalmedia: Soicalmedia[];
}
interface MutationData {
  id: number;
  tags: string[];
}
export interface Soicalmedia {
  id: number;
  name: string;
  url: string;
  writerId: number;
  writer: null;
}
export type ReferenceResp = {
  id: number;
  ar_title: string;
  en_title: string;
  link: string;
};
const kindOfCase = [
  { label: "منشورات", value: 1 },
  { label: "الاخبار", value: 2 },
  { label: "تحليلات", value: 3 },
] as const;
export default function AddNews() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const form = useForm<z.infer<typeof addNews>>({
    resolver: zodResolver(addNews),
  });
  const [texts, setTexts] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleDelete = (index: number, field: any) => {
    const updatedTexts = texts.filter((_, i) => i !== index);
    setTexts(updatedTexts);
    field.onChange(updatedTexts);
  };
  const { data } = useQuery({
    queryKey: ["writer"],
    queryFn: () => getApi<WriterProp[]>("/api/Writers"),
  });

  const { data: referenceData } = useQuery({
    queryKey: ["reference"],
    queryFn: () => getApi<ReferenceResp[]>("/api/References"),
  });

  const [selectedWriters, setSelectedWriters] = useState<number[]>([]);

  const [selectedReference, setSelectedReference] = useState<number[]>([]);

  const writerOptions = data?.data.map((writer) => ({
    label: writer.ar_fullName,
    value: writer.id,
  }));

  const referenceOptions = referenceData?.data.map((writer) => ({
    label: writer.ar_title,
    value: writer.id,
  }));
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

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

  // First Mutation: Adding Publications
  const { mutate } = useMutation<WriterResponse, Error, NewsFormValue>({
    mutationKey: ["AddNews"],
    mutationFn: (datas: NewsFormValue) => {
      const formData = new FormData();
      formData.append("Ar_Title", datas.Ar_Title);
      formData.append("En_Title", datas.En_Title);
      formData.append("date_of_publish", datas.date_of_publish);
      formData.append("Ar_description", datas.Ar_description);
      formData.append("En_description", datas.En_description);
      formData.append("t2read", datas.t2read);

      if (datas.ImageFile) {
        formData.append("ImageFile", datas.ImageFile[0]);
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      return postApi("/api/News", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data, variables) => {
      const publishesID = data.data.id;
      secondMutate({
        id: publishesID,
        tags: texts,
      });
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

  // Second Mutation: Patching Publications
  const {
    mutate: secondMutate,
    isError: secondIsError,
    isSuccess: secondIsSuccess,
    isPending: secondIsPending,
  } = useMutation({
    mutationKey: ["publishesPatch"],
    mutationFn: (datas: MutationData) => {
      return patchApi(`/api/News/${datas.id}`, {
        tags: datas.tags,
      });
    },
    onSuccess: (data) => {
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
      navigate("/admin-dashboard/news");
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

  const handleMultiFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // Validate files using Zod schema
      const validation = addNews.safeParse({ images: fileArray });
      if (!validation.success) {
        setSelectedFiles([]);
        setPreviewUrls([]);
        setError(validation.error.errors[0].message);
        return;
      }

      setSelectedFiles(fileArray);

      // Generate preview URLs
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);

      // Update form state with File[]
      form.setValue("images", fileArray);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedFiles = [...selectedFiles];
    const updatedUrls = [...previewUrls];

    // Revoke the object URL to free memory
    URL.revokeObjectURL(updatedUrls[index]);

    // Remove the file and URL from the arrays
    updatedFiles.splice(index, 1);
    updatedUrls.splice(index, 1);

    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedUrls);

    // Update form state
    form.setValue("images", updatedFiles);
  };

  const onSubmit = (datas: NewsFormValue) => {
    mutate(datas);
  };

  return (
    <>
      {dir === "ltr" ? (
        <main>
          <div className="min-h-screen  w-full text-right bg-[#f2f2f2]">
            <div className="grid grid-cols-1">
              <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
                <EnBreadcrumb
                  tilte1="Publications"
                  path1="/admin-dashboard/news"
                  tilte2=" news"
                  path2="/admin-dashboard/news"
                  tilte3="add news"
                  path3="/admin-dashboard/Add-news"
                />

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] px-9"
                  >
                    <div className="grid h-[100px]  grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right "></div>
                    <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className="text-start col-span-1 h-auto ">
                        <label htmlFor="">News Photo</label>
                        <FormField
                          control={form.control}
                          name="ImageFile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upload Image</FormLabel>
                              <FormControl>
                                <input
                                  dir="ltr"
                                  className="float-start"
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
                    </div>
                    <div className="grid  min-h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className="text-start col-span-1 h-auto">
                        <label>Add other photos</label>
                        <FormField
                          control={form.control}
                          name="images"
                          render={() => (
                            <FormItem>
                              <FormLabel>Upload Images</FormLabel>
                              <FormControl>
                                <input
                                  dir="ltr"
                                  type="file"
                                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                  multiple
                                  onChange={(e) => {
                                    setSelectedFiles(
                                      Array.from(e.target.files ?? [])
                                    );
                                  }}
                                  disabled={false}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {selectedFiles.map((x) => (
                          <p key={x.name}>{x.name}</p>
                        ))}
                      </div>

                      <div className=" col-span-1 h-auto ">
                        <Label text="عنوان الخبر" />
                        <FormField
                          control={form.control}
                          name="Ar_Title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"عنوان الخبر"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  dir="rtl"
                                  placeholder="ادخل عنوان الخبر..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="text-start col-span-1 h-auto ">
                        <Label text="News Title" />
                        <FormField
                          control={form.control}
                          name="En_Title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"News Title"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="enter News Title..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid  min-h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className="text-start col-span-1 h-auto ">
                        <Label text="Time to read" />
                        <FormField
                          control={form.control}
                          name="t2read"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"Time to read"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Enter Time to read..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="text-start col-span-1 h-auto ">
                        <Label text="date of publication" />
                        <FormField
                          control={form.control}
                          name="date_of_publish"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"date of publication"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  dir="ltr"
                                  type="date"
                                  placeholder="enter date of publication..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="text-start col-span-1 h-auto ">
                        <Label text="Tags" />
                        <FormField
                          control={form.control}
                          name="tags"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900"></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    dir="ltr"
                                    placeholder="Enter Tags ..."
                                    value={inputValue}
                                    onChange={(e) => {
                                      setInputValue(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === "Enter" &&
                                        inputValue.trim()
                                      ) {
                                        const newValues = Array.isArray(
                                          field.value
                                        )
                                          ? [...field.value, inputValue]
                                          : [inputValue];
                                        field.onChange(newValues);
                                        setTexts(newValues);
                                        setInputValue("");
                                        e.preventDefault();
                                      }
                                    }}
                                    name={field.name}
                                    ref={field.ref}
                                    onBlur={field.onBlur}
                                    className="pr-20"
                                  />

                                  {Array.isArray(field.value) &&
                                    field.value.length > 0 && (
                                      <Badge className="absolute right-2 top-2">
                                        {`تم تحديد ${field.value.length}`}
                                      </Badge>
                                    )}

                                  {Array.isArray(field.value) &&
                                    field.value.length > 0 &&
                                    field.value.map(
                                      (item: string, index: number) => (
                                        <div
                                          key={index}
                                          className="flex items-center  "
                                        >
                                          <span>{item}</span>
                                          <button
                                            type="button"
                                            className="ml-2 text-red-500"
                                            onClick={() =>
                                              handleDelete(index, field)
                                            }
                                          >
                                            <CircleX />
                                          </button>
                                        </div>
                                      )
                                    )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className=" col-span-1 h-auto ">
                        <label htmlFor="">وصف الخبر</label>
                        <FormField
                          control={form.control}
                          name="Ar_description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>sadasd</FormLabel>
                              <FormControl>
                                <Tiptap
                                  description={"ادخل الوصف"}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className="text-end col-span-1 h-auto ">
                        <label htmlFor="">Description </label>
                        <FormField
                          control={form.control}
                          name="En_description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>sadasd</FormLabel>
                              <FormControl>
                                <EngTiptap
                                  description={"Enter the Description "}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="w-full -translate-x-10 flex justify-end mt-20 ">
                      <Button className=" mb-10 text-md inline-flex h-10 px-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000]  py-2 text-lg font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Add
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main>
          <div className=" min-h-screen  w-full text-right bg-[#f2f2f2]">
            <div className="grid grid-cols-1">
              <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
                <Breadcrumb
                  tilte1="المنشورات"
                  path1="/admin-dashboard/news"
                  tilte2="  الاخبار"
                  path2="/admin-dashboard/news"
                  tilte3="إضافة خبر"
                  path3="/admin-dashboard/Add-news"
                />

                <Form {...form}>
                  {process.env.NODE_ENV === "development" && (
                    <>
                      <p>Ignore it, it just in dev mode</p>
                      <div>{JSON.stringify(form.formState.errors)}</div>
                    </>
                  )}

                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] px-9"
                  >
                    <div className="grid h-[100px]  grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right "></div>
                    <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className=" col-span-1 h-auto ">
                        <label htmlFor="">صورة الخبر</label>
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
                    </div>
                    <div className="grid  min-h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className="col-span-1 h-auto">
                        <label>إضافة صور للخبر اخرى</label>
                        <FormField
                          control={form.control}
                          name="images"
                          render={() => (
                            <FormItem>
                              <FormLabel>Upload Images</FormLabel>
                              <FormControl>
                                <input
                                  type="file"
                                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                  multiple
                                  onChange={(e) => {
                                    setSelectedFiles(
                                      Array.from(e.target.files ?? [])
                                    );
                                  }}
                                  disabled={false}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {selectedFiles.map((x) => (
                          <p key={x.name}>{x.name}</p>
                        ))}
                      </div>

                      <div className=" col-span-1 h-auto ">
                        <Label text="عنوان الخبر" />
                        <FormField
                          control={form.control}
                          name="Ar_Title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"عنوان الخبر"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="ادخل عنوان الخبر..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="text-end col-span-1 h-auto ">
                        <Label text="Publish Title" />
                        <FormField
                          control={form.control}
                          name="En_Title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"Publish Title"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  dir="ltr"
                                  placeholder="enter Publish Title..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid  min-h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className=" col-span-1 h-auto ">
                        <Label text="وقت القراءه" />
                        <FormField
                          control={form.control}
                          name="t2read"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"وقت القراءه"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="ادخل وقت القراءه..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className=" col-span-1 h-auto ">
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
                                <Input
                                  type="date"
                                  placeholder="ادخل تاريخ النشر..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-1 h-auto ">
                        <Label text="وسوم" />
                        <FormField
                          control={form.control}
                          name="tags"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900"></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    dir="rtl"
                                    placeholder="ادخل الوسوم..."
                                    value={inputValue}
                                    onChange={(e) => {
                                      setInputValue(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === "Enter" &&
                                        inputValue.trim()
                                      ) {
                                        const newValues = Array.isArray(
                                          field.value
                                        )
                                          ? [...field.value, inputValue]
                                          : [inputValue];
                                        field.onChange(newValues);
                                        setTexts(newValues);
                                        setInputValue("");
                                        e.preventDefault();
                                      }
                                    }}
                                    name={field.name}
                                    ref={field.ref}
                                    onBlur={field.onBlur}
                                    className="pr-20"
                                  />

                                  {Array.isArray(field.value) &&
                                    field.value.length > 0 && (
                                      <Badge className="absolute right-2 top-2">
                                        {`تم تحديد ${field.value.length}`}
                                      </Badge>
                                    )}

                                  {Array.isArray(field.value) &&
                                    field.value.length > 0 &&
                                    field.value.map(
                                      (item: string, index: number) => (
                                        <div
                                          key={index}
                                          className="flex items-center  "
                                        >
                                          <span>{item}</span>
                                          <button
                                            type="button"
                                            className="ml-2 text-red-500"
                                            onClick={() =>
                                              handleDelete(index, field)
                                            }
                                          >
                                            <CircleX />
                                          </button>
                                        </div>
                                      )
                                    )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className=" col-span-1 h-auto ">
                        <label htmlFor="">وصف الخبر</label>
                        <FormField
                          control={form.control}
                          name="Ar_description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>sadasd</FormLabel>
                              <FormControl>
                                <Tiptap
                                  description={"ادخل الوصف"}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className="text-end col-span-1 h-auto ">
                        <label htmlFor="">Description </label>
                        <FormField
                          control={form.control}
                          name="En_description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>sadasd</FormLabel>
                              <FormControl>
                                <EngTiptap
                                  description={"Enter the Description "}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="w-full translate-x-10 flex justify-end mt-20 ">
                      <Button className=" mb-10 text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-lg font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        إضافة
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
