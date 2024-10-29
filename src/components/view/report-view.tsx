import React, { useState } from "react";
import { addPublishes } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance, postApi } from "src/lib/http";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface ReportRespById {
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

export interface Reference {
  id: number;
  ar_title: string;
  en_title: string;
  link: string;
  publication: Publication[];
}

export interface Publication {
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  images: string[];
  writers: Writer[];
  reportId: null;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[];
  date_of_publish: Date;
  ar_table_of_content: null;
  en_table_of_content: null;
  ar_description: string;
  en_description: string;
  ar_Note: null;
  en_Note: string;
  references: null[];
}

export interface Writer {
  id: number;
  ar_fullName: string;
  en_fullName: string;
  image: string;
  ar_description: string;
  en_description: string;
  ar_role: string;
  en_role: string;
  publication: null[];
  soicalmedia: any[];
}

type ReferenceFormValue = z.infer<typeof addPublishes>;

export default function ViewReportById() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    const response = await axiosInstance.get<ReportRespById>(
      `api/Reports/${id}`,
      {}
    );
    return response.data;
  };
  const {
    data: PublicationInfoData,
    error: PublicationInfoError,
    isLoading: PublicationInfoIsLoading,
  } = useQuery({
    queryKey: ["getByIdPublication", id],
    queryFn: fetchData,
    enabled: !!id,
  });
  const openModal = () => {
    if (PublicationInfoData?.img) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openPdfModal = () => {
    if (PublicationInfoData?.pdfImg) {
      setPdfOpen(true);
    }
  };

  const closePdfModal = () => {
    setPdfOpen(false);
  };
  return (
    <>
      {dir === "ltr" ? (
        <div className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] px-9">
          <div className="border-2 border-black w-[100%] rounded-lg my-5 p-2 mx-auto ">
            <div className="grid   grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right min-h-[20vh] ">
              <div className="text-start col-span-1 h-auto ">
                <label htmlFor="" className="float-start font-bold text-xl">
                  Report Image
                </label>
                <img
                  src={PublicationInfoData?.img}
                  className="cursor-pointer"
                  onClick={openModal}
                  alt=""
                />
              </div>
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
                      src={PublicationInfoData?.img!}
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
            <div className="h-[2px]  w-[100%] mx-auto bg-black my-3"></div>

            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">عنوان التقرير</label>
                <p>{PublicationInfoData?.ar_Title}</p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Report Title</label>
                <p>{PublicationInfoData?.en_Title}</p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Publication Date</label>
                <p>
                  {String(PublicationInfoData?.date_of_publish).split("T")[0]}
                </p>
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Date Of The Report</label>
                <p>
                  {String(PublicationInfoData?.date_of_report).split("T")[0]}
                </p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">File Link</label>
                <a
                  href={PublicationInfoData?.pdfFile}
                  target="_blank"
                  className="block"
                >
                  اضغط هنا للمشاهدة
                </a>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">
                  Cover Image Of The Report
                </label>
                <img
                  src={PublicationInfoData?.pdfImg}
                  alt=""
                  className="cursor-pointer"
                  onClick={openPdfModal}
                />
              </div>
            </div>
            {pdfOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                onClick={closePdfModal}
              >
                <div
                  className="relative w-[100%] h-[100%] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <>
                    <img
                      src={PublicationInfoData?.pdfImg!}
                      className="w-[80%] h-[80%] mx-auto object-fill cursor-pointer"
                      alt=""
                    />
                    <button
                      onClick={closePdfModal}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white text-black hover:bg-gray-200"
                    >
                      &times;
                    </button>
                  </>
                </div>
              </div>
            )}
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div
                dir="rtl"
                className="text-start col-span-1 h-auto translate-y-10"
              >
                <label className="font-bold text-xl">جدول محتويات</label>
                <ul>
                  {PublicationInfoData?.ar_table_of_content.map((X) => {
                    return <li key={X}>. {X}</li>;
                  })}
                </ul>
              </div>
              <div
                dir="ltr"
                className="text-start col-span-1 h-auto translate-y-10"
              >
                <label className="font-bold text-xl">Table Of Content</label>
                <ul>
                  {PublicationInfoData?.en_table_of_content.map((X) => {
                    return <li key={X}>. {X}</li>;
                  })}
                </ul>
              </div>
            </div>
            {/*  */}

            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  "></div>

            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">وصف التقرير</label>
                <div className="custom-html-content">
                  {PublicationInfoData?.ar_description && (
                    <div
                      className="break-words whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.ar_description,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Description</label>

                <div className="custom-html-content-en">
                  {PublicationInfoData?.en_description && (
                    <div
                      className="break-words whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.en_description,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/*  */}
            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">ملخص تنفيذي</label>
                <div className="custom-html-content">
                  {PublicationInfoData?.ar_executive_summary && (
                    <div
                      className="break-words whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.ar_executive_summary,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Executive Summary</label>

                <div className="custom-html-content-en">
                  {PublicationInfoData?.en_executive_summary && (
                    <div
                      className="break-words whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.en_executive_summary,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">ملاحظة</label>

                <div className="">
                  <div className="custom-html-content-en">
                    <div className="break-words whitespace-pre-wrap">
                      {PublicationInfoData?.an_note}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Note</label>
                <div className="">
                  <div className="custom-html-content-en">
                    <div className="break-words whitespace-pre-wrap">
                      {PublicationInfoData?.an_note}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] px-9">
          <div className="border-2 border-black w-[100%] rounded-lg my-5 p-2 mx-auto ">
            <div className="grid   grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right min-h-[20vh] ">
              <div className="text-start col-span-1 h-auto ">
                <label htmlFor="" className="float-start font-bold text-xl">
                  صورة التقرير
                </label>
                <img
                  src={PublicationInfoData?.img}
                  className="cursor-pointer"
                  onClick={openModal}
                  alt=""
                />
              </div>
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
                      src={PublicationInfoData?.img!}
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
            <div className="h-[2px]  w-[100%] mx-auto bg-black my-3"></div>

            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">عنوان التقرير</label>
                <p>{PublicationInfoData?.ar_Title}</p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Report Title</label>
                <p>{PublicationInfoData?.en_Title}</p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">تاريخ النشر</label>
                <p>
                  {String(PublicationInfoData?.date_of_publish).split("T")[0]}
                </p>
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">تاريخ التقرير</label>
                <p>
                  {String(PublicationInfoData?.date_of_report).split("T")[0]}
                </p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">رابط الملف</label>
                <a
                  href={PublicationInfoData?.pdfFile}
                  target="_blank"
                  className="block"
                >
                  اضغط هنا للمشاهدة
                </a>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">صورة الغلاف للتقرير</label>
                <img
                  src={PublicationInfoData?.pdfImg}
                  alt=""
                  onClick={openPdfModal}
                />
              </div>
            </div>
            {pdfOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                onClick={closePdfModal}
              >
                <div
                  className="relative w-[100%] h-[100%] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <>
                    <img
                      src={PublicationInfoData?.pdfImg!}
                      className="w-[80%] h-[80%] mx-auto object-fill cursor-pointer"
                      alt=""
                    />
                    <button
                      onClick={closePdfModal}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white text-black hover:bg-gray-200"
                    >
                      &times;
                    </button>
                  </>
                </div>
              </div>
            )}
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">جدول محتويات</label>
                <ul>
                  {PublicationInfoData?.ar_table_of_content.map((X) => {
                    return <li key={X}>. {X}</li>;
                  })}
                </ul>
              </div>
              <div
                dir="ltr"
                className="text-start col-span-1 h-auto translate-y-10"
              >
                <label className="font-bold text-xl">Table Of Content</label>
                <ul>
                  {PublicationInfoData?.en_table_of_content.map((X) => {
                    return <li key={X}>. {X}</li>;
                  })}
                </ul>
              </div>
            </div>
            {/*  */}

            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  "></div>

            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">وصف التقرير</label>
                <div className="custom-html-content">
                  {PublicationInfoData?.ar_description && (
                    <div
                      className="break-words whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.ar_description,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-end col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Description</label>

                <div className="custom-html-content-en">
                  {PublicationInfoData?.en_description && (
                    <div
                      className="break-words whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.en_description,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/*  */}
            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">ملخص تنفيذي</label>
                <div className="custom-html-content">
                  {PublicationInfoData?.ar_executive_summary && (
                    <div
                      className="break-words whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.ar_executive_summary,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-end col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Executive Summary</label>

                <div className="custom-html-content-en">
                  {PublicationInfoData?.en_executive_summary && (
                    <div
                      className="break-words whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.en_executive_summary,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">ملاحظة</label>

                <div className="">
                  <div className="custom-html-content-en">
                    <div className="break-words whitespace-pre-wrap">
                      {PublicationInfoData?.an_note}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-end col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Note</label>
                <div className="">
                  <div className="custom-html-content-en">
                    <div className="break-words whitespace-pre-wrap">
                      {PublicationInfoData?.an_note}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
