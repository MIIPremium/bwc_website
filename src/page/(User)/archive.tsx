import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import Footer from "src/components/footer";
import Navbar from "src/components/navbar";
import { getApi } from "src/lib/http";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/ui/select";
import { useTranslation } from "react-i18next";
import formattedDate from "src/utilities/formattedDate";
import formattedDateEn from "src/utilities/formattedDateEn";
import { Link } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
export interface archiveResp {
  year: number;
  total: number;
  archive: Archive[];
}

export interface archiveRespByYear {
  year: number;
  total: number;
  archive: Archive[];
}
export interface Archive {
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  date_of_publish: Date;
}

export interface archiveGetAll {
  year: number;
  total: number;
  publications: Publication[];
}

export interface Publication {
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  date_of_publish: Date;
}
export default function ArchiveIndex() {
  const {  i18n } = useTranslation();
  const dir = i18n.dir();
  const [selectedYear, setSelectedYear] = useState("");
  const selectYearNumber = Number(selectedYear);

  const { data, isPending, isLoading, isError, error } = useQuery<
    archiveGetAll[]
  >({
    queryKey: ["archive"],
    queryFn: async () => {
      const response: AxiosResponse<archiveGetAll[]> = await getApi(
        `/api/website/Archive/GetAll`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes to reduce redundant requests
  });
  const yearOptions = data
    ?.map((item) => ({
      label: item.year.toString(),
      value: item.year.toString(),
    }))
    .reverse();
  
  const {
    data: byYear,
    isLoading: isLoadingByYear,
    isError: isErrorByYear,
    error: ErrorByYear,
    isPending: isPendingByYear,
  } = useQuery<archiveResp>({
    queryKey: ["archiveByYear", selectYearNumber], // Use selectYearNumber as part of the query key to refetch only when it changes
    queryFn: async () => {
      const response: AxiosResponse<archiveRespByYear> = await getApi(
        `/api/website/Archive/${selectYearNumber}`
      );
      return response.data;
    },
    enabled: !!selectYearNumber, // Only run this query when selectYearNumber is defined
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes if data is not highly dynamic
  });

  
  const [filterYear, setFilterYear] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedCount, setDisplayedCount] = useState(10);
  const handleYearFilterChange = (year: string) => {
    setFilterYear(year);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle "Show More"
  const handleShowMore = () => {
    setDisplayedCount((prevCount) => prevCount + 5);
  };

  // Filtered data to show only up to the current displayed count
  const displayedData = data?.slice(0, displayedCount);

  
  const displayedByYearData = byYear?.archive.slice(0, displayedCount);

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full ">
        <LoaderIcon className="mt-12 flex animate-spin items-center justify-end duration-1000" />
      </div>
    );
  }
  return (
    <div>
      <div className="w-full lg:h-[8vh] md:h-[8vh] sm:h-[11vh]">
        <Navbar />
      </div>
      {dir === "ltr" ? (
        <>
          {selectedYear === "" ? (
            <div dir="ltr" className="min-h-[150vh] bg-white mt-10 p-6">
              <div className="bg-white rounded-lg p-4 mb-6">
                <div className="grid grid-cols-4 gap-3 mt-3">
                  <div className="col-span-4 md:col-span-1 flex justify-between gap-4"></div>
                  <div className="col-span-4 md:col-span-2">
                    {/* Optional Search Input */}
                  </div>
                  <div className="col-span-4 md:col-span-1">
                    <Select
                      dir="ltr"
                      value={selectedYear}
                      onValueChange={(value) => setSelectedYear(value)}
                    >
                      <SelectTrigger className="w-[48%] float-end rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <SelectValue placeholder="Filter by Year" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        {yearOptions?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {displayedData
                ?.slice() // Create a shallow copy to avoid mutating the original data
                .reverse() // Reverse the array order
                .map((yearData) => (
                  <div
                    key={yearData.year}
                    className="mb-10 shadow-md border-2 border-[#E5E5E5]"
                  >
                    {/* Year Header */}
                    <div className="flex flex-row justify-between items-center bg-white p-4 border-b-2 border-[#E5E5E5]">
                      <div className="text-5xl font-semibold text-[#D5AE78]">
                        {yearData.year}
                      </div>
                      <div className="text-lg h-8 font-semibold bg-[#757575] text-white rounded-lg px-3">
                        {yearData.total}
                      </div>
                    </div>

                    {/* List of Items for the Year */}
                    {yearData.publications
                      .slice() // Create a shallow copy to avoid mutating the original data
                      .reverse() // Reverse the array order
                      .map((publication) => (
                        <Link
                          to={
                            publication.type === "publish"
                              ? `/publish-details/${publication.id}`
                              : publication.type === "news"
                              ? `/news-details/${publication.id}`
                              : publication.type === "analysis"
                              ? `/Analysis-details/${publication.id}`
                              : `/report-details/${publication.id}`
                          }
                          target="_blank"
                          key={publication.id}
                          className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
                        >
                          <div className="flex flex-col items-center justify-center w-60 border-r-2 border-[#C7C7C7]">
                            <div className="font-black text-[#D5AE78] mr-2 text-2xl">
                              {formattedDateEn(
                                new Date(publication.date_of_publish)
                              )}
                            </div>
                          </div>
                          <div className="text-gray-800 text-start ml-2 text-xl w-full font-medium">
                            <p
                              className={
                                publication.type === "publish"
                                  ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#CEA461] mt-2"
                                  : publication.type === "news"
                                  ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#69DB57] mt-2"
                                  : publication.type === "analysis"
                                  ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#979797] mt-2"
                                  : ""
                              }
                            >
                              {publication.type}
                            </p>
                            <p className="sm:line-clamp-2 md:line-clamp-1">
                              {publication.en_Title}
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
                ))}
            </div>
          ) : (
            <div dir="ltr" className="min-h-[150vh] bg-white mt-10 p-6">
              <div className="bg-white rounded-lg  p-4 mb-6">
                <div className="grid grid-cols-4  gap-3 mt-3">
                  <div className="col-span-4 md:col-span-1 flex justify-between gap-4"></div>

                  <div className="col-span-4 md:col-span-2"></div>
                  <div className="col-span-4 md:col-span-1">
                    <Select
                      dir="ltr"
                      value={selectedYear}
                      onValueChange={(value) => setSelectedYear(value)}
                    >
                      <SelectTrigger className="w-[48%] float-end rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <SelectValue placeholder="Filter by Year" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        {yearOptions?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md  border-2 border-[#E5E5E5]">
                <div className="mb-6">
                  <div className="flex flex-row justify-between items-center bg-white p-4">
                    <div className="text-5xl font-semibold text-[#D5AE78]">
                      {byYear?.year}
                    </div>
                    <div className="text-lg h-8 font-semibold bg-[#757575] text-white rounded-lg px-3">
                      {byYear?.total}
                    </div>
                  </div>

                  {displayedByYearData?.map((item, index) => (
                    <Link
                      to={
                        item.type === "publish"
                          ? `/publish-details/${item.id}`
                          : item.type === "news"
                          ? `/news-details/${item.id}`
                          : item.type === "analysis"
                          ? `/Analysis-details/${item.id}`
                          : `/report-details/${item.id}`
                      }
                      target="_blank"
                      key={item.id}
                      className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
                    >
                      <div className="flex flex-col items-center justify-center w-32 border-r-2 border-[#C7C7C7]">
                        <div className="font-black text-[#D5AE78] text-xl">
                          {formattedDateEn(new Date(item.date_of_publish))}
                        </div>
                      </div>
                      <div className="text-gray-800  text-start ml-1 text-xl w-full font-medium">
                        <p
                          className={
                            item.type === "publish"
                              ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#CEA461] mt-2"
                              : item.type === "news"
                              ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#69DB57] mt-2"
                              : item.type === "analysis"
                              ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#979797] mt-2"
                              : ""
                          }
                        >
                          {item.type}
                        </p>
                        <p className="sm:line-clamp-2 md:line-clamp-1">
                          {item.en_Title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {(displayedByYearData?.length ?? 0) <
                (byYear?.archive?.length ?? 0) && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleShowMore}
                    className="bg-[#D5AE78] text-white text-lg font-black px-4 py-2 rounded-md"
                  >
                    show more
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {selectedYear === "" ? (
            <div className="min-h-[150vh] bg-white mt-10 p-6">
              <div className="bg-white rounded-lg p-4 mb-6">
                <div className="grid grid-cols-4 gap-3 mt-3">
                  <div className="col-span-4 md:col-span-1 flex justify-between gap-4"></div>
                  <div className="col-span-4 md:col-span-2">
                    {/* Optional Search Input */}
                  </div>
                  <div className="col-span-4 md:col-span-1">
                    <Select
                      dir="rtl"
                      value={selectedYear}
                      onValueChange={(value) => setSelectedYear(value)}
                    >
                      <SelectTrigger className="w-[48%] float-end rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <SelectValue placeholder="اختار السنة" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        {yearOptions?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {displayedData
                ?.slice() // Create a shallow copy to avoid mutating the original data
                .reverse() // Reverse the array order
                .map((yearData) => (
                  <div
                    key={yearData.year}
                    className="mb-10 shadow-md border-2 border-[#E5E5E5]"
                  >
                    {/* Year Header */}
                    <div className="flex flex-row justify-between items-center bg-white  p-4 border-b-2 border-[#E5E5E5]">
                      <div className="text-5xl font-semibold text-[#D5AE78]">
                        {yearData.year}
                      </div>
                      <div className="text-lg h-8 font-semibold bg-[#757575] text-white rounded-lg px-3">
                        {yearData.total}
                      </div>
                    </div>

                    {/* List of Items for the Year */}
                    {yearData.publications
                      .slice() // Create a shallow copy to avoid mutating the original data
                      .reverse() // Reverse the array order
                      .map((publication) => (
                        <Link
                          to={
                            publication.type === "publish"
                              ? `/publish-details/${publication.id}`
                              : publication.type === "news"
                              ? `/news-details/${publication.id}`
                              : publication.type === "analysis"
                              ? `/Analysis-details/${publication.id}`
                              : `/report-details/${publication.id}`
                          }
                          target="_blank"
                          key={publication.id}
                          className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
                        >
                          <div className="flex flex-col items-center justify-center w-44 border-l-2 border-[#C7C7C7]">
                            <div className="font-black text-[#D5AE78] ml-2 text-2xl">
                              {formattedDate(
                                new Date(publication.date_of_publish)
                              )}
                            </div>
                          </div>
                          <div className="text-gray-800 text-start mr-2 text-xl w-full font-medium">
                            <p
                              className={
                                publication.type === "publish"
                                  ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#CEA461] mt-2"
                                  : publication.type === "news"
                                  ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#69DB57] mt-2"
                                  : publication.type === "analysis"
                                  ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#979797] mt-2"
                                  : ""
                              }
                            >
                              {publication.type === "publish"
                                ? "المنشورات"
                                : publication.type === "news"
                                ? "الأخبار"
                                : publication.type === "analysis"
                                ? "التحليلات"
                                : ""}
                            </p>
                            <p className="sm:line-clamp-2 md:line-clamp-1">
                              {publication.ar_Title}
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
                ))}
            </div>
          ) : (
            <div className="min-h-[150vh] bg-white mt-10 p-6">
              <div className="bg-white rounded-lg  p-4 mb-6">
                <div className="grid grid-cols-4  gap-3 mt-3">
                  <div className="col-span-4 md:col-span-1 flex justify-between gap-4"></div>

                  <div className="col-span-4 md:col-span-2"></div>
                  <div className="col-span-4 md:col-span-1">
                    <Select
                      dir="rtl"
                      value={selectedYear}
                      onValueChange={(value) => setSelectedYear(value)}
                    >
                      <SelectTrigger className="w-[48%] float-end rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <SelectValue placeholder="اختار السنة" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        {yearOptions?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center bg-white p-4 shadow-md border-2 border-[#E5E5E5]">
                <div className="text-5xl font-semibold text-[#D5AE78]">
                  {byYear?.year}
                </div>
                <div className="text-lg h-8 font-semibold bg-[#757575] text-white rounded-lg px-3">
                  {byYear?.total}
                </div>
              </div>

              {displayedByYearData?.map((item, index) => (
                <Link
                  to={
                    item.type === "publish"
                      ? `/publish-details/${item.id}`
                      : item.type === "news"
                      ? `/news-details/${item.id}`
                      : item.type === "analysis"
                      ? `/Analysis-details/${item.id}`
                      : `/report-details/${item.id}`
                  }
                  target="_blank"
                  key={item.id}
                  className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
                >
                  <div className="flex flex-col items-center justify-center w-44 border-l-2 border-[#C7C7C7]">
                    <div className="font-black text-[#D5AE78] ml-2 text-2xl">
                      {formattedDate(new Date(item.date_of_publish))}
                    </div>
                  </div>
                  <div className="text-gray-800 text-start mr-2 text-xl w-full font-medium">
                    <p
                      className={
                        item.type === "publish"
                          ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#CEA461] mt-2"
                          : item.type === "news"
                          ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#69DB57] mt-2"
                          : item.type === "analysis"
                          ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#979797] mt-2"
                          : ""
                      }
                    >
                      {item.type === "publish"
                        ? "منشور"
                        : item.type === "news"
                        ? "الاخبار"
                        : item.type === "analysis"
                        ? "تحليلات"
                        : ""}
                    </p>
                    <p className="sm:line-clamp-2 md:line-clamp-1">
                      {item.ar_Title}
                    </p>
                  </div>
                </Link>
              ))}

              {(displayedByYearData?.length ?? 0) <
                (byYear?.archive?.length ?? 0) && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleShowMore}
                    className="bg-[#D5AE78] text-white text-lg font-black px-4 py-2 rounded-md"
                  >
                    عرض المزيد
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
      <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
        <Footer />
      </footer>
    </div>
  );
}
