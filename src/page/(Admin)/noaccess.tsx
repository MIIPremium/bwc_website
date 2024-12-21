import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function NoAccess() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <div className="h-screen w-[50%] m-auto flex justify-center items-center">
      <div className=" text-center m-auto">
        <h1 className="text-3xl">
          {dir === "ltr" ? "Access Denied" : "لا تمتلك الصلاحيه للدخول"}
        </h1>
        <button
          type="button"
          className=" mt-10 w-full block shadow-[0_05px_20px_5px_rgba(204,169,114,0.3)] bg-black hover:bg-[#cca972] focus:bg-gray-100 text font-semibold rounded-lg px-4 py-3 outline-2 outline-gray-500"
        >
          <div className="flex items-center  justify-center">
            <button className=" text-white ">
              <Link to={"/login"}>
                {dir === "ltr"
                  ? "go back to login page "
                  : "عد لصفحة تسجيل الدخول"}
              </Link>
            </button>
          </div>
        </button>
      </div>
    </div>
  );
}
