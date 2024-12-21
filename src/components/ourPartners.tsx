import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import image1 from "../assets/img/ourpartines/alomgy_brand.png";
import image2 from "../assets/img/ourpartines/bina_brand.png";
import image3 from "../assets/img/ourpartines/certiport_brand.png";
import image4 from "../assets/img/ourpartines/franklincove_brand.png";
import { useTranslation } from "react-i18next";
interface publishesDataCard {
  img: string;
}

const Cards: publishesDataCard[] = [
  {
    img: image1,
  },
  {
    img: image2,
  },
  {
    img: image3,
  },
  {
    img: image4,
  },
];
export default function OurPartners() {
  const slides = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
  ];

  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const duplicatedSlides = [...Cards, ...Cards];
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
    <>
      {widthScreen.winWidth <= 980 ? (
        <div className="relative w-full overflow-hidden">
          {/* Wrapping div for seamless looping */}
          <motion.div
            className="flex w-[250%]"
            animate={
              dir === "ltr"
                ? {
                    x: ["-100%", "0"],
                    transition: {
                      ease: "linear",
                      duration: 30,
                      repeat: Infinity,
                    },
                  }
                : {
                    x: ["100%", "0%"],
                    transition: {
                      ease: "linear",
                      duration: 30,
                      repeat: Infinity,
                      animationDirection: "reverse",
                    },
                  }
            }
          >
            {/* Render duplicated slides */}
            {duplicatedSlides.map((slide, index) => (
              <a
                // key={index}
                className="flex-shrink-0"
                style={{ width: `${100 / slides.length}%` }}
              >
                <div className=" flex rounded-xl sm:w-[80%] h-[150px] mx-10 overflow-hidden mt-2 bg-white">
                  <div className=" flex-row-reverse w-[100%] h-[100%]">
                    <div className="flex justify-center items-center w-[100%] h-full p-2">
                      <img
                        src={slide.img}
                        className="object-contain w-[100%] h-[100%]"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="relative w-full overflow-hidden">
          {/* Wrapping div for seamless looping */}
          <motion.div
            className="flex "
            animate={
              dir === "ltr"
                ? {
                    x: ["-100%", "0"],
                    transition: {
                      ease: "linear",
                      duration: 30,
                      repeat: Infinity,
                    },
                  }
                : {
                    x: ["100%", "0%"],
                    transition: {
                      ease: "linear",
                      duration: 30,
                      repeat: Infinity,
                      animationDirection: "reverse",
                    },
                  }
            }
          >
            {/* Render duplicated slides */}
            {duplicatedSlides.map((slide, index) => (
              <a
                key={index}
                className="flex-shrink-0"
                style={{ width: `${100 / slides.length}%` }}
              >
                <div className=" inline-block rounded-xl lg:w-[80%] sm:w-[80%] h-[150px] mx-10 overflow-hidden mt-2 bg-white">
                  <div className=" flex-row-reverse w-[100%] h-[100%] ">
                    <div className="flex justify-center items-center w-[100%] h-full p-2">
                      <img
                        src={slide.img}
                        className="object-contain w-[100%] h-[100%]"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
}
