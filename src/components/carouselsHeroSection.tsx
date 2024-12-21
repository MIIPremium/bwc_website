import React, { useEffect, useState } from "react";
import formattedDate from "../utilities/formattedDate";
import formattedDateEn from "../utilities/formattedDateEn";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "src/lib/http";

interface publish {
  imgs: string;
  title: string;
  publish_date: Date;
  writers?:
    | {
        name?: string | undefined;
        img?: string | undefined;
      }
    | undefined;
}

interface CarouselProps {
  publishes: publish[];
}

export interface HomePageCaesuralResp {
  id: number;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  date_of_publish: Date;
  ar_description: string;
  en_description: string;
  type: string;
  writers: WriterElement[];
}

export interface WriterElement {
  id: number;
  ar_fullName: string;
  en_fullName: string;
  image: string;
  ar_description: string;
  en_description: string;
  ar_role: string;
  en_role: string;
  publication: Publication[];
  soicalmedia: any[];
}

export interface Publication {
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  images: string[];
  writers: Array<PublicationWriter | null>;
  reportId: null;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[];
  date_of_publish: Date;
  ar_table_of_content: any[];
  en_table_of_content: any[];
  ar_description: string;
  en_description: string;
  ar_Note: string;
  en_Note: string;
  references: any[];
}

export interface PublicationWriter {
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

export default function CarouselsHeroSection({ publishes }: CarouselProps) {
  const [slide, setSlide] = useState(0);
  const { t, i18n } = useTranslation();
  const { data: HomeSlider } = useQuery({
    queryKey: ["HomeSlider"],
    queryFn: () => getApi<HomePageCaesuralResp[]>(`/api/website/Home/Slider`),
  });
  
  
  const nextSlide = () => {
    const data = HomeSlider?.data.length ?? 0;
    setSlide(slide === data - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    const data = HomeSlider?.data.length ?? 0;
    setSlide(slide === 0 ? data - 1 : slide - 1);
  };

  const dir = i18n.dir();
  //
  const [widthScreen, setWidthScreen] = useState({
    winWidth: window.innerWidth,
    winHight: window.innerHeight,
  });

  const detectSize = () => {
    setWidthScreen({
      winWidth: window.innerWidth,
      winHight: window.innerHeight,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      nextSlide();
    }, 5000);

    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [slide, widthScreen]);
  const d = new Date("2022-03-25");
  return (
    <>
      {dir === "ltr" ? (
        <>
          {widthScreen.winWidth <= 980 ? (
            <>
              <div className="carousel_parant">
                <div className="carousel">
                  {/* <div className="arrow arrow-left" onClick={prevSlide}>
                    <ArrowLeft className="cursor-pointer" />
                  </div> */}
                  {HomeSlider?.data.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        className={
                          slide === idx ? "slide" : "slide slide-hidden"
                        }
                      >
                        <img
                          src={item.b_image}
                          key={idx}
                          className={
                            slide === idx ? "slide" : "slide slide-hidden"
                          }
                        />
                        <div dir="ltr" className="bg-[#979CA1]/[.70] md:min-h-[20vh] sm:min-h-[30vh]">
                          <div className="" key={idx}>
                            <h2
                              className={
                                dir === "ltr"
                                  ? "md:text-end md:pt-3 md:text-3xl md:px-2 sm:text-start sm:pt-3 sm:text-xl sm:px-2"
                                  : "md:text-end md:pt-3 md:text-3xl md:px-2 sm:text-start sm:pt-3 sm:text-xl sm:px-2"
                              }
                            >
                              {item.en_Title}
                            </h2>
                            <p
                              className={
                                dir === "ltr"
                                  ? "md:text-end md:text-xl md:mt-5  md:px-2 sm:text-start sm:mt-3  sm:px-2"
                                  : "md:text-end md:text-xl md:mt-5  md:px-2 sm:text-start sm:mt-3  sm:px-2"
                              }
                            >
                              {}
                              {formattedDateEn(new Date(item.date_of_publish))}
                            </p>
                            <div
                              className={
                                dir === "ltr"
                                  ? "flex items-center justify-end flex-row-reverse px-2 mt-3"
                                  : "flex items-center flex-row-reverse justify-end px-2 mt-3"
                              }
                            >
                              <p
                                className={
                                  dir === "ltr"
                                    ? "sm:ml-2 md:text-2xl"
                                    : "sm:mr-2 md:text-2xl"
                                }
                              >
                                {item?.writers[0]?.en_fullName}
                              </p>
                              <img
                                src={item?.writers[0]?.image}
                                className={
                                  item?.writers[0]?.image
                                    ? "w-[50px] h-[50px] bg-cover rounded-full outline outline-offset-0.5 outline-[#CCA972]"
                                    : ""
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className="arrow arrow-right">
                    <ArrowRight color="white" onClick={nextSlide} />
                  </div> */}

                  <span className="indicators">
                    {HomeSlider?.data.map((_, idx) => {
                      return (
                        <button
                          key={idx}
                          className={
                            slide === idx
                              ? "indicator"
                              : "indicator indicator-inactive"
                          }
                          onClick={() => setSlide(idx)}
                        ></button>
                      );
                    })}
                  </span>
                </div>
              </div>
              <div className="w-full md:h-[20vh] sm:h-[30vh] bg-black">
                {/* {publishes.map((item, idx) => {
          return(
            
          )
        })} */}
              </div>
            </>
          ) : (
            <div className="carousel_parant">
              <div className="carousel">
                {/* <div className="arrow arrow-left" onClick={prevSlide}>
                  <ArrowLeft className="cursor-pointer" />
                </div> */}
                {HomeSlider?.data.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className={slide === idx ? "slide" : "slide slide-hidden"}
                    >
                      <img
                        src={item.b_image}
                        key={idx}
                        className={
                          slide === idx ? "slide" : "slide slide-hidden"
                        }
                      />

                      <div
                        className={
                          dir === "ltr" ? "info-carousel-end" : "info-carousel"
                        }
                      >
                        <div
                          dir="ltr"
                          className={
                            dir === "ltr"
                              ? "title-info-carousel-end"
                              : "title-info-carousel"
                          }
                          key={idx}
                        >
                          <h2 className="publishesHero">{item.en_Title}</h2>
                          <p className="mt-4">
                            {}
                            {formattedDateEn(new Date(item.date_of_publish))}
                          </p>
                          <div
                            className={
                              dir === "ltr" ? "inside-image-en" : "inside-image"
                            }
                          >
                            <p>{item?.writers[0]?.en_fullName}</p>
                            <img
                              src={item?.writers[0]?.image}
                              className={
                                item?.writers[0]?.image
                                  ? "w-[50px] h-[50px] bg-cover rounded-full outline outline-offset-0.5 outline-[#CCA972]"
                                  : ""
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="arrow arrow-right">
                  <ArrowRight color="white" onClick={nextSlide} />
                </div> */}

                <span className="indicators">
                  {HomeSlider?.data.map((_, idx) => {
                    return (
                      <button
                        key={idx}
                        className={
                          slide === idx
                            ? "indicator"
                            : "indicator indicator-inactive"
                        }
                        onClick={() => setSlide(idx)}
                      ></button>
                    );
                  })}
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {widthScreen.winWidth <= 980 ? (
            <>
              <div className="carousel_parant">
                <div className="carousel">
                  {/* <div className="arrow arrow-left" onClick={prevSlide}>
                    <ArrowLeft className="cursor-pointer" />
                  </div> */}
                  {HomeSlider?.data.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        className={
                          slide === idx ? "slide" : "slide slide-hidden"
                        }
                      >
                        <img
                          src={item.b_image}
                          key={idx}
                          className={
                            slide === idx ? "slide" : "slide slide-hidden"
                          }
                        />
                        <div className="bg-[#979CA1]/[.70] md:min-h-[20vh] sm:min-h-[30vh]">
                          <div className="" key={idx}>
                            <h2
                              className={
                                "md:text-end md:pt-3 md:text-3xl md:px-2 sm:text-start sm:pt-3 sm:text-xl sm:px-2"
                              }
                            >
                              {item.ar_Title}
                            </h2>
                            <p
                              className={
                                "md:text-end md:text-xl md:mt-5  md:px-2 sm:text-start sm:mt-3  sm:px-2"
                              }
                            >
                              {}
                              {formattedDate(new Date(item.date_of_publish))}
                            </p>
                            <div
                              className={
                                "flex items-center flex-row-reverse justify-end px-2 mt-3"
                              }
                            >
                              <p className={"sm:mr-2 md:text-2xl"}>
                                {item?.writers[0]?.ar_fullName}
                              </p>
                              <img
                                src={item?.writers[0]?.image}
                                className={
                                  item?.writers[0]?.image
                                    ? "w-[50px] h-[50px] bg-cover rounded-full outline outline-offset-0.5 outline-[#CCA972]"
                                    : ""
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className="arrow arrow-right">
                    <ArrowRight color="white" onClick={nextSlide} />
                  </div> */}

                  <span className="indicators">
                    {HomeSlider?.data.map((_, idx) => {
                      return (
                        <button
                          key={idx}
                          className={
                            slide === idx
                              ? "indicator"
                              : "indicator indicator-inactive"
                          }
                          onClick={() => setSlide(idx)}
                        ></button>
                      );
                    })}
                  </span>
                </div>
              </div>
              <div className="w-full md:h-[20vh] sm:h-[30vh] bg-black">
                {/* {publishes.map((item, idx) => {
          return(
            
          )
        })} */}
              </div>
            </>
          ) : (
            <div className="carousel_parant">
              <div className="carousel">
                {/* <div className="arrow arrow-left" onClick={prevSlide}>
                  <ArrowLeft className="cursor-pointer" />
                </div> */}
                {HomeSlider?.data.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className={slide === idx ? "slide" : "slide slide-hidden"}
                    >
                      <img
                        src={item.b_image}
                        key={idx}
                        className={
                          slide === idx ? "slide" : "slide slide-hidden"
                        }
                      />

                      <div className={"info-carousel"}>
                        <div className={"title-info-carousel"} key={idx}>
                          <h2 className="publishesHero">{item.ar_Title}</h2>
                          <p className="mt-4">
                            {}
                            {formattedDate(new Date(item.date_of_publish))}
                          </p>
                          <div className={"inside-image"}>
                            <p>{item?.writers[0]?.ar_role}</p>
                            <img
                              src={item?.writers[0]?.image}
                              className={
                                item?.writers[0]?.image
                                  ? "w-[50px] h-[50px] bg-cover rounded-full outline outline-offset-0.5 outline-[#CCA972]"
                                  : ""
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="arrow arrow-right">
                  <ArrowRight color="white" onClick={nextSlide} />
                </div> */}

                <span className="indicators">
                  {HomeSlider?.data.map((_, idx) => {
                    return (
                      <button
                        key={idx}
                        className={
                          slide === idx
                            ? "indicator"
                            : "indicator indicator-inactive"
                        }
                        onClick={() => setSlide(idx)}
                      ></button>
                    );
                  })}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
