import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import logo2 from "../assets/img/no-name.png";
import logo3 from "../assets/img/logo3.png";
import job1 from "../assets/img/jobs-2.png";
import LanguageWorld from "../assets/icons/language-world";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Link, NavLink } from "react-router-dom";
import DropDownLang from "./dropDownLang";
import { CgMenuLeft } from "react-icons/cg";
import Button from "../components/button";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { axiosInstance } from "src/lib/http";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [available, setAvailable] = useState(false);
  const [fix, setFix] = useState<boolean>();
  const [language, setLanguage] = useState<string>("");
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
      setFix(true);
    } else {
      setFix(false);
    }
  });
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
  //
  const fetchJob = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/website/Home/AvaliableJobs"
      );

      // Assuming the API returns a boolean value directly (true or false)
      return response.data;
    } catch (error) {
      console.error("Error fetching available jobs:", error);

      // Return a default value in case of error
      return false;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchJob();
      setAvailable(data);
    };

    getData();
  }, []);
  const onChangeLanguage = () => {
    language === "ar" ? setLanguage("en") : setLanguage("ar");
  };

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  //
  const [isdropDownOpen, setIsdropDownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  useEffect(() => {
    changeLanguage(language);
    document.body.dir = i18n.dir();

    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [widthScreen, i18n, i18n.language, language]);

  const dir = i18n.dir();
  let Links = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "BLOG'S", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50 bg-white">
      <div
        className={
          dir === "ltr"
            ? "md:flex items-center justify-between flex-row-reverse py-2 md:px-10 px-7"
            : "md:flex items-center justify-between py-2 md:px-10 px-7"
        }
      >
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <a href="/" className="site-title">
            <img
              src={fix && dir === "rtl" ? logo3 : fix ? logo2 : logo}
              alt=""
            />
          </a>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className={
            dir === "ltr"
              ? "text-3xl absolute left-8 top-6 cursor-pointer md:hidden"
              : "text-3xl absolute left-8 top-6 cursor-pointer md:hidden"
          }
        >
          {open ? (
            <IoMdCloseCircleOutline size={40} />
          ) : (
            <CgMenuLeft size={40} />
          )}
        </div>

        {widthScreen.winWidth <= 980 ? (
          <ul
            className={
              dir === "ltr"
                ? `md:flex md:items-center md:pb-0 pb-0 absolute md:static bg-white md:z-auto z-[999px] right-0 w-full md:w-auto md:pl-0 pr-9 transition-all duration-500 ease-in ${
                    open ? "top-20 " : "top-[-590px]"
                  }`
                : `md:flex md:items-center md:pb-0 pb-0 absolute md:static bg-white md:z-auto z-[999px] left-0 w-full md:w-auto md:pl-0 pr-9 transition-all duration-500 ease-in ${
                    open ? "top-20 " : "top-[-590px]"
                  }`
            }
          >
            <li
              className={
                dir === "ltr"
                  ? "md:ml-8 sm:text-end text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md"
                  : "md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md"
              }
            >
              <Link
                to={"/departments"}
                className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer "
              >
                {t("depertment")}
              </Link>
            </li>

            <li
              className={
                dir === "ltr"
                  ? "md:ml-8 sm:text-end text-xl md:my-0 my-7 md:bg-[#fff] md:w-[150%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md"
                  : "md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[150%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md"
              }
            >
              <Link
                to={"/about-us"}
                className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer"
              >
                {t("About_us")}
              </Link>
            </li>

            <li
              className={
                dir === "ltr"
                  ? "md:ml-8 sm:text-end text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md"
                  : "md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md"
              }
            >
              <Link
                to={"/all-publishes"}
                className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer"
              >
                {t("publishes")}
              </Link>
            </li>
            <li
              className={
                dir === "ltr"
                  ? "md:ml-8 sm:text-end text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md"
                  : "md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md"
              }
            >
              <NavLink
                to={"/all-Reports"}
                className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer"
              >
                {t("reports")}
              </NavLink>
            </li>
            <li
              className={
                dir === "ltr"
                  ? "md:ml-8 sm:text-end text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md"
                  : "md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md"
              }
            >
              <NavLink to={"/archives"} className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer">
                {t("archive")}
              </NavLink>
            </li>
            {dir === "ltr" ? (
              <>
                <li className="lg:hidden md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%]  sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md">
                  <Link
                    to={"/join-us"}
                    className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer flex justify-end"
                  >
                    {available && (
                      <div className=" bg-red-500 w-3 h-3 rounded-full "></div>
                    )}
                    <div className="flex">
                      {t("jobs")} <img src={job1} className="sm:mr-2" alt="" />
                    </div>
                  </Link>
                </li>
                <li
                  className=" lg:hidden md:ml-8 sm:flex sm:justify-end sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%]  sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md "
                  onClick={onChangeLanguage}
                >
                  <a className="sm:flex text-gray-800 hover:text-gray-400 duration-500 cursor-pointer">
                    <div className="cursor-pointer">
                      {dir === "ltr" ? "EN" : "عربي"}
                    </div>
                    <div
                      className={
                        dir === "ltr"
                          ? "cursor-pointer mr-3"
                          : "cursor-pointer ml-3"
                      }
                    >
                      <LanguageWorld color="black" />
                    </div>
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="lg:hidden md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%]  sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md">
                  <Link
                    to={"/join-us"}
                    className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer flex"
                  >
                    <img src={job1} className={"sm:ml-2"} alt="" />
                    {t("jobs")}{" "}
                    {available && (
                      <div className=" bg-red-500 w-3 h-3 rounded-full "></div>
                    )}
                  </Link>
                </li>

                <li
                  className=" lg:hidden md:ml-8 sm:flex sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%]  sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md "
                  onClick={onChangeLanguage}
                >
                  <a className="sm:flex text-gray-800 hover:text-gray-400 duration-500 cursor-pointer">
                    <div className="cursor-pointer ml-3">
                      <LanguageWorld color="black" />
                    </div>
                    <div className="cursor-pointer">عربي</div>
                  </a>
                </li>
              </>
            )}
          </ul>
        ) : (
          <ul
            className={`md:flex md:items-center md:pb-0 pb-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-590px]"
            }`}
          >
            <li className="md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md">
              <Link
                to={"/departments"}
                className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer"
              >
                {t("depertment")}
              </Link>
            </li>

            <li className="md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[150%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md">
              <Link
                to={"/about-us"}
                className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer"
              >
                {t("About_us")}
              </Link>
            </li>

            <li className="md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md">
              <Link
                to={"/all-publishes"}
                className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer"
              >
                {t("publishes")}
              </Link>
            </li>
            <li className="md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md">
              <NavLink
                to={"/all-Reports"}
                className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer"
              >
                {t("reports")}
              </NavLink>
            </li>
            <li className="md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md">
              <NavLink to={"/archives"} className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer">
                {t("archive")}
              </NavLink>
            </li>
            <li className="lg:hidden md:ml-8 sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md">
              <Link
                to={"/join-us"}
                className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer"
              >
                {t("jobs")}{" "}
                {available && (
                  <div className=" bg-red-500 w-3 h-3 rounded-full "></div>
                )}
              </Link>
            </li>
            <li
              className=" lg:hidden md:ml-8 sm:flex sm:text-start text-xl md:my-0 my-7 md:bg-[#fff] md:w-[100%] sm:bg-[#e9eaed] sm:w-[95%] sm:px-2 sm:py-3 sm:rounded-md "
              onClick={onChangeLanguage}
            >
              <a className="sm:flex text-gray-800 hover:text-gray-400 duration-500 cursor-pointer">
                <div className="cursor-pointer mr-3">
                  <LanguageWorld color="black" />
                </div>
                <div className="cursor-pointer">
                  {dir === "ltr" ? "EN" : "عربي"}
                </div>
              </a>
            </li>
          </ul>
        )}

        <div className="flex items-center lg:flex sm:hidden">
          <div className="flex justify-center mx-2 relative">
            <Link
              to={"/join-us"}
              className="outline outline-offset-1 outline-1 outline-[#ccc]/60 rounded-full w-[7.1rem] h-[2.8rem] flex justify-center items-center relative"
            >
              <button className="inline-flex w-[7rem] h-[2.8rem] outline outline-1 outline-[#CCA972]/80 bg-black text-white items-center justify-center whitespace-nowrap rounded-full text-md font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {t("jobs")}
              </button>

              {/* Conditionally render the badge with an animation when `available` is true */}
              {available && (
                <div className="absolute top-[-3px] left-[25px] bg-red-500 w-3 h-3 rounded-full animate-bounce"></div>
              )}
            </Link>
          </div>

          <div
            className={
              dir === "ltr" ? "language-icon lg:ml-4" : "language-icon"
            }
          >
            <div
              className="cursor-pointer"
              onClick={() => setIsdropDownOpen((prevValue) => !prevValue)}
            >
              <LanguageWorld color="black" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setIsdropDownOpen((prevValue) => !prevValue)}
            >
              {dir === "ltr" ? "EN" : "عربي"}
              {isdropDownOpen && <DropDownLang />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
