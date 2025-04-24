import React, { useEffect, useState } from "react";
import Footer from "src/components/footer";
import Navbar from "src/components/navbar";
import { ReactComponent as TranslateIcon } from "../../assets/icons/translate-icon.svg";
import CalendarIcon from "../../assets/icons/calendar-icon";
import NewsListReport from "../../components/(user)/new-list-report";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "src/lib/http";
import MoreREports from "src/components/(user)/moreReports";
import { LoaderIcon } from "lucide-react";

export interface ReportDetailsResponse {
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

export default function ReportDetials() {
  const { id } = useParams<{ id: string }>();
  const [language, setLanguage] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  dayjs.extend(relativeTime);
  dayjs.locale("ar");
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const {
    data: ReportHomeDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ReportHomeDetails"],
    queryFn: () =>
      getApi<ReportDetailsResponse>(`/api/website/Reports/Details/${id}`),
  });

  const getRelativeTime = (date: string | Date, language: string): string => {
    dayjs.locale(language);
    return dayjs().to(dayjs(date));
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };
  const onChangeLanguage = () => {
    language === "ar" ? setLanguage("en") : setLanguage("ar");
  };

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };
  useEffect(() => {
    changeLanguage(language);
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language, language]);
  const openModal = () => {
    if (ReportHomeDetails?.data.img) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `${ReportHomeDetails?.data.pdfFile}`;
    link.download = "Business World Company Profile 2024.pdf";
    link.click();
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full ">
        <LoaderIcon className="mt-12 flex animate-spin items-center justify-end duration-1000" />
      </div>
    );
  if (error) return <div>Error loading report details.</div>;

  return (
    <>
      {dir === "ltr" ? (
        <div>
          <div className="xlg:max-w-[1200px] justify-self-center">
            <div className="w-full lg:h-[8vh] md:h-[8vh]  sm:h-[11vh]">
              <Navbar />
            </div>
            <div dir="ltr" className=" min-h-screen md:p-4 p-4">
              {/* Main Content Section */}
              <main className="md:max-w-[90vw] mx-auto  md:p-6">
                <h1 className=" text-[36px] font-bold mb-[43px] flex items-center gap-x-2">
                  <span className="bg-[#CCA972] h-10 w-[10px] rounded-full "></span>
                  <span>Reports</span>
                </h1>
                <h1 className=" text-2xl font-bold mb-[43px]">
                  {ReportHomeDetails?.data.en_Title}
                </h1>
                {/* Image Section */}
                <div className="mb-8 relative h-[400px] overflow-hidden">
                  <img
                    src={ReportHomeDetails?.data.img} // Replace with actual image path
                    alt="Report cover"
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={openModal}
                  />
                </div>
                {modalOpen && (
                  <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={closeModal}
                  >
                    <div
                      className="relative w-[100%] h-[100%] overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <>
                        <img
                          src={ReportHomeDetails?.data.img!}
                          className="w-[80%] h-[80%] mx-auto object-fill"
                          alt=""
                        />
                        <button
                          onClick={closeModal}
                          className="absolute top-4 right-4 p-2 rounded-full bg-white text-black hover:bg-gray-200"
                        >
                          &times;
                        </button>
                      </>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-6 gap-x-2 gap-y-2">
                  <div className=" col-span-6 md:col-span-4 ">
                    <div className="flex flex-col md:flex-row justify-between md:h-[70px] bg-[#D5AE78] items-center mb-4 rounded-lg">
                      <div className="flex items-center gap-x-2 py-5 ps-8">
                        <div className="flex items-center gap-x-2">
                          <CalendarIcon />
                          <span>{` ${getRelativeTime(
                            ReportHomeDetails?.data.date_of_publish ??
                              new Date(),
                            "en"
                          )}`}</span>
                        </div>
                      </div>
                      <button className="bg-[#C4A171]  md:h-[68px] w-full md:w-fit flex items-center place-content-center gap-x-2  text-black px-4 py-2 rounded-[8px]">
                        <TranslateIcon />
                        <span
                          onClick={onChangeLanguage}
                          className="cursor-pointer"
                        >
                          اقرأ هذا باللغة بالعربية
                        </span>
                      </button>
                    </div>
                    {/*-------- author ------------- */}
                    <div>
                      <div className="mb-[47px] mt-7">
                        <h2 className="text-xl font-bold mb-5">
                          {" "}
                          ✅ Table Of Contents
                        </h2>
                        <ul>
                          {ReportHomeDetails?.data.en_table_of_content.map(
                            (x, index) => (
                              <li key={index}>. {x}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="mb-[47px]">
                      <h2 className="text-xl font-bold mb-5">
                        {" "}
                        ✅ Descriptions
                      </h2>
                      <p>
                        {ReportHomeDetails?.data.en_description && (
                          <div
                            className="custom-html-content text-justify max-w-[800px] break-words"
                            dangerouslySetInnerHTML={{
                              __html: ReportHomeDetails.data.en_description,
                            }}
                          />
                        )}
                      </p>
                    </div>
                    <div className="mb-[47px]">
                      <h2 className="text-xl font-bold mb-5">
                        {" "}
                        ✅ Executive Summary
                      </h2>
                      <p>
                        {ReportHomeDetails?.data.en_executive_summary && (
                          <div
                            className="custom-html-content text-justify max-w-[800px] break-words"
                            dangerouslySetInnerHTML={{
                              __html:
                                ReportHomeDetails.data.en_executive_summary,
                            }}
                          />
                        )}
                      </p>
                    </div>

                    {/* ------ note ----------- */}
                    <div className="mb-[47px]">
                      <h2 className="text-xl font-bold mb-5"> ✅ Note</h2>
                      <div className="max-w-[800px] break-words">
                        {ReportHomeDetails?.data.en_note}
                      </div>
                    </div>

                    <div className="w-[90%] sm:mx-auto md:mx-0 md:w-[90%] rounded-lg shadow-lg bg-white overflow-hidden">
                      <div
                        className="relative w-full h-56 md:h-56 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${ReportHomeDetails?.data.pdfImg}')`,
                        }}
                      >
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                          <h3 className="text-white font-bold text-xl md:text-3xl lg:text-3xltext-center">
                            {ReportHomeDetails?.data.en_Title}
                          </h3>
                          <button
                            onClick={handleDownload}
                            className="py-2.5 px-10 text-2xl w-auto font-medium  text-[#CCA972] focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-white dark:text-[#CCA972] dark:border-gray-600 dark:hover:text-[#fff] dark:hover:bg-[#CCA972]"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full border-t my-14"></div>
                  </div>
                  <div className=" hidden md:block col-span-6 md:col-span-2 h-10">
                    {/* last news here */}
                    <div className="md:h-[70px] bg-[#D5AE78] rounded-lg flex items-center ps-4">
                      <h2 className="text-2xl font-bold">Read more</h2>
                    </div>
                    <NewsListReport />
                  </div>
                </div>
              </main>
            </div>
            <MoreREports />
          </div>
          <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
            <Footer />
          </footer>
        </div>
      ) : (
        <div>
          <div className="xlg:max-w-[1200px] justify-self-center">
            <div className="w-full lg:h-[8vh] md:h-[8vh]  sm:h-[11vh]">
              <Navbar />
            </div>
            <div className=" min-h-screen md:p-4 p-4">
              {/* Main Content Section */}
              <main className="md:max-w-[90vw] mx-auto  md:p-6">
                <h1 className=" text-[36px] font-bold mb-[43px] flex items-center gap-x-2">
                  <span className="bg-[#CCA972] h-10 w-[10px] rounded-full "></span>
                  <span>التقارير</span>
                </h1>
                <h1 className=" text-2xl font-bold mb-[43px]">
                  {ReportHomeDetails?.data.ar_Title}
                </h1>
                {/* Image Section */}
                <div className="mb-8 relative h-[400px] overflow-hidden">
                  <img
                    src={ReportHomeDetails?.data.img} // Replace with actual image path
                    alt="Report cover"
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={openModal}
                  />
                </div>
                {modalOpen && (
                  <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={closeModal}
                  >
                    <div
                      className="relative w-[100%] h-[100%] overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <>
                        <img
                          src={ReportHomeDetails?.data.img!}
                          className="w-[80%] h-[80%] mx-auto object-fill"
                          alt=""
                        />
                        <button
                          onClick={closeModal}
                          className="absolute top-4 right-4 p-2 rounded-full bg-white text-black hover:bg-gray-200"
                        >
                          &times;
                        </button>
                      </>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-6 gap-x-2 gap-y-2">
                  <div className=" col-span-6 md:col-span-4 ">
                    <div className="flex flex-col md:flex-row justify-between md:h-[70px] bg-[#D5AE78] items-center mb-4 rounded-lg">
                      <div className="flex items-center gap-x-2 py-5 ps-8">
                        <div className="flex items-center gap-x-2">
                          <CalendarIcon />
                          <span>{` ${getRelativeTime(
                            ReportHomeDetails?.data.date_of_publish ??
                              new Date(),
                            "ar"
                          )}`}</span>
                        </div>
                      </div>
                      <button className="bg-[#C4A171]  md:h-[68px] w-full md:w-fit flex items-center place-content-center gap-x-2  text-black px-4 py-2 rounded-[8px]">
                        <span
                          onClick={onChangeLanguage}
                          className="cursor-pointer"
                        >
                          Read this in English
                        </span>
                        <TranslateIcon />
                      </button>
                    </div>
                    {/*-------- author ------------- */}
                    <div>
                      <div className="mb-[47px] mt-7">
                        <h2 className="text-xl font-bold mb-5">
                          {" "}
                          ✅ جدول المحتويات
                        </h2>
                        <ul>
                          {ReportHomeDetails?.data.ar_table_of_content.map(
                            (x, index) => (
                              <li key={index}>. {x}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-[47px]">
                      <h2 className="text-xl font-bold mb-5"> ✅ الوصف</h2>
                      <p>
                        {ReportHomeDetails?.data.ar_description && (
                          <div
                            className="custom-html-content text-justify max-w-[800px] break-words"
                            dangerouslySetInnerHTML={{
                              __html: ReportHomeDetails.data.ar_description,
                            }}
                          />
                        )}
                      </p>
                    </div>

                    <div className="mb-[47px]">
                      <h2 className="text-xl font-bold mb-5">
                        {" "}
                        ✅ الملخص التنفيذي
                      </h2>
                      <p>
                        {ReportHomeDetails?.data.ar_executive_summary && (
                          <div
                            className="custom-html-content text-justify max-w-[800px] break-words"
                            dangerouslySetInnerHTML={{
                              __html:
                                ReportHomeDetails.data.ar_executive_summary,
                            }}
                          />
                        )}
                      </p>
                    </div>
                    {/* ------ note ----------- */}
                    <div className="mb-[47px]">
                      <h2 className="text-xl font-bold mb-5"> ✅ ملاحظة</h2>
                      <div className="max-w-[800px] break-words text-justify">
                        {ReportHomeDetails?.data.an_note}
                      </div>
                    </div>

                    <div className="w-[90%] sm:mx-auto md:mx-0 md:w-[90%] rounded-lg shadow-lg bg-white overflow-hidden">
                      <div
                        className="relative w-full h-56 md:h-56 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${ReportHomeDetails?.data.pdfImg}')`,
                        }}
                      >
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                          <h3 className="text-white font-bold text-xl md:text-3xl lg:text-3xl text-center">
                            {ReportHomeDetails?.data.ar_Title}
                          </h3>
                          <button
                            onClick={handleDownload}
                            className="py-2.5 px-10 text-2xl w-auto font-medium  text-[#CCA972] focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-white dark:text-[#CCA972] dark:border-gray-600 dark:hover:text-[#fff] dark:hover:bg-[#CCA972]"
                          >
                            تحميل
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full border-t my-14"></div>
                  </div>
                  <div className=" hidden md:block col-span-6 md:col-span-2 h-10">
                    {/* last news here */}
                    <div className="md:h-[70px] bg-[#D5AE78] rounded-lg flex items-center ps-4">
                      <h2 className="text-2xl font-bold">اقرأ أيضًا</h2>
                    </div>
                    <NewsListReport />
                  </div>
                </div>
              </main>
            </div>
            <MoreREports />
          </div>
          <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
            <Footer />
          </footer>
        </div>
      )}
    </>
  );
}
