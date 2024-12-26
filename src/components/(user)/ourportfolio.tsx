import React from "react";
import { useMediaQuery } from "react-responsive";
import PatternCircl from "../../assets/icons/patterncircl";
import protfolio from "../../assets/img/8H4A0856 copy.jpg";
import { useTranslation } from "react-i18next";

export default function OurPortfolio() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletScreen = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 979px)",
  });
  const isMonitorScreen = useMediaQuery({ query: "(min-width: 980px)" });

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "https://bwc.runasp.net/api/website/Home/DownloadProfileFile";
    link.download = "Business World Company Profile 2024.pdf";
    link.click();
  };
  return (
    <>
      {isMobileScreen && (
        <>
          {dir === "ltr" ? (
            <div className="w-[98%] h-[70vh] md:h-[40vh] m-auto mb-16  flex justify-center items-center relative">
              <div className="absolute -top-10 -left-[0.95rem] -z-10">
                <PatternCircl />
              </div>
              <div className="w-[95%] h-[80%] relative">
                <img
                  src={protfolio}
                  className=" w-full h-full object-cover rounded-2xl  "
                  alt=""
                />
              </div>
              <div className="absolute w-[95.7%] h-[80%] rounded-2xl blur-sm bg-[#313335]/[.65]"></div>
              <div className="absolute w-[95.7%] h-[80%] ">
                <div className="h-full grid grid-cols-1 ">
                  <div className="flex justify-center items-center text-white">
                    <h1 className="text-4xl">Company Profile</h1>
                  </div>
                  <div className="flex justify-center items-start h-full w-[90%] m-auto">
                    <p className="text-lg text-center text-white">
                      The Reliable Gateway for Investment and Project Management
                      in Yemen
                    </p>
                  </div>
                  <div className="flex justify-center items-start">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="py-2.5 px-5 me-2 mb-2 text-xl w-[60%] h-[40%] font-medium text-[#CCA972] focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-white dark:text-[#CCA972] dark:border-gray-600 dark:hover:text-[#fff] dark:hover:bg-[#CCA972]"
                    >
                      Download The File
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[98%] h-[70vh] md:h-[40vh] md:pb-4 m-auto mb-16  flex justify-center items-center relative">
              <div className="absolute -top-10 -left-[0.95rem] -z-10">
                <PatternCircl />
              </div>
              <div className="w-[95%] h-[80%] relative">
                <img
                  src={protfolio}
                  className=" w-full h-full object-cover rounded-2xl  "
                  alt=""
                />
              </div>
              <div className="absolute w-[95.7%] h-[80%] rounded-2xl blur-sm bg-[#313335]/[.65]"></div>
              <div className="absolute w-[95.7%] h-[80%] ">
                <div className="h-full grid grid-cols-1 ">
                  <div className="flex justify-center items-center text-white">
                    <h1 className="text-3xl">الملف التعريفي للشركة</h1>
                  </div>
                  <div className="flex justify-center items-start h-full w-[90%] m-auto">
                    <p className="text-md text-center text-white">
                      البوابة الموثوقة للاستثمار وإدارة المشاريع في اليمن
                    </p>
                  </div>
                  <div className="flex justify-center items-start">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="py-2.5 px-5 me-2 mb-2 text-xl w-[50%] h-[40%] font-medium text-[#CCA972] focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-white dark:text-[#CCA972] dark:border-gray-600 dark:hover:text-[#fff] dark:hover:bg-[#CCA972]"
                    >
                      تحميل الملف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {isTabletScreen && (
        <>
          {dir === "ltr" ? (
            <div className="lg:w-[98%] lg:h-[40vh] md:h-[40vh] m-auto mb-16  flex justify-center items-center relative">
              <div className="absolute -top-10 -left-[0.95rem] -z-10">
                <PatternCircl />
              </div>
              <div className="w-[95%] h-[80%] relative">
                <img
                  src={protfolio}
                  className=" w-full h-full object-cover rounded-2xl  "
                  alt=""
                />
              </div>
              <div className="absolute w-[95.7%] h-[80%] rounded-2xl blur-sm bg-[#313335]/[.65]"></div>
              <div className="absolute w-[95.7%] h-[80%] ">
                <div className="h-full grid grid-cols-1 ">
                  <div className="flex justify-center items-center text-white">
                    <h1 className="text-6xl">Company Profile</h1>
                  </div>
                  <div className="flex justify-center items-start h-full w-[90%] m-auto">
                    <p className="text-xl text-center text-white">
                      The Reliable Gateway for Investment and Project Management
                      in Yemen
                    </p>
                  </div>
                  <div className="flex justify-center items-start">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="py-2.5 px-5 me-2 mb-2 text-xl w-[30%] h-[40%] font-medium text-[#CCA972] focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-white dark:text-[#CCA972] dark:border-gray-600 dark:hover:text-[#fff] dark:hover:bg-[#CCA972]"
                    >
                      Download The File
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:w-[98%] lg:h-[40vh] md:h-[40vh] md:pb-4 m-auto mb-16  flex justify-center items-center relative">
              <div className="absolute -top-10 -left-[0.95rem] -z-10">
                <PatternCircl />
              </div>
              <div className="w-[95%] h-[80%] relative">
                <img
                  src={protfolio}
                  className=" w-full h-full object-cover rounded-2xl  "
                  alt=""
                />
              </div>
              <div className="absolute w-[95.7%] h-[80%] rounded-2xl blur-sm bg-[#313335]/[.65]"></div>
              <div className="absolute w-[95.7%] h-[80%] ">
                <div className="h-full grid grid-cols-1 ">
                  <div className="flex justify-center items-center text-white">
                    <h1 className="text-6xl">الملف التعريفي للشركة</h1>
                  </div>
                  <div className="flex justify-center items-start h-full w-[90%] m-auto">
                    <p className="text-xl text-center text-white">
                      البوابة الموثوقة للاستثمار وإدارة المشاريع في اليمن
                    </p>
                  </div>
                  <div className="flex justify-center items-start">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="py-2.5 px-5 me-2 mb-2 text-xl w-[30%] h-[40%] font-medium text-[#CCA972] focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-white dark:text-[#CCA972] dark:border-gray-600 dark:hover:text-[#fff] dark:hover:bg-[#CCA972]"
                    >
                      تحميل الملف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {isMonitorScreen && (
        <>
          {dir === "ltr" ? (
            <div className="lg:w-[98%] lg:h-[40vh] md:min-h-[80vh] md:pb-4 m-auto mb-16  lg:mt-16 sm:mt-40 flex justify-center items-center relative">
              <div className="absolute -top-10 -left-[0.95rem] -z-10">
                <PatternCircl />
              </div>
              <div className="w-[95%] h-[80%] relative">
                <img
                  src={protfolio}
                  className=" w-full h-full object-cover rounded-2xl  "
                  alt=""
                />
              </div>
              <div className="absolute w-[95.7%] h-[78%] rounded-2xl blur-sm bg-[#313335]/[.65]"></div>
              <div className="absolute w-[95.7%] h-[78%] ">
                <div className="h-full grid grid-cols-1 ">
                  <div className="flex justify-center items-center text-white">
                    <h1 className="text-6xl">Company Profile</h1>
                  </div>
                  <div className="flex justify-center items-start h-full w-[90%] m-auto">
                    <p className="text-xl text-center text-white">
                      The Reliable Gateway for Investment and Project Management
                      in Yemen
                    </p>
                  </div>
                  <div className="flex justify-center items-start">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="py-2.5 px-5 me-2 mb-2 text-xl w-[15%] h-[40%] font-medium text-[#CCA972] focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-white dark:text-[#CCA972] dark:border-gray-600 dark:hover:text-[#fff] dark:hover:bg-[#CCA972]"
                    >
                      Download The File
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:w-[98%] lg:h-[40vh] md:min-h-[80vh] md:pb-4 m-auto mb-16  lg:mt-16 sm:mt-40 flex justify-center items-center relative">
              <div className="absolute -top-10 -left-[0.95rem] -z-10">
                <PatternCircl />
              </div>
              <div className="w-[95%] h-[80%] relative">
                <img
                  src={protfolio}
                  className=" w-full h-full object-cover rounded-2xl  "
                  alt=""
                />
              </div>
              <div className="absolute w-[95.7%] h-[78%] rounded-2xl blur-sm bg-[#313335]/[.65]"></div>
              <div className="absolute w-[95.7%] h-[78%] ">
                <div className="h-full grid grid-cols-1 ">
                  <div className="flex justify-center items-center text-white">
                    <h1 className="text-6xl">الملف التعريفي للشركة</h1>
                  </div>
                  <div className="flex justify-center items-start h-full w-[90%] m-auto">
                    <p className="text-xl text-center text-white">
                      البوابة الموثوقة للاستثمار وإدارة المشاريع في اليمن
                    </p>
                  </div>
                  <div className="flex justify-center items-start">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="py-2.5 px-5 me-2 mb-2 text-xl w-[15%] h-[40%] font-medium text-[#CCA972] focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-white dark:text-[#CCA972] dark:border-gray-600 dark:hover:text-[#fff] dark:hover:bg-[#CCA972]"
                    >
                      تحميل الملف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
