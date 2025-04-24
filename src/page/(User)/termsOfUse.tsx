import React, { useEffect, useState } from "react";
import Navber from "../../components/navbar";
import Footer from "../../components/footer";
import { useTranslation } from "react-i18next";

export default function TermsOfUse() {
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
  return (
    <div>
      <div className="xlg:max-w-[1200px] justify-self-center">
        <div className="w-full lg:h-[10vh] sm:h-[11vh]">
          <Navber />
        </div>
        <div
          dir={dir === "ltr" ? "rtl" : "ltr"}
          className="w-full max-h-[100vh]"
        >
          {/*  */}
          {widthScreen.winWidth <= 980 ? (
            <>
              <div className="flex justify-end p-5">
                <h1 className="text-3xl">{t("termOfUse")}</h1>
                <div
                  className={
                    dir === "ltr"
                      ? "w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "
                      : "w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "
                  }
                ></div>
              </div>
              {/*  */}
              <div
                className={
                  dir === "ltr"
                    ? " h-[100%] float-end w-[100%] px-5 mb-10 text-justify"
                    : "h-[100%] float-right w-[100%] px-5 mb-10 text-justify"
                }
              >
                <div>
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("tariffs")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">• {t("tariffs1")}</li>
                    <li className="px-5 mt-2 text-sm">• {t("tariffs2")} </li>
                  </ul>
                </div>

                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("use_the_site")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">•{t("use_the_site1")}</li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("use_the_site2")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("use_the_site3")}{" "}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("use_the_site4")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("use_the_site5")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("use_the_site6")}
                    </li>
                  </ul>
                </div>
                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("content_of_the_site")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">
                      • {t("content_of_the_site1")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("content_of_the_site2")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("content_of_the_site3")}
                    </li>
                  </ul>
                </div>
                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("Links_to_other_sites")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">
                      • {t("Links_to_other_sites1")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("Links_to_other_sites2")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("Links_to_other_sites3")}
                    </li>
                  </ul>
                </div>
                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("concessions")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">• {t("concessions1")}</li>
                  </ul>
                </div>
                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("adjustments")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">• {t("adjustments1")}</li>
                    <li className="px-5 mt-2 text-sm">• {t("adjustments2")}</li>
                    <li className="px-5 mt-2 text-sm">• {t("adjustments3")}</li>
                  </ul>
                </div>
                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("general_provisions")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">
                      • {t("general_provisions1")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("general_provisions2")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("general_provisions3")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("general_provisions4")}.
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("general_provisions5")}
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-end p-5">
                <h1 className="text-3xl">{t("termOfUse")}</h1>
                <div
                  className={
                    dir === "ltr"
                      ? "w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "
                      : "w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "
                  }
                ></div>
              </div>
              {/*  */}
              <div
                className={
                  dir === "ltr"
                    ? " h-[100%] float-end w-[70%] px-5 mb-10"
                    : "h-[100%] float-right w-[70%] px-5 mb-10"
                }
              >
                <div>
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("tariffs")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">• {t("tariffs1")}</li>
                    <li className="px-5 mt-2 text-sm">• {t("tariffs2")} </li>
                  </ul>
                </div>

                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("use_the_site")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">•{t("use_the_site1")}</li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("use_the_site2")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("use_the_site3")}{" "}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("use_the_site4")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("use_the_site5")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("use_the_site6")}
                    </li>
                  </ul>
                </div>
                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("content_of_the_site")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">
                      • {t("content_of_the_site1")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("content_of_the_site2")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("content_of_the_site3")}
                    </li>
                  </ul>
                </div>
                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("Links_to_other_sites")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">
                      • {t("Links_to_other_sites1")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("Links_to_other_sites2")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("Links_to_other_sites3")}
                    </li>
                  </ul>
                </div>
                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("concessions")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">• {t("concessions1")}</li>
                  </ul>
                </div>
                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("adjustments")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">• {t("adjustments1")}</li>
                    <li className="px-5 mt-2 text-sm">• {t("adjustments2")}</li>
                    <li className="px-5 mt-2 text-sm">• {t("adjustments3")}</li>
                  </ul>
                </div>
                {/*  */}
                <div className="mt-5">
                  <h1
                    dir={dir === "ltr" ? "ltr" : "rtl"}
                    className={
                      dir === "ltr"
                        ? "text-start text-2xl"
                        : "text-start text-2xl"
                    }
                  >
                    {t("general_provisions")}
                  </h1>
                  <ul dir={dir === "ltr" ? "ltr" : "rtl"} className="mt-3">
                    <li className="px-5 mt-2 text-sm">
                      • {t("general_provisions1")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("general_provisions2")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("general_provisions3")}
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("general_provisions4")}.
                    </li>
                    <li className="px-5 mt-2 text-sm">
                      • {t("general_provisions5")}
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
        {/*  */}
      </div>
      <footer className="min-h-[65vh] p-2 w-full overflow-hidden relative bg-black mt-10">
        <Footer />
      </footer>
    </div>
  );
}
