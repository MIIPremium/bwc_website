import React, { useEffect, useState } from "react";
import { TbDeviceAnalytics } from "react-icons/tb";
import { PiHandshakeThin } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import partnership from "../../assets/img/ريادة الاعمال.jpg";
import reportDetails from "../../assets/img/report-details-image.png";
import { useMediaQuery } from "react-responsive";
import { Target } from "lucide-react";
export default function AboutUsHeader() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
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
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [widthScreen]);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletScreen = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 979px)",
  });
  const isMonitorScreen = useMediaQuery({ query: "(min-width: 980px)" });
  return (
    <>
      <div>
        {isMobileScreen && (
          <>
            {dir === "ltr" ? (
              <div className="w-full h-[100vh] grid grid-cols-1 gap-2 px-4">
                <div className="h-[70vh] w-full relative flex justify-center items-center ">
                  <div className="absolute sm:w-[25%] sm:h-[55%] bg-[#E4C189] -z-[10] sm:top-[30px]  sm:left-0"></div>
                  <div className="w-[90%] h-[80%] bg-white relative">
                    <img
                      src={reportDetails}
                      className="object-cover w-full h-[80%]"
                      alt=""
                    />
                  </div>
                  <div className="absolute flex justify-center  md:rounded-md items-center w-[55%] h-[35%] bg-[#fff] z-[10]  bottom-[80px] right-0">
                    <img
                      src={partnership}
                      className=" w-[92%] h-[88%] object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="h-full w-full">
                  <div>
                    <div className="flex items-start justify-end py-16">
                      <h1 className="text-3xl font-extrabold">
                        {t("homePage2")}
                      </h1>
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                    </div>
                    <div className="text-end">
                      <p className="  text-[#5B5B5B] leading-7">
                        Business World is a national limited liability company.
                        It was founded by Dr. Rabi Ben Ali al-Awabthani in the
                        city of Mukalla and Hadramawt in March 2021 with a
                        commercial record number (21/2831).
                      </p>
                      <p className="  mt-8 text-[#5B5B5B] leading-8">
                        It manages and operates investment projects and provides
                        economic studies, administrative, financial and
                        marketing consulting and IT solutions and provides its
                        services through a group of specialized experts and
                        consultants who work in the company and another group of
                        contracting experts and consultants.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-6">
                      <div className=" flex justify-start items-center translate-x-1">
                        <p className="text-lg">{t("our_mission")}</p>
                        <span className=" w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center mr-2">
                          <TbDeviceAnalytics
                            color="white"
                            size={60}
                            className="p-1"
                          />
                        </span>
                      </div>

                      <div className=" flex justify-start items-center translate-x-1">
                        <p className="text-lg">{t("our_goals")}</p>
                        <span className=" w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center mr-2">
                          <Target color="white" size={50} className="p-1" />
                        </span>
                      </div>
                      <div className=" flex justify-start items-center -translate-x-4">
                        <p className="text-lg">{t("our_message")}</p>
                        <span className=" w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center mr-2">
                          <PiHandshakeThin
                            color="white"
                            size={60}
                            className="p-1"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-[100vh] grid grid-cols-1 gap-2 px-4">
                <div className="h-[70vh] w-full relative flex justify-center items-center ">
                  <div className="absolute sm:w-[25%] sm:h-[55%] bg-[#E4C189] -z-[10] sm:top-[20px]  sm:right-0"></div>
                  <div className="w-[80%] h-[80%] bg-white relative">
                    <img
                      src={reportDetails}
                      className="object-cover w-full h-[80%]"
                      alt=""
                    />
                  </div>
                  <div className="absolute flex justify-center  md:rounded-md items-center w-[55%] h-[35%] bg-[#fff] z-[10]  bottom-[80px] left-0">
                    <img
                      src={partnership}
                      className=" w-[92%] h-[88%] object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="h-full w-full">
                  <div>
                    <div className="flex items-start justify-start py-16">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h1 className="text-3xl font-extrabold">
                        {t("homePage2")}
                      </h1>
                    </div>
                    <div className="text-start">
                      <p className="text-justify  text-[#5B5B5B] leading-7">
                        شركه عالم الاعمال هي شركه وطنية ذات مسؤولية محدودة.أسسها
                        الدكتور ربيع بن علي العوبثاني في مدينة المكلا و حضرموت
                        في مارس 2021م تحمل سجل تجاري رقم(21/2831).
                      </p>
                      <p className="text-justify  mt-8 text-[#5B5B5B] leading-8">
                        تعمل على إدارة وتشغيل المشاريع الاستثمارية وتقديم
                        الدراسات الاقتصادية والاستشارات الادارية والمالية
                        والتسويقية وحلول تكنولوجيا المعلومات وتقدم خدماتها من
                        خلال مجموعة من الخبراء والاستشاريين المتخصصين الذين
                        يعملون في الشركة ومجموعة اخرى من الخبراء والاستشاريين
                        المتعاقدين.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-6">
                      <div className=" flex justify-start items-center ">
                        <span className=" w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center ml-2">
                          <TbDeviceAnalytics
                            color="white"
                            size={60}
                            className="p-1"
                          />
                        </span>
                        <p className="text-lg">{t("our_mission")}</p>
                      </div>

                      <div className=" flex justify-start items-center translate-x-1">
                        <span className=" w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center ml-2">
                          <Target color="white" size={50} className="p-1" />
                        </span>
                        <p className="text-lg">{t("our_goals")}</p>
                      </div>
                      <div className=" flex justify-start items-center ">
                        <span className=" w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center ml-2">
                          <PiHandshakeThin
                            color="white"
                            size={60}
                            className="p-1"
                          />
                        </span>
                        <p className="text-lg">{t("our_message")}</p>
                      </div>
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
              <div className="w-full h-[100vh] grid grid-cols-1 gap-2 px-4">
                <div className="h-[70vh] w-full relative flex justify-center items-center ">
                  <div className="absolute md:w-[25%] md:h-[55%] bg-[#E4C189] -z-[10] md:top-[25px]  md:left-[40px]"></div>
                  <div className="w-[80%] h-[80%] bg-white relative">
                    <img
                      src={reportDetails}
                      className="object-cover w-full h-[80%]"
                      alt=""
                    />
                  </div>
                  <div className="absolute flex justify-center  md:rounded-md items-center w-[55%] h-[35%] bg-[#fff] z-[10]  bottom-[80px] right-0">
                    <img
                      src={partnership}
                      className=" w-[92%] h-[88%] round"
                      alt=""
                    />
                  </div>
                </div>
                <div className="h-full w-full">
                  <div className=" pl-4 ">
                    <div className="flex items-start justify-end py-16">
                      <h1 className="text-3xl font-extrabold">
                        {t("homePage2")}
                      </h1>
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                    </div>
                    <div>
                      <p className="text-end  text-[#5B5B5B] leading-7">
                        Business World is a national limited liability company.
                        It was founded by Dr. Rabi Ben Ali al-Awabthani in the
                        city of Mukalla and Hadramawt in March 2021 with a
                        commercial record number (21/2831).
                      </p>
                      <p className="text-end  mt-8 text-[#5B5B5B] leading-8">
                        It manages and operates investment projects and provides
                        economic studies, administrative, financial and
                        marketing consulting and IT solutions and provides its
                        services through a group of specialized experts and
                        consultants who work in the company and another group of
                        contracting experts and consultants.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 mt-6">
                      <div className="w-[95%] h-[100px] flex justify-center items-center">
                        <p className="text-3xl">{t("our_mission")}</p>
                        <span className=" w-[40%] h-[90%] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center mr-4">
                          <TbDeviceAnalytics
                            color="white"
                            size={80}
                            className="p-1"
                          />
                        </span>
                      </div>
                      <div className="w-[95%] h-[100px] flex justify-center items-center">
                        <p className="text-3xl">{t("our_goals")}</p>
                        <span className=" w-[40%] h-[90%] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center mr-4">
                          <Target size={80} color="white" />
                        </span>
                      </div>
                      <div className="w-[95%] h-[100px] flex justify-center items-center">
                        <p className="text-3xl">{t("our_message")}</p>
                        <span className=" w-[40%] h-[90%] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center mr-4">
                          <PiHandshakeThin
                            color="white"
                            size={80}
                            className="p-1"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-[100vh] grid grid-cols-1 gap-2 px-4">
                <div className="h-[70vh] w-full relative flex justify-center items-center ">
                  <div className="absolute md:w-[25%] md:h-[55%] bg-[#E4C189] -z-[10] md:top-[25px]  md:right-[40px]"></div>
                  <div className="w-[80%] h-[80%] bg-white relative">
                    <img
                      src={reportDetails}
                      className="object-cover w-[100%] h-[80%]"
                      alt=""
                    />
                  </div>
                  <div className="absolute flex justify-center  md:rounded-md items-center w-[55%] h-[35%] bg-[#fff] z-[10]  bottom-[80px] left-0">
                    <img
                      src={partnership}
                      className=" w-[92%] h-[88%] round"
                      alt=""
                    />
                  </div>
                </div>
                <div className="h-full w-full">
                  <div className=" pl-4 ">
                    <div className="flex items-start justify-start py-16">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h1 className="text-3xl font-extrabold">
                        {t("homePage2")}
                      </h1>
                    </div>
                    <div>
                      <p className="text-start  text-[#5B5B5B] leading-7">
                        شركه عالم الاعمال هي شركه وطنية ذات مسؤولية محدودة.أسسها
                        الدكتور ربيع بن علي العوبثاني في مدينة المكلا و حضرموت
                        في مارس 2021م تحمل سجل تجاري رقم(21/2831).
                      </p>
                      <p className="text-start  mt-8 text-[#5B5B5B] leading-8">
                        تعمل على إدارة وتشغيل المشاريع الاستثمارية وتقديم
                        الدراسات الاقتصادية والاستشارات الادارية والمالية
                        والتسويقية وحلول تكنولوجيا المعلومات وتقدم خدماتها من
                        خلال مجموعة من الخبراء والاستشاريين المتخصصين الذين
                        يعملون في الشركة ومجموعة اخرى من الخبراء والاستشاريين
                        المتعاقدين.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 mt-6">
                      <div className="w-[95%] h-[100px] flex justify-center items-center">
                        <span className=" w-[40%] h-[90%] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center ml-4">
                          <TbDeviceAnalytics
                            color="white"
                            size={80}
                            className="p-1"
                          />
                        </span>
                        <p className="text-3xl">{t("our_mission")}</p>
                      </div>
                      <div className="w-[95%] h-[100px] flex justify-center items-center">
                        <span className=" w-[40%] h-[90%] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center ml-4">
                          <Target size={80} color="white" />
                        </span>
                        <p className="text-3xl">{t("our_goals")}</p>
                      </div>
                      <div className="w-[95%] h-[100px] flex justify-center items-center">
                        <span className=" w-[40%] h-[90%] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center ml-4">
                          <PiHandshakeThin
                            color="white"
                            size={80}
                            className="p-1"
                          />
                        </span>
                        <p className="text-3xl">{t("our_message")}</p>
                      </div>
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
              <>
                <div className="w-full h-[90vh] grid grid-cols-2 gap-2 px-2">
                  <div className="h-full w-full">
                    <div className=" pl-4 ">
                      <div className="flex items-start justify-end py-16">
                        <h1 className="text-3xl font-extrabold">
                          {t("homePage2")}
                        </h1>
                        <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                      </div>
                      <div>
                        <p className="text-end  text-[#5B5B5B] leading-7">
                          Business World is a national limited liability
                          company. It was founded by Dr. Rabi Ben Ali
                          al-Awabthani in the city of Mukalla and Hadramawt in
                          March 2021 with a commercial record number (21/2831).
                        </p>
                        <p className="text-end  mt-8 text-[#5B5B5B] leading-8">
                          It manages and operates investment projects and
                          provides economic studies, administrative, financial
                          and marketing consulting and IT solutions and provides
                          its services through a group of specialized experts
                          and consultants who work in the company and another
                          group of contracting experts and consultants.
                        </p>
                      </div>
                      <div className="grid grid-cols-3 mt-6">
                        <div className="w-[95%] h-[100px] flex justify-center items-center">
                          <p className="text-3xl">{t("our_message")}</p>
                          <span className=" w-[100px] h-[100px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center mr-4">
                            <PiHandshakeThin
                              color="white"
                              size={80}
                              className="p-1"
                            />
                          </span>
                        </div>

                        <div className="w-[95%] h-[100px] flex justify-center items-center">
                          <p className="text-3xl">{t("our_goals")}</p>
                          <span className=" w-[100px] h-[100px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center mr-4">
                            <Target size={80} color="white" />
                          </span>
                        </div>
                        <div className="w-[95%] h-[100px] flex justify-center items-center">
                          <p className="text-3xl">{t("our_mission")}</p>
                          <span className=" w-[100px] h-[100px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center mr-4">
                            <TbDeviceAnalytics
                              color="white"
                              size={80}
                              className="p-1"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="h-full w-full relative">
                    <div className="absolute lg:w-[25%] lg:h-[45%] bg-[#E4C189] -z-[10] lg:top-[-15px]  lg:left-[4px]"></div>
                    <div className=" px-4 relative flex justify-end ">
                      <img
                        src={reportDetails}
                        className=" object-cover  z-[1] w-[70%] h-[80%]"
                        alt=""
                      />
                    </div>
                    <div className="absolute flex justify-center  lg:rounded-md items-center w-[45%] h-[35%] bg-[#fff] z-[10]  bottom-[300px] right-24">
                      <img
                        src={partnership}
                        className=" w-[92%] h-[88%] round"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-[90vh] grid grid-cols-2 gap-2 px-2">
                  <div className="h-full w-full relative">
                    <div className="absolute lg:w-[25%] lg:h-[45%] bg-[#E4C189] -z-[10] lg:top-[-15px]  lg:right-[4px]"></div>
                    <div className=" px-4 relative">
                      <img
                        src={reportDetails}
                        className=" object-cover  z-[1] w-[70%] h-[80%]"
                        alt=""
                      />
                    </div>
                    <div className="absolute flex justify-center lg:rounded-md items-center w-[45%] h-[35%] bg-[#fff] z-[10]  bottom-[300px] left-24">
                      <img
                        src={partnership}
                        className=" w-[92%] h-[85%] round"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="h-full w-full">
                    <div className=" pl-4 ">
                      <div className="flex items-start justify-start py-16">
                        <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                        <h1 className="text-3xl font-extrabold">
                          {t("homePage2")}
                        </h1>
                      </div>
                      <div>
                        <p className="text-start  text-[#5B5B5B] leading-7">
                          شركه عالم الاعمال هي شركه وطنية ذات مسؤولية
                          محدودة.أسسها الدكتور ربيع بن علي العوبثاني في مدينة
                          المكلا و حضرموت في مارس 2021م.
                        </p>
                        <p className="text-start  mt-8 text-[#5B5B5B] leading-8">
                          تعمل على إدارة وتشغيل المشاريع الاستثمارية وتقديم
                          الدراسات الاقتصادية والاستشارات الادارية والمالية
                          والتسويقية وحلول تكنولوجيا المعلومات وتقدم خدماتها من
                          خلال مجموعة من الخبراء والاستشاريين المتخصصين الذين
                          يعملون في الشركة ومجموعة اخرى من الخبراء والاستشاريين
                          المتعاقدين.
                        </p>
                      </div>
                      <div className="grid grid-cols-3 mt-6">
                        <div className="w-[95%] h-[100px] flex justify-center items-center">
                          <span className=" w-[100px] h-[100px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center ml-4">
                            <TbDeviceAnalytics
                              color="white"
                              size={80}
                              className="p-1"
                            />
                          </span>
                          <p className="text-3xl">{t("our_mission")}</p>
                        </div>
                        <div className="w-[95%] h-[100px] flex justify-center items-center">
                          <span className=" w-[100px] h-[100px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center ml-4">
                            <Target size={80} color="white" />
                          </span>
                          <p className="text-3xl">{t("our_goals")}</p>
                        </div>
                        <div className="w-[95%] h-[100px] flex justify-center items-center">
                          <span className=" w-[100px] h-[100px] rounded-full bg-gradient-to-r from-[#997740] to-[#CCA972] flex justify-center items-center ml-4">
                            <PiHandshakeThin
                              color="white"
                              size={80}
                              className="p-1"
                            />
                          </span>
                          <p className="text-3xl">{t("our_message")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
