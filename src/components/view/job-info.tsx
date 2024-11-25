import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { axiosInstance } from "src/lib/http";
import Label from "src/ui/label";

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
export default function JobInfo() {
  const AccessToken = Cookies.get("accessToken");
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const dir = i18n.dir();
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
    error: JobInfoError,
    isLoading: JobInfoIsLoading,
  } = useQuery({
    queryKey: ["getByIdJob", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  return (
    <>
      {dir === "ltr" ? (
        <div className="min-h-[90vh]   w-[100%] ">
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          <div className=" grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[40vh]">
            <div className=" col-span-1 h-auto translate-y-10">
              <label htmlFor="" className="float-start">
                Job Photo
              </label>
              <img src={JobInfoData?.img} alt="" />
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="عنوان الوظيفة" />
              <p>{JobInfoData?.ar_jobTitle}</p>
            </div>
            <div className="text-start col-span-1 h-auto translate-y-10">
              <Label text="Job Title" />
              <p>{JobInfoData?.en_jobTitle}</p>
            </div>
            <div className="text-start col-span-1 h-auto translate-y-10">
              <Label text="Last registration date" />
              <p>{String(JobInfoData?.endDate)}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className="text-start col-span-1 h-auto translate-y-10">
              <Label text="Application Link" />
              <p>{JobInfoData?.formLink}</p>
            </div>
            <div className="text-start col-span-1 h-auto translate-y-10">
              <Label text="Job Status" />
              {JobInfoData?.avaliable === true ? "available" : "unavailable"}
            </div>
            <div className="text-start col-span-1 h-auto translate-y-10">
              <Label text="Status of publication" />
              <p>{JobInfoData?.publish === true ? "publish" : "unpublished"}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%]  px-10 items-start gap-4 text-right min-h-[20vh]  ">
            <div className="col-span-1 h-auto translate-y-10  ">
              <Label text="المهارات" />
              <ul>
                {JobInfoData?.ar_skiles.map((x, index) => (
                  <li key={index}>. {x}</li>
                ))}
              </ul>
            </div>

            <div className="text-start col-span-1 h-auto translate-y-10  ">
              <Label text="Skills" />
              <ul>
                {JobInfoData?.en_skiles.map((x, index) => (
                  <li key={index}>. {x}</li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 h-auto translate-y-10  ">
              <Label text="المهام الوظيفيه" />
              <ul>
                {JobInfoData?.ar_advances.map((x, index) => (
                  <li key={index}>. {x}</li>
                ))}
              </ul>
            </div>
          </div>

          {/*  */}
          <div className="grid grid-cols-3 w-[100%]  px-10 items-start gap-4 text-right min-h-[20vh]  ">
            <div className="text-start col-span-1 h-auto translate-y-10  ">
              <Label text="Advances" />
              <ul>
                {JobInfoData?.en_advances.map((x, index) => (
                  <li key={index}>. {x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="التفاصيل" />
              <p>{JobInfoData?.ar_basicDescription}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className="text-start col-span-1 h-auto translate-y-10">
              <Label text="Description" />
              {JobInfoData?.en_basicDescription}
            </div>
          </div>
          <div className="h-[2px]  w-[95%] mx-auto bg-black mb-5"></div>
        </div>
      ) : (
        <div className="min-h-[90vh]   w-[100%] ">
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          <div className=" grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[40vh]">
            {/* <label className="text-md mb-2 block font-bold text-gray-950">
          الموظف
        </label> */}

            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="صورة الوظيفة" />
              <img src={JobInfoData?.img} alt="" />
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="عنوان الوظيفة" />
              <p>{JobInfoData?.ar_jobTitle}</p>
            </div>
            <div className="text-end col-span-1 h-auto translate-y-10">
              <Label text="Job Title" />
              <p>{JobInfoData?.en_skiles}</p>
            </div>
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="اخر تاريخ للتسجيل" />
              <p>{String(JobInfoData?.endDate)}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="رابط التقديم" />
              <p>{JobInfoData?.formLink}</p>
            </div>
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="حالة الوظيفة" />
              <p>{JobInfoData?.avaliable === true ? "متاحة" : "غير متاحة"}</p>
            </div>
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="حالة  النشر" />
              <p>{JobInfoData?.publish === true ? "مشنورة" : "غير منشورة"}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%]  px-10 items-start gap-4 text-right min-h-[20vh]  ">
            <div className="col-span-1 h-auto translate-y-10  ">
              <Label text="المهارات" />
              <ul>
                {JobInfoData?.ar_skiles.map((x, index) => (
                  <li key={index}>. {x}</li>
                ))}
              </ul>
            </div>

            <div className="text-end col-span-1 h-auto translate-y-10  ">
              <Label text="Skills" />
              <ul>
                {JobInfoData?.en_skiles.map((x, index) => (
                  <li key={index}>. {x}</li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 h-auto translate-y-10  ">
              <Label text="المهام الوظيفيه" />
              <ul>
                {JobInfoData?.ar_advances.map((x, index) => (
                  <li key={index}>. {x}</li>
                ))}
              </ul>
            </div>
          </div>

          {/*  */}
          <div className="grid grid-cols-3 w-[100%]  px-10 items-start gap-4 text-right min-h-[20vh]  ">
            <div className="col-span-1 h-auto translate-y-10  ">
              <Label text="Advances" />
              <ul>
                {JobInfoData?.en_advances.map((x, index) => (
                  <li key={index}>. {x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className=" col-span-1 h-auto translate-y-10">
              <Label text="التفاصيل" />
              <p>{JobInfoData?.ar_basicDescription}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className="text-end col-span-1 h-auto translate-y-10">
              <Label text="Description" />
              {JobInfoData?.en_basicDescription}
            </div>
          </div>
          <div className="h-[2px]  w-[95%] mx-auto bg-black mb-5"></div>
        </div>
      )}
    </>
  );
}
