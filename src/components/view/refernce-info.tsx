import React, { useEffect } from "react";
import {
  Form,
} from "../../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addReferenceSchema } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import {  useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/lib/http";
import { useNavigate, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

type ReferenceFormValue = z.infer<typeof addReferenceSchema>;
export interface ReferenceResp {
  id: number;
  ar_title: string;
  en_title: string;
  link: string;
  publication: any[];
}

export default function ReferenceInfo() {
  const AccessToken = Cookies.get("accessToken");
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof addReferenceSchema>>({
    resolver: zodResolver(addReferenceSchema),
  });

  const fetchData = async () => {
    const response = await axiosInstance.get<ReferenceResp>(
      `/api/References/${id}`,
      {
        headers: {
          "Content-Type": "application/json", // Ensures that the request body is treated as JSON
          Authorization: `Bearer ${AccessToken}`,
        },
      }
    );
    return response.data;
  };
  const {
    data: complaintData,
    error: complaintError,
    isLoading: complaintIsLoading,
  } = useQuery({
    queryKey: ["complaint", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  useEffect(() => {
    if (complaintData) {
      form.reset({
        ar_title: complaintData.ar_title,
        en_title: complaintData.en_title,
        link: complaintData.link,
      });
    }
  }, [complaintData]);
  

  return (
    <>
      {dir === "ltr" ? (
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] "
          >
            <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
            <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10 ">
                <label htmlFor="">Title in English</label>
                <p className="mt-5">{complaintData?.en_title}</p>
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="">
                  العنوان بالعربية
                </label>
                <p className="mt-5">{complaintData?.ar_title}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-left h-[20vh]">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="Link" />
                <a href={complaintData?.link} target="_blank">
                  {complaintData?.link}
                </a>
              </div>
            </div>
            <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]  w-[100%] bg-[#f2f2f2]"
          >
            <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
            <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="العنوان بالعربية" />
                <p className="mt-5">{complaintData?.ar_title}</p>
              </div>
              <div
                dir="ltr"
                className="text-end col-span-1 h-auto translate-y-10"
              >
                <Label text="Title in English" />
                <p className="mt-5">{complaintData?.en_title}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="الرابط" />
                <a href={complaintData?.link} target="_blank">
                  {complaintData?.link}
                </a>
              </div>
            </div>
            <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          </form>
        </Form>
      )}
    </>
  );
}
