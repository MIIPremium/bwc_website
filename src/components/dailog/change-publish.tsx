import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import { axiosInstance, patchApi } from "../../lib/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Repeat2 } from "lucide-react";
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
import Cookies from "js-cookie";

interface DeleteDialogProps {
  id: number;
}
const formSchema = z.object({
  publish: z.boolean(),
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
export default function ChangePublishesDialog({ id }: DeleteDialogProps) {
  const AccessToken = Cookies.get("accessToken");
  const [publish, _setPublish] = useState([
    { label: "مشنور", enLable: "publish", value: true },
    { label: "غير منشور", enLable: "unpublished", value: false },
  ]);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fetchData = async () => {
    const response = await axiosInstance.get<JobResp>(`/api/Jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
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

  useEffect(() => {}, [JobInfoData]);

  const { mutate } = useMutation({
    mutationFn: (data: UpdateAvailable) => {
      return patchApi(`/api/Jobs/Publish/${id}?publish=${data.publish}`, {},{
        headers: {
          "Content-Type": "application/json", // Ensures that the request body is treated as JSON
          Authorization: `Bearer ${AccessToken}`,
        },
      });
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
        <div className="col-span-1 h-auto -translate-y-[5px] ">
          <div className="flex h-9 w-10 items-center justify-center rounded-lg ml-2 border-2 border-[#000] bg-black">
            <Dialog>
              <DialogTrigger>
                <Repeat2 size={20} className="text-white" />
              </DialogTrigger>
              <DraggableDialogContent className="bg-white w-96">
                <DialogHeader>
                  <DialogTitle className="text-start">
                    Change publishing status
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                      <Label htmlFor="isAvailable" text="publishing status" />
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
        <div className="col-span-1 h-auto -translate-y-[5px] ml-2">
          <div className="flex h-9 w-10 items-center justify-center rounded-lg mr-2 border-2 border-[#000] bg-black">
            <Dialog>
              <DialogTrigger>
                <Repeat2 size={20} className="text-white" />
              </DialogTrigger>
              <DraggableDialogContent className="bg-white w-96">
                <DialogHeader>
                  <DialogTitle className="text-start">
                    تعديل حالة النشر
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                      <Label htmlFor="isAvailable" text="حالة النشر" />
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
