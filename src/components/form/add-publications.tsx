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
  ACCEPTED_IMAGE_TYPES,
  Writer,
} from "../../types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addPublishes } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import { Button } from "../../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApi, patchApi, postApi } from "src/lib/http";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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


type PublishesFormValue = z.infer<typeof addPublishes>;
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
}
interface MutationData {
  id: number;
  tags: string[];
  t2read: number;
  writersIdes: number[];
  referencesIdes: number[];
  reportId: string;
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
export interface ReportPubResp {
  id: number;
  ar_Title: string;
  en_Title: string;
}


export default function AddPublications() {
  const {  i18n } = useTranslation();
  const dir = i18n.dir();

  const navigate = useNavigate();
  const [_preview, setPreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof addPublishes>>({
    resolver: zodResolver(addPublishes),
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
    queryFn: () => getApi<WriterProp[]>("/api/writers/writers"),
  });

  const { data: referenceData } = useQuery({
    queryKey: ["reference"],
    queryFn: () => getApi<ReferenceResp[]>("/api/References"),
  });
  const { data: ReportPub } = useQuery({
    queryKey: ["ReportPub"],
    queryFn: () => getApi<ReportPubResp[]>("/api/reports/pub"),
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
  const [_error, setError] = useState<string>("");

  useEffect(() => {
    form.setValue("writersIdes", selectedWriters);
    form.setValue("referencesIdes", selectedReference);
  }, []);

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
  const { mutate } = useMutation<WriterResponse, Error, PublishesFormValue>({
    mutationKey: ["AddPublishes"],
    mutationFn: (datas: PublishesFormValue) => {
      const formData = new FormData();
      formData.append("Ar_Title", datas.Ar_Title);
      formData.append("En_Title", datas.En_Title);
      formData.append("date_of_publish", datas.date_of_publish);
      formData.append("Ar_description", datas.Ar_description);
      formData.append("En_description", datas.En_description);
      formData.append("Ar_Note", datas.Ar_Note);
      formData.append("En_note", datas.En_note);

      if (datas.ImageFile) {
        formData.append("ImageFile", datas.ImageFile[0]);
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      return postApi("/api/Publications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data, variables) => {
      console.log("data.data.id", data.data.id);
      const publishesID = data.data.id;
      secondMutate({
        id: publishesID,
        tags: texts,
        t2read: +variables.t2read,
        writersIdes: selectedWriters,
        referencesIdes: selectedReference,
        reportId: variables.reportId ?? "",
      });
    },
    onError: (error) => {
      // Handle error
    },
  });

  // Second Mutation: Patching Publications
  const {
    mutate: secondMutate,
    isError: _secondIsError,
    isSuccess: _secondIsSuccess,
    isPending: _secondIsPending,
  } = useMutation({
    mutationKey: ["publishesPatch"],
    mutationFn: (datas: MutationData) => {
      console.log("id:", datas.id);
      console.log("Payload:", datas);
      return patchApi(`/api/Publications/${datas.id}`, {
        tags: datas.tags,
        t2read: datas.t2read,
        writersIdes: datas.writersIdes, // Corrected
        referencesIdes: datas.referencesIdes, // Corrected
        reportId: +datas.reportId,
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
      navigate("/admin-dashboard/publications");
      window.location.reload();
    },
    onError: (error) => {
      console.log("Second mutation error:", error);
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

  const onSubmit = (datas: PublishesFormValue) => {
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
                  path1="/admin-dashboard/publications"
                  tilte2=" publications"
                  path2="/admin-dashboard/publications"
                  tilte3="add publications"
                  path3="/admin-dashboard/add-publications"
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
                      <div className="text-start col-span-1 h-auto ">
                        <label htmlFor="">Publication Photo</label>
                        <FormField
                          control={form.control}
                          name="ImageFile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upload Image</FormLabel>
                              <FormControl>
                                <input
                                  type="file"
                                  className="float-start"
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
                                  className="float-start"
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
                        <Label text="عنوان المنشور" />
                        <FormField
                          control={form.control}
                          name="Ar_Title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"عنوان المنشور"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  dir="rtl"
                                  placeholder="ادخل عنوان المنشور..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="text-start col-span-1 h-auto ">
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
                    <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className="text-start col-span-1  ">
                        <label htmlFor="">writers</label>
                        <div className="card flex justify-center items-center">
                          <MultiSelect
                            dir="ltr"
                            value={selectedWriters}
                            onChange={(e) => setSelectedWriters(e.value)} // This will store only the selected writer IDs
                            options={writerOptions} // writerOptions is an array of { label, value }
                            optionLabel="label"
                            optionValue="value"
                            placeholder="select writers"
                            maxSelectedLabels={0}
                            className="w-full rounded-md border border-gray-300 bg-white shadow-sm py-[6px] translate-y-[3px] px-2 focus:ring focus:ring-indigo-500"
                            panelClassName="rounded-md bg-white px-2 py-2 shadow-lg border border-gray-300"
                            itemTemplate={(option) => {
                              if (!option) return null;

                              // Check if the current item's value (ID) is in the selectedWriters array (which only holds IDs)
                              const isItemSelected = selectedWriters.includes(
                                option.value
                              );

                              return (
                                <div
                                  className={`flex items-center justify-between gap-2 w-[370px] shadow-inner mb-1 p-2 rounded-lg cursor-pointer transition-all ${
                                    isItemSelected
                                      ? "bg-gray-200"
                                      : "hover:bg-gray-100"
                                  }`}
                                >
                                  <span className="text-lg">
                                    {option.label}
                                  </span>
                                </div>
                              );
                            }}
                            selectedItemTemplate={(option) => {
                              if (!option) return null;

                              return (
                                <div className="flex items-center gap-2">
                                  <span>{option.label}</span>
                                </div>
                              );
                            }}
                          />
                        </div>
                      </div>
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
                                  dir="ltr"
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
                        <Label text="Date Of Publish" />
                        <FormField
                          control={form.control}
                          name="date_of_publish"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"Date Of Publish"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  dir="ltr"
                                  type="date"
                                  placeholder="Enter Date Of Publish..."
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
                      <div className="text-start col-span-1  ">
                        <label htmlFor="">Reference</label>
                        <div className="card flex justify-center items-center">
                          <MultiSelect
                            dir="ltr"
                            value={selectedReference}
                            onChange={(e) => setSelectedReference(e.value)} // This will store only the selected writer IDs
                            options={referenceOptions} // writerOptions is an array of { label, value }
                            optionLabel="label"
                            optionValue="value"
                            placeholder="select references"
                            maxSelectedLabels={0}
                            className="w-full rounded-md border border-gray-300 bg-white shadow-sm py-[6px] translate-y-[3px] px-2 focus:ring focus:ring-indigo-500"
                            panelClassName="rounded-md bg-white px-2 py-2 shadow-lg border border-gray-300"
                            itemTemplate={(option) => {
                              if (!option) return null;

                              // Check if the current item's value (ID) is in the selectedWriters array (which only holds IDs)
                              const isItemSelected = selectedReference.includes(
                                option.value
                              );

                              return (
                                <div
                                  className={`flex items-center justify-between gap-2 w-[370px] shadow-inner mb-1 p-2 rounded-lg cursor-pointer transition-all ${
                                    isItemSelected
                                      ? "bg-gray-200"
                                      : "hover:bg-gray-100"
                                  }`}
                                >
                                  <span className="text-lg">
                                    {option.label}
                                  </span>
                                </div>
                              );
                            }}
                            selectedItemTemplate={(option) => {
                              if (!option) return null;

                              return (
                                <div className="flex items-center gap-2">
                                  <span>{option.label}</span>
                                </div>
                              );
                            }}
                          />
                        </div>
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
                      <div className="text-start col-span-1 h-auto ">
                        <label htmlFor="">Reports</label>
                        <FormField
                          control={form.control}
                          name="reportId"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                dir="ltr"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="select Report" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                  {ReportPub?.data.map((report) => (
                                    <SelectItem
                                      key={report.id}
                                      value={String(report.id)}
                                    >
                                      {report.ar_Title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className=" col-span-1 h-auto ">
                        <label htmlFor="">وصف المنشور</label>
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
                      <div className=" col-span-1 h-auto ">
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

                    <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
                      <div className=" col-span-3 h-auto translate-y-10">
                        <Label text="ملاحظة" />
                        <FormField
                          control={form.control}
                          name="Ar_Note"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"ملاحظة"}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  dir="rtl"
                                  className="bg-white border-2 border-[#d1d5db] rounded-xl"
                                  rows={5}
                                  {...field}
                                  placeholder="ادخل ملاحظة ..."
                                ></Textarea>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
                      <div className="text-start col-span-3 h-auto translate-y-10">
                        <Label text="Note" />
                        <FormField
                          control={form.control}
                          name="En_note"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"Note"}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  dir="ltr"
                                  className="bg-white border-2 border-[#d1d5db] rounded-xl"
                                  rows={5}
                                  {...field}
                                  placeholder="Enter Note ..."
                                ></Textarea>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="w-full -translate-x-10 flex justify-end mt-20 ">
                      <Button className=" mb-10 text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-lg font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
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
                  path1="/admin-dashboard/publications"
                  tilte2="  منشورات"
                  path2="/admin-dashboard/publications"
                  tilte3="إضافة  منشور"
                  path3="/admin-dashboard/add-publications"
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
                        <label htmlFor="">صورة المنشور</label>
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
                        <label>إضافة صور مشنور اخرى</label>
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
                        <Label text="عنوان المنشور" />
                        <FormField
                          control={form.control}
                          name="Ar_Title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"عنوان المنشور"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="ادخل عنوان المنشور..."
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
                    <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className=" col-span-1  ">
                        <label htmlFor="">الكاتب</label>
                        <div className="card flex justify-center items-center">
                          <MultiSelect
                            dir="rtl"
                            value={selectedWriters}
                            onChange={(e) => setSelectedWriters(e.value)} // This will store only the selected writer IDs
                            options={writerOptions} // writerOptions is an array of { label, value }
                            optionLabel="label"
                            optionValue="value"
                            placeholder="اختار الكاتب"
                            maxSelectedLabels={0}
                            className="w-full rounded-md border border-gray-300 bg-white shadow-sm py-[6px] translate-y-[3px] px-2 focus:ring focus:ring-indigo-500"
                            panelClassName="rounded-md bg-white px-2 py-2 shadow-lg border border-gray-300"
                            itemTemplate={(option) => {
                              if (!option) return null;

                              // Check if the current item's value (ID) is in the selectedWriters array (which only holds IDs)
                              const isItemSelected = selectedWriters.includes(
                                option.value
                              );

                              return (
                                <div
                                  className={`flex items-center justify-between gap-2 w-[370px] shadow-inner mb-1 p-2 rounded-lg cursor-pointer transition-all ${
                                    isItemSelected
                                      ? "bg-gray-200"
                                      : "hover:bg-gray-100"
                                  }`}
                                >
                                  <span className="text-lg">
                                    {option.label}
                                  </span>
                                </div>
                              );
                            }}
                            selectedItemTemplate={(option) => {
                              if (!option) return null;

                              return (
                                <div className="flex items-center gap-2">
                                  <span>{option.label}</span>
                                </div>
                              );
                            }}
                          />
                        </div>
                      </div>
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
                    </div>
                    <div className="grid  min-h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className=" col-span-1  ">
                        <label htmlFor="">المرجع</label>
                        <div className="card flex justify-center items-center">
                          <MultiSelect
                            dir="rtl"
                            value={selectedReference}
                            onChange={(e) => setSelectedReference(e.value)} // This will store only the selected writer IDs
                            options={referenceOptions} // writerOptions is an array of { label, value }
                            optionLabel="label"
                            optionValue="value"
                            placeholder="اختار مرجع"
                            maxSelectedLabels={0}
                            className="w-full rounded-md border border-gray-300 bg-white shadow-sm py-[6px] translate-y-[3px] px-2 focus:ring focus:ring-indigo-500"
                            panelClassName="rounded-md bg-white px-2 py-2 shadow-lg border border-gray-300"
                            itemTemplate={(option) => {
                              if (!option) return null;

                              // Check if the current item's value (ID) is in the selectedWriters array (which only holds IDs)
                              const isItemSelected = selectedReference.includes(
                                option.value
                              );

                              return (
                                <div
                                  className={`flex items-center justify-between gap-2 w-[370px] shadow-inner mb-1 p-2 rounded-lg cursor-pointer transition-all ${
                                    isItemSelected
                                      ? "bg-gray-200"
                                      : "hover:bg-gray-100"
                                  }`}
                                >
                                  <span className="text-lg">
                                    {option.label}
                                  </span>
                                </div>
                              );
                            }}
                            selectedItemTemplate={(option) => {
                              if (!option) return null;

                              return (
                                <div className="flex items-center gap-2">
                                  <span>{option.label}</span>
                                </div>
                              );
                            }}
                          />
                        </div>
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
                      <div className="col-span-1 h-auto ">
                        <label htmlFor="">التقارير</label>
                        <FormField
                          control={form.control}
                          name="reportId"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                dir="rtl"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختار تقرير" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                  {ReportPub?.data.map((report) => (
                                    <SelectItem
                                      key={report.id}
                                      value={String(report.id)}
                                    >
                                      {report.ar_Title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                      <div className=" col-span-1 h-auto ">
                        <label htmlFor="">وصف المنشور</label>
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
                      <div className=" col-span-1 h-auto ">
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

                    <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
                      <div className=" col-span-3 h-auto translate-y-10">
                        <Label text="ملاحظة" />
                        <FormField
                          control={form.control}
                          name="Ar_Note"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"ملاحظة"}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  className="bg-white border-2 border-[#d1d5db] rounded-xl"
                                  rows={5}
                                  {...field}
                                  placeholder="ادخل ملاحظة ..."
                                ></Textarea>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
                      <div className="text-end col-span-3 h-auto translate-y-10">
                        <Label text="Note" />
                        <FormField
                          control={form.control}
                          name="En_note"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-900">
                                {"Note"}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  dir="ltr"
                                  className="bg-white border-2 border-[#d1d5db] rounded-xl"
                                  rows={5}
                                  {...field}
                                  placeholder="Enter Note ..."
                                ></Textarea>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="w-full translate-x-10 flex justify-end mt-20 ">
                      <Button className=" mb-10 text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
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
