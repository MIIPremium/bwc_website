import React, { useState } from "react";
import CarousealReportDeatials from "src/components/carouseal-report-deatials";
import Footer from "src/components/footer";
import Navbar from "src/components/navbar";
import { CalendarMinus2Icon, MoveLeft, MoveRight } from "lucide-react";
import { Input } from "src/ui/input";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "src/lib/http";
import { useTranslation } from "react-i18next";
import formattedDateEn from "src/utilities/formattedDateEn";
import formattedDate from "src/utilities/formattedDate";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import { LoaderIcon } from "react-hot-toast";
import JobNotFound from "src/assets/icons/job-not-found";

export interface sidInfo {
  id: number;
  ar_Title: string;
  en_Title: string;
  img: string;
  date_of_publish: Date;
}

export interface ReportsRespons {
  id: number;
  ar_Title: string;
  en_Title: string;
  img: string;
  ar_description: string;
  en_description: string;
  ar_executive_summary: string;
  en_executive_summary: string;
  ar_table_of_content: string[];
  en_table_of_content: string[];
  date_of_report: Date;
  date_of_publish: Date;
  pdfImg: string;
  pdfFile: string;
  an_note: string;
  en_note: string;
  listOfSections: any[];
}

const ReportPage = () => {
  dayjs.extend(relativeTime);
  dayjs.locale("ar");
  const {  i18n } = useTranslation();
  const dir = i18n.dir();
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // If input is empty, reset the submitted query
    if (value.trim() === "") {
      setSubmittedQuery(""); // This will trigger the query to reset
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSubmittedQuery(searchQuery); // Update submitted value to trigger search
    }
  };
  
  const { data: ReportResp, isPending } = useQuery({
    queryKey: ["ManagingReports", submittedQuery],
    queryFn: () =>
      getApi<ReportsRespons[]>(`/api/website/Reports?query=${submittedQuery}`),
  });

  const { data: SidInfoRespReport } = useQuery({
    queryKey: ["ReadMoreReport"],
    queryFn: () => getApi<sidInfo[]>(`/api/website/Reports/ReadMore/5`),
  });
  console.log("ReportResp", ReportResp?.data);
  const itemsPerPage = 3; // Display 3 posts per page
  const totalItems = ReportResp?.data.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ReportResp?.data.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Pagination button logic
  const getPaginationNumbers = () => {
    const pages = [];
    const maxPageButtons = 3;

    if (totalPages <= maxPageButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };
  const getRelativeTime = (date: string | Date, language: string): string => {
    dayjs.locale(language);
    return dayjs().to(dayjs(date));
  };
  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full ">
        <LoaderIcon className="mt-12 flex animate-spin items-center justify-end duration-1000" />
      </div>
    );
  }
  return (
    <>
      {dir === "ltr" ? (
        <>
          <div className="w-full lg:h-[8vh] md:h-[8vh]  sm:h-[11vh]">
            <Navbar />
          </div>
          <main className="px-5">
            <div className="w-full h-36 flex justify-end items-center ">
              <div className="flex py-5 ">
                <h1 className="text-3xl">Publications</h1>
                <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
              </div>
            </div>
            <div className=" grid grid-cols-3 gap-3">
              <div dir="ltr" className=" col-span-3 md:col-span-1">
                <div className="p-3 bg-[#D5AE78] rounded-[8px] text-start">
                  <h1 className="font-bold">Read also in publications</h1>
                </div>

                <div className="border-[2px] border-[#D2D2D2] rounded-lg p-2 mt-2">
                  {SidInfoRespReport?.data.map((item, index) => (
                    <a
                      href={`/report-details/${item.id}`}
                      className="flex mt-4 gap-2 shadow-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={item.img}
                        alt=""
                        className="w-[92px] h-[70.18px] object-cover rounded-sm"
                      />
                      <div className="flex flex-col">
                        <span>{item.en_Title}</span>
                        <span className="flex font-normal text-sm gap-2 mt-2">
                          <CalendarMinus2Icon size={19} />
                          {`${getRelativeTime(item.date_of_publish, "en")}`}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className=" col-span-3 md:col-span-2">
                <CarousealReportDeatials />
              </div>
            </div>

            <div className="grid grid-cols-4  gap-3 mt-3">
              <div className="col-span-4 md:col-span-1 flex justify-between gap-4"></div>

              <div className="col-span-4 md:col-span-1"></div>
              <div className="col-span-4 md:col-span-2">
                <Input
                  dir="ltr"
                  type="text"
                  id="simple-search"
                  value={searchQuery}
                  onChange={handleSearchChange} // Update state as the user types
                  onKeyDown={handleKeyDown}
                  className="rounded-[32.5px]"
                  placeholder="Search by the name of the Report"
                />
              </div>
            </div>
            {currentItems && currentItems.length > 0 ? (
              <div className="">
                {/* Render currentItems */}
                {currentItems?.map((item, index) => (
                  <div key={index} dir="ltr" className="mt-6">
                    <div className="shadow p-6 rounded-lg flex flex-col lg:flex-row gap-6 bg-white">
                      <div className="w-full h-[300px] md:w-[455px] md:h-[300px] overflow-hidden rounded-md">
                        <img
                          src={item.img}
                          className="object-cover w-full h-full"
                          alt="Post Image"
                        />
                      </div>

                      <div className="w-full">
                        <h1 className="text-2xl font-bold text-gray-800">
                          {item.en_Title}
                        </h1>

                        <p className="flex items-center gap-2 text-sm text-gray-500 mt-3 md:text-gray-500 sm:text-black sm:py-2 sm:px-2 md:py-0 md:px-0 sm:rounded-lg md:rounded-none  md:bg-white sm:bg-[#E3E3E3]">
                          <CalendarMinus2Icon size={19} />
                          {formattedDateEn(new Date(item.date_of_publish))}
                        </p>

                        <p className="text-gray-600 text-base leading-7 mt-5 reportIndex">
                          <>{item.en_note}</>
                        </p>
                        <Link to={`/report-details/${item.id}`} target="_blank">
                          <button className="bg-[#E3E3E3] hover:bg-[#c3c3c3] text-center w-full mt-6 py-3 rounded-md">
                            Read More ...
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="bg-[#CCA972] h-1 w-full mt-4"></div>
                  </div>
                ))}

                {/* Pagination controls */}
                <div dir="ltr" className="mt-4 flex justify-between space-x-2">
                  <button
                    className="md:px-4 md:py-2 sm:px-4 sm:py-2 sm:h-10 flex items-center border border-black text-black rounded-md hover:bg-[#d5ae78] hover:text-white"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <h6>prev</h6>
                    <MoveLeft className="ml-2" />
                  </button>

                  <div className="md:pr-0 sm:pr-5">
                    {getPaginationNumbers().map((page, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded ml-1 ${
                          currentPage === page
                            ? "bg-[#d5ae78] rounded-md  text-white"
                            : "bg-white border border-black  rounded-md text-black hover:bg-[#d5ae78] hover:text-white"
                        }`}
                        onClick={() =>
                          typeof page === "number" && paginate(page)
                        }
                        disabled={typeof page !== "number"}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    className="md:px-4 md:py-2 sm:px-4 sm:py-2 sm:h-10 border flex items-center border-black text-black rounded-md hover:bg-[#d5ae78] hover:text-white"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <h6>next</h6>
                    <MoveRight size={20} className="ml-2" />
                  </button>
                </div>
              </div>
            ) : (
              <div className=" h-full w-full flex justify-center items-center">
                <div className=" text-center">
                  <JobNotFound />
                  <p>
                    There is no result of your search, try another publication
                    search
                  </p>
                </div>
              </div>
            )}
          </main>
          <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
            <Footer />
          </footer>
        </>
      ) : (
        <>
          <div className="w-full lg:h-[8vh] md:h-[8vh]  sm:h-[11vh]">
            <Navbar />
          </div>
          <main className="px-5">
            <div className="w-full h-36 flex justify-start items-center ">
              <div className="flex py-5 ">
                <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                <h1 className="text-3xl">التقارير</h1>
              </div>
            </div>
            <div className=" grid grid-cols-3 gap-3">
              <div className=" col-span-3 md:col-span-2">
                <CarousealReportDeatials />
              </div>
              <div className=" col-span-3 md:col-span-1">
                <div className="p-3 bg-[#D5AE78] rounded-[8px]">
                  <h1 className="font-bold">اقرأ أيضًا في المنشورات</h1>
                </div>
                <div className="border-[2px] border-[#D2D2D2] rounded-lg p-2 mt-2">
                  {SidInfoRespReport?.data.map((item, index) => (
                    <a
                      href={`/report-details/${item.id}`}
                      className="flex mt-4 gap-2 shadow-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={item.img}
                        alt=""
                        className="w-[92px] h-[70.18px] object-cover rounded-sm"
                      />
                      <div className="flex flex-col">
                        <span>{item.ar_Title}</span>
                        <span className="flex font-normal text-sm gap-2 mt-2">
                          <CalendarMinus2Icon size={19} />
                          {` ${getRelativeTime(item.date_of_publish, "ar")}`}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-3">
              <div className=" col-span-4 md:col-span-2">
                <Input
                  className=" rounded-[32.5px]"
                  placeholder="بحث باسم التقرير"
                  type="text"
                  id="simple-search"
                  value={searchQuery}
                  onChange={handleSearchChange} // Update state as the user types
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="col-span-4 md:col-span-1"></div>

              <div className="col-span-4 md:col-span-1 flex justify-between gap-4"></div>
            </div>
            {currentItems && currentItems.length > 0 ? (
              <div className="">
                {/* Render currentItems */}
                {currentItems?.map((item, index) => (
                  <div key={index} className="mt-6 ">
                    <div className="shadow p-6 rounded-lg flex flex-col lg:flex-row gap-6 min-h-80 ">
                      <div className="w-full h-[300px] md:w-[455px] md:h-[300px] overflow-hidden rounded-md">
                        <img
                          src={item.img}
                          className="object-cover w-full h-full"
                          alt="Post Image"
                        />
                      </div>

                      <div className="w-full min-h-[300px]  ">
                        <h1 className="text-2xl font-bold text-gray-800">
                          {item.ar_Title}
                        </h1>

                        <p className="flex items-center gap-2 text-sm md:text-gray-500 sm:text-black sm:py-2 sm:px-2 md:py-0 md:px-0 sm:rounded-lg md:rounded-none  mt-3 md:bg-white sm:bg-[#E3E3E3]">
                          <CalendarMinus2Icon size={19} className="" />
                          {formattedDate(new Date(item.date_of_publish))}
                        </p>


                        <p className="text-gray-600 text-base leading-7 reportIndex mt-5">
                          <>{item.an_note}</>
                        </p>
                        <Link
                          to={`/report-details/${item.id}`}
                          target="_blank"
                          className="  w-full"
                        >
                          <button className="bg-[#E3E3E3] hover:bg-[#c3c3c3] text-center w-full mt-6 py-3 rounded-md">
                            إقراء المزيد ...
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="bg-[#CCA972] h-1 w-full mt-4"></div>
                  </div>
                ))}

                {/* Pagination controls */}
                <div className="mt-4 flex justify-between space-x-2">
                  <button
                    className="md:px-4 md:py-2 sm:px-4 sm:py-2 sm:h-10 flex items-center border border-black text-black rounded-md hover:bg-[#d5ae78] hover:text-white"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <MoveRight size={20} className="ml-2" />
                    <h6>السابق</h6>
                  </button>

                  <div className="md:pr-0 sm:pr-5">
                    {getPaginationNumbers().map((page, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded ml-1 ${
                          currentPage === page
                            ? "bg-[#d5ae78] rounded-md  text-white"
                            : "bg-white border border-black  rounded-md text-black hover:bg-[#d5ae78] hover:text-white"
                        }`}
                        onClick={() =>
                          typeof page === "number" && paginate(page)
                        }
                        disabled={typeof page !== "number"}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    className="md:px-4 md:py-2 sm:px-4 sm:py-2 sm:h-10 border flex border-black text-black rounded-md hover:bg-[#d5ae78] hover:text-white"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <h6>التالي</h6>
                    <MoveLeft className="mr-2" />
                  </button>
                </div>
              </div>
            ) : (
              <div className=" h-full w-full flex justify-center items-center">
                <div className=" text-center">
                  <JobNotFound />
                  <p>لا توجد نتيجة للبحث، جرب البحث باسم منشور اخرى</p>
                </div>
              </div>
            )}
          </main>
          <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
            <Footer />
          </footer>
        </>
      )}
    </>
  );
};

export default ReportPage;
