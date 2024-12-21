import { CalendarMinus2Icon } from "lucide-react";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface INews {
  id: number;
  ar_Title: string;
  en_Title: string;
  img: string;
  date_of_publish: Date;
}

export default function NewsCardReports({
  id,
  ar_Title,
  en_Title,
  img,
  date_of_publish,
}: INews) {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  dayjs.extend(relativeTime);
  dayjs.locale("ar");
  const getRelativeTime = (date: string | Date, language: string): string => {
    dayjs.locale(language);
    return dayjs().to(dayjs(date));
  };
  return (
    <>
      {dir === "ltr" ? (
        <a
          href={`/report-details/${id}`}
          className="p-4 flex items-center hover:bg-gray-100 cursor-pointer"
        >
          <div className="size-20  min-w-[80px] ">
            <img
              src={img} // Replace with actual image path
              alt="Report cover"
              className="w-full   object-cover h-full rounded-lg"
            />
          </div>
          <div className="overflow-hidden p-4">
            <h3>{en_Title}</h3>
            <span className="flex font-normal text-sm gap-2 mt-2">
              <CalendarMinus2Icon size={19} />
              {` ${getRelativeTime(date_of_publish, "en")}`}
            </span>
          </div>
        </a>
      ) : (
        <a
          href={`/report-details/${id}`}
          className="p-4 flex items-center hover:bg-gray-100 cursor-pointer"
        >
          <div className="size-20  min-w-[80px] ">
            <img
              src={img} // Replace with actual image path
              alt="Report cover"
              className="w-full   object-cover h-full rounded-lg"
            />
          </div>
          <div className="overflow-hidden p-4">
            <h3>{ar_Title}</h3>
            <span className="flex font-normal text-sm gap-2 mt-2">
              <CalendarMinus2Icon size={19} />
              {` ${getRelativeTime(date_of_publish, "ar")}`}
            </span>
          </div>
        </a>
      )}
    </>
  );
}
