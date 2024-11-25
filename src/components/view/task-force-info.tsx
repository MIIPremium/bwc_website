import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { axiosInstance } from "src/lib/http";
import { addTaskForceSchema, TaskForceResp } from "src/types/validation";
import Label from "src/ui/label";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

export default function TaskForceInfo() {
  const AccessToken = Cookies.get("accessToken");
  const {  i18n } = useTranslation();
  const dir = i18n.dir();
  const { id } = useParams<{ id: string }>();
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const fetchData = async () => {
    const response = await axiosInstance.get<TaskForceResp>(
      `/api/Taskforce/${id}`,
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
    data: TaskForceData,
    error: TaskForceError,
    isLoading: TaskForceIsLoading,
  } = useQuery({
    queryKey: ["TaskForce", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  const form = useForm<z.infer<typeof addTaskForceSchema>>({
    resolver: zodResolver(addTaskForceSchema),
  });
  useEffect(() => {
    if (TaskForceData) {
      form.reset({
        Ar_name: TaskForceData.ar_name,
        Ar_degree: TaskForceData.ar_degree,
        Ar_role: TaskForceData.ar_role,
        En_name: TaskForceData.en_name,
        En_degree: TaskForceData.en_degree,
        En_role: TaskForceData.en_role,
      });

      // Set the existing image URL for preview
      setExistingImageUrl(TaskForceData.img); // This should be the image URL string
    }
  }, [TaskForceData]);
  return (
    <>
      {dir === "ltr" ? (
        <div className="min-h-[90vh]  w-[100%] bg-[#f2f2f2]">
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          <div className=" grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[40vh] ">
            {/* <label className="text-md mb-2 block font-bold text-gray-950">
            الموظف
          </label> */}

            <div className=" col-span-1  translate-y-10 h-[30vh] ">
              <label htmlFor="" className="float-start ">
                Employee Photo
              </label>
              <img
                src={TaskForceData?.img}
                alt=""
                className="h-full clear-both object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10 text-start">
              <Label text="الاسم بالكامل" />
              <p>{TaskForceData?.ar_name}</p>
            </div>
            <div className=" col-span-1 h-auto translate-y-10 text-start">
              <Label text="الدرجة" />
              {TaskForceData?.ar_degree}
            </div>

            <div className=" col-span-1 h-auto translate-y-10 text-start">
              <Label text="المسمى الوظيفي" />
              {TaskForceData?.ar_role}
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10 text-start">
              <Label text="full name" />
              {TaskForceData?.en_name}
            </div>
            <div className=" col-span-1 h-auto translate-y-10 text-start">
              <Label text="degree" />
              {TaskForceData?.en_degree}
            </div>

            <div className=" col-span-1 h-auto translate-y-10 text-start">
              <Label text="role" />
              {TaskForceData?.en_role}
            </div>
          </div>
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
        </div>
      ) : (
        <div className="min-h-[90vh]  w-[100%] bg-[#f2f2f2]">
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          <div className=" grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[40vh]">
            {/* <label className="text-md mb-2 block font-bold text-gray-950">
          الموظف
        </label> */}

            <div className=" col-span-1 h-[30vh] translate-y-10 ">
              <label htmlFor="" className="float-start ">
                صورة الموظف
              </label>
              <img
                src={TaskForceData?.img}
                alt=""
                className="h-full clear-both"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="الاسم بالكامل" />
              {TaskForceData?.ar_name}
            </div>
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="الدرجة" />
              {TaskForceData?.ar_degree}
            </div>

            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="المسمى الوظيفي" />
              {TaskForceData?.ar_role}
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="full name" />
              {TaskForceData?.en_name}
            </div>
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="degree" />
              {TaskForceData?.en_degree}
            </div>

            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="role" />
              {TaskForceData?.en_role}
            </div>
          </div>
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
        </div>
      )}
    </>
  );
}
