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
import { addReportsScheme } from "src/types/validation";
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
type AddReportsFormValue = z.infer<typeof addReportsScheme>;
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
export default function AddReportsForm() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const form = useForm<z.infer<typeof addReportsScheme>>({
    resolver: zodResolver(addReportsScheme),
  });

  //
  const [tableOfContentAr, setTableOfContentAr] = useState<string[]>([]);
  const [inputValueTableOfContentAr, setInputValueTableOfContentAr] =
    useState<string>("");

  //
  const [tableOfContentEn, setTableOfContentEn] = useState<string[]>([]);
  const [inputValueTableOfContentEn, setInputValueTableOfContentEn] =
    useState<string>("");

  const handleTableOfContentArDelete = (index: number, field: any) => {
    const updatedTableOfContentAr = tableOfContentAr.filter(
      (_, i) => i !== index
    );
    setTableOfContentAr(updatedTableOfContentAr);
    field.onChange(updatedTableOfContentAr);
  };

  const handleTableOfContentEnDelete = (index: number, field: any) => {
    const updatedTableOfContentEn = tableOfContentEn.filter(
      (_, i) => i !== index
    );
    setTableOfContentEn(updatedTableOfContentEn);
    field.onChange(updatedTableOfContentEn);
  };
  const { data } = useQuery({
    queryKey: ["writer"],
    queryFn: () => getApi<WriterProp[]>("/api/Writers"),
  });

  const { data: referenceData } = useQuery({
    queryKey: ["reference"],
    queryFn: () => getApi<ReferenceResp[]>("/api/References"),
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFilePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || undefined;
    if (file) {
      setSelectedFile(file);
      form.setValue("pdfFile", file);
    }
  };

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
  const { mutate } = useMutation({
    mutationKey: ["addReportsScheme"],
    mutationFn: (datas: AddReportsFormValue) => {
      const formData = new FormData();
      formData.append("Ar_Title", datas.Ar_Title);
      formData.append("En_Title", datas.En_Title);
      formData.append("date_of_report", datas.date_of_report);
      formData.append("date_of_publish", datas.date_of_publish);
      formData.append("Ar_description", datas.Ar_description);
      formData.append("En_description", datas.En_description);
      formData.append("Ar_executive_summary", datas.Ar_executive_summary);
      formData.append("En_executive_summary", datas.En_executive_summary);
      formData.append("An_note", datas.An_note);
      formData.append("En_note", datas.En_note);
      formData.append("pdfFile", datas.pdfFile as Blob);
      if (datas.Img) {
        formData.append("Img", datas.Img[0]);
      }
      if (datas.pdfImg) {
        formData.append("pdfImg", datas.pdfImg[0]);
      }
      for (let i = 0; i < tableOfContentAr.length; i++) {
        formData.append("Ar_table_of_content", tableOfContentAr[i]);
      }
      for (let i = 0; i < tableOfContentEn.length; i++) {
        formData.append("En_table_of_content", tableOfContentEn[i]);
      }
      return postApi("/api/Reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data, variables) => {
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
      navigate("/admin-dashboard/reports");
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

  const onSubmit = (datas: AddReportsFormValue) => {
    mutate(datas);
  };

  return (
    // <>
    //   {dir === "ltr" ? (
    //     <Form {...form}>
    //       {process.env.NODE_ENV === "development" && (
    //         <>
    //           <p>Ignore it, it just in dev mode</p>
    //           <div>{JSON.stringify(form.formState.errors)}</div>
    //         </>
    //       )}
    //       <form
    //         onSubmit={form.handleSubmit(onSubmit)}
    //         className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] px-9"
    //       >
    //         <div className="grid h-[100px]  grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right "></div>
    //         <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className="text-start col-span-1 h-auto ">
    //             <label htmlFor="">Report Image</label>
    //             <FormField
    //               control={form.control}
    //               name="Img"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Upload Image</FormLabel>
    //                   <FormControl>
    //                     <input
    //                       type="file"
    //                       accept="image/*"
    //                       onChange={(e) => {
    //                         field.onChange(e.target.files);
    //                         handleFileChange(e); // Set the preview and form data
    //                       }}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  min-h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className=" col-span-1 h-auto ">
    //             <Label text="عنوان التقرير" />
    //             <FormField
    //               control={form.control}
    //               name="Ar_Title"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">
    //                     {"عنوان التقرير"}
    //                   </FormLabel>
    //                   <FormControl>
    //                     <Input
    //                       dir="rtl"
    //                       placeholder="ادخل عنوان التقرير..."
    //                       {...field}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //           <div className="text-start col-span-1 h-auto ">
    //             <Label text="Report Title" />
    //             <FormField
    //               control={form.control}
    //               name="En_Title"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">
    //                     {"Report Title"}
    //                   </FormLabel>
    //                   <FormControl>
    //                     <Input
    //                       dir="ltr"
    //                       placeholder="enter Report Title..."
    //                       {...field}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //           <div className="text-start col-span-1 h-auto ">
    //             <Label text="Date Of Publish" />
    //             <FormField
    //               control={form.control}
    //               name="date_of_publish"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">
    //                     {"Date Of Publish"}
    //                   </FormLabel>
    //                   <FormControl>
    //                     <Input
    //                       dir="ltr"
    //                       type="date"
    //                       placeholder="Enter Date Of Publish..."
    //                       {...field}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className="text-start col-span-1 h-auto ">
    //             <Label text="Date Of Report" />
    //             <FormField
    //               control={form.control}
    //               name="date_of_report"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">
    //                     {"Date Of Report"}
    //                   </FormLabel>
    //                   <FormControl>
    //                     <Input
    //                       type="date"
    //                       placeholder="Enter Date Of Report..."
    //                       {...field}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //           <div className="text-start col-span-1 h-auto ">
    //             <label htmlFor="">File Link</label>
    //             <FormField
    //               control={form.control}
    //               name="pdfImg"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Upload Image</FormLabel>
    //                   <FormControl>
    //                     <input
    //                       type="file"
    //                       accept=".pdf"
    //                       onChange={handleFilePdfChange}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //           <div className="text-start col-span-1 h-auto ">
    //             <label htmlFor="">Cover image of the report</label>
    //             <FormField
    //               control={form.control}
    //               name="pdfImg"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Upload Image</FormLabel>
    //                   <FormControl>
    //                     <input
    //                       type="file"
    //                       accept="image/*"
    //                       onChange={(e) => {
    //                         field.onChange(e.target.files);
    //                         handleFileChange(e); // Set the preview and form data
    //                       }}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  min-h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className="col-span-1 h-auto ">
    //             <Label text="جدول محتويات" />
    //             <FormField
    //               control={form.control}
    //               name="Ar_table_of_content"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900"></FormLabel>
    //                   <FormControl>
    //                     <div className="relative">
    //                       <Input
    //                         dir="rtl"
    //                         placeholder="ادخل جدول محتويات..."
    //                         value={inputValueTableOfContentAr}
    //                         onChange={(e) => {
    //                           setInputValueTableOfContentAr(e.target.value);
    //                         }}
    //                         onKeyDown={(e) => {
    //                           if (
    //                             e.key === "Enter" &&
    //                             inputValueTableOfContentAr.trim()
    //                           ) {
    //                             const newValues = Array.isArray(field.value)
    //                               ? [...field.value, inputValueTableOfContentAr]
    //                               : [inputValueTableOfContentAr];
    //                             field.onChange(newValues);
    //                             setTableOfContentAr(newValues);
    //                             setInputValueTableOfContentAr("");
    //                             e.preventDefault();
    //                           }
    //                         }}
    //                         name={field.name}
    //                         ref={field.ref}
    //                         onBlur={field.onBlur}
    //                         className="pr-20"
    //                       />

    //                       {Array.isArray(field.value) &&
    //                         field.value.length > 0 && (
    //                           <Badge className="absolute right-2 top-2">
    //                             {`تم تحديد ${field.value.length}`}
    //                           </Badge>
    //                         )}

    //                       {Array.isArray(field.value) &&
    //                         field.value.length > 0 &&
    //                         field.value.map((item: string, index: number) => (
    //                           <div key={index} className="flex items-center  ">
    //                             <span>{item}</span>
    //                             <button
    //                               type="button"
    //                               className="ml-2 text-red-500"
    //                               onClick={() =>
    //                                 handleTableOfContentArDelete(index, field)
    //                               }
    //                             >
    //                               <CircleX />
    //                             </button>
    //                           </div>
    //                         ))}
    //                     </div>
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>

    //           <div className="text-start col-span-1 h-auto ">
    //             <Label text="Table Of Content" />
    //             <FormField
    //               control={form.control}
    //               name="En_table_of_content"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900"></FormLabel>
    //                   <FormControl>
    //                     <div className="relative">
    //                       <Input
    //                         dir="ltr"
    //                         placeholder="Enter Table Of Content ..."
    //                         value={inputValueTableOfContentEn}
    //                         onChange={(e) => {
    //                           setInputValueTableOfContentEn(e.target.value);
    //                         }}
    //                         onKeyDown={(e) => {
    //                           if (
    //                             e.key === "Enter" &&
    //                             inputValueTableOfContentEn.trim()
    //                           ) {
    //                             const newValues = Array.isArray(field.value)
    //                               ? [...field.value, inputValueTableOfContentEn]
    //                               : [inputValueTableOfContentEn];
    //                             field.onChange(newValues);
    //                             setTableOfContentEn(newValues);
    //                             setInputValueTableOfContentEn("");
    //                             e.preventDefault();
    //                           }
    //                         }}
    //                         name={field.name}
    //                         ref={field.ref}
    //                         onBlur={field.onBlur}
    //                         className="pr-20"
    //                       />

    //                       {Array.isArray(field.value) &&
    //                         field.value.length > 0 && (
    //                           <Badge className="absolute right-2 top-2">
    //                             {`تم تحديد ${field.value.length}`}
    //                           </Badge>
    //                         )}

    //                       {Array.isArray(field.value) &&
    //                         field.value.length > 0 &&
    //                         field.value.map((item: string, index: number) => (
    //                           <div key={index} className="flex items-center  ">
    //                             <span>{item}</span>
    //                             <button
    //                               type="button"
    //                               className="ml-2 text-red-500"
    //                               onClick={() =>
    //                                 handleTableOfContentEnDelete(index, field)
    //                               }
    //                             >
    //                               <CircleX />
    //                             </button>
    //                           </div>
    //                         ))}
    //                     </div>
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className=" col-span-1 h-auto ">
    //             <label htmlFor="">وصف التقرير</label>
    //             <FormField
    //               control={form.control}
    //               name="Ar_description"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>sadasd</FormLabel>
    //                   <FormControl>
    //                     <Tiptap
    //                       description={"ادخل الوصف"}
    //                       onChange={field.onChange}
    //                     />
    //                   </FormControl>
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className="text-start col-span-1 h-auto ">
    //             <label htmlFor="">Description </label>
    //             <FormField
    //               control={form.control}
    //               name="En_description"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>sadasd</FormLabel>
    //                   <FormControl>
    //                     <EngTiptap
    //                       description={"Enter the Description "}
    //                       onChange={field.onChange}
    //                     />
    //                   </FormControl>
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>

    //         <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className=" col-span-1 h-auto ">
    //             <label htmlFor="">ملخص تنفيذي</label>
    //             <FormField
    //               control={form.control}
    //               name="Ar_executive_summary"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>sadasd</FormLabel>
    //                   <FormControl>
    //                     <Tiptap
    //                       description={"ادخل ملخص تنفيذي"}
    //                       onChange={field.onChange}
    //                     />
    //                   </FormControl>
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className="text-start col-span-1 h-auto ">
    //             <label htmlFor="">Executive Summary</label>
    //             <FormField
    //               control={form.control}
    //               name="En_executive_summary"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>sadasd</FormLabel>
    //                   <FormControl>
    //                     <EngTiptap
    //                       description={"Enter Executive Summary "}
    //                       onChange={field.onChange}
    //                     />
    //                   </FormControl>
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
    //           <div className=" col-span-3 h-auto translate-y-10">
    //             <Label text="ملاحظة" />
    //             <FormField
    //               control={form.control}
    //               name="An_note"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">{"ملاحظة"}</FormLabel>
    //                   <FormControl>
    //                     <Textarea
    //                       className="bg-white border-2 border-[#d1d5db] rounded-xl"
    //                       rows={5}
    //                       {...field}
    //                       placeholder="ادخل ملاحظة ..."
    //                     ></Textarea>
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
    //           <div className="text-start col-span-3 h-auto translate-y-10">
    //             <Label text="Note" />
    //             <FormField
    //               control={form.control}
    //               name="En_note"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">{"Note"}</FormLabel>
    //                   <FormControl>
    //                     <Textarea
    //                       dir="ltr"
    //                       className="bg-white border-2 border-[#d1d5db] rounded-xl"
    //                       rows={5}
    //                       {...field}
    //                       placeholder="Enter Note ..."
    //                     ></Textarea>
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="w-full -translate-x-10 flex justify-end mt-20 ">
    //           <Button className=" mb-10 text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
    //             Add
    //           </Button>
    //         </div>
    //       </form>
    //     </Form>
    //   ) : (
    //     <Form {...form}>
    //       {process.env.NODE_ENV === "development" && (
    //         <>
    //           <p>Ignore it, it just in dev mode</p>
    //           <div>{JSON.stringify(form.formState.errors)}</div>
    //         </>
    //       )}
    //       <form
    //         onSubmit={form.handleSubmit(onSubmit)}
    //         className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] px-9"
    //       >
    //         <div className="grid h-[100px]  grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right "></div>
    //         <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className=" col-span-1 h-auto ">
    //             <label htmlFor="">صورة التقرير</label>
    //             <FormField
    //               control={form.control}
    //               name="Img"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Upload Image</FormLabel>
    //                   <FormControl>
    //                     <input
    //                       type="file"
    //                       accept="image/*"
    //                       onChange={(e) => {
    //                         field.onChange(e.target.files);
    //                         handleFileChange(e); // Set the preview and form data
    //                       }}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  min-h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className=" col-span-1 h-auto ">
    //             <Label text="عنوان التقرير" />
    //             <FormField
    //               control={form.control}
    //               name="Ar_Title"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">
    //                     {"عنوان التقرير"}
    //                   </FormLabel>
    //                   <FormControl>
    //                     <Input placeholder="ادخل عنوان التقرير..." {...field} />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //           <div className="text-end col-span-1 h-auto ">
    //             <Label text="Report Title" />
    //             <FormField
    //               control={form.control}
    //               name="En_Title"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">
    //                     {"Report Title"}
    //                   </FormLabel>
    //                   <FormControl>
    //                     <Input
    //                       dir="ltr"
    //                       placeholder="enter Report Title..."
    //                       {...field}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //           <div className=" col-span-1 h-auto ">
    //             <Label text="تاريخ النشر" />
    //             <FormField
    //               control={form.control}
    //               name="date_of_publish"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">
    //                     {"تاريخ النشر"}
    //                   </FormLabel>
    //                   <FormControl>
    //                     <Input
    //                       type="date"
    //                       placeholder="ادخل تاريخ النشر..."
    //                       {...field}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className=" col-span-1 h-auto ">
    //             <Label text="تاريخ التقرير" />
    //             <FormField
    //               control={form.control}
    //               name="date_of_report"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">
    //                     {"تاريخ التقرير"}
    //                   </FormLabel>
    //                   <FormControl>
    //                     <Input
    //                       type="date"
    //                       placeholder="ادخل تاريخ التقرير..."
    //                       {...field}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //           <div className=" col-span-1 h-auto ">
    //             <label htmlFor="">رابط الملف</label>
    //             <FormField
    //               control={form.control}
    //               name="pdfImg"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Upload Image</FormLabel>
    //                   <FormControl>
    //                     <input
    //                       type="file"
    //                       accept=".pdf"
    //                       onChange={handleFilePdfChange}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //           <div className=" col-span-1 h-auto ">
    //             <label htmlFor="">صورة الغلاف للتقرير</label>
    //             <FormField
    //               control={form.control}
    //               name="pdfImg"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Upload Image</FormLabel>
    //                   <FormControl>
    //                     <input
    //                       type="file"
    //                       accept="image/*"
    //                       onChange={(e) => {
    //                         field.onChange(e.target.files);
    //                         handleFileChange(e); // Set the preview and form data
    //                       }}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  min-h-[100px] grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className="col-span-1 h-auto ">
    //             <Label text="جدول محتويات" />
    //             <FormField
    //               control={form.control}
    //               name="Ar_table_of_content"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900"></FormLabel>
    //                   <FormControl>
    //                     <div className="relative">
    //                       <Input
    //                         dir="rtl"
    //                         placeholder="ادخل جدول محتويات..."
    //                         value={inputValueTableOfContentAr}
    //                         onChange={(e) => {
    //                           setInputValueTableOfContentAr(e.target.value);
    //                         }}
    //                         onKeyDown={(e) => {
    //                           if (
    //                             e.key === "Enter" &&
    //                             inputValueTableOfContentAr.trim()
    //                           ) {
    //                             const newValues = Array.isArray(field.value)
    //                               ? [...field.value, inputValueTableOfContentAr]
    //                               : [inputValueTableOfContentAr];
    //                             field.onChange(newValues);
    //                             setTableOfContentAr(newValues);
    //                             setInputValueTableOfContentAr("");
    //                             e.preventDefault();
    //                           }
    //                         }}
    //                         name={field.name}
    //                         ref={field.ref}
    //                         onBlur={field.onBlur}
    //                         className="pr-20"
    //                       />

    //                       {Array.isArray(field.value) &&
    //                         field.value.length > 0 && (
    //                           <Badge className="absolute right-2 top-2">
    //                             {`تم تحديد ${field.value.length}`}
    //                           </Badge>
    //                         )}

    //                       {Array.isArray(field.value) &&
    //                         field.value.length > 0 &&
    //                         field.value.map((item: string, index: number) => (
    //                           <div key={index} className="flex items-center  ">
    //                             <span>{item}</span>
    //                             <button
    //                               type="button"
    //                               className="ml-2 text-red-500"
    //                               onClick={() =>
    //                                 handleTableOfContentArDelete(index, field)
    //                               }
    //                             >
    //                               <CircleX />
    //                             </button>
    //                           </div>
    //                         ))}
    //                     </div>
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>

    //           <div className="text-end col-span-1 h-auto ">
    //             <Label text="Table Of Content" />
    //             <FormField
    //               control={form.control}
    //               name="En_table_of_content"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900"></FormLabel>
    //                   <FormControl>
    //                     <div className="relative">
    //                       <Input
    //                         dir="ltr"
    //                         placeholder="Enter Table Of Content ..."
    //                         value={inputValueTableOfContentEn}
    //                         onChange={(e) => {
    //                           setInputValueTableOfContentEn(e.target.value);
    //                         }}
    //                         onKeyDown={(e) => {
    //                           if (
    //                             e.key === "Enter" &&
    //                             inputValueTableOfContentEn.trim()
    //                           ) {
    //                             const newValues = Array.isArray(field.value)
    //                               ? [...field.value, inputValueTableOfContentEn]
    //                               : [inputValueTableOfContentEn];
    //                             field.onChange(newValues);
    //                             setTableOfContentEn(newValues);
    //                             setInputValueTableOfContentEn("");
    //                             e.preventDefault();
    //                           }
    //                         }}
    //                         name={field.name}
    //                         ref={field.ref}
    //                         onBlur={field.onBlur}
    //                         className="pr-20"
    //                       />

    //                       {Array.isArray(field.value) &&
    //                         field.value.length > 0 && (
    //                           <Badge className="absolute right-2 top-2">
    //                             {`تم تحديد ${field.value.length}`}
    //                           </Badge>
    //                         )}

    //                       {Array.isArray(field.value) &&
    //                         field.value.length > 0 &&
    //                         field.value.map((item: string, index: number) => (
    //                           <div key={index} className="flex items-center  ">
    //                             <span>{item}</span>
    //                             <button
    //                               type="button"
    //                               className="ml-2 text-red-500"
    //                               onClick={() =>
    //                                 handleTableOfContentEnDelete(index, field)
    //                               }
    //                             >
    //                               <CircleX />
    //                             </button>
    //                           </div>
    //                         ))}
    //                     </div>
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className=" col-span-1 h-auto ">
    //             <label htmlFor="">وصف التقرير</label>
    //             <FormField
    //               control={form.control}
    //               name="Ar_description"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>sadasd</FormLabel>
    //                   <FormControl>
    //                     <Tiptap
    //                       description={"ادخل الوصف"}
    //                       onChange={field.onChange}
    //                     />
    //                   </FormControl>
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className=" col-span-1 h-auto ">
    //             <label htmlFor="">Description </label>
    //             <FormField
    //               control={form.control}
    //               name="En_description"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>sadasd</FormLabel>
    //                   <FormControl>
    //                     <EngTiptap
    //                       description={"Enter the Description "}
    //                       onChange={field.onChange}
    //                     />
    //                   </FormControl>
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>

    //         <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className=" col-span-1 h-auto ">
    //             <label htmlFor="">ملخص تنفيذي</label>
    //             <FormField
    //               control={form.control}
    //               name="Ar_executive_summary"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>sadasd</FormLabel>
    //                   <FormControl>
    //                     <Tiptap
    //                       description={"ادخل ملخص تنفيذي"}
    //                       onChange={field.onChange}
    //                     />
    //                   </FormControl>
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid  h-[250px] grid-cols-1 items-start gap-4 overflow-y-scroll scroll-smooth text-right ">
    //           <div className=" col-span-1 h-auto ">
    //             <label htmlFor="">Executive Summary</label>
    //             <FormField
    //               control={form.control}
    //               name="En_executive_summary"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>sadasd</FormLabel>
    //                   <FormControl>
    //                     <EngTiptap
    //                       description={"Enter Executive Summary "}
    //                       onChange={field.onChange}
    //                     />
    //                   </FormControl>
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
    //           <div className=" col-span-3 h-auto translate-y-10">
    //             <Label text="ملاحظة" />
    //             <FormField
    //               control={form.control}
    //               name="An_note"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">{"ملاحظة"}</FormLabel>
    //                   <FormControl>
    //                     <Textarea
    //                       className="bg-white border-2 border-[#d1d5db] rounded-xl"
    //                       rows={5}
    //                       {...field}
    //                       placeholder="ادخل ملاحظة ..."
    //                     ></Textarea>
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="grid grid-cols-3 w-[100%]  items-start gap-4 text-right h-[20vh]  ">
    //           <div className="text-end col-span-3 h-auto translate-y-10">
    //             <Label text="Note" />
    //             <FormField
    //               control={form.control}
    //               name="En_note"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel className="text-red-900">{"Note"}</FormLabel>
    //                   <FormControl>
    //                     <Textarea
    //                       dir="ltr"
    //                       className="bg-white border-2 border-[#d1d5db] rounded-xl"
    //                       rows={5}
    //                       {...field}
    //                       placeholder="Enter Note ..."
    //                     ></Textarea>
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div className="w-full translate-x-10 flex justify-end mt-20 ">
    //           <Button className=" mb-10 text-md inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
    //             إضافة
    //           </Button>
    //         </div>
    //       </form>
    //     </Form>
    //   )}
    // </>
    <></>
  );
}
