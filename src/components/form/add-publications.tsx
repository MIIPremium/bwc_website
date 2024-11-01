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
import { addPublishes } from "src/types/validation";
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

type WriterOption = {
  value: number;
};
type ReferenceOption = {
  label: string;
  value: number;
};
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
  en_fullName: string;
  image: string;
  no_of_publication: number;
}
interface MutationData {
  id: number;
  tags: string[];
  t2read: number;
  writersIdes: number[];
  referencesIdes: number[];
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
export default function AddPublications() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
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

  useEffect(() => {
    form.setValue("writersIdes", selectedWriters);
    form.setValue("referencesIdes", selectedReference);
    if (id) {
      const numericId = parseInt(id, 10);
      setSelectedValue(numericId);
    }
  }, [id]);

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
      });
    },
    onError: (error) => {
      // Handle error
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
      console.log("id:", datas.id);
      console.log("Payload:", datas);
      return patchApi(`/api/Publications/${datas.id}`, {
        tags: datas.tags,
        t2read: datas.t2read,
        writersIdes: datas.writersIdes, // Corrected
        referencesIdes: datas.referencesIdes, // Corrected
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

  const handleMultiFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // Validate files using Zod schema
      const validation = addPublishes.safeParse({ images: fileArray });
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

  const onSubmit = (datas: PublishesFormValue) => {
    mutate(datas);
  };

  return (
    <>
      {selectedValue !== null ? (
        selectedValue === 1 ? (
          <>
            {dir === "ltr" ? (
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
                  <div className="grid h-[100px]  grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                    {/* <div className="col-span-2 h-[50px] mt-7">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="col-span-2 flex">
                        {kindOfCase.map((caseType) => (
                          <label
                            key={caseType.value}
                            className="flex items-center w-full space-x-2"
                          >
                            <FormControl>
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  value={caseType.value}
                                  checked={selectedValue === caseType.value}
                                  onChange={() => {
                                    const newValue =
                                      selectedValue === caseType.value
                                        ? null
                                        : caseType.value;
                                    setSelectedValue(newValue);
                                    field.onChange(newValue);
                                  }}
                                  className="appearance-none w-6 h-6 border border-gray-300 rounded-full checked:bg-[#D5AE78] checked:border-transparent focus:outline-none"
                                />

                                <svg
                                  className={`w-4 h-4 text-white absolute top-1 left-1 pointer-events-none ${
                                    selectedValue === caseType.value
                                      ? "block"
                                      : "hidden"
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </FormControl>
                            <h1 className="ml-2">{caseType.label}</h1>
                          </label>
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                  </div>
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
                                <span className="text-lg">{option.label}</span>
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
                                <span className="text-lg">{option.label}</span>
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
            ) : (
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
                  <div className="grid h-[100px]  grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                    {/* <div className="col-span-2 h-[50px] mt-7">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="col-span-2 flex">
                        {kindOfCase.map((caseType) => (
                          <label
                            key={caseType.value}
                            className="flex items-center w-full space-x-2"
                          >
                            <FormControl>
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  value={caseType.value}
                                  checked={selectedValue === caseType.value}
                                  onChange={() => {
                                    const newValue =
                                      selectedValue === caseType.value
                                        ? null
                                        : caseType.value;
                                    setSelectedValue(newValue);
                                    field.onChange(newValue);
                                  }}
                                  className="appearance-none w-6 h-6 border border-gray-300 rounded-full checked:bg-[#D5AE78] checked:border-transparent focus:outline-none"
                                />

                                <svg
                                  className={`w-4 h-4 text-white absolute top-1 left-1 pointer-events-none ${
                                    selectedValue === caseType.value
                                      ? "block"
                                      : "hidden"
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </FormControl>
                            <h1 className="ml-2">{caseType.label}</h1>
                          </label>
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                  </div>
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
                                <span className="text-lg">{option.label}</span>
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
                                <span className="text-lg">{option.label}</span>
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
            )}
          </>
        ) : selectedValue === 2 ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] px-9"
            >
              {/* <div className="grid h-[100px]  grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className="col-span-2 h-[50px] mt-7">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="col-span-2 flex">
                        {kindOfCase.map((caseType) => (
                          <label
                            key={caseType.value}
                            className="flex items-center w-full space-x-2"
                          >
                            <FormControl>
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  value={caseType.value}
                                  checked={selectedValue === caseType.value}
                                  onChange={() => {
                                    const newValue =
                                      selectedValue === caseType.value
                                        ? null
                                        : caseType.value;
                                    setSelectedValue(newValue);
                                    field.onChange(newValue);
                                  }}
                                  className="appearance-none w-6 h-6 border border-gray-300 rounded-full checked:bg-[#D5AE78] checked:border-transparent focus:outline-none"
                                />

                                <svg
                                  className={`w-4 h-4 text-white absolute top-1 left-1 pointer-events-none ${
                                    selectedValue === caseType.value
                                      ? "block"
                                      : "hidden"
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </FormControl>
                            <h1 className="ml-2">{caseType.label}</h1>
                          </label>
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div> */}
              <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1 h-auto ">
                  <label htmlFor="">صورة الخبر</label>
                  {/* <FormField
                    control={form.control}
                    name="type"
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>

                          <input type="file" accept="image/*" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
              <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1 h-auto ">
                  <label htmlFor="">إضافة صور الخبر اخرى</label>
                  <FormField
                    control={form.control}
                    name="ImageFile"
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>
                          {/* New Image Upload */}
                          <input type="file" accept="image/*" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" col-span-1 h-auto ">
                  <Label text="عنوان الخبر" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-900">
                          {"عنوان الخبر"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ادخل عنوان الخبر..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
                <div className=" col-span-1 h-auto ">
                  <Label text="News Title" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-900">
                          {"News Title"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="enter News Title..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
              <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1  ">
                  <label htmlFor="">اختار النوع</label>
                  {/* <FormField
                    control={form.control}
                    name="type"
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl className="w-full">
                         
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="ابحث بالسنة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">2024</SelectItem>
                              <SelectItem value="dark">2023</SelectItem>
                              <SelectItem value="system">2022</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
                <div className=" col-span-1 h-auto ">
                  <Label text="وقت القراءه" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-900">
                          {"وقت القراءه"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="ادخل وقت القراءه..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
                <div className=" col-span-1 h-auto ">
                  <Label text="تاريخ النشر" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
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
                  /> */}
                </div>
              </div>

              <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1 h-auto ">
                  <label htmlFor="">وصف الخبر</label>
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>sadasd</FormLabel>
                        <FormControl>
                          <Tiptap
                            description={"ادخل وصف الخبر"}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
              <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1 h-auto ">
                  <label htmlFor="">Description </label>
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>sadasd</FormLabel>
                        <FormControl>
                          <Tiptap
                            description={"Enter the name filed"}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>

              <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
                <div className=" col-span-3 h-auto translate-y-10">
                  <Label text="ملاحظة" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
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
                  /> */}
                </div>
              </div>
              <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
                <div className=" col-span-3 h-auto translate-y-10">
                  <Label text="Note" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-900">{"Note"}</FormLabel>
                        <FormControl>
                          <Textarea
                            className="bg-white border-2 border-[#d1d5db] rounded-xl"
                            rows={5}
                            {...field}
                            placeholder="Enter Note ..."
                          ></Textarea>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
              <div className="w-full translate-x-10 flex justify-end mt-20 ">
                <Button className=" mb-10 text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-4 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  إضافة
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] px-9"
            >
              {/* <div className="grid h-[100px]  grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className="col-span-2 h-[50px] mt-7">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="col-span-2 flex">
                        {kindOfCase.map((caseType) => (
                          <label
                            key={caseType.value}
                            className="flex items-center w-full space-x-2"
                          >
                            <FormControl>
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  value={caseType.value}
                                  checked={selectedValue === caseType.value}
                                  onChange={() => {
                                    const newValue =
                                      selectedValue === caseType.value
                                        ? null
                                        : caseType.value;
                                    setSelectedValue(newValue);
                                    field.onChange(newValue);
                                  }}
                                  className="appearance-none w-6 h-6 border border-gray-300 rounded-full checked:bg-[#D5AE78] checked:border-transparent focus:outline-none"
                                />

                                <svg
                                  className={`w-4 h-4 text-white absolute top-1 left-1 pointer-events-none ${
                                    selectedValue === caseType.value
                                      ? "block"
                                      : "hidden"
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </FormControl>
                            <h1 className="ml-2">{caseType.label}</h1>
                          </label>
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div> */}
              <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1 h-auto ">
                  <label htmlFor="">صورة التحليل</label>
                  {/* <FormField
                    control={form.control}
                    name="type"
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>

                          <input type="file" accept="image/*" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
              <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1 h-auto ">
                  <label htmlFor="">إضافة صور التحليل اخرى</label>
                  <FormField
                    control={form.control}
                    name="ImageFile"
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>
                          {/* New Image Upload */}
                          <input type="file" accept="image/*" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" col-span-1 h-auto ">
                  <Label text="عنوان التحليل" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-900">
                          {"عنوان التحليل"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ادخل عنوان التحليل..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
                <div className=" col-span-1 h-auto ">
                  <Label text="Analysis Title" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-900">
                          {"Analysis Title"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="enter Analysis Title..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
              <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1  ">
                  <label htmlFor="">اختار الكاتب</label>
                  {/* <FormField
                    control={form.control}
                    name="type"
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl className="w-full">
                          
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="ابحث بالسنة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">2024</SelectItem>
                              <SelectItem value="dark">2023</SelectItem>
                              <SelectItem value="system">2022</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
                <div className=" col-span-1 h-auto ">
                  <Label text="وقت القراءه" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-900">
                          {"وقت القراءه"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="ادخل وقت القراءه..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
                <div className=" col-span-1 h-auto ">
                  <Label text="تاريخ النشر" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
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
                  /> */}
                </div>
              </div>
              <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1  ">
                  <label htmlFor="">اختار المرجع</label>
                  {/* <FormField
                    control={form.control}
                    name="type"
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl className="w-full">
                          
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="ابحث بالسنة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">2024</SelectItem>
                              <SelectItem value="dark">2023</SelectItem>
                              <SelectItem value="system">2022</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
                <div className=" col-span-1 h-auto ">
                  <Label text="اسم التقرير" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-900">
                          {"اسم التقرير"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ادخل اسم التقرير..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
                <div className=" col-span-1 h-auto ">
                  <Label text="Report name" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-900">
                          {"Report name"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="enter Report name..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
              <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1 h-auto ">
                  <label htmlFor="">وصف التحليل</label>
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>sadasd</FormLabel>
                        <FormControl>
                          <Tiptap
                            description={"ادخل وصف التحليل"}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
              <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
                <div className=" col-span-1 h-auto ">
                  <label htmlFor="">Description </label>
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>sadasd</FormLabel>
                        <FormControl>
                          <Tiptap
                            description={"Enter the name filed"}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>

              <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
                <div className=" col-span-3 h-auto translate-y-10">
                  <Label text="ملاحظة" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
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
                  /> */}
                </div>
              </div>
              <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
                <div className=" col-span-3 h-auto translate-y-10">
                  <Label text="Note" />
                  {/* <FormField
                    control={form.control}
                    name="ar_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-900">{"Note"}</FormLabel>
                        <FormControl>
                          <Textarea
                            className="bg-white border-2 border-[#d1d5db] rounded-xl"
                            rows={5}
                            {...field}
                            placeholder="Enter Note ..."
                          ></Textarea>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
              <div className="w-full translate-x-10 flex justify-end mt-20 ">
                <Button className=" mb-10 text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-4 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  إضافة
                </Button>
              </div>
            </form>
          </Form>
        )
      ) : (
        <p>No value selected</p>
      )}
    </>
  );
}
