import React from "react";
import authorImgUrl from "../../assets/img/8H4A08688.jpg(1).jpg";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "src/lib/http";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import { CalendarMinus2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export interface sidInfo {
  id: number;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  date_of_publish: Date;
  type: string;
}

export default function MorePublish() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  dayjs.extend(relativeTime);
  dayjs.locale("ar");

  const { data: sideInfos } = useQuery({
    queryKey: ["MorePublication"],
    queryFn: () => getApi<sidInfo[]>(`/api/website/Publications/ReadMore/5`),
  });

  const getRelativeTime = (date: string | Date, language: string): string => {
    dayjs.locale(language);
    return dayjs().to(dayjs(date));
  };
  return (
    <>
      {dir === "ltr" ? (
        <div dir="ltr" className="container-pub mx-auto sm:px-0 md:px-4 ">
          {/* Display Images */}
          <div
            className={`mt-8   ${
              sideInfos?.data.length && sideInfos?.data.length >= 3
                ? "md:grid sm:hidden grid-cols-3 gap-8"
                : "flex flex-col md:flex-row sm:hidden justify-evenly space-x-8"
            }`}
          >
            {sideInfos?.data.map((img, index) => (
              <Link
                to={
                  img.type === "publish"
                    ? `/publish-details/${img.id}`
                    : img.type === "news"
                    ? `/news-details/${img.id}`
                    : img.type === "analysis"
                    ? `/Analysis-details/${img.id}`
                    : ""
                }
                key={index}
                className={`${
                  sideInfos?.data.length >= 3 ? "" : "w-1/4"
                } mb-4 relative`}
              >
                <img
                  className="rounded-lg object-cover h-full w-full"
                  src={img.b_image}
                  alt=""
                />
                <div className="absolute text-[#D1D1D1] bottom-0 w-full right-0 mb-4">
                  <p className="text-xl w-[95%] mx-auto font-bold">
                    {img.en_Title}
                  </p>
                  <div className="h-1 w-[95%] mx-auto bg-[#D5AE78] rounded-full"></div>
                  <span className="flex font-normal w-[95%] mx-auto text-sm gap-2 mt-2">
                    <CalendarMinus2Icon size={25} />
                    <p className="text-lg">{` ${getRelativeTime(
                      img.date_of_publish,
                      "en"
                    )}`}</p>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Version */}
          <div className="flex md:hidden flex-col space-y-4 mt-8 w-full ">
            {sideInfos?.data.map((img, index) => (
              <Link
                to={
                  img.type === "publish"
                    ? `/publish-details/${img.id}`
                    : img.type === "news"
                    ? `/news-details/${img.id}`
                    : img.type === "analysis"
                    ? `/Analysis-details/${img.id}`
                    : ""
                }
                key={index}
                className={`w-1/ mb-4 relative h-96`}
              >
                <img
                  className="rounded-lg object-cover h-full w-full"
                  src={img.b_image}
                  alt=""
                />
                <div className="absolute text-[#D1D1D1] bottom-0 w-full right-0 mb-4">
                  <p className="text-xl w-[95%] mx-auto font-bold">
                    {img.en_Title}
                  </p>
                  <div className="h-1 w-[95%] mx-auto bg-[#D5AE78] rounded-full"></div>
                  <span className="flex font-normal w-[95%] mx-auto text-sm gap-2 mt-2">
                    <CalendarMinus2Icon size={25} />
                    <p className="text-lg">{` ${getRelativeTime(
                      img.date_of_publish,
                      "en"
                    )}`}</p>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Show More Section */}
          <div className="text-center mt-4 text-[#CCA972]">
            <Link to={"/all-publishes"} className="font-semibold text-lg">
              Show More
            </Link>
          </div>
        </div>
      ) : (
        <div className="container-pub mx-auto sm:px-0 md:px-4">
          {/* Display Images */}
          <div
            className={`mt-8   ${
              sideInfos?.data.length && sideInfos?.data.length >= 3
                ? "md:grid sm:hidden grid-cols-3 gap-8"
                : "flex flex-col md:flex-row sm:hidden justify-evenly space-x-8"
            }`}
          >
            {sideInfos?.data.map((img, index) => (
              <Link
                to={
                  img.type === "publish"
                    ? `/publish-details/${img.id}`
                    : img.type === "news"
                    ? `/news-details/${img.id}`
                    : img.type === "analysis"
                    ? `/Analysis-details/${img.id}`
                    : ""
                }
                key={index}
                className={`${
                  sideInfos?.data.length >= 3 ? "" : "w-1/4"
                } mb-4 relative`}
              >
                <img
                  className="rounded-lg object-cover h-full w-full"
                  src={img.b_image}
                  alt=""
                />
                <div className="absolute text-[#D1D1D1] bottom-0 w-full right-0 mb-4">
                  <p className="text-xl w-[95%] mx-auto font-bold">
                    {img.ar_Title}
                  </p>
                  <div className="h-1 w-[95%] mx-auto bg-[#D5AE78] rounded-full"></div>
                  <span className="flex font-normal w-[95%] mx-auto text-sm gap-2 mt-2">
                    <CalendarMinus2Icon size={25} />
                    <p className="text-lg">{` ${getRelativeTime(
                      img.date_of_publish,
                      "ar"
                    )}`}</p>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Version */}
          <div className="flex md:hidden flex-col space-y-4 mt-8 w-full">
            {sideInfos?.data.map((img, index) => (
              <Link
                to={
                  img.type === "publish"
                    ? `/publish-details/${img.id}`
                    : img.type === "news"
                    ? `/news-details/${img.id}`
                    : img.type === "analysis"
                    ? `/Analysis-details/${img.id}`
                    : ""
                }
                key={index}
                className={`w-1/ mb-4 relative h-96`}
              >
                <img
                  className="rounded-lg object-cover h-full w-full"
                  src={img.b_image}
                  alt=""
                />
                <div className="absolute text-[#D1D1D1] bottom-0 w-full right-0 mb-4">
                  <p className="text-xl w-[95%] mx-auto font-bold">
                    {img.ar_Title}
                  </p>
                  <div className="h-1 w-[95%] mx-auto bg-[#D5AE78] rounded-full"></div>
                  <span className="flex font-normal w-[95%] mx-auto text-sm gap-2 mt-2">
                    <CalendarMinus2Icon size={25} />
                    <p className="text-lg">{` ${getRelativeTime(
                      img.date_of_publish,
                      "ar"
                    )}`}</p>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Show More Section */}
          <div className="text-center mt-4 text-[#CCA972]">
            <Link to={"/all-publishes"} className="font-semibold text-lg">
              عرض المزيد
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
