import React, { useState } from "react";
import { addPublishes } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance, getApi, postApi } from "src/lib/http";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

export interface publicationView {
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  images: string[];
  writers: Writer[];
  reportId: number;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[];
  date_of_publish: Date;
  ar_table_of_content: any[];
  en_table_of_content: any[];
  ar_description: string;
  en_description: string;
  ar_Note: null;
  en_Note: string;
  references: Reference[];
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
export interface ReportPubResp {
  id: number;
  ar_Title: string;
  en_Title: string;
}
type ReferenceFormValue = z.infer<typeof addPublishes>;

export default function ViewPublications() {
  const AccessToken = Cookies.get("accessToken");
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    const response = await axiosInstance.get<publicationView>(
      `/api/ManagingPublications/${id}`,
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
    data: PublicationInfoData,
    error: PublicationInfoError,
    isLoading: PublicationInfoIsLoading,
  } = useQuery({
    queryKey: ["getByIdPublication", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  const { data: ReportPub } = useQuery({
    queryKey: ["ReportPubView"],
    queryFn: () => getApi<ReportPubResp[]>("/api/reports/pub",{
      headers: {
        "Content-Type": "application/json", // Ensures that the request body is treated as JSON
        Authorization: `Bearer ${AccessToken}`,
      },
    }),
  });

  // Assuming this is your data structure
  // ReportPub?.data = [{ reportId: 1, ar_Title: 'Title 1' }, { reportId: 2, ar_Title: 'Title 2' }];
  // PublicationInfoData?.reportId = 1;

  const ar_Title = ReportPub?.data?.find(
    (item) => item.id === PublicationInfoData?.reportId
  )?.ar_Title;

  const en_Title = ReportPub?.data?.find(
    (item) => item.id === PublicationInfoData?.reportId
  )?.en_Title;

  const openModal = () => {
    if (PublicationInfoData?.b_image) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openArrayModal = (image: any) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const closeArrayModal = () => {
    setSelectedImage(null);
  };
  return (
    <>
      {dir === "ltr" ? (
        <div className="min-h-[90vh]  w-[100%] bg-[#f2f2f2] px-9">
          <div className="border-2 border-black w-[100%] rounded-lg my-5 p-2 mx-auto ">
            <div className="grid   grid-cols-3 items-start gap-4 overflow-y-scroll scroll-smooth text-right min-h-[20vh] ">
              <div className="text-start col-span-1 h-auto ">
                <label htmlFor="" className="float-start font-bold text-xl">
                  publication image
                </label>
                <img
                  src={PublicationInfoData?.b_image}
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
                      src={PublicationInfoData?.b_image!}
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
            <div className="grid min-h-[100px] mt-4 items-start gap-4 overflow-y-scroll scroll-smooth text-right">
              <div className="text-start h-auto">
                <label htmlFor="" className="float-start font-bold text-xl">
                  More publication Image
                </label>
                <div className="flex flex-wrap gap-4">
                  {PublicationInfoData?.images.map((item, index) => (
                    <div key={index} className="flex-shrink-0">
                      <img
                        src={item}
                        alt={`publication-${index}`}
                        className="w-[200px] h-auto cursor-pointer"
                        onClick={() => openArrayModal(item)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {selectedImage && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                onClick={closeArrayModal}
              >
                <div
                  className="relative w-[80%] h-[80%] overflow-hidden"
                  onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside the modal content
                >
                  <img
                    src={selectedImage}
                    className="w-full h-full object-contain"
                    alt="Enlarged view"
                  />
                  <button
                    onClick={closeArrayModal}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white text-black hover:bg-gray-200"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
            {/*  */}

            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">عنوان المنشور</label>
                <p>{PublicationInfoData?.ar_Title}</p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Publish Title</label>
                <p>{PublicationInfoData?.en_Title}</p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Date of Publication</label>
                <p>
                  {String(PublicationInfoData?.date_of_publish).split("T")[0]}
                </p>
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">writers</label>
                <div className="flex flex-wrap gap-4">
                  {PublicationInfoData?.writers.map((Item, index) => (
                    <div key={index} className="flex items-end gap-4">
                      <p>{Item.en_fullName}</p>
                      <img
                        src={Item.image}
                        alt=""
                        className="w-[100px] h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Time to read</label>
                <p>{PublicationInfoData?.t2read}</p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">references</label>
                <div className="flex flex-wrap gap-4">
                  {PublicationInfoData?.references.map((Item, index) => (
                    <div key={index} className="flex items-end gap-4">
                      <a href={Item.link}>{Item.en_title}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/*  */}

            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Tags</label>
                <div className="">
                  {PublicationInfoData?.tags.map((Item, index) => (
                    <div key={index} className="">
                      <p>{Item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Report Name</label>
                <div className="">
                  {en_Title}
                </div>
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">وصف المنشور</label>
                <div className="custom-html-content">
                  {PublicationInfoData?.ar_description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.ar_description,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Description</label>
                <div className="custom-html-content-en">
                  {PublicationInfoData?.en_description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.en_description,
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
                  <p>{PublicationInfoData?.ar_Note}</p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Note</label>
                <div className="">
                  <p>{PublicationInfoData?.en_Note}</p>
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
                  صورة المنشور
                </label>
                <img
                  src={PublicationInfoData?.b_image}
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
                      src={PublicationInfoData?.b_image!}
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
            <div className="grid min-h-[100px] mt-4 items-start gap-4 overflow-y-scroll scroll-smooth text-right">
              <div className="text-start h-auto">
                <label htmlFor="" className="float-start font-bold text-xl">
                  إضافة صور مشنور اخرى
                </label>
                <div className="flex flex-wrap gap-4">
                  {PublicationInfoData?.images.map((item, index) => (
                    <div key={index} className="flex-shrink-0">
                      <img
                        src={item}
                        alt={`publication-${index}`}
                        className="w-[200px] cursor-pointer"
                        onClick={() => openArrayModal(item)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {selectedImage && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                onClick={closeArrayModal}
              >
                <div
                  className="relative w-[80%] h-[80%] overflow-hidden"
                  onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside the modal content
                >
                  <img
                    src={selectedImage}
                    className="w-full h-full object-contain"
                    alt="Enlarged view"
                  />
                  <button
                    onClick={closeArrayModal}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white text-black hover:bg-gray-200"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
            {/*  */}

            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">عنوان المنشور</label>
                <p>{PublicationInfoData?.ar_Title}</p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Publish Title</label>
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
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">كتاب</label>
                <div className="flex flex-wrap gap-4">
                  {PublicationInfoData?.writers.map((Item, index) => (
                    <div key={index} className="flex items-end gap-4">
                      <p>{Item.en_fullName}</p>
                      <img
                        src={Item.image}
                        alt=""
                        className="w-[100px] h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">وقت القراءه</label>
                <p>{PublicationInfoData?.t2read}</p>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">مراجع</label>
                <div className="flex flex-wrap gap-4">
                  {PublicationInfoData?.references.map((Item, index) => (
                    <div key={index} className="flex items-end gap-4">
                      <a href={Item.link}>{Item.en_title}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/*  */}

            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">وسوم</label>
                <div className="">
                  {PublicationInfoData?.tags.map((Item, index) => (
                    <div key={index} className="">
                      <p>{Item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-start col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">اسم التقرير</label>
                <div className="">
                  {ar_Title}
                </div>
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">وصف المنشور</label>
                <div className="custom-html-content">
                  {PublicationInfoData?.ar_description && (
                    <div
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
                      dangerouslySetInnerHTML={{
                        __html: PublicationInfoData.en_description,
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
                  <p>{PublicationInfoData?.ar_Note}</p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right min-h-[20vh]  ">
              <div className="text-end col-span-1 h-auto translate-y-10">
                <label className="font-bold text-xl">Note</label>
                <div className="">
                  <p>{PublicationInfoData?.en_Note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
