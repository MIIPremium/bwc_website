import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components"; // Optional for styling
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import ReactPlayer from "react-player/youtube";
import Button from "../../components/button";
import { useTranslation } from "react-i18next";

interface CarouselProps {
  items: string[];
  itemsToShow: number;
}

const CarouselContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 60%;
  margin: auto;
  overflow-x: hidden;
`;

const CarouselItem = styled.div`
  flex-shrink: 0;
  width: 90%;
  height: 100%;
  background: black;
  /* Add your desired styles here */
`;

export default function Carousel({ items, itemsToShow }: CarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft =
        (startIndex * carouselRef.current.offsetWidth) / itemsToShow;
    }
  }, [startIndex, itemsToShow]);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, items.length - itemsToShow)
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const visibleItems = items.slice(startIndex, startIndex + itemsToShow);

  return (
    <>
      {dir === "ltr" ? (
        <>
          <div className="w-full h-36 flex justify-around items-center ">
            <div className="w-[20%] lg:-translate-x-0 md:-translate-x-0 sm:-translate-x-7">
              <Button>{t("See-All")}</Button>
            </div>
            <div className="w-[80%] ">
              <div className="flex p-5 justify-end">
                <h1 className="text-3xl">{t("Talk-about-us")}</h1>
                <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
              </div>
            </div>
          </div>
          <div className="h-[50vh] w-[98%] m-auto ">
            <CarouselContainer ref={carouselRef}>
              {visibleItems.map((item, index) => (
                <CarouselItem key={index}>
                  {
                    <div className="w-full h-full bg-slate-600">
                      <ReactPlayer
                        url={item}
                        controls={true}
                        height="100%"
                        width="100%"
                      />
                    </div>
                  }
                </CarouselItem>
              ))}
            </CarouselContainer>
            <div className="h-[2px] mt-10 w-[90%] m-auto bg-[#CECECE]"></div>
            <div className="h-[2px] m-auto w-[90%]">
              <div className="mt-3 float-right">
                <button
                  className=" w-10 h-10 border-[2px] border-[#656565] rounded-full ml-2"
                  onClick={handleNext}
                >
                  <div
                    className="w-full h-full rounded-full flex justify-center items-center hover:bg-[#656565] text-[#656565] hover:text-white"
                    onClick={handleNext}
                  >
                    <FaArrowRightLong size={22} />
                  </div>
                </button>
                <button
                  className=" w-10 h-10 border-[2px] border-[#656565] rounded-full ml-2"
                  onClick={handlePrev}
                >
                  <div
                    className="w-full h-full rounded-full flex justify-center items-center hover:bg-[#656565] text-[#656565] hover:text-white"
                    onClick={handlePrev}
                  >
                    <FaArrowLeftLong size={22} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-36 flex justify-around items-center ">
            <div className="w-[80%]">
              <div className="flex p-5">
                <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                <h1 className="text-3xl">{t("Talk-about-us")}</h1>
              </div>
            </div>
            <div className="w-[20%] lg:translate-x-0 md:translate-x-0 sm:translate-x-7">
              <Button>{t("See-All")}</Button>
            </div>
          </div>

          <div className="h-[50vh] w-[98%] m-auto">
            <CarouselContainer ref={carouselRef}>
              {visibleItems.map((item, index) => (
                <CarouselItem key={index}>
                  {
                    <div className="w-full h-full bg-slate-600">
                      <ReactPlayer
                        url={item}
                        controls={true}
                        height="100%"
                        width="100%"
                      />
                    </div>
                  }
                </CarouselItem>
              ))}
            </CarouselContainer>
            <div className="h-[2px] mt-10 w-[90%] m-auto bg-[#CECECE]"></div>
            <div className="h-[2px] m-auto w-[90%]">
              <div className="mt-3 float-end">
                <button
                  className=" w-10 h-10 border-[2px] border-[#656565] rounded-full ml-2"
                  onClick={handlePrev}
                >
                  <div
                    className="w-full h-full rounded-full flex justify-center items-center hover:bg-[#656565] text-[#656565] hover:text-white"
                    onClick={handlePrev}
                  >
                    <FaArrowRightLong size={22} />
                  </div>
                </button>
                <button
                  className=" w-10 h-10 border-[2px] border-[#656565] rounded-full ml-2"
                  onClick={handleNext}
                >
                  <div
                    className="w-full h-full rounded-full flex justify-center items-center hover:bg-[#656565] text-[#656565] hover:text-white"
                    onClick={handleNext}
                  >
                    <FaArrowLeftLong size={22} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
