import React, { useState, useEffect } from "react";
import adminLogo from "../../assets/img/admin_admin.png";
import Avter from "../../assets/img/avtar.png";
import { useTranslation } from "react-i18next";
import LanguageWorld from "../../assets/icons/language-world";
import Cookies from "js-cookie";
import ArrowDowm from "../../assets/icons/arrow-dowm";
import { useNavigate } from "react-router-dom";
import nav from "react-router-dom";
export default function NavBar() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<string>("");
  //
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  //
  const [isdropDownOpen, setIsdropDownOpen] = useState(false);
  const [isLogoutDropDown, setLogoutDropDown] = useState(false);
  //
  const isLoggedIn = Cookies.get("accessToken");
  const onLogOut = () => {
    if (isLoggedIn) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  //
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
  return (
    <>
      {dir === "ltr" ? (
        <>
          <div className="w-[20%] h-full flex ">
            <div className="w-[75%] text-white flex justify-center items-center ">
              <div className=" w-full h-full flex justify-center items-center">
                <div
                  className="w-[20%] mr-1 flex justify-end cursor-pointer relative "
                  onClick={() => setLogoutDropDown((prvIndex) => !prvIndex)}
                >
                  <ArrowDowm />
                  {isLogoutDropDown && (
                    <div className="flex flex-col logout">
                      <ul className="flex flex-col gap-4" onClick={onLogOut}>
                        <li>Logout</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="w-[60%] text-center ml-1 m-auto text-sm text-black ">
                  Mahfouz Ben Sabah
                </div>
                <div className="w-[20%] h-[50%] m-auto ">
                  <img
                    src={Avter}
                    alt=""
                    className="rounded-full float-start h-[100%] w-[80%]"
                  />
                </div>
              </div>
            </div>
            <div className="w-[25%]  flex justify-center items-center relative">
              <div
                className="cursor-pointer ml-2 text-xl font-black"
                onClick={onChangeLanguage}
              >
                EN
              </div>

              <div className="cursor-pointer" onClick={onChangeLanguage}>
                <LanguageWorld color="black" />
              </div>
            </div>
          </div>
          <div className="w-[63.9%]  h-full "></div>

          <div className="w-[17.2%] h-full flex justify-between items-center ">
            <div className="w-[1px] h-[70%] bg-[#D4D4D4] float-end"></div>
            <div
              className="w-[80%] mr-7 cursor-pointer "
              
            >
              <img src={adminLogo} alt="" className="w-[60%] h-[80%]" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-[17.2%] h-full flex justify-between items-center">
            <div className="w-[80%] mr-7">
              <img src={adminLogo} alt="" className="w-[60%] h-[80%]" />
            </div>
            <div className="w-[1px] h-[70%] bg-[#D4D4D4] float-start"></div>
          </div>
          <div className="w-[63.9%]  h-full"></div>
          <div className="w-[20%] h-full flex">
            <div className="w-[25%]  flex justify-center items-center relative">
              <div
                className="cursor-pointer ml-2 text-xl font-black"
                onClick={onChangeLanguage}
              >
                عربي
              </div>

              <div className="cursor-pointer" onClick={onChangeLanguage}>
                <LanguageWorld color="black" />
              </div>
            </div>
            <div className="w-[75%] text-white flex justify-center items-center ">
              <div className=" w-full h-full flex justify-center items-center">
                <div className="w-[20%] h-[50%] m-auto ">
                  <img
                    src={Avter}
                    alt=""
                    className="rounded-full float-end h-[100%] w-[80%]"
                  />
                </div>
                <div className="w-[60%] text-center ml-1 m-auto text-sm text-black ">
                  محفوظ بن سباح
                </div>
                <div
                  className="w-[20%] mr-1 flex justify-start cursor-pointer relative "
                  onClick={() => setLogoutDropDown((prvIndex) => !prvIndex)}
                >
                  <ArrowDowm />
                  {isLogoutDropDown && (
                    <div className="flex flex-col logout-ar">
                      <ul className="flex flex-col gap-4" onClick={onLogOut}>
                        <li>تسجيل الخروج</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
