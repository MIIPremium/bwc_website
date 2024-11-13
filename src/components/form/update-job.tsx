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
import { updateJobSchema } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import { Button } from "../../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance, patchApi, postApi, putApi } from "src/lib/http";
import { useToast } from "src/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Textarea } from "src/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/ui/select";
import { Badge } from "src/ui/badge";
import { useTranslation } from "react-i18next";
import { CircleX } from "lucide-react";

type AddJobFormValue = z.infer<typeof updateJobSchema>;
interface JobResponse {
  data: {
    id: number;
    ar_jobTitle: string;
    en_jobTitle: string;
    img: string;
    avaliable: boolean;
    publish: boolean;
    ar_basicDescription: string;
    en_basicDescription: string;
    ar_skiles: null;
    en_skiles: null;
    ar_advances: null;
    en_advances: null;
    formLink: string;
    endDate: Date;
  };
}

export type JobResp = {
  id: number;
  ar_jobTitle: string;
  en_jobTitle: string;
  img: string;
  avaliable: boolean;
  publish: boolean;
  ar_basicDescription: string;
  en_basicDescription: string;
  ar_skiles: string[];
  en_skiles: string[];
  ar_advances: string[];
  en_advances: string[];
  formLink: string;
  endDate: Date;
};
export default function UpdateJobForm() {
  // const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const {  i18n } = useTranslation();
  const dir = i18n.dir();
  const [states, _setStates] = useState([
    { label: "متاحة", enLable: "available", value: true },
    { label: "غير متاحة", enLable: "unavailable", value: false },
  ]);
  const [publish, _setPublish] = useState([
    { label: "مشنور", enLable: "publish", value: true },
    { label: "غير منشور", enLable: "unpublished", value: false },
  ]);
  const [texts, setTexts] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  //
  const [skillsEn, setSkillsEn] = useState<string[]>([]);
  const [inputValueSkillsEn, setInputValueSkillsEn] = useState<string>("");
  //
  const [advancesAr, setAdvancesAr] = useState<string[]>([]);
  const [inputValueAdvancesAr, setInputValueAdvancesAr] = useState<string>("");
  //
  const [advancesEn, setAdvancesEn] = useState<string[]>([]);
  const [inputValueAdvancesEn, setInputValueAdvancesEn] = useState<string>("");
  //
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const handleDelete = (index: number, field: any) => {
    const updatedTexts = texts.filter((_, i) => i !== index);
    setTexts(updatedTexts);
    field.onChange(updatedTexts);
  };
  const handleSkillsEnDelete = (index: number, field: any) => {
    const updatedTexts = skillsEn.filter((_, i) => i !== index);
    setSkillsEn(updatedTexts);
    field.onChange(updatedTexts);
  };
  const handleAdvancesAr = (index: number, field: any) => {
    const updatedTexts = advancesAr.filter((_, i) => i !== index);
    setAdvancesAr(updatedTexts);
    field.onChange(updatedTexts);
  };
  const handleAdvancesEn = (index: number, field: any) => {
    const updatedTexts = advancesEn.filter((_, i) => i !== index);
    setAdvancesEn(updatedTexts);
    field.onChange(updatedTexts);
  };

  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof updateJobSchema>>({
    resolver: zodResolver(updateJobSchema),
  });

  const fetchData = async () => {
    const response = await axiosInstance.get<JobResp>(`/api/Jobs/${id}`, {});
    return response.data;
  };
  const {
    data: JobInfoData,
    error: _JobInfoError,
    isLoading: _JobInfoIsLoading,
  } = useQuery({
    queryKey: ["getByIdJob", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  useEffect(() => {
    if (JobInfoData) {
      form.reset({
        Ar_jobTitle: JobInfoData.ar_jobTitle,
        En_jobTitle: JobInfoData.en_jobTitle,
        En_basicDescription: JobInfoData.en_basicDescription,
        Ar_basicDescription: JobInfoData.ar_basicDescription,
        endDate: String(JobInfoData.endDate),
        formLink: JobInfoData.formLink,
        avaliable: JobInfoData.avaliable,
        publish: JobInfoData.publish,
        Ar_skiles: JobInfoData.ar_skiles,
        En_skiles: JobInfoData.en_skiles,
        Ar_advances: JobInfoData.ar_advances,
        En_advances: JobInfoData.en_advances,
      });

      // Set the array states
      setTexts(JobInfoData.ar_skiles || []);
      setSkillsEn(JobInfoData.en_skiles || []);
      setAdvancesAr(JobInfoData.ar_advances || []);
      setAdvancesEn(JobInfoData.en_advances || []);
      // Set the existing image URL for preview
      setExistingImageUrl(JobInfoData.img); // This should be the image URL string
    }
  }, [JobInfoData]);

  const {
    mutate: firstMutate,
    isError: _firstIsError,
    isSuccess: _firstIsSuccess,
    isPending: _firstIsPending,
  } = useMutation<JobResponse, Error, AddJobFormValue>({
    mutationKey: ["AddOrg"],
    mutationFn: (datas: AddJobFormValue) => {
      const formData = new FormData();
      formData.append("Ar_jobTitle", datas.Ar_jobTitle);
      formData.append("En_jobTitle", datas.En_jobTitle);
      formData.append("Ar_basicDescription", datas.Ar_basicDescription);
      formData.append("En_basicDescription", datas.En_basicDescription);
      formData.append("formLink", datas.formLink);
      formData.append("endDate", datas.endDate);

      if (datas.ImageFile) {
        formData.append("imageFile", datas.ImageFile[0]);
      }

      return putApi(`/api/Jobs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data, variables) => {
      const jobId = data.data.id;

     
      secondMutate({
        id: jobId,
        avaliable: variables.avaliable,
        publish: variables.publish,
        ar_advances: advancesAr,
        en_advances: advancesEn,
        ar_skiles: texts,
        en_skiles: skillsEn,
      });
    },
    onError: (error) => {
      toast.success(`${error.message}`, {
        style: {
          border: "1px solid #ff0000",
          padding: "16px",
          color: "#ff0000",
        },
        iconTheme: {
          primary: "#ff0000",
          secondary: "#ff0000",
        },
      });
    },
  });

  const {
    mutate: secondMutate,
    isError: _secondIsError,
    isSuccess: _secondIsSuccess,
    isPending: _secondIsPending,
  } = useMutation({
    mutationKey: ["JobInfo"],
    mutationFn: (datas: {
      id: number;
      avaliable: boolean;
      publish: boolean;
      ar_skiles: string[];
      en_skiles: string[];
      ar_advances: string[];
      en_advances: string[];
    }) => {
      
      
      return patchApi(
        `/api/Jobs/${id}`,
        {
          avaliable: datas.avaliable,
          publish: datas.publish,
          ar_skiles: datas.ar_skiles,
          en_skiles: datas.en_skiles,
          ar_advances: datas.ar_advances,
          en_advances: datas.en_advances,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensures that the request body is treated as JSON
          },
        }
      );
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
      navigate("/admin-dashboard/jobs");
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
  const onSubmit = (datas: AddJobFormValue) => {
    firstMutate(datas);
  };

  return (
    <>
      {dir === "ltr" ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]   w-[100%] "
          >
            {
              <>
                <div className=" float-start col-span-1  flex h-[140px] flex-col ml-10">
                  <label className="text-md text-left mb-2 block font-bold text-gray-950">
                    Organization Image
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
            <div className="mt-4 ml-10">
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
                <Label text="عنوان الوظيفة" />
                <FormField
                  control={form.control}
                  name="Ar_jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"عنوان الوظيفة"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          placeholder="ادخل عنوان الوظيفة..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <Label text="Job Title" />
                <FormField
                  control={form.control}
                  name="En_jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"Job Title"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="Enter Job Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <Label text="Last registration date" />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"Last registration date"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="enter Last registration date"
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
              <div className="text-start col-span-1 h-auto translate-y-10">
                <Label text="Application Link" />
                <FormField
                  control={form.control}
                  name="formLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"Application Link"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Application Link..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <Label text="Job Status" />
                <FormField
                  control={form.control}
                  name="avaliable"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          dir="ltr"
                          // Convert the string value to boolean and log it
                          onValueChange={(value) => {
                            const booleanValue = value === "true"; // Convert to boolean
                            // Log the boolean conversion
                            field.onChange(booleanValue);
                          }}
                          value={
                            field.value !== undefined
                              ? String(field.value)
                              : String(JobInfoData?.avaliable)
                          }
                          defaultValue={String(field.value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر حالة" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectGroup>
                              {states?.map((statuse) => (
                                <SelectItem
                                  key={statuse.enLable}
                                  value={String(statuse.value)} // Ensure the value is a string
                                >
                                  {statuse.enLable}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <Label text="Status of publication" />
                <FormField
                  control={form.control}
                  name="publish"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          dir="ltr"
                          // Convert the string value to boolean and log it
                          onValueChange={(value) => {
                            const booleanValue = value === "true"; // Convert to boolean

                            field.onChange(booleanValue);
                          }}
                          value={
                            field.value !== undefined
                              ? String(field.value)
                              : String(JobInfoData?.publish)
                          }
                          defaultValue={String(field.value)} // Show boolean as string in select
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر حالة" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectGroup>
                              {publish?.map((publishs) => (
                                <SelectItem
                                  key={publishs.enLable}
                                  value={String(publishs.value)} // Ensure the value is a string
                                >
                                  {publishs.enLable}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 w-[100%]  px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="col-span-1 h-auto translate-y-10  ">
                <Label text="المهارات" />
                <FormField
                  control={form.control}
                  name="Ar_skiles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900"></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            dir="rtl"
                            placeholder="ادخل المهارات..."
                            value={inputValue}
                            onChange={(e) => {
                              setInputValue(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && inputValue.trim()) {
                                const newValues = Array.isArray(field.value)
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
                            field.value.map((item: string, index: number) => (
                              <div key={index} className="flex items-center  ">
                                <span>{item}</span>
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() => handleDelete(index, field)}
                                >
                                  <CircleX />
                                </button>
                              </div>
                            ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-start col-span-1 h-auto translate-y-10  ">
                <Label text="Skills" />
                <FormField
                  control={form.control}
                  name="En_skiles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900"></FormLabel>
                      <FormControl dir="ltr">
                        <div className="relative">
                          <Input
                            placeholder="Enter Skills ..."
                            value={inputValueSkillsEn}
                            onChange={(e) => {
                              setInputValueSkillsEn(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                inputValueSkillsEn.trim()
                              ) {
                                const newValues = Array.isArray(field.value)
                                  ? [...field.value, inputValueSkillsEn]
                                  : [inputValueSkillsEn];
                                field.onChange(newValues);
                                setSkillsEn(newValues);
                                setInputValueSkillsEn("");
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
                            field.value.map((item: string, index: number) => (
                              <div key={index} className="flex items-center  ">
                                <span>{item}</span>
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() =>
                                    handleSkillsEnDelete(index, field)
                                  }
                                >
                                  <CircleX />
                                </button>
                              </div>
                            ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 h-auto translate-y-10  ">
                <Label text="المهام الوظيفيه" />
                <FormField
                  control={form.control}
                  name="Ar_advances"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900"></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            dir="rtl"
                            placeholder="ادخل المهام الوظيفيه..."
                            value={inputValueAdvancesAr}
                            onChange={(e) => {
                              setInputValueAdvancesAr(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                inputValueAdvancesAr.trim()
                              ) {
                                const newValues = Array.isArray(field.value)
                                  ? [...field.value, inputValueAdvancesAr]
                                  : [inputValueAdvancesAr];
                                field.onChange(newValues);
                                setAdvancesAr(newValues);
                                setInputValueAdvancesAr("");
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
                            field.value.map((item: string, index: number) => (
                              <div key={index} className="flex items-center  ">
                                <span>{item}</span>
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() => handleAdvancesAr(index, field)}
                                >
                                  <CircleX />
                                </button>
                              </div>
                            ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-3 w-[100%]  px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10  ">
                <Label text="Advances" />
                <FormField
                  control={form.control}
                  name="En_advances"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900"></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter Advances"
                            value={inputValueAdvancesEn}
                            onChange={(e) => {
                              setInputValueAdvancesEn(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                inputValueAdvancesEn.trim()
                              ) {
                                const newValues = Array.isArray(field.value)
                                  ? [...field.value, inputValueAdvancesEn]
                                  : [inputValueAdvancesEn];
                                field.onChange(newValues);
                                setAdvancesEn(newValues);
                                setInputValueAdvancesEn("");
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
                            field.value.map((item: string, index: number) => (
                              <div key={index} className="flex items-center  ">
                                <span>{item}</span>
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() => handleAdvancesEn(index, field)}
                                >
                                  <CircleX />
                                </button>
                              </div>
                            ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="التفاصيل" />
                <FormField
                  control={form.control}
                  name="Ar_basicDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"التفاصيل"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="ادخل التفاصيل..."
                          className="bg-white"
                          {...field}
                          rows={5}
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-5 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <Label text="Description" />
                <FormField
                  control={form.control}
                  name="En_basicDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"Description"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          dir="ltr"
                          placeholder="enter Description ..."
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

            <div className="w-full -translate-x-10 flex justify-end mt-20">
              <Button className="text-lg mb-10 inline-flex h-10 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2  font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                update
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]   w-[100%] "
          >
            {
              <>
                <div className=" items-right col-span-1 flex h-[140px] flex-col mr-10">
                  <label className="text-md mb-2 block font-bold text-gray-950">
                    صورة المؤسسة
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
                <Label text="عنوان الوظيفة" />
                <FormField
                  control={form.control}
                  name="Ar_jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"عنوان الوظيفة"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل عنوان الوظيفة..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-end col-span-1 h-auto translate-y-10">
                <Label text="Job Title" />
                <FormField
                  control={form.control}
                  name="En_jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"Job Title"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="Enter Job Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="اخر تاريخ للتسجيل" />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"اخر تاريخ للتسجيل"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="ادخل اخر تاريخ للتسجيل"
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
                <Label text="رابط التقديم" />
                <FormField
                  control={form.control}
                  name="formLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"رابط التقديم"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل رابط التقديم..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="حالة الوظيفة" />
                <FormField
                  control={form.control}
                  name="avaliable"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          dir="rtl"
                          // Convert the string value to boolean and log it
                          onValueChange={(value) => {
                            const booleanValue = value === "true"; // Convert to boolean
                            // Log the boolean conversion
                            field.onChange(booleanValue);
                          }}
                          value={
                            field.value !== undefined
                              ? String(field.value)
                              : String(JobInfoData?.avaliable)
                          }
                          defaultValue={String(field.value)} // Show boolean as string in select
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر حالة" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectGroup>
                              {states?.map((statuse) => (
                                <SelectItem
                                  key={statuse.label}
                                  value={String(statuse.value)} // Ensure the value is a string
                                >
                                  {statuse.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="حالة  النشر" />
                <FormField
                  control={form.control}
                  name="publish"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          dir="rtl"
                          // Convert the string value to boolean and log it
                          onValueChange={(value) => {
                            const booleanValue = value === "true"; // Convert to boolean

                            field.onChange(booleanValue);
                          }}
                          value={
                            field.value !== undefined
                              ? String(field.value)
                              : String(JobInfoData?.publish)
                          }
                          defaultValue={String(field.value)} // Show boolean as string in select
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر حالة" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectGroup>
                              {publish?.map((publishs) => (
                                <SelectItem
                                  key={publishs.label}
                                  value={String(publishs.value)} // Ensure the value is a string
                                >
                                  {publishs.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 w-[100%]  px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="col-span-1 h-auto translate-y-10  ">
                <Label text="المهارات" />
                <FormField
                  control={form.control}
                  name="Ar_skiles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900"></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="ادخل المهارات..."
                            value={inputValue}
                            onChange={(e) => {
                              setInputValue(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && inputValue.trim()) {
                                const newValues = Array.isArray(field.value)
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
                            field.value.map((item: string, index: number) => (
                              <div key={index} className="flex items-center  ">
                                <span>{item}</span>
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() => handleDelete(index, field)}
                                >
                                  <CircleX />
                                </button>
                              </div>
                            ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-end col-span-1 h-auto translate-y-10  ">
                <Label text="Skills" />
                <FormField
                  control={form.control}
                  name="En_skiles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900"></FormLabel>
                      <FormControl dir="ltr">
                        <div className="relative">
                          <Input
                            placeholder="Enter Skills ..."
                            value={inputValueSkillsEn}
                            onChange={(e) => {
                              setInputValueSkillsEn(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                inputValueSkillsEn.trim()
                              ) {
                                const newValues = Array.isArray(field.value)
                                  ? [...field.value, inputValueSkillsEn]
                                  : [inputValueSkillsEn];
                                field.onChange(newValues);
                                setSkillsEn(newValues);
                                setInputValueSkillsEn("");
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
                            field.value.map((item: string, index: number) => (
                              <div key={index} className="flex items-center  ">
                                <span>{item}</span>
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() =>
                                    handleSkillsEnDelete(index, field)
                                  }
                                >
                                  <CircleX />
                                </button>
                              </div>
                            ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 h-auto translate-y-10  ">
                <Label text="المهام الوظيفيه" />
                <FormField
                  control={form.control}
                  name="Ar_advances"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900"></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="ادخل المهام الوظيفيه..."
                            value={inputValueAdvancesAr}
                            onChange={(e) => {
                              setInputValueAdvancesAr(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                inputValueAdvancesAr.trim()
                              ) {
                                const newValues = Array.isArray(field.value)
                                  ? [...field.value, inputValueAdvancesAr]
                                  : [inputValueAdvancesAr];
                                field.onChange(newValues);
                                setAdvancesAr(newValues);
                                setInputValueAdvancesAr("");
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
                            field.value.map((item: string, index: number) => (
                              <div key={index} className="flex items-center  ">
                                <span>{item}</span>
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() => handleAdvancesAr(index, field)}
                                >
                                  <CircleX />
                                </button>
                              </div>
                            ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-3 w-[100%]  px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="col-span-1 h-auto translate-y-10  ">
                <Label text="Advances" />
                <FormField
                  control={form.control}
                  name="En_advances"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900"></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter Advances"
                            value={inputValueAdvancesEn}
                            onChange={(e) => {
                              setInputValueAdvancesEn(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                inputValueAdvancesEn.trim()
                              ) {
                                const newValues = Array.isArray(field.value)
                                  ? [...field.value, inputValueAdvancesEn]
                                  : [inputValueAdvancesEn];
                                field.onChange(newValues);
                                setAdvancesEn(newValues);
                                setInputValueAdvancesEn("");
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
                            field.value.map((item: string, index: number) => (
                              <div key={index} className="flex items-center  ">
                                <span>{item}</span>
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() => handleAdvancesEn(index, field)}
                                >
                                  <CircleX />
                                </button>
                              </div>
                            ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="التفاصيل" />
                <FormField
                  control={form.control}
                  name="Ar_basicDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"التفاصيل"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="ادخل التفاصيل..."
                          className="bg-white"
                          {...field}
                          rows={5}
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-5 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className="text-end col-span-1 h-auto translate-y-10">
                <Label text="Description" />
                <FormField
                  control={form.control}
                  name="En_basicDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"Description"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          dir="ltr"
                          placeholder="enter Description ..."
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

            <div className="w-full translate-x-10 flex justify-end mt-20">
              <Button className="text-md mb-10 inline-flex h-10 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                تعديل
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
