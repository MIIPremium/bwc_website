import { Calendar, Clock10, FileArchive } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import jobs from "../../assets/img/jobs-image.png";
import { Button } from "src/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "src/lib/http";
import { useTranslation } from "react-i18next";
type joinUsRespon = {
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
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const { id } = useParams<{ id: string }>();
  const {
    isPending,
    error,
    data: joinUs,
  } = useQuery({
    queryKey: ["JoinUsInfo"],
    queryFn: () => getApi<joinUsRespon>(`/api/website/JoinUs/${id}`),
  });

  
  
  return (
    <>
      {dir === "ltr" ? (
        <div
          dir="ltr"
          className="w-full min-h-[100vh] border-2 border-gray-200 rounded-lg p-6 "
        >
          <div>
            <div className="w-[100%]  h-[20vh]  flex justify-between">
              <div className="flex">
                <div className=" w-20 h-20 ">
                  <img src={jobs} alt="" />
                </div>

                <div className="ml-2">
                  <div className=" w-full  flex items-center ">
                    <h1 className="text-2xl">{joinUs?.data.en_jobTitle}</h1>

                    <div className=" pb-2 text-end translate-y-3">
                      {joinUs?.data.avaliable === true ? (
                        <span className="inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#69DB57] ml-2 mb-2">
                          available
                        </span>
                      ) : (
                        <span className="inline-block bg-[#FFEDED] rounded-[5px] px-5  text-sm font-semibold text-[#E05151] ml-2 mb-2">
                          notAvailable
                        </span>
                      )}
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex items-center mt-2 h-6 ">
                    <div className="flex">
                      <FileArchive className="mr-2" />
                      <h6>{joinUs?.data.id}</h6>
                    </div>
                    <div className="flex ml-2">
                      <Clock10 className="mr-2" />
                      <h6>full time</h6>
                    </div>
                    <div className="flex ml-2">
                      <Calendar className="mr-2" />
                      <h6>{String(joinUs?.data.endDate)}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:hidden md:block">
                <Link
                  to={`${joinUs?.data.formLink}`}
                  className="text-lg mb-10 inline-flex h-14 px-14 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] py-2  font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Apply For Job
                </Link>
              </div>
              {/*  */}
            </div>
          </div>

          {/*  */}

          <div>
            <h1 className="text-3xl mb-4">Job Description</h1>
            <p>{joinUs?.data.en_basicDescription}</p>
          </div>

          {/*  */}

          <div className="mt-7">
            <h1 className="text-3xl mb-4">Job Tasks </h1>
            <ul>
              {joinUs?.data.en_advances.map((x, index) => (
                <li key={index}>. {x}</li>
              ))}
            </ul>
          </div>
          {/*  */}
          <div className="mt-7">
            <h1 className="text-3xl mb-4">Qualifications & Experience</h1>
            <ul>
              {joinUs?.data.en_skiles.map((x, index) => (
                <li key={index}>. {x}</li>
              ))}
            </ul>
          </div>
          {/*  */}

          <div className="sm:block md:hidden mt-10  ">
            <div className="flex justify-center items-center">
              <Link
                to={`${joinUs?.data.formLink}`}
                className="text-lg mb-10 inline-flex h-14 px-24 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] py-2  font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Apply For Job
              </Link>
            </div>
          </div>
          {/*  */}
        </div>
      ) : (
        <div className="w-full min-h-[100vh] border-2 border-gray-200 rounded-lg p-6 ">
          <div>
            <div className="w-[100%]  h-[20vh]  flex justify-between">
              <div className="flex">
                <div className=" w-20 h-20">
                  <img src={jobs} alt="" />
                </div>

                <div className="mr-2">
                  <div className=" w-full  flex items-center ">
                    <h1 className="text-2xl">{joinUs?.data.ar_jobTitle}</h1>

                    <div className=" pb-2 text-end translate-y-3">
                      {joinUs?.data.avaliable === true ? (
                        <span className="inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#69DB57] mr-2 mb-2">
                          متاحة
                        </span>
                      ) : (
                        <span className="inline-block bg-[#FFEDED] rounded-[5px] px-5  text-sm font-semibold text-[#E05151] mr-2 mb-2">
                          غير متاحة
                        </span>
                      )}
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex items-center mt-2 h-6 ">
                    <div className="flex">
                      <FileArchive className="ml-2" />
                      <h6>{joinUs?.data.id}</h6>
                    </div>
                    <div className="flex mr-2">
                      <Clock10 className="ml-2" />
                      <h6>دوام كامل </h6>
                    </div>
                    <div className="flex mr-2">
                      <Calendar className="ml-2" />
                      <h6>{String(joinUs?.data.endDate)}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:hidden md:block">
                <Link
                  to={`${joinUs?.data.formLink}`}
                  className="text-lg mb-10 inline-flex h-14 px-14 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] py-2  font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  تقدم للوظيفة
                </Link>
              </div>
              {/*  */}
            </div>
          </div>

          {/*  */}

          <div>
            <h1 className="text-3xl mb-4">وصف الوظيفة</h1>
            <p>{joinUs?.data.ar_basicDescription}</p>
          </div>

          {/*  */}

          <div className="mt-7">
            <h1 className="text-3xl mb-4">المهام الوظيفية</h1>
            <ul>
              {joinUs?.data.ar_advances.map((x, index) => (
                <li key={index}>. {x}</li>
              ))}
            </ul>
          </div>
          {/*  */}
          <div className="mt-7">
            <h1 className="text-3xl mb-4">المؤهلات والخبرات</h1>
            <ul>
              {joinUs?.data.ar_skiles.map((x, index) => (
                <li key={index}>. {x}</li>
              ))}
            </ul>
          </div>
          {/*  */}

          <div className="sm:block md:hidden mt-10  ">
            <div className="flex justify-center items-center">
              <Link
                to={`${joinUs?.data.formLink}`}
                className="text-lg mb-10 inline-flex h-14 px-24 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] py-2  font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                تقدم للوظيفة
              </Link>
            </div>
          </div>
          {/*  */}
        </div>
      )}
    </>
  );
}
