import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addServicesSchema } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import {  useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/lib/http";
import { useNavigate, useParams } from "react-router-dom";
import { ServicesProp } from "../table/services-table";
import { useTranslation } from "react-i18next";
type ReferenceFormValue = z.infer<typeof addServicesSchema>;

export default function ServicesInfo() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof addServicesSchema>>({
    resolver: zodResolver(addServicesSchema),
  });

  const fetchData = async () => {
    const response = await axiosInstance.get<ServicesProp>(
      `/api/Services/${id}`,
      {}
    );
    return response.data;
  };
  const {
    data: ServicesData,
    error: ServicesError,
    isLoading: ServicesIsLoading,
  } = useQuery({
    queryKey: ["Services", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  useEffect(() => {
    if (ServicesData) {
      form.reset({
        ar_name: ServicesData.ar_name,
        en_name: ServicesData.en_name,
        ar_Description: ServicesData.ar_Description,
        en_Description: ServicesData.en_Description,
      });
    }
  }, [ServicesData]);

  return (
    <>
      {dir === "ltr" ? (
        <div className="min-h-[90vh]   w-[100%] bg-[#f2f2f2]">
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div
              dir="ltr"
              className="col-span-1 h-auto translate-y-10 text-start"
            >
              <Label text="Title" />
              {ServicesData?.en_name}
            </div>
            <div className=" col-span-1 h-auto translate-y-10 ">
              <Label text="عنوان الخدمة" />
              <p>{ServicesData?.ar_name}</p>
            </div>
          </div>
          {/* TODO:REplace with textarea */}
          <div className="grid grid-cols-1 min-w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="وصف الخدمة" />
              <p>{ServicesData?.ar_Description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 min-w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10 text-start">
              <Label text="Service Description" />
              <p>{ServicesData?.en_Description}</p>
            </div>
          </div>

          <div className="h-[2px] mt-3 mb-3 w-[95%] mx-auto bg-black"></div>
        </div>
      ) : (
        <div className="min-h-[90vh]   w-[100%] bg-[#f2f2f2]">
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          <div className="grid grid-cols-4 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="عنوان الخدمة" />
              <p>{ServicesData?.ar_name}</p>
            </div>
            <div
              dir="ltr"
              className="text-end col-span-1 h-auto translate-y-10"
            >
              <Label text="Title" />
              {ServicesData?.en_name}
            </div>
          </div>
          {/* TODO:REplace with textarea */}
          <div className="grid grid-cols-1 min-w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="وصف الخدمة" />
              <p>{ServicesData?.ar_Description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 min-w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 text-end h-auto translate-y-10">
              <Label text="Service Description" />
              <p>{ServicesData?.en_Description}</p>
            </div>
          </div>

          <div className="h-[2px] mt-3 mb-3 w-[95%] mx-auto bg-black"></div>
        </div>
      )}
    </>
  );
}
