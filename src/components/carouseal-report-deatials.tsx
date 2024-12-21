import React, { useEffect, useState } from "react";
import formattedDate from "../utilities/formattedDate";
import formattedDateEn from "../utilities/formattedDateEn";
import { useTranslation } from "react-i18next";
import { getApi } from "src/lib/http";
import { useQuery } from "@tanstack/react-query";

export interface sliderRes {
  id: number;
  ar_Title: string;
  en_Title: string;
  img: string;
  ar_description: string;
  en_description: string;
  date_of_publish: Date;
}

export default function CarousealReportDeatials() {
  const [slide, setSlide] = useState(0);
  const { t, i18n } = useTranslation();
  const { data: SliderResp } = useQuery({
    queryKey: ["SliderReports"],
    queryFn: () => getApi<sliderRes[]>(`/api/website/Reports/slider/5`),
  });

  const nextSlide = () => {
    const newSlide = SliderResp?.data.length ?? 0;

    setSlide(slide === newSlide - 1 ? 0 : slide + 1);
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
      <>
        {widthScreen.winWidth <= 980 ? (
          <>
            <div className="carousel_parant">
              <div className="carousel">
                {SliderResp?.data.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className={slide === idx ? "slide" : "slide slide-hidden"}
                    >
                      <img
                        src={item.img}
                        key={idx}
                        className={
                          slide === idx
                            ? "slide object-fill"
                            : "slide object-fill slide-hidden"
                        }
                      />
                      <div className="bg-[#979CA1]/[.70] md:min-h-[20vh] sm:min-h-[30vh]">
                        <div className="" key={idx}>
                          <h2
                            className={
                              dir === "ltr"
                                ? "md:text-end md:pt-3 md:text-3xl md:px-2 sm:text-end sm:pt-3 sm:text-xl sm:px-2"
                                : "md:text-end md:pt-3 md:text-3xl md:px-2 sm:text-start sm:pt-3 sm:text-xl sm:px-2"
                            }
                          >
                            {item.en_Title}
                          </h2>
                          <p
                            className={
                              dir === "ltr"
                                ? "md:text-end md:text-xl md:mt-5  md:px-2 sm:text-end sm:mt-3  sm:px-2"
                                : "md:text-end md:text-xl md:mt-5  md:px-2 sm:text-start sm:mt-3  sm:px-2"
                            }
                          >
                            {}
                            {dir === "ltr"
                              ? formattedDateEn(new Date(item.date_of_publish))
                              : formattedDate(new Date(item.date_of_publish))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <span className="indicators">
                  {SliderResp?.data.map((_, idx) => {
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
              {SliderResp?.data.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={slide === idx ? "slide" : "slide slide-hidden"}
                  >
                    <img
                      src={item.img}
                      key={idx}
                      className={
                        slide === idx
                          ? "slide object-fill"
                          : "slide object-fill slide-hidden"
                      }
                    />

                    <div
                      className={
                        dir === "ltr" ? "info-carousel-end" : "pub-carousel"
                      }
                    >
                      <div
                        className={
                          dir === "ltr"
                            ? "title-info-carousel-end-en"
                            : "title-pub-carousel"
                        }
                        key={idx}
                      >
                        <h2
                          className={
                            dir === "ltr" ? "publishesHero-en" : "publishesHero"
                          }
                        >
                          {item.en_Title}
                        </h2>
                        <p className="mt-4">
                          {}
                          {dir === "ltr"
                            ? formattedDateEn(new Date(item.date_of_publish))
                            : formattedDate(new Date(item.date_of_publish))}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <span className="indicators">
                {SliderResp?.data.map((_, idx) => {
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
    </>
  );
}
