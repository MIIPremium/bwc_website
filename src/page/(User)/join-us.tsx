import { X } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Jobs from "src/components/(user)/jobs";
import Footer from "src/components/footer";
import Navbar from "src/components/navbar";

export default function JoinUs() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const [isVisible, _setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const handleClose = () => {
    setIsFading(true);
  };

  if (!isVisible) return null;
  return (
    <>
      {dir === "ltr" ? (
        <div>
          <div className="w-full lg:h-[8vh] md:h-[8vh]  sm:h-[11vh]">
            <Navbar />
          </div>
          <div
            className={`w-full lg:h-[25vh] flex justify-center items-center md:mt-11 sm:mt-8 ${
              isFading ? "hidden" : "opacity-100"
            }`}
          >
            <div className="md:w-[50%] md:h-[100%] sm:w-[80%] sm:h-[100%] bg-[#D5AE78]/[.5] md:text-end sm:text-end rounded-lg px-2 py-1 relative transition-opacity duration-500 ease-in-out">
              {/* 'x' Button */}
              <button
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                onClick={handleClose}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <h1>
                To strengthen the team at Business World Investment & Studies
              </h1>

              {/* First Item */}
              <div dir="ltr" className="flex items-center mt-5">
                <div className="lg:w-[3%] md:w-[5%] sm:w-[6%] sm:ml-2 md:mr-3 lg:mr-0">
                  <div className="w-4 h-4 border-2 border-[#333333] bg-gradient-to-r from-[#997740] to-[#CCA972]"></div>
                </div>
                <div className="w-[95%] text-left">
                  <p className="text-[#5B5B5B]">For excellent material.</p>
                </div>
              </div>

              {/* Second Item */}
              <div dir="ltr" className="flex items-center mt-5">
                <div className="lg:w-[3%] md:w-[5%] sm:w-[6%] sm:ml-2 md:mr-3 lg:mr-0">
                  <div className="w-4 h-4 border-2 border-[#333333] bg-gradient-to-r from-[#997740] to-[#CCA972]"></div>
                </div>
                <div className="w-[95%] text-left">
                  <p className="text-[#5B5B5B]">
                    A stimulating working environment.
                  </p>
                </div>
              </div>

              {/* Third Item */}
              <div dir="ltr" className="flex items-center mt-5">
                <div className="lg:w-[3%] md:w-[5%] sm:w-[6%] sm:ml-2 md:mr-3 lg:mr-0">
                  <div className="w-4 h-4 border-2 border-[#333333] bg-gradient-to-r from-[#997740] to-[#CCA972]"></div>
                </div>
                <div className="w-[95%] text-left">
                  <p className="text-[#5B5B5B]">
                    Ongoing training and qualification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className={` ${isFading ? "mt-7" : "mt-0"}`}>
            <Jobs />
          </div>
          <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
            <Footer />
          </footer>
        </div>
      ) : (
        <div>
          <div className="w-full lg:h-[8vh] md:h-[8vh]  sm:h-[11vh]">
            <Navbar />
          </div>
          <div
            className={`w-full lg:h-[25vh] flex justify-center items-center md:mt-11 sm:mt-8 ${
              isFading ? "hidden" : "opacity-100"
            } transition-opacity duration-300 ease-in-out`}
          >
            <div className="md:w-[50%] md:h-[100%] sm:w-[80%] sm:h-[100%] bg-[#D5AE78]/[.5] rounded-lg px-2 py-1 relative">
              {/* 'x' Button */}

              {/* Content */}
              <h1 className="text-xl text-start font-bold ">
                لتعزيز فريق العمل في شركة عالم الاعمال للاستثمار والدراسات
              </h1>
              <button
                className="absolute top-2 left-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={handleClose}
                aria-label="Close"
              >
                <X size={20} />
              </button>
              {/* First Item */}
              <div className="flex items-center mt-5">
                <div className="lg:w-[3%] md:w-[5%] sm:w-[6%] sm:ml-2 md:mr-3 lg:mr-0">
                  <div className="w-4 h-4 border-2 border-[#333333] bg-gradient-to-r from-[#997740] to-[#CCA972] rounded-full"></div>
                </div>
                <div className="w-[95%]">
                  <p className="text-[#5B5B5B]">مقابل مادي ممتاز .</p>
                </div>
              </div>

              {/* Second Item */}
              <div className="flex items-center mt-5">
                <div className="lg:w-[3%] md:w-[5%] sm:w-[6%] sm:ml-2 md:mr-3 lg:mr-0">
                  <div className="w-4 h-4 border-2 border-[#333333] bg-gradient-to-r from-[#997740] to-[#CCA972] rounded-full"></div>
                </div>
                <div className="w-[95%]">
                  <p className="text-[#5B5B5B]">بيئة عمل محفزة .</p>
                </div>
              </div>

              {/* Third Item */}
              <div className="flex items-center mt-5">
                <div className="lg:w-[3%] md:w-[5%] sm:w-[6%] sm:ml-2 md:mr-3 lg:mr-0">
                  <div className="w-4 h-4 border-2 border-[#333333] bg-gradient-to-r from-[#997740] to-[#CCA972] rounded-full"></div>
                </div>
                <div className="w-[95%]">
                  <p className="text-[#5B5B5B]">تدريب وتأهيل مستمر .</p>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className={` ${isFading ? "mt-7" : "mt-0"}`}>
            <Jobs />
          </div>
          <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
            <Footer />
          </footer>
        </div>
      )}
    </>
  );
}
