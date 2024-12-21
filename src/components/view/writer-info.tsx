import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CgInstagram } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "src/lib/http";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { WriterResp } from "src/types/validation";
import Label from "src/ui/label";
import { IconType } from "react-icons";
import Cookies from "js-cookie";

const socialIcons: { [key: string]: IconType } = {
  Instagram: CgInstagram,
  WhatsApp: FaWhatsapp,
  LinkedIn: FaLinkedinIn,
  X: FaXTwitter,
  Facebook: FaFacebookF, // Add Facebook if needed
};
export default function WriterInfo() {
  const AccessToken = Cookies.get("accessToken");
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    const response = await axiosInstance.get<WriterResp>(
      `/api/Writers/${id}`,
      {
        headers: {
          "Content-Type": "application/json", // Ensures that the request body is treated as JSON
          Authorization: `Bearer ${AccessToken}`,
        },
      }
    );
    return response.data;
  };
  const { data: WriterData } = useQuery({
    queryKey: ["Writer", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  useEffect(() => {}, [WriterData]);
  return (
    <>
      {dir === "ltr" ? (
        <div className="min-h-[90vh]   w-[100%] bg-[#f2f2f2]">
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          <div className=" grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[46vh] ">
            <div className=" col-span-1 h-auto translate-y-10 ">
              <div className="bg-black w-56 h-56 rounded-full mx-auto flex justify-center items-center">
                {/* <label htmlFor="">Writer Photo</label>*/}
                <img
                  src={WriterData?.image}
                  alt=""
                  className="rounded-full w-full h-full object-fill"
                />
              </div>
              <div className=" text-center ">
                {" "}
                <h3 className=" text-[#000] text-3xl">
                  {WriterData?.en_fullName}
                </h3>
                <h3 className=" text-[#797979] text-xl">
                  {WriterData?.en_role}
                </h3>
                <h3>عددالمنشورات</h3>
              </div>
            </div>
          </div>
          <div className="w-full h-[20vh]">
            <div className=" col-span-1 h-auto px-10 translate-y-8 ">
              <div className=" w-full gap-3  rounded-full mx-auto flex justify-center items-center">
                <div className="flex space-x-4">
                  {WriterData?.soicalmedia.map((social, index) => {
                    // Get the appropriate icon based on the name
                    const IconComponent = socialIcons[social.name];

                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        className="w-14 h-14 border-2 border-black rounded-full flex justify-center items-center"
                        target="_blank" // Optional: Opens in a new tab
                        rel="noopener noreferrer" // For security when opening new tabs
                      >
                        {IconComponent && <IconComponent size={30} />}{" "}
                        {/* Render the icon if it exists */}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className="text-start col-span-3 h-auto translate-y-10">
              <Label text="about writer" />
              {WriterData?.en_description}
            </div>
          </div>
          <div className="w-full -translate-x-10 flex justify-end mt-20">
            <Link
              to={`/admin-dashboard/writer/update-writer/${id}`}
              className="text-lg mb-10 inline-flex h-10 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2  font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              update
            </Link>
          </div>
          <div className="h-[2px]  w-[95%] mx-auto bg-black mb-7"></div>
        </div>
      ) : (
        <div className="min-h-[90vh]   w-[100%] bg-[#f2f2f2]">
          <div className="h-[2px]  w-[95%] mx-auto bg-black"></div>
          <div className=" grid grid-cols-1 w-[100%] px-10 items-start gap-4 text-right h-[46vh] ">
            <div className=" col-span-1 h-auto translate-y-10 ">
              <div className="bg-black w-56 h-56 rounded-full mx-auto flex justify-center items-center">
                {/* <label htmlFor="">Writer Photo</label>*/}
                <img
                  src={WriterData?.image}
                  alt=""
                  className="rounded-full w-full h-full object-fill"
                />
              </div>
              <div className=" text-center ">
                {" "}
                <h3 className=" text-[#000] text-3xl">
                  {WriterData?.ar_fullName}
                </h3>
                <h3 className=" text-[#797979] text-xl">
                  {WriterData?.ar_role}
                </h3>
                <h3>عددالمنشورات</h3>
              </div>
            </div>
          </div>
          <div className="w-full h-[20vh]">
            <div className=" col-span-1 h-auto px-10 translate-y-8 ">
              <div className=" w-full gap-3  rounded-full mx-auto flex justify-center items-center">
                <div className="flex space-x-4">
                  {WriterData?.soicalmedia.map((social, index) => {
                    // Get the appropriate icon based on the name
                    const IconComponent = socialIcons[social.name];

                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        className="w-14 h-14 border-2 border-black rounded-full flex justify-center ml-2 items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {IconComponent && <IconComponent size={30} />}{" "}
                        {/* Render the icon if it exists */}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
            <div className="text-start col-span-3 h-auto translate-y-10">
              <Label text="عن الكاتب" />
              {WriterData?.ar_description}
            </div>
          </div>

          <div className="w-full translate-x-10 flex justify-end mt-20">
            <Link
              to={`/admin-dashboard/writer/update-writer/${id}`}
              className="text-md mb-10 inline-flex h-10 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              تعديل
            </Link>
          </div>
          <div className="h-[2px]  w-[95%] mx-auto bg-black mb-7"></div>
        </div>
      )}
    </>
  );
}
