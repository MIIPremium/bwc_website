import { zodResolver } from "@hookform/resolvers/zod";
import Label from "src/ui/label";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { axiosInstance } from "src/lib/http";
import { addOrgSchema } from "src/types/validation";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import Cookies from "js-cookie";
export type OrgResp = {
  id: number;
  ar_name: string;
  en_name: string;
  img: string;
  link: string;
};
export default function OrganizationInfo() {
  const AccessToken = Cookies.get("accessToken");
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const fetchData = async () => {
    const response = await axiosInstance.get<OrgResp>(
      `/api/OrgUndBWC/${id}`,
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
    data: OrgnaztioneData,
    error: OrgnaztioneError,
    isLoading: OrgnaztioneIsLoading,
  } = useQuery({
    queryKey: ["TaskForce", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  const form = useForm<z.infer<typeof addOrgSchema>>({
    resolver: zodResolver(addOrgSchema),
  });
  useEffect(() => {
    if (OrgnaztioneData) {
      form.reset({
        Ar_name: OrgnaztioneData.ar_name,
        En_name: OrgnaztioneData.en_name,
        Link: OrgnaztioneData.link,
      });

      // Set the existing image URL for preview
      setExistingImageUrl(OrgnaztioneData.img); // This should be the image URL string
    }
  }, [OrgnaztioneData]);
  return (
    <>
      {dir === "ltr" ? (
        <div className="min-h-[90vh]  w-[100%] bg-[#f2f2f2]">
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          <div className=" grid grid-cols-1   w-[100%] px-10 items-start gap-4 text-right h-[40vh] ">
            <div className=" col-span-3   translate-y-10">
              <label htmlFor="" className="float-start">
                Organization Image
              </label>
              <img
                src={OrgnaztioneData?.img}
                alt=""
                className="col-span-3   translate-y-10"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%]  px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto text-start translate-y-10">
              <Label text="Organization Link" />
              <a
                href={OrgnaztioneData?.link}
                target="_blank"
                className="hover:text-blue-800"
              >
                {OrgnaztioneData?.link}
              </a>
            </div>

            <div className=" col-span-1 h-auto text-start translate-y-10">
              <Label text="Organization Name" />
              {OrgnaztioneData?.en_name}
            </div>
            <div className=" col-span-1 h-auto text-start  translate-y-10">
              <Label text="اسم المؤسسه" />
              {OrgnaztioneData?.ar_name}
            </div>
          </div>
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
        </div>
      ) : (
        <div className="min-h-[90vh]  w-[100%] bg-[#f2f2f2]">
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          <div className=" grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[40vh] ">
            <div className=" col-span-1   translate-y-10">
              <Label text="صورة المؤسسه" />
              <img
                src={OrgnaztioneData?.img}
                alt=""
                className="w-[200px] h-[200px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="اسم المؤسسه" />
              {OrgnaztioneData?.ar_name}
            </div>
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="organization name" />
              {OrgnaztioneData?.en_name}
            </div>
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="رابط المؤسسه" />
              <a
                href={OrgnaztioneData?.link}
                target="_blank"
                className="hover:text-blue-800"
              >
                {OrgnaztioneData?.link}
              </a>
            </div>
          </div>
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
        </div>
      )}
    </>
  );
}
