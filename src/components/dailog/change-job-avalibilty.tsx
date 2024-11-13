import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import { axiosInstance, patchApi } from "../../lib/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Label from "src/ui/label";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DraggableDialogContent,
} from "src/ui/dialog";
import { Button } from "src/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/ui/select";

interface DeleteDialogProps {
  id: number;
}
const formSchema = z.object({
  availabel: z.boolean(),
});

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
type UpdateAvailable = z.infer<typeof formSchema>;
export default function ChangeAvailabilityDialog({ id }: DeleteDialogProps) {
  const [states, _setStates] = useState([
    { label: "متاحة", enLable: "available", value: true },
    { label: "غير متاحة", enLable: "unavailable", value: false },
  ]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const fetchData = async () => {
    const response = await axiosInstance.get<JobResp>(`/api/Jobs/${id}`, {});
    return response.data;
  };
  const {
    data: JobInfoData,
    error: JobInfoError,
    isLoading: JobInfoIsLoading,
  } = useQuery({
    queryKey: ["getByIdJob", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  useEffect(() => {}, [JobInfoData]);
  const { mutate } = useMutation({
    mutationFn: (data: UpdateAvailable) => {
      return patchApi(
        `/api/Jobs/Avaliable/${id}?availabel=${data.availabel}`,
        {}
      );
    },
    onSuccess: (data) => {
      
      
      toast.success("تمت العملية بنجاح.");
      navigate("/admin-dashboard/jobs");
      window.location.reload();
    },
    onError: (error) => {
      toast.error(`حدث خطأ: ${error.message}`);
    },
  });
  const onSubmit = (datas: UpdateAvailable) => {
    mutate(datas);
  };

  return (
    <>
      {dir === "ltr" ? (
        <div className="col-span-1 h-auto  -translate-y-[5px] ">
          <div className="flex h-9 w-10  items-center ml-2 justify-center rounded-lg border-2 border-[#1999E3] bg-[#1999E3]">
            <Dialog>
              <DialogTrigger>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.5 19.7647C5.39082 19.7647 1.23529 15.6092 1.23529 10.5C1.23529 5.39082 5.39082 1.23529 10.5 1.23529C15.6092 1.23529 19.7647 5.39082 19.7647 10.5C19.7647 15.6092 15.6092 19.7647 10.5 19.7647ZM10.5 0C4.71018 0 0 4.71018 0 10.5C0 16.2898 4.71018 21 10.5 21C16.2898 21 21 16.2898 21 10.5C21 4.71018 16.2898 0 10.5 0ZM9.34439 12.6654L6.37721 9.69817L5.50385 10.5715L9.34439 14.412L15.9075 7.84894L15.0341 6.97558L9.34439 12.6654Z"
                    fill="white"
                  />
                </svg>
              </DialogTrigger>
              <DraggableDialogContent className="bg-white w-96">
                <DialogHeader>
                  <DialogTitle className="text-start">
                    Change Job Status
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                      <Label htmlFor="isAvailable" text="Job Status" />
                      <FormField
                        control={form.control}
                        name="availabel"
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
                    <Button type="submit" className="bg-black text-white mt-3">
                      update
                    </Button>
                  </form>
                </Form>
              </DraggableDialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="col-span-1 h-auto translate-x-1 -translate-y-[5px]">
          <div className="flex h-9 w-10 items-center justify-center rounded-lg border-2 border-[#1999E3] bg-[#1999E3]">
            <Dialog>
              <DialogTrigger>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.5 19.7647C5.39082 19.7647 1.23529 15.6092 1.23529 10.5C1.23529 5.39082 5.39082 1.23529 10.5 1.23529C15.6092 1.23529 19.7647 5.39082 19.7647 10.5C19.7647 15.6092 15.6092 19.7647 10.5 19.7647ZM10.5 0C4.71018 0 0 4.71018 0 10.5C0 16.2898 4.71018 21 10.5 21C16.2898 21 21 16.2898 21 10.5C21 4.71018 16.2898 0 10.5 0ZM9.34439 12.6654L6.37721 9.69817L5.50385 10.5715L9.34439 14.412L15.9075 7.84894L15.0341 6.97558L9.34439 12.6654Z"
                    fill="white"
                  />
                </svg>
              </DialogTrigger>
              <DraggableDialogContent className="bg-white w-96">
                <DialogHeader className="">
                  <DialogTitle className="text-start">
                    تعديل حالة الوظيفة
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                      <Label htmlFor="isAvailable" text="حالة الوظيفة" />
                      <FormField
                        control={form.control}
                        name="availabel"
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
                    <Button type="submit" className="bg-black text-white mt-3">
                      تعديل
                    </Button>
                  </form>
                </Form>
              </DraggableDialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}
