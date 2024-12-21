import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Refernce from "../../assets/icons/refernce";
import Reports from "../../assets/icons/reports";
import PublichesIcon from "../../assets/icons/publiches-icon";
import StudiesIcon from "../../assets/icons/studies-icon";
import NewsIcon from "../../assets/img/newspaper 1.png";
import NewsIcon2 from "../../assets/img/newspaper 2.png";
import Teams from "../../assets/img/team(2) 1.png";
import Busniess from "../../assets/img/businessman(1) 1.png";
import Service from "../../assets/img/service(1) 1.png";
import Orgnaztion from "../../assets/icons/orgnaztion";
import Massage from "../../assets/icons/massage";
import OurFiles from "../../assets/icons/files";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
export default function SideNab() {
  const [publishes, setPublishes] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };
  return (
    <div className="w-full h-full text-end overflow-y-auto">
      {dir === "ltr" ? (
        <>
          <ul
            className={`w-full  px-3 duration-500 ease-in-out ${"min-h-[27%]"} `}
          >
            <div className="float-end w-[90%] h-[1px] bg-[#E5E5E5] mb-3"></div>
            <p className="text-[12px] text-end text-[#9E9E9E]">Publications</p>
            <NavLink to="/admin-dashboard/references">
              <li
                className={`mt-1 p-2 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "references"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("references")}
              >
                References
                <i className="mr-2">
                  <Refernce />
                </i>
              </li>
            </NavLink>

            <NavLink to={"/admin-dashboard/reports"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "reports"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("reports")}
              >
                Reports
                <i className="mr-2">
                  <Reports />
                </i>
              </li>
            </NavLink>

            <h1
              className="hover:bg-[rgb(213,174,120)]/[.20] rounded-md p-2  hover:text-[#D5AE78] cursor-pointer flex justify-between items-center"
              onClick={() => setPublishes((open) => !open)}
            >
              <div>
                {publishes === false ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
              <div className="flex">
                Publications
                <i className="mr-2">
                  <PublichesIcon />
                </i>
              </div>
            </h1>
            {publishes && (
              <ul
                className={`w-full flex flex-col mt-1 transition-all duration-500 ease-in-out ${
                  publishes ? "max-height-[200px]" : "max-height-0"
                }`}
              >
                <NavLink to={"/admin-dashboard/publications"}>
                  <li
                    className={`px-5 mt-1 p-2 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                      selectedItem === "publications"
                        ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                        : ""
                    }`}
                    onClick={() => handleSelect("publications")}
                  >
                    Publications
                    <i className="mr-2">
                      <img src={NewsIcon} alt="" />
                    </i>
                  </li>
                </NavLink>
                <NavLink to={"/admin-dashboard/news"}>
                  <li
                    className={`px-5 mt-1 p-2 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                      selectedItem === "news"
                        ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                        : ""
                    }`}
                    onClick={() => handleSelect("news")}
                  >
                    News
                    <i className="mr-2">
                      <img src={NewsIcon2} alt="" />
                    </i>
                  </li>
                </NavLink>
                <NavLink to={"/admin-dashboard/analysis"}>
                  <li
                    className={`px-5 mt-1 p-2 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                      selectedItem === "Analysis"
                        ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                        : ""
                    }`}
                    onClick={() => handleSelect("Analysis")}
                  >
                    Analysis
                    <i className="mr-2">
                      <StudiesIcon />
                    </i>
                  </li>
                </NavLink>
              </ul>
            )}
          </ul>

          <ul className="w-full min-h-[25%]  mb-5 px-3">
            <div className="float-end w-[90%] h-[1px] bg-[#E5E5E5] mb-3"></div>
            <p className="text-[12px] text-end text-[#9E9E9E]">
              Organizations and Employees
            </p>
            <NavLink to={"/admin-dashboard/taskforce"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Task-Force"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Task-Force")}
              >
                Task Force
                <i className="mr-2">
                  <img src={Teams} alt="" />
                </i>
              </li>
            </NavLink>
            <NavLink to={"/admin-dashboard/organization"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Institutions"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Institutions")}
              >
                Institutions We Manage
                <i className="mr-2">
                  <Orgnaztion />
                </i>
              </li>
            </NavLink>
            {/* <li
              className={`mt-1 py-2 px-1 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                selectedItem === "Partners"
                  ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                  : ""
              }`}
              onClick={() => handleSelect("Partners")}
            >
              Our Partners
              <i className="mr-2">
                <Massage />
              </i>
            </li> */}
            <NavLink to={"/admin-dashboard/writer"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Writers"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Writers")}
              >
                Writers
                <i className="mr-2">
                  <Massage />
                </i>
              </li>
            </NavLink>
          </ul>

          <ul className="w-full min-h-[30%] px-3">
            <div className="float-end w-[90%] h-[1px] bg-[#E5E5E5] mb-3"></div>
            <p className="text-[12px] text-end text-[#9E9E9E]">Features</p>
            <NavLink to={"/admin-dashboard/jobs"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Job"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Job")}
              >
                Job
                <i className="mr-2">
                  <img src={Busniess} alt="" />
                </i>
              </li>
            </NavLink>
            <NavLink to={"/admin-dashboard/services"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Services"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Services")}
              >
                Our Services
                <i className="mr-2">
                  <img src={Service} alt="" />
                </i>
              </li>
            </NavLink>
            <NavLink to={"/admin-dashboard/profile"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-end items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Portfolio"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Portfolio")}
              >
                Portfolio
                <i className="mr-2">
                  <OurFiles />
                </i>
              </li>
            </NavLink>
          </ul>
        </>
      ) : (
        <>
          <ul
            className={`w-full  px-3 duration-500 ease-in-out ${"min-h-[27%]"} `}
          >
            <div className="float-start w-[90%] h-[1px] bg-[#E5E5E5] mb-3"></div>
            <p className="text-[12px] text-right text-[#9E9E9E]">المنشورات</p>
            <NavLink to="/admin-dashboard/references">
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "references"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("references")}
              >
                <i className="ml-2">
                  <Refernce />
                </i>
                المراجع
              </li>
            </NavLink>
            <NavLink to={"/admin-dashboard/reports"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "reports"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("reports")}
              >
                <i className="ml-2">
                  <Reports />
                </i>
                التقارير
              </li>
            </NavLink>
            <h1
              className="hover:bg-[rgb(213,174,120)]/[.20] rounded-md p-2  hover:text-[#D5AE78] cursor-pointer flex justify-between items-center"
              onClick={() => setPublishes((open) => !open)}
            >
              <div className="flex">
                <i className="ml-2">
                  <PublichesIcon />
                </i>
                المنشورات
              </div>
              <div>
                {publishes === false ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </h1>
            {publishes && (
              <ul
                className={`w-full flex flex-col mt-1 transition-all duration-500 ease-in-out ${
                  publishes ? "max-height-[200px]" : "max-height-0"
                }`}
              >
                <NavLink to={"/admin-dashboard/publications"}>
                  <li
                    className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                      selectedItem === "publications"
                        ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                        : ""
                    }`}
                    onClick={() => handleSelect("publications")}
                  >
                    <i className="ml-2">
                      <img src={NewsIcon} alt="" />
                    </i>
                    المنشورات
                  </li>
                </NavLink>
                <NavLink to={"/admin-dashboard/news"}>
                  <li
                    className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                      selectedItem === "news"
                        ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                        : ""
                    }`}
                    onClick={() => handleSelect("news")}
                  >
                    <i className="ml-2">
                      <img src={NewsIcon2} alt="" />
                    </i>
                    الاخبار
                  </li>
                </NavLink>
                <NavLink to={"/admin-dashboard/analysis"}>
                  <li
                    className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                      selectedItem === "Analysis"
                        ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                        : ""
                    }`}
                    onClick={() => handleSelect("Analysis")}
                  >
                    <i className="ml-2">
                      <StudiesIcon />
                    </i>
                    التحاليل
                  </li>
                </NavLink>
              </ul>
            )}
          </ul>

          <ul className="w-full min-h-[25%]  mb-5 px-3">
            <div className="float-start w-[90%] h-[1px] bg-[#E5E5E5] mb-3"></div>
            <p className="text-[12px] text-start text-[#9E9E9E]">
              المؤسسات و الموظفين
            </p>
            <NavLink to={"/admin-dashboard/taskforce"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Task-Force"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Task-Force")}
              >
                <i className="ml-2">
                  <img src={Teams} alt="" />
                </i>
                فريق العمل
              </li>
            </NavLink>
            <NavLink to={"/admin-dashboard/organization"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Institutions"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Institutions")}
              >
                <i className="ml-2">
                  <Orgnaztion />
                </i>
                المؤسسات التي نديرها
              </li>
            </NavLink>
            {/* <li
              className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                selectedItem === "Partners"
                  ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                  : ""
              }`}
              onClick={() => handleSelect("Partners")}
            >
              <i className="ml-2">
                <Massage />
              </i>
              شركائنا
            </li> */}
            <NavLink to={"/admin-dashboard/writer"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Writers"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Writers")}
              >
                <i className="ml-2">
                  <Massage />
                </i>
                الكُتَّاب
              </li>
            </NavLink>
          </ul>

          <ul className="w-full min-h-[30%] px-3">
            <div className="float-start w-[90%] h-[1px] bg-[#E5E5E5] mb-3"></div>
            <p className="text-[12px] text-start text-[#9E9E9E]">المزايا</p>
            <NavLink to={"/admin-dashboard/jobs"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Job"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Job")}
              >
                <i className="ml-2">
                  <img src={Busniess} alt="" />
                </i>
                الوظائف
              </li>
            </NavLink>
            <NavLink to={"/admin-dashboard/services"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Services"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Services")}
              >
                <i className="ml-2">
                  <img src={Service} alt="" />
                </i>
                خدماتنا
              </li>
            </NavLink>
            <NavLink to={"/admin-dashboard/profile"}>
              <li
                className={`mt-1 py-2 px-1 rounded-md flex justify-start items-center hover:bg-[rgb(213,174,120)]/[.20] hover:text-[#D5AE78] cursor-pointer ${
                  selectedItem === "Portfolio"
                    ? "bg-[rgb(213,174,120)]/[.20] text-[#D5AE78]"
                    : ""
                }`}
                onClick={() => handleSelect("Portfolio")}
              >
                <i className="ml-2">
                  <OurFiles />
                </i>
                ملف تعريقي لاعمالنا
              </li>
            </NavLink>
          </ul>
        </>
      )}
    </div>
  );
}
